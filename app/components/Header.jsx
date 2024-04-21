"use client"
import Link from "next/link";
import { useRouter } from 'next/navigation';
import { useDispatch } from "react-redux";
import { logout } from "../redux/user/userSlice";
import { toast } from "sonner";

export default function () {
    const router = useRouter()
    const dispatch = useDispatch();
    // const navItems = ["About", "Logout", "SignIn", "SignUp"];

    const logoutUser = async () => {
        try {
            const response = await fetch(
                `${process.env.NEXT_PUBLIC_API_URL}/api/users/logout/`,
                {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                }
            );

            const responseData = await response.json();

            if (response.ok) {
                dispatch(logout());
                toast.success(responseData.message);
                router.push('/signin');
            }
        } catch (error) {
            console.log(error);
            toast.error("Logout failed");
        }
    };

    return (
        <div className="bg-[#000] text-white flex justify-between items-center border-b border-[#3e3e3e] overflow-hidden">
            <Link href={"/"} className="text-2xl px-6">
                ToaD
            </Link>
            <div>
                {/* {navItems.map((item) => (
                    <Link
                        href={`/${item.toLowerCase()}`}
                        key={item}
                        className="px-12 py-5 border-l border-[#3e3e3e] hover:bg-[#c1121f] hover:transition duration-300 ease-in-out"
                    >
                        {item}
                    </Link>
                ))} */}
                <Link
                    href={"contact"}
                    className="px-12 py-5 border-l border-[#3e3e3e] hover:bg-[#c1121f] hover:transition duration-300 ease-in-out"
                >
                    Contact
                </Link>
                <button
                    onClick={logoutUser}
                    className="px-12 py-5 border-l border-[#3e3e3e] hover:bg-[#c1121f] hover:transition duration-300 ease-in-out"
                >
                    Logout
                </button>
                <Link
                    href={"signin"}
                    className="px-12 py-5 border-l border-[#3e3e3e] hover:bg-[#c1121f] hover:transition duration-300 ease-in-out"
                >
                    Sign In
                </Link>
                <Link
                    href={"signup"}
                    className="px-12 py-5 border-l border-[#3e3e3e] hover:bg-[#c1121f] hover:transition duration-300 ease-in-out"
                >
                    Sign Up
                </Link>
            </div>
        </div>
    );
}
