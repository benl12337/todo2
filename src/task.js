export default function task(name, date) {
    let index = null;
    let description = "";
    let dueDate = date == '' || date === null ? "No due date" : date;

    return {
        name,
        index,
        description,
        dueDate
    };
}