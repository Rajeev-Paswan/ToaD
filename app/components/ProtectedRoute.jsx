"use client"
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { useSelector } from 'react-redux';

const ProtectedRoute = ({ children }) => {
    const { currentUser } = useSelector((state) => state.user);
    const router = useRouter();

    console.log(currentUser)

    useEffect(() => {
        if (!currentUser) {
            router.push('/signin');
        }
    }, [currentUser, router]);

    return children;
};

export default ProtectedRoute;
