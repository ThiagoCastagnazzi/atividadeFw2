import { useEffect, useState } from "react";
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
  CartWrapper,
} from "./styles";
import { toast } from "react-toastify";
import { TiShoppingCart } from "react-icons/ti";
import { useCart } from "../../context/cartContext";
import ShoppingCartModal from "../ShoppingCartModal";
import UserModal from "../UserModal";

const Header = (): JSX.Element => {
  const [isUserModalOpen, setIsUserModalOpen] = useState(false);
  const [isShoppingModalOpen, setIsShoppingModalOpen] = useState(false);

  const { cart } = useCart();

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
    <>
      <HeaderContainer>
        <Logo>
          <Link to="/" style={{ color: "#fff", textDecoration: "none" }}>
            TADS
          </Link>
        </Logo>

        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "12px",
          }}
        >
          <CartWrapper
            onClick={() => setIsShoppingModalOpen(!isShoppingModalOpen)}
          >
            <TiShoppingCart size={36} />

            <span>{cart.length}</span>
          </CartWrapper>

          {currentUser ? (
            <UserInfo>
              <div onClick={toggleDropdown}>
                <p>{currentUser.email}</p>
                {dropdownOpen && (
                  <DropdownMenu>
                    <ul>
                      <li
                        onClick={() => {
                          setIsUserModalOpen(true);
                          setDropdownOpen(false);
                        }}
                      >
                        <span>Meus Dados</span>
                      </li>
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
        </div>

        {isShoppingModalOpen && <ShoppingCartModal />}

        {isUserModalOpen && (
          <UserModal closeModal={() => setIsUserModalOpen(false)} />
        )}
      </HeaderContainer>
    </>
  );
};

export default Header;
