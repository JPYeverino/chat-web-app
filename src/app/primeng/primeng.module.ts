import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import * as Primeng from 'primeng/primeng';



@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    Primeng.ButtonModule,
    Primeng.ToolbarModule,
    Primeng.SplitButtonModule,
    Primeng.CardModule
  ],
  exports:[
    Primeng.ButtonModule,
    Primeng.ToolbarModule,
    Primeng.SplitButtonModule,
    Primeng.CardModule
  ]
})
export class PrimengModule { }
