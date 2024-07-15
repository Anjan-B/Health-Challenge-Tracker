
export interface Workout {
  type: string;
  minutes: number;
}

export interface User {
  id: number;
  name: string;
  workouts: Workout[];
}


export interface WorkoutListItem {
  userName: string;
  workoutType: string;
  numberOfWorkouts: number;
  totalWorkoutMinutes: number;
}
