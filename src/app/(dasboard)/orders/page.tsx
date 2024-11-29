import UpdateDeleteBtn from "@/app/_components/update-delete-btn";
import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import prisma from "@/lib/prisma";
import dayjs from "dayjs";
import Link from "next/link";

export default async function OrdersPage() {
  const orders = await prisma.order.findMany({
    include: {
      items: {
        include: {
          product: true,
        },
      },
      user: true,
    },
  });
  console.log(orders);
  return (
    <div>
      <Breadcrumb pageName="Orders" />
      {/* order table */}
      {/* <div className="flex justify-end">
        <Link
          href="/categories/create "
          className="btn btn-primary m-2 rounded-lg bg-green-600  px-7 py-3 text-white transition-all duration-300 ease-in-out hover:bg-green-900"
        >
          add Order
        </Link>
      </div> */}
      <div className="rounded-sm border border-stroke bg-white px-5 pb-2.5 pt-6 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:pb-1">
        <div className="max-w-full overflow-x-auto">
          <table className="w-full table-auto">
            <thead>
              <tr className="bg-gray-2 text-left dark:bg-meta-4">
                <th className="min-w-[100px] px-4 py-4 font-medium text-black dark:text-white xl:pl-11">
                  ID
                </th>
                <th className="min-w-[200px] px-4 py-4 font-medium text-black dark:text-white">
                  Customer
                </th>
                <th className="min-w-[150px] px-4 py-4 font-medium text-black dark:text-white">
                  Created At
                </th>
                <th className="min-w-[150px] px-4 py-4 font-medium text-black dark:text-white">
                  Status
                </th>
                <th className="px-4 py-4 font-medium text-black dark:text-white">
                  Products
                </th>
                <th className="px-4 py-4 font-medium text-black dark:text-white">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              {orders.map((order, key) => (
                <tr key={key}>
                  {/* ID */}
                  <td className="border-b border-[#eee] px-4 py-5 pl-9 dark:border-strokedark xl:pl-11">
                    <h5 className="font-medium text-black dark:text-white">
                      {order.id}
                    </h5>
                  </td>
                  {/* Customer */}
                  <td className="border-b border-[#eee] px-4 py-5 dark:border-strokedark">
                    <p className="text-black dark:text-white">
                      {order.user.name}
                    </p>
                    <p className="text-gray-500 dark:text-gray-400 text-sm">
                      {order.user.email}
                    </p>
                  </td>
                  {/* created at */}
                  <td className="border-b border-[#eee] px-4 py-5 dark:border-strokedark">
                    <p className="text-black dark:text-white">
                      {dayjs(order.createdAt).format("DD MMMM YYYY")}
                    </p>
                  </td>
                  {/* status */}
                  <td className="border-b border-[#eee] px-4 py-5 dark:border-strokedark">
                    <span
                      className={`inline-block rounded px-2.5 py-0.5 text-sm font-medium ${
                        order.status === "PENDING"
                          ? "bg-yellow-50 text-yellow-600"
                          : order.status === "SENDING"
                            ? "bg-blue-50 text-blue-600"
                            : "bg-red-50 text-red-600"
                      }`}
                    >
                      {order.status.toLowerCase()}
                    </span>
                  </td>
                  {/* products */}
                  <td className="border-b border-[#eee] px-4 py-5 dark:border-strokedark">
                    <div className="flex flex-col gap-1">
                      {order.items.map((item, index) => (
                        <div
                          key={index}
                          className="text-sm text-black dark:text-white"
                        >
                          {item.product.name} ({item.quantity}x)
                        </div>
                      ))}
                    </div>
                  </td>
                  {/* actions */}
                  <td className="border-b border-[#eee] px-4 py-5 dark:border-strokedark">
                    <Link
                      href={`/orders/${order.id}`}
                      className="inline-flex items-center justify-center rounded-md border border-primary px-4 py-2 text-primary hover:bg-primary hover:text-white"
                    >
                      View Details
                    </Link>
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
