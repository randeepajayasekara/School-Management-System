"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { getFirestore, doc, getDoc } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import Announcements from "@/components/Announcements";
import BigCalendar from "@/components/LargeCalender";
import { toast } from "react-hot-toast";

const ParentPage = () => {
  const [userRole, setUserRole] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    const fetchUserRole = async () => {
      const auth = getAuth();
      const user = auth.currentUser;
      if (user) {
        const db = getFirestore();
        const userDoc = await getDoc(doc(db, "users", user.uid));
        if (userDoc.exists()) {
          const role = userDoc.data().role;
          setUserRole(role);
          if (role !== "parent") {
            router.push("/");
            toast.error("You are not authorized to view this page.");
          }
        } else {
          router.push("/");
        }
      } else {
        router.push("/");
      }
    };

    fetchUserRole();
  }, [router]);

  if (userRole !== "parent") {
    return null; // or a loading spinner
  }

  return (
    <div className="flex-1 p-4 flex gap-4 flex-col xl:flex-row">
      {/* LEFT */}
      <div className="w-full xl:w-2/3">
        <div className="h-full bg-white dark:bg-slate-900 p-4 rounded-md border border-gray-400 dark:border-slate-800">
          <h1 className="text-xl font-semibold">Schedule (John Doe)</h1>
          <BigCalendar />
        </div>
      </div>
      {/* RIGHT */}
      <div className="w-full xl:w-1/3 flex flex-col gap-8">
        <Announcements />
      </div>
    </div>
  );
};

export default ParentPage;