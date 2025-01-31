"use client";	

import { useEffect, useState } from "react";
import Menu from "@/components/layouts/Menu";
import Navbar from "@/components/layouts/Navbar";
import Image from "next/image";
import { doc, getDoc } from "firebase/firestore";
import { db } from "@/firebase/firebase";
import { getAuth, onAuthStateChanged, User } from "firebase/auth";

export default function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [, setUser] = useState<User | null>(null);
  interface UserData {
    username: string;
    nameRole: string;
    email: string;
    role: string;
    profilePicture?: string;
    schoolLogo?: string;
  }

  const [userData, setUserData] = useState<UserData | null>(null);

  useEffect(() => {
    const auth = getAuth();
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        setUser(user);
        const userDoc = await getDoc(doc(db, "users", user.uid));
        if (userDoc.exists()) {
          setUserData(userDoc.data() as UserData);
        }
      } else {
        setUser(null);
        setUserData(null);
      }
    });

    return () => unsubscribe();
  }, []);

  return (
    <div className="h-screen flex">
      <div className="w-[14%] md:w-[8%] lg:w-[16%] xl:w-[14%] p-4 dark:bg-[url('https://i.postimg.cc/K8kJychz/pexels-photo-6985132.jpg')] bg-no-repeat bg-cover bg-center backdrop-blur-md">
        <div className="flex items-center justify-center lg:justify-start gap-2 rounded-sm bg-transparent p-1 backdrop-blur-lg">
          <div className="hidden lg:block">
            {userData && (
              <Image width={100} height={100} src={userData.schoolLogo || "https://i.ibb.co/G00ZfQS/undefined-logo.png"} alt="School Logo" className="rounded-md h-auto w-12 dark:w-14 dark:bg-transparent dark:lg:bg-white dark:border-2 dark:border-gray-400 dark:backdrop-blur-xl dark:p-1"/>
            )}
          </div>
        </div>
        <Menu />
      </div>
      {/* RIGHT */}
      <div className="w-[86%] md:w-[92%] lg:w-[84%] xl:w-[86%] bg-[#F7F8FA] dark:bg-black overflow-scroll flex flex-col">
        <Navbar />
        {children}
      </div>
    </div>
  );
}
