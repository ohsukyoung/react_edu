import { createContext, useContext } from "react";

const TaskListContext = createContext();

export default function TaskList({ children }) {
  const taskListContextValue = { contextName: "TaskList" };
  return (
    <TaskListContext.Provider value={taskListContextValue}>
      <ul className="tasks">{children}</ul>
    </TaskListContext.Provider>
  );
}

function TaskHeader({ onCheckboxClick }) {
  const context = useContext(TaskListContext);
  if (!context) {
    throw new Error("TaskHeader 컴포넌트는 TaskList 내부에 있어야 합니다.");
  }

  return (
    <li className="tasks-header">
      <input id="checkall" type="checkbox" onChange={onCheckboxClick} />
      <label>Task</label>
      <span className="due-date">Due date</span>
      <span className="priority">Priority</span>
    </li>
  );
}

function TaskItem({ done, id, task, dueDate, priority, onCheckboxClick }) {
  const context = useContext(TaskListContext);
  if (!context) {
    throw new Error("TaskItem 컴포넌트는 TaskList 내부에 있어야 합니다.");
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
        {task}
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

TaskList.TaskHeader = TaskHeader;
TaskList.TaskItem = TaskItem;
