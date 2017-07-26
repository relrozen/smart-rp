import { Component, OnInit } from '@angular/core';
import { scrollBars } from '../../shared/scroll-bars';
import * as _ from "lodash";

@Component({
	selector: 'cos-create',
	templateUrl: './cos-create.component.html',
	styleUrls: ['./cos-create.component.css']
})
export class CosCreateComponent implements OnInit {
	private categoriesLevel1: any[];
	private categoriesLevel2: any[];
	private categoriesLevel3: any[];
	private physicalForms: any[];
	private sex: any[];
	private ages: any[];
	private shelfLife: any[];


	product = {
		spec: {
			category1: null,
			category2: null,
			category3: null,
			physicalForm: null,
			sex: null,
			age: null,
			shelfLife: null,
			shelfLifeOther: false
		}
	}

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


	ngOnInit() {
		this.categoriesLevel1 = _.map(scrollBars.categories, (val, key) => {
			return { id: key, text: val.heb };
		});
		this.physicalForms = _.map(scrollBars.physicalForms, (val, key) => {
			return { id: key, text: val.heb };
		});
		this.sex = _.map(scrollBars.sex, (val, key) => {
			return { id: key, text: val.heb };
		})
		this.ages = _.map(scrollBars.ages, (val, key) => {
			return { id: key, text: val.heb };
		})
		this.shelfLife = _.map(scrollBars.shelfLife, (val, key) => {
			return { id: key, text: val.heb };
		})
	}

	selectTab(id) {
		this.selectedTab = id;
	}

	public items:Array<string> = ["תל אביב", "גבעתיים", "אשדוד"];
 
	private value:any = {};
	private _disabledV:string = '0';
	private disabled:boolean = false;
 
	private get disabledV():string {
		return this._disabledV;
	}
 
	private set disabledV(value:string) {
		this._disabledV = value;
		this.disabled = this._disabledV === '1';
	}
 
	public selected(value:any):void {
		console.log('Selected value is: ', value);
	}
 
	public removed(value:any):void {
		console.log('Removed value is: ', value);
	}
 
	public typed(value:any):void {
		console.log('New search input: ', value);
	}
 
	public refreshValue(value:any):void {
		this.value = value;
	}

	onCategory1Select(cat:string):void {
		var children = scrollBars.categories[cat].children;
		this.categoriesLevel2 = _.map(children, (val:any, key) => {
			return { id: key, text: val.heb };
		})
		this.product.spec.category2 = null;
		this.product.spec.category3 = null;
	}

	onCategory2Select(cat:string):void {
		var children = scrollBars.categories[this.product.spec.category1].children[cat].children;
		this.categoriesLevel3 = _.map(children, (val:any, key) => {
			return { id: key, text: val.heb };
		})
		this.product.spec.category3 = null;
	}
}


