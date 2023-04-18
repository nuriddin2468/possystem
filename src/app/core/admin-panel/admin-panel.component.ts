import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import {TableComponent} from "../../shared/components/table/table.component";

@Component({
  selector: 'app-admin-panel',
  standalone: true,
  imports: [CommonModule, TableComponent],
  templateUrl: './admin-panel.component.html',
  styleUrls: ['./admin-panel.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AdminPanelComponent {

}
