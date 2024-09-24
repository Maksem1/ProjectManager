import { useEffect, useState } from "react";
import ProjectList from "./ProjectList";
import axios from "axios";
import Menu from "./Menu";

const MainPage = () => {
  
  const [projects, setProjects] = useState([
    {
      id: 2,
      name: "test",
      description: "reer",
      date: "2000-04-23T20:00:00.000Z",
      status: "В процесе",
      tasks: [
        { id: 2, description: "task2", project: 2, name: "rer" },
        { id: 3, description: "task3", project: 2, name: "rty" },
      ],
    },
  ]);
  const deleteProject = async (dProject) => {
    
    const res = await axios.delete(`http://localhost:3000/deleteProject/${dProject.id}`);
    setProjects([...projects.filter((project) => project != dProject)]);
};
  useEffect(() => {
    const getProjects = async () => {
      const res = await axios.get("http://localhost:3000/projects");
      setProjects(res.data);
    };
    getProjects();
    
  }, []);

  return (
    <div className="main">
      <Menu />
      <p className="body_title">добро пожаловать на лист проектов</p>
      <div className="body">
        
        <ProjectList deleteProject={ deleteProject }projects={projects}></ProjectList>
        
      </div>
    </div>
  );
};
export default MainPage;
