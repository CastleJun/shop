import React, { useState } from 'react';

import { addNewProduct } from '../api/firebase';
import { uploadImage } from '../api/uploader';
import Button from '../components/base-component/button';

interface Props {}

interface Product {
  title?: string;
  price?: number;
  category?: string;
  description?: string;
  options?: string[];
}

const NewProduct: React.FC<Props> = () => {
  const [product, setProduct] = useState<Product>({});
  const [file, setFile] = useState<unknown>(undefined);
  const [isUploading, setIsUploading] = useState<boolean>(false);
  const [success, setSuccess] = useState<string | null>(null);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, files } = event.target as HTMLInputElement;

    if (name === 'file') {
      setFile(files && files[0]);
      return;
    }

    setProduct((product) => {
      return { ...product, [name]: value };
    });
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsUploading(true);

    try {
      const { url } = await uploadImage(file as Blob);
      await addNewProduct(product, url);
      await setSuccess('성공적으로 제품이 추가되었습니다.');

      await setTimeout(() => {
        setSuccess(null);
      }, 4000);
    } catch (error) {
      console.error(error);
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <section className="w-full text-center">
      <h2 className="text-2xl font-bold my-4">새로운 제품 등록</h2>
      {success && <p className="my-2">✅ {success}</p>}
      {file ? <img className="w-96 mx-auto mb-2" src={URL.createObjectURL(file as Blob)} alt="local" /> : null}
      <form className="flex flex-col px-12" onSubmit={handleSubmit}>
        <input type="file" accept="image/*" name="file" required onChange={handleChange} />
        <input
          type="text"
          name="title"
          value={product?.title ?? ''}
          placeholder="제품명"
          required
          onChange={handleChange}
        />
        <input
          type="text"
          name="price"
          value={product?.price ?? ''}
          placeholder="가격"
          required
          onChange={handleChange}
        />
        <input
          type="text"
          name="category"
          value={product?.category ?? ''}
          placeholder="카테고리"
          required
          onChange={handleChange}
        />
        <input
          type="text"
          name="description"
          value={product?.description ?? ''}
          placeholder="제품 설명"
          required
          onChange={handleChange}
        />
        <input
          type="text"
          name="options"
          value={product?.options ?? ''}
          placeholder="옵션([,])"
          required
          onChange={handleChange}
        />
        <Button type="submit" text={isUploading ? '업로드중...' : '제품 등록하기'} disabled={isUploading} />
      </form>
    </section>
  );
};

export default NewProduct;
