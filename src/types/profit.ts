import { Product } from "@prisma/client";

import { OrderItems } from "@prisma/client";

export type Profit = {
  day: string;
  orders: {
    items: (OrderItems & {
      product: Product;
    })[];
  }[];
};
