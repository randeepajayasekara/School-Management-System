import Menu from "@/components/layouts/Menu";
import Navbar from "@/components/layouts/Navbar";
import Link from "next/link";
import { AcademicCapIcon } from "@heroicons/react/24/outline";

export default function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="h-screen flex">
      <div className="w-[14%] md:w-[8%] lg:w-[16%] xl:w-[14%] p-4 dark:bg-[url('https://i.postimg.cc/K8kJychz/pexels-photo-6985132.jpg')] bg-no-repeat bg-cover bg-center backdrop-blur-md">
        <Link
          href="/"
          className="flex items-center justify-center lg:justify-start gap-2"
        >
          <AcademicCapIcon className="h-5 w-5 animate-pulse" />
          <span className="hidden lg:block">
            {(() => {
              const hours = new Date().getHours();
              if (hours < 12) return "Good Morning";
              if (hours < 18) return "Good Afternoon";
              return "Good Evening";
            })()}
          </span>
        </Link>
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
