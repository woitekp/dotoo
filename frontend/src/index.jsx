import ReactDOM from "react-dom/client";
import App from "./App";
import AuthProvider from "@/context/auth/AuthProvider";
import DateProvider from "@/context/date/DateProvider";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <DateProvider>
    <AuthProvider>
      <App />
    </AuthProvider>
  </DateProvider>,
);
