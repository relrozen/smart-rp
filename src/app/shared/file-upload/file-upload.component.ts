import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FileSelectDirective, FileDropDirective } from 'ng2-file-upload/ng2-file-upload';
import {  FileUploader } from 'ng2-file-upload/ng2-file-upload';

const URL = '/upload';

@Component({
	selector: 'file-upload',
	templateUrl: './file-upload.component.html',
	styleUrls: ['./file-upload.component.css']
})
export class FileUploadComponent implements OnInit {
	@Output() close = new EventEmitter()
	public uploader:FileUploader = new FileUploader({url: URL, itemAlias: 'photo'});
	public isFileDragOver = false;


	constructor() { }

	ngOnInit() {
		this.uploader.onAfterAddingFile = (file)=> { file.withCredentials = false; };
		//overide the onCompleteItem property of the uploader so we are 
		//able to deal with the server response.
		this.uploader.onCompleteItem = (item:any, response:any, status:any, headers:any) => {
			console.log("ImageUpload:uploaded:", item, status, response);
		};	
	}

	onDragOver() {
		this.isFileDragOver = true;
	}

	onDragLeave() {
		this.isFileDragOver = false;
	}

	closeFileUpload(event) {
		this.close.emit();	
	}

}
