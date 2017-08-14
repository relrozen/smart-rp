import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { SelectModule } from 'ng2-select-compat';
import { FormsModule} from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FileSelectDirective, FileDropDirective } from 'ng2-file-upload';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { NKDatetimeModule } from 'ng2-datetime/ng2-datetime';
import { SidebarModule } from 'ng-sidebar';
import * as $ from 'jquery';


import { AppComponent } from './app.component';
import { CosCreateComponent } from './components/cos-create/cos-create.component';
import { MySelectComponent } from './shared/my-select/my-select.component';
import { SpecComponent } from './components/tabs/spec/spec.component';
import { ModalComponent } from './shared/modal/modal.component';
import { FileUploadComponent } from './shared/file-upload/file-upload.component';
import { UploadedFilesComponent } from './shared/uploaded-files/uploaded-files.component';
import { ProductService } from './services/product.service';
import { HttpModule } from '@angular/http';
import { MultiselectDropdownModule } from 'angular-2-dropdown-multiselect';

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
    HttpModule,
    BrowserModule,
    SidebarModule.forRoot(),
    SelectModule,
    FormsModule,
    BrowserAnimationsModule,
    NgxDatatableModule,
    NKDatetimeModule,
    MultiselectDropdownModule
  ],
  providers: [ProductService],
  bootstrap: [AppComponent]
})
export class AppModule { }
