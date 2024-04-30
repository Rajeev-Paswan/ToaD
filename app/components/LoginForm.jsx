"use client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "sonner";
import { loginSuccess, loginError } from "../lib/user/userSlice.js";
import { useLoginMutation } from "../lib/user/userApi.js";
import { useEffect, useState } from "react";
import Loading from "./Loading.jsx";

export default function () {
    const [loading, setloading] = useState(false)
    const [login] = useLoginMutation();
    const dispatch = useDispatch();
    const router = useRouter();
    const { register, handleSubmit, formState: { errors } } = useForm({
        mode: "onSubmit",
        reValidateMode: "onSubmit"
    });

    const submitHandler = async (data) => {
        try {
            const result = await login(data).unwrap();
            dispatch(loginSuccess(result));
            toast.success('Logged in successfully');
            router.push('/');
        } catch (error) {
            dispatch(loginError(error));
            toast.success("wrong credentials");
        }
    };

    useEffect(() => {
        (errors?.email?.message && toast.error(errors?.email?.message) ||
            errors?.password?.message && toast.error(errors.password.message));
    });

    return (
        <form
            onSubmit={handleSubmit(submitHandler)}
            className="bg-white text-black border rounded-xl p-4 flex flex-col w-4/5 max-md:w-[90%] max-w-[28rem] items-center justify-center text-sm"
        >
            <p className="font-medium text-xl text-center mb-4">Sign In</p>
            <input
                {...register("email", {
                    required: "Email is required!",
                    minLength: { value: 6, message: "Password must be more than 3 characters." },
                })}
                type="text"
                placeholder="Email"
                autoComplete="off"
                className="px-4 py-2 w-full bg-black/10 outline-none rounded-lg mb-3"
            />
            <input
                {...register("password", {
                    required: "Password is required!",
                    minLength: { value: 3, message: "Password must be more than 3 characters." },
                    maxLength: { value: 16, message: "Password cannot exceed more than 12 characters" }
                })}

                type="text"
                placeholder="Password"
                autoComplete="off"
                className="px-4 py-2 w-full bg-black/10 outline-none rounded-lg mb-3"
            />
            <button
                type="submit"
                onClick={() => { setloading(true) }}
                className="w-full text-white rounded-lg bg-[#000] py-3 hover:bg-[#2b2b2b] mb-3"
            >
                {"Sign In"}
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
