import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

import { addOrUpdateToCart, getCart, Product, removeFromCart } from '../api/firebase';
import { useAuthContext } from '../context/auth-context';

export const useCart = () => {
  const { uid } = useAuthContext();
  const queryClient = useQueryClient();

  const cartQuery = useQuery(['carts', uid || ''], () => getCart(uid as string), {
    enabled: !!uid,
  });

  const addOrUpdateItem = useMutation((product: Product) => addOrUpdateToCart(uid as string, product), {
    onSuccess: () => {
      queryClient.invalidateQueries(['carts', uid]);
    },
  });

  const removeItem = useMutation((id: string) => removeFromCart(uid as string, id), {
    onSuccess: () => {
      queryClient.invalidateQueries(['carts', uid]);
    },
  });

  return { cartQuery, addOrUpdateItem, removeItem };
};
