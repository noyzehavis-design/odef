import { BottomNav } from "@/components/app-shell/bottom-nav";
import { SideNav } from "@/components/app-shell/side-nav";
import { requireUser } from "@/lib/auth/session";
import { copy } from "@/lib/copy";

/** Shell for every signed-in screen: rail on desktop, floating tab bar on phones. */
export default async function AppLayout({ children }: LayoutProps<"/">) {
  // Second line of defense after src/proxy.ts.
  const user = await requireUser();

  return (
    <div className="min-h-dvh md:ps-24">
      <SideNav />
      <main className="pt-safe mx-auto w-full max-w-6xl px-4 pb-32 md:px-8 md:pb-12">
        {user.isDemo && (
          <p className="mt-3 inline-flex items-center gap-1.5 rounded-full bg-warning/15 px-3 py-1 text-xs font-medium text-warning">
            {copy.demo.badge}
          </p>
        )}
        <div className="pt-5 md:pt-8">{children}</div>
      </main>
      <BottomNav />
    </div>
  );
}
