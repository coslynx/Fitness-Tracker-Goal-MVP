import { useState, useEffect } from 'react';
import { useStore } from '@/store';
import { Session } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { Goal, Workout } from '@/types';
import { getGoalsByUserId, getWorkoutsByUserId } from '@/utils/api';
import Header from '@/components/Header';
import GoalInput from '@/components/GoalInput';
import ProgressChart from '@/components/ProgressChart';
import SocialShareButton from '@/components/SocialShareButton';

interface LayoutProps {
  children: React.ReactNode;
  session: Session | null;
}

const Layout: React.FC<LayoutProps> = ({ children, session }) => {
  const router = useRouter();
  const { goals, workouts, addGoal, updateGoal, addWorkout, getGoals, getWorkouts } = useStore();

  useEffect(() => {
    if (session?.user?.id) {
      getGoalsByUserId(session.user.id).then((data) => {
        addGoal(data);
      });
      getWorkoutsByUserId(session.user.id).then((data) => {
        addWorkout(data);
      });
    }
  }, [session, addGoal, addWorkout]);

  return (
    <div className="flex flex-col min-h-screen bg-gray-100">
      <Header session={session} />
      <main className="container mx-auto p-4 mt-8">
        <div className="flex flex-col gap-8">
          {children}
        </div>
      </main>
      <footer className="bg-gray-200 text-center py-4 mt-8">
        <p>© 2024 Fitness Tracker</p>
      </footer>
    </div>
  );
};

export default Layout;