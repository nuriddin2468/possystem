import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {IsLoggedInGuard} from "./core/guards/is-logged-in.guard";
import {WrapperComponent} from "./core/wrapper/wrapper.component";

const routes: Routes = [
  {
    path: 'auth',
    loadComponent: () =>
      import('./core/auth/auth.component').then((c) => c.AuthComponent),
  },
  {
    path: '',
    component: WrapperComponent,
    children: [
      { path: '',   redirectTo: '/admin-panel', pathMatch: 'full' },
      {
        path: 'admin-panel',
        canActivate: [IsLoggedInGuard],
        loadComponent: () => import('./core/admin-panel/admin-panel.component').then(c => c.AdminPanelComponent),
      },
    ]
  },

  { path: '',   redirectTo: '/admin-panel', pathMatch: 'full' },
  { path: '**', loadComponent: () => import('./core/page-not-found/page-not-found.component').then(c => c.PageNotFoundComponent) },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
