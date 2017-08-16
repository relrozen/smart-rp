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
  @ViewChild('dateTemplate') dateTemplate: TemplateRef<any>;
  @ViewChild('filesTemplate') filesTemplate: TemplateRef<any>;
  @ViewChild('deleteTemplate') deleteTemplate: TemplateRef<any>;
  @ViewChild('editTemplate') editTemplate: TemplateRef<any>;
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
  labName: string;
  testDate: Date;
  certNumber: string;
  testFiles: any[] = [];

  addedTests = [];

  currentFileList: any[] = [];

  expanded = {};
  columns: any[];

  currentlyEditedIndex = null;

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
        headerClass: 'table-header', cellClass: 'table-header', resizeable: false, width: 70
      },
      { prop: 'testName', name: 'בדיקה', headerClass: 'table-header', resizeable: false },
      { prop: 'labName', name: 'שם מעבדה', headerClass: 'table-header', resizeable: false },
      {
        cellTemplate: this.dateTemplate,
        name: 'תאריך',
        headerClass: 'table-header', cellClass: 'table-header', resizeable: false, width: 110
      },
      { prop: 'certNumber', name: 'מספר תעודה', headerClass: 'table-header', resizeable: false, width: 100 },
      {
        cellTemplate: this.filesTemplate,
        name: 'קבצים',
        headerClass: 'table-header', cellClass: 'table-header', resizeable: false, width: 50
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

  onTestSelect(test): void {
    if (test.length === 0) {
      this.selectedSubTests = [];
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
  }



  isIncludesOtherSubtest(subTests) {
    return subTests.find((st) => {
      return st.name === 'other';
    });
  }

  addTests() {
    this.addedTests.push({
      test: this.selectedTest[0],
      subTests: _.map(this.selectedSubTests, (subTest) => {
        return {
          name: subTest,
          result: null,
          area: null
        };
      }),
      otherSubTestName: this.selectedSubTestsOther,
      otherResult: null,
      otherArea: null
    });

    this.selectedTest = [];
    this.selectedSubTests = [];
    this.subTests = [];
    this.selectedSubTestsOther = null;
  }


  filterOther(subTests) {
    if (!subTests) {
      return [];
    }
    return _.filter(subTests, (test: any) => test.name !== 'other');
  }

  onFileUploaded(modelName, event) {
    event.uploadDate = moment(event.uploadDate).format('D/M/YYYY-HH:mm');
    this[modelName].push(event);
  }

  saveTest() {
    if (this.currentlyEditedIndex !== null) {
      this.lab.tests.splice(this.currentlyEditedIndex, 1);
      this.currentlyEditedIndex = null;
    }
    this.addedTests.forEach(at => {
      this.lab.tests.push({
        test: at.test,
        testName: this.getTestHebName(at.test),
        subTests: at.subTests,
        otherSubTestName: at.otherSubTestName,
        otherResult: at.otherResult,
        otherArea: at.otherArea,
        labName: this.labName,
        testDate: this.testDate,
        certNumber: this.certNumber,
        testFiles: this.testFiles
      });
    });

    this.addedTests = [];
    this.subTests = [];
    this.selectedTest = [];
    this.selectedSubTests = [];
    this.selectedSubTestsOther = null;
    this.labName = null;
    this.testDate = null;
    this.certNumber = null;
    this.testFiles = [];

    this.lab.tests = [...this.lab.tests];
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

  editTest(index) {
    this.currentlyEditedIndex = index;
    const test = this.lab.tests[index];
    this.addedTests = [{
      test: test.test,
      subTests: test.subTests,
      otherSubTestName: test.selectedSubTestsOther,
      otherResult: test.otherResult,
      otherArea: test.otherArea
    }];
    this.labName = test.labName;
    this.certNumber = test.certNumber;
    this.testFiles = test.testFiles;
    this.testDate = test.testDate;
  }

  cancelEdit() {
    this.currentlyEditedIndex = null;
  }

  getTestHebName(test) {
    return scrollBars.labTests[test].heb;
  }

  getSubTestHebName(test, subTest) {
    return scrollBars.labTests[test].children[subTest].heb;
  }

  getHeight(row: any, index: number) {
    return 40 + row.subTests.length * 20;
  }

  get diagnostic() {
    return JSON.stringify(this.lab, null, 4);
  }

}
