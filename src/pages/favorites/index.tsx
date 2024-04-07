import { useState, useEffect } from "react";
import {
  getFirestore,
  collection,
  query,
  getDocs,
  deleteDoc,
  where,
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
  isFavorite?: boolean;
}

interface ProductFormatted extends Product {
  priceFormatted: string;
  isFavorite: boolean;
}

const Favorites = (): JSX.Element => {
  const db = getFirestore();
  const [favoriteProducts, setFavoriteProducts] = useState<ProductFormatted[]>(
    []
  );

  useEffect(() => {
    async function loadFavorites() {
      const q = query(collection(db, "favorites"));
      const querySnapshot = await getDocs(q);
      const favoriteProductsData = querySnapshot.docs.map(
        (doc) => doc.data() as Product
      );
      const formattedFavoriteProducts = favoriteProductsData.map((product) => ({
        ...product,
        isFavorite: true,
      })) as ProductFormatted[];
      setFavoriteProducts(formattedFavoriteProducts);
    }
    loadFavorites();
  }, [db]);

  const handleToggleFavorite = async (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>,
    product: Product
  ) => {
    event.preventDefault();
    try {
      if (product.isFavorite) {
        const q = query(
          collection(db, "favorites"),
          where("id", "==", product.id)
        );
        const querySnapshot = await getDocs(q);
        querySnapshot.forEach(async (doc) => {
          await deleteDoc(doc.ref);
        });
        setFavoriteProducts(
          favoriteProducts.filter(
            (favoriteProduct) => favoriteProduct.id !== product.id
          )
        );

        toast.success("Produto removido dos favoritos!");
      } else {
        const formattedProduct = {
          ...product,
          isFavorite: true,
        } as ProductFormatted;
        setFavoriteProducts([...favoriteProducts, formattedProduct]);
      }
    } catch (error) {
      console.error("Erro ao remover produto dos favoritos:", error);
      toast.error("Erro ao remover produto dos favoritos!");
    }
  };

  return (
    <>
      <Header />

      <Container>
        <ProductList>
          {favoriteProducts.map((product) => (
            <a key={product.id} href={`/product/${product.id}`}>
              <img src={product.image} alt={product.title} />
              <strong>{product.title}</strong>
              <span>{product.priceFormatted}</span>
              <FavoriteButton
                className="favorite-button"
                onClick={(event) => handleToggleFavorite(event, product)}
              >
                <FaHeart size={20} color="red" />
              </FavoriteButton>
            </a>
          ))}
        </ProductList>
      </Container>
    </>
  );
};

export default Favorites;
