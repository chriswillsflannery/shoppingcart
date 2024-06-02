import { t } from '../../trpcInit';
import { itemController } from '../../controllers/item';

export const itemsRouter = t.router({
  getAllItems: t.procedure
    .query(() => itemController.getAllItems()),
})