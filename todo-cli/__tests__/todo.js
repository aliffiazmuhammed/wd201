const todoList = require("../todo");
let today = new Date().toLocaleDateString("en-CA");

const { all, markAsComplete, add, overdue, dueToday, dueLater } = todoList();

describe("Test Todo List Function: ", () => {
    beforeAll(() => {
        add({
            title: "Submit assignment",
            dueDate: new Date().toISOString("en-CA"),
            completed: false,
        });
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
                return todo.dueDate < new Date().toISOString("en-CA");
            })
        ).toBe(true);
    });

    test("Test dueToday Method: ", () => {
        let toDosDueTodayList = dueToday();
        expect(
            toDosDueTodayList.every((todo) => {
                return todo.dueDate === new Date().toISOString("en-CA");
            })
        ).toBe(true);
    });

    test("Test dueLater Method: ", () => {
        let toDosDueLaterList = dueLater();
        expect(
            toDosDueLaterList.every((todo) => {
                return todo.dueDate > new Date().toISOString("en-CA");
            })
        ).toBe(true);
    });
});