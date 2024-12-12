import { createBrowserRouter, Navigate, RouterProvider } from "react-router-dom"
import './App.css'
import Auth from './pages/Auth'
import Dashboard from './pages/Dashboard'
import ERDiagram from './pages/ERDiagram'
import UserFlow from './pages/UserFlow'

function App() {

  const routes = [

    {
      path: "/",
      element: <Navigate to="/login"/> ,
    },
    {
      path: "/login",
      element: <Auth />
    },
    {
      path:"/dashboard",
      element: <Dashboard />,
    },
    {
      path:"/erdiagram", //doubt : any convention to be used ? 
      element: <ERDiagram />,
    },
    {
      path:"/userflow",
      element: <UserFlow />,
    },
  ];
  const router = createBrowserRouter(routes);

  return (
    <>
      <RouterProvider router={router}/>
    </>
  )
}

export default App
