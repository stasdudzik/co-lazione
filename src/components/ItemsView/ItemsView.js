import React from "react";
// import Item from "./Item";

const ItemsView = ({ ...props }) => {
  return (
    <section className="display-item">
      <div className="wrapper">
        <ul>
          {props.items.map((item) => {
            return (
              <li key={item.id}>
                <h3>{item.user}</h3>
                <p>
                  {item.title}
                  {item.user === props.displayName ||
                  item.user === props.email ? (
                    <button onClick={() => props.removeItemButton(item.id)}>
                      Remove Item
                    </button>
                  ) : null}
                </p>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
};

export default ItemsView;
