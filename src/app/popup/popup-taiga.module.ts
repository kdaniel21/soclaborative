import { NgModule } from '@angular/core';
import { TuiButtonModule, TuiSvgModule } from '@taiga-ui/core';
import {
  TuiFieldErrorModule,
  TuiInputModule,
  TuiStepperModule,
  TuiTabsModule,
} from '@taiga-ui/kit';

const taiga = [
  TuiSvgModule,
  TuiTabsModule,
  TuiStepperModule,
  TuiInputModule,
  TuiButtonModule,
  TuiFieldErrorModule,
];

@NgModule({
  imports: [taiga],
  exports: [taiga],
})
export class PopupTaigaModule {}
