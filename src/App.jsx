import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { BookProvider, useBooks } from './context/BookContext';
import Header from './components/Header';
import Hero from './components/Hero';
import Catalog from './pages/Catalog';
import Favorites from './pages/Favorites';
import Library from './pages/Library';
import SignIn from './pages/SignIn';
import AuthModal from './components/AuthModal';
import './global.css';
import ResetPassword from './pages/ResetPassword';

function AppContent() {
  const { isLoginModalOpen, closeLoginModal, login, register } = useBooks();
  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<Hero />} />
        <Route path="/catalog" element={<Catalog />} />
        <Route path="/favorites" element={<Favorites />} />
        <Route path="/library" element={<Library />} />
        <Route path="/signin" element={<SignIn />} />
        <Route path="/reset-password" element={<ResetPassword />} />
      </Routes>
      <AuthModal
        isOpen={isLoginModalOpen}
        onClose={closeLoginModal}
        onLogin={login}
        onRegister={register}
      />
    </>
  );
}

function App() {
  return (
    <BrowserRouter>
      <BookProvider>
        <div className="app">
          <AppContent />
        </div>
      </BookProvider>
    </BrowserRouter>
  );
}

export default App;