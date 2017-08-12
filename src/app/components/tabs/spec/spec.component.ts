import {Component, trigger, transition, style, animate, state, OnInit, Input} from '@angular/core';
import { scrollBars } from '../../../shared/scroll-bars';
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
  categoriesLevel1: any[];
  categoriesLevel2: any[];
  categoriesLevel3: any[];
  physicalForms: any[];
  sex: any[];
  ages: any[];
  shelfLife: any[];
  cosmeticType: any[];
  countries: any[];

  @Input() spec;
    // type: null,
    // hebName: null,
    // engName: null,
    // formulaIdNumber: null,
    // category1: null,
    // category2: null,
    // category3: null,
    // formulaUsedSince: null,
    // physicalForm: null,
    // physicalFormOther: null,
    // physicalFormFiles: [],
    // siteOfApplication: null,
    // userSex: null,
    // consumerAgeRange: null,
    // maxFrequencyOfUse: null,
    // amountPerApplication: null,
    // leaveOrRinse: null,
    // shelfLife: null,
    // shelfLifeExpiration: null,
    // shelfLifePoa: null,
    // oneTimeUse: null,
    // airTight: null,
    // shelfLifeOther: null,
    // shelfLifeFiles: [],
    // batchCodeMethodFiles: [],
    // country: null,
    // certOfFreeSaleFiles: [],
    // gmpFiles: []

  constructor() { }

  ngOnInit() {
    this.categoriesLevel1 = _.map(scrollBars.categories, (val, key) => {
      return { id: key, text: val.heb };
    });
    this.physicalForms = _.map(scrollBars.physicalForms, (val, key) => {
      return { id: key, text: val.heb };
    });
    this.sex = _.map(scrollBars.sex, (val, key) => {
      return { id: key, text: val.heb };
    });
    this.ages = _.map(scrollBars.ages, (val, key) => {
      return { id: key, text: val.heb };
    });
    this.shelfLife = _.map(scrollBars.shelfLife, (val, key) => {
      return { id: key, text: val.heb };
    });
    this.cosmeticType = _.map(scrollBars.cosmeticType, (val, key) => {
      return { id: key, text: val.heb };
    });
    this.countries = _.map(scrollBars.countries, (val, key) => {
      return { id: key, text: val.heb };
    });
  }

  onCategory1Select(cat: string): void {
    const children = scrollBars.categories[cat].children;
    this.categoriesLevel2 = _.map(children, (val: any, key) => {
      return { id: key, text: val.heb };
    });
    this.spec.category2 = null;
    this.spec.category3 = null;
  }

  onCategory2Select(cat: string): void {
    const children = scrollBars.categories[this.spec.category1].children[cat].children;
    this.categoriesLevel3 = _.map(children, (val: any, key) => {
      return { id: key, text: val.heb };
    });
    this.spec.category3 = null;
  }

  onFileUploaded(modelName, event) {
    event.uploadDate = moment(event.uploadDate).format('D/M/YYYY-HH:mm');
    this.spec[modelName].push(event);
  }

}
