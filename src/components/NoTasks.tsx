const NoTasks = () => {
  return (
    <div className="flex flex-col items-center justify-center gap-5 mt-4">
      <img className="w-24" src="/todolist.svg" alt="todolist" />

      <p className="text-lg font-bold">
        Hmmm, looks like you didn't create any tasks yet!
      </p>
    </div>
  );
};

export default NoTasks;
