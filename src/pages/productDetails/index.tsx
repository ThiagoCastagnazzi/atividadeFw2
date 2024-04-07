import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import {
  Container,
  ProductDetailsContainer,
  ProductImage,
  ProductInfo,
} from "./styles";
import Header from "../../components/Header";
import { FaHeart } from "react-icons/fa";
import { toast } from "react-toastify";

interface Product {
  id: number;
  title: string;
  price: number;
  image: string;
  description: string;
}

const ProductDetails = (): JSX.Element => {
  const { id } = useParams(); // Obter o parâmetro de rota dinâmica

  const [product, setProduct] = useState<Product | null>(null);

  useEffect(() => {
    async function fetchProductDetails() {
      try {
        const response = await fetch(`https://fakestoreapi.com/products/${id}`);
        const data = await response.json();
        setProduct(data);
      } catch (error) {
        console.error("Erro ao buscar detalhes do produto:", error);
        toast.error("Erro ao buscar detalhes do produto!");
      }
    }

    fetchProductDetails();
  }, [id]);

  if (!product) {
    return <p>Carregando...</p>;
  }

  return (
    <>
      <Header />
      <Container>
        <ProductDetailsContainer>
          <ProductImage src={product.image} alt={product.title} />
          <ProductInfo>
            <h2>{product.title}</h2>
            <p>{product.description}</p>
            <strong>{product.price}</strong>
            <button type="button">
              <FaHeart size={20} color="#ff0000" />
            </button>
          </ProductInfo>
        </ProductDetailsContainer>
      </Container>
    </>
  );
};

export default ProductDetails;
