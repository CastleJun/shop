import { initializeApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider, onAuthStateChanged, signInWithPopup, signOut, User } from 'firebase/auth';
import { get, getDatabase, ref, set } from 'firebase/database';
import { v4 as uuid } from 'uuid';

export interface Products {
  id: string;
  image: string;
  title: string;
  category: string;
  price: number;
  description: string;
  options: string[];
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

export const getProducts: () => Promise<Products[]> = async () => {
  const snapshot = await get(ref(database, 'products'));

  if (snapshot.exists()) {
    return Object.values(snapshot.val());
  }

  return [];
};
