-- CreateTable
CREATE TABLE "items" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "price" INTEGER NOT NULL,
    "imageUrl" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "carts" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);

-- CreateTable
CREATE TABLE "cart_items" (
    "cartId" INTEGER NOT NULL,
    "itemId" INTEGER NOT NULL,
    "quantity" INTEGER NOT NULL,

    PRIMARY KEY ("cartId", "itemId"),
    CONSTRAINT "cart_items_cartId_fkey" FOREIGN KEY ("cartId") REFERENCES "carts" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "cart_items_itemId_fkey" FOREIGN KEY ("itemId") REFERENCES "items" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "orders" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- CreateTable
CREATE TABLE "order_items" (
    "orderId" INTEGER NOT NULL,
    "itemId" INTEGER NOT NULL,
    "quantity" INTEGER NOT NULL,

    PRIMARY KEY ("orderId", "itemId"),
    CONSTRAINT "order_items_orderId_fkey" FOREIGN KEY ("orderId") REFERENCES "orders" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "order_items_itemId_fkey" FOREIGN KEY ("itemId") REFERENCES "items" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
