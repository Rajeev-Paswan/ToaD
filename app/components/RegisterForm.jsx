"use client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import Loading from "./Loading.jsx";
import useAuthStore from "../../store/authStore";

export default function RegisterForm() {
  const { register, handleSubmit } = useForm();
  const { register: registerUser, loading, error } = useAuthStore();
  const router = useRouter();

  const submitHandler = async (data) => {
    try {
      const result = await registerUser(data);
      if (result) {
        router.push("/");
        toast.success("Registered successfully!");
      }
    } catch (err) {
      console.log(err);
      toast.error(err.message || "Can't connect to server!");
    }
  };

  if (loading) return <Loading />;

  return (
    <form
      onSubmit={handleSubmit(submitHandler)}
      className="bg-white text-black border rounded-xl p-4 flex flex-col max-md:w-[90%] w-[28rem] items-center justify-center"
    >
      <p className="font-medium text-xl text-center mb-4">Sign Up</p>
      <input
        {...register("name", { required: true })}
        type="text"
        placeholder="Name"
        autoComplete="off"
        className="px-4 py-2 w-full bg-black/10 outline-none rounded-lg mb-3 text-sm"
      />
      <input
        {...register("email", { required: true })}
        type="email"
        placeholder="Email"
        autoComplete="off"
        className="px-4 py-2 w-full bg-black/10 outline-none rounded-lg mb-3 text-sm"
      />
      <input
        {...register("password", { required: true })}
        type="password"
        placeholder="Password"
        autoComplete="off"
        className="px-4 py-2 w-full bg-black/10 outline-none rounded-lg mb-3 text-sm"
      />
      <button
        type="submit"
        disabled={loading}
        className="w-full text-white rounded-lg bg-[#000] py-3 hover:bg-[#2b2b2b] mb-3 text-sm"
      >
        Sign Up
      </button>
      <hr className="h-[1px] w-full bg-black/30 border-none rounded-full mb-4" />
      <div className="flex justify-between w-full items-center text-sm">
        <p>Already have an account?</p>
        <Link
          href={"/signin"}
          className="py-2 px-6 border-black border rounded-lg hover:bg-black/20"
        >
          Sign In
        </Link>
      </div>
    </form>
  );
}
