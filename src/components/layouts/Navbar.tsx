"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";
import { db } from "@/firebase/firebase";
import { User } from "firebase/auth";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { BellIcon, UserIcon } from "@heroicons/react/24/outline";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { ModeToggle } from "../theme/mode-toggle";
const Navbar = () => {
  const [user, setUser] = useState<User | null>(null);
  interface UserData {
    username: string;
    nameRole: string;
    email: string;
    role: string;
    profilePicture?: string;
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
    <div className="flex items-center justify-between p-4">
      {/* ICONS AND USER */}
      <div className="flex items-center gap-6 justify-end w-full">
        <ModeToggle />
        <Sheet>
          <SheetTrigger>
            <div className="bg-white dark:bg-black rounded-full w-8 h-7 flex items-center justify-center cursor-pointer relative">
              <BellIcon className="w-8 h-8 border dark:border-zinc-800 rounded-full p-1" />
              <div className="absolute -top-1 -right-2 w-4 h-4 flex items-center justify-center bg-sky-500 text-white rounded-full text-xs"></div>
            </div>
          </SheetTrigger>
          <SheetContent>
            <SheetHeader>
              <SheetTitle>Notifications</SheetTitle>
              <SheetDescription>All caught up!</SheetDescription>
            </SheetHeader>
          </SheetContent>
        </Sheet>
        {userData && (
          <div className="flex flex-col">
            <span className="text-xs leading-3 font-medium">
              {userData.username}
            </span>
            <span className="text-[10px] text-gray-500 text-right">
              {userData.nameRole}
            </span>
          </div>
        )}
        {userData?.profilePicture ? (
          <Popover>
            <PopoverTrigger>
              <Image
                src={userData.profilePicture}
                alt="Profile Picture"
                width={32}
                height={32}
                className="h-8 w-8 border rounded-full"
              />
            </PopoverTrigger>
            <PopoverContent>
              <div className="flex flex-row items-center gap-2 p-1">
                <Image
                  src={userData.profilePicture}
                  alt="Profile Picture"
                  width={75}
                  height={75}
                  className="profile-picture rounded-full border-2 border-gray-200"
                />
                <div className="flex flex-col bg-zinc-100 dark:bg-slate-800 p-2 px-6 rounded-lg">
                  <h2 className="text-md">{userData.username}</h2>
                  <p className="text-xs">{userData.email}</p>
                  <p className="text-sm text-gray-500">{userData.nameRole}</p>
                  <Button
                    variant="destructive"
                    className="mt-2"
                    onClick={() => {
                      const auth = getAuth();
                      auth.signOut().then(() => {
                        setUser(null);
                        setUserData(null);
                        window.location.href = "/";
                      });
                    }}
                  >
                    Logout
                  </Button>
                </div>
              </div>
            </PopoverContent>
          </Popover>
        ) : (
          <UserIcon className="h-8 w-8 border rounded-full p-1" />
        )}
      </div>
    </div>
  );
};

export default Navbar;
