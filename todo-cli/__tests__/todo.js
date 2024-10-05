const todoList = require("../todo");
let today = new Date().toLocaleDateString("en-CA");

const { all, markAsComplete, add, overdue, dueToday, dueLater } = todoList();

describe("Test Todo List Function: ", () => {
    beforeEach(() => {
        // Clear the todos array before each test
        all.length = 0;
        // Add an initial todo item for testing
        add({
            title: "Submit assignment",
            dueDate: new Date().toLocaleDateString("en-CA"),
            completed: false,
        });
    });

    test("Test add Method: ", () => {
        let length = all.length;
        add({
            title: "Pay electric bill",
            dueDate: new Date().toLocaleDateString("en-CA"),
            completed: false,
        });
        expect(all.length).toBe(length + 1);
    });

    test("Test markAsComplete Method: ", () => {
        expect(all[0].completed).toBe(false);
        markAsComplete(0);
        expect(all[0].completed).toBe(true);
    });

    test("Test Overdue Method: ", () => {
        // Add an overdue todo item
        add({
            title: "Overdue task",
            dueDate: new Date(Date.now() - 24 * 60 * 60 * 1000).toLocaleDateString("en-CA"), // yesterday
            completed: false,
        });

        let overdueToDoList = overdue();

        expect(
            overdueToDoList.every((todo) => {
                return new Date(todo.dueDate) < new Date();
            })
        ).toBe(true);
    });

    test("Test dueToday Method: ", () => {
        let toDosDueTodayList = dueToday();

        expect(
            toDosDueTodayList.every((todo) => {
                return new Date(todo.dueDate).toLocaleDateString("en-CA") === new Date().toLocaleDateString("en-CA");
            })
        ).toBe(true);
    });

    test("Test dueLater Method: ", () => {
        // Add a todo item that is due tomorrow
        add({
            title: "Future task",
            dueDate: new Date(Date.now() + 24 * 60 * 60 * 1000).toLocaleDateString("en-CA"), // tomorrow
            completed: false,
        });

        let toDosDueLaterList = dueLater();

        expect(
            toDosDueLaterList.every((todo) => {
                return new Date(todo.dueDate) > new Date();
            })
        ).toBe(true);
    });
});
