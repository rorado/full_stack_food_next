import { AppSidebar } from "@/components/admin/layout/app-sidebar";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { getCurrentLocale } from "@/lib/getCurrentLocale";

export default async function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  const locale = await getCurrentLocale();

  return (
    <div className="section-gap">
      <SidebarProvider>
        <AppSidebar locale={locale} />
        <main className="w-full">
          <SidebarTrigger />
          <div>{children}</div>
        </main>
      </SidebarProvider>
    </div>
  );
}
