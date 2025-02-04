import { useState, useEffect } from "react";
import { fetchTasks } from "../../../service/taskService";
import ChartStatistics from "./ChartStatistics";
import DelaytaskCalender from "./DelaytaskCalender";
import TaskList from "./TaskList";

export default function TaskMain() {
  const [tasks, setTasks] = useState([]); // Ensure tasks defaults to an empty array
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadTasks = async () => {
      try {
        const response = await fetchTasks();
        
        // Ensure tasks is an array before setting state
        if (Array.isArray(response)) {
          setTasks(response);
        } else if (response && Array.isArray(response.data)) {
          setTasks(response.data);
        } else {
          console.error("Unexpected API response format:", response);
          setTasks([]); // Ensure tasks remains an array
        }
      } catch (error) {
        console.error("Error fetching tasks:", error);
        setTasks([]); // Ensure tasks remains an array on error
      } finally {
        setLoading(false);
      }
    };

    loadTasks();
  }, []);

  return (
    <>
      <ChartStatistics tasks={tasks} loading={loading} />
      <DelaytaskCalender tasks={tasks} loading={loading} />
      <TaskList tasks={tasks} loading={loading} />
    </>
  );
}
