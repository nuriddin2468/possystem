import {ChangeDetectionStrategy, ChangeDetectorRef, Component} from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SidebarComponent {
  isFull = false;

  constructor(
    private cdr: ChangeDetectorRef
  ) {
  }

  toggleWidth() {
    this.isFull = !this.isFull;
    this.cdr.markForCheck();
  }
}
