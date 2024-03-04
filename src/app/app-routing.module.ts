import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { JudgementComponent } from './judgement/judgement.component';

const routes: Routes = [{
  path:'judgment', component: JudgementComponent
}];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
