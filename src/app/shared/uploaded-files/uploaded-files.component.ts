import { Component, EventEmitter, OnInit, Input, Output, trigger, transition, style, animate } from '@angular/core';

@Component({
  selector: 'uploaded-files',
  templateUrl: './uploaded-files.component.html',
  styleUrls: ['./uploaded-files.component.css'],
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
export class UploadedFilesComponent implements OnInit {
  @Input() filesList;
  columns = [
    { prop: 'filename', name: "שם הקובץ" },
    { prop: 'uploadDate', name: "תאריך העלאה" },
    { prop: 'note', name: "הערות" },
    { prop: 'download', name: "הורדה" }

  ];

  showUploadedFilesModal = false;

  constructor() { }


  ngOnInit() {
  }

  openUploadedFiles() {
    this.showUploadedFilesModal = true;
  }

}
