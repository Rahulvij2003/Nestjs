import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import { useAppDispatch, useAppSelector } from "../hooks";
import { fetchProjects, deleteProject } from "../features/projects/projectsSlice";
import { useNavigate } from "react-router-dom";
import Pagination from "../components/Pagination";

// Define Project type
interface Project {
  _id: string;
  title: string;
  description: string;
  status: string;
}

// Define Projects slice state type
interface ProjectsState {
  list: Project[];
  total: number;
  loading: boolean;
  error: string | null;
}

const Dashboard: React.FC = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  // Typed selector
  const { list = [], total = 0 } = useAppSelector(
    (state) => state.projects as ProjectsState
  );


  const [page, setPage] = useState(1);

  useEffect(() => {
    dispatch(fetchProjects({ page }));
  }, [dispatch, page]);

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <div className="max-w-5xl mx-auto p-6">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold">Your Projects</h2>
          <button
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition"
            onClick={() => navigate("/projects/add")}
          >
            Add Project
          </button>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {list.map((p: Project) => (
            <div key={p._id} className="bg-white p-4 rounded shadow flex flex-col gap-2">
              <h3 className="font-bold text-lg">{p.title}</h3>
              <p>{p.description}</p>
              <span className="text-gray-500">{p.status}</span>
              <div className="flex gap-2 mt-2">
                <button
                  className="bg-green-500 text-white px-2 py-1 rounded hover:bg-green-600"
                  onClick={() => navigate(`/projects/${p._id}`)}
                >
                  View
                </button>
                <button
                  className="bg-red-500 text-white px-2 py-1 rounded hover:bg-red-600"
                  onClick={() => dispatch(deleteProject(p._id))}
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
        <Pagination page={page} pages={Math.ceil(total / 5)} onPageChange={setPage} />
      </div>
    </div>
  );
};

export default Dashboard;
