import { useState } from 'react';
import { MyModal} from './MyModal';
import './Portal.css';
import { trpc } from '../utils/trpc';
import { convertPrice } from './utils/convertPrice';
import { Item } from '../../serv/src/domain/entities/item';
import { ShoppingCartIcon } from './ShoppingCart';
import { Cart } from './Cart';

export const Portal = () => {
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [animate, setAnimate] = useState(false);

  const { data: items, isLoading: isLoadingItems } = trpc.items.getAllItems.useQuery();
  const { data: cart, refetch: refetchCart, isLoading: isLoadingCart } = trpc.cart.getCart.useQuery(0);
  const cartUpdater = trpc.cart.updateCart.useMutation({
    onSuccess: () => {
      refetchCart();
    }
  })
  const orderUpdater = trpc.order.createOrder.useMutation({
    onSuccess: () => {
      refetchCart();
    }
  })

  const cartItemsQuantity = (cart?.items.reduce((acc, item) => {
    acc += item.quantity
    return acc;
  }, 0)); 

  const closeModal = () => {
    setModalIsOpen(false);
  }

  const handleShowCartContents = () => {
    setModalIsOpen(true);
  }

  const handleUpdateCartQuantity = (item: Item, quantity: number) => {
    setAnimate(true);
    setTimeout(() => {
      setAnimate(false);
    }, 500);

    try {
      const currentCartItems = cart?.items;
      let updatedItems = currentCartItems === undefined ? [] : [...currentCartItems];

      // check if item already exists in cart
      const existingItemIndex = updatedItems.findIndex(cartItem => cartItem.itemId === item.id);
      if (existingItemIndex !== -1) {
        //  remove if going to 0
        if (updatedItems[existingItemIndex].quantity === 1 && quantity === -1) {
          updatedItems = updatedItems.filter((el) => el.itemId !== item.id);
        } else {
          // update quantity
          updatedItems[existingItemIndex].quantity += quantity;
        }
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

  const handleCheckout = () => {
    try {
      orderUpdater.mutate({
        body: {
          items: cart?.items || []
        }
      })
      // maybe the hook should handle this in the BE
      cartUpdater.mutate({
        id: 0,
        items: [],
      })
    } catch (err) {
      console.log('err', err);
    }
  }

  // TODO improvement - add loading skeleton so we don't get layout shift
  if (isLoadingItems || isLoadingCart) {
    return <></>;
  }

  return (
    <main className="portal">
      <header>
        <h1>Treat Yo Self</h1>
        <button className={`cartButton ${animate ? 'animate' : ''}`} onClick={() => handleShowCartContents()}>
          {!!cart?.items.length && (
            <div className='cartIconQuantity'>{cartItemsQuantity}</div>
          )}
          <ShoppingCartIcon color="white" />
        </button>
      </header>

      <section className="items">
        {items?.map((item) => (
          <div className="item" onClick={() => handleUpdateCartQuantity(item, 1)} key={item.id}>
            <img src={item.imageUrl} />
            <h3>{item.name}</h3>
            <h5>{item.description}</h5>
            <h2>{`$${convertPrice(item.price)}`}</h2>
            <button>Add to Cart</button>
          </div>
        ))}
      </section>

      <MyModal 
        modalIsOpen={modalIsOpen}
        closeModal={closeModal}
      >
        {/* note I think this type mismatch is due to SQLite not supporting "Date" type? */}
        <Cart
          cart={cart}
          items={items}
          handleUpdateCartQuantity={handleUpdateCartQuantity}
          handleCheckout={handleCheckout}
        />
      </MyModal>
    </main>
  )
}