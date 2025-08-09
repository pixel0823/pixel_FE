import SignIn from "@/pages/Authentication/SignIn";
import SignUp from "@/pages/Authentication/SignUp";
import LaserText from "@/pages/Main/LaserText";
import Background from "@/pages/Main/Background";


const routes = [
    { path: "/app/auth/sign-in", element: <SignIn /> },
    { path: "/Join", element: <SignUp /> },
    { path: "/", element: <LaserText /> },
    { path: "/Main", element: <Background /> },
];

export default routes;