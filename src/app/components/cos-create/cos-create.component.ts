import {Component, trigger, transition, style, animate, state, OnInit} from '@angular/core';
import {IProduct} from "../../models/product";
import {IFile} from "../../models/file";
import {ProductService} from "../../services/product.service";

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
  currentProductId: number = null;

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
  constructor(private productService: ProductService) {}


  ngOnInit() {
    this.product = {
      spec: {
        type: [],
        hebName: '',
        engName: null,
        formulaIdNumber: null,
        category1: [],
        category2: [],
        category3: [],
        formulaUsedSince: null,
        startingFromNow: false,
        physicalForm: [],
        physicalFormOther: null,
        physicalFormFiles: [],
        siteOfApplication: null,
        userSex: [],
        consumerAgeRange: [],
        consumerAgeRangeOther: null,
        maxFrequencyOfUse: null,
        amountPerApplication: null,
        leaveOrRinse: [],
        leaveOrRinseOther: null,
        shelfLife: null,
        shelfLifeExpiration: null,
        shelfLifePoa: null,
        oneTimeUse: null,
        airTight: null,
        shelfLifeOther: null,
        shelfLifeOtherText: null,
        shelfLifeFiles: [],
        batchCodeMethodFiles: [],
        country: [],
        countryOther: null,
        certOfFreeSaleFiles: [],
        gmpFiles: []
      }
    };
  }

  selectTab(id) {
    this.selectedTab = id;
  }

  saveProduct() {
    if (!this.currentProductId) {
      this.productService.saveProduct(this.product).subscribe((product) => {
        this.currentProductId = product._id;
      });
    } else {
      this.productService.updateProduct(this.currentProductId, this.product).subscribe(event => {});
    }
  }

  get diagnostic() {
    return JSON.stringify(this.product, null, 4);
  }
}


