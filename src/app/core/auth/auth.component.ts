import {ChangeDetectionStrategy, ChangeDetectorRef, Component, Inject} from '@angular/core';
import {CommonModule, NgOptimizedImage} from '@angular/common';
import {FormControl, FormGroup, ReactiveFormsModule, Validators,} from '@angular/forms';
import {ValidateControlDirective} from "../../shared/directives/validate-control.directive";
import {SupabaseClient} from "@supabase/supabase-js";
import {SUPABASE} from "../../supabase.token";
import {HotToastService} from "@ngneat/hot-toast";
import {Router} from "@angular/router";

@Component({
  selector: 'app-auth',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, NgOptimizedImage, ValidateControlDirective],
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AuthComponent {
  isLoading = false;
  form = new FormGroup({
    email: new FormControl<string>('', {
      nonNullable: true,
      validators: [Validators.required, Validators.minLength(4), Validators.email],
    }),
    password: new FormControl<string>('', {
      nonNullable: true,
      validators: [Validators.required, Validators.minLength(4)],
    }),
    remember: new FormControl<boolean>(false, { nonNullable: true }),
  });

  constructor(
    @Inject(SUPABASE) private supabase: SupabaseClient,
    private toast: HotToastService,
    private cdr: ChangeDetectorRef,
    private router: Router
  ) {
  }

  submit() {
    const {email, password} = this.form.value;
    if (this.form.invalid || (!email || !password)) return;
    this.isLoading = true;
    this.cdr.markForCheck();
    this.supabase.auth.signInWithPassword({email, password})
      .then((res) => {
        if (res.error) {
          this.toast.error('Ups, something went wrong, please try again!');
          this.isLoading = false;
          this.cdr.markForCheck();
          return;
        }
        this.toast.success('You have been logged in successfully');
        this.router.navigate(['']);
      });
  }
}
