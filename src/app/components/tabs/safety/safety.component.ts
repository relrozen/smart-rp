import {Component, Input, OnInit} from '@angular/core';
declare let moment: any;

@Component({
  selector: 'app-safety',
  templateUrl: './safety.component.html',
  styleUrls: ['./safety.component.css']
})
export class SafetyComponent implements OnInit {
  @Input() safety;
  constructor() { }

  ngOnInit() {
  }

  onFileUploaded(modelName, event) {
    event.uploadDate = moment(event.uploadDate).format('D/M/YYYY-HH:mm');
    this.safety[modelName].push(event);
  }

}
