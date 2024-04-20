"use client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "sonner";
import { loginStart, loginSuccess, loginError } from "../redux/user/userSlice.js";

export default function () {
    const { register, handleSubmit } = useForm();
    const { loading } = useSelector((state) => state.user);
    const dispatch = useDispatch();
    const router = useRouter();

    const submitHandler = async (data) => {
        try {
            dispatch(loginStart());
            const response = await fetch(
                `${process.env.NEXT_PUBLIC_API_URL}/api/users/auth/`,
                {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify(data),
                    // credentials: 'include',
                }
            );

            const responseData = await response.json();

            if (response.ok) {
                dispatch(loginSuccess(responseData));
                toast.success("logged in successfully");
                router.push("/");
            } else {
                dispatch(loginError());
                toast.error("wrong credentials");
            }
        } catch (err) {
            dispatch(loginError());
            toast.error("Can't connect to server!");
        }
    };

    return (
        <form
            onSubmit={handleSubmit(submitHandler)}
            className="bg-white text-black border rounded-xl p-6 flex flex-col w-[28rem] items-center justify-center"
        >
            <p className="font-medium text-2xl text-center mb-6">Sign In</p>
            <input
                {...register("email", { required: true })}
                type="text"
                placeholder="Email"
                autoComplete="off"
                className="px-4 py-2 w-full bg-black/10 outline-none rounded-lg mb-4"
            />
            <input
                {...register("password", { required: true })}
                type="text"
                placeholder="Password"
                autoComplete="off"
                className="px-4 py-2 w-full bg-black/10 outline-none rounded-lg mb-6"
            />
            <button
                type="submit"
                disabled={loading}
                className="w-full text-white rounded-lg bg-[#000] py-3 hover:bg-[#2b2b2b] mb-4"
            >
                {"Sign In"}
            </button>
            <hr className="h-[1px] w-full bg-black/30 border-none rounded-full mb-4" />
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
