import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { BookProvider, useBooks } from './context/BookContext';
import Header from './components/Header';
import Hero from './components/Hero';
import Catalog from './pages/Catalog';
import Favorites from './pages/Favorites';
import Library from './pages/Library';
import SignIn from './pages/SignIn';
import Modal from './components/Modal';
import './global.css';

function AppContent() {
  const { isLoginModalOpen, closeLoginModal, login } = useBooks();
  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<Hero />} />
        <Route path="/catalog" element={<Catalog />} />
        <Route path="/favorites" element={<Favorites />} />
        <Route path="/library" element={<Library />} />
        <Route path="/signin" element={<SignIn />} />
      </Routes>
      <Modal isOpen={isLoginModalOpen} onClose={closeLoginModal} onLogin={login} />
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