import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-lab',
  templateUrl: './lab.component.html',
  styleUrls: ['./lab.component.css']
})
export class LabComponent implements OnInit {
  @Input() lab;
  constructor() { }

  ngOnInit() {
  }

}
