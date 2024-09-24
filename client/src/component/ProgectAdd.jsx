import Menu from "./Menu";
import DefaultInput from "./DefaltInput";
import DefaultButton from "./DefautButton";
import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const ProjectAdd = () => {
  const navigate = useNavigate();
  const [project, setProject] = useState({
    name: "",
    description: "",
    status: 1,
  });
  const [statuses, setStatuses] = useState([{}]);

  useEffect(() => {
    const getStatuses = async () => {
      const response = await axios.get("http://localhost:3000/statuses");
      const res = response.data;
      setStatuses(res);
    };
    getStatuses();
  }, []);

  const createProject = async () => {
    const newProject = {
      ...project,
      date: new Date().toISOString().split("T")[0],
    };
    await axios.put("http://localhost:3000/createProject", newProject);
    navigate("/");
  };
  console.log(project);

  return (
    <div className="projectAdd">
      <Menu />
      <div className="projectAdd_input">
        <DefaultInput
          value={project.name}
          onChange={(e) => setProject({ ...project, name: e.target.value })}
          placeholder="name"
        ></DefaultInput>
        <DefaultInput
          value={project.description}
          onChange={(e) =>
            setProject({ ...project, description: e.target.value })
          }
          placeholder="description"
        ></DefaultInput>
        <select
          value={project.status}
          onChange={(e) => setProject({ ...project, status: e.target.value })}
        >
          {statuses.map((status) => (
            <option key={status.id} value={status.id}>
              {status.name}
            </option>
          ))}
        </select>

        ;
        <DefaultInput placeholder="proget manager"></DefaultInput>
        <DefaultButton>добавить задачу</DefaultButton>
        <DefaultInput placeholder="employees"></DefaultInput>
        <DefaultInput placeholder="task name"></DefaultInput>
        <DefaultInput placeholder="description"></DefaultInput>
        <DefaultButton onClick={createProject}>подтвердить</DefaultButton>
      </div>
    </div>
  );
};
export default ProjectAdd;
