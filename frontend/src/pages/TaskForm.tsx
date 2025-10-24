import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useNavigate, useSearchParams, useParams } from "react-router-dom";
import Navbar from "../components/Navbar";
import api from "../api/axios";
import { useAppDispatch } from "../hooks";
import { createTask, updateTask } from "../features/tasks/tasksSlice";

const TaskForm: React.FC = () => {
  const { register, handleSubmit, setValue } = useForm();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { projectId: routeProjectId } = useParams<{ projectId: string }>();
  const [searchParams] = useSearchParams();
  const taskId = searchParams.get("id");
  const projectId = routeProjectId;

  useEffect(() => {
    if (taskId) {
      const fetchTask = async () => {
        const res = await api.get(`/tasks/${taskId}`);
        setValue("title", res.data.title);
        setValue("description", res.data.description);
        setValue("status", res.data.status);
        setValue("dueDate", new Date(res.data.dueDate).toISOString().split("T")[0]);
      };
      fetchTask();
    }
  }, [taskId, setValue]);

  const onSubmit = async (data: any) => {
    data.projectId = projectId;
    if (taskId) {
      await dispatch(updateTask({ id: taskId, data }));
    } else {
      await dispatch(createTask(data));
    }
    navigate(`/projects/${projectId}`);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <div className="max-w-md mx-auto p-6 bg-white rounded shadow mt-6">
        <h2 className="text-2xl font-bold mb-4">{taskId ? "Edit Task" : "Add Task"}</h2>
        <form className="flex flex-col gap-4" onSubmit={handleSubmit(onSubmit)}>
          <input {...register("title")} placeholder="Task Title" className="border p-2 rounded" />
          <textarea {...register("description")} placeholder="Task Description" className="border p-2 rounded" />
          <select {...register("status")} className="border p-2 rounded">
            <option value="todo">To Do</option>
            <option value="in-progress">In Progress</option>
            <option value="done">Done</option>
          </select>
          <input {...register("dueDate")} type="date" className="border p-2 rounded" />
          <button
            type="submit"
            className="bg-green-500 text-white px-3 py-2 rounded hover:bg-green-600 transition"
          >
            {taskId ? "Update Task" : "Add Task"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default TaskForm;
