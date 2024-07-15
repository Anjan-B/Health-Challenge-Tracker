
import { Component, EventEmitter, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';

@Component({
  selector: 'app-workout-filter',
  standalone: true,
  imports: [CommonModule, FormsModule, MatFormFieldModule, MatSelectModule],
  templateUrl: './workout-filter.component.html',
  styleUrls: ['./workout-filter.component.scss']
})
export class WorkoutFilterComponent {
  workoutTypes = ['All', 'Running', 'Cycling', 'Swimming', 'Yoga'];
  @Output() filter = new EventEmitter<string>();

  onFilter(filterTerm: string) {
    this.filter.emit(filterTerm);
  }
}
