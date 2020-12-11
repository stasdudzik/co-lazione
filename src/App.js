import React from "react";
import "./App.css";
import firebase, { auth, provider } from "./firebase.js";
import Login from "./components/Login";
import Header from "./components/Header";
import UserProfile from "./components/UserProfile";

class App extends React.Component {
  state = {
    newItem: "",
    username: "",
    items: [],
    user: null,
  };

  componentDidMount() {
    document.title = "🍽️Let's eat";
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
        {this.state.user ? (
          <>
            <Header
              user={this.state.user}
              logOut={() => this.logOut()}
              logIn={() => this.logIn()}
            />
            <UserProfile
              src={this.state.user.photoURL}
              alt={this.state.user.displayName || this.state.user.email}
            />
            <div>
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
                    <input
                      type="url"
                      name="link"
                      placeholder="Add picture link"
                      onChange={this.handleChange}
                      value={this.state.newItem}
                    />
                    <input
                      type="url"
                      name="recipeLink"
                      placeholder="Add recipe link"
                      onChange={this.handleChange}
                      value={this.state.newItem}
                    />
                    <textarea
                      type="text"
                      name="newItem"
                      placeholder="What are you bringing?"
                      onChange={this.handleChange}
                      value={this.state.newItem}
                    />
                    <select name="" id="" form="">
                      <option value="appetizer">appetizer</option>
                      <option value="beverage">beverage</option>
                      <option value="booze">booze</option>
                      <option value="dessert">dessert</option>
                      <option value="main">main</option>
                      <option value="other">other</option>
                      <option value="salad">salad</option>
                    </select>
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
                                <button
                                  onClick={() => this.removeItem(item.id)}
                                >
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
          </>
        ) : (
          <Login onClick={() => this.logIn()} />
        )}
      </div>
    );
  }
}
export default App;
