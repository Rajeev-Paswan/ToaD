"use client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import useAuthStore from "../../store/authStore";

export default function LoginForm() {
  const router = useRouter();
  const { login, loading = false } = useAuthStore();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    mode: "onSubmit",
    reValidateMode: "onSubmit",
  });

  const onSubmit = async (data) => {
    try {
      await login(data);
      toast.success("Logged in successfully");
      router.push("/");
    } catch (error) {
      toast.error(error.message || "Wrong credentials");
    }
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="bg-white text-black border rounded-xl p-4 flex flex-col w-4/5 max-md:w-[90%] max-w-[28rem] items-center justify-center text-sm"
    >
      <h2 className="font-medium text-xl text-center mb-4">Sign In</h2>
      <input
        {...register("email", {
          required: "Email is required!",
          minLength: {
            value: 6,
            message: "Email must be more than 6 characters.",
          },
        })}
        type="email"
        placeholder="Email"
        autoComplete="off"
        className="px-4 py-2 w-full bg-black/10 outline-none rounded-lg mb-3"
      />
      <input
        {...register("password", {
          required: "Password is required!",
          minLength: {
            value: 3,
            message: "Password must be more than 3 characters.",
          },
          maxLength: {
            value: 16,
            message: "Password cannot exceed more than 16 characters",
          },
        })}
        type="password"
        placeholder="Password"
        autoComplete="off"
        className="px-4 py-2 w-full bg-black/10 outline-none rounded-lg mb-3"
      />
      <button
        type="submit"
        disabled={loading}
        className="w-full text-white rounded-lg bg-[#000] py-3 hover:bg-[#2b2b2b] mb-3"
      >
        {loading ? "Signing In..." : "Sign In"}
      </button>
      <hr className="h-[1px] w-full bg-black/30 border-none rounded-full mb-3" />
      <div className="flex justify-between w-full items-center">
        <p>Don't have an account?</p>
        <Link
          href={"/signup"}
          className="py-2 px-6 border-black border rounded-lg hover:bg-black/20"
        >
          Sign Up
        </Link>
      </div>
    </form>
  );
}
