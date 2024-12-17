import { Link } from "react-router-dom";
import { AppDispatch, RootState } from "../store";
import { useDispatch, useSelector } from "react-redux";
import { decreaseQuantity, increaseQuantity, removeItem } from "../features/itemSlice";
import { Card, Empty, Typography } from "antd";
import shopLogo from "../assets/icons/shops.png";
// import { useState } from "react";

function Cart() {
  const addedItems = useSelector((store: RootState) => store.cart.cartContainerItems);
  const { totalAmount, totalPrice, overallPrice } = useSelector((store: RootState) => store.cart);
  const dispatch: AppDispatch = useDispatch();
//   const [price, setPrice] = useState<number>(0); 
//   const handlePrice = () => {
//     let priceVar = 0 ;
//     setPrice(priceVar = )
//   }
  // const {amount} = useSelector((store: RootState) => store.cart.cartContainerItems);
  //   console.log(addedItems);
  return addedItems.length > 0 ? (
    <div>
      <div className="cart-header">
        <Link to={"/"}>
            <img src={shopLogo} alt="Market Logo"/>
        </Link>
        <h1>Cart</h1>
      </div>
      <p className="item-name">Cart Items: {totalAmount}</p>
      <p className="item-name">Total Price: {totalPrice}</p>
      {/* <p>{overallPrice}</p> */}
      {addedItems.map((item) => (
        <Card key={item.id}  hoverable>
          <Card.Meta
            // className="item-container"
            title={item.name}
            description={
              <div className="cart-container">
                <div className="item">
                  <p className="item-amount">Amount: {item.amount}</p>
                  <p className="item-amount">Price: {item.price} $</p>
                </div>
                <div className="item-action-btns">
                  <button
                    className="item-action-btn"
                    onClick={() => dispatch(increaseQuantity(item.id))}
                  >
                    +
                  </button>
                  <button
                    className="item-action-btn"
                    onClick={() => dispatch(decreaseQuantity(item.id))}
                  >
                    -
                  </button>
                </div>
                <button className="item-action-btn" onClick={() => dispatch(removeItem(item.id))}>
                  X
                </button>
              </div>
            }
          />
        </Card>
      ))}
    </div>
  ) : (
    <div>
      <Empty
        description={
          <Typography.Text>
            <span className="empty-text">You did not add items in the cart.</span>
          </Typography.Text>
        }
      />
      <Link to={"/"}>Continue Shopping</Link>
    </div>
  );
}

export default Cart;
