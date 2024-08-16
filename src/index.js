import React from 'react';
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import './index.css';
import App from './App';
import Login from './page/Login';
import MyInfo from './page/MyInfo';
import NewStore from './page/NewStore';
import GetApiKey from './page/GetApiKey';
import CardInformation from './page/CardInformation';
import CardPay from './page/CardPay';
import CardLogin from './page/CardLogin';

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      { path: "/card-product", element:<CardInformation/>},
      { path: "/",element:<CardPay/>},
      { path: "/card",element:<CardPay/>},
      { path: "/card-login",element:<CardLogin/>},
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
