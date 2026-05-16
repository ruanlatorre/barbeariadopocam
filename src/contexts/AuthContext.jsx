import { createContext, useContext, useEffect, useMemo, useState } from 'react';
import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
  updateProfile,
} from 'firebase/auth';
import { doc, getDoc, serverTimestamp, setDoc, updateDoc } from 'firebase/firestore';
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage';
import { auth, db, googleProvider, storage } from '../lib/firebase';

const AuthContext = createContext(null);

const defaultProfile = {
  displayName: '',
  email: '',
  photoURL: '',
  phone: '',
  coins: 0,
  planId: 'free',
};

function normalizeProfile(user, profile = {}) {
  return {
    ...defaultProfile,
    ...profile,
    displayName: profile.displayName || user?.displayName || '',
    email: profile.email || user?.email || '',
    photoURL: profile.photoURL || user?.photoURL || '',
  };
}

async function ensureUserProfile(user) {
  const userRef = doc(db, 'users', user.uid);
  const snapshot = await getDoc(userRef);

  const authProfile = {
    displayName: user.displayName || '',
    email: user.email || '',
    photoURL: user.photoURL || '',
    updatedAt: serverTimestamp(),
  };

  if (!snapshot.exists()) {
    await setDoc(userRef, {
      ...defaultProfile,
      ...authProfile,
      coins: 0,
      planId: 'free',
      createdAt: serverTimestamp(),
    });
    return normalizeProfile(user, authProfile);
  }

  await setDoc(userRef, authProfile, { merge: true });
  return normalizeProfile(user, snapshot.data());
}

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      setUser(currentUser);

      if (!currentUser) {
        setProfile(null);
        setLoading(false);
        return;
      }

      try {
        const currentProfile = await ensureUserProfile(currentUser);
        setProfile(currentProfile);
      } catch (error) {
        console.error('Erro ao carregar perfil:', error);
        setProfile(normalizeProfile(currentUser));
      } finally {
        setLoading(false);
      }
    });

    return unsubscribe;
  }, []);

  const loginWithGoogle = async () => {
    const result = await signInWithPopup(auth, googleProvider);
    const currentProfile = await ensureUserProfile(result.user);
    setUser(result.user);
    setProfile(currentProfile);
    return result.user;
  };

  const loginWithEmail = async (email, password) => {
    const result = await signInWithEmailAndPassword(auth, email.trim(), password);
    const currentProfile = await ensureUserProfile(result.user);
    setUser(result.user);
    setProfile(currentProfile);
    return result.user;
  };

  const registerWithEmail = async ({ displayName, email, password, phone = '' }) => {
    const result = await createUserWithEmailAndPassword(auth, email.trim(), password);
    const cleanProfile = {
      ...defaultProfile,
      displayName: displayName.trim(),
      email: result.user.email || email.trim(),
      phone: phone.trim(),
      photoURL: result.user.photoURL || '',
      coins: 0,
      planId: 'free',
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp(),
    };

    await updateProfile(result.user, {
      displayName: cleanProfile.displayName,
    });

    await setDoc(doc(db, 'users', result.user.uid), cleanProfile, { merge: true });

    setUser(result.user);
    setProfile(normalizeProfile(result.user, cleanProfile));

    return result.user;
  };

  const logout = () => signOut(auth);

  const saveProfile = async ({ displayName, phone, photoURL }) => {
    if (!user) {
      throw new Error('Usuário não autenticado.');
    }

    const cleanProfile = {
      displayName: displayName.trim(),
      phone: phone.trim(),
      photoURL: photoURL.trim(),
      email: user.email || '',
      updatedAt: serverTimestamp(),
    };

    await updateProfile(user, {
      displayName: cleanProfile.displayName,
      photoURL: cleanProfile.photoURL || null,
    });

    await updateDoc(doc(db, 'users', user.uid), cleanProfile);

    setProfile((currentProfile) =>
      normalizeProfile(user, {
        ...currentProfile,
        ...cleanProfile,
      }),
    );
  };

  const uploadProfilePhoto = async (file) => {
    if (!user) {
      throw new Error('Usuário não autenticado.');
    }

    if (!file?.type?.startsWith('image/')) {
      throw new Error('Selecione um arquivo de imagem.');
    }

    if (file.size > 5 * 1024 * 1024) {
      throw new Error('A imagem precisa ter no máximo 5 MB.');
    }

    const extension = file.name.split('.').pop() || 'jpg';
    const photoRef = ref(storage, `profilePhotos/${user.uid}/profile-${Date.now()}.${extension}`);

    await uploadBytes(photoRef, file, { contentType: file.type });

    const photoURL = await getDownloadURL(photoRef);

    await updateProfile(user, { photoURL });
    await setDoc(
      doc(db, 'users', user.uid),
      {
        photoURL,
        email: user.email || '',
        updatedAt: serverTimestamp(),
      },
      { merge: true },
    );

    setProfile((currentProfile) =>
      normalizeProfile(user, {
        ...currentProfile,
        photoURL,
      }),
    );

    return photoURL;
  };

  const value = useMemo(
    () => ({
      user,
      profile,
      loading,
      loginWithEmail,
      loginWithGoogle,
      registerWithEmail,
      logout,
      saveProfile,
      uploadProfilePhoto,
    }),
    [user, profile, loading],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error('useAuth deve ser usado dentro de AuthProvider.');
  }

  return context;
}
