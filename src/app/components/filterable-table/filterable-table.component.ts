import {
  AfterContentInit,
  Component,
  ContentChild,
  ContentChildren,
  EventEmitter,
  Input,
  OnInit,
  Output,
  QueryList,
  ViewChild,
} from '@angular/core';
import { DataSource } from "@angular/cdk/collections";
import { MatColumnDef, MatHeaderRowDef, MatNoDataRow, MatRowDef, MatTable } from "@angular/material/table";
import { Observable, of } from "rxjs";
import { SecuritiesFilter } from 'src/app/models/securitiesFilter';

@Component({
  selector: 'filterable-table',
  templateUrl: './filterable-table.component.html',
  styleUrls: ['./filterable-table.component.scss'],
})
export class FilterableTableComponent<T> implements AfterContentInit {
  @ContentChildren(MatHeaderRowDef) headerRowDefs: QueryList<MatHeaderRowDef>;
  @ContentChildren(MatRowDef) rowDefs: QueryList<MatRowDef<T>>;
  @ContentChildren(MatColumnDef) columnDefs: QueryList<MatColumnDef>;
  @ContentChild(MatNoDataRow) noDataRow: MatNoDataRow;

  @ViewChild(MatTable, {static: true}) table: MatTable<T>;

  @Input() columns: string[];

  @Output() filter: EventEmitter<SecuritiesFilter> = new EventEmitter<SecuritiesFilter>();

  @Input() dataSource: readonly T[] | DataSource<T> | Observable<readonly T[]> | Observable<T[]>;
  @Input() isLoading: boolean;

  constructor() {}
 
  ngAfterContentInit() {
  
    this.columnDefs.forEach(columnDef => this.table.addColumnDef(columnDef));
    this.rowDefs.forEach(rowDef => this.table.addRowDef(rowDef));
    this.headerRowDefs.forEach(headerRowDef => this.table.addHeaderRowDef(headerRowDef));
    this.table.setNoDataRow(this.noDataRow);
  }

  onFilter(filter: SecuritiesFilter) {
    this.filter.emit(filter);
  }

}
