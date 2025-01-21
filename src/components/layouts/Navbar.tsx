"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";
import { db } from "@/firebase/firebase"; 
import { User } from "firebase/auth";

import {
  BellIcon,
  ChatBubbleOvalLeftIcon,
  UserIcon,
} from "@heroicons/react/24/outline";

const Navbar = () => {

  
  const [user, setUser] = useState<User | null>(null);
  interface UserData {
    username: string;
    nameRole: string;
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
    <div className='flex items-center justify-between p-4'>
      {/* ICONS AND USER */}
      <div className='flex items-center gap-6 justify-end w-full'>
        <div className='bg-white rounded-full w-7 h-7 flex items-center justify-center cursor-pointer'>
          <ChatBubbleOvalLeftIcon className="w-8 h-8 border rounded-full p-1"/>
        </div>
        <div className='bg-white rounded-full w-7 h-7 flex items-center justify-center cursor-pointer relative'>
          <BellIcon className="w-8 h-8 border rounded-full p-1"/>
          <div className='absolute -top-1 -right-2 w-4 h-4 flex items-center justify-center bg-sky-500 text-white rounded-full text-xs'>1</div>
        </div>
        {userData && (
          <div className='flex flex-col'>
            <span className="text-xs leading-3 font-medium">{userData.username}</span>
            <span className="text-[10px] text-gray-500 text-right">{userData.nameRole}</span>
          </div>
        )}
        {userData?.profilePicture ? (
          <Image
            src={userData.profilePicture}
            alt="Profile Picture"
            width={32}
            height={32}
            className="h-8 w-8 border rounded-full"
          />
        ) : (
          <UserIcon className="h-8 w-8 border rounded-full p-1"/>
        )}
      </div>
    </div>
  );
}

export default Navbar;