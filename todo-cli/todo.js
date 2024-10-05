const todoList = () => {
    all = [];

    const add = (todoItem) => {
        all.push(todoItem);
    };

    const markAsComplete = (index) => {
        all[index].completed = true;
    };

    const compareDate = (date) =>
        new Date(date) - new Date(formattedDate(new Date()));

    const overdue = () => {
        return all.filter(
            (todo) => todo.dueDate < new Date().toISOString("en-CA")
        );
    };

    const dueToday = () => {
        return all.filter(
            (todo) => todo.dueDate === new Date().toISOString("en-CA")
        );
    };

    const dueLater = () => {
        return all.filter(
            (todo) => todo.dueDate > new Date().toISOString("en-CA")
        );
    };

    const toDisplayableList = (list) => {
        return list
            .map((todo) => {
                const checkbox = todo.completed ? "[x]" : "[ ]";
                const displayDate = compareDate(todo.dueDate) === 0 ? "" : todo.dueDate;
                return `${checkbox} ${todo.title} ${displayDate}`;
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