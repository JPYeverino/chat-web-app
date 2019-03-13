import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import * as Primeng from 'primeng/primeng';
import {TableModule} from 'primeng/table';



@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    Primeng.ButtonModule,
    Primeng.ToolbarModule,
    Primeng.SplitButtonModule,
    Primeng.CardModule,
    Primeng.DataTableModule,
    TableModule
  ],
  exports:[
    Primeng.ButtonModule,
    Primeng.ToolbarModule,
    Primeng.SplitButtonModule,
    Primeng.CardModule,
    Primeng.DataTableModule,
    TableModule
  ]
})
export class PrimengModule { }
