import { useState } from 'react';
import { MyModal} from './MyModal';
import './Portal.css';
import { trpc } from '../utils/trpc';
import { convertPrice } from './utils/convertPrice';
import { Item } from '../../serv/src/domain/entities/item';
import { ShoppingCartIcon } from './ShoppingCart';

export const Portal = () => {
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [displayedItem, setDisplayedItem] = useState<Item | undefined>(undefined);

  const { data: items, isLoading: isLoadingItems } = trpc.items.getAllItems.useQuery();
  const { data: cart, refetch: refetchCart } = trpc.cart.getCart.useQuery(0);
  const cartUpdater = trpc.cart.updateCart.useMutation({
    onSuccess: () => {
      refetchCart();
    }
  })

  const closeModal = () => {
    setModalIsOpen(false);
  }

  const handleShowItemDetails = (item: Item) => {
    console.log('clicked item', item);
    setDisplayedItem(item);
    setModalIsOpen(true);
  }

  const handleShowCartContents = () => {
    setModalIsOpen(true);
  }

  const handleAddToCart = (item: Item, quantity: number) => {
    try {
      const currentCartItems = cart?.items;
      const updatedItems = currentCartItems === undefined ? [] : [...currentCartItems];

      // check if item already exists in cart
      const existingItemIndex = updatedItems.findIndex(cartItem => cartItem.itemId === item.id);
      console.log('existingiteminde', existingItemIndex);
      if (existingItemIndex !== -1) {
        updatedItems[existingItemIndex].quantity += quantity;
      } else {
        updatedItems.push({
          cartId: 0,
          itemId: item.id,
          quantity: quantity,
        });
      }

      cartUpdater.mutate({
        id: 0,
        items: updatedItems,
      })
    } catch (err) {
      console.log('err', err);
    }
  }

  const ItemsSkeleton = () => <div>loading</div>;

  return (
    <main className="portal">
      <header>
        <h1>Treat Yo Self</h1>
        <button onClick={() => handleShowCartContents()}>
          {cart?.items.length && (
            <div className='cartIconQuantity'>{cart.items.length}</div>
          )}
          <ShoppingCartIcon color="white" />
        </button>
      </header>

      {isLoadingItems ? <ItemsSkeleton /> : (
        <section className="items">
          {items?.map((item) => (
            <div className="item" onClick={() => handleShowItemDetails(item)} key={item.id}>
              <img src={item.imageUrl} />
              <h3>{item.name}</h3>
              <h2>{`$${convertPrice(item.price)}`}</h2>
            </div>
          ))}
        </section>
      )}

      <MyModal 
        modalIsOpen={modalIsOpen}
        closeModal={closeModal}
      >
        {displayedItem ? (
          <>
            <div>displayeditem</div>
            <button onClick={() => handleAddToCart(displayedItem, 1)}>add to cart</button>
          </>
        ) : (
          <div>cart</div>
        )}
      </MyModal>
    </main>
  )
}