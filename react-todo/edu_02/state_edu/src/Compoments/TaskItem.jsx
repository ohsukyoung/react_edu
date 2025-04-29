export default function TaskItem({
  id,
  task,
  dueDate,
  priority,
  done,
  onDoneHanlder,
}) {
  return (
    <li className="tasks-item">
      <input id={id} type="checkbox" value={id} onChange={onDoneHanlder} />
      <label htmlFor={id} className={`due-date ${done ? "done-todo" : ""}`}>
        {task}
      </label>
      <span className={`due-date ${done ? "done-todo" : ""}`}>{dueDate}</span>
      <span className={`priority ${done ? "done-todo" : ""}`}>{priority}</span>
    </li>
  );
}
