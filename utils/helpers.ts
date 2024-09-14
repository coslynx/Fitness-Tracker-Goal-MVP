import { Goal, Workout } from '@/types';

export const calculateProgress = (goal: Goal, workouts: Workout[]): number => {
  const target = parseFloat(goal.target);
  const totalDuration = workouts.reduce((sum, workout) => sum + workout.duration, 0);
  return (totalDuration / target) * 100;
};

export const formatDate = (date: Date | string): string => {
  const d = new Date(date);
  return d.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
};

export const formatDuration = (duration: number): string => {
  const minutes = Math.floor(duration / 60);
  const seconds = Math.floor(duration % 60);
  return `${minutes}:${seconds.toString().padStart(2, '0')}`;
};