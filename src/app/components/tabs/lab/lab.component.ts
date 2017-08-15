import {animate, Component, Input, OnInit, style, TemplateRef, transition, trigger, ViewChild} from '@angular/core';
import {inputConfig} from '../../../shared/input-config';
import {scrollBars} from '../../../shared/scroll-bars';
import * as _ from 'lodash';
import {UploadedFilesComponent} from "../../../shared/uploaded-files/uploaded-files.component";

declare let moment: any;

@Component({
  selector: 'app-lab',
  templateUrl: './lab.component.html',
  styleUrls: ['./lab.component.css'],
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
export class LabComponent implements OnInit {
  @Input() lab;

  @ViewChild('myTable') table: any;
  @ViewChild('expandBtnTemplate') expandBtnTemplate: TemplateRef<any>;
  @ViewChild('filesTemplate') filesTemplate: TemplateRef<any>;
  @ViewChild('deleteTemplate') deleteTemplate: TemplateRef<any>;
  @ViewChild('fileListViewer') fileListViewer: UploadedFilesComponent;

  inputConfig = inputConfig;
  scrollBars = scrollBars;

  // options for select boxes
  tests: any[];
  subTests: any[];

  // properties for currently added test
  selectedTest: string[];
  selectedSubTests: string[] = [];
  selectedSubTestsOther: string;
  testResults: any = {};
  labName: string;
  testDate: Date;
  certNumber: string;
  testFiles: any[] = [];

  currentFileList: any[] = [];

  expanded = {};
  columns: any[];

  constructor() {
  }

  ngOnInit() {
    this.tests = _.map(scrollBars.labTests, (val, key) => {
      return {id: key, name: val.heb};
    });
    this.columns = [
      {
        cellTemplate: this.expandBtnTemplate,
        name: 'תוצאות',
        headerClass: 'table-header', cellClass: 'table-header', resizeable: false
      },
      { prop: 'testName', name: 'בדיקה', headerClass: 'table-header', resizeable: false },
      { prop: 'labName', name: 'שם מעבדה', headerClass: 'table-header', resizeable: false },
      { prop: 'testDate', name: 'תאריך', headerClass: 'table-header', resizeable: false },
      { prop: 'certNumber', name: 'מספר תעודה', headerClass: 'table-header', resizeable: false },
      {
        cellTemplate: this.filesTemplate,
        name: 'קבצים',
        headerClass: 'table-header', cellClass: 'table-header', resizeable: false
      },
      {
        cellTemplate: this.deleteTemplate,
        name: 'מחיקה',
        headerClass: 'table-header', cellClass: 'table-header', resizeable: false
      }
    ];
  }

  onTestSelect(test): void {
    if (test.length === 0) {
      this.selectedSubTests = [];
      this.onSubTestSelected([]);
      return;
    }
    test = test[0];
    const children = scrollBars.labTests[test].children;
    this.subTests = _.map(children, (val: any, key) => {
      return {id: key, name: val.heb};
    });
    if (this.subTests.length === 1) {
      this.selectedSubTests = [this.subTests[0].id];
    } else {
      this.selectedSubTests = [];
    }
    this.onSubTestSelected(this.selectedSubTests);
  }

  onSubTestSelected(curSubTests) {
    curSubTests.forEach((st) => {
      if (!this.testResults[st]) {
        this.testResults[st] = {
          result: null,
          area: null
        };
      }
    });
    _.forEach(this.testResults, (val, key) => {
      if (!curSubTests.includes(key)) {
        delete this.testResults[key];
      }
    });
  }


  filterOther(subTests) {
    if (!subTests) {
      return [];
    }
    return _.filter(subTests, (test => test !== 'other'));
  }

  onFileUploaded(modelName, event) {
    event.uploadDate = moment(event.uploadDate).format('D/M/YYYY-HH:mm');
    this[modelName].push(event);
  }

  saveTest() {
    this.lab.tests.push({
      test: this.selectedTest[0],
      testName: this.scrollBars.labTests[this.selectedTest[0]].heb,
      subTests: this.selectedSubTests,
      other: this.selectedSubTestsOther,
      results: this.testResults,
      labName: this.labName,
      testDate: this.testDate,
      certNumber: this.certNumber,
      testFiles: this.testFiles
    });

    this.subTests = [];
    this.selectedTest = [];
    this.selectedSubTests = [];
    this.selectedSubTestsOther = null;
    this.testResults = {};
    this.labName = null;
    this.testDate = null;
    this.certNumber = null;
    this.testFiles = [];
  }

  toggleExpandRow(row, rowIndex) {
    if (this.expanded[rowIndex]) {
      this.expanded[rowIndex] = !this.expanded[rowIndex];
    } else {
      this.expanded[rowIndex] = true;
    }
    this.table.rowDetail.toggleExpandRow(row);
  }

  showTestFiles(testFiles) {
    this.currentFileList = testFiles;
    this.fileListViewer.openUploadedFiles();
  }

  deleteTest(index) {
    this.lab.tests.splice(index, 1);
  }

  get diagnostic() {
    return JSON.stringify(this.testResults, null, 4);
  }

}
