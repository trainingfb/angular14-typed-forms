import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: 'fundamentals', loadChildren: () => import('./features/fundamentals/fundamentals.module').then(m => m.FundamentalsModule) },
  { path: 'cva', loadChildren: () => import('./features/cva/cva.module').then(m => m.CvaModule) },
  { path: '', redirectTo: 'fundamentals', pathMatch: 'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
