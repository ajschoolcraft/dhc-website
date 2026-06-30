"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import { Button } from "@/components/ui/button";

export function AdminHeader() {
  const router = useRouter();
  const supabase = createClient();
  const [showPasswordForm, setShowPasswordForm] = useState(false);
  const [newPassword, setNewPassword] = useState("");
  const [message, setMessage] = useState("");

  async function handleSignOut() {
    await supabase.auth.signOut();
    router.push("/admin");
    router.refresh();
  }

  async function handleChangePassword(e: React.FormEvent) {
    e.preventDefault();
    if (newPassword.length < 6) {
      setMessage("Password must be at least 6 characters");
      return;
    }
    const { error } = await supabase.auth.updateUser({ password: newPassword });
    if (error) {
      setMessage(error.message);
    } else {
      setMessage("Password updated!");
      setNewPassword("");
      setTimeout(() => {
        setShowPasswordForm(false);
        setMessage("");
      }, 2000);
    }
  }

  return (
    <header className="flex h-16 items-center justify-between border-b border-border bg-white px-6">
      <div />
      <div className="flex items-center gap-3">
        {showPasswordForm ? (
          <form onSubmit={handleChangePassword} className="flex items-center gap-2">
            <input
              type="password"
              placeholder="New password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              className="rounded border border-border px-2 py-1 text-sm"
            />
            <Button type="submit" variant="ghost" size="sm">Save</Button>
            <Button type="button" variant="ghost" size="sm" onClick={() => { setShowPasswordForm(false); setMessage(""); }}>Cancel</Button>
            {message && <span className="text-xs text-text-light">{message}</span>}
          </form>
        ) : (
          <Button variant="ghost" size="sm" onClick={() => setShowPasswordForm(true)}>
            Change Password
          </Button>
        )}
        <Button variant="ghost" size="sm" onClick={handleSignOut}>
          Sign Out
        </Button>
      </div>
    </header>
  );
}
