import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
// this componet is for styling the border
const TodoComponent = (props) => {
  return (
    <div
      style={{
        width: "700px",
        marginLeft: "250px",
        marginBottom: "40px",
      }}
    >
      {props.children}
    </div>
  );
};

const API_URL =
  "https://gist.githubusercontent.com/benna100/391eee7a119b50bd2c5960ab51622532/raw";

function TodoList({ id, description, deadline, removeTodo }) {
  const [isDone, setIsDone] = useState(false);
  const [edit, setEdit] = useState(false);
  const [newDescription, setNewDescription] = useState(description);

  const updateTodo = () => {
    setEdit(!edit);
  };

  return (
    <>
      <TodoComponent>
        <div
          className="list-of-todos"
          style={
            isDone ? { textDecoration: "line-through" } : { textDecoration: "" }
          }
        >
          {edit ? (
            <input
              type="text"
              value={newDescription}
              onChange={(event) => {
                const value = event.target.value;
                setNewDescription(value);
              }}
            />
          ) : (
            newDescription
          )}{" "}
          | {deadline}
          <div className="buttons">
            <input type="checkbox" onClick={() => setIsDone(!isDone)} />
            <button className="delet-button" onClick={() => removeTodo(id)}>
              Delete
            </button>
            <button className="edit-button" onClick={updateTodo}>
              {edit ? "Update" : "Edit"}
            </button>
          </div>
        </div>
      </TodoComponent>
    </>
  );
}
//This component is for input elements
function RenderTodos() {
  const [description, setDescription] = useState("");
  const [deadline, setDeadline] = useState("");
  const [todos, setTodos] = useState([]);

  const minimumDate = () => {
    let today = new Date();
    let dd = today.getDate();
    let mm = today.getMonth() + 1; //January is 0!
    let yyyy = today.getFullYear();
    if (dd < 10) {
      dd = "0" + dd;
    }
    if (mm < 10) {
      mm = "0" + mm;
    }

    today = yyyy + "-" + mm + "-" + dd;
    return today;
  };

  // here iam fetching the data from api
  useEffect(() => {
    fetch(API_URL)
      .then((response) => response.json())
      .then((data) => {
        setTodos(data);
      });
  }, []);

  //Adding the todos
  const addTodos = (event) => {
    event.preventDefault();
    if (description !== "") {
      const newTodos = {
        id: todos.length + 1,
        description: description,
        deadline: deadline,
      };
      setDescription("");
      setDeadline("");
      setTodos([...todos, newTodos]);
    }
  };

  //delete Todos
  function removeTodo(id) {
    const nextTodos = todos.filter((todo) => todo.id !== id);
    console.log(nextTodos);
    setTodos(nextTodos);
  }

  return (
    <>
      <form onSubmit={addTodos} className="inputfields">
        <div className="input-data">
          <label htmlFor="tododescription">Todo Description</label>
          <input
            type="text"
            placeholder="description"
            value={description}
            onChange={(event) => {
              const value = event.target.value;
              setDescription(value);
            }}
          />
        </div>
        <div className="input-data">
          <label htmlFor="deadline">deadline</label>
          <input
            type="date"
            value={deadline}
            min={minimumDate()}
            onChange={(event) => {
              const value = event.target.value;
              setDeadline(value);
            }}
          />
        </div>
        <button type="submit" className="addbutton">
          AddTodo
        </button>
      </form>
      {todos.length ? (
        todos.map((todo) => (
          <TodoList
            key={todo.id}
            id={todo.id}
            description={todo.description}
            deadline={todo.deadline}
            removeTodo={removeTodo}
          />
        ))
      ) : (
        <h2 className="no-items">No Items</h2>
      )}
    </>
  );
}

TodoList.propTypes = {
  description: PropTypes.string,
  id: PropTypes.number,
  deadline: PropTypes.string,
  removeTodo: PropTypes.func,
};

export default RenderTodos;
