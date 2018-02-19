import {animate, Component, Input, OnInit, style, TemplateRef, transition, trigger, ViewChild} from '@angular/core';
import {inputConfig} from '../../../shared/input-config';
import * as _ from 'lodash';
import * as async from 'async';
import {IngredientService} from "../../../services/ingredient.service";
import {RawMaterialService} from "../../../services/raw-material.service";
import {rm} from "../../../shared/raw-materials";
import {IRawMaterial} from "../../../models/raw-material";
import {IIngredient} from "../../../models/ingredient";

@Component({
  selector: 'app-formula',
  templateUrl: './formula.component.html',
  styleUrls: ['./formula.component.css'],
  animations: [
    trigger(
      'myAnimation',
      [
        transition(
          ':enter', [
            style({transform: 'translateX(-100%)', opacity: 0}),
            animate('200ms', style({transform: 'translateX(0)', 'opacity': 1}))
          ]
        ),
        transition(
          ':leave', [
            style({transform: 'translateX(0)', 'opacity': 1}),
            animate('200ms', style({transform: 'translateX(100%)', 'opacity': 0}))

          ]
        )]
    )
  ]
})
export class FormulaComponent implements OnInit {
  @Input() formula;

  @ViewChild('FullFormulaTable') table: any;
  @ViewChild('expandBtnTemplate') expandBtnTemplate: TemplateRef<any>;

  inputConfig = inputConfig;

  selectedRm: string;
  concentration: string = "";
  shadeName: string = "";
  selectedShadeRm: string;
  shadeConcentration: string = "";
  shadeFormulaSoFar: any[] = [];

  baseFormulaTableData = [];
  shadesTableData = [];
  fullFormulaTableData = [];

  rawMaterialsSelectValues: any[];

  expanded = {};
  baseFormulaColumns: any[];
  ShadesColumns: any[];
  fullFormulaColumns: any[];
  shadeSoFarColumns: any[];

  constructor(private ingredientService: IngredientService,
              private rawMaterialService: RawMaterialService) {

  }

  ngOnInit() {
    this.rawMaterialService.getRawMaterials().subscribe(rm => {
      this.rawMaterialsSelectValues = _.map(rm, val => { return {id: val._id, name: val.name} });
    });

    this.shadeSoFarColumns = [
      { prop: 'rmName', name: 'חומר גלם', headerClass: 'table-header'},
      { prop: 'concentration', name: 'ריכוז', headerClass: 'table-header'}
    ];

    this.baseFormulaColumns = [
      { prop: 'rawMaterialName', name: 'Raw-Material', headerClass: 'table-header', cellClass: 'cell-center-data' },
      { prop: 'inci_name', name: 'inci name', headerClass: 'table-header', cellClass: 'cell-center-data' },
      { prop: 'concentrationInRm', name: '% of RM', headerClass: 'table-header', cellClass: 'cell-center-data' },
      { prop: 'concentration', name: 'Concentration', headerClass: 'table-header',cellClass: 'cell-center-data' },
      { prop: 'func', name: 'Function', headerClass: 'table-header', cellClass: 'cell-center-data' },
      { prop: '_id', name: 'Cosing ref#', headerClass: 'table-header', cellClass: 'cell-center-data' },
    ];

    this.ShadesColumns = [
      { prop: 'shadeName', name: 'Shade', headerClass: 'table-header', cellClass: 'cell-center-data' },
      { prop: 'rawMaterialName', name: 'Raw-Material', headerClass: 'table-header', cellClass: 'cell-center-data' },
      { prop: 'inci_name', name: 'inci name', headerClass: 'table-header', cellClass: 'cell-center-data' },
      { prop: 'concentrationInRm', name: '% of RM', headerClass: 'table-header', cellClass: 'cell-center-data' },
      { prop: 'concentration', name: 'Concentration', headerClass: 'table-header', cellClass: 'cell-center-data' },
      { prop: 'func', name: 'Function', headerClass: 'table-header', cellClass: 'cell-center-data' },
      { prop: '_id', name: 'Cosing ref#', headerClass: 'table-header', cellClass: 'cell-center-data' },
    ];

    this.fullFormulaColumns = [
      {
        cellTemplate: this.expandBtnTemplate,
        name: '',
        width: 20
      },
      { prop: '_id', name: 'Cosing ref#', headerClass: 'table-header', cellClass: 'cell-center-data' },
      { prop: 'inci_name', name: 'inci name', headerClass: 'table-header', cellClass: 'cell-center-data' },
      { prop: 'cas_number', name: 'cas#', headerClass: 'table-header', cellClass: 'cell-center-data' },
      { prop: 'ec_number', name: 'EINECS', headerClass: 'table-header', cellClass: 'cell-center-data' },
      { prop: 'func', name: 'Function', headerClass: 'table-header', cellClass: 'cell-center-data' },
      { prop: 'max_concentration', name: 'Percent limit', headerClass: 'table-header', cellClass: 'cell-center-data' },
      { prop: 'concentration', name: 'Concentration', headerClass: 'table-header', cellClass: 'cell-center-data' },

    ]
  }

