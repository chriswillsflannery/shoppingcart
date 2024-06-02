import { Prisma } from "@prisma/client";
import { prisma } from '../../prismaPlugin';
import { Cart } from '../../domain/entities/cart';

const updateCart = async (data: Prisma.CartUpsertArgs): Promise<Cart> => {
  const upsertedCart = await prisma.cart.upsert(data);

  const completeCart = await prisma.cart.findUnique({
    where: { id: upsertedCart.id },
    include: { items: true }
  });

  return completeCart as Cart;
}

const getCart = async (cartId: number): Promise<Cart | null> => {
  const foundCart = await prisma.cart.findUnique({
    where: {
      id: cartId,
    },
    include: { items: true },
  });

  return foundCart as Cart;
}

export const cartService = {
  updateCart,
  getCart,
}