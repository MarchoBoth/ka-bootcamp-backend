import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import { notFound } from "next/navigation";
import FormEdit from "../_components/formEdit";
import prisma from "@/lib/prisma";

type Props = {
  params: {
    categoriesId: string;
  };
};

export default async function EditCategoryPage({ params }: Props) {
  const category = await prisma.category.findUnique({
    where: {
      id: Number(params.categoriesId),
    },
  });

  if (!category) {
    notFound();
  }

  return (
    <div>
      <Breadcrumb pageName="Edit Category" />
      <div className="mb-4.5 flex flex-col gap-4 rounded-lg border border-stroke bg-white p-6 shadow-sm dark:border-strokedark dark:bg-boxdark">
        <div>Name: {category.name}</div>
        <div>Status: {category.isActive ? "Active" : "Inactive"}</div>
        <div>Description: {category.description}</div>
      </div>
      <FormEdit categoryId={params.categoriesId} />
    </div>
  );
}
