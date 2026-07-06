"use client";

import { useAuthStore } from "@/store/useAuthStore";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { DashboardLayout as DashboardBlock } from "@/components/ui/dashboard-layout";

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const { isLoggedIn } = useAuthStore();
  const router = useRouter();

  useEffect(() => {
    if (!isLoggedIn) {
      router.push("/");
    }
  }, [isLoggedIn, router]);

  if (!isLoggedIn) {
    return null; // Return nothing while redirecting
  }

  return (
    <DashboardBlock>
      {children}
    </DashboardBlock>
  )
}
