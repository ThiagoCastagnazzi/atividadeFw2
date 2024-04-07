import { useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../../context/authContext";
import { signOut } from "firebase/auth";
import { auth } from "../../firebase/firebase";
import {
  AccessButton,
  HeaderContainer,
  Logo,
  UserInfo,
  DropdownMenu,
} from "./styles";
import { toast } from "react-toastify";

const Header = (): JSX.Element => {
  const { currentUser } = useAuth();
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const handleLogout = async () => {
    try {
      await signOut(auth);
      toast.success("Usuário deslogado com sucesso!");
    } catch (error) {
      console.error("Erro ao deslogar usuário:", error);
      toast.error("Erro ao deslogar usuário!");
    }
  };

  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };

  return (
    <HeaderContainer>
      <Logo>
        <Link to="/" style={{ color: "#fff", textDecoration: "none" }}>
          TADS
        </Link>
      </Logo>

      {currentUser ? (
        <UserInfo>
          <div onClick={toggleDropdown}>
            <p>{currentUser.email}</p>
            {dropdownOpen && (
              <DropdownMenu>
                <ul>
                  <li>
                    <Link to="/favorites">Favoritos</Link>
                  </li>
                  <li>
                    <button onClick={handleLogout}>Logout</button>
                  </li>
                </ul>
              </DropdownMenu>
            )}
          </div>
        </UserInfo>
      ) : (
        <AccessButton>
          <Link to="/login">
            <button>Acessar</button>
          </Link>
        </AccessButton>
      )}
    </HeaderContainer>
  );
};

export default Header;
