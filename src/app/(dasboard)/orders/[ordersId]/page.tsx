import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import prisma from "@/lib/prisma";
import { notFound } from "next/navigation";
import dayjs from "dayjs";
import Link from "next/link";

type Props = {
  params: {
    ordersId: string;
  };
};

export default async function OrderDetailPage({ params }: Props) {
  const order = await prisma.order.findUnique({
    where: {
      id: Number(params.ordersId),
    },
    include: {
      items: {
        include: {
          product: true,
          color: true,
        },
      },
      user: true,
    },
  });

  if (!order) {
    notFound();
  }

  // Calculate total
  const total = order.items.reduce((acc, item) => {
    return acc + item.product.price * item.quantity;
  }, 0);

  return (
    <div>
      <div className="mb-6">
        <Link
          href="/orders"
          className="mb-4 inline-flex items-center justify-center rounded-md border border-primary px-4 py-2 text-primary hover:bg-primary hover:text-white"
        >
          Back to Orders
        </Link>
        <Breadcrumb pageName="Order Details" />
      </div>

      <div className="grid grid-cols-1 gap-4">
        {/* Order Info */}
        <div className="rounded-sm border border-stroke bg-white p-6 shadow-default dark:border-strokedark dark:bg-boxdark">
          <h2 className="mb-4 text-xl font-semibold text-black dark:text-white">
            Order Information
          </h2>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="text-gray-500 dark:text-gray-400 text-sm">
                Order ID
              </p>
              <p className="font-medium text-black dark:text-white">
                #{order.id}
              </p>
            </div>
            <div>
              <p className="text-gray-500 dark:text-gray-400 text-sm">Date</p>
              <p className="font-medium text-black dark:text-white">
                {dayjs(order.createdAt).format("DD MMMM YYYY")}
              </p>
            </div>
            <div>
              <p className="text-gray-500 dark:text-gray-400 text-sm">Status</p>
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
            </div>
            <div>
              <p className="text-gray-500 dark:text-gray-400 text-sm">Total</p>
              <p className="font-medium text-black dark:text-white">
                ${total.toFixed(2)}
              </p>
            </div>
          </div>
        </div>

        {/* Customer Info */}
        <div className="rounded-sm border border-stroke bg-white p-6 shadow-default dark:border-strokedark dark:bg-boxdark">
          <h2 className="mb-4 text-xl font-semibold text-black dark:text-white">
            Customer Information
          </h2>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="text-gray-500 dark:text-gray-400 text-sm">Name</p>
              <p className="font-medium text-black dark:text-white">
                {order.user.name}
              </p>
            </div>
            <div>
              <p className="text-gray-500 dark:text-gray-400 text-sm">Email</p>
              <p className="font-medium text-black dark:text-white">
                {order.user.email}
              </p>
            </div>
            {order.address && (
              <div className="col-span-2">
                <p className="text-gray-500 dark:text-gray-400 text-sm">
                  Shipping Address
                </p>
                <p className="font-medium text-black dark:text-white">
                  {order.address}, {order.city}, {order.country},{" "}
                  {order.postalCode}
                </p>
              </div>
            )}
          </div>
        </div>

        {/* Order Items */}
        <div className="rounded-sm border border-stroke bg-white p-6 shadow-default dark:border-strokedark dark:bg-boxdark">
          <h2 className="mb-4 text-xl font-semibold text-black dark:text-white">
            Order Items
          </h2>

          <div className="overflow-x-auto">
            <table className="w-full table-auto">
              <thead>
                <tr className="bg-gray-2 text-left dark:bg-meta-4">
                  <th className="px-4 py-4 font-medium text-black dark:text-white">
                    Product
                  </th>
                  <th className="px-4 py-4 font-medium text-black dark:text-white">
                    Color
                  </th>
                  <th className="px-4 py-4 font-medium text-black dark:text-white">
                    Price
                  </th>
                  <th className="px-4 py-4 font-medium text-black dark:text-white">
                    Quantity
                  </th>
                  <th className="px-4 py-4 font-medium text-black dark:text-white">
                    Subtotal
                  </th>
                </tr>
              </thead>
              <tbody>
                {order.items.map((item, index) => (
                  <tr key={index}>
                    <td className="border-b border-[#eee] px-4 py-5 dark:border-strokedark">
                      <p className="text-black dark:text-white">
                        {item.product.name}
                      </p>
                    </td>
                    <td className="border-b border-[#eee] px-4 py-5 dark:border-strokedark">
                      <p className="text-black dark:text-white">
                        {item.color.color}
                      </p>
                    </td>
                    <td className="border-b border-[#eee] px-4 py-5 dark:border-strokedark">
                      <p className="text-black dark:text-white">
                        ${item.product.price}
                      </p>
                    </td>
                    <td className="border-b border-[#eee] px-4 py-5 dark:border-strokedark">
                      <p className="text-black dark:text-white">
                        {item.quantity}
                      </p>
                    </td>
                    <td className="border-b border-[#eee] px-4 py-5 dark:border-strokedark">
                      <p className="text-black dark:text-white">
                        ${(item.product.price * item.quantity).toFixed(2)}
                      </p>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
