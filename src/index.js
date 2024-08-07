import React from 'react';
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import './index.css';
import App from './App';
import Login from './page/Login';
import MyInfo from './page/MyInfo';
import NewStore from './page/NewStore';
import GetApiKey from './page/GetApiKey';

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      { path: "/", element: <Login /> },
      { path: "/login", element: <Login /> },
      { path: "/info", element: <MyInfo /> },
      { path: "/new", element: <NewStore /> },
      { path: "/new/key", element: <GetApiKey /> },
    ],
  },
]);
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
