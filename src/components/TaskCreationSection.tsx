import { useContext, useState } from "react";
import { TasksContext } from "./TasksProvider";
import axios from "axios";
import Loader from "./icons/Loader";
import Button from "./Button";
import Input from "./Input";

const TaskCreationSection = () => {
  const { updateTasks } = useContext(TasksContext);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [errorText, setErrorText] = useState("");
  const [isCreateBtnLoading, setIsCreateBtnLoading] = useState(false);

  async function createTask(name: string, description: string) {
    try {
      setIsCreateBtnLoading(true);
      const axiosRes = await axios.post(
        `${import.meta.env.VITE_BASE_URL}/api/tasks/create_task`,
        { name, description }
      );
      setErrorText("");
      updateTasks((prevTasks) => [...prevTasks, axiosRes.data.task]);
      setName("");
      setDescription("");
      setIsCreateBtnLoading(false);
    } catch (error: any) {
      setErrorText(error.response.data.message);
      setIsCreateBtnLoading(false);
    }
  }

  return (
    <section className="flex items-end justify-between gap-2 px-2 py-4 mt-4 bg-white">
      <div className="w-3/4">
        <div className="grid grid-cols-6 gap-4">
          <div className="flex flex-col col-span-2 gap-2">
            <label className="font-medium" htmlFor="task_name">
              Task name
            </label>
            <Input
              type="text"
              id="task_name"
              placeholder="Example: task 1"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>

          <div className="flex flex-col col-span-2 gap-2">
            <label className="font-medium" htmlFor="task_description">
              Task description
            </label>
            <Input
              type="text"
              id="task_description"
              placeholder="Example: description 1"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>
        </div>

        {errorText.length > 0 && (
          <p className="mt-2 text-sm font-bold text-red-600">{errorText}</p>
        )}
      </div>

      {isCreateBtnLoading ? (
        <Loader />
      ) : (
        <Button
          onClick={() => {
            createTask(name, description);
          }}
        >
          Create
        </Button>
      )}
    </section>
  );
};

export default TaskCreationSection;
