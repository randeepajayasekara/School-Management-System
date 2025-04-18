"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { getFirestore, doc, getDoc } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import Announcements from "@/components/Announcements";
import { EventDataCalendar } from "@/components/EventDataCalendar";
import BigCalendar from "@/components/LargeCalender";
import { toast } from "react-hot-toast";

const StudentPage = () => {
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
          if (role !== "student") {
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

  if (userRole !== "student") {
    return null; // or a loading spinner
  }

  return (
    <div className="p-4 flex gap-4 flex-col xl:flex-row">
      {/* LEFT */}
      <div className="w-full xl:w-2/3">
        <div className="h-full bg-white p-4 rounded-md border-2 border-gray-200 dark:bg-slate-900 dark:border-slate-800">
          <h1 className="text-xl font-semibold">Schedule (4A)</h1>
          <BigCalendar />
        </div>
      </div>
      {/* RIGHT */}
      <div className="w-full xl:w-1/3 flex flex-col gap-8">
        <EventDataCalendar />
        <Announcements />
      </div>
    </div>
  );
};

export default StudentPage;
