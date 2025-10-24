import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../api/axios";

interface AuthState {
  user: any;
  loading: boolean;
  error: string | null;
}

const initialState: AuthState = {
  user: null,
  loading: false,
  error: null,
};

export const loginUser = createAsyncThunk("auth/login", async (data: { email: string; password: string }) => {
  const res = await api.post("/auth/login", data);
  return res.data;
});

export const registerUser = createAsyncThunk("auth/register", async (data: { email: string; password: string }) => {
  const res = await api.post("/auth/register", data);
  return res.data;
});

export const refreshToken = createAsyncThunk("auth/refresh", async () => {
  const res = await api.get("/auth/refresh");
  return res.data;
});

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logout: (state) => {
      state.user = null;
      api.post("/auth/logout");
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.pending, (s) => {
        s.loading = true;
        s.error = null;
      })
      .addCase(loginUser.fulfilled, (s, a) => {
        s.loading = false;
        s.user = a.payload.user;
      })
      .addCase(loginUser.rejected, (s, a) => {
        s.loading = false;
        s.error = a.error.message || "Login failed";
      })
      .addCase(registerUser.fulfilled, (s, a) => {
        s.user = a.payload.user;
      })
      .addCase(refreshToken.fulfilled, (s, a) => {
        s.user = a.payload.user;
      });
  },
});

export const { logout } = authSlice.actions;
export default authSlice.reducer;
