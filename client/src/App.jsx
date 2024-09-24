import { RouterProvider, createBrowserRouter } from "react-router-dom";
import "./style.css"
import Registration from "./component/FormReg";
import Main from "./component/MainPage";
import MainPage from "./component/MainPage";
import ProjectAdd from "./component/ProgectAdd";
import DocumentList from "./component/DocumentList";
import ProjectsWithAssignments from "./component/test";



const router = createBrowserRouter([
  {
      path: '/',
      element: <MainPage/>,
  },
  {
      path: '/registration',
      element: <Registration />,
  },
  {
    path: '/taskAdd',
    element: <ProjectAdd />,
},
  {
    path: '/DocumentList',
    element: <DocumentList />,
},

]);

const App = () => {
  return <RouterProvider router={router} />;
};

export default App;