import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import Footer from './components/Footer';
import Header from './components/Header';
import ProtectedRoute from './components/Helpers/ProtectedRoute';
import Home from './components/Home';
import Login from './components/Login/Login';
import User from './components/User/User';
import Photo from './components/Photo/Photo';
import { UserStorage } from './UserContext';
import UserProfile from './components/User/UserProfile';
import NotFound from './components/NotFound';

const App = () => {
  return (
    <div className="App">
      <BrowserRouter>
        <UserStorage>
          <Header />
          <main className="AppBody">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="login/*" element={<Login />} />
              <ProtectedRoute path="conta/*" element={<User />} />
              <Route path="foto/:id" element={<Photo />} />
              <Route path="perfil/:user" element={<UserProfile />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </main>
          <Footer />
        </UserStorage>
      </BrowserRouter>
    </div>
  );
};

export default App;
