import React, { useEffect } from "react";
import { v4 as uuidv4 } from "uuid";
import "./App.css";
import Header from "./Header";
import Footer from "./Footer";
import About from "./About";
import { Timer } from "./Timer";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faEdit,
  faTrashAlt,
  faUpload,
} from "@fortawesome/free-solid-svg-icons";

function Todos() {
  const arrayOfTodos = [
    {
      id: uuidv4(),
      text: "Complete assignment",
      completed: true,
      completeBy: "2021-10-01 T 10:20",
    },
    {
      id: uuidv4(),
      text: "Buy the Vegetables",
      completed: false,
    },
    {
      id: uuidv4(),
      text: "Wash The Car",
      completed: false,
    },
  ];

  const [todos, setTodos] = React.useState(arrayOfTodos);
  const [upcomingTodos, setUpcomingTodos] = React.useState([]);

  useEffect(() => {
    const todosWithCompleteBy = todos.filter((todo) => todo.completeBy);
    setUpcomingTodos(todosWithCompleteBy);
  }, [todos]);

  //Add the Todos

  const addTodo = (text, completeBy, id, completed) => {
    let newTodo;
    if (text) {
      if (completeBy) {
        newTodo = { id: uuidv4(), text, completed: false, completeBy };
      } else {
        newTodo = { id: uuidv4(), text, completed: false };
      }

      return setTodos([newTodo, ...todos]);
    }
  };

  //delete Todo
  const onRemove = (id) => {
    const deleteTodo = todos.filter((todo) => todo.id !== id);
    setTodos(deleteTodo);
  };

  //Edit Todo
  const editTodo = (id, text) => {
    if (text) {
      const editTodo = todos.map((todo) => {
        if (todo.id === id) {
          todo.text = text;
        }
        return todo;
      });
      setTodos(editTodo);
    }
  };

  // onToggleComplete

  const onToggleComplete = (id) => {
    const toggle = todos.filter((todo) => {
      if (todo.id === id) {
        todo.completed = !todo.completed;
      }
      return todo;
    });

    setTodos(toggle);
  };

  return (
    <main>
      {/** Show your "Create todo" form here */}

      <div className="todos-container">
        <ul>
          {/** Ouput some todos here */}
          {upcomingTodos.length ? (
            <h2 className="upcoming-todos">Upcoming Todos</h2>
          ) : (
            ""
          )}
          {upcomingTodos &&
            upcomingTodos.map((todo) => {
              return (
                <Todo
                  key={todo.id}
                  id={todo.id}
                  text={todo.text}
                  completeBy={todo.completeBy}
                  completed={todo.completed}
                  onRemove={onRemove}
                  onToggleComplete={onToggleComplete}
                  editTodo={editTodo}
                />
              );
            })}
          {todos.length ? (
            <h2 className="todos-heading">Todos</h2>
          ) : (
            <h2 className="error-message">No Todos in List</h2>
          )}
          {todos &&
            todos
              .filter((todo) => !todo.completeBy)

              .map((todo) => {
                return (
                  <Todo
                    key={todo.id}
                    id={todo.id}
                    text={todo.text}
                    completeBy={todo.completeBy}
                    completed={todo.completed}
                    onRemove={onRemove}
                    onToggleComplete={onToggleComplete}
                    editTodo={editTodo}
                  />
                );
              })}
        </ul>
      </div>
      <CreateTodo addTodo={addTodo} />
    </main>
  );
}

function Todo({
  id,
  text,
  completeBy,
  completed,
  onRemove,
  onToggleComplete,
  editTodo,
}) {
  const [display, setDisplay] = React.useState(false);
  const [newText, setNewText] = React.useState(text);

  const editClick = () => {
    setDisplay(!display);
    return editTodo(id, newText);
  };

  return (
    <>
      <li className="todo">
        <div className="todo-text">
          <input
            type="checkbox"
            value={completed}
            checked={completed}
            onChange={() => onToggleComplete(id)}
          ></input>
          {display && (
            <input
              type="text"
              className="edit-input"
              name="text"
              value={newText}
              onChange={(e) => setNewText(e.target.value)}
            ></input>
          )}
          {!display && (
            <div className="todo-description">
              <h3>Task: {text} </h3>
              {completeBy ? <p>Complete By:{completeBy}</p> : ""}
            </div>
          )}
        </div>
        <div className="buttons">
          <FontAwesomeIcon
            color="white"
            icon={faTrashAlt}
            onClick={() => onRemove(id)}
            className="delete"
          />

          {!display ? (
            <FontAwesomeIcon
              icon={faEdit}
              onClick={editClick}
              className="edit"
            />
          ) : (
            <FontAwesomeIcon
              icon={faUpload}
              onClick={editClick}
              className="update"
            />
          )}
        </div>
      </li>
    </>
  );
}

function CreateTodo({ addTodo }) {
  const [text, setText] = React.useState("");
  const [completeBy, setCompleteBy] = React.useState("");
  const [validDate, setValidDate] = React.useState(true);

  const onCreate = (event) => {
    event.preventDefault();
    addTodo(text, completeBy);
    setText("");
    setCompleteBy("");
  };

  const minDate = () => {
    const today = new Date();
    let dd = today.getDate();
    let mm = today.getMonth() + 1;
    let yyyy = today.getFullYear();

    if (dd < 10) dd = "0" + dd;
    if (mm < 10) mm = "0" + mm;
    return yyyy + "-" + mm + "-" + dd;
  };

  const error = "Enter the current date or above !!!!!";

  const onChangeInputDeadlineValue = (event) => {
    if (event.target.value >= minDate()) {
      setCompleteBy(event.target.value);
      setValidDate(true);
    } else {
      setCompleteBy("");
      setValidDate(!validDate);
    }
  };

  return (
    <div className="add-todo">
      <form onSubmit={onCreate}>
        <input
          type="text"
          placeholder="Enter the Todo..."
          name="text"
          id="text"
          value={text}
          onChange={(event) => {
            setText(event.target.value);
          }}
        />
        <input
          type="datetime-local"
          name="datetime"
          id="datetime"
          value={completeBy}
          onChange={onChangeInputDeadlineValue}
        />
        {!validDate && <h3 className="error-tag">{error}</h3>}
        <div className="button">
          <button type="submit">Add Todo</button>
        </div>
      </form>
    </div>
  );
}

export default function App() {
  return (
    <div className="app">
      <Header />
      <About />
      <Timer />
      <Todos />
      <Footer />
    </div>
  );
}
