const Project = ({ project,deleteProject }) => {
  const date = project.date;
  return (
    <details className="project">
      <button onClick={()=>{deleteProject(project)}} className="project_delete">delete</button>
      <summary className="project_summary">
        <div className="project_name">{project.name}</div>
        <div className="project_discription">{project.description}</div>
      </summary>
      <div>
        <div className="project_group">
          <div className="project_status">{project.status}</div>
          <div className="project_date">{date.split("T")[0]}</div>
        </div>
        <details>
          <summary className="project_task">задачи</summary>
          {project.tasks.map((task,index) => (
            <div className="project_block">
              <p className="project_task_name">{index+1}.{task.name}</p>
              <p className="project_task_description">{task.description}</p>
            </div>
          ))}
        </details>
      </div>
    </details>
  );
};
export default Project;
