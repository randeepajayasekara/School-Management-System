"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";
import { db } from "@/firebase/firebase";
import { toast } from "react-hot-toast";

const useAuth = (requiredRole: string) => {
  const [loading, setLoading] = useState(true);
  const [authorized, setAuthorized] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const auth = getAuth();
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        const userDoc = await getDoc(doc(db, "users", user.uid));
        if (userDoc.exists()) {
          const userData = userDoc.data();
          const role = userData.role;

          if (role === requiredRole) {
            setAuthorized(true);
          } else {
            toast.error("Access denied. Insufficient permissions.");
            router.push("/");
          }
        } else {
          toast.error("User data not found.");
          router.push("/");
        }
      } else {
        toast.error("You must be logged in to access this page.");
        router.push("/");
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, [requiredRole, router]);

  return { loading, authorized };
};

export default useAuth;