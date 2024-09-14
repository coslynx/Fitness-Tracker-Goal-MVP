import { useState, useEffect } from 'react';
import { useStore } from '@/store';
import { Line, LineController, CategoryScale, LinearScale, PointElement, LineElement, Title } from 'chart.js';
import { Chart, registerDefaults } from 'chart.js';

registerDefaults({
  plugins: {
    legend: {
      display: false,
    },
  },
  scales: {
    y: {
      beginAtZero: true,
    },
  },
});

Chart.register(Line, LineController, CategoryScale, LinearScale, PointElement, LineElement, Title);

interface ProgressChartProps {
  goalId: number;
}

const ProgressChart: React.FC<ProgressChartProps> = ({ goalId }) => {
  const { workouts, getWorkoutsByGoalId } = useStore();
  const [chartData, setChartData] = useState<any>(null);

  useEffect(() => {
    getWorkoutsByGoalId(goalId);
  }, [goalId, getWorkoutsByGoalId]);

  useEffect(() => {
    if (workouts.length > 0) {
      const workoutDates = workouts.map((workout) => new Date(workout.date).toLocaleDateString());
      const workoutDurations = workouts.map((workout) => workout.duration);

      setChartData({
        labels: workoutDates,
        datasets: [
          {
            label: 'Workout Duration (Minutes)',
            data: workoutDurations,
            borderColor: 'rgb(255, 99, 132)',
            backgroundColor: 'rgba(255, 99, 132, 0.2)',
          },
        ],
      });
    }
  }, [workouts]);

  return (
    <div className="h-96 w-full">
      {chartData && (
        <canvas id="progress-chart" className="h-full w-full">
          <Chart type="line" data={chartData} />
        </canvas>
      )}
    </div>
  );
};

export default ProgressChart;