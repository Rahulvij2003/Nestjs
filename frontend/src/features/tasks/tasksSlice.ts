import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../api/axios";

export interface Task {
  _id: string;
  title: string;
  description: string;
  status: string;
  dueDate: string;
}

export interface TasksState {
  list: Task[];
  loading: boolean;
  error: string | null;
}

const initialState: TasksState = {
  list: [],
  loading: false,
  error: null,
};

export const fetchTasks = createAsyncThunk("tasks/fetch", async (projectId: string) => {
  const res = await api.get(`/tasks?projectId=${projectId}`);
  return res.data;
});

export const createTask = createAsyncThunk("tasks/create", async (data: any) => {
  const res = await fetch("http://localhost:5000/tasks", {
    method: "POST",
    credentials: "include", // send cookies
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });
  const result = await res.json();
  return result;
});


export const updateTask = createAsyncThunk("tasks/update", async ({ id, data }: any) => {
  const res = await api.patch(`/tasks/${id}`, data);
  return res.data;
});

export const deleteTask = createAsyncThunk("tasks/delete", async (id: string) => {
  await api.delete(`/tasks/${id}`);
  return id;
});

const tasksSlice = createSlice({
  name: "tasks",
  initialState, // ✅ use the typed state
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchTasks.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchTasks.fulfilled, (state, action) => {
        state.loading = false;
        state.list = action.payload.tasks;
      })
      .addCase(fetchTasks.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message ?? "Failed to fetch tasks";
      })
      .addCase(deleteTask.fulfilled, (state, action) => {
        state.list = state.list.filter((t: any) => t._id !== action.payload);
      });
  },
});

export default tasksSlice.reducer;
