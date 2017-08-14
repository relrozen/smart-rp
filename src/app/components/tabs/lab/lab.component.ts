import {animate, Component, Input, OnInit, style, transition, trigger} from '@angular/core';
import {inputConfig} from '../../../shared/input-config';
import {scrollBars} from '../../../shared/scroll-bars';
import * as _ from 'lodash';
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

  constructor() { }

  ngOnInit() {
    this.tests = _.map(scrollBars.labTests, (val, key) => {
      return { id: key, name: val.heb };
    });
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
      return { id: key, name: val.heb };
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
    if (!subTests) { return []; }
    return _.filter(subTests, (test => test !== 'other'));
  }

  onFileUploaded(modelName, event) {
    event.uploadDate = moment(event.uploadDate).format('D/M/YYYY-HH:mm');
    this[modelName].push(event);
  }

  saveTest() {
    this.lab.tests.push({
      test: this.selectedTest,
      subTests: this.selectedSubTests,
      other: this.selectedSubTestsOther,
      results: this.testResults,
      labName: this.labName,
      testDate: this.testDate,
      certNumber: this.certNumber,
      testFiles: this.testFiles
    });

    this.selectedTest = []
    this.selectedSubTests = []
    this.selectedSubTestsOther = null;
    this.testResults = {};
    this.labName = null;
    this.testDate = null;
    this.certNumber = null;
    this.testFiles = [];
  }

  get diagnostic() {
    return JSON.stringify(this.testResults, null, 4);
  }

}
