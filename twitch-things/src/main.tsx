
import ReactDOM from 'react-dom/client'
import './main.scss'
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import TwitchChatBot from './TwitchChatv2.tsx';
import DonkeyKong from './DonkeyKong.tsx';
import Credits from './components/Credits/Credits.tsx';

const router = createBrowserRouter([
  {
    path: "/",
    element: <TwitchChatBot />,
  },
  {
    path: "/dk",
    element: <DonkeyKong />,
  },
  {
    path: "/credits",
    element: <Credits />,
  }

]);
ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <RouterProvider router={router} />
)
