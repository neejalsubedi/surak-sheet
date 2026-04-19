import { createBrowserRouter, RouterProvider } from "react-router-dom";

import Login from "./core/public/login/Login.tsx";
import Register from "./core/public/login/Register.tsx";

// Dummy pages (replace with your real components)
const Home = () => {
    return (
        <section id="center">
            <h1>Home Page</h1>
            <p>Welcome to your app 🚀</p>
        </section>
    );
};



// Router config
const router = createBrowserRouter([
    {
        path: "/",
        element: <Home />,
    },
    {
        path: "/login",
        element: <Login />,
    },
    {
        path: "/register",
        element: <Register />,
    },
]);

function App() {
    return <RouterProvider router={router} />;
}

export default App;