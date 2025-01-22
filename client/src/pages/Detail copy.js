import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { useQuery } from '@apollo/client';
import { useSelector, useDispatch } from 'react-redux'; // Replaced Context API hooks with Redux hooks

import Cart from '../components/Cart';
import {
  REMOVE_FROM_CART,
  UPDATE_CART_QUANTITY,
  ADD_TO_CART,
  UPDATE_PRODUCTS,
} from '../utils/actions';
import { QUERY_PRODUCTS } from '../utils/queries';
import { idbPromise } from '../utils/helpers';
import spinner from '../assets/spinner.gif';

function Detail() {
  // Switched from useStoreContext to Redux's useDispatch for dispatching actions
  // const [state, dispatch] = useStoreContext();
  const dispatch = useDispatch();

  // Replaced Context API's global state access with Redux's useSelector for state slices
  // const { products, cart } = state;
  const products = useSelector((state) => state.products);
  const cart = useSelector((state) => state.cart);

  const { id } = useParams();

  const [currentProduct, setCurrentProduct] = useState({});

  const { loading, data } = useQuery(QUERY_PRODUCTS);

  useEffect(() => {
    // Updated to use Redux state (products) instead of Context API's state
    // if (products.length) {
    //   setCurrentProduct(products.find((product) => product._id === id));
    // }
    if (products.length) {
      setCurrentProduct(products.find((product) => product._id === id));
    }

    // Updated to dispatch Redux actions instead of Context API actions
    // else if (data) {
    //   dispatch({
    //     type: UPDATE_PRODUCTS,
    //     products: data.products,
    //   });
    //   data.products.forEach((product) => {
    //     idbPromise('products', 'put', product);
    //   });
    // }
    else if (data) {
      dispatch({
        type: UPDATE_PRODUCTS,
        products: data.products,
      });
      data.products.forEach((product) => {
        idbPromise('products', 'put', product);
      });
    }

    // Updated to dispatch Redux actions instead of Context API actions for IndexedDB cache
    // else if (!loading) {
    //   idbPromise('products', 'get').then((indexedProducts) => {
    //     dispatch({
    //       type: UPDATE_PRODUCTS,
    //       products: indexedProducts,
    //     });
    //   });
    // }
    else if (!loading) {
      idbPromise('products', 'get').then((indexedProducts) => {
        dispatch({
          type: UPDATE_PRODUCTS,
          products: indexedProducts,
        });
      });
    }
  }, [products, data, loading, dispatch, id]);

  const addToCart = () => {
    // Updated to use Redux actions for adding/updating items in the cart
    // const itemInCart = cart.find((cartItem) => cartItem._id === id);
    // if (itemInCart) {
    //   dispatch({
    //     type: UPDATE_CART_QUANTITY,
    //     _id: id,
    //     purchaseQuantity: parseInt(itemInCart.purchaseQuantity) + 1,
    //   });
    //   idbPromise('cart', 'put', {
    //     ...itemInCart,
    //     purchaseQuantity: parseInt(itemInCart.purchaseQuantity) + 1,
    //   });
    // } else {
    //   dispatch({
    //     type: ADD_TO_CART,
    //     product: { ...currentProduct, purchaseQuantity: 1 },
    //   });
    //   idbPromise('cart', 'put', { ...currentProduct, purchaseQuantity: 1 });
    // }
    const itemInCart = cart.find((cartItem) => cartItem._id === id);
    if (itemInCart) {
      dispatch({
        type: UPDATE_CART_QUANTITY,
        _id: id,
        purchaseQuantity: parseInt(itemInCart.purchaseQuantity) + 1,
      });
      idbPromise('cart', 'put', {
        ...itemInCart,
        purchaseQuantity: parseInt(itemInCart.purchaseQuantity) + 1,
      });
    } else {
      dispatch({
        type: ADD_TO_CART,
        product: { ...currentProduct, purchaseQuantity: 1 },
      });
      idbPromise('cart', 'put', { ...currentProduct, purchaseQuantity: 1 });
    }
  };

  const removeFromCart = () => {
    // Updated to use Redux actions for removing items from the cart
    // dispatch({
    //   type: REMOVE_FROM_CART,
    //   _id: currentProduct._id,
    // });
    dispatch({
      type: REMOVE_FROM_CART,
      _id: currentProduct._id,
    });

    // IndexedDB logic remains unchanged
    idbPromise('cart', 'delete', { ...currentProduct });
  };

  return (
    <>
      {currentProduct && cart ? (
        <div className="container my-1">
          <Link to="/">← Back to Products</Link>

          <h2>{currentProduct.name}</h2>

          <p>{currentProduct.description}</p>

          <p>
            <strong>Price:</strong>${currentProduct.price}{' '}
            <button onClick={addToCart}>Add to Cart</button>
            <button
              disabled={!cart.find((p) => p._id === currentProduct._id)}
              onClick={removeFromCart}
            >
              Remove from Cart
            </button>
          </p>

          <img
            src={`/images/${currentProduct.image}`}
            alt={currentProduct.name}
          />
        </div>
      ) : null}
      {loading ? <img src={spinner} alt="loading" /> : null}
      <Cart />
    </>
  );
}

export default Detail;
