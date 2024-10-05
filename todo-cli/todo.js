const todoList = () => {
  let all = [];

  const formattedDate = (date) => {
    return date.toISOString().split("T")[0]; // Extract only the date part (YYYY-MM-DD) from ISO string
  };

  const add = (todoItem) => {
    all.push(todoItem);
  };

  const markAsComplete = (index) => {
    all[index].completed = true;
  };

  const compareDate = (date1, date2) => {
    // Compare only the date parts of the ISO strings
    return (
      new Date(date1).toISOString().split("T")[0] -
      new Date(date2).toISOString().split("T")[0]
    );
  };

  const overdue = () => {
    const today = formattedDate(new Date());
    return all.filter((todo) => formattedDate(new Date(todo.dueDate)) < today); // Compare the date parts
  };

  const dueToday = () => {
    const today = formattedDate(new Date());
    return all.filter(
      (todo) => formattedDate(new Date(todo.dueDate)) === today,
    ); // Compare the date parts
  };

  const dueLater = () => {
    const today = formattedDate(new Date());
    return all.filter((todo) => formattedDate(new Date(todo.dueDate)) > today); // Compare the date parts
  };

  const toDisplayableList = (list) => {
    return list
      .map((todo) => {
        const checkbox = todo.completed ? "[x]" : "[ ]";
        const displayDate =
          formattedDate(new Date(todo.dueDate)) === formattedDate(new Date())
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
