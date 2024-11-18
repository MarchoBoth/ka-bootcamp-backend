import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import prisma from "@/lib/prisma";
import FormProduct from "../_components/form";
import { notFound } from "next/navigation";

export default async function ProductDetail({
  params,
}: {
  params: { productId: string };
}) {
  const product = await prisma.product.findUnique({
    where: {
      id: Number(params.productId),
    },
    include: {
      colors: true,
    },
  });
  if (!product) {
    return notFound();
  }
  const categories = await prisma.category.findMany({
    where: {
      isActive: true,
    },
  });
  return (
    <div>
      <Breadcrumb pageName="Product Detail" />
      <FormProduct categories={categories} product={product} />
    </div>
  );
}
