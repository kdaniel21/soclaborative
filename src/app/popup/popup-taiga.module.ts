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
  TUI_VALIDATION_ERRORS,
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

const minLengthValidator = ({ requiredLength }) => `It must be at least ${requiredLength} characters!`;

@NgModule({
  imports: [taiga],
  exports: [taiga],
  providers: [
    {
      provide: TUI_VALIDATION_ERRORS,
      useValue: {
        required: 'This field is required!',
        minlength: minLengthValidator,
      },
    },
  ],
})
export class PopupTaigaModule {}
