import { prisma } from '../../prismaPlugin';
import { Item } from "../../domain/entities/item";

const getAllItems = async (): Promise<Item[]> => {
  return prisma.item.findMany();
}

export const itemService = {
  getAllItems,
}