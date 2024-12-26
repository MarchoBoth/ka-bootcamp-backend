import DefaultLayout from "@/components/Layouts/DefaultLayout";
import { revalidatePath } from "next/cache";
export const revalidate = 0;
export const maxDuration = 60;
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
