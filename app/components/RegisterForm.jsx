"use client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import { useForm } from "react-hook-form";
import { loginStart, loginSuccess, loginError } from "../redux/user/userSlice.js";
import { toast } from "sonner";

export default function () {
    const { register, handleSubmit } = useForm();
    const { loading } = useSelector((state) => state.user);
    const dispatch = useDispatch();
    const router = useRouter();

    const submitHandler = async (data) => {
        try {
            dispatch(loginStart());
            const response = await fetch(
                `${process.env.NEXT_PUBLIC_API_URL}/api/users/`,
                {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify(data),
                    // credentials: 'include',
                }
            );

            const responseData = await response.json();

            if (response.ok) {
                dispatch(loginSuccess(responseData))
                toast.success("Resgistered successfully!");
                router.push("/");
            } else {
                dispatch(loginError())
                toast.error("Already registered!");
            }
        } catch (err) {
            dispatch(loginError())
            toast.error("Can't connect to server!");
        }
    };

    return (
        <form
            onSubmit={handleSubmit(submitHandler)}
            className="bg-white text-black border rounded-xl p-6 flex flex-col w-[28rem] items-center justify-center"
        >
            <p className="font-medium text-2xl text-center mb-6">Sign Up</p>
            <input
                {...register("name", { required: true })}
                type="text"
                placeholder="Name"
                autoComplete="off"
                className="px-4 py-2 w-full bg-black/10 outline-none rounded-lg mb-4"
            />
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
                Sign Up
            </button>
            <hr className="h-[1px] w-full bg-black/30 border-none rounded-full mb-4" />
            <div className="flex justify-between w-full items-center">
                <p>Don't have an account?</p>
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
