import {animate, Component, Input, OnInit, style, TemplateRef, transition, trigger, ViewChild} from '@angular/core';
declare let moment: any;


@Component({
  selector: 'app-actions',
  templateUrl: './actions.component.html',
  styleUrls: ['./actions.component.css'],
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
export class ActionsComponent implements OnInit {
  @Input() actions;
  constructor() { }

  ngOnInit() {
  }

  onFileUploaded(modelName, event) {
    event.uploadDate = moment(event.uploadDate).format('D/M/YYYY-HH:mm');
    this.actions[modelName].push(event);
  }

}
