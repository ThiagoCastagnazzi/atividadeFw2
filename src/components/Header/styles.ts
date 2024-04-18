import styled from "styled-components";

const HeaderContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20px 115px;
  background-color: #333;
  color: #fff;
`;

const Logo = styled.div`
  a {
    margin: 0;
    font-size: 24px;
  }
`;

const CartWrapper = styled.div`
  position: relative;

  span {
    position: absolute;
    top: 0;
    right: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 15px;
    height: 15px;
    border-radius: 15px;
    background-color: red;
    color: white;
    text-align: center;
    font-size: 10px;
  }
`;

const UserInfo = styled.div`
  position: relative;
  cursor: pointer;
  background-color: #fff;
  color: #333;
  border-radius: 8px;
  padding: 8px 16px;
`;

const AccessButton = styled.div`
  button {
    padding: 8px 16px;
    background-color: #007bff;
    color: #fff;
    border: none;
    cursor: pointer;
    font-size: 16px;
    border-radius: 8px;
  }

  button:hover {
    background-color: #0056b3;
  }
`;

const DropdownMenu = styled.div`
  position: absolute;
  top: calc(100% + 10px);
  right: 0;
  background-color: #fff;
  color: #333;
  border-radius: 8px;
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.1);
  padding: 8px 0;
  z-index: 1;

  ul {
    list-style: none;
    padding: 0;
    margin: 0;
  }

  li {
    padding: 8px 16px;
  }

  button {
    background-color: transparent;
    color: #333;
    border: none;
    cursor: pointer;
    font-size: 16px;
  }

  button:hover {
    text-decoration: underline;
  }

  a {
    color: #333;
    text-decoration: none;
  }

  a:hover {
    text-decoration: underline;
  }
`;

export { HeaderContainer, Logo, UserInfo, AccessButton, DropdownMenu, CartWrapper };
