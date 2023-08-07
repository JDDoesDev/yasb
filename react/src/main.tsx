
import ReactDOM from 'react-dom/client'
import './main.scss'
import './tailwind.css'
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import TwitchChatBot from './components/TwitchChatBot/TwitchChatBot.tsx';
import Credits from './components/Credits/Credits.tsx';
import Credentials from './components/Credentials/Credentials.tsx';
import { Theme } from 'react-daisyui';

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
  }


]);
ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <Theme dataTheme='synthwave'>
    <RouterProvider router={router} />
  </Theme>
)
