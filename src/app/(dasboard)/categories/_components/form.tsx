"use client";
import Swal from "sweetalert2";
import { createCategory, editCategory } from "@/actions";
import { useRouter } from "next/navigation";
import { Category } from "@prisma/client";
import { useState } from "react";
interface FormProps {
  category?: Category;
}
export default function Form({ category }: FormProps) {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const handleSubmit = async (formData: FormData) => {
    setIsLoading(true);
    const result = category
      ? await editCategory(category.id, formData)
      : await createCategory(formData);

    if (!result.success) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: result.error || "Something went wrong",
      });
    } else {
      await Swal.fire({
        icon: "success",
        title: "Success",
        text: category
          ? "Category updated successfully"
          : "Category created successfully",
      });

      router.push("/categories");
      router.refresh();
    }
    setIsLoading(false);
  };

  return (
    <div>
      <div className="grid grid-cols-2">
        <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
          <div className="border-b border-stroke px-6.5 py-4 dark:border-strokedark">
            <h3 className="font-medium text-black dark:text-white">
              Create Category
            </h3>
          </div>
          <form action={handleSubmit}>
            <div className="p-6.5">
              <div className="mb-4.5">
                <label className="mb-3 block text-sm font-medium text-black dark:text-white">
                  Name
                </label>
                <input
                  defaultValue={category?.name}
                  type="text"
                  required
                  name="name"
                  placeholder="Enter Category name"
                  className="mb-4.5 w-full rounded border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                />
                {/* select isActive  */}
                <div className="mb-4.5">
                  <label className="mb-3 block text-sm font-medium text-black dark:text-white">
                    Active
                  </label>

                  <div className="relative z-20 bg-white dark:bg-form-input">
                    <select
                      name="isActive"
                      className={`relative z-20 w-full appearance-none rounded border border-stroke bg-transparent px-5 py-3 outline-none transition focus:border-primary active:border-primary dark:border-form-strokedark dark:bg-form-input dark:text-white`}
                    >
                      <option
                        defaultValue={category?.isActive ? "1" : "0"}
                        value={1}
                        className="text-body dark:text-bodydark "
                      >
                        Active
                      </option>

                      <option
                        defaultValue={category?.isActive ? "0" : "1"}
                        value={0}
                        className="text-body dark:text-bodydark"
                      >
                        Inactive
                      </option>
                    </select>

                    <span className="absolute right-4 top-1/2 z-10 -translate-y-1/2">
                      <svg
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <g opacity="0.8">
                          <path
                            fillRule="evenodd"
                            clipRule="evenodd"
                            d="M5.29289 8.29289C5.68342 7.90237 6.31658 7.90237 6.70711 8.29289L12 13.5858L17.2929 8.29289C17.6834 7.90237 18.3166 7.90237 18.7071 8.29289C19.0976 8.68342 19.0976 9.31658 18.7071 9.70711L12.7071 15.7071C12.3166 16.0976 11.6834 16.0976 11.2929 15.7071L5.29289 9.70711C4.90237 9.31658 4.90237 8.68342 5.29289 8.29289Z"
                            fill="#637381"
                          ></path>
                        </g>
                      </svg>
                    </span>
                  </div>
                </div>
                {/* description  */}
                <div className="mb-6">
                  <label className="mb-3 block text-sm font-medium text-black dark:text-white">
                    Description
                  </label>
                  <textarea
                    defaultValue={category?.description || ""}
                    rows={6}
                    name="description"
                    placeholder="Enter description"
                    className="w-full rounded border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                  ></textarea>
                </div>
              </div>

              <button
                type="submit"
                className={`flex w-full justify-center rounded bg-primary p-3 font-medium text-gray hover:bg-opacity-90 ${
                  isLoading ? "bg-gray-400 cursor-not-allowed" : ""
                }`}
              >
                {isLoading ? "Loading..." : "Submit"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
