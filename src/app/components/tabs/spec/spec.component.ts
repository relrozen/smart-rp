import {Component, trigger, transition, style, animate, state, OnInit, Input} from '@angular/core';
import {IMultiSelectOption, IMultiSelectSettings, IMultiSelectTexts} from 'angular-2-dropdown-multiselect';
import { scrollBars } from '../../../shared/scroll-bars';
import { inputConfig} from '../../../shared/input-config';
import * as _ from 'lodash';
declare let moment: any;


@Component({
  selector: 'app-spec',
  templateUrl: './spec.component.html',
  styleUrls: ['./spec.component.css'],
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
export class SpecComponent implements OnInit {
  @Input() spec;

  inputConfig = inputConfig;

  // options for select boxes
  categoriesLevel1: any[];
  categoriesLevel2: any[];
  categoriesLevel3: any[];
  physicalForms: any[];
  sex: any[];
  ages: any[];
  shelfLife: any[];
  cosmeticType: any[];
  countries: any[];
  leaveOrRinse: any[];

  constructor() { }

  ngOnInit() {
    this.categoriesLevel1 = _.map(scrollBars.categories, (val, key) => {
      return { id: key, name: val.heb };
    });
    this.physicalForms = _.map(scrollBars.physicalForms, (val, key) => {
      return { id: key, name: val.heb };
    });
    this.sex = _.map(scrollBars.sex, (val, key) => {
      return { id: key, name: val.heb };
    });
    this.ages = _.map(scrollBars.ages, (val, key) => {
      return { id: key, name: val.heb };
    });
    this.shelfLife = _.map(scrollBars.shelfLife, (val, key) => {
      return { id: key, name: val.heb };
    });
    this.cosmeticType = _.map(scrollBars.cosmeticType, (val, key) => {
      return { id: key, name: val.heb };
    });
    this.countries = _.map(scrollBars.countries, (val, key) => {
      return { id: key, name: val.heb };
    });
    this.leaveOrRinse = _.map(scrollBars.leaveOrRinse, (val, key) => {
      return { id: key, name: val.heb };
    });
  }

  onCategory1Select(cat: string): void {
    if (cat.length === 0) { return; }
    cat = cat[0];
    const children = scrollBars.categories[cat].children;
    this.categoriesLevel2 = _.map(children, (val: any, key) => {
      return { id: key, name: val.heb };
    });
    this.spec.category2 = null;
    this.spec.category3 = null;
  }

  onCategory2Select(cat: string): void {
    const children = scrollBars.categories[this.spec.category1].children[cat].children;
    this.categoriesLevel3 = _.map(children, (val: any, key) => {
      return { id: key, name: val.heb };
    });
    this.spec.category3 = null;
  }

  onFileUploaded(modelName, event) {
    event.uploadDate = moment(event.uploadDate).format('D/M/YYYY-HH:mm');
    this.spec[modelName].push(event);
  }

}
