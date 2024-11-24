import DefaultLayout from "@/components/Layouts/DefaultLayout";
export const metadata = {
  title: "Toko Komputer",
  description: "Dashboard",
};

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <DefaultLayout> {children}</DefaultLayout>;
}
