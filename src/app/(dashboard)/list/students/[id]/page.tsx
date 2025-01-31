"use client";

import { useState, useEffect } from "react";
import { useRouter, useParams } from "next/navigation";
import { doc, getDoc } from "firebase/firestore";
import { db } from "@/firebase/firebase";
import Announcements from "@/components/Announcements";
import BigCalendar from "@/components/LargeCalender";
import { BiDonateBlood } from "react-icons/bi";
import {
  EnvelopeIcon,
  CalendarDaysIcon,
  PhoneIcon,
  UserPlusIcon,
  ClipboardDocumentCheckIcon,
  ArrowPathIcon,
} from "@heroicons/react/24/outline";
import { GiSpellBook } from "react-icons/gi";
import { SiGoogleclassroom } from "react-icons/si";
import Performance from "@/components/Performance";
import Image from "next/image";
import Link from "next/link";

const SingleStudentPage = () => {
  const router = useRouter();
  const { id } = useParams();
  interface StudentData {
    profilePicture: string;
    username: string;
    bloodType: string;
    birthday: string;
    email: string;
    phone: string;
    class: string;
  }

  const [studentData, setStudentData] = useState<StudentData | null>(null);

  useEffect(() => {
    const fetchStudentData = async () => {
      if (id) {
        const docRef = doc(db, "users", id as string);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          setStudentData(docSnap.data() as StudentData);
        } else {
          console.log("No such document!");
        }
      }
    };

    fetchStudentData();
  }, [id]);

  if (!studentData) {
    return <div className="flex justify-center-center w-8 h-8 ml-12 animate-spin"><ArrowPathIcon/></div>;
  }

  return (
    <div className="flex-1 p-4 flex flex-col gap-4 xl:flex-row">
      {/* LEFT */}
      <div className="w-full xl:w-2/3">
        {/* TOP */}
        <div className="flex flex-col lg:flex-row gap-4">
          {/* USER INFO CARD */}
          <div className="bg-white dark:bg-slate-900 dark:border-slate-800 py-6 px-4 rounded-md flex-1 flex gap-4 border-2 border-gray-200">
            <div className="w-1/3">
              <Image
                src={studentData.profilePicture}
                alt={studentData.username}
                width={144}
                height={144}
                className="w-36 h-36 rounded-full object-cover"
              />
            </div>
            <div className="w-2/3 flex flex-col justify-between gap-4">
              <h1 className="text-xl font-semibold">{studentData.username}</h1>
              <p className="text-sm text-gray-500">
                Lorem ipsum, dolor sit amet consectetur adipisicing elit.
              </p>
              <div className="flex items-center justify-between gap-2 flex-wrap text-xs font-medium">
                <div className="w-full md:w-1/3 lg:w-full 2xl:w-1/3 flex items-center gap-2">
                  <BiDonateBlood className="h-5 w-5 text-gray-600" />
                  <span>{studentData.bloodType}</span>
                </div>
                <div className="w-full md:w-1/3 lg:w-full 2xl:w-1/3 flex items-center gap-2">
                  <CalendarDaysIcon className="h-5 w-5 text-gray-600" />
                  <span>{studentData.birthday}</span>
                </div>
                <div className="w-full md:w-1/3 lg:w-full 2xl:w-1/3 flex items-center gap-2">
                  <EnvelopeIcon className="h-5 w-5 text-gray-600" />
                  <span>{studentData.email}</span>
                </div>
                <div className="w-full md:w-1/3 lg:w-full 2xl:w-1/3 flex items-center gap-2">
                  <PhoneIcon className="h-5 w-5 text-gray-600" />
                  <span>{studentData.phone}</span>
                </div>
              </div>
            </div>
          </div>
          {/* SMALL CARDS */}
          <div className="flex-1 flex gap-4 justify-between flex-wrap">
            {/* CARD */}
            <div className="bg-white dark:bg-slate-900 dark:border-slate-800 p-4 rounded-md flex gap-4 w-full md:w-[48%] xl:w-[45%] 2xl:w-[48%] border border-gray-200">
              <UserPlusIcon className="w-6 h-6" />
              <div className="">
                <h1 className="text-xl font-semibold">90%</h1>
                <span className="text-sm text-gray-400">Attendance</span>
              </div>
            </div>
            {/* CARD */}
            <div className="bg-white dark:bg-slate-900 dark:border-slate-800 p-4 rounded-md flex gap-4 w-full md:w-[48%] xl:w-[45%] 2xl:w-[48%] border border-gray-200">
              <ClipboardDocumentCheckIcon className="w-6 h-6" />
              <div className="">
                <h1 className="text-xl font-semibold">{studentData.class.replace(/\D/g, '')}th</h1>
                <span className="text-sm text-gray-400">Grade</span>
              </div>
            </div>
            {/* CARD */}
            <div className="bg-white dark:bg-slate-900 dark:border-slate-800 p-4 rounded-md flex gap-4 w-full md:w-[48%] xl:w-[45%] 2xl:w-[48%] border border-gray-200">
              <GiSpellBook className="w-8 h-8" />
              <div className="">
                <h1 className="text-xl font-semibold">18</h1>
                <span className="text-sm text-gray-400">Lessons</span>
              </div>
            </div>
            {/* CARD */}
            <div className="bg-white dark:bg-slate-900 dark:border-slate-800 p-4 rounded-md flex gap-4 w-full md:w-[48%] xl:w-[45%] 2xl:w-[48%] border border-gray-200">
              <SiGoogleclassroom className="w-8 h-8" />
              <div className="">
                <h1 className="text-xl font-semibold">{studentData.class}</h1>
                <span className="text-sm text-gray-400">Class</span>
              </div>
            </div>
          </div>
        </div>
        {/* BOTTOM */}
        <div className="mt-4 bg-white dark:bg-slate-900 dark:border-slate-800 rounded-md p-4 h-[800px] border-2 border-gray-200">
          <h1>Student&apos;s Schedule</h1>
          <BigCalendar />
        </div>
      </div>
      {/* RIGHT */}
      <div className="w-full xl:w-1/3 flex flex-col gap-4">
        <Performance />
        <Announcements />
      </div>
    </div>
  );
};

export default SingleStudentPage;
