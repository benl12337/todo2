export default function task(name, date) {
    let index = null;
    let description = "";
    let dueDate = date == '' || date === null ? "None" : date;

    return {
        name,
        index,
        description,
        dueDate
    };
}