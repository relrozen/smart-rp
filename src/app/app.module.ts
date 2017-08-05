import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { SelectModule } from 'ng2-select-compat'
import { FormsModule} from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FileSelectDirective, FileDropDirective } from 'ng2-file-upload';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';




import { SidebarModule } from 'ng-sidebar';

import { AppComponent } from './app.component';
import { CosCreateComponent } from './components/cos-create/cos-create.component';
import { MySelectComponent } from './shared/my-select/my-select.component';
import { SpecComponent } from './components/tabs/spec/spec.component';
import { ModalComponent } from './shared/modal/modal.component';
import { FileUploadComponent } from './shared/file-upload/file-upload.component';
import { UploadedFilesComponent } from './shared/uploaded-files/uploaded-files.component';

@NgModule({
  declarations: [
    AppComponent,
    CosCreateComponent,
    MySelectComponent,
    SpecComponent,
    FileSelectDirective,
    FileDropDirective,
    ModalComponent,
    FileUploadComponent,
    UploadedFilesComponent
  ],
  imports: [
    BrowserModule,
    SidebarModule.forRoot(),  
    SelectModule,
    FormsModule,
    BrowserAnimationsModule,
    NgxDatatableModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
