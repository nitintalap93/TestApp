import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { JudgementComponent } from './judgement/judgement.component';
import { HomeComponent } from './home/home.component';
import { FileUploadComponent } from './file-upload/file-upload.component';

const routes: Routes = [
  {
    path: '', component: HomeComponent, pathMatch: "full"
  },
  {
    path: 'home', component: HomeComponent
  },
  {
    path: 'judgment',
    // component: JudgementComponent
    loadComponent: () =>
      import('./judgement/judgement.component').then((x) => x.JudgementComponent)
  },
  {
    path: 'fileUpload',
    loadComponent: () =>
      import('./file-upload/file-upload.component').then((x) => x.FileUploadComponent)
  }];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
