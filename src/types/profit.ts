import { Product } from "@prisma/client";

import { OrderItems } from "@prisma/client";

export type Profits = {
  day: string;
  orders: {
    items: (OrderItems & {
      product: Product;
    })[];
  }[];
};
