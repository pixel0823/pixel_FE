import './App.css';
import { Route, Routes } from 'react-router-dom';
import SignIn from './pages/Authentication/SignIn';
import SignUp from './pages/Authentication/SignUp';

function App() {
  return (
    <Routes>
      <Route path='/auth'>
        <Route path='sign-in' element={<SignIn />} />
        <Route path='sign-up' element={<SignUp />} />
      </Route>
    </Routes>
  );
}

export default App;
