import { FC } from "react";
import { convertPrice } from "./utils/convertPrice";
import { type Cart as CartType } from "../../serv/src/domain/entities/cart";
import { type Item as ItemType } from "../../serv/src/domain/entities/item";

type CartProps = {
  cart: CartType | null | undefined,
  items: ItemType[] | undefined,
  handleUpdateCartQuantity: (arg1: ItemType, arg2: number) => void;
  handleCheckout: () => void;
}

export const Cart: FC<CartProps> = ({
  cart,
  items,
  handleUpdateCartQuantity,
  handleCheckout,
}) => {
  // some of this should happen in the data hook so "loading" state can be used more appropriately
  const { usableItems, cartTotal } = (() => {
    const usableItems: Record<ItemType['id'], ItemType> = {};
    let cartTotal = 0;

    cart?.items.forEach((cartItem) => {
      const item = items?.find((i) => i.id === cartItem.itemId);
      if (item) {
        usableItems[item.id] = item;
        const totalForItem = item.price * cartItem.quantity;
        cartTotal += totalForItem;
      }
    })
    return { usableItems, cartTotal };
  })();

  return (
    <>
      <h2>Cart</h2>
      {cart?.items.map((cartItem) => {
        const item = usableItems[cartItem.itemId];
        return (
          <div className="cartGridRow" key={cartItem.itemId}>
            <div className="cartGridRow-item">
              <h3>{item?.name}</h3>
              <div className="cartGridRow-itemQuantity">
                <button onClick={() => handleUpdateCartQuantity(item, -1)}>{` - `}</button>
                <h4>{cartItem.quantity}</h4>
                <button onClick={() => handleUpdateCartQuantity(item, 1)}>{` + `}</button>
              </div>
            </div>
            <div className='cartGridRow-quantity'>
              <h3>{`$${convertPrice(cartItem.quantity * item.price)}`}</h3>
            </div>
          </div>
        )
      })}
      <div className="cartGridTotals">
        <h3>Total</h3>
        <h3>{`$${convertPrice(cartTotal)}`}</h3>
      </div>
      {!!cart?.items.length && (
        <div className="checkoutSection">
          <button className="checkoutButton" onClick={handleCheckout}>Check Out</button>
        </div>
      )}
    </>
  );
}