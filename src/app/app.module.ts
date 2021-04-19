import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {
  iconsPathFactory,
  TuiModeModule,
  TuiNotificationModule,
  TuiRootModule,
  TuiSvgModule,
  TuiThemeNightModule,
  TUI_ICONS_PATH,
} from '@taiga-ui/core';
import { PopupModule } from './popup/popup.module';
import { GraphQLModule } from './graphql.module';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    TuiRootModule,
    TuiThemeNightModule,
    TuiModeModule,
    TuiNotificationModule,
    TuiSvgModule,
    PopupModule,
    GraphQLModule,
    HttpClientModule,
  ],
  providers: [
    {
      provide: TUI_ICONS_PATH,
      useValue: iconsPathFactory('assets/taiga-ui/icons'),
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
