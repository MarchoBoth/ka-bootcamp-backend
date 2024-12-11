import ECommerce from "@/components/Dashboard/E-commerce";
import prisma from "@/lib/prisma";

export default async function Home() {
  const categories = await prisma.category.findMany({
    include: {
      products: true,
    },
  });
  const products = await prisma.product.findMany({
    include: {
      items: {
        include: {
          color: true,
        },
      },
      colors: true,
      category: true,
    },
  });
  const orders = await prisma.order.count();
  const customers = await prisma.user.count({
    where: {
      roles: "CUSTOMER",
    },
  });
  return (
    <div>
      <ECommerce
        customers={customers}
        categories={categories}
        orders={orders}
        products={products}
      />
    </div>
  );
}
