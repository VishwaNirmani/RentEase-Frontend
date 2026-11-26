import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/useAuth";

function LogoutButton({ className = "", redirectTo = "/login" }) {
  const { logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate(redirectTo, { replace: true });
  };

  return (
    <button
      type="button"
      onClick={handleLogout}
      className={className}
    >
      Sign Out
    </button>
  );
}

export default LogoutButton;
