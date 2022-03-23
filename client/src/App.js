import './App.css';
import Registerpage from './pages/RegisterPage/Registerpage';
import LoginPage from './pages/LoginPage/LoginPage';
import TodoPage from './pages/TodoPage/TodoPage';
import UpdateTodo from './pages/UpdateTodo.js/UpdateTodo';
import ErrorPage from './pages/ErrorPage/ErrorPage';
import { BrowserRouter, Routes, Route } from "react-router-dom"

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Registerpage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/todos/:id" element={<TodoPage />} />
        <Route path="/todos/:id/update" element={<UpdateTodo />} />
        <Route path="*" element={<ErrorPage />} />
      </Routes>
      <footer style={{
        textAlign: "center",
      }}>
        Made by <a href="https://github.com//ayush-gupta-01/" target="_blank">Ayush Gupta</a>
      </footer>
      <br />
    </BrowserRouter>
  );
}

export default App;
