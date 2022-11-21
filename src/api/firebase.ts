import { initializeApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider, onAuthStateChanged, signInWithPopup, signOut, User } from 'firebase/auth';
import { get, getDatabase, ref } from 'firebase/database';

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
