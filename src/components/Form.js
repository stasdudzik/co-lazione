import React from "react";

const Form = ({ ...props }) => {
  return (
    <section className="add-item">
      <form onSubmit={this.handleSubmit}>
        <input
          type="text"
          name="username"
          placeholder="What's your name?"
          defaultValue={this.state.user.displayName || this.state.user.email}
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
  );
};

export default Form;
