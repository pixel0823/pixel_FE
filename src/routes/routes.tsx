import SignIn from "@/pages/Authentication/SignIn";
import SignUp from "@/pages/Authentication/SignUp";


const routes = [
    { path: "/auth/sign-in", element: <SignIn /> },
    { path: "/Join", element: <SignUp /> },
];

export default routes;