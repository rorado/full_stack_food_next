import { AppSidebar } from "@/components/admin/layout/app-sidebar";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { getCurrentLocale } from "@/lib/getCurrentLocale";
import getTrans from "@/lib/translation";

export default async function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  const locale = await getCurrentLocale();
  const translate = await getTrans(locale);

  return (
    <div className="section-gap">
      <SidebarProvider>
        <AppSidebar locale={locale} translate={translate} />
        <main className="w-full">
          <SidebarTrigger />
          <div>{children}</div>
        </main>
      </SidebarProvider>
    </div>
  );
}
