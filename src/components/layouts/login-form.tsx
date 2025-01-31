"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import {
  getAuth,
  signInWithEmailAndPassword,
  sendPasswordResetEmail,
} from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";
import { db } from "@/firebase/firebase";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Image from "next/image";
import { toast } from "react-hot-toast";

export function LoginForm({
  className,
  ...props
}: React.ComponentProps<"div">) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();
  const auth = getAuth();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );
      const user = userCredential.user;

      // Fetch user role from Firestore
      const userDoc = await getDoc(doc(db, "users", user.uid));
      if (userDoc.exists()) {
        const userData = userDoc.data();
        const role = userData.role;

        // Store role in local storage and print to console
        localStorage.setItem("userRole", role);
        console.log("User role:", role);

        // Redirect based on user role
        if (role === "admin") {
          router.push("/admin");
        } else if (role === "teacher") {
          router.push("/teacher");
        } else if (role === "student") {
          router.push("/student");
        } else if (role === "parent") {
          router.push("/parent");
        } else {
          toast.error("User role not found.");
        }
      } else {
        toast.error("User is not authorized by system");
      }
    } catch {
      toast.error("Failed to login. Please check your credentials");
    }
  };

  const handleForgotPassword = async () => {
    if (!email) {
      toast.error("Please enter your email address.");
      return;
    }
    try {
      await sendPasswordResetEmail(auth, email);
      toast.success("Password reset email sent.");
    } catch {
      toast.error("Failed to send password reset email.");
    }
  };

  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <Card className="overflow-hidden">
        <CardContent className="grid p-0 md:grid-cols-2">
          <form className="p-6 md:p-8" onSubmit={handleLogin}>
            <div className="flex flex-col gap-6">
              <div className="flex flex-col items-center text-center">
                <h1 className="text-2xl font-bold select-none">Welcome back</h1>
                <p className="text-balance text-muted-foreground select-none">
                  Login to your account
                </p>
              </div>
              <div className="grid gap-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="username@school.com"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <div className="grid gap-2">
                <div className="flex items-center">
                  <Label htmlFor="password">Password</Label>
                  <span
                    className="ml-auto text-sm underline-offset-2 hover:underline cursor-pointer"
                    onClick={handleForgotPassword}
                  >
                    Forgot your password?
                  </span>
                </div>
                <Input
                  id="password"
                  type="password"
                  placeholder="••••••••"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
              <Button type="submit">Login</Button>
            </div>
          </form>
          <div className="relative hidden bg-muted md:block">
            <Image
              src="https://i.ibb.co/Dr431hN/login-Form-BG.jpg"
              alt="Image"
              layout="fill"
              objectFit="cover"
              className="select-none absolute inset-0 dark:brightness-[0.2] dark:grayscale"
            />
          </div>
        </CardContent>
      </Card>
      <div className="text-balance text-center text-xs text-muted-foreground [&_a]:underline [&_a]:underline-offset-4 hover:[&_a]:text-primary select-none">
        By clicking login, you agree to our <a href="#">Terms of Service</a> and{" "}
        <a href="#">Privacy Policy</a>.
      </div>
    </div>
  );
}
