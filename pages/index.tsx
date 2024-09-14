import { useSession } from "next-auth/react";
import { useStore } from "@/store";
import { Goal } from "@/types";
import GoalInput from "@/components/GoalInput";
import ProgressChart from "@/components/ProgressChart";
import SocialShareButton from "@/components/SocialShareButton";

const DashboardPage = () => {
  const { data: session } = useSession();
  const {
    goals,
    workouts,
    addGoal,
    updateGoal,
    addWorkout,
    getGoals,
    getWorkouts,
  } = useStore();

  return (
    <div>
      <h2>Dashboard</h2>
      {session?.user && (
        <>
          <h3>Your Goals</h3>
          <GoalInput />
          <ul>
            {goals.map((goal: Goal) => (
              <li key={goal.id}>
                <h4>{goal.name}</h4>
                <p>Target: {goal.target}</p>
                <p>Deadline: {goal.deadline.toLocaleDateString()}</p>
                <ProgressChart goalId={goal.id} />
                <SocialShareButton
                  title={goal.name}
                  shareUrl={`https://your-fitness-tracker-url.com/dashboard`}
                  progressData={{
                    workoutName: "Your Last Workout",
                    duration: 30, // Example data
                  }}
                />
              </li>
            ))}
          </ul>
          <h3>Your Workouts</h3>
          {/* Add workout log functionality here */}
        </>
      )}
    </div>
  );
};

export default DashboardPage;