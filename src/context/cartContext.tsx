import { createContext, ReactNode,  useContext,  useState } from 'react';
import { toast } from 'react-toastify';

interface CartProviderProps {
  children: ReactNode;
}

interface CartContextData {
  cart: any[];
  addProduct: (productId: number) => Promise<void>;
  removeProduct: (productId: number) => void;
  clearCart: () => void;
}

const CartContext = createContext<CartContextData>({} as CartContextData);

export function CartProvider({ children }: CartProviderProps): JSX.Element {
  const [cart, setCart] = useState<any[]>(() => {
    const storagedCart = localStorage.getItem('@tads:cart');

    if (storagedCart) {
      return JSON.parse(storagedCart);
    }

    return [];
  });

  const addProduct = async (productId: number) => {
    try {
      const updatedCart = [...cart];
      const productExists = updatedCart.find(product => product.id === productId);

      const currentAmount = productExists ? productExists.amount : 0;
      const amount = currentAmount + 1;


      if (productExists) {
        productExists.amount = amount;
      } else {
        const response = await fetch(`https://fakestoreapi.com/products/${productId}`);
        const product = await response.json();

        const newProduct = {
          ...product,
          amount: 1
        }

        updatedCart.push(newProduct);
      }

      setCart(updatedCart);
      localStorage.setItem('@tads:cart', JSON.stringify(updatedCart));

      toast.success('Produto adicionado ao carrinho')
    } catch {
      toast.error('Erro na adição do produto');
    }
  };

  const removeProduct = (productId: number) => {
    try {
      const updatedCart = [...cart];
      const productIndex = updatedCart.findIndex(product => product.id === productId);

      if (productIndex >= 0) {
        updatedCart.splice(productIndex, 1);
        setCart(updatedCart);
        localStorage.setItem('@tads:cart', JSON.stringify(updatedCart));
      } else {
        throw Error();
      }
    } catch {
      toast.error('Erro na remoção do produto');
    }
  };

  const clearCart = () => {
    setCart([]);
    localStorage.removeItem('@tads:cart');
    toast.success('Pedido Realizado com Sucesso!');
  }

  return (
    <CartContext.Provider
      value={{ cart, addProduct, removeProduct, clearCart }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart(): CartContextData {
    const context = useContext(CartContext);

    return context;
  }
