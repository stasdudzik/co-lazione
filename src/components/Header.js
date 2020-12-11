import React from "react";

const Header = ({ ...props }) => {
  return (
    <header>
      <div className="wrapper">
        <h1>🍽️ Let's eat 🍽️</h1>
        {props.user ? (
          <button onClick={props.logOut}>Log Out</button>
        ) : (
          <button onClick={props.logIn}>Log In</button>
        )}
      </div>
    </header>
  );
};

export default Header;