  addRawMaterial() {
    this.rawMaterialService.getRawMaterial(this.selectedRm).subscribe(rmFromDb => {
      let IngIds = _.map(rmFromDb.ingredients, ing => { return ing.id; });
      this.ingredientService.getIngredientsByIds(IngIds).subscribe(ingsFromDb => {
        let ingredients = _.map(ingsFromDb, ingFromDb => {
          let concentrationInRm = _.find(rmFromDb.ingredients, i => {
            return i.id === ingFromDb._id
          }).concentration;
          return _.assign({}, ingFromDb, {
            concentration: parseFloat(this.concentration) * concentrationInRm / 100,
            concentrationInRm: concentrationInRm
          })
        });
        this.formula.rawMaterials.push(_.assign({}, rmFromDb, {
          concentration: parseFloat(this.concentration),
          ingredients: ingredients
        }));
        this.calculateRawMaterialsTable();
        this.calculateIngredientsTable();

        this.selectedRm = null;
        this.concentration = "";
      });
    });
  }

  addToShade() {
    this.rawMaterialService.getRawMaterial(this.selectedShadeRm).subscribe(rmFromDb => {
      this.shadeFormulaSoFar.push({
        rmId: this.selectedShadeRm[0],
        rmName: rmFromDb.name,
        concentration: this.shadeConcentration
      });
      this.selectedShadeRm = null;
      this.shadeConcentration = "";
    });
  }

  addShadeToFormula() {
    this.formula.shades.push({
      name: this.shadeName,
      rm: []
    });
    async.each(this.shadeFormulaSoFar, (rm, callback) => {
      this.rawMaterialService.getRawMaterial(rm.rmId).subscribe((rmFromDb: IRawMaterial) => {
        let IngIds = _.map(rmFromDb.ingredients, ing => { return ing.id; });
        this.ingredientService.getIngredientsByIds(IngIds).subscribe((ingsFromDb: IIngredient[]) => {
          let ingredients = _.map(ingsFromDb, ingFromDb => {
            let concentrationInRm = _.find(rmFromDb.ingredients, i => {
              return i.id === ingFromDb._id;
            }).concentration;
            return _.assign({}, ingFromDb, {
              concentration: parseFloat(rm.concentration) * concentrationInRm / 100,
              concentrationInRm: concentrationInRm
            })
          });
          _.last(this.formula.shades)["rm"].push(_.assign({}, rmFromDb, {
            concentration: parseFloat(this.concentration),
            ingredients: ingredients
          }));
          callback();
        });
      })
    },err => {
      this.shadeName = "";
      this.shadeFormulaSoFar = [];
      this.calculateShadesTable();
      this.calculateIngredientsTable();
    });
  }
  calculateRawMaterialsTable() {
    let res = [];
    _.forEach(this.formula.rawMaterials, rm => {
      _.forEach(rm.ingredients, ing => {
        res.push(_.assign({}, ing, {
            rawMaterialId: rm._id,
            rawMaterialName: rm.name
          }));
      })
    });
    this.baseFormulaTableData = res;
    console.log(this.baseFormulaTableData)
  }

  calculateShadesTable() {
    let res = [];
    _.forEach(this.formula.shades, shade => {
      _.forEach(shade.rm, rm => {
        _.forEach(rm.ingredients, ing => {
          res.push(_.assign({}, ing, {
            shadeName: shade.name,
            rawMaterialId: rm._id,
            rawMaterialName: rm.name
          }));
        });
      });
    });
    this.shadesTableData = res;
  }

  calculateIngredientsTable() {
    let res = [];
    _.forEach(this.formula.rawMaterials, rm => {
      _.forEach(rm.ingredients, ing => {
        let existingIng = _.find(res, i => { return i._id === ing._id });
        if (existingIng) {
          existingIng.concentration += ing.concentration;
        }
        else {
          res.push(ing);
        }
      })
    });
    _.forEach(this.formula.shades, shade => {
      _.forEach(shade.rm, rm => {
        _.forEach(rm.ingredients, ing => {
          let existingIng = _.find(res, i => {
            return i._id === ing._id
          });
          if (existingIng) {
            existingIng.concentration += ing.concentration;
          }
          else {
            res.push(ing);
          }
        })
      });
    });
    this.fullFormulaTableData = res;
  }

  getHeight(row: any, index: number) {
    return 100;
  }

  toggleExpandRow(row, rowIndex) {
    if (this.expanded[rowIndex]) {
      this.expanded[rowIndex] = !this.expanded[rowIndex];
    } else {
      this.expanded[rowIndex] = true;
    }
    this.table.rowDetail.toggleExpandRow(row);
  }


  get diagnostic() {
    return JSON.stringify(this.formula, null, 4);
  }


}
