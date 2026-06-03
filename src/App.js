import React from "react";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Home from "./components/Home";
import Login from "./components/Login";
import SearchExample from "./components/examples/Search";
import RaceExample from "./components/examples/Race";
import PollingExample from "./components/examples/Polling";
import ForkCancelExample from "./components/examples/ForkCancel";
import ChannelExample from "./components/examples/Channel";

const router = createBrowserRouter([
  { path: "/", element: <Home /> },
  { path: "/login", element: <Login /> },
  { path: "/examples/search", element: <SearchExample /> },
  { path: "/examples/race", element: <RaceExample /> },
  { path: "/examples/polling", element: <PollingExample /> },
  { path: "/examples/fork-cancel", element: <ForkCancelExample /> },
  { path: "/examples/channel", element: <ChannelExample /> },
]);

const App = () => <RouterProvider router={router} />;

export default App;
