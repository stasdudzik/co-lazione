import React from "react";
import "./App.css";
import firebase, { auth, provider } from "./firebase.js";
import Login from "./components/Login";
import Header from "./components/Header";
import UserProfile from "./components/UserProfile";
import ItemsView from "./components/ItemsView/ItemsView";
import Form from "./components/Form";

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

            <div className="container">
              <Form
                handleSubmit={this.handleSubmit}
                defaultValue={
                  this.state.user.displayName || this.state.user.email
                }
                handleChange={this.handleChange}
                valueItem={this.state.newItem}
              />
              <ItemsView
                items={this.state.items}
                removeItemButton={this.removeItem}
                displayName={this.state.user.displayName}
                email={this.state.user.email}
              />
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
