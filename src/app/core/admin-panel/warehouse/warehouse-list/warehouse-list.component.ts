import {ChangeDetectionStrategy, ChangeDetectorRef, Component, Inject, OnInit} from '@angular/core';
import { CommonModule } from '@angular/common';
import {TableComponent} from "../../../../shared/components/table/table.component";
import {SUPABASE} from "../../../../supabase.token";
import {SupabaseClient} from "@supabase/supabase-js";
import {HotToastService} from "@ngneat/hot-toast";
import {Warehouse} from "../../../../shared/types/warehouse";
import {Column} from "../../../../shared/types/grid/column";

@Component({
  selector: 'app-warehouse-list',
  standalone: true,
  imports: [CommonModule, TableComponent],
  templateUrl: './warehouse-list.component.html',
  styleUrls: ['./warehouse-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class WarehouseListComponent implements OnInit {
  warehouses: Warehouse[] = [];
  columns: Column<Warehouse>[] = [
    {
      title: 'id',
      key: 'id'
    },
    {
      title: 'title',
      key: 'title'
    },
    {
      title: 'description',
      key: 'description'
    }
  ]
  constructor(
    @Inject(SUPABASE) private supabase: SupabaseClient,
    private toast: HotToastService,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit() {
    this.supabase.from('warehouses').select('*').then(res => {
      if (res.error) {
        this.toast.error('Something went wrong, please check your internet connection');
        return;
      }
      this.warehouses = res.data as Warehouse[];
      this.cdr.markForCheck();
    })
  }
}
