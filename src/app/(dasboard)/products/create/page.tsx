import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import FormProduct from "../_components/form";
import prisma from "@/lib/prisma";

export default async function CreateProductPage() {
  const categories = await prisma.category.findMany({
    where: {
      isActive: true,
    },
  });
  return (
    <div>
      <Breadcrumb pageName="Create Product" />
      <FormProduct categories={categories} />
    </div>
  );
}
