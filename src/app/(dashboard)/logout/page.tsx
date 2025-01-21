"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { getAuth, signOut } from "firebase/auth";
import { toast } from "react-hot-toast";

const LogoutPage = () => {
    const router = useRouter();

    useEffect(() => {
        const auth = getAuth();
        signOut(auth)
            .then(() => {
                // Sign-out successful.
                router.push("/");
                console.log("Sign-out successful.");
            })
            .catch((error) => {
                // An error happened.
                toast.error("Error signing out: ", error);
            });
    }, [router]);

    return null;
};

export default LogoutPage;