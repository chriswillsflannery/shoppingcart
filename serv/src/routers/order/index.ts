import { t } from '../../trpcInit';
import { orderController } from '../../controllers/order';
import { orderInput } from '../../domain/inputs/order'

export const orderRouter = t.router({
  getOrders: t.procedure
    .query(() => orderController.getOrders()),
  createOrder: t.procedure
    .input(orderInput.createOrder)
    .mutation(({ input }) => orderController.createOrder({ input }))
});