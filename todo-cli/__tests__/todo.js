const todoList = require('../todo.js');

describe('Todo List Test Suite', () => {
    let todos;

    beforeEach(() => {
        todos = todoList();
        const dateToday = new Date();
        const formattedDate = d => d.toISOString().split("T")[0];
        const today = formattedDate(dateToday);
        const yesterday = formattedDate(new Date(dateToday.setDate(dateToday.getDate() - 1)));
        const tomorrow = formattedDate(new Date(dateToday.setDate(dateToday.getDate() + 2)));

        todos.add({ title: 'Submit assignment', dueDate: yesterday, completed: false });
        todos.add({ title: 'Pay rent', dueDate: today, completed: true });
        todos.add({ title: 'Service Vehicle', dueDate: today, completed: false });
        todos.add({ title: 'File taxes', dueDate: tomorrow, completed: false });
        todos.add({ title: 'Pay electric bill', dueDate: tomorrow, completed: false });
    });

    test('Test adding a todo item', () => {
        expect(todos.all.length).toBe(5);
    });

    test('Test marking a todo as completed', () => {
        todos.markAsComplete(2);
        expect(todos.all[2].completed).toBe(true);
    });

    test('Test retrieval of overdue items', () => {
        const overdueItems = todos.overdue();
        expect(overdueItems.length).toBe(1);
        expect(overdueItems[0].title).toBe('Submit assignment');
    });

    test('Test retrieval of today\'s items', () => {
        const dueTodayItems = todos.dueToday();
        expect(dueTodayItems.length).toBe(2);
        expect(dueTodayItems[0].title).toBe('Pay rent');
    });

    test('Test retrieval of due later items', () => {
        const dueLaterItems = todos.dueLater();
        expect(dueLaterItems.length).toBe(2);
        expect(dueLaterItems[0].title).toBe('File taxes');
    });

    test('Test displayable list formatting', () => {
        const formattedList = todos.toDisplayableList(todos.dueToday());
        expect(formattedList).toContain('[ ] Service Vehicle');
        expect(formattedList).toContain('[x] Pay rent');
    });
});