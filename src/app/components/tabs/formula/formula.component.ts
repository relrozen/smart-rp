import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-formula',
  templateUrl: './formula.component.html',
  styleUrls: ['./formula.component.css']
})
export class FormulaComponent implements OnInit {
  @Input() formula;
  constructor() { }

  ngOnInit() {
  }

}
