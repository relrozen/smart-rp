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

  @ViewChild('myTable') table: any;
  @ViewChild('expandBtnTemplate') expandBtnTemplate: TemplateRef<any>;
  @ViewChild('packageTemplate') packageTemplate: TemplateRef<any>;
  @ViewChild('packageTypeTemplate') packageTypeTemplate: TemplateRef<any>;
  @ViewChild('capacityTemplate') capacityTemplate: TemplateRef<any>;
  @ViewChild('filesTemplate') filesTemplate: TemplateRef<any>;
  @ViewChild('deleteTemplate') deleteTemplate: TemplateRef<any>;
  @ViewChild('editTemplate') editTemplate: TemplateRef<any>;
  @ViewChild('fileListViewer') fileListViewer: UploadedFilesComponent;

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
  specificationsFiles: any[] = [];
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

  expanded = {};
  columns: any[];
  currentlyEditedIndex = null;

  currentFileList: any[] = [];

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

    this.columns = [
      {
        cellTemplate: this.expandBtnTemplate,
        name: 'הרחב',
        headerClass: 'table-header', cellClass: 'table-header', resizeable: false, width: 70
      },
      {
        cellTemplate: this.packageTemplate,
        name: 'אריזה',
        headerClass: 'table-header', cellClass: 'table-header', resizeable: false, width: 70
      },
      { prop: 'description', name: 'תיאור/גוון', headerClass: 'table-header', resizeable: false },
      { prop: 'barcode', name: 'ברקוד', headerClass: 'table-header', resizeable: false },
      {
        cellTemplate: this.packageTypeTemplate,
        name: 'סוג אריזה',
        headerClass: 'table-header', cellClass: 'table-header', resizeable: false, width: 70
      },
      {
        cellTemplate: this.capacityTemplate,
        name: 'קיבולת',
        headerClass: 'table-header', cellClass: 'table-header', resizeable: false, width: 70
      },
      {
        cellTemplate: this.editTemplate,
        name: 'עריכה',
        headerClass: 'table-header', cellClass: 'table-header', resizeable: false, width: 50
      },
      {
        cellTemplate: this.deleteTemplate,
        name: 'מחיקה',
        headerClass: 'table-header', cellClass: 'table-header', resizeable: false, width: 50
      }
    ];
  }

  cancelEdit() {
    this.currentlyEditedIndex = null;
  }

  savePackage() {
    if (this.currentlyEditedIndex !== null) {
      this.packaging.packages.splice(this.currentlyEditedIndex, 1);
      this.currentlyEditedIndex = null;
    }

    this.packaging.packages.push({
      pkg: this.pkg,
      description: this.description,
      barcode: this.barcode,
      packageType: this.packageType,
      packageTypeOther: this.packageTypeOther,
      capacity: this.capacity,
      sizeUnit: this.sizeUnit,
      packageMaterial: this.packageMaterial,
      packageMaterialSpecFiles: this.packageMaterialSpecFiles,
      specificationsFiles: this.specificationsFiles,
      photoFiles: this.photoFiles,
      recycled: this.recycled,
      foodGrade: this.foodGrade,
      heavyMetals: this.heavyMetals,
      fatalities: this.fatalities,
      leakage: this.leakage,
      migration: this.migration,
      crm: this.crm,
      sealed: this.sealed,
      manufacturerFiles: this.manufacturerFiles
    });

    this.pkg = null;
    this.description = null;
    this.barcode = null;
    this.packageType = null;
    this.packageTypeOther = null;
    this.capacity = null;
    this.sizeUnit = null;
    this.packageMaterial = null;
    this.packageMaterialSpecFiles = [];
    this.specificationsFiles = [];
    this.photoFiles = [];
    this.recycled = null;
    this.foodGrade = null;
    this.heavyMetals = null;
    this.fatalities = null;
    this.leakage = null;
    this.migration = null;
    this.crm = null;
    this.sealed = null;
    this.manufacturerFiles = [];

    this.packaging.packages = [...this.packaging.packages];
  }

  deletePackage(index) {
    this.packaging.packages.splice(index, 1);
  }

  editPackage(index) {
    this.currentlyEditedIndex = index;
    const p = this.packaging.packages[index];
    this.pkg = p.pkg;
    this.description = p.description;
    this.barcode = p.barcode;
    this.packageType = p.packageType;
    this.packageTypeOther = p.packageTypeOther;
    this.capacity = p.capacity;
    this.sizeUnit = p.sizeUnit;
    this.packageMaterial = p.packageMaterial;
    this.packageMaterialSpecFiles = p.packageMaterialSpecFiles;
    this.specificationsFiles = p.specificationsFiles;
    this.photoFiles = p.photoFiles;
    this.recycled = p.recycled;
    this.foodGrade = p.foodGrade;
    this.heavyMetals = p.heavyMetals;
    this.fatalities = p.fatalities;
    this.leakage = p.leakage;
    this.migration = p.migration;
    this.crm = p.crm;
    this.sealed = p.sealed;
    this.manufacturerFiles = p.manufacturerFiles;
  }


  get diagnostic() {
    return JSON.stringify(this.packaging, null, 4);
  }

  onFileUploaded(modelName, event) {
    event.uploadDate = moment(event.uploadDate).format('D/M/YYYY-HH:mm');
    this[modelName].push(event);
  }

  toggleExpandRow(row, rowIndex) {
    if (this.expanded[rowIndex]) {
      this.expanded[rowIndex] = !this.expanded[rowIndex];
    } else {
      this.expanded[rowIndex] = true;
    }
    this.table.rowDetail.toggleExpandRow(row);
  }

  showFiles(files) {
    this.currentFileList = files;
    this.fileListViewer.openUploadedFiles();
  }

  getHeight(row: any, index: number) {
    let size = 40;
    if (row.packageMaterial) {
      size += 20;
    }
    if (row.packageMaterialSpecFiles && row.packageMaterialSpecFiles > 0) {
      size += 24;
    }
    if (row.photoFiles && row.photoFiles > 0) {
      size += 24;
    }

    if (row.recycled) {
      size += 20;
    }
    if (row.foodGrade) {
      size += 20;
    }
    if (row.heavyMetals) {
      size += 20;
    }
    if (row.fatalities) {
      size += 20;
    }
    if (row.leakage) {
      size += 20;
    }
    if (row.migration) {
      size += 20;
    }
    if (row.sealed) {
      size += 20;
    }
    if (row.manufacturerFiles && row.manufacturerFiles > 0) {
      size += 24;
    }
    return size;
  }
}
