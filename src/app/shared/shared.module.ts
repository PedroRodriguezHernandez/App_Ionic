import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './components/header/header.component';
import { CostumInputComponent } from './components/costum-input/costum-input.component';
import { IonicModule } from '@ionic/angular';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LogoComponent } from './components/logo/logo.component';
import { AddUpdateProductComponent } from './components/add-update-product/add-update-product.component';



@NgModule({
  declarations: [
    HeaderComponent,
    CostumInputComponent,
    LogoComponent,
    AddUpdateProductComponent
  ],
  exports:[
    HeaderComponent,
    CostumInputComponent,
    LogoComponent,
    ReactiveFormsModule,
    AddUpdateProductComponent
  ],
  imports: [
    CommonModule,
    IonicModule,
    ReactiveFormsModule,
    FormsModule
  ]
})
export class SharedModule { }
