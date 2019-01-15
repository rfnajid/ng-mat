import { Component, ViewChild, OnInit } from '@angular/core';
import { map } from 'rxjs/operators';
import { Breakpoints, BreakpointObserver } from '@angular/cdk/layout';
import { MatPaginator, MatSort } from '@angular/material';
import { DetailsDataSource } from './details-datasource';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.scss']
})
export class DetailsComponent implements OnInit {

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  dataSource: DetailsDataSource;

  /** Columns displayed in the table. Columns IDs can be added, removed, or reordered. */
  displayedColumns = ['id', 'name', 'baseproduct', 'riderproduct', 'updatedate', 'updateby', 'actions'];

  constructor(private breakpointObserver: BreakpointObserver) {}

  ngOnInit() {
    this.dataSource = new DetailsDataSource(this.paginator, this.sort);
  }
}
