import { useCart } from "../../context/cartContext";
import { FaTrash } from "react-icons/fa";
import { Button, ModalWrapper, ProductItem, ProductList } from "./styles";

const ShoppingCartModal = () => {
  const { addProduct, cart, removeProduct, descreaseAmount } = useCart();

  return (
    <ModalWrapper>
      <h1>Shopping Cart</h1>
      <ProductList>
        {cart.length > 0 ? (
          cart.map((product) => (
            <ProductItem key={product.id}>
              <img src={product.image} alt={product.title} />
              <p>{product.title}</p>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "10px",
                  marginLeft: "10px",
                }}
              >
                <Button onClick={() => descreaseAmount(product.id)}>
                  {"<"}
                </Button>
                <span>{product.amount}</span>
                <Button onClick={() => addProduct(product.id)}>{">"}</Button>
                <Button onClick={() => removeProduct(product.id)}>
                  <FaTrash size={18} color="#ff0000" />
                </Button>
              </div>
            </ProductItem>
          ))
        ) : (
          <h3
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              height: "100%",
              color: "#333",
            }}
          >
            Carrinho Vazio
          </h3>
        )}
      </ProductList>
    </ModalWrapper>
  );
};

export default ShoppingCartModal;
