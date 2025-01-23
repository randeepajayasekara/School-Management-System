"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { getAuth, signOut } from "firebase/auth";
import { toast } from "react-hot-toast";

const LogoutPage = () => {
    const router = useRouter();
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const auth = getAuth();
        signOut(auth)
            .then(() => {
                // Sign-out successful.
                router.push("/");
            })
            .catch((error) => {
                // An error happened.
                setError(error.message);
                toast.error(`Error signing out: ${error.message}`);
            })
            .finally(() => {
                setLoading(false);
            });
    }, [router]);

    if (loading) {
        return <div className="flex items-center justify-center w-screen h-screen">Loading...</div>;
    }

    if (error) {
        return (
            <div>
                <p>Error: {error}</p>
                <button onClick={() => router.push("/")}>Go to Home</button>
            </div>
        );
    }

    return null;
};

export default LogoutPage;
