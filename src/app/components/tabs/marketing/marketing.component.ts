import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-marketing',
  templateUrl: './marketing.component.html',
  styleUrls: ['./marketing.component.css']
})
export class MarketingComponent implements OnInit {
  @Input() marketing;
  constructor() { }

  ngOnInit() {
  }

}
