import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-packaging',
  templateUrl: './packaging.component.html',
  styleUrls: ['./packaging.component.css']
})
export class PackagingComponent implements OnInit {
  @Input() packaging;
  constructor() { }

  ngOnInit() {
  }

}
