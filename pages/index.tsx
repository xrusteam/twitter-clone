import PostFeed from '@/components/posts/PostFeed';
import Header from '@/components/Header';
import Form from '@/components/Form';
import { NextPageContext } from 'next';
import { getSession } from 'next-auth/react';

export default function Home() {
  return (
    <>
      <Header label="Home" />
      <Form placeholder="What's happening?" />
      <PostFeed />
    </>
  );
}

export async function getServerSideProps(
  context: NextPageContext
) {
  const session = await getSession(context);

  if (!session) {
    return {
      redirect: {
        destination: '/auth',
        permanent: false,
      },
    };
  }

  return {
    props: {},
  };
}
