import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { SelectModule } from 'ng2-select-compat';
import { FormsModule} from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
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
import { IngredientService } from './services/ingredient.service';
import { RawMaterialService } from './services/raw-material.service';
import { HttpModule } from '@angular/http';
import { MultiselectDropdownModule } from 'angular-2-dropdown-multiselect';
import { PackagingComponent } from './components/tabs/packaging/packaging.component';
import { SafetyComponent } from './components/tabs/safety/safety.component';
import { FormulaComponent } from './components/tabs/formula/formula.component';
import { LabComponent } from './components/tabs/lab/lab.component';
import { LabelComponent } from './components/tabs/label/label.component';
import { MarketingComponent } from './components/tabs/marketing/marketing.component';
import { ConsumersComponent } from './components/tabs/consumers/consumers.component';
import { MiscComponent } from './components/tabs/misc/misc.component';
import { ActionsComponent } from './components/tabs/actions/actions.component';

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
    UploadedFilesComponent,
    PackagingComponent,
    SafetyComponent,
    FormulaComponent,
    LabComponent,
    LabelComponent,
    MarketingComponent,
    ConsumersComponent,
    MiscComponent,
    ActionsComponent
  ],
  imports: [
    HttpModule,
    HttpClientModule,
    BrowserModule,
    SidebarModule.forRoot(),
    SelectModule,
    FormsModule,
    BrowserAnimationsModule,
    NgxDatatableModule,
    NKDatetimeModule,
    MultiselectDropdownModule
  ],
  providers: [
    ProductService,
    IngredientService,
    RawMaterialService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
