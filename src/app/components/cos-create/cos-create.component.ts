import {Component, trigger, transition, style, animate, state, OnInit} from '@angular/core'
import { scrollBars } from '../../shared/scroll-bars';
import * as _ from "lodash";

@Component({
	selector: 'cos-create',
	templateUrl: './cos-create.component.html',
	styleUrls: ['./cos-create.component.css'],
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
export class CosCreateComponent implements OnInit {
	

	selectedTab = 1
	tabs = [
		{
			id: 1,
			hebText: 'איפיון'
		},
		{
			id: 2,
			hebText: 'פורמולה'
		},
		{
			id: 3,
			hebText: 'אריזות'
		},
		{
			id: 4,
			hebText: 'מעבדה'
		},
		{
			id: 5,
			hebText: 'תיווי'
		},
		{
			id: 6,
			hebText: 'טענות שיווקיות',
			longText: true
		},
		{
			id: 7,
			hebText: 'הערכת בטיחות',
			longText: true
		},
		{
			id: 8,
			hebText: 'פניות צרכנים',
			longText: true
		},
		{
			id: 9,
			hebText: 'שונות'
		},
	]
	constructor() {}


	ngOnInit() {}

	selectTab(id) {
		this.selectedTab = id;
	}
}


