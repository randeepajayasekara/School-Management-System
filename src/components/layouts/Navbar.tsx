import Image from "next/image"

import {
  BellIcon,
  ChatBubbleOvalLeftIcon,
  UserIcon,
  MagnifyingGlassIcon
 } from "@heroicons/react/24/outline"

const Navbar = () => {
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
        <div className='flex flex-col'>
          <span className="text-xs leading-3 font-medium">John Doe</span>
          <span className="text-[10px] text-gray-500 text-right">Admin</span>
        </div>
        <UserIcon className="h-8 w-8 border rounded-full p-1"/>
      </div>
    </div>
  )
}

export default Navbar