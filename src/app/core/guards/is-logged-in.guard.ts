import {Inject, Injectable} from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  createUrlTreeFromSnapshot, Router,
  RouterStateSnapshot,
  UrlTree
} from '@angular/router';
import {from, map, Observable} from 'rxjs';
import {SUPABASE} from "../../supabase.token";
import {SupabaseClient} from "@supabase/supabase-js";

@Injectable({
  providedIn: 'root'
})
export class IsLoggedInGuard implements CanActivate {

  constructor(@Inject(SUPABASE) private supabase: SupabaseClient, private router: Router) {
  }
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return from(this.supabase.auth.getSession()).pipe(
      map(res => {
        console.log(res)
        if (res.error || !res.data.session) {
         return this.router.createUrlTree(['/auth']);
        }
        return true
      })
    )
  }

}
