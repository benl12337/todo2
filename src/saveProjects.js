export default function saveProjects(project) {
    localStorage.setItem("projects", JSON.stringify(project));
}