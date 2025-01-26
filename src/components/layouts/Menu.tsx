"use client";

import { useEffect, useState } from "react";
import "firebase/auth";
import Link from "next/link";

import {
  HomeIcon,
  UsersIcon,
  ClipboardDocumentCheckIcon,
  IdentificationIcon,
  PencilSquareIcon,
  DocumentCheckIcon,
  DocumentTextIcon,
  PercentBadgeIcon,
  CalendarDaysIcon,
  MegaphoneIcon,
  ArrowRightStartOnRectangleIcon,
} from "@heroicons/react/24/outline";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";

import { FaChalkboardTeacher } from "react-icons/fa";
import { FaUserGraduate } from "react-icons/fa";
import { getAuth } from "firebase/auth";

const menuItems = [
  {
    title: " ",
    items: [
      {
        icon: <HomeIcon />,
        label: "Home",
        href: "/",
        visible: ["admin", "teacher", "student", "parent"],
      },
      {
        icon: <FaChalkboardTeacher />,
        label: "Teachers",
        href: "/list/teachers",
        visible: ["admin", "teacher"],
      },
      {
        icon: <FaUserGraduate />,
        label: "Students",
        href: "/list/students",
        visible: ["admin", "teacher"],
      },
      {
        icon: <UsersIcon />,
        label: "Parents",
        href: "/list/parents",
        visible: ["admin", "teacher"],
      },
      {
        icon: <ClipboardDocumentCheckIcon />,
        label: "Subjects",
        href: "/list/subjects",
        visible: ["admin"],
      },
      {
        icon: <IdentificationIcon />,
        label: "Classes",
        href: "/list/classes",
        visible: ["admin", "teacher"],
      },
      {
        icon: <PencilSquareIcon />,
        label: "Lessons",
        href: "/list/lessons",
        visible: ["admin", "teacher"],
      },
      {
        icon: <DocumentCheckIcon />,
        label: "Exams",
        href: "/list/exams",
        visible: ["admin", "teacher", "student", "parent"],
      },
      {
        icon: <DocumentTextIcon />,
        label: "Assignments",
        href: "/list/assignments",
        visible: ["admin", "teacher", "student", "parent"],
      },
      {
        icon: <PercentBadgeIcon />,
        label: "Results",
        href: "/list/results",
        visible: ["admin", "teacher", "student", "parent"],
      },
      {
        icon: <CalendarDaysIcon />,
        label: "Events",
        href: "/list/events",
        visible: ["admin", "teacher", "student", "parent"],
      },
      {
        icon: <MegaphoneIcon />,
        label: "Announcements",
        href: "/list/announcements",
        visible: ["admin", "teacher", "student", "parent"],
      },
    ],
  },
];

const Menu = () => {
  const [role, setRole] = useState("");

  useEffect(() => {
    const userRole = localStorage.getItem("userRole");
    if (userRole) {
      setRole(userRole);
      console.log("User role:", userRole);
    }
  }, []);

  const handleLogout = () => {
    const auth = getAuth();
    auth.signOut().then(() => {
      localStorage.removeItem("userRole");
      window.location.href = "/";
    });
  };

  return (
    <div>
      <div className="mt-4 text-sm">
        {menuItems.map((i) => (
          <div className="flex flex-col gap-2" key={i.title}>
            <span className="hidden lg:block text-gray-400 font-light my-4">
              {i.title}
            </span>
            {i.items.map((item) => {
              if (item.visible.includes(role)) {
                return (
                  <Link
                    href={item.href}
                    key={item.label}
                    className="flex items-center justify-center lg:justify-start gap-4 text-gray-500 dark:text-gray-100 py-2 md:px-2 rounded-md hover:bg-CustomSkyLight dark:hover:bg-gray-700 duration-300"
                  >
                    <span className="w-5 h-5">{item.icon}</span>
                    <span className="hidden lg:block">{item.label}</span>
                  </Link>
                );
              }
            })}
          </div>
        ))}
        <AlertDialog>
          <AlertDialogTrigger asChild>
            <div className="mt-4 flex items-center justify-center lg:justify-start gap-4 text-gray-500 dark:text-gray-100 py-2 md:px-2 rounded-md hover:bg-red-200 dark:hover:bg-red-500/50 duration-300">
              <span className="w-5 h-5">
                <ArrowRightStartOnRectangleIcon />
              </span>
              <span className="hidden lg:block">Logout</span>
            </div>
          </AlertDialogTrigger>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>
                Are you sure you want to log out?
              </AlertDialogTitle>
              <AlertDialogDescription>
                Logging out will end your current session. You will need to log
                in again to access your account.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Cancel</AlertDialogCancel>
              <AlertDialogAction onClick={handleLogout}>
                Logout
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </div>
    </div>
  );
};

export default Menu;
