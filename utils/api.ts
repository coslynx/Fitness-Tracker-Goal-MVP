import axios from 'axios';
import { Goal, Workout } from '@/types';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000/api';

export const getGoalsByUserId = async (userId: number): Promise<Goal[]> => {
  try {
    const response = await axios.get(`${API_URL}/goals`, {
      params: { userId },
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching goals:', error);
    return [];
  }
};

export const getWorkoutsByUserId = async (userId: number): Promise<Workout[]> => {
  try {
    const response = await axios.get(`${API_URL}/progress`, {
      params: { userId },
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching workouts:', error);
    return [];
  }
};

export const getWorkoutsByGoalId = async (goalId: number): Promise<Workout[]> => {
  try {
    const response = await axios.get(`${API_URL}/progress`);
    return response.data.filter((workout: Workout) => workout.goalId === goalId);
  } catch (error) {
    console.error('Error fetching workouts:', error);
    return [];
  }
};