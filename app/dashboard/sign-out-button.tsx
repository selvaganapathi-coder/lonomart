"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "antd";
import { signOut } from "@/lib/auth-client";

export function SignOutButton() {

  const [loading, setLoading] = useState(false);
  const router = useRouter();
  async function handleSignOut() {
    setLoading(true);

    try {
      await signOut();
      router.push("/sign-in");
    } finally {
      setLoading(false);
    }
  }

  return (
    <Button danger loading={loading} onClick={handleSignOut}>
      Sign out
    </Button>
  );
}
