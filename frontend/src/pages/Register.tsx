import React from "react";
import { useForm } from "react-hook-form";
import { useAppDispatch, useAppSelector } from "../hooks";
import { registerUser } from "../features/auth/authSlice";
import { useNavigate, Link } from "react-router-dom";

const Register: React.FC = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { register, handleSubmit } = useForm();
    const { error } = useAppSelector((state: any) => state.auth);


  const onSubmit = async (data: any) => {
    const res: any = await dispatch(registerUser(data));
    if (res.meta.requestStatus === "fulfilled") navigate("/login");
  };

  return (
    <div className="min-h-screen flex justify-center items-center bg-gray-50">
      <div className="w-full max-w-md bg-white p-8 rounded shadow">
        <h2 className="text-2xl font-bold mb-6 text-center">Register</h2>
        {error && <p className="text-red-500 mb-4">{error}</p>}
        <form className="flex flex-col gap-4" onSubmit={handleSubmit(onSubmit)}>
          <input
            {...register("email")}
            type="email"
            placeholder="Email"
            className="border p-2 rounded"
          />
          <input
            {...register("password")}
            type="password"
            placeholder="Password"
            className="border p-2 rounded"
          />
          <button type="submit" className="bg-green-500 text-white p-2 rounded hover:bg-green-600 transition">
            Register
          </button>
        </form>
        <p className="mt-4 text-center">
          Already have an account?{" "}
          <Link to="/login" className="text-blue-500 hover:underline">
            Login
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Register;
