import { useState } from "react";
import {
  useCreateTaskMutation,
  useGetTasksQuery,
  useUpdateTaskMutation,
  useDeleteTaskMutation
} from "../../app/apiSlice";
import { ITask } from "../../app/types";
import s from "./Todo.module.scss";
import { Task } from "../../components/Task/Task";

export let Todo = () => {
  let { data = [], isLoading, isError } = useGetTasksQuery();
  let [createTask] = useCreateTaskMutation();
  let [updateTask] = useUpdateTaskMutation();
  let [deleteTask] = useDeleteTaskMutation();
  let [value, setValue] = useState('');
  let [error, setError] = useState('');

  let handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!value.trim()) {
      setError('Task description cannot be empty');
      return;
    }
    setError('');
    try {
      await createTask({ done: false, description: value }).unwrap();
      setValue('');
    } catch (err) {
      setError('Failed to create task');
      console.log(err);
    }
  };

  let handleUpdateTask = async (task: ITask) => {
    try {
      await updateTask({ ...task }).unwrap();
    } catch (err) {
      console.log(err);
    }
  };

  let handleDeleteTask = async (id: string) => {
    try {
      await deleteTask(id).unwrap();
    } catch (err) {
      console.log(err);
    }
  };

  if (isLoading) return <h1>Loading...</h1>;
  if (isError) return <h1>Error loading tasks</h1>;

  return (
    <>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={value}
          onChange={e => setValue(e.target.value)}
          placeholder="Add a new task"
        />
        <button type="submit" disabled={!value.trim()}>Add Task</button>
        {error && <p className={s.error}>{error}</p>}
      </form>
      <ul className={s.tasks}>
        {data.map((el: ITask) => (
          <Task
            key={el.id}
            id={el.id}
            description={el.description}
            done={el.done}
            onUpdate={handleUpdateTask}
            onDelete={handleDeleteTask}
          />
        ))}
      </ul>
    </>
  );
};