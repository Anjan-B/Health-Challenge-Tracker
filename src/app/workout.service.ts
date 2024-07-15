
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Workout, User, WorkoutListItem } from './workout.model';

@Injectable({
  providedIn: 'root'
})
export class WorkoutService {
  private userData: User[] = [
    {
      id: 1,
      name: 'John Doe',
      workouts: [
        { type: 'Running', minutes: 30 },
        { type: 'Cycling', minutes: 45 }
      ]
    },
    {
      id: 2,
      name: 'Jane Smith',
      workouts: [
        { type: 'Swimming', minutes: 60 },
        { type: 'Running', minutes: 20 }
      ]
    },
    {
      id: 3,
      name: 'Mike Johnson',
      workouts: [
        { type: 'Yoga', minutes: 50 },
        { type: 'Cycling', minutes: 40 }
      ]
    }
  ];

  private usersSubject: BehaviorSubject<User[]> = new BehaviorSubject<User[]>(this.userData);
  users$: Observable<User[]> = this.usersSubject.asObservable();

  constructor() {}

  getUsers(): Observable<User[]> {
    return this.users$;
  }

  addUserWorkout(userId: number, workout: Workout): void {
    const user = this.userData.find(u => u.id === userId);
    if (user) {
      const existingWorkout = user.workouts.find(w => w.type === workout.type);
      if (existingWorkout) {
        existingWorkout.minutes += workout.minutes;
      } else {
        user.workouts.push(workout);
      }
      this.usersSubject.next(this.userData);
    }
  }

  getWorkouts(): WorkoutListItem[] {
    let workoutsMap = new Map<string, WorkoutListItem>();

    this.userData.forEach(user => {
      let totalWorkoutMinutes = 0;
      let workoutTypes: string[] = [];
      let numberOfWorkouts = 0;

      user.workouts.forEach(workout => {
        totalWorkoutMinutes += workout.minutes;
        workoutTypes.push(workout.type);
        numberOfWorkouts += 1;
      });

      if (workoutsMap.has(user.name)) {
        let existing = workoutsMap.get(user.name);
        if (existing) {
          existing.workoutType += ', ' + workoutTypes.join(', ');
          existing.numberOfWorkouts += numberOfWorkouts;
          existing.totalWorkoutMinutes += totalWorkoutMinutes;
        }
      } else {
        workoutsMap.set(user.name, {
          userName: user.name,
          workoutType: workoutTypes.join(', '),
          numberOfWorkouts: numberOfWorkouts,
          totalWorkoutMinutes: totalWorkoutMinutes
        });
      }
    });

    return Array.from(workoutsMap.values());
  }
}
