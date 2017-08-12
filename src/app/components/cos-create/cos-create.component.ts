import {Component, trigger, transition, style, animate, state, OnInit} from '@angular/core';
import {IProduct} from "../../models/product";
import {IFile} from "../../models/file";

@Component({
  selector: 'cos-create',
  templateUrl: './cos-create.component.html',
  styleUrls: ['./cos-create.component.css'],
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
export class CosCreateComponent implements OnInit {
  product: IProduct;

  selectedTab = 1;
  tabs = [
    {
      id: 1,
      hebText: 'איפיון',
      longText: false
    },
    {
      id: 2,
      hebText: 'פורמולה',
      longText: false
    },
    {
      id: 3,
      hebText: 'אריזות',
      longText: false
    },
    {
      id: 4,
      hebText: 'מעבדה',
      longText: false
    },
    {
      id: 5,
      hebText: 'תיווי',
      longText: false
    },
    {
      id: 6,
      hebText: 'טענות שיווקיות',
      longText: true
    },
    {
      id: 7,
      hebText: 'הערכת בטיחות',
      longText: true
    },
    {
      id: 8,
      hebText: 'פניות צרכנים',
      longText: true
    },
    {
      id: 9,
      hebText: 'שונות',
      longText: false
    },
  ];
  constructor() {}


  ngOnInit() {
    this.product = {
      spec: {
        type: null,
        hebName: 'אריאל רוזן',
        engName: null,
        formulaIdNumber: null,
        category1: null,
        category2: null,
        category3: null,
        formulaUsedSince: null,
        physicalForm: null,
        physicalFormOther: null,
        physicalFormFiles: [],
        siteOfApplication: null,
        userSex: null,
        consumerAgeRange: null,
        maxFrequencyOfUse: null,
        amountPerApplication: null,
        leaveOrRinse: null,
        shelfLife: null,
        shelfLifeExpiration: null,
        shelfLifePoa: null,
        oneTimeUse: null,
        airTight: null,
        shelfLifeOther: null,
        shelfLifeOtherText: null,
        shelfLifeFiles: [],
        batchCodeMethodFiles: [],
        country: null,
        certOfFreeSaleFiles: [],
        gmpFiles: []
      }
    };
  }

  selectTab(id) {
    this.selectedTab = id;
  }

  get diagnostic() {
    return JSON.stringify(this.product, null, 4);
  }
}


