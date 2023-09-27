
import ReactDOM from 'react-dom/client'
import './main.scss'
import './tailwind.css'
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import TwitchChatBot from './components/TwitchChatBot/TwitchChatBot.tsx';
import Credits from './components/Credits/Credits.tsx';
import Credentials from './components/Credentials/Credentials.tsx';
import AuthRedirect from './components/Credentials/AuthRedirect.tsx';
import { Theme } from 'react-daisyui';
import Login from './components/Login/Login.tsx';
import RefreshToken from './components/Credentials/RefreshToken.tsx';

const router = createBrowserRouter([
  {
    path: "/",
    element: <Credentials />,
  },
  {
    path: "/chatbot",
    element: <TwitchChatBot />,
  },
  {
    path: "/credits",
    element: <Credits />,
  },
  {
    path: "/api/v1/twitch/auth",
    element: <AuthRedirect />,
  },
  {
    path: "/api/v1/twitch/validateToken",
    element: <RefreshToken />,
  },
  {
    path: "/login",
    element: <Login />,
  }
]);
ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <Theme dataTheme='synthwave'>
    <RouterProvider router={router} />
  </Theme>
)
