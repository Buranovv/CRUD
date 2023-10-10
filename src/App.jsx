import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import HomePage from "./pages/HomePage";
import { useState } from "react";
import { TOKEN } from "./const";
import ProductsPage from "./pages/ProductsPage";

function App() {
  const [isLogin, setIsLogin] = useState(
    localStorage.getItem(TOKEN) ? true : false
  );
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path=""
          element={isLogin ? <HomePage /> : <Navigate to="/login" />}
        />
        <Route path="/:categoryId" element={<ProductsPage />} />
        <Route
          path="login"
          element={
            isLogin ? (
              <Navigate to="/" />
            ) : (
              <LoginPage setIsLogin={setIsLogin} />
            )
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
