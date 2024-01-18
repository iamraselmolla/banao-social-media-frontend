import logo from './logo.svg';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Home from './Componenets/Header/page/home/Home';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Layout from './Componenets/Layout';
import Register from './Componenets/Register/Register';
import Login from './Componenets/Login/Login';
import { Toaster } from 'react-hot-toast';
import ForgetPass from './Componenets/ForgetPassword/ForgetPass';

function App() {
  const router = createBrowserRouter([
    {
      path: '/',
      element: <Layout></Layout>,
      children: [
        {
          path: '/',
          element: <Home></Home>
        },
        {
          path: '/register',
          element: <Register></Register>
        },
        {
          path: '/login',
          element: <Login></Login>
        },
        {
          path: '/forget-password',
          element: <ForgetPass></ForgetPass>
        }
      ]

    }
  ])
  return (
    <div className="App">
      <RouterProvider router={router}></RouterProvider>
      <Toaster />
    </div>
  );
}

export default App;
