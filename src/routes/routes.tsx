import SignIn from "@/pages/Authentication/SignIn";
import SignUp from "@/pages/Authentication/SignUp";
import LaserText from "@/pages/Main/LaserText";


const routes = [
    { path: "/app/auth/sign-in", element: <SignIn /> },
    { path: "/Join", element: <SignUp /> },
    { path: "/", element: <LaserText /> },
];

export default routes;