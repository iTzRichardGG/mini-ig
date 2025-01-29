import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import AuthPage from './pages/AuthPage';
import HomePage from './pages/HomePage';
import ProfilePage from './pages/ProfilePage';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<HomePage />} />
        <Route path='/auth' element={<AuthPage />} />
        <Route path='/profile' element={<ProfilePage />} />
        <Route path='*' element={<Navigate to="/" />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;