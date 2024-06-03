import { Cart } from '../../domain/entities/cart';
import { cartInput } from '../../domain/inputs/cart';
import { cartService } from '../../services/cart';

const getCart = async (cartId: number) => {
  return cartService.getCart(cartId);
}

const updateCart = async ({
  input: { body },
}: {
  input: cartInput.Update
}): Promise<Cart> => {
  return cartService.updateCart({
    where: { id: body.id },
    create: {
      id: body.id,
      createdAt: new Date(),
      updatedAt: new Date(),
      items: {
        create: body.items.map((item) => ({
          quantity: item.quantity,
          item: {
            connect: { id: item.itemId }
          }
        })),
      },
    },
    update: {
      updatedAt: new Date(),
      items: {
        deleteMany: {}, // delete all existing items
        create: body.items.map((item) => ({
          quantity: item.quantity,
          item: {
            connect: { id: item.itemId }
          }
        })),
      }
    }
  });
}

export const cartController = {
  getCart,
  updateCart,
}