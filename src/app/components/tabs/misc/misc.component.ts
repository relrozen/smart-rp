import {Component, Input, OnInit} from '@angular/core';
declare let moment: any;

@Component({
  selector: 'app-misc',
  templateUrl: './misc.component.html',
  styleUrls: ['./misc.component.css']
})
export class MiscComponent implements OnInit {
  @Input() misc;
  constructor() { }

  ngOnInit() {
  }

  onFileUploaded(modelName, event) {
    event.uploadDate = moment(event.uploadDate).format('D/M/YYYY-HH:mm');
    this.misc[modelName].push(event);
  }

}
