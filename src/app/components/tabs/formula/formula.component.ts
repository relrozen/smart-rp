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
  @ViewChild('deleteTemplate') deleteTemplate: TemplateRef<any>;
  @ViewChild('editShadeTemplate') editShadeTemplate: TemplateRef<any>;
  @ViewChild('deleteShadeTemplate') deleteShadeTemplate: TemplateRef<any>;

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
      { prop: 'concentrationFromInput', name: 'RM breakdown', headerClass: 'table-header', cellClass: 'cell-center-data' },
      { prop: 'inci_name', name: 'inci name', headerClass: 'table-header', cellClass: 'cell-center-data' },
      { prop: 'concentrationInRm', name: '% RM', headerClass: 'table-header', cellClass: 'cell-center-data' },
      { prop: 'concentration', name: 'Conc.', headerClass: 'table-header',cellClass: 'cell-center-data' },
      { prop: 'func', name: 'Function', headerClass: 'table-header', cellClass: 'cell-center-data' },
      { prop: '_id', name: 'Cosing ref#', headerClass: 'table-header', cellClass: 'cell-center-data' },
      { cellTemplate: this.deleteTemplate, name: '', headerClass: 'table-header', cellClass: 'table-header', resizeable: false, width: 50 }
    ];

    this.ShadesColumns = [
      { prop: 'shadeName', name: 'Shade', headerClass: 'table-header', cellClass: 'cell-center-data' },
      { prop: 'rawMaterialName', name: 'Raw-Material', headerClass: 'table-header', cellClass: 'cell-center-data' },
      { prop: 'inci_name', name: 'inci name', headerClass: 'table-header', cellClass: 'cell-center-data' },
      { prop: 'concentrationInRm', name: '% of RM', headerClass: 'table-header', cellClass: 'cell-center-data' },
      { prop: 'concentration', name: 'Concentration', headerClass: 'table-header', cellClass: 'cell-center-data' },
      { prop: 'func', name: 'Function', headerClass: 'table-header', cellClass: 'cell-center-data' },
      { prop: '_id', name: 'Cosing ref#', headerClass: 'table-header', cellClass: 'cell-center-data' },
      {
        cellTemplate: this.editShadeTemplate,
        name: '',
        headerClass: 'table-header', cellClass: 'table-header', resizeable: false, width: 50
      },
      { cellTemplate: this.deleteShadeTemplate, name: '', headerClass: 'table-header', cellClass: 'table-header', resizeable: false, width: 50 }
    ];

    this.fullFormulaColumns = [
      {
        cellTemplate: this.expandBtnTemplate,
        cellClass: 'cell-center-data',
        name: '',
        width: 15
      },
      { prop: '_id', name: 'Cosing ref#', headerClass: 'table-header', cellClass: 'cell-center-data' },
      { prop: 'inci_name', name: 'inci name', headerClass: 'table-header', cellClass: 'cell-center-data' },
      { prop: 'cas_number', name: 'cas#', headerClass: 'table-header', cellClass: 'cell-center-data' },
      { prop: 'ec_number', name: 'EINECS', headerClass: 'table-header', cellClass: 'cell-center-data' },
      { prop: 'func', name: 'Function', headerClass: 'table-header', cellClass: 'cell-center-data' },
      { prop: 'error', name: 'Error', headerClass: 'table-header', cellClass: 'cell-center-data' },
      { prop: 'restrictions', name: 'Restrictions', headerClass: 'table-header', cellClass: 'cell-center-data' },
      { prop: 'product_type_body_parts', name: 'Product Type', headerClass: 'table-header', cellClass: 'cell-center-data' },
      { prop: 'max_concentration', name: 'Percent limit', headerClass: 'table-header', cellClass: 'cell-center-data' },
      { prop: 'other', name: 'Other', headerClass: 'table-header', cellClass: 'cell-center-data' },
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
        this.formula.rawMaterials = _.sortBy(this.formula.rawMaterials, rm => { return -rm.concentration; });
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
            concentration: parseFloat(rm.concentration),
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
      _.forEach(rm.ingredients, (ing, index: Number) => {
        res.push(_.assign({}, ing, {
          concentrationFromInput: index === 0 ? rm.concentration : "",
          rawMaterialId: rm._id,
          rawMaterialName: index === 0 ? rm.name : "",
          isFirst: index === 0,
          isLast: index === rm.ingredients.length - 1
        }));
      })
    });
    this.baseFormulaTableData = res;
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
          res.push(_.assign({}, ing));
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
            res.push(_.assign({}, ing));
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

  removeRawMaterial(row) {
    this.formula.rawMaterials.splice(_.findIndex(this.formula.rawMaterials, (rm: any) => { return rm._id === row.rawMaterialId }) ,1)
    this.calculateRawMaterialsTable();
    this.calculateIngredientsTable();
  }

  editShade(row) {
    this.shadeFormulaSoFar = [];
    let shadeIndex = _.findIndex(this.formula.shades, (shade: any) => { return shade.name === row.shadeName });
    this.shadeName = this.formula.shades[shadeIndex].name;
    _.forEach(this.formula.shades[shadeIndex].rm, (rm: any) => {
      this.shadeFormulaSoFar.push({
        rmId: rm._id,
        rmName: rm.name,
        concentration: rm.concentration
      });
    });
    this.formula.shades.splice(shadeIndex ,1);
    this.calculateShadesTable();
    this.calculateIngredientsTable();
  }

  removeShade(row) {
    let shadeIndex = _.findIndex(this.formula.shades, (shade: any) => { return shade.name === row.shadeName });
    this.formula.shades.splice(shadeIndex ,1);
    this.calculateShadesTable();
    this.calculateIngredientsTable();
  }

  getRowClass(row: any) {
    return {
      "last-line": row.isLast
    }
  }


  get diagnostic() {
    return JSON.stringify(this.formula, null, 4);
  }


}
