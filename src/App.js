import React from "react";
import "./App.css";
import firebase, { auth, provider } from "./firebase.js";

class App extends React.Component {
  state = {
    newItem: "",
    username: "",
    items: [],
    user: null,
  };

  componentDidMount() {
    auth.onAuthStateChanged((user) => {
      if (user) {
        this.setState({ user });
      }
    });

    const itemsRef = firebase.database().ref("items");
    itemsRef.on("value", (snapshot) => {
      let items = snapshot.val();
      let newState = [];
      for (let item in items) {
        newState.push({
          id: item,
          title: items[item].title,
          user: items[item].user,
        });
      }
      this.setState({
        items: newState,
      });
    });
  }

  handleChange = (event) => {
    this.setState({
      [event.target.name]: [event.target.value],
    });
  };

  handleSubmit = (event) => {
    event.preventDefault();
    const itemsRef = firebase.database().ref("items");
    const item = {
      title: this.state.newItem,
      user: this.state.user.displayName || this.state.user.email,
    };
    itemsRef.push(item);
    this.setState({
      newItem: "",
      username: "",
    });
  };

  removeItem(itemId) {
    const itemRef = firebase.database().ref(`/items/${itemId}`);
    itemRef.remove();
  }

  logIn() {
    console.log("Running login func");
    auth.signInWithPopup(provider).then((result) => {
      const user = result.user;
      this.setState({
        user,
      });
    });
  }

  logOut() {
    auth.signOut().then(() => {
      this.setState({
        user: null,
      });
    });
  }

  render() {
    return (
      <div className="app">
        <header>
          <div className="wrapper">
            <h1>COlazione</h1>
            {this.state.user ? (
              <button onClick={() => this.logOut()}>Log Out</button>
            ) : (
              <button onClick={() => this.logIn()}>Log In</button>
            )}
          </div>
        </header>
        {this.state.user ? (
          <div>
            <div className="user-profile">
              <img
                src={this.state.user.photoURL}
                alt={this.state.user.displayName || this.state.user.email}
              />
            </div>
            <div className="container">
              <section className="add-item">
                <form onSubmit={this.handleSubmit}>
                  <input
                    type="text"
                    name="username"
                    placeholder="What's your name?"
                    defaultValue={
                      this.state.user.displayName || this.state.user.email
                    }
                  />
                  <input
                    type="text"
                    name="newItem"
                    placeholder="What are you bringing?"
                    onChange={this.handleChange}
                    value={this.state.newItem}
                  />
                  <button>Add Item</button>
                </form>
              </section>
              <section className="display-item">
                <div className="wrapper">
                  <ul>
                    {this.state.items.map((item) => {
                      return (
                        <li key={item.id}>
                          <h3>{item.user}</h3>
                          <p>
                            {item.title}
                            {item.user === this.state.user.displayName ||
                            item.user === this.state.user.email ? (
                              <button onClick={() => this.removeItem(item.id)}>
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
            </div>
          </div>
        ) : (
          <div className="wrapper">
            <p>Log in to see the guest list and add your recipes!</p>
          </div>
        )}
      </div>
    );
  }
}
export default App;
