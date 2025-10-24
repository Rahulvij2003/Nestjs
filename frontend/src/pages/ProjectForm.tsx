import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate, useSearchParams } from "react-router-dom";
import Navbar from "../components/Navbar";
import api from "../api/axios";
import { useAppDispatch } from "../hooks";
import { createProject, updateProject } from "../features/projects/projectsSlice";

const ProjectForm: React.FC = () => {
  const { register, handleSubmit, setValue } = useForm();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const [searchParams] = useSearchParams();
  const projectId = searchParams.get("id");

  useEffect(() => {
    if (projectId) {
      const fetchProject = async () => {
        const res = await api.get(`/projects/${projectId}`);
        setValue("title", res.data.title);
        setValue("description", res.data.description);
        setValue("status", res.data.status);
      };
      fetchProject();
    }
  }, [projectId, setValue]);

  const onSubmit = async (data: any) => {
    if (projectId) {
      await dispatch(updateProject({ id: projectId, data }));
    } else {
      await dispatch(createProject(data));
    }
    navigate("/");
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <div className="max-w-md mx-auto p-6 bg-white rounded shadow mt-6">
        <h2 className="text-2xl font-bold mb-4">{projectId ? "Edit Project" : "Add Project"}</h2>
        <form className="flex flex-col gap-4" onSubmit={handleSubmit(onSubmit)}>
          <input {...register("title")} placeholder="Project Title" className="border p-2 rounded" />
          <textarea {...register("description")} placeholder="Project Description" className="border p-2 rounded" />
          <select {...register("status")} className="border p-2 rounded">
            <option value="active">Active</option>
            <option value="completed">Completed</option>
          </select>
          <button
            type="submit"
            className="bg-blue-500 text-white px-3 py-2 rounded hover:bg-blue-600 transition"
          >
            {projectId ? "Update Project" : "Add Project"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default ProjectForm;
