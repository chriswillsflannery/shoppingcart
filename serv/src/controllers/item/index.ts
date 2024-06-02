import { itemService } from "../../services/item";

const getAllItems = async () => {
  return itemService.getAllItems();
}

export const itemController = {
  getAllItems,
}