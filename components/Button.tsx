import { useState } from 'react';
import { useStore } from '@/store';
import { useRouter } from 'next/navigation';
import { toast } from 'react-hot-toast';
import { Goal, Workout } from '@/types';
import { validateGoalInput } from '@/utils/validation';

interface GoalInputProps {
  goal?: Goal;
}

const GoalInput: React.FC<GoalInputProps> = ({ goal }) => {
  const router = useRouter();
  const { addGoal, updateGoal } = useStore();
  const [name, setName] = useState(goal?.name || '');
  const [target, setTarget] = useState(goal?.target || '');
  const [deadline, setDeadline] = useState(goal?.deadline || '');

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const errors = validateGoalInput({ name, target, deadline });

    if (errors.length > 0) {
      toast.error(errors[0]);
      return;
    }

    const newGoal: Goal = {
      name,
      target,
      deadline,
      userId: 1, // Replace with actual user ID
    };

    if (goal) {
      try {
        await updateGoal(goal.id, newGoal);
        toast.success('Goal updated successfully');
        router.push('/dashboard');
      } catch (error) {
        console.error('Error updating goal:', error);
        toast.error('Failed to update goal');
      }
    } else {
      try {
        await addGoal(newGoal);
        toast.success('Goal created successfully');
        router.push('/dashboard');
      } catch (error) {
        console.error('Error creating goal:', error);
        toast.error('Failed to create goal');
      }
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
      <div>
        <label htmlFor="name" className="block text-sm font-medium text-gray-700">
          Goal Name
        </label>
        <input
          type="text"
          id="name"
          className="mt-1 block w-full rounded-md border border-gray-300 bg-white py-2 px-3 shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
      </div>
      <div>
        <label htmlFor="target" className="block text-sm font-medium text-gray-700">
          Target
        </label>
        <input
          type="text"
          id="target"
          className="mt-1 block w-full rounded-md border border-gray-300 bg-white py-2 px-3 shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          value={target}
          onChange={(e) => setTarget(e.target.value)}
          required
        />
      </div>
      <div>
        <label htmlFor="deadline" className="block text-sm font-medium text-gray-700">
          Deadline
        </label>
        <input
          type="date"
          id="deadline"
          className="mt-1 block w-full rounded-md border border-gray-300 bg-white py-2 px-3 shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          value={deadline}
          onChange={(e) => setDeadline(e.target.value)}
          required
        />
      </div>
      <button
        type="submit"
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
      >
        {goal ? 'Update Goal' : 'Create Goal'}
      </button>
    </form>
  );
};

export default GoalInput;