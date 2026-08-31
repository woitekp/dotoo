import LogoutIcon from "@mui/icons-material/Logout";
import useAuth from "@/context/auth/useAuth";

function LogoutButton() {
  const { user, logout } = useAuth();

  if (!user) return null;

  return (
    <button
      type="button"
      className="logout-button"
      onClick={logout}
    >
      <LogoutIcon fontSize="small" />
    </button>
  );
}

export default LogoutButton;
