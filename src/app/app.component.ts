import { Component } from '@angular/core';
import { UserInputComponent } from './user-input/user-input.component';
import { WorkoutListComponent } from './workout-list/workout-list.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [UserInputComponent, WorkoutListComponent],
  template: `
    <div class="app-container">
      
      <app-workout-list></app-workout-list>
    </div>
  `,
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title(title: any) {
    throw new Error('Method not implemented.');
  }
}
