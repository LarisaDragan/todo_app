import { useState, useRef } from "react";
import ToggleTheme from "../../ThemeContext/ToggleTheme";
import "./style.css";

const TodoCard = () => {
  const [todos, setTodos] = useState([]);
  const [inputValue, setInputValue] = useState("");
  const [filter, setFilter] = useState("all");

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      setTodos([...todos, { text: inputValue, completed: false }]);
      setInputValue("");
    }
  };

  const handleCheckboxChange = (index) => {
    setTodos((prevTodos) =>
      prevTodos.map((todo, inx) =>
        index === inx ? { ...todo, completed: !todo.completed } : todo
      )
    );
  };
  const removeTodoItem = (indexToRemove) => {
    setTodos((prevTodos) =>
      prevTodos.filter((_, index) => index !== indexToRemove)
    );
  };

  const getRemainingItemsToCheck = () => {
    return todos.filter((todo) => todo.completed !== true).length;
  };

  const filterTodosByAll = () => setFilter("all");
  const filterTodosByActive = () => setFilter("active");
  const filterTodosByCompleted = () => setFilter("completed");

  const clearCompletedTodos = () => {
    setTodos((prevTodos) => {
      return prevTodos.filter((todo) => !todo.completed);
    });
  };

  const filteredTodos = todos.filter((todo) => {
    if (filter === "all") return true;
    if (filter === "completed") return todo.completed;
    if (filter === "active") return !todo.completed;
  });

  const todoList = filteredTodos.length > 0 ? filteredTodos : todos;

  const draggedItem = useRef(null);

  const handleDragStart = (e, index) => {
    draggedItem.current = index;
    e.dataTransfer.effectAllowed = "move";
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  const handleDrop = (e, index) => {
    e.preventDefault();
    const newTodos = [...todos];
    const [movedItem] = newTodos.splice(draggedItem.current, 1);
    newTodos.splice(index, 0, movedItem);
    setTodos(newTodos);
    draggedItem.current = null;
  };

  return (
    <div id="card-holder">
      <div id="card">
        <div id="header">
          <h3>TO DO</h3>
          <ToggleTheme />
        </div>
        <label id="create-todo">
          <input type="checkbox" className="todo-checkbox" disabled />
          <input
            type="text"
            className="todo-input"
            placeholder="Create a new todo..."
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyDown={(e) => handleKeyPress(e)}
          />
        </label>

        {todoList.length !== 0 && (
          <>
            <div id="todos-card">
              <div>
                {todoList.map((todo, index) => {
                  return (
                    <ul key={index} className="todos-options">
                      <li
                        draggable
                        onDragStart={(e) => handleDragStart(e, index)}
                        onDragOver={handleDragOver}
                        onDrop={(e) => handleDrop(e, index)}
                      >
                        <input
                          type="checkbox"
                          checked={todo.completed}
                          onChange={() => handleCheckboxChange(index)}
                        />
                        <span className={todo.completed ? "strikethrough" : ""}>
                          {todo.text}
                        </span>
                        <button
                          id="remove-todo"
                          onClick={() => removeTodoItem(index)}
                        >
                          X
                        </button>
                      </li>
                    </ul>
                  );
                })}
              </div>
              <div id="todo-footer">
                <button>{getRemainingItemsToCheck()} items left</button>
                <div>
                  <button
                    onClick={() => filterTodosByAll()}
                    className={filter === "all" ? "active-option" : ""}
                  >
                    All
                  </button>
                  <button
                    onClick={() => filterTodosByActive()}
                    className={filter === "active" ? "active-option" : ""}
                  >
                    Active
                  </button>
                  <button
                    onClick={() => filterTodosByCompleted()}
                    className={filter === "completed" ? "active-option" : ""}
                  >
                    Completed
                  </button>
                </div>
                <button onClick={() => clearCompletedTodos()}>
                  Clear completed
                </button>
              </div>
            </div>

            <div id="drag-drop-info">
              <p>Drag and drop to reorder list</p>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default TodoCard;
