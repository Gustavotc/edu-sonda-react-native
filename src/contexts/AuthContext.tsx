import {
  useContext,
  createContext,
  type PropsWithChildren,
  useState,
  useEffect,
} from 'react';
import { ITeacher } from '../domain/entities/Teacher';
import { ILocalStorage } from '../infra/localStorage/ILocalStorage';
import { router } from 'expo-router';

type ISessionProviderProps = PropsWithChildren & {
  storage: ILocalStorage;
};

const USER_KEY = process.env.EXPO_PUBLIC_USER_KEY as string;

const AuthContext = createContext<{
  signIn: (user: ITeacher) => void;
  signOut: () => void;
  user: ITeacher | null;
  isLoading: boolean;
}>({
  signIn: () => null,
  signOut: () => null,
  user: null,
  isLoading: false,
});

export function useSession() {
  const value = useContext(AuthContext);
  if (process.env.NODE_ENV !== 'production') {
    if (!value) {
      throw new Error('useSession must be wrapped in a <SessionProvider />');
    }
  }

  return value;
}

export function SessionProvider({ children, storage }: ISessionProviderProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [user, setUser] = useState<ITeacher | null>(null);

  const fetchLocalUser = async () => {
    setIsLoading(true);
    const user = await storage.getObject<ITeacher>(USER_KEY);
    setUser(user);
    setIsLoading(false);
  };

  useEffect(() => {
    fetchLocalUser();
  }, []);

  return (
    <AuthContext.Provider
      value={{
        signIn: (user: ITeacher) => {
          storage.setObject(USER_KEY, user);
          setUser(user);
          router.replace('/');
        },
        signOut: () => {
          storage.clearKey(USER_KEY);
          setUser(null);
        },
        user,
        isLoading,
      }}>
      {children}
    </AuthContext.Provider>
  );
}
