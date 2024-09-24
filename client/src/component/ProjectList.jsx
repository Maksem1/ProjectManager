import Project from "./Project";

const ProjectList = ({ deleteProject, projects }) => {
  console.log(projects)
  return (
    <div className="projectList">
      {/* {projects.map((project) => (
        <h1>{project}</h1>
        // <Project deleteProject={deleteProject} key={project.id} project={project}></Project>
      ))} */}
      {projects.map((project)=> <Project deleteProject={deleteProject} key={project.id} project={project}></Project> )}
    </div>
  );
};
export default ProjectList;
