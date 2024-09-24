import mysql from "mysql";
import cors from "cors";
import express from "express";

const app = express();
app.use(cors());
app.use(express.json());
const port = 3000;
app.listen(port, () => console.log("Сервер запущен"));
const db = mysql.createConnection({
  host: "localhost",
  user: "maksem",
  password: "3072",
  database: "pm",
});
// app.get("/projects", (req, res) => {
//     db.query("SELECT * FROM projects",(error,result)=>{
//         if (error) res.json(error)
//         else res.json(result)
//     })
// });

app.get("/projects", async (req, res) => {
  try {
    const projects = await new Promise((resolve, reject) => {
      db.query("SELECT * FROM projects", (error, projectsResult) => {
        if (error) {
          reject(error);
        } else {
          resolve(projectsResult);
        }
      });
    });

    const statuses = await new Promise((resolve, reject) => {
      db.query("SELECT * FROM statuses", (error, statusesResult) => {
        if (error) {
          reject(error);
        } else {
          resolve(statusesResult);
        }
      });
    });

    for (let project of projects) {
      const status = statuses.find((status) => status.id === project.status);
      if (status) {
        project.status = status.name;
      }

      const tasks = await new Promise((resolve, reject) => {
        db.query(
          "SELECT * FROM tasks WHERE project = ?",
          [project.id],
          (error, tasksResult) => {
            if (error) {
              reject(error);
            } else {
              resolve(tasksResult);
            }
          }
        );
      });

      project.tasks = tasks;
    }

    res.json(projects);
  } catch (error) {
    res.json(error);
  }
});

app.post("/registration", (req, res) => {
  const { name, password } = req.body;
  db.query("SELECT * FROM users WHERE name = ?", [name], (error, result) => {
    if (error) res.json(error);
    else {
      if (!result[0]) {
        res.json({ password: false });
      } else {
        const user = result[0];
        if (user.password == password) {
          res.json({ password: true });
        } else {
          res.json({ password: false });
        }
      }
    }
  });
});
app.put("/createProject", (req, res) => {
  const { name, description, date, status } = req.body;
  db.query(
    "INSERT INTO `pm`.`projects` ( `name`, `description`, `date`, `status`) VALUES (?, ?, ?, ?);",
    [name, description, date, status],
    (error, result) => {
      if (!error) {
        res.json("Yes");
      }
    }
  );
});
app.delete('/deleteProject/:id', (req, res) => {
    const ProjectId = req.params.id;
    db.query('DELETE FROM projects WHERE id = ?', [ProjectId], (error, result) => {
        if (error) res.json(error);
        else {
            res.json('Yes');
        }
    });
});
app.get('/statuses', (req, res) => {
    db.query('SELECT * FROM statuses', (error, result) => {
        if (error) res.json(error);
        else {
            res.json(result);
        }
    });
});

// код сам
// app.put("/createEmployees", (req, res) => {
//   const { fio, emale, phone } = req.body;
//   db.query(
//     "INSERT INTO `pm`.`Employees` ( `fio`, `emale`, `phone`) VALUES (?, ?, ?);",
//     [fio, emale, phone],
//     (error, result) => {
//       if (!error) {
//         res.json("Yes");
//       }
//     }
//   );
// });
// app.delete('/deleteEmployees/:id', (req, res) => {
//     const EmployeesId = req.params.id;
//     db.query('DELETE FROM employees WHERE id = ?', [EmployeesId], (error, result) => {
//         if (error) res.json(error);
//         else {
//             res.json('Yes');
//         }
//     });
// });


