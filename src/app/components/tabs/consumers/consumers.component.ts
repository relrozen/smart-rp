import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-consumers',
  templateUrl: './consumers.component.html',
  styleUrls: ['./consumers.component.css']
})
export class ConsumersComponent implements OnInit {
  @Input() consumers;
  constructor() { }

  ngOnInit() {
  }

}
