import {Component, Input, OnInit} from '@angular/core';

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

}
