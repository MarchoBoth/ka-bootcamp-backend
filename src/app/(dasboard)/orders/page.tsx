import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import prisma from "@/lib/prisma";

export default async function OrdersPage() {
  const orders = await prisma.order.findMany();
  include: {
    items: {
      incluse: {
        product: true;
      }
    }
  }
  console.log(orders);
  return (
    <div>
      <Breadcrumb pageName="Orders" />
    </div>
  );
}
