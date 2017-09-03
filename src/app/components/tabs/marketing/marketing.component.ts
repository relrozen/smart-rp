import {animate, Component, Input, OnInit, style, TemplateRef, transition, trigger, ViewChild} from '@angular/core';
import { inputConfig} from '../../../shared/input-config';
declare let moment: any;
import * as _ from 'lodash';


@Component({
  selector: 'app-marketing',
  templateUrl: './marketing.component.html',
  styleUrls: ['./marketing.component.css'],
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
export class MarketingComponent implements OnInit {
  @Input() marketing;

  formula = [{id: 1, name: 'סתם'}, {id: 2, name: 'סתם2'}];

  inputConfig = inputConfig;

  _ = _;

  constructor() { }

  ngOnInit() {
  }

  onFileUploaded(modelName, event) {
    event.uploadDate = moment(event.uploadDate).format('D/M/YYYY-HH:mm');
    this.marketing[modelName].push(event);
  }

}
