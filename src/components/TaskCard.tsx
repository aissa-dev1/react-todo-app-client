import { useContext, useState } from "react";
import { Task } from "../types";
import axios from "axios";
import { TasksContext } from "./TasksProvider";
import cn from "../utils/cn";
import Loader from "./icons/Loader";
import formatDateAndTime from "../utils/format-date-and-time";
import Button from "./Button";
import Input from "./Input";

interface TaskCardProps extends Task {}

interface TaskCardModelProps {
  createdAt: number;
  updatedAt: number;
}

interface UpdateTaskModelProps {
  hideUpdateModel(): void;
  updateName: string;
  setUpdateName: (value: React.SetStateAction<string>) => void;
  updateDescription: string;
  setUpdateDescription: (value: React.SetStateAction<string>) => void;
  updateErrorText: string;
  isSaveBtnLoading: boolean;
  saveUpdatedTask: () => Promise<void>;
}

const TaskCardModel = ({ createdAt, updatedAt }: TaskCardModelProps) => {
  return (
    <div className="flex justify-between p-1 rounded bg-accent-color/10">
      <div className="flex items-center gap-1">
        <p className="font-medium text-black">Created at:</p>
        <p className="text-sm font-bold text-accent-color">
          {formatDateAndTime(createdAt)}
        </p>
      </div>

      <div className="flex items-center gap-1">
        <p className="font-medium text-black">Updated at:</p>
        <p className="text-sm font-bold text-accent-color">
          {formatDateAndTime(updatedAt)}
        </p>
      </div>
    </div>
  );
};

const TaskUpdateModel = ({
  hideUpdateModel,
  updateName,
  setUpdateName,
  updateDescription,
  setUpdateDescription,
  updateErrorText,
  isSaveBtnLoading,
  saveUpdatedTask,
}: UpdateTaskModelProps) => {
  return (
    <div
      className="absolute inset-0 flex items-center justify-center bg-black/25"
      onClick={hideUpdateModel}
    >
      <div
        className="flex flex-col w-1/2 gap-2 p-4 bg-white rounded"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between">
          <p className="text-lg font-medium capitalize">Update your task</p>

          <Button variant="fire" onClick={hideUpdateModel}>
            Close
          </Button>
        </div>

        <div className="flex flex-col gap-2">
          <div className="grid grid-cols-2 gap-3">
            <div className="flex flex-col gap-2">
              <label className="font-medium" htmlFor="task_name">
                Task name
              </label>
              <Input
                type="text"
                id="task_name"
                placeholder="Example: task 1"
                value={updateName}
                onChange={(e) => setUpdateName(e.target.value)}
              />
            </div>

            <div className="flex flex-col gap-2">
              <label className="font-medium" htmlFor="task_description">
                Task description
              </label>
              <Input
                type="text"
                id="task_description"
                placeholder="Example: description 1"
                value={updateDescription}
                onChange={(e) => setUpdateDescription(e.target.value)}
              />
            </div>
          </div>

          {updateErrorText.length > 0 && (
            <p className="text-sm font-bold text-red-600">{updateErrorText}</p>
          )}

          {isSaveBtnLoading ? (
            <div className="flex items-center justify-center">
              <Loader />
            </div>
          ) : (
            <Button onClick={saveUpdatedTask}>Save</Button>
          )}
        </div>
      </div>
    </div>
  );
};

