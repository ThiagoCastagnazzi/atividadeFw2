import { useState, useEffect } from "react";
import {
  getFirestore,
  addDoc,
  collection,
  query,
  where,
  getDocs,
  deleteDoc,
} from "firebase/firestore";
import { Container, FavoriteButton, ProductList } from "./styles";
import Header from "../../components/Header";
import { FaHeart } from "react-icons/fa";
import { toast } from "react-toastify";

interface Product {
  id: number;
  title: string;
  price: number;
  image: string;
}

interface ProductFormatted extends Product {
  priceFormatted: string;
}

const Home = (): JSX.Element => {
  const db = getFirestore();
  const [products, setProducts] = useState<ProductFormatted[]>([]);
  const [favorites, setFavorites] = useState<number[]>([]);

  async function loadProducts() {
    const response = await fetch("https://fakestoreapi.com/products");
    const data = await response.json();
    setProducts(data);
  }

  async function loadFavorites() {
    const q = query(collection(db, "favorites"));
    const querySnapshot = await getDocs(q);
    const favoriteIds = querySnapshot.docs.map((doc) => doc.data().id);
    setFavorites(favoriteIds);
  }

  useEffect(() => {
    loadProducts();
    loadFavorites();
  }, [db]);

  const checkIfFavoriteExists = (productId: number) => {
    return favorites.includes(productId);
  };

  const handleToggleFavorite = async (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>,
    product: Product
  ) => {
    event.preventDefault();
    try {
      if (checkIfFavoriteExists(product.id)) {
        const q = query(
          collection(db, "favorites"),
          where("id", "==", product.id)
        );
        const querySnapshot = await getDocs(q);
        querySnapshot.forEach(async (doc) => {
          await deleteDoc(doc.ref);
        });
        toast.success("Produto removido dos favoritos!");
      } else {
        await addDoc(collection(db, "favorites"), product);
        toast.success("Produto adicionado aos favoritos!");
      }
      loadFavorites();
    } catch (error) {
      console.error("Erro ao adicionar/remover produto dos favoritos:", error);
      toast.error("Erro ao adicionar/remover produto dos favoritos!");
    }
  };

  return (
    <>
      <Header />

      <Container>
        <ProductList>
          {products.map((product) => (
            <a key={product.id} href={`/product/${product.id}`}>
              <img src={product.image} alt={product.title} />
              <strong>{product.title}</strong>
              <span>{product.priceFormatted}</span>
              <FavoriteButton
                className="favorite-button"
                onClick={(event) => handleToggleFavorite(event, product)}
              >
                <FaHeart
                  size={20}
                  color={checkIfFavoriteExists(product.id) ? "red" : "white"}
                />
              </FavoriteButton>
            </a>
          ))}
        </ProductList>
      </Container>
    </>
  );
};

export default Home;
