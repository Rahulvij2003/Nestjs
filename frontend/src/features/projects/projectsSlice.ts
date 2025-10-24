import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../api/axios";

export const fetchProjects = createAsyncThunk("projects/fetch", async ({ page, search }: any) => {
  const res = await api.get(`/projects?page=${page}&search=${search || ""}`);
  return res.data;
});

export const createProject = createAsyncThunk("projects/create", async (data: any) => {
  const res = await api.post("/projects", data);
  return res.data;
});

export const updateProject = createAsyncThunk("projects/update", async ({ id, data }: any) => {
  const res = await api.patch(`/projects/${id}`, data);
  return res.data;
});

export const deleteProject = createAsyncThunk("projects/delete", async (id: string) => {
  await api.delete(`/projects/${id}`);
  return id;
});

// ✅ Add the missing `error` field in initialState
const projectsSlice = createSlice({
  name: "projects",
  initialState: { list: [], total: 0, loading: false, error: null as string | null },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchProjects.pending, (s) => {
        s.loading = true;
        s.error = null;
      })
      .addCase(fetchProjects.fulfilled, (s, a) => {
        s.loading = false;
        s.list = a.payload.projects;
        s.total = a.payload.total;
      })
      .addCase(fetchProjects.rejected, (s, a) => {
        s.loading = false;
        s.error = a.error.message ?? "Failed to load projects";
      })
      .addCase(deleteProject.fulfilled, (s, a) => {
        s.list = s.list.filter((p: any) => p._id !== a.payload);
      });
  },
});

export default projectsSlice.reducer;
