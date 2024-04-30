"use client"
import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useDispatch } from 'react-redux';
import { logout } from '../lib/user/userSlice';
import { toast } from 'sonner';
import { FiMenu, FiX } from 'react-icons/fi';

export default function Navbar() {
    const router = useRouter();
    const dispatch = useDispatch();
    const [isOpen, setIsOpen] = useState(false);

    const logoutUser = async () => {
        try {
            const response = await fetch(
                `${process.env.NEXT_PUBLIC_API_URL}/api/users/logout/`,
                {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                }
            );

            const responseData = await response.json();

            if (response.ok) {
                dispatch(logout());
                toast.success(responseData.message);
                setIsOpen(false)
                router.push('/signin');
            }
        } catch (error) {
            console.log(error);
            toast.error('Logout failed');
        }
    };

    return (
        <>
            <div className={`bg-[#000] text-white h-16 flex justify-between items-center border-b border-[#3e3e3e] z-20`}>
                <Link href={'/'} className="text-2xl px-6">
                    ToaD
                </Link>
                <div className="md:hidden transition ease-in-out">
                    <button onClick={() => setIsOpen(!isOpen)} className="px-4 py-2">
                        {isOpen ? <FiX /> : <FiMenu />}
                    </button>
                </div>
                <div className={`max-md:hidden flex max-md:flex-col h-full`}>
                    <Link
                        href={'contact'}
                        className="px-10 flex items-center justify-center border-l border-[#3e3e3e] max-lg:px-10 max-lg:py-4 hover:bg-[#c1121f] hover:transition duration-300 ease-in-out"
                    >
                        Contact
                    </Link>
                    <button
                        onClick={logoutUser}
                        className="px-10 flex items-center justify-center border-l border-[#3e3e3e] max-lg:px-10 max-lg:py-4 hover:bg-[#c1121f] hover:transition duration-300 ease-in-out"
                    >
                        Logout
                    </button>
                    <Link
                        href={'signin'}
                        className="px-10 flex items-center justify-center border-l border-[#3e3e3e] max-lg:px-10 max-lg:py-4 hover:bg-[#c1121f] hover:transition duration-300 ease-in-out"
                    >
                        Sign In
                    </Link>
                    <Link
                        href={'signup'}
                        className="px-10 flex items-center justify-center border-l border-[#3e3e3e] max-lg:px-10 max-lg:py-4 hover:bg-[#c1121f] hover:transition duration-300 ease-in-out"
                    >
                        Sign Up
                    </Link>
                </div>
            </div>

            {isOpen && <div className='fixed inset-0 flex items-center justify-center z-10 transition ease-in-out'>
                <div className='absolute inset-0 bg-black/50' />
                <div className='absolute top-16 inset-4 rounded-md border bg-zinc-900 '>
                    <div className={`flex flex-col items-center size-full gap-4`}>
                        <Link
                            href={'/'}
                            onClick={() => setIsOpen(!isOpen)}
                            className="px-12 flex items-center justify-center mt-4 max-lg:px-10 max-lg:py-4 hover:bg-[#c1121f] hover:transition ease-in-out"
                        >
                            Home
                        </Link>
                        <Link
                            href={'signin'}
                            onClick={() => setIsOpen(!isOpen)}
                            className="px-12 flex items-center justify-center max-lg:px-10 max-lg:py-4 hover:bg-[#c1121f] hover:transition ease-in-out"
                        >
                            Sign In
                        </Link>
                        <button
                            onClick={logoutUser}
                            className="px-12 flex items-center justify-center max-lg:px-10 max-lg:py-4 hover:bg-[#c1121f] hover:transition ease-in-out"
                        >
                            Logout
                        </button>
                        <Link
                            href={'contact'}
                            onClick={() => setIsOpen(!isOpen)}
                            className="px-12 flex items-center justify-center max-lg:px-10 max-lg:py-4 hover:bg-[#c1121f] hover:transition ease-in-out"
                        >
                            Contact
                        </Link>
                        <img src="/assets/cat.gif" width={"200px"} height={"200px"} className='absolute bottom-0' />
                    </div>
                </div>
            </div>}
        </>
    );
}
