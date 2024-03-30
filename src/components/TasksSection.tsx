import axios from "axios";
import { Task } from "../types";
import TaskCard from "./TaskCard";
import { useContext, useEffect, useState } from "react";
import { TasksContext } from "./TasksProvider";
import Loader from "./icons/Loader";
import NoTasks from "./NoTasks";
import Button from "./Button";

const TasksSection = () => {
  const { tasks, updateTasks } = useContext(TasksContext);
  const [isLoading, setIsLoading] = useState(true);

  async function getTasks() {
    const axiosRes = await axios.get(
      `${import.meta.env.VITE_BASE_URL}/api/tasks`
    );
    updateTasks(axiosRes.data.tasks as Task[]);
    setIsLoading(false);
  }

  async function deleteAllTasks() {
    await axios.delete(
      `${
        import.meta.env.VITE_BASE_URL
      }/api/tasks/delete_all_tasks?role=admin&allow=true`
    );
    updateTasks([]);
  }

  useEffect(() => {
    getTasks();
  }, []);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center">
        <Loader className="w-8 h-8 mt-4" />
      </div>
    );
  }

  return tasks.length > 0! ? (
    <section className="mt-4">
      <div className="flex items-center justify-between px-2 py-4 bg-white">
        <p className="font-semibold">Tasks: {tasks.length}</p>

        <Button variant="fire" onClick={deleteAllTasks}>
          Delete all
        </Button>
      </div>
      <div className="grid grid-cols-1 gap-1">
        {tasks.map((task) => {
          return <TaskCard key={task._id} {...task} />;
        })}
      </div>
    </section>
  ) : (
    <NoTasks />
  );
};

export default TasksSection;
