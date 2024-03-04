import { NgModule } from '@angular/core';
import { BrowserModule, provideClientHydration } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { FormsModule } from '@angular/forms';
import { JudgementComponent } from './judgement/judgement.component';
import { RouterModule } from '@angular/router';
import { UploadDocsComponent } from './upload-docs/upload-docs.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    JudgementComponent,
    UploadDocsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    RouterModule
  ],
  providers: [
    provideClientHydration()
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
