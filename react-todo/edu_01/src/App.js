function App() {
  // -- 1. class -> className / for -> htmlFor

  // 변수(let) / 상수(const) / 함수 정의.( () => {} )
  // -- 변수를 잘 쓰지 않음. 상수를 많이 씀
  // -- 함수는 fnction을 쓰지않고 람다식으로 사용

  // Save를 클릭하면 동작할 삼수.
  const onButtonClickHandler = () => {
    // -- this 사용 불가
    alert("Todo 추가");
  };

  // Task를 입력하면 동작할 함수.
  const onTodoInutKeyUpHandler = (event) => {
    console.log(event.currentTarget.value);
  };

  // 우선 순위를 변경하면 동작할 함수
  const onPriorityChangeHandler = (event) => {
    alert(event.currentTarget.value);
  };

  const todoName = "React Componet 마스터";

  return (
    <div className="wrapper">
      <header>React Todo</header>
      <ul className="tasks">
        <li className="tasks-header">
          <input id="checkall" type="checkbox" />
          <label>Task</label>
          <span className="due-date">Deu Date</span>
          <span className="priority">Priority</span>
        </li>
        <li className="tasks-item">
          <input id="todo_1" type="checkbox" />
          <label htmlFor="todo_1">{todoName}</label>
          <span className="due-date">2025-12-31</span>
          <span className="priority">1</span>
        </li>
      </ul>
      <footer>
        <input
          type="text"
          placeholder="Task"
          onKeyUp={onTodoInutKeyUpHandler}
        />
        <input type="date" />
        <select onChange={onPriorityChangeHandler}>
          <option>우선순위</option>
          <option value="1">높음</option>
          <option value="2">보통</option>
          <option value="3">낮음</option>
        </select>
        <button type="button" onClick={onButtonClickHandler}>
          Save
        </button>
      </footer>
    </div>
  );
}

export default App;
