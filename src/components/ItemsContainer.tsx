import React, { useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState, store } from "../store";
import { Link } from "react-router-dom";
import { addToCart } from "../features/itemSlice";
import { Badge, Card, Modal, notification, NotificationArgsProps } from "antd";
import shoppingCart from "../assets/icons/shopping-cart.png";

function ItemsContainer() {
  const overallItems = useSelector((store: RootState) => store.cart);
  const { totalAmount } = useSelector((store: RootState) => store.cart);
  const dispatch: AppDispatch = useDispatch();

  const [isLoading, setIsLoading] = useState<boolean>(true);

    useEffect(() => {
      const timeout = setTimeout(() => {
        setIsLoading(false);
      }, 1000);
      return () => clearTimeout(timeout);
    }, []);

  const [selectedItem, setSelectedItem] = useState<{ id: number; name: string } | null>(null);
  const showModal = (item: { id: number; name: string }) => {
    setSelectedItem(item);
  };
  const handleOk = () => {
    setSelectedItem(null);
  };
  const handleCancel = () => {
    setSelectedItem(null);
  };

  type NotificationPlacement = NotificationArgsProps["placement"];
  const Context = React.createContext({ name: "Default" });
  const [api, contextHolder] = notification.useNotification();
  //   const openNotification = (placement: NotificationPlacement) => {
  //     api.info({
  //       message: `Notification Cart`,
  //       description: (
  //         <Context.Consumer>
  //           {(overallItems.cartContainerItems.map((name) => {<span>`The ${name.name} has been added to the cart!`</span>}))}
  //         {/* //   => `The ${} has been added to the cart!`} */}
  //         </Context.Consumer>
  //       ),
  //       placement,
  //     });
  //   };
  const openNotification = (item: { name: string }, placement: NotificationPlacement) => {
    api.info({
      message: `Item Added to Cart`,
      description: (
        <div>
          The <span style={{ fontWeight: "700" }}>{item.name}</span> has been added to the cart!
        </div>
      ),
      placement,
    });
  };
  const contextValue = useMemo(() => ({ name: "item" }), []);

  return (
    <div>
      <div className="items-header">
        <h1>Items Container</h1>
        <Badge count={totalAmount}>
          <Link to={"/cart"}>
            <img className="cart-img" src={shoppingCart} alt="Cart" />
          </Link>
        </Badge>
      </div>
      {overallItems.items.map((item) => (
        <Card
          key={item.id}
          loading={isLoading}
          hoverable
          extra={<a onClick={() => showModal(item)}>About the product</a>}
        >
          <Card.Meta title={item.name} description={<p className="item-amount">{item.price} $</p>} />
          <Context.Provider value={contextValue}>
            {contextHolder}
            <button
              className="add-cart-btn"
              onClick={() => {
                openNotification(item, "topRight");
                dispatch(addToCart(item.id));
              }}
            >
              Add to Cart
            </button>
          </Context.Provider>
          {selectedItem && (
            <Modal
              title="Product Details"
              open={!!selectedItem}
              onOk={handleOk}
              onCancel={handleCancel}
            >
              <p>Title: {selectedItem.name}</p>
              <p>Description: {selectedItem.name}</p>
            </Modal>
          )}
        </Card>
      ))}
    </div>
  );
}

export default ItemsContainer;
