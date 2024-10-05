const todoList = () => {
  let all = [];

  const formattedDate = (date) => {
    return date.toLocaleDateString("en-CA"); // Format date to YYYY-MM-DD
  };

  const add = (todoItem) => {
    all.push(todoItem);
  };

  const markAsComplete = (index) => {
    all[index].completed = true;
  };

  const compareDate = (date1, date2) => {
    return (
      new Date(date1).setHours(0, 0, 0, 0) -
      new Date(date2).setHours(0, 0, 0, 0)
    );
  };

  const overdue = () => {
    const today = formattedDate(new Date());
    return all.filter((todo) => compareDate(todo.dueDate, today) < 0);
  };

  const dueToday = () => {
    const today = formattedDate(new Date());
    return all.filter((todo) => compareDate(todo.dueDate, today) === 0);
  };

  const dueLater = () => {
    const today = formattedDate(new Date());
    return all.filter((todo) => compareDate(todo.dueDate, today) > 0);
  };

  const toDisplayableList = (list) => {
    return list
      .map((todo) => {
        const checkbox = todo.completed ? "[x]" : "[ ]";
        const displayDate =
          compareDate(todo.dueDate, formattedDate(new Date())) === 0
            ? ""
            : todo.dueDate;
        return `${checkbox} ${todo.title} ${displayDate}`.trim();
      })
      .join("\n");
  };

  return {
    all,
    add,
    markAsComplete,
    overdue,
    dueToday,
    dueLater,
    toDisplayableList,
  };
};

module.exports = todoList;
