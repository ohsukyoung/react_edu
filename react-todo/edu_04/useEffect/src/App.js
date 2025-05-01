import { useCallback, useEffect, useReducer, useRef, useState } from "react";
import TaskAppender from "./Components/TaskAppender";
import TaskList from "./Components/TaskList";
import Confirm from "./Components/modal/Confirm";
import Alert from "./Components/modal/Modal";
import taskReducers, { actionType } from "./reducers/TaskReducers";

function App() {
  console.log("Call [App] Component");
  console.log("Rendered [App] Component");

  const [isLoading, setLingLodaing] = useState(true);

  // -- 위로 끌어올리는 이유
  // -- Vanilla -> var
  /**
   * a = 20;
   * var a = 10;
   * console.log(a); ---> 20
   *
   * 바닐라에서는 위의 결과가 도출되었음
   */
  // -- ECMA    -> let, const
  const [todoLists, todoDispatcher] = useReducer(taskReducers, []);

  const fetchCall = async () => {
    const response = await fetch("http://192.168.210.11:8888/api/v1/task", {
      // -- async 내부에서만 await 사용 가능
      method: "GET",
    }); //-- get이라고 안적어도 되지만, 명시를 해볼 것
    console.log(response);

    const json = await response.json();

    console.log(json);
    todoDispatcher({ type: actionType.init, payload: json.body });
  };

  useEffect(() => {
    fetchCall();
  }, []);

  const alertRef = useRef();
  const allDoneConfirmRef = useRef();
  const doneConfirmRef = useRef();

  const [allDoneConfirmMessage, setAllDoneConfirmMessage] = useState();
  const [alertMessage, setAlertMessage] = useState();

  const taskCount = {
    done: todoLists.filter((item) => item.done).length,
    process: todoLists.filter((item) => !item.done).length,
  };

  const addNewTodoHandler = useCallback((task, dueDate, priority) => {
    todoDispatcher({
      type: actionType.add,
      payload: { task, dueDate, priority },
    });
  }, []);

  const doneTodoHandler = (event) => {
    const todoId = event.currentTarget.value;
    setAllDoneConfirmMessage(
      `${todoId} task를 완료할까요? 이 작업은 되돌릴 수 없습니다.`
    );
    doneConfirmRef.current.open();
    doneConfirmRef.todoId = todoId;
  };

  const doneTodoItemHandler = () => {
    todoDispatcher({
      type: actionType.done,
      payload: { id: doneConfirmRef.todoId },
    });
    doneConfirmRef.current.close();
  };

  const doneAllTodoHandler = useCallback(
    (event) => {
      const processingTodoLength = todoLists.filter(
        (todo) => !todo.done
      ).length;
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
    },
    [todoLists]
  );

  const allDoneOkHandler = () => {
    todoDispatcher({ type: actionType.allDone, payload: {} });
    allDoneConfirmRef.current.close();
  };

  return (
    <>
      <div className="wrapper">
        <header>React Todo</header>
        <TaskList>
          <TaskList.TaskHeader
            taskCount={taskCount}
            onCheckboxClick={doneAllTodoHandler}
          />
          {isLoading && <div>data를 불러오는 중입니다.</div>}
          {!isLoading &&
            todoLists.map((item) => (
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
