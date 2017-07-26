import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { SelectModule } from 'ng2-select-compat'
import { FormsModule} from '@angular/forms';


import { SidebarModule } from 'ng-sidebar';

import { AppComponent } from './app.component';
import { CosCreateComponent } from './components/cos-create/cos-create.component';
import { MySelectComponent } from './shared/my-select/my-select.component';

@NgModule({
  declarations: [
    AppComponent,
    CosCreateComponent,
    MySelectComponent
  ],
  imports: [
    BrowserModule,
    SidebarModule.forRoot(),
    SelectModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
