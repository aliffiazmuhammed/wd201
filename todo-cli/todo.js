const todoList = () => {
    all = []
    const add = (todoItem) => {
        all.push(todoItem)
    }
    const markAsComplete = (index) => {
        all[index].completed = true
    }

    const overdue = () => {
        // Write the date check condition here and return the array
        // of overdue items accordingly.
        over = []
        const currentDate = new Date();

        const year = currentDate.getFullYear();               // Get the full year
        const month = String(currentDate.getMonth() + 1).padStart(2, '0');  // Get the month (0-11) and pad with '0'
        const day = String(currentDate.getDate()).padStart(2, '0');          // Get the day and pad with '0'

        const formattedDate = `${year}-${month}-${day}`;     // Combine to get YYYY-MM-DD format

        
        let today = formattedDate.replace(/-/g,"")


        all.forEach(element => {
            let duedate = element.dueDate.replace(/-/g,"")
            if ((duedate-today)<0) {
                over.push(element)
            }
        });
        return over
    }

    const dueToday = () => {
        // Write the date check condition here and return the array
        // of todo items that are due today accordingly.
        duetoday = []
        const currentDate = new Date();

        const year = currentDate.getFullYear();               // Get the full year
        const month = String(currentDate.getMonth() + 1).padStart(2, '0');  // Get the month (0-11) and pad with '0'
        const day = String(currentDate.getDate()).padStart(2, '0');          // Get the day and pad with '0'

        const formattedDate = `${year}-${month}-${day}`;     // Combine to get YYYY-MM-DD format


        let today = formattedDate.replace(/-/g, "")


        all.forEach(element => {
            let duedate = element.dueDate.replace(/-/g, "")
            if ((duedate - today) == 0) {
                duetoday.push(element)
            }
        });
        return duetoday
    }

    const dueLater = () => {
        // Write the date check condition here and return the array
        // of todo items that are due later accordingly.
        duelater = []
        const currentDate = new Date();

        const year = currentDate.getFullYear();               // Get the full year
        const month = String(currentDate.getMonth() + 1).padStart(2, '0');  // Get the month (0-11) and pad with '0'
        const day = String(currentDate.getDate()).padStart(2, '0');          // Get the day and pad with '0'

        const formattedDate = `${year}-${month}-${day}`;     // Combine to get YYYY-MM-DD format


        let today = formattedDate.replace(/-/g, "")


        all.forEach(element => {
            let duedate = element.dueDate.replace(/-/g, "")
            if ((duedate - today) > 0) {
                duelater.push(element)
            }
        });
        return duelater;
    }

    const toDisplayableList = (list) => {
        const currentDate = new Date();
        const year = currentDate.getFullYear();
        const month = String(currentDate.getMonth() + 1).padStart(2, '0');
        const day = String(currentDate.getDate()).padStart(2, '0');
        const formattedDate = `${year}-${month}-${day}`;
        let displayableList = "";

        list.forEach((element, index) => {
            let status = element.completed ? "[x]" : "[ ]";
            if (element.dueDate === formattedDate) {
                displayableList += `${status} ${element.title}\n`;
            } else {
                displayableList += `${status} ${element.title} ${element.dueDate}\n`;
            }
        });
        return displayableList.trim();
    };

    return {
        all,
        add,
        markAsComplete,
        overdue,
        dueToday,
        dueLater,
        toDisplayableList
    };
};

// ####################################### #
// DO NOT CHANGE ANYTHING BELOW THIS LINE. #
// ####################################### #

const todos = todoList();

const formattedDate = d => {
    return d.toISOString().split("T")[0]
}

var dateToday = new Date()
const today = formattedDate(dateToday)
const yesterday = formattedDate(
    new Date(new Date().setDate(dateToday.getDate() - 1))
)
const tomorrow = formattedDate(
    new Date(new Date().setDate(dateToday.getDate() + 1))
)

todos.add({ title: 'Submit assignment', dueDate: yesterday, completed: false })
todos.add({ title: 'Pay rent', dueDate: today, completed: true })
todos.add({ title: 'Service Vehicle', dueDate: today, completed: false })
todos.add({ title: 'File taxes', dueDate: tomorrow, completed: false })
todos.add({ title: 'Pay electric bill', dueDate: tomorrow, completed: false })

console.log("My Todo-list\n")

console.log("Overdue")
var overdues = todos.overdue()
var formattedOverdues = todos.toDisplayableList(overdues)
console.log(formattedOverdues)
console.log("\n")

console.log("Due Today")
let itemsDueToday = todos.dueToday()
let formattedItemsDueToday = todos.toDisplayableList(itemsDueToday)
console.log(formattedItemsDueToday)
console.log("\n")

console.log("Due Later")
let itemsDueLater = todos.dueLater()
let formattedItemsDueLater = todos.toDisplayableList(itemsDueLater)
console.log(formattedItemsDueLater)
console.log("\n\n")