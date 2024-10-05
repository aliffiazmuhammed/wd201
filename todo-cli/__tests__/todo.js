const todoList = require("../todo");
let today = new Date().toLocaleDateString("en-CA");

const { all, markAsComplete, add, overdue, dueToday, dueLater } = todoList();

describe("Test Todo List Function: ", () => {
    beforeAll(() => {
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
        let overdueToDoList = overdue();
        expect(
            overdueToDoList.every((todo) => {
                return todo.dueDate < new Date().toLocaleDateString("en-CA");
            })
        ).toBe(true);
    });

    test("Test dueToday Method: ", () => {
        let toDosDueTodayList = dueToday();
        expect(
            toDosDueTodayList.every((todo) => {
                return todo.dueDate === new Date().toLocaleDateString("en-CA");
            })
        ).toBe(true);
    });

    test("Test dueLater Method: ", () => {
        let toDosDueLaterList = dueLater();
        expect(
            toDosDueLaterList.every((todo) => {
                return todo.dueDate > new Date().toLocaleDateString("en-CA");
            })
        ).toBe(true);
    });
});