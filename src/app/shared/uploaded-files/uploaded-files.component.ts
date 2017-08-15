import { Component, EventEmitter, OnInit, Input, Output, trigger, transition, style, animate, TemplateRef, ViewChild } from '@angular/core';

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
  columns: any[];
  @Input() filesList;
  @Input() hideIcon = false;

  @ViewChild('downloadTemplate') downloadTemplate: TemplateRef<any>;
  @ViewChild('deleteTemplate') deleteTemplate: TemplateRef<any>;


  showUploadedFilesModal = false;

  constructor() { }


  ngOnInit() {
    this.columns = [
      { prop: 'filename', name: 'שם הקובץ', headerClass: 'table-header', cellClass: 'table-header', resizeable: false },
      { prop: 'uploadDate', name: 'תאריך העלאה', headerClass: 'table-header', cellClass: 'table-header', resizeable: false },
      { prop: 'note', name: 'הערות', headerClass: 'table-header', cellClass: 'table-header', resizeable: false },
      {
        cellTemplate: this.downloadTemplate,
        name: 'הורדה',
        width: 50, headerClass: 'table-header', cellClass: 'table-header', resizeable: false },
      {
        cellTemplate: this.deleteTemplate,
        name: 'מחיקה',
        width: 50, headerClass: 'table-header', cellClass: 'table-header', resizeable: false },
    ];
  }

  public openUploadedFiles() {
    this.showUploadedFilesModal = true;

  }

  closeUploadedFiles() {
    this.showUploadedFilesModal = false;
  }

}
