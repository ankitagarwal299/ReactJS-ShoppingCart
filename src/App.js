import React, { useState, useEffect } from "react";
import ITEMS from "./data.js";

export default function App() {
  const [shoppingCart, setShoppingCart] = useState({});
  const [total, setTotal] = useState(0);

  useEffect(() => {
    const cartAsArray = Object.values(shoppingCart);
    let newTotal = 0;

    function calculateTotal() {
      cartAsArray.forEach((item) => {
        newTotal += item.price * item.quantity;
      });
    }

    calculateTotal();
    setTotal(newTotal);
  }, [shoppingCart]);

  function addItem(item) {
    const nextShoppingCart = { ...shoppingCart };
    const existing = nextShoppingCart[item.id];
    if (existing) {
      existing.quantity += 1;
    } else {
      nextShoppingCart[item.id] = { ...item, quantity: 1 };
    }
    setShoppingCart(nextShoppingCart);
  }

  function remove(item) {
    const nextShoppingCart = { ...shoppingCart };
    delete nextShoppingCart[item.id];
    setShoppingCart(nextShoppingCart);
  }

  return (
    <div>
      <div>
        <h1>Simple Produce Store</h1>
        <ProduceList addItem={addItem} />
      </div>
      <div>
        <h3>Shopping Cart:</h3>
        <ShoppingCart
          shoppingCart={shoppingCart}
          total={total}
          remove={remove}
        />
      </div>
    </div>
  );
}

// Components
// <ProduceList>
function ProduceList({ addItem }) {
  return (
    <>
      {ITEMS.map((produce, index) => (
        <Produce produce={produce} key={index} addItem={addItem} />
      ))}
    </>
  );
}
// <ShoppingCart> <= list items and display total
function ShoppingCart({ shoppingCart, total, remove }) {
  const cartAsArray = Object.values(shoppingCart);

  return (
    <>
      {cartAsArray.map((cartItem, index) => (
        <ItemInCart key={index} produce={cartItem} remove={remove} />
      ))}
      Total: ${total}
    </>
  );
}
// <Produce>
// <ItemInCart> <= total for produce
// <Buttons> <= add and remove

// State
// app.js => total price, quantity of each product

// Model/initial state
// hashmap <= constant lookup and update
// unique

function Produce({ produce, addItem }) {
  return (
    <div>
      {produce.title} ${produce.price}{" "}
      <button onClick={() => addItem(produce)}>+</button>
    </div>
  );
}

function ItemInCart({ produce, remove }) {
  // title $ price x quantity = $ price*quantity
  const { title, price, quantity } = produce;
  return (
    <div>
      {/* <span>Lime</span> <span> $0.50</span> <span> x </span> <span> 2 </span>  */}
      {title} ${price} x {quantity} = ${price * quantity}{" "}
      <button onClick={() => remove(produce)}>x</button>
    </div>
  );
}
