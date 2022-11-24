import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

import { addNewProduct, getProducts as fetchProducts } from '../api/firebase';
import { INewProduct } from '../pages/new-product';

export const useProducts = () => {
  const queryClient = useQueryClient();

  const productsQuery = useQuery(['products'], fetchProducts, {
    staleTime: 1000 * 60,
  });

  const addProduct = useMutation(
    ({ product, url }: { product: INewProduct; url: string }) => addNewProduct(product, url),
    {
      onSuccess: () => queryClient.invalidateQueries(['products']),
    }
  );

  return { productsQuery, addProduct };
};
