import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {HttpClientModule} from '@angular/common/http';

import { TreeModule } from 'angular-tree-component';

import { FileTreeComponent } from './file-tree/file-tree.component';
import {FileTreeHttpService} from './file-tree/file-tree.http.service';

@NgModule({
  declarations: [
    FileTreeComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    TreeModule.forRoot()
  ],
  providers: [FileTreeHttpService],
  bootstrap: [FileTreeComponent]
})
export class AppModule { }
