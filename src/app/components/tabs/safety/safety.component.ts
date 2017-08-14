import {Component, Input, OnInit} from '@angular/core';

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

}
