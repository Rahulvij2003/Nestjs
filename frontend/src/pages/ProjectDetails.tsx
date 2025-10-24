import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import { useParams, useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../hooks";
import { fetchTasks, deleteTask } from "../features/tasks/tasksSlice";
import api from "../api/axios";

// Define Task type
interface Task {
  _id: string;
  title: string;
  description: string;
  status: string;
  dueDate: string;
}

// Define Tasks slice state type
interface TasksState {
  list: Task[];
  loading: boolean;
  error: string | null;
}

const ProjectDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  // Use typed selector
  const tasks: Task[] = useAppSelector(
    (state) => ((state.tasks as TasksState)?.list ?? [])
  );



  const [project, setProject] = useState<any>(null);
  const [filter, setFilter] = useState("");

  useEffect(() => {
    const getProject = async () => {
      const res = await api.get(`/projects/${id}`);
      setProject(res.data);
    };
    getProject();
    dispatch(fetchTasks(id!));
  }, [dispatch, id]);

  const filteredTasks: Task[] = filter
    ? tasks.filter((t) => t.status === filter)
    : tasks;

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <div className="max-w-4xl mx-auto p-6">
        {project && (
          <>
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-2xl font-bold">{project.title}</h2>
              <button
                className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600"
                onClick={() => navigate(`/projects/add?id=${project._id}`)}
              >
                Edit Project
              </button>
            </div>
            <p className="mb-4">{project.description}</p>
            <span className="text-gray-500">Status: {project.status}</span>

            <div className="flex justify-between items-center mt-6 mb-2">
              <h3 className="text-xl font-bold">Tasks</h3>
              <button
                className="bg-green-500 text-white px-3 py-1 rounded hover:bg-green-600"
                onClick={() => navigate(`/tasks/add/${project._id}`)}
              >
                Add Task
              </button>
            </div>

            <div className="flex gap-2 mb-4">
              <select
                className="border p-1 rounded"
                value={filter}
                onChange={(e) => setFilter(e.target.value)}
              >
                <option value="">All</option>
                <option value="todo">To Do</option>
                <option value="in-progress">In Progress</option>
                <option value="done">Done</option>
              </select>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {filteredTasks.map((t) => (
                <div key={t._id} className="bg-white p-4 rounded shadow flex flex-col gap-2">
                  <h4 className="font-bold">{t.title}</h4>
                  <p>{t.description}</p>
                  <span className="text-gray-500">Status: {t.status}</span>
                  <span className="text-gray-400">Due: {new Date(t.dueDate).toLocaleDateString()}</span>
                  <div className="flex gap-2 mt-2">
                    <button
                      className="bg-blue-500 text-white px-2 py-1 rounded hover:bg-blue-600"
                      onClick={() => navigate(`/tasks/add/${project._id}?id=${t._id}`)}
                    >
                      Edit
                    </button>
                    <button
                      className="bg-red-500 text-white px-2 py-1 rounded hover:bg-red-600"
                      onClick={() => dispatch(deleteTask(t._id))}
                    >
                      Delete
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default ProjectDetails;
