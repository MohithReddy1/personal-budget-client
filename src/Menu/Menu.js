import { Link } from "react-router-dom";
import { useAuth } from "../AuthContext";
import { LogoutPage } from "../LogoutPage/LogoutPage";

function Menu(){
  const { isLoggedIn, logout } = useAuth();
  const handlelogout = () => {
    
    logout();
    
    localStorage.removeItem("userData");
    localStorage.removeItem("token");
    localStorage.removeItem('expirationTime');
  };
  return (
    <div>
      <nav>
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>

          {isLoggedIn ? (
            <>
            <li>
                <Link to="/budget-table">Add/View Data</Link>
              </li>
              <li></li>
              <li>
                <Link to="/visualization">Dashboard</Link>
              </li>
              <li>
                <Link to="/login" onClick={handlelogout}>
                  Logout
                </Link>
              </li>
            </>
          ) : (
            <>
              <li>
                <Link to="/login">Login</Link>
              </li>
              <li>
                <Link to="/signup">Signup</Link>
              </li>
            </>
          )}
        </ul>
      </nav>
    </div>
  );
}

export default Menu;
