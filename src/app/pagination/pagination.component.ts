
import { Component, EventEmitter, Output, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatPaginatorModule } from '@angular/material/paginator';

@Component({
  selector: 'app-pagination',
  standalone: true,
  imports: [CommonModule, MatPaginatorModule],
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.scss']
})
export class PaginationComponent {
  @Input() page: number = 1;
  @Input() itemsPerPage: number = 5;
  @Input() totalItems: number = 0;
  @Output() pageChange = new EventEmitter<number>();

  pageSizeOptions: number[] = [5, 10, 25, 100];

  onPageChange(event: any) {
    this.pageChange.emit(event.pageIndex + 1); 
  }
}
