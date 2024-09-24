import React, { useState, useEffect } from 'react';
import axios from 'axios';

const ProjectsWithAssignments = () => {
  const [projects, setProjects] = useState([]);
  const [employees, setEmployees] = useState([]);
  const [clients, setClients] = useState([]);
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [date, setDate] = useState('');
  const [status, setStatus] = useState('');
  const [selectedEmployees, setSelectedEmployees] = useState([]);
  const [selectedClients, setSelectedClients] = useState([]);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const projectsResponse = await axios.get('http://localhost:3000/projects');
        const employeesResponse = await axios.get('http://localhost:3000/employees');
        const clientsResponse = await axios.get('http://localhost:3000/clients');
        setProjects(projectsResponse.data);
        setEmployees(employeesResponse.data);
        setClients(clientsResponse.data);
      } catch (err) {
        setError(err.message);
      }
    };

    fetchData();
  }, []);

  const handleCreateProject = async (e) => {
    e.preventDefault();
    try {
      const projectResponse = await axios.post('http://localhost:3000/projects', {
        name,
        description,
        date,
        status,
      });

      const projectId = projectResponse.data.id;

      await axios.post(`http://localhost:3000/projects/${projectId}/employees`, {
        employees: selectedEmployees,
      });

      await axios.post(`http://localhost:3000/projects/${projectId}/clients`, {
        clients: selectedClients,
      });

      setSuccess('Project created and assigned successfully');
      setName('');
      setDescription('');
      setDate('');
      setStatus('');
      setSelectedEmployees([]);
      setSelectedClients([]);
      setError(null);

      // Fetch projects again to update the list
      const projectsResponse = await axios.get('http://localhost:3000/projects');
      setProjects(projectsResponse.data);
    } catch (err) {
      setError(err.message);
      setSuccess(null);
    }
  };

  return (
    <div>
      <h1>Projects</h1>
      <form onSubmit={handleCreateProject}>
        <div>
          <label>Name:</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <div>
          <label>Description:</label>
          <input
            type="text"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>
        <div>
          <label>Date:</label>
          <input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
          />
        </div>
        <div>
          <label>Status:</label>
          <input
            type="text"
            value={status}
            onChange={(e) => setStatus(e.target.value)}
          />
        </div>
        <div>
          <label>Assign Employees:</label>
          <select
            multiple
            value={selectedEmployees}
            onChange={(e) => setSelectedEmployees(Array.from(e.target.selectedOptions, option => option.value))}
          >
            {employees.map(employee => (
              <option key={employee.employee_id} value={employee.employee_id}>
                {employee.name}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label>Assign Clients:</label>
          <select
            multiple
            value={selectedClients}
            onChange={(e) => setSelectedClients(Array.from(e.target.selectedOptions, option => option.value))}
          >
            {clients.map(client => (
              <option key={client.client_id} value={client.client_id}>
                {client.contact_person}
              </option>
            ))}
          </select>
        </div>
        <button type="submit">Create Project</button>
      </form>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      {success && <p style={{ color: 'green' }}>{success}</p>}
      <ul>
        {projects.map(project => (
          <li key={project.id}>
            <h2>{project.name}</h2>
            <p>{project.description}</p>
            <p>Date: {project.date}</p>
            <p>Status: {project.status}</p>
            {/* You might want to add logic to fetch and display assigned employees and clients */}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ProjectsWithAssignments;