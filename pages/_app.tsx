import Layout from '@/components/Layout';
import Modal from '@/components/Modal';
import RegisterModal from '@/components/modals/RegisterModal';
import LoginModal from '@/components/modals/LoginModal';
import '@/styles/globals.css';
import type { AppProps } from 'next/app';

export default function App({
  Component,
  pageProps,
}: AppProps) {
  return (
    <>
      <RegisterModal />
      <LoginModal />
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </>
  );
}
