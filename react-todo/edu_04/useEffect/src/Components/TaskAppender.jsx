import { memo, useRef, useState } from "react";
import Alert from "./modal/Modal";

export default memo(function TaskAppender({ onButtonClick }) {
  console.log("-- Call [TaskAppender] Component");
  console.log("-- Rendered [TaskAppender] Component");

  const taskRef = useRef();
  const dueDateRef = useRef();
  const priorityRef = useRef();
  const alertRef = useRef();

  const [modalMessage, setModalMessage] = useState();

  const onButtonClickHandler = () => {
    if (!taskRef.current.value) {
      setModalMessage("Task를 입력하새요.");
      alertRef.current.open();
      return;
    }

    if (!dueDateRef.current.value) {
      setModalMessage("Due Date를 입력하세요.");
      alertRef.current.open();
      return;
    }

    if (!priorityRef.current.value) {
      setModalMessage("Priority를 선택하세요.");
      alertRef.current.open();
      return;
    }
    onButtonClick(
      taskRef.current.value,
      dueDateRef.current.value,
      priorityRef.current.value
    );
  };

  return (
    <>
      <footer>
        <input type="text" placeholder="Task" ref={taskRef} />
        <input type="date" ref={dueDateRef} />
        <select ref={priorityRef}>
          <option value="">우선순위</option>
          <option value="1">높음</option>
          <option value="2">보통</option>
          <option value="3">낮음</option>
        </select>
        <button type="button" onClick={onButtonClickHandler}>
          Save
        </button>
      </footer>
      <Alert ref={alertRef}>
        <div>
          <h3>{modalMessage}</h3>
        </div>
      </Alert>
    </>
  );
});
