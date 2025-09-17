"use client";

import { Spinner } from "@/components/ui/spinner";
import { authClient } from "@/lib/auth";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function Home() {
  const { data: session, isPending } = authClient.useSession();
  const router = useRouter();

  useEffect(() => {
    if (!session) {
      router.push("/login");
    } else {
      router.push("/dashboard");
    }
  }, [session, router, isPending]);

  return (
    <div className="w-screen h-screen flex items-center justify-center">
      <Spinner size="lg" />
    </div>
  );
}
