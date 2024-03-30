import { ReactNode, createContext, useState } from "react";
import { Task } from "../types";

interface TasksContextType {
  tasks: Task[];
  updateTasks: (value: React.SetStateAction<Task[]>) => void;
}

interface TasksProviderProps {
  children: ReactNode;
}

export const TasksContext = createContext<TasksContextType>({
  tasks: [],
  updateTasks: () => {},
});

const TasksProvider = ({ children }: TasksProviderProps) => {
  const [tasks, setTasks] = useState<Task[]>([]);

  function updateTasks(value: React.SetStateAction<Task[]>) {
    setTasks(value);
  }

  return (
    <TasksContext.Provider value={{ tasks, updateTasks }}>
      {children}
    </TasksContext.Provider>
  );
};

export default TasksProvider;
