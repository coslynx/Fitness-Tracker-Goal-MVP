import { Goal } from '@/types';

export const validateGoalInput = (goalInput: { name: string; target: string; deadline: string }): string[] => {
  const errors: string[] = [];

  if (!goalInput.name) {
    errors.push('Goal name is required');
  }

  if (!goalInput.target) {
    errors.push('Target is required');
  }

  if (!goalInput.deadline) {
    errors.push('Deadline is required');
  }

  const deadlineDate = new Date(goalInput.deadline);
  const today = new Date();

  if (deadlineDate <= today) {
    errors.push('Deadline must be a future date');
  }

  return errors;
};