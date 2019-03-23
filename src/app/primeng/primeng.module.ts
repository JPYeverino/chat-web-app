import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import * as Primeng from 'primeng/primeng';
import {TableModule} from 'primeng/table';
import {ToastModule} from 'primeng/toast';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    Primeng.ButtonModule,
    Primeng.ToolbarModule,
    Primeng.SplitButtonModule,
    Primeng.CardModule,
    Primeng.DataTableModule,
    TableModule,
    Primeng.SidebarModule,
    ToastModule,
    Primeng.ScrollPanelModule,
    Primeng.InputTextModule,
    Primeng.DialogModule,
    Primeng.TabMenuModule,
    Primeng.MessageModule,
    Primeng.PanelModule
  ],
  exports:[
    Primeng.ButtonModule,
    Primeng.ToolbarModule,
    Primeng.SplitButtonModule,
    Primeng.CardModule,
    Primeng.DataTableModule,
    TableModule,
    Primeng.SidebarModule,
    ToastModule,
    Primeng.ScrollPanelModule,
    Primeng.InputTextModule,
    Primeng.DialogModule,
    Primeng.TabMenuModule,
    Primeng.MessageModule,
    Primeng.PanelModule
  ]
})
export class PrimengModule { }
