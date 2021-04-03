import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from './navbar/navbar.component';
import { JoinComponent } from './join/join.component';
import { PopupTaigaModule } from './popup-taiga.module';
import { PopupRoutingModule } from './popup-routing.module';
import { ReactiveFormsModule } from '@angular/forms';
import { CreateComponent } from './create/create.component';

@NgModule({
  declarations: [NavbarComponent, JoinComponent, CreateComponent],
  imports: [
    CommonModule,
    PopupRoutingModule,
    PopupTaigaModule,
    ReactiveFormsModule,
  ],
  exports: [NavbarComponent],
})
export class PopupModule {}
