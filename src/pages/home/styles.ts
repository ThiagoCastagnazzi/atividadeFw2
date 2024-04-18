import styled from "styled-components";

const Container = styled.div`
  max-width: 1200px;
  margin: 50px auto;
  border-radius: 4px;
  box-shadow: 0 0 20px rgba(0, 0, 0, 0.1);

  h1 {
    font-size: 20px;
    display: flex;
    flex-direction: row;
    align-items: center;

    svg {
      margin-right: 10px;
    }
  }
`;

const ProductList = styled.ul`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-gap: 20px;
  list-style: none;

  a {
    display: flex;
    flex-direction: column;
    align-items: center;
    background: #fff;
    border-radius: 4px;
    padding: 20px;
    text-decoration: none;
    position: relative;

    img {
      align-self: center;
      width: 250px;
      height: 250px;
    }

    > strong {
      font-size: 16px;
      line-height: 20px;
      color: #333;
      margin-top: 5px;
      height: 50px;
    }

    > span {
      font-size: 21px;
      font-weight: bold;
      margin: 5px 0 20px;
    }
  }
`;

const FavoriteButton = styled.button`
  position: absolute;
  top: 10px;
  right: 10px;
  background-color: black;
  display: flex;
  justify-content: center;
  align-items: center;
  transition: background-color 0.3s ease-in-out;
  border: none;
  border-radius: 50%;
  width: 40px;
  height: 40px;
  cursor: pointer;

  svg {
    color: white;
    transition: color 0.3s ease-in-out;

    &:hover {
      color: red;
    }
  }
`;

const AddCartButton = styled.button`
  width: 220px;
  height: 44px;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 8px;
  background-color: #0078FF;
  color: #fff;
  outline: none;
  border: none;
  transition: ease-in-out 0.3s;
  cursor: pointer;

  &:hover {
    background-color: #024289;
    transition: ease-in-out 0.3s;
  }
`;

export { Container, ProductList, FavoriteButton, AddCartButton };
