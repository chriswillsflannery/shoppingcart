import { Prisma } from "@prisma/client";
import { prisma } from '../../prismaPlugin';
import { Order } from '../../domain/entities/order';

const createOrder = async (data: Prisma.OrderCreateInput): Promise<Order> => {
  const createdOrder = await prisma.order.create({ data: { ...data }});

  const completeOrder = await prisma.order.findUnique({
    where: { id: createdOrder.id },
    include: { items: true },
  });

  return completeOrder as Order;
}

const getOrders = async (): Promise<Order[]> => {
  return prisma.order.findMany({
    include: { items: true },
  });
}

export const orderService = {
  createOrder,
  getOrders,
}