import styled from "styled-components";

const ModalWrapper = styled.div`
  position: absolute;
  top: 120px;
  right: 70px;
  transform: translate(-50%, -50%);
  background-color: #fff;
  padding: 10px;
  border: 1px solid #ccc;
  max-width: 450px;
  width: 100%;
  height: 100px;
  overflow-y: auto;
  z-index: 2;
  border-radius: 8px;
`;

const ProductList = styled.ul`
  list-style-type: none;
  padding: 0;
`;

const ProductItem = styled.li`
  display: flex;
  align-items: center;
  margin-bottom: 10px;

  img {
    width: 50px;
    height: 50px;
    object-fit: cover;
    margin-right: 10px;
  }

  p {
    color: #333;
    text-overflow: ellipsis;
    overflow: hidden;
    white-space: nowrap;
    width: 200px;
  }

  span {
    color: #333;
  }

  strong {
    color: #333;
    margin: 0 10px;
  }
`;

const Button = styled.button`
  border: none;
  background-color: transparent;
  cursor: pointer;
`;

export { ModalWrapper, ProductList, ProductItem, Button };