const TaskCard = ({
  _id,
  name,
  description,
  completed,
  createdAt,
  updatedAt,
}: TaskCardProps) => {
  const { tasks, updateTasks } = useContext(TasksContext);
  const [cardModelActive, setCardModelActive] = useState(false);
  const [updateModelActive, setUpdateModelActive] = useState(false);
  const [updateName, setUpdateName] = useState(name);
  const [updateDescription, setUpdateDescription] = useState(description);
  const [isSaveBtnLoading, setIsSaveBtnLoading] = useState(false);
  const [updateErrorText, setUpdateErrorText] = useState("");
  const [isCompletionBtnsLoading, setIsCompletionBtnsLoading] = useState(false);

  async function updateTaskCompletion(completed: boolean) {
    setIsCompletionBtnsLoading(true);
    const axiosRes = await axios.patch(
      `${
        import.meta.env.VITE_BASE_URL
      }/api/tasks/update_task_completion/${_id}`,
      { completed }
    );
    const newTasks = tasks.map((task) => {
      if (task._id === _id) {
        task.completed = !task.completed;
        task.updatedAt = axiosRes.data.updatedAt;
      }
      return task;
    });
    updateTasks(newTasks);
    setIsCompletionBtnsLoading(false);
  }

  async function saveUpdatedTask() {
    try {
      setIsSaveBtnLoading(true);
      const axiosRes = await axios.patch(
        `${import.meta.env.VITE_BASE_URL}/api/tasks/update_task_info/${_id}`,
        { name: updateName, description: updateDescription }
      );
      const newTasks = tasks.map((task) => {
        if (task._id === _id) {
          task.name = axiosRes.data.name;
          task.description = axiosRes.data.description;
          task.updatedAt = axiosRes.data.updatedAt;
        }
        return task;
      });
      updateTasks(newTasks);
      hideUpdateModel();
    } catch (error: any) {
      setUpdateErrorText(error.response.data.message);
      setIsSaveBtnLoading(false);
    }
  }

  async function deleteTask() {
    await axios.delete(
      `${import.meta.env.VITE_BASE_URL}/api/tasks/delete_task/${_id}`
    );
    const newTasks = tasks.filter((task) => task._id !== _id);
    updateTasks(newTasks);
  }

  function showCardModel() {
    setCardModelActive(true);
  }

  function hideCardModel() {
    setCardModelActive(false);
    setUpdateErrorText("");
  }

  function showUpdateModel() {
    setUpdateModelActive(true);
    setUpdateName(name);
    setUpdateDescription(description);
  }

  function hideUpdateModel() {
    setUpdateModelActive(false);
    setIsSaveBtnLoading(false);
    setUpdateErrorText("");
  }

  return (
    <>
      <div
        className="flex flex-col gap-3.5 px-2 py-4 bg-white"
        onMouseEnter={showCardModel}
        onMouseLeave={hideCardModel}
      >
        <div className="flex items-center justify-between">
          <div className="flex flex-col gap-2">
            <h3
              className={cn("text-lg font-medium text-accent-color", {
                "line-through text-slate-500": completed,
              })}
            >
              {name}
            </h3>

            <h3 className="text-sm font-semibold">{description}</h3>
          </div>

          <div className="flex gap-2">
            <>
              {isCompletionBtnsLoading ? (
                <Loader />
              ) : completed ? (
                <Button
                  variant="water"
                  onClick={() => updateTaskCompletion(false)}
                >
                  Uncomplete
                </Button>
              ) : (
                <Button
                  variant="nature"
                  onClick={() => updateTaskCompletion(true)}
                >
                  Complete
                </Button>
              )}
            </>
            {!completed && <Button onClick={showUpdateModel}>Update</Button>}
            <Button variant="fire" onClick={deleteTask}>
              Delete
            </Button>
          </div>
        </div>

        {cardModelActive && (
          <TaskCardModel createdAt={createdAt} updatedAt={updatedAt} />
        )}
      </div>

      {updateModelActive && (
        <TaskUpdateModel
          hideUpdateModel={hideUpdateModel}
          updateName={updateName}
          setUpdateName={setUpdateName}
          updateDescription={updateDescription}
          setUpdateDescription={setUpdateDescription}
          updateErrorText={updateErrorText}
          isSaveBtnLoading={isSaveBtnLoading}
          saveUpdatedTask={saveUpdatedTask}
        />
      )}
    </>
  );
};

export default TaskCard;
