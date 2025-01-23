"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { getFirestore, doc, getDoc } from "firebase/firestore";
import { app } from "@/firebase/firebase"; // Make sure to configure Firebase
import { LoginForm } from "@/components/layouts/login-form";
import { toast } from "react-hot-toast";
import { ModeToggle } from "@/components/theme/mode-toggle";

export default function LoginPage() {
  const router = useRouter();
  const auth = getAuth(app);
  const db = getFirestore(app);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        const userDoc = await getDoc(doc(db, "users", user.uid));
        if (userDoc.exists()) {
          const userData = userDoc.data();
          const role = userData.role;

          if (role === "admin") {
            router.push("/admin");
          } else if (role === "teacher") {
            router.push("/teacher");
          } else if (role === "student") {
            router.push("/student");
          } else if (role === "parent") {
            router.push("/parent");
          }
        } else {
          toast("Login");
        }
      }
    });

    return () => unsubscribe();
  }, [auth, db, router]);

  return (
    <div className="flex min-h-svh flex-col items-center justify-center bg-muted dark:bg-black p-6 md:p-10">
      <div className="w-full max-w-sm md:max-w-3xl">
        <LoginForm />
      </div>
      <div className="fixed bottom-4 right-4">
        <ModeToggle />
      </div>
    </div>
  );
}
