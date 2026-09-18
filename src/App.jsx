import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import MainPage from "@/pages/MainPage";
import LoginPage from "@/pages/LoginPage";
import RequireAuth from "@/routes/RequireAuth";
import RequireGuest from "@/routes/RequireGuest";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<RequireAuth />}>
          <Route path="/" element={<MainPage />} />
        </Route>

        <Route element={<RequireGuest />}>
          <Route path="/login" element={<LoginPage />} />
        </Route>

        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
