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
      createdAt: body.createdAt,
      updatedAt: body.updatedAt,
      items: {
        create: body.items.map((item) => ({
          cartId: body.id,
          itemId: item.itemId,
          quantity: item.quantity,
        })),
      },
    },
    update: {
      updatedAt: body.updatedAt,
      items: {
        deleteMany: {}, // delete all existing items
        create: body.items.map((item) => ({
          cartId: body.id,
          itemId: item.itemId,
          quantity: item.quantity,
        })),
      }
    }
  });
}

export const cartController = {
  getCart,
  updateCart,
}