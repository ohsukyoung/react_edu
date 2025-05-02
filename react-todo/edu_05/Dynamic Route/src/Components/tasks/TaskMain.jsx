import { useCallback, useEffect, useReducer, useRef, useState } from "react";
import TaskAppender from "./TaskAppender";
import TaskList from "./TaskList";
import Confirm from "../modal/Confirm";
import Alert from "../modal/Modal";
import taskReducers, { actionType } from "../../reducers/TaskReducers";
import { addTask, allDoneTasks, doneTask, loadTasks } from "../../http/http";
import { useFatch } from "../hooks/useFetch";

const TaskMain = () => {
  console.log("Call [TaskMain] Component");
  console.log("Rendered [TaskMain] Component");

  const [todoLists, todoDispatcher] = useReducer(taskReducers, []);

  const {
    fetchedData: loadData,
    isLoading: loaded,
    error: fetchError,
  } = useFatch(todoLists, loadTasks); // -- useFatch를 한번 써서 문제없어보이지만 실제로 개발에서는 fetchedData 등을 여러번 사용하면 에러가 남
  // -- 이름 중복으로 겹치지 않게 하기 위해서 fetchedData: loadData 이런식으로 별칭을 만들어줌
  console.log("loadData: ", loadData);
  console.log("loaded: ", loaded);
  console.log("fetchError: ", fetchError);

  const { fetchedData, isLoading, error } = useFatch(todoLists, loadTasks); //-- 패치를 부를때 asyc 를 붙이지 않음. 내부에서 모두 하고 있음
  console.log(fetchedData);
  console.log(isLoading);
  console.log(error);

  useEffect(() => {
    if (!isLoading) {
      todoDispatcher({ type: actionType.init, payload: fetchedData.body });
    }
  }, [isLoading, fetchedData]); //-- isLoading를 넣으면 데이터가 나옴. isLoading가 바뀌었으면 출력하라는 것

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
    const addFetch = async (fnCallback) => {
      const json = await addTask({ task, dueDate, priority });

      if (json.status === 201) {
        fnCallback(json.body.taskId); // -- fnCallback함수는 async에 받아올 함수!
      }
    };

    addFetch((taskId) => {
      todoDispatcher({
        type: actionType.add,
        payload: { taskId, task, dueDate, priority },
      });
    }); //-- addFetch의 괄호 안: () => {} 이 함수가 위의 asyn(fnCallback)으로 전달되는 것
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
    const doneFetch = async (fnCallback) => {
      const json = await doneTask(doneConfirmRef.todoId);

      if (json.status === 200) {
        fnCallback(json.body);
      }
    }; //-- 패치가 완료되었을때 fnCallback

    doneFetch((taskId) => {
      todoDispatcher({
        type: actionType.done,
        payload: { id: taskId },
      });
      doneConfirmRef.current.close();
    });
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
    const allDoneFetch = async (fnCallback) => {
      const json = await allDoneTasks();
      if (json.status === 200) {
        fnCallback();
      }
    };

    allDoneFetch(() => {
      todoDispatcher({ type: actionType.allDone, payload: {} });
      allDoneConfirmRef.current.close();
    });
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
};
export default TaskMain;
