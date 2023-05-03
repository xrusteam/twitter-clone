import axios from 'axios';
import { BsTwitter } from 'react-icons/bs';
import { useCallback, useState } from 'react';
import { NextPageContext } from 'next';
import {
  getSession,
  signIn,
} from 'next-auth/react';

import Input from '@/components/Input';

export async function getServerSideProps(
  context: NextPageContext
) {
  const session = await getSession(context);

  if (session) {
    return {
      redirect: {
        destination: '/',
        permanent: false,
      },
    };
  }

  return {
    props: {},
  };
}

const Auth = () => {
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');

  const [variant, setVariant] = useState('login');

  const toggleVariant = useCallback(() => {
    setVariant((currentVariant) =>
      currentVariant === 'login'
        ? 'register'
        : 'login'
    );
  }, []);

  const login = useCallback(async () => {
    try {
      await signIn('credentials', {
        email,
        password,
        redirect: false,
        callbackUrl: '/',
      });
    } catch (error) {
      console.log(error);
    }
  }, [email, password]);

  const register = useCallback(async () => {
    try {
      await axios.post('/api/register', {
        email,
        username,
        name,
        password,
      });

      login();
    } catch (error) {
      console.log(error);
    }
  }, [email, name, password, login, username]);

  return (
    <div className="relative h-full w-full bg-black bg-no-repeat bg-center bg-fixed bg-cover">
      <div className="bg-black w-full h-full lg:bg-opacity-50">
        <div className="flex justify-center">
          <div className="bg-black bg-opacity-70 px-16 py-16 self-center mt-2  rounded-md w-full">
            <h2 className="text-white text-4xl mb-8 font-semibold">
              {variant === 'login'
                ? 'Sign in'
                : 'Register'}
            </h2>
            <div className="flex flex-col gap-4">
              {variant === 'register' && (
                <>
                  <Input
                    type="text"
                    label="Username"
                    value={username}
                    onChange={(e: any) =>
                      setUsername(e.target.value)
                    }
                  />
                  <Input
                    type="text"
                    label="Name"
                    value={name}
                    onChange={(e: any) =>
                      setName(e.target.value)
                    }
                  />
                </>
              )}
              <Input
                type="email"
                label="Email"
                value={email}
                onChange={(e: any) =>
                  setEmail(e.target.value)
                }
              />
              <Input
                type="password"
                label="Password"
                value={password}
                onChange={(e: any) =>
                  setPassword(e.target.value)
                }
              />
            </div>
            <button
              onClick={
                variant === 'login'
                  ? login
                  : register
              }
              className="bg-sky-500 py-3 text-white rounded-md w-full mt-10 hover:bg-sky-600 transition"
            >
              {variant === 'login'
                ? 'Login'
                : 'Sign up'}
            </button>
            <p className="text-neutral-500 mt-12">
              {variant === 'login'
                ? 'First time using Netflix?'
                : 'Already have an account?'}
              <span
                onClick={toggleVariant}
                className="text-white ml-1 hover:underline cursor-pointer"
              >
                {variant === 'login'
                  ? 'Create an account'
                  : 'Login'}
              </span>
              .
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Auth;
