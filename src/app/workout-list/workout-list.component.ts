
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { WorkoutService } from '../workout.service';
import { WorkoutListItem } from '../workout.model';
import { WorkoutSearchComponent } from '../workout-search/workout-search.component';
import { WorkoutFilterComponent } from '../workout-filter/workout-filter.component';
import { PaginationComponent } from '../pagination/pagination.component';
import { UserInputComponent } from '../user-input/user-input.component'; 

@Component({
  selector: 'app-workout-list',
  standalone: true,
  imports: [
    CommonModule,
    MatTableModule,
    WorkoutSearchComponent,
    WorkoutFilterComponent,
    PaginationComponent,
    UserInputComponent 
  ],
  templateUrl: './workout-list.component.html',
  styleUrls: ['./workout-list.component.scss']
})
export class WorkoutListComponent implements OnInit {
  
  workouts: WorkoutListItem[] = [];
  filteredWorkouts: WorkoutListItem[] = [];
  displayedColumns: string[] = ['userName', 'workoutType', 'numberOfWorkouts', 'totalWorkoutMinutes'];
  page = 1;
  itemsPerPage = 5;

  constructor(private workoutService: WorkoutService) {}

  ngOnInit() {
    this.workouts = this.workoutService.getWorkouts();
    this.filteredWorkouts = this.workouts;
  }

  onSearch(searchTerm: string) {
    this.filteredWorkouts = this.workouts.filter(workout => workout.userName.includes(searchTerm));
    this.page = 1;
  }

  onFilter(filterTerm: string) {
    if (filterTerm === 'All') {
      this.filteredWorkouts = this.workouts;
    } else {
      this.filteredWorkouts = this.workouts.filter(workout => workout.workoutType.includes(filterTerm));
    }
    this.page = 1;
  }

  onPageChange(page: number) {
    this.page = page;
  }

  addWorkout(workout: { userName: string; workoutType: string; workoutMinutes: number }) {
    const existingWorkout = this.workouts.find(
      w => w.userName === workout.userName && w.workoutType.includes(workout.workoutType)
    );

    if (existingWorkout) {
      existingWorkout.numberOfWorkouts += 1;
      existingWorkout.totalWorkoutMinutes += workout.workoutMinutes;
    } else {
      this.workouts.push({
        userName: workout.userName,
        workoutType: workout.workoutType,
        numberOfWorkouts: 1,
        totalWorkoutMinutes: workout.workoutMinutes
      });
    }

    this.filteredWorkouts = [...this.workouts];
    this.page = Math.ceil(this.filteredWorkouts.length / this.itemsPerPage);
  }

  get paginatedWorkouts(): WorkoutListItem[] {
    const start = (this.page - 1) * this.itemsPerPage;
    const end = start + this.itemsPerPage;
    return this.filteredWorkouts.slice(start, end);
  }
}
