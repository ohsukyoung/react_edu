import { createContext, memo, useContext } from "react";
import { Link } from "react-router-dom";

const TaskListContext = createContext();

export default function TaskList({ children }) {
  console.log("-- Call [TaskList] Component");
  console.log("-- Rendered [TaskList] Component");

  const contextValue = { componentName: "TaskList" };
  return (
    <TaskListContext.Provider value={contextValue}>
      <ul className="tasks">{children}</ul>
    </TaskListContext.Provider>
  );
}

TaskList.TaskHeader = memo(function TaskHeader({ taskCount, onCheckboxClick }) {
  console.log("---- Call [TaskHeader] Component");
  console.log("---- Rendered [TaskHeader] Component");

  const context = useContext(TaskListContext);
  if (!context) {
    throw new Error("TaskHeader 컴포넌트는 TaskList 내부에 위치해야 합니다.");
  }
  return (
    <>
      <li className="tasks-counter">
        <div>진행중: {taskCount.process}</div>
        <div>완료: {taskCount.done}</div>
      </li>
      <li className="tasks-header">
        <input id="checkall" type="checkbox" onChange={onCheckboxClick} />
        <label>Task</label>
        <span className="due-date">Due date</span>
        <span className="priority">Priority</span>
      </li>
    </>
  );
});

function TaskItem({ done, id, task, dueDate, priority, onCheckboxClick }) {
  console.log("---- Call [TaskItem] Component");
  console.log("---- Rendered [TaskItem] Component");

  /**
   * 컴포넌트에 props
   * 1. 문자를 보내는 경우
   *    a="1"
   * 2. 문자열이 아닌 경우 -> 중괄호{}를 이용
   *    b={}
   * <TaskList a="1"/>
   * <div className="1" />
   */
  const context = useContext(TaskListContext);
  if (!context) {
    throw new Error("TaskItem 컴포넌트는 TaskList 내부에 위치해야 합니다.");
  }
  return (
    <li className="task-item">
      <input
        id={id}
        type="checkbox"
        checked={done}
        value={id}
        onChange={onCheckboxClick}
        disabled={done}
      />
      <label htmlFor={id} className={done ? "done-todo" : undefined}>
        <Link to={`/todo/${id}`}>{task}</Link>
      </label>
      <span className={`due-date ${done ? "done-todo" : undefined}`}>
        {dueDate}
      </span>
      <span className={`priority ${done ? "done-todo" : undefined}`}>
        {priority}
      </span>
    </li>
  );
}
TaskList.TaskItem = TaskItem;
