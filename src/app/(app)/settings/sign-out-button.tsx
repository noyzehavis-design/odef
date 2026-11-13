"use client";

import { LogOut } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { copy } from "@/lib/copy";

/**
 * Signs out and wipes the service worker caches, so no financial screens
 * stay readable offline on this device.
 */
export function SignOutButton({ className }: { className?: string }) {
  const [pending, setPending] = useState(false);

  async function clearCaches() {
    if (!("caches" in window)) return;
    const keys = await caches.keys();
    await Promise.all(keys.map((key) => caches.delete(key)));
  }

  return (
    <form
      action="/auth/signout"
      method="post"
      className={className}
      onSubmit={async (e) => {
        e.preventDefault();
        const form = e.currentTarget;
        setPending(true);
        await clearCaches().catch(() => {});
        form.submit();
      }}
    >
      <Button type="submit" variant="outline" disabled={pending}>
        <LogOut aria-hidden />
        {pending ? copy.settings.signingOut : copy.settings.signOut}
      </Button>
    </form>
  );
}
