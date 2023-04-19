import React, {
  useCallback,
  useState,
} from 'react';
import Input from '../Input';
import useLoginModal from '@/hooks/useLoginModal';
import Modal from '../Modal';
import useRegisterModal from '@/hooks/useRegisterModal';

const RegisterModal = (): JSX.Element => {
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [username, setUserName] = useState('');
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] =
    useState(false);

  const registerModal = useRegisterModal();
  const loginModal = useLoginModal();

  const toggleVariant = useCallback(() => {
    if (isLoading) {
      return;
    }
    registerModal.onClose();
    loginModal.onOpen();
  }, [loginModal, registerModal, isLoading]);

  const onSubmit = useCallback(() => {
    try {
      setIsLoading(true);

      registerModal.onClose();
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  }, [registerModal]);

  const bodyContent = (
    <div className="flex flex-col gap-4">
      <Input
        placeholder="Email"
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        disabled={isLoading}
      />
      <Input
        placeholder="Name"
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
        disabled={isLoading}
      />
      <Input
        placeholder="Username"
        type="text"
        value={username}
        onChange={(e) =>
          setUserName(e.target.value)
        }
        disabled={isLoading}
      />
      <Input
        placeholder="Password"
        type="password"
        value={password}
        onChange={(e) =>
          setPassword(e.target.value)
        }
        disabled={isLoading}
      />
    </div>
  );

  const footerContent = (
    <div className="text-neutral-400 text-center mt-4">
      <p>
        Already have an account?{' '}
        <span
          onClick={toggleVariant}
          className="text-white cursor-pointer hover:underline"
        >
          Sign In
        </span>
      </p>
    </div>
  );
  return (
    <Modal
      disabled={isLoading}
      isOpen={registerModal.isOpen}
      title="Create an Account"
      actionLabel="Sign Up"
      onSubmit={onSubmit}
      body={bodyContent}
      onClose={registerModal.onClose}
      footer={footerContent}
    />
  );
};

export default RegisterModal;
