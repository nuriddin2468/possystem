import {AfterViewInit, ChangeDetectorRef, Directive, ElementRef, Renderer2} from '@angular/core';
import {NgControl} from "@angular/forms";
import {UntilDestroy, untilDestroyed} from "@ngneat/until-destroy";

@UntilDestroy()
@Directive({
  selector: '[appValidateControl]',
  standalone: true
})
export class ValidateControlDirective implements AfterViewInit {
  private invalid = false;
  private classNames = ['bg-red-50', 'border', 'border-red-500', 'text-red-900', 'placeholder-red-700', 'focus:ring-red-500', 'focus:border-red-500', 'dark:text-red-500', 'dark:placeholder-red-500', 'dark:border-red-500'];
  constructor(
    private control: NgControl,
    private el: ElementRef,
  ) {
  }

  ngAfterViewInit(): void {
    this.control.valueChanges?.pipe(untilDestroyed(this)).subscribe(() => {
      if (this.control.invalid && !this.invalid) {
        this.el.nativeElement?.classList.add(...this.classNames);
        this.invalid = true;
      } else if (this.control.valid && this.invalid){
        this.el.nativeElement.classList.remove(...this.classNames);
        this.invalid = false;
      }
    })
    }

}
