
import { Component, EventEmitter, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { MatGridListModule } from '@angular/material/grid-list';

@Component({
  selector: 'app-user-input',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatButtonModule,
    MatGridListModule
  ],
  templateUrl: './user-input.component.html',
  styleUrls: ['./user-input.component.scss']
})
export class UserInputComponent {
  userName: string = '';
  workoutType: string = '';
  workoutMinutes: number = 0;

  workoutTypes: string[] = ['Running', 'Cycling', 'Swimming', 'Yoga', 'Strength Training'];

  @Output() addWorkout = new EventEmitter<{ userName: string; workoutType: string; workoutMinutes: number }>();

  onSubmit() {
    if (this.userName && this.workoutType && this.workoutMinutes > 0) {
      this.addWorkout.emit({
        userName: this.userName,
        workoutType: this.workoutType,
        workoutMinutes: this.workoutMinutes
      });
      this.userName = '';
      this.workoutType = '';
      this.workoutMinutes = 0;
    }
  }
}
