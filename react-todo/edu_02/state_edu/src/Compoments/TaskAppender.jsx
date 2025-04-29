import { useState } from "react";

export default function TaskAppender({ onSaveHandler }) {
  // -- 값을 관리하기 위해 State 3개 만듦
  const [task, setTask] = useState();
  const [dueDate, setDueDate] = useState();
  const [priority, setPriority] = useState();

  // -- 사용자가 키업할때마다 갱신
  const onTaskeyUpHandler = (event) => {
    setTask(event.currentTarget.value);
  };
  const onDueDateChangeHandler = (event) => {
    setDueDate(event.currentTarget.value);
  };
  const onPrioritySelectHandler = (event) => {
    setPriority(event.currentTarget.value);
  };

  const onSaveClickHandler = () => {
    /**
     * App.js
     *  - taskList (state)
     *      - [ {...}, {...}, {...} ] + { ... }
     *      - [ {...}, {...}, {...}, {...} ]
     *      -- push를 하더라도 변경되지 않음. 다른 방법이 필요
     *  - onSaveHandler ==> App.js > setTaskList();
     */
    onSaveHandler((prevTaskList) => {
      // -- 함수를 줄것.
      // -- 값이 바뀐다는게 아님
      // -- 가장 최신의 값 을 가져옴 -> prevTaskList

      // prevTaskList 배열을 복사해서 새로운 배열로 생성.
      const newTaskList = [...prevTaskList];
      // -- 펼침연산자 -> '...'을 붙이는 것
      // -- ... ["a","b","c"]
      // "a" "b" "c"

      // 새로우 배열에 새로운 객체를 push
      newTaskList.push({
        id: prevTaskList.length + 1,
        task,
        dueDate,
        priority, //priority: priority,
        done: false,
      });

      return newTaskList;
      // -- 배열객체 or 객체를 바꿀때는 함수를 통해서 바꿔줌!!!
    });
  };

  // Save를 클릭하면 동작할 함수.
  const onButtonClickHandler = () => {
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

  return (
    <footer>
      <input type="text" placeholder="Task" onKeyUp={onTaskeyUpHandler} />
      <input type="date" />
      <select onChange={onDueDateChangeHandler}>
        <option>우선순위</option>
        <option value="1">높음</option>
        <option value="2">보통</option>
        <option value="3">낮음</option>
      </select>
      <button type="button" onClick={onSaveClickHandler}>
        Save
      </button>
    </footer>
  );
}

/**
 * -- state가 배열이나 객체 이면.. [] {}
 *  stae <-- 변경이 되었는가?
 *  "" !== "" => true
 *  10 !== 7 => true
 *
 * -- 메모리 참조!!!
 * -- 리엑트는 배열에 가진 값을 하나하나 비교하는 수밖에 없음
 * -- 메모리가 다르면 다른것으로 인식함!!!
 * [1,2,3] - 4 push !== [1,2,3,4] => false
 * [1,2,3] - 4 push !== [1,2,4] => false
 *
 * -- state가 문자나 숫자는 그냥 값을 넣으면 됨
 *
 *
 *
 * -- state는 임시변수
 * 새로고침 하는 순간 모두 사라짐
 *
 */
