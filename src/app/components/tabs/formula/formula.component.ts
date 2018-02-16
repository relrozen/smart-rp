import {Component, Input, OnInit} from '@angular/core';
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
  styleUrls: ['./formula.component.css']
})
export class FormulaComponent implements OnInit {
  @Input() formula;

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
      { prop: 'rawMaterialName', name: 'Raw-Material', headerClass: 'table-header', resizeable: false },
      { prop: 'cosing_ref_number', name: 'Cosing ref#', headerClass: 'table-header', resizeable: false },
      { prop: 'inci_name', name: 'inci name', headerClass: 'table-header', resizeable: false, width: 100 },
      { prop: 'cas_number', name: 'cas#', headerClass: 'table-header', resizeable: false, width: 100 },
      { prop: 'ec_number', name: 'EINECS', headerClass: 'table-header', resizeable: false, width: 100 },
      { prop: 'func', name: 'Function', headerClass: 'table-header', resizeable: false, width: 100 },
      { prop: 'concentration', name: 'Concentration', headerClass: 'table-header', resizeable: false, width: 100 }
    ];

    this.ShadesColumns = [
      { prop: 'shadeName', name: 'Shade', headerClass: 'table-header', resizeable: false },
      { prop: 'rawMaterialName', name: 'Raw-Material', headerClass: 'table-header', resizeable: false },
      { prop: 'cosing_ref_number', name: 'Cosing ref#', headerClass: 'table-header', resizeable: false },
      { prop: 'inci_name', name: 'inci name', headerClass: 'table-header', resizeable: false, width: 100 },
      { prop: 'cas_number', name: 'cas#', headerClass: 'table-header', resizeable: false, width: 100 },
      { prop: 'ec_number', name: 'EINECS', headerClass: 'table-header', resizeable: false, width: 100 },
      { prop: 'func', name: 'Function', headerClass: 'table-header', resizeable: false, width: 100 },
      { prop: 'concentration', name: 'Concentration', headerClass: 'table-header', resizeable: false, width: 100 }
    ];

    this.fullFormulaColumns = [
      { prop: 'cosing_ref_number', name: 'Cosing ref#', headerClass: 'table-header', resizeable: false },
      { prop: 'inci_name', name: 'inci name', headerClass: 'table-header', resizeable: false, width: 100 },
      { prop: 'cas_number', name: 'cas#', headerClass: 'table-header', resizeable: false, width: 100 },
      { prop: 'ec_number', name: 'EINECS', headerClass: 'table-header', resizeable: false, width: 100 },
      { prop: 'func', name: 'Function', headerClass: 'table-header', resizeable: false, width: 100 },
      { prop: 'max_concentration', name: 'Percent limit', headerClass: 'table-header', resizeable: false, width: 100 },
      { prop: 'concentration', name: 'Concentration', headerClass: 'table-header', resizeable: false, width: 100 },

    ]
  }

  addRawMaterial() {
    this.rawMaterialService.getRawMaterial(this.selectedRm).subscribe(rmFromDb => {
      let IngIds = _.map(rmFromDb.ingredients, ing => { return ing.id; });
      this.ingredientService.getIngredientsByIds(IngIds).subscribe(ingsFromDb => {
        let ingredients = _.map(ingsFromDb, ingFromDb => {
          return _.assign({}, ingFromDb, {
            concentration: parseFloat(this.concentration) * _.find(rmFromDb.ingredients, i => {
              return i.id === ingFromDb._id
            }).concentration / 100
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
            return _.assign({}, ingFromDb, {
              concentration: parseFloat(rm.concentration) * _.find(rmFromDb.ingredients, i => {
                  return i.id === ingFromDb._id
                }).concentration / 100
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


  get diagnostic() {
    return JSON.stringify(this.formula, null, 4);
  }


}
