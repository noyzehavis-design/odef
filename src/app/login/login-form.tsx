"use client";

import { ArrowRight, Loader2, Mail } from "lucide-react";
import { useActionState, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { copy } from "@/lib/copy";
import { createClient } from "@/lib/supabase/client";
import { type LoginError, type LoginState, sendMagicLink, verifyCode } from "./actions";

const ERROR_TEXT: Record<LoginError | "link_expired", string> = {
  not_allowed: copy.login.errors.notAllowed,
  invalid_email: copy.login.errors.invalidEmail,
  bad_code: copy.login.errors.badCode,
  generic: copy.login.errors.generic,
  not_configured: copy.login.errors.notConfigured,
  link_expired: copy.login.errors.linkExpired,
};

export function LoginForm({ next, initialError }: { next: string; initialError?: string }) {
  const [sendState, sendAction, sending] = useActionState<LoginState, FormData>(sendMagicLink, { status: "idle" });
  const [codeState, codeAction, verifying] = useActionState<LoginState, FormData>(verifyCode, { status: "idle" });
  const [editingEmail, setEditingEmail] = useState(false);
  const [googleError, setGoogleError] = useState(false);

  const sentTo = sendState.status === "sent" && !editingEmail ? sendState.email : null;

  const errorKey =
    (sentTo ? (codeState.status === "error" ? codeState.error : null) : null) ??
    (sendState.status === "error" ? sendState.error : null) ??
    (googleError ? "generic" : null) ??
    (sendState.status === "idle" && initialError && initialError in ERROR_TEXT
      ? (initialError as keyof typeof ERROR_TEXT)
      : null);

  async function signInWithGoogle() {
    setGoogleError(false);
    const supabase = createClient();
    const redirectTo = `${window.location.origin}/auth/callback?next=${encodeURIComponent(next)}`;
    const { error } = await supabase.auth.signInWithOAuth({ provider: "google", options: { redirectTo } });
    if (error) setGoogleError(true);
  }

  if (sentTo) {
    return (
      <div className="space-y-5">
        <div className="space-y-1.5">
          <h2 className="text-lg font-medium">{copy.login.sentTitle}</h2>
          <p className="text-sm text-muted-foreground">{copy.login.sentBody(sentTo)}</p>
        </div>
        <form action={codeAction} className="space-y-3">
          <input type="hidden" name="email" value={sentTo} />
          <input type="hidden" name="next" value={next} />
          <Label htmlFor="code">{copy.login.codeLabel}</Label>
          <Input
            id="code"
            name="code"
            inputMode="numeric"
            autoComplete="one-time-code"
            pattern="[0-9]*"
            maxLength={8}
            dir="ltr"
            className="h-12 text-center text-xl tracking-[0.4em] tabular-nums"
            required
            autoFocus
          />
          {errorKey && <ErrorText>{ERROR_TEXT[errorKey]}</ErrorText>}
          <Button type="submit" size="xl" className="w-full" disabled={verifying}>
            {verifying ? <Loader2 className="animate-spin" /> : null}
            {verifying ? copy.login.verifying : copy.login.verify}
          </Button>
        </form>
        <button
          type="button"
          onClick={() => setEditingEmail(true)}
          className="inline-flex items-center gap-1.5 text-sm text-muted-foreground transition-colors hover:text-foreground"
        >
          <ArrowRight className="size-4" />
          {copy.login.changeEmail}
        </button>
      </div>
    );
  }

  return (
    <div className="space-y-5">
      <form action={(fd) => { setEditingEmail(false); sendAction(fd); }} className="space-y-3">
        <input type="hidden" name="next" value={next} />
        <Label htmlFor="email">{copy.login.emailLabel}</Label>
        <Input
          id="email"
          name="email"
          type="email"
          inputMode="email"
          autoComplete="email"
          placeholder={copy.login.emailPlaceholder}
          defaultValue={sendState.status !== "idle" ? sendState.email : undefined}
          dir="ltr"
          className="h-12 text-base"
          required
        />
        {errorKey && <ErrorText>{ERROR_TEXT[errorKey]}</ErrorText>}
        <Button type="submit" size="xl" className="w-full" disabled={sending}>
          {sending ? <Loader2 className="animate-spin" /> : <Mail />}
          {sending ? copy.login.sending : copy.login.sendLink}
        </Button>
      </form>

      <div className="flex items-center gap-3 text-xs text-muted-foreground">
        <span className="h-px flex-1 bg-border" />
        {copy.login.or}
        <span className="h-px flex-1 bg-border" />
      </div>

      <Button type="button" variant="outline" size="xl" className="w-full" onClick={signInWithGoogle}>
        <GoogleIcon />
        {copy.login.google}
      </Button>
    </div>
  );
}

function ErrorText({ children }: { children: React.ReactNode }) {
  return (
    <p role="alert" className="text-sm text-danger">
      {children}
    </p>
  );
}

function GoogleIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden className="size-5">
      <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 0 1-2.2 3.32v2.77h3.57c2.08-1.92 3.27-4.74 3.27-8.1z" />
      <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84A11 11 0 0 0 12 23z" />
      <path fill="#FBBC05" d="M5.84 14.09A6.6 6.6 0 0 1 5.5 12c0-.73.13-1.43.34-2.09V7.07H2.18A11 11 0 0 0 1 12c0 1.78.43 3.45 1.18 4.93l3.66-2.84z" />
      <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1A11 11 0 0 0 2.18 7.07l3.66 2.84C6.71 7.31 9.14 5.38 12 5.38z" />
    </svg>
  );
}
