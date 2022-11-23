import React from 'react';

import Banner from '../components/banner';
import Products from '../components/products';

interface Props {}

const Home: React.FC<Props> = () => {
  return (
    <section>
      <Banner />
      <Products />
    </section>
  );
};

export default Home;
