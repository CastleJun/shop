import { initializeApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider, onAuthStateChanged, signInWithPopup, signOut, User } from 'firebase/auth';
import { get, getDatabase, ref, remove, set } from 'firebase/database';
import { v4 as uuid } from 'uuid';

export interface Product {
  id: string;
  image: string;
  title: string;
  category?: string;
  price: number;
  description?: string;
  options?: string[];
  option?: string;
  quantity: number;
}

const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
  databaseURL: process.env.REACT_APP_FIREBASE_DB_URL,
  projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
};

const app = initializeApp(firebaseConfig);

const provider = new GoogleAuthProvider();
const auth = getAuth();
const database = getDatabase(app);

export const login = async () => {
  try {
    await signInWithPopup(auth, provider);
  } catch (error) {
    console.error(error);
  }
};

export const logout = async () => {
  try {
    await signOut(auth);
  } catch (error) {
    console.error(error);
  }
};

export interface AddAdminUser extends User {
  isAdmin?: boolean;
}

export const onUserStateChange = (callback: (user: User | null) => void) => {
  onAuthStateChanged(auth, async (user) => {
    const updatedUser = user ? await checkAdmin(user) : null;

    callback(updatedUser);
  });
};

const checkAdmin = async (user: User): Promise<AddAdminUser> => {
  const snapshot = await get(ref(database, 'admins'));

  if (snapshot.exists()) {
    const admins = snapshot.val();
    const isAdmin: boolean = admins.includes(user?.uid);

    return {
      ...user,
      isAdmin,
    };
  }

  return user;
};

export const addNewProduct = async (product: any, image: any) => {
  const id = uuid();
  return set(ref(database, `products/${id}`), {
    ...product,
    id,
    price: Number(product.price),
    image,
    options: product.options.split(','),
  });
};

export const getProducts = async (): Promise<Product[]> => {
  const snapshot = await get(ref(database, 'products'));

  if (snapshot.exists()) {
    return Object.values(snapshot.val());
  }

  return [];
};

export const getCart = async (userId: string): Promise<Product[]> => {
  const snapshot = await get(ref(database, `carts/${userId}`));

  if (snapshot.exists()) {
    const items = snapshot.val() || {};
    return Object.values(items);
  }

  return [];
};

export const addOrUpdateToCart = async (userId: string, product: Product) => {
  return set(ref(database, `carts/${userId}/${product.id}`), product);
};

export const removeFromCart = async (userId: string, productId: string) => {
  return remove(ref(database, `carts/${userId}/${productId}`));
};
