import { Component, EventEmitter, OnInit, Output, trigger, transition, style, animate } from '@angular/core';
import { FileSelectDirective, FileDropDirective } from 'ng2-file-upload/ng2-file-upload';
import { FileUploader } from 'ng2-file-upload/ng2-file-upload';

const URL = '/upload';

@Component({
	selector: 'file-upload',
	templateUrl: './file-upload.component.html',
	styleUrls: ['./file-upload.component.css'],
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
export class FileUploadComponent implements OnInit {
	@Output() fileUploaded = new EventEmitter();

	public uploader:FileUploader = new FileUploader({url: URL, itemAlias: 'photo'});
	public isFileDragOver = false;
	public showFileUploadModal = false;


	constructor() { }

	ngOnInit() {
		this.uploader.onAfterAddingFile = (file)=> { 
			file.withCredentials = false;
		};
		//overide the onCompleteItem property of the uploader so we are 
		//able to deal with the server response.
		this.uploader.onCompleteItem = (item:any, response:any, status:any, headers:any) => {
			console.log("ImageUpload:uploaded:", item, status, response);
			if (item.isUploaded) {
				var res = JSON.parse(response);
				this.fileUploaded.emit({
					filename: item.file.name,
					uploadDate: new Date(),
					note: item.note,
					path: res.path
				});
			}
		};	
	}

	onDragOver() {
		this.isFileDragOver = true;
	}

	onDragLeave() {
		this.isFileDragOver = false;
	}

	openFileUpload() {
		this.showFileUploadModal = true;
	}

	closeFileUpload(event) {
		this.showFileUploadModal = false;
	}
}
