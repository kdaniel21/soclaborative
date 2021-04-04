import { NgModule } from '@angular/core';
import {
  TuiButtonModule,
  TuiHintModule,
  TuiLabelModule,
  TuiScrollbarModule,
  TuiSvgModule,
  TuiTooltipModule,
} from '@taiga-ui/core';
import {
  TuiAvatarModule,
  TuiFieldErrorModule,
  TuiInputModule,
  TuiIslandModule,
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
  TuiIslandModule,
  TuiTooltipModule,
  TuiHintModule,
  TuiAvatarModule,
  TuiScrollbarModule,
  TuiLabelModule,
];

@NgModule({
  imports: [taiga],
  exports: [taiga],
})
export class PopupTaigaModule {}
