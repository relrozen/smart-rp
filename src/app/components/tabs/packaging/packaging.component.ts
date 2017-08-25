import {animate, Component, Input, OnInit, style, TemplateRef, transition, trigger, ViewChild} from '@angular/core';
import {inputConfig} from '../../../shared/input-config';
import {scrollBars} from '../../../shared/scroll-bars';
import * as _ from 'lodash';
import {UploadedFilesComponent} from "../../../shared/uploaded-files/uploaded-files.component";

declare let moment: any;

@Component({
  selector: 'app-packaging',
  templateUrl: './packaging.component.html',
  styleUrls: ['./packaging.component.css'],
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
export class PackagingComponent implements OnInit {
  @Input() packaging;

  inputConfig = inputConfig;
  scrollBars = scrollBars;

  // options for select boxes
  packages: any[];
  packageTypes: any[];
  sizeUnits: any[];

  // properties for currently added packaging item
  pkg: string[];
  description: string;
  barcode: string;
  packageType: string[];
  packageTypeOther: string;
  capacity: string;
  sizeUnit: string[];
  packageMaterial: string;
  packageMaterialSpecFiles: any[] = [];
  specificationsFile: any[] = [];
  photoFiles: any[] = [];
  recycled: boolean;
  foodGrade: boolean;
  heavyMetals: boolean;
  fatalities: boolean;
  leakage: boolean;
  migration: boolean;
  crm: boolean;
  sealed: boolean;
  manufacturerFiles: any[] = [];


  constructor() { }

  ngOnInit() {
    this.packages = _.map(scrollBars.packages, (val, key) => {
      return {id: key, name: val.heb};
    });
    this.packageTypes = _.map(scrollBars.packageTypes, (val, key) => {
      return {id: key, name: val.heb};
    });
    this.sizeUnits = _.map(scrollBars.sizeUnits, (val, key) => {
      return {id: key, name: val.heb};
    });
  }


  get diagnostic() {
    return JSON.stringify(this.packaging, null, 4);
  }

  onFileUploaded(modelName, event) {
    event.uploadDate = moment(event.uploadDate).format('D/M/YYYY-HH:mm');
    this[modelName].push(event);
  }
}
