import React, { Component } from "react";
import "./App.css";
import firebase from "./firebase.js";

class App extends Component {
  state = {
    currentItem: "",
    username: "",
    items: [],
  };
  componentDidMount() {
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
    console.log("Calling handle Submit");
    event.preventDefault();
    const itemsRef = firebase.database().ref("items");
    const item = {
      title: this.state.currentItem,
      user: this.state.username,
    };
    itemsRef.push(item);
    this.setState({
      currentItem: "",
      username: "",
    });
  };

  removeItem(itemId) {
    const itemRef = firebase.database().ref(`/items/${itemId}`);
    itemRef.remove();
  }

  render() {
    return (
      <div className="app">
        <header>
          <div className="wrapper">
            <h1>COlazione</h1>
          </div>
        </header>
        <div className="container">
          <section className="add-item">
            <form onSubmit={this.handleSubmit}>
              <input
                type="text"
                name="username"
                placeholder="Jak masz na imię?"
                value={this.state.username}
                onChange={this.handleChange}
              />
              <input
                type="text"
                name="currentItem"
                placeholder="Co przygotujesz?"
                value={this.state.currentItem}
                onChange={this.handleChange}
              />
              <button>Dodaj danie</button>
            </form>
          </section>
          <section className="display-item">
            <div className="wrapper">
              <ul>
                {this.state.items.map((item) => {
                  return (
                    <li key={item.id}>
                      <h3>{item.title}</h3>
                      <p>przygotuje {item.user}</p>
                      <button onClick={() => this.removeItem(item.id)}>
                        Usuń element
                      </button>
                    </li>
                  );
                })}
              </ul>
            </div>
          </section>
        </div>
      </div>
    );
  }
}
export default App;
