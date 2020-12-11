import React from "react";

const Form = ({ ...props }) => {
  return (
    <section className="add-item">
      <form onSubmit={props.handleSubmit}>
        <input
          type="text"
          name="username"
          placeholder="What's your name?"
          defaultValue={props.defaultValue}
        />
        <input
          type="text"
          name="newItem"
          placeholder="What are you bringing?"
          onChange={props.handleChange}
          value={props.valueItem}
        />
        <button>Add Item</button>
      </form>
    </section>
  );
};

export default Form;
