import React from 'react';

import { useProducts } from '../hooks/useProducts';
import { isError } from '../util';
import ProductCard from './product-card';

interface Props {}

const Products: React.FC<Props> = () => {
  const {
    productsQuery: { isLoading, error, data: products },
  } = useProducts();

  return (
    <>
      {isLoading ? <p>Loading...</p> : null}
      {isError(error) ? <div>An error occurred: {error.message}</div> : null}
      <ul className="grid grid-cols-1 md:grid-cols-3 lg-grid-cols-4 gap-4 p-4">
        {products?.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </ul>
    </>
  );
};

export default Products;
