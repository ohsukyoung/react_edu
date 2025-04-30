import { useRef, useState } from "react";
import TaskAppender from "./Components/TaskAppender";
import TaskList from "./Components/TaskList";
import Confirm from "./Components/modal/Confirm";
import Alert from "./Components/modal/Modal";

function App() {
  const alertRef = useRef();
  const allDoneConfirmRef = useRef();
  const doneConfirmRef = useRef();

  const [allDoneConfirmMessage, setAllDoneConfirmMessage] = useState();
  const [alertMessage, setAlertMessage] = useState();
  const [todoLists, setTodoList] = useState([
    {
      id: "item1",
      task: "React Component Master",
      dueDate: "2025-12-31",
      priority: 1,
      done: true,
    },
    {
      id: "item2",
      task: "React Props Master",
      dueDate: "2025-10-11",
      priority: 1,
      done: true,
    },
    {
      id: "item3",
      task: "React States Master",
      dueDate: "2025-09-07",
      priority: 1,
      done: false,
    },
  ]);

  const addNewTodoHandler = (task, dueDate, priority) => {
    setTodoList((prevTodoList) => {
      const newTodoList = [...prevTodoList];
      newTodoList.push({
        id: "item" + (prevTodoList.length + 1),
        task,
        dueDate,
        priority,
        done: false,
      });
      return newTodoList;
    });
  };

  const doneTodoHandler = (event) => {
    const todoId = event.currentTarget.value;
    setAllDoneConfirmMessage(
      `${todoId} task를 완료할까요? 이 작업은 되돌릴 수 없습니다.`
    );
    doneConfirmRef.current.open();
    doneConfirmRef.todoId = todoId;
  };

  const doneTodoItemHandler = () => {
    setTodoList((prevTodoList) => {
      const newTodoList = [...prevTodoList];

      newTodoList.map((todo) => {
        if (todo.id === doneConfirmRef.todoId) {
          todo.done = true;
        }
        return todo;
      });
      return newTodoList;
    });

    doneConfirmRef.current.close();
  };

  const doneAllTodoHandler = (event) => {
    const processingTodoLength = todoLists.filter((todo) => !todo.done).length;
    if (event.currentTarget.checked && processingTodoLength === 0) {
      setAlertMessage("완료할 Task가 없습니다.");
      event.currentTarget.checked = false;
      alertRef.current.open();
      return;
    }

    if (event.currentTarget.checked) {
      event.currentTarget.checked = false;
      setAllDoneConfirmMessage(
        "모든 task를 완료할까요? 이 작업은 되돌릴 수 없습니다."
      );

      allDoneConfirmRef.current.open();
    }
  };

  const allDoneOkHandler = () => {
    setTodoList((prevTodoList) => {
      const newTodoList = [...prevTodoList];

      newTodoList.map((todo) => {
        todo.done = true;
        return todo;
      });
      return newTodoList;
    });

    allDoneConfirmRef.current.close();
  };

  return (
    <>
      <div className="wrapper">
        <header>React Todo</header>
        <TaskList>
          <TaskList.TaskHeader onCheckboxClick={doneAllTodoHandler} />
          {todoLists.map((item) => (
            <TaskList.TaskItem
              key={item.id}
              id={item.id}
              task={item.task}
              dueDate={item.dueDate}
              priority={item.priority}
              done={item.done}
              onCheckboxClick={doneTodoHandler}
            />
          ))}
        </TaskList>
        <TaskAppender onButtonClick={addNewTodoHandler} />
      </div>
      <Alert ref={alertRef}>
        <div>
          <h3>{alertMessage}</h3>
        </div>
      </Alert>
      <Confirm ref={allDoneConfirmRef} okHandler={allDoneOkHandler}>
        <div>{allDoneConfirmMessage}</div>
      </Confirm>
      <Confirm ref={doneConfirmRef} okHandler={doneTodoItemHandler}>
        <div>{allDoneConfirmMessage}</div>
      </Confirm>
    </>
  );
}

export default App;
