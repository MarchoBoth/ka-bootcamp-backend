import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import prisma from "@/lib/prisma";
import dayjs from "dayjs";
import Link from "next/link";
import { deleteCategory } from "@/actions";
import Swal from "sweetalert2";
import FormDelete from "./_components/formDelet";

export default async function CategoriesPage() {
  //get categories

  const categories = await prisma.category.findMany();
  console.log(categories);

  return (
    <div>
      <Breadcrumb pageName="Categories" />
      <div className="flex justify-end">
        <Link
          href="/categories/create "
          className="btn btn-primary m-2 rounded-lg bg-green-600  px-7 py-3 text-white transition-all duration-300 ease-in-out hover:bg-green-900"
        >
          add Category
        </Link>
      </div>
      <div className="rounded-sm border border-stroke bg-white px-5 pb-2.5 pt-6 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:pb-1">
        <div className="max-w-full overflow-x-auto">
          <table className="w-full table-auto">
            <thead>
              <tr className="bg-gray-2 text-left dark:bg-meta-4">
                <th className="min-w-[220px] px-4 py-4 font-medium text-black dark:text-white xl:pl-11">
                  Name
                </th>
                <th className="min-w-[150px] px-4 py-4 font-medium text-black dark:text-white">
                  Created At
                </th>

                <th className="px-4 py-4 font-medium text-black dark:text-white">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              {categories.map((category, key) => (
                <tr key={key}>
                  {/* name and created at */}
                  <td className="border-b border-[#eee] px-4 py-5 pl-9 dark:border-strokedark xl:pl-11">
                    <h5 className="font-medium text-black dark:text-white">
                      {category.name}
                    </h5>
                    {/* created at */}
                  </td>
                  {/* created at */}
                  <td className="border-b border-[#eee] px-4 py-5 dark:border-strokedark">
                    <p className="text-black dark:text-white">
                      {dayjs(category.createdAt).format("DD MMMM YYYY")}
                    </p>
                  </td>
                  {/* actions */}
                  <td className="border-b border-[#eee] px-4 py-5 dark:border-strokedark">
                    <div className="flex items-center space-x-3.5">
                      {/* edit */}
                      <FormDelete categoryId={category.id.toString()} />
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
