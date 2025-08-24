import './App.css'
import Navbar from '../components/Navbar'
import Home from '../components/Home'
import { createBrowserRouter, RouterProvider, Outlet } from 'react-router-dom';

// Layout component to keep Navbar visible on all routes
function Layout() {
  return (
    <div className="h-screen w-full">
      <Navbar />
      <Outlet /> {/* renders the matched child route */}
    </div>
  );
}

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Layout />, // Always renders Navbar
      children: [
        {
          path: "home",
          element: <Home />,
        },
        // add more routes here later
      ],
    },
  ]);

  return <RouterProvider router={router} />;
}

export default App;
