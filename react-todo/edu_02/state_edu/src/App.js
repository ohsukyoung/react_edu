import { useState } from "react";
import TaskAppender from "./Compoments/TaskAppender";
import TaskHeader from "./Compoments/TaskHeader";
import TaskItem from "./Compoments/TaskItem";
import TaskList from "./Compoments/TaskList";

function App() {
  const tasks = [
    // -- api를 통해 가져온 데이터라고 가정
    // -- [] 배열데이터를 변환시킬 수 있는 기능이 ECMA에 존재 ----> .map();
    // -- ex. [1,2,3] -> ["A","B","A"] 홀수는 A로 짝수는 B로
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
  ];

  // -- 바인딩되어 변환됨
  // -- 전: [{…}, {…}, {…}] ----> '[]' : task
  // -- 후: [<TaskItem/>, <TaskItem/>, <TaskItem/>]
  // -- 컴포넌트를 고유하게 구분할 수 있는 각각의 값을 주어야함
  // -- 이유는 캐싱...? 때문임

  const [taskList, setTaskList] = useState(tasks);

  //const [taskList, setTaskList] useState(tasks);

  const doneTaskHandler = (event) => {
    // 완료처리한 task의 아이디를 가져온다.
    const targetTaskId = event.currentTarget.value;

    setTaskList((prevTaskList) => {
      const newTaskList = [...prevTaskList];

      // taskList 스테이트에서 해당 task의 인덱스를 가져온다.
      const targetIndex = newTaskList.findIndex(
        (TaskItem) => TaskItem.id === targetTaskId
      );
      // -- .findIndex() -> 조금더 직관적인 방법

      // 해당 인덱스의 done 값을 true로 바꿔준다.
      // newTaskList[targetIndex].done = true;
      console.log(targetIndex);

      return newTaskList;
    });
  };

  return (
    <div className="wrapper">
      <header>React Todo</header>
      <TaskList>
        <TaskHeader />
        {taskList.map((item) => (
          <TaskItem
            key={item.id}
            id={item.id}
            task={item.task}
            dueDate={item.dueDate}
            priority={item.priority}
            done={item.done}
            onDoneHanlder={doneTaskHandler}
          />
        ))}
      </TaskList>

      <TaskAppender onSaveHandler={setTaskList} />
    </div>
  );
}

export default App;
