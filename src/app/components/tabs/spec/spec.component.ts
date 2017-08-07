import {Component, trigger, transition, style, animate, state, OnInit} from '@angular/core'
import { scrollBars } from '../../../shared/scroll-bars';
import * as _ from "lodash";
declare var moment: any;

@Component({
	selector: 'app-spec',
	templateUrl: './spec.component.html',
	styleUrls: ['./spec.component.css'],
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
export class SpecComponent implements OnInit {

	private categoriesLevel1: any[];
	private categoriesLevel2: any[];
	private categoriesLevel3: any[];
	private physicalForms: any[];
	private sex: any[];
	private ages: any[];
	private shelfLife: any[];

	spec = {
		category1: null,
		category2: null,
		category3: null,
		physicalForm: null,
		sex: null,
		age: null,
		shelfLife: null,
		shelfLifeOther: false,
		azvaFileList: [],
		shelfLiveOtherFileList: []
	}
	constructor() { }

	ngOnInit() {
		this.categoriesLevel1 = _.map(scrollBars.categories, (val, key) => {
			return { id: key, text: val.heb };
		});
		this.physicalForms = _.map(scrollBars.physicalForms, (val, key) => {
			return { id: key, text: val.heb };
		});
		this.sex = _.map(scrollBars.sex, (val, key) => {
			return { id: key, text: val.heb };
		});
		this.ages = _.map(scrollBars.ages, (val, key) => {
			return { id: key, text: val.heb };
		});
		this.shelfLife = _.map(scrollBars.shelfLife, (val, key) => {
			return { id: key, text: val.heb };
		});
	}

	onCategory1Select(cat:string):void {
		var children = scrollBars.categories[cat].children;
		this.categoriesLevel2 = _.map(children, (val:any, key) => {
			return { id: key, text: val.heb };
		})
		this.spec.category2 = null;
		this.spec.category3 = null;
	}

	onCategory2Select(cat:string):void {
		var children = scrollBars.categories[this.spec.category1].children[cat].children;
		this.categoriesLevel3 = _.map(children, (val:any, key) => {
			return { id: key, text: val.heb };
		})
		this.spec.category3 = null;
	}


	hasBaseDropZoneOver:boolean = false;
	hasAnotherDropZoneOver:boolean = false;

	fileOverBase(e:any):void {
		this.hasBaseDropZoneOver = e;
	}

	onFileUploaded(modelName,event) {
		event.uploadDate = moment(event.uploadDate).format("D/M/YYYY-HH:mm")
		this.spec[modelName].push(event);
	}

}