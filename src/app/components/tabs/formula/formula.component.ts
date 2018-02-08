import {Component, Input, OnInit} from '@angular/core';
import {inputConfig} from '../../../shared/input-config';
import {rm} from '../../../shared/raw-materials';
import {ingredients} from '../../../shared/ingredients';
import * as _ from 'lodash';

@Component({
  selector: 'app-formula',
  templateUrl: './formula.component.html',
  styleUrls: ['./formula.component.css']
})
export class FormulaComponent implements OnInit {
  @Input() formula;

  inputConfig = inputConfig;
  rmDB = rm;
  ingredientsDB = ingredients;

  selectedRm: string[] = [];
  concentration: string = "";

  rawMaterials: any[];

  constructor() {

  }

  ngOnInit() {
    this.rawMaterials = _.map(this.rmDB, val => { return {id: val._id, name: val.name} })
  }

  addRawMaterial() {

    this.formula.rawMaterials.push()
  }

}
