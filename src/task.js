export default function task(name) {
    let index = 0;
    let description = "";
    let dueDate = new Date();

    return {
        name,
        index,
        description,
        dueDate
    };
}