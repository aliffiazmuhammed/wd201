const todoList = require("../todo"); // Adjust the path as necessary

describe("Todo List Functionality", () => {
  let todos;

  beforeEach(() => {
    // Initialize a new todo list before each test
    todos = todoList();
  });

  test("Creating a new todo", () => {
    // Add a new todo
    todos.add({
      title: "Pay rent",
      dueDate: new Date().toLocaleDateString("en-CA"),
      completed: false,
    });

    // Check if the todo was added
    expect(todos.all.length).toBe(1);
    expect(todos.all[0].title).toBe("Pay rent");
    expect(todos.all[0].completed).toBe(false);
  });

  test("Marking a todo as completed", () => {
    // Add a new todo
    todos.add({
      title: "Service vehicle",
      dueDate: new Date().toLocaleDateString("en-CA"),
      completed: false,
    });

    // Mark the todo as completed
    todos.markAsComplete(0);

    // Check if the todo is marked as completed
    expect(todos.all[0].completed).toBe(true);
  });

  test("Retrieval of overdue items", () => {
    // Add overdue and current todos
    todos.add({
      title: "Submit assignment",
      dueDate: new Date(Date.now() - 86400000).toLocaleDateString("en-CA"),
      completed: false,
    }); // Overdue
    todos.add({
      title: "Pay rent",
      dueDate: new Date().toLocaleDateString("en-CA"),
      completed: false,
    }); // Due Today

    // Get overdue items
    const overdueItems = todos.overdue();

    // Check if the correct items are retrieved
    expect(overdueItems.length).toBe(1);
    expect(overdueItems[0].title).toBe("Submit assignment");
  });

  test("Retrieval of due today items", () => {
    // Add due today and overdue todos
    todos.add({
      title: "Pay rent",
      dueDate: new Date().toLocaleDateString("en-CA"),
      completed: false,
    }); // Due Today
    todos.add({
      title: "Submit assignment",
      dueDate: new Date(Date.now() - 86400000).toLocaleDateString("en-CA"),
      completed: false,
    }); // Overdue

    // Get due today items
    const dueTodayItems = todos.dueToday();

    // Check if the correct items are retrieved
    expect(dueTodayItems.length).toBe(1);
    expect(dueTodayItems[0].title).toBe("Pay rent");
  });

  test("Retrieval of due later items", () => {
    // Add due later and current todos
    todos.add({
      title: "File taxes",
      dueDate: new Date(Date.now() + 86400000).toLocaleDateString("en-CA"),
      completed: false,
    }); // Due Tomorrow
    todos.add({
      title: "Pay rent",
      dueDate: new Date().toLocaleDateString("en-CA"),
      completed: false,
    }); // Due Today

    // Get due later items
    const dueLaterItems = todos.dueLater();

    // Check if the correct items are retrieved
    expect(dueLaterItems.length).toBe(1);
    expect(dueLaterItems[0].title).toBe("File taxes");
  });
});
