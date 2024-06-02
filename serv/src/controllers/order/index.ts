import { Order } from '../../domain/entities/order';
import { OrderInput } from '../../domain/inputs/order';
import { orderService } from '../../services/order';

const createOrder = async ({
  input: { body },
}: {
  input: OrderInput.Create
}): Promise<Order> => {
  return orderService.createOrder({
    items: {
      create: body.items.map((item) => ({
        cartId: body.id,
        itemId: item.itemId,
        quantity: item.quantity,
      }))
    }
  });
};

const getOrders = async () => {
  return orderService.getOrders();
}

export const orderController = {
  createOrder,
  getOrders,
}