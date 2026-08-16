"use client";

import { useState } from "react";
import { Button } from "antd";
import { signOut } from "@/lib/auth-client";

export function SignOutButton() {
  const [loading, setLoading] = useState(false);

  async function handleSignOut() {
    setLoading(true);

    try {
      await signOut();
      window.location.assign("/sign-in");
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
