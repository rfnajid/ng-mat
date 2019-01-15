import { DataSource } from '@angular/cdk/collections';
import { MatPaginator, MatSort } from '@angular/material';
import { map } from 'rxjs/operators';
import { Observable, of as observableOf, merge } from 'rxjs';

// TODO: Replace this with your own data model type
export interface DetailsItem {
  name: string;
  id: number;
  baseproduct: string;
  riderproduct: string;
  updatedate: string;
  updateby: string;
}

// TODO: replace this with real data from your application
const EXAMPLE_DATA: DetailsItem[] = [
  { id: 1,
    name: 'Test 1',
    baseproduct: '100000001',
    riderproduct: '500000003',
    updatedate: '11 Jan 2019 15:53',
    updateby: 'admin'
  },
  { id: 2,
    name: 'Test 2',
    baseproduct: '100000002',
    riderproduct: '500000003',
    updatedate: '12 Jan 2019 15:53',
    updateby: 'admin'
  },
  { id: 3,
    name: 'Test 1',
    baseproduct: '100000001',
    riderproduct: '500000003',
    updatedate: '11 Jan 2019 15:53',
    updateby: 'admin'
  },
  { id: 1,
    name: 'Test 1',
    baseproduct: '100000001',
    riderproduct: '500000003',
    updatedate: '11 Jan 2019 15:53',
    updateby: 'admin'
  },
  { id: 2,
    name: 'Test 2',
    baseproduct: '100000002',
    riderproduct: '500000003',
    updatedate: '12 Jan 2019 15:53',
    updateby: 'admin'
  },
  { id: 3,
    name: 'Test 1',
    baseproduct: '100000001',
    riderproduct: '500000003',
    updatedate: '11 Jan 2019 15:53',
    updateby: 'admin'
  },
  { id: 1,
    name: 'Test 1',
    baseproduct: '100000001',
    riderproduct: '500000003',
    updatedate: '11 Jan 2019 15:53',
    updateby: 'admin'
  },
  { id: 2,
    name: 'Test 2',
    baseproduct: '100000002',
    riderproduct: '500000003',
    updatedate: '12 Jan 2019 15:53',
    updateby: 'admin'
  },
  { id: 3,
    name: 'Test 1',
    baseproduct: '100000001',
    riderproduct: '500000003',
    updatedate: '11 Jan 2019 15:53',
    updateby: 'admin'
  },
  { id: 1,
    name: 'Test 1',
    baseproduct: '100000001',
    riderproduct: '500000003',
    updatedate: '11 Jan 2019 15:53',
    updateby: 'admin'
  },
  { id: 2,
    name: 'Test 2',
    baseproduct: '100000002',
    riderproduct: '500000003',
    updatedate: '12 Jan 2019 15:53',
    updateby: 'admin'
  },
  { id: 3,
    name: 'Test 1',
    baseproduct: '100000001',
    riderproduct: '500000003',
    updatedate: '11 Jan 2019 15:53',
    updateby: 'admin'
  },
  { id: 1,
    name: 'Test 1',
    baseproduct: '100000001',
    riderproduct: '500000003',
    updatedate: '11 Jan 2019 15:53',
    updateby: 'admin'
  },
  { id: 2,
    name: 'Test 2',
    baseproduct: '100000002',
    riderproduct: '500000003',
    updatedate: '12 Jan 2019 15:53',
    updateby: 'admin'
  },
  { id: 3,
    name: 'Test 1',
    baseproduct: '100000001',
    riderproduct: '500000003',
    updatedate: '11 Jan 2019 15:53',
    updateby: 'admin'
  }];

/**
 * Data source for the Details view. This class should
 * encapsulate all logic for fetching and manipulating the displayed data
 * (including sorting, pagination, and filtering).
 */
export class DetailsDataSource extends DataSource<DetailsItem> {
  data: DetailsItem[] = EXAMPLE_DATA;

  constructor(private paginator: MatPaginator, private sort: MatSort) {
    super();
  }

  /**
   * Connect this data source to the table. The table will only update when
   * the returned stream emits new items.
   * @returns A stream of the items to be rendered.
   */
  connect(): Observable<DetailsItem[]> {
    // Combine everything that affects the rendered data into one update
    // stream for the data-table to consume.
    const dataMutations = [
      observableOf(this.data),
      this.paginator.page,
      this.sort.sortChange
    ];

    // Set the paginator's length
    this.paginator.length = this.data.length;

    return merge(...dataMutations).pipe(map(() => {
      return this.getPagedData(this.getSortedData([...this.data]));
    }));
  }

  /**
   *  Called when the table is being destroyed. Use this function, to clean up
   * any open connections or free any held resources that were set up during connect.
   */
  disconnect() {}

  /**
   * Paginate the data (client-side). If you're using server-side pagination,
   * this would be replaced by requesting the appropriate data from the server.
   */
  private getPagedData(data: DetailsItem[]) {
    const startIndex = this.paginator.pageIndex * this.paginator.pageSize;
    return data.splice(startIndex, this.paginator.pageSize);
  }

  /**
   * Sort the data (client-side). If you're using server-side sorting,
   * this would be replaced by requesting the appropriate data from the server.
   */
  private getSortedData(data: DetailsItem[]) {
    if (!this.sort.active || this.sort.direction === '') {
      return data;
    }

    return data.sort((a, b) => {
      const isAsc = this.sort.direction === 'asc';
      switch (this.sort.active) {
        case 'name': return compare(a.name, b.name, isAsc);
        case 'id': return compare(+a.id, +b.id, isAsc);
        case 'baseproduct': return compare(a.name, b.name, isAsc);
        case 'riderproduct': return compare(a.name, b.name, isAsc);
        case 'updatedate': return compare(a.name, b.name, isAsc);
        case 'updateby': return compare(a.name, b.name, isAsc);
        default: return 0;
      }
    });
  }
}

/** Simple sort comparator for example ID/Name columns (for client-side sorting). */
function compare(a, b, isAsc) {
  return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
}
