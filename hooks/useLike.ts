import axios from 'axios';
import { useCallback, useMemo } from 'react';
import { toast } from 'react-hot-toast';

import useCurrentUser from './useCurrentUser';
import usePost from './usePost';
import usePosts from './usePosts';
import { useRouter } from 'next/router';

const useLike = ({
  postId,
  userId,
}: {
  postId: string;
  userId?: string;
}) => {
  const { data: currentUser } = useCurrentUser();
  const {
    data: fetchedPost,
    mutate: mutateFetchedPost,
  } = usePost(postId);
  const { mutate: mutateFetchedPosts } =
    usePosts(userId);

  const router = useRouter();

  const hasLiked = useMemo(() => {
    const list = fetchedPost?.likedIds || [];

    return list.includes(currentUser?.id);
  }, [fetchedPost, currentUser]);

  const toggleLike = useCallback(async () => {
    if (!currentUser) {
      return router.push('/auth');
    }

    try {
      let request;

      if (hasLiked) {
        request = () =>
          axios.delete('/api/like', {
            data: { postId },
          });
      } else {
        request = () =>
          axios.post('/api/like', { postId });
      }

      await request();
      mutateFetchedPost();
      mutateFetchedPosts();

      toast.success('Success');
    } catch (error) {
      toast.error('Something went wrong');
    }
  }, [
    currentUser,
    hasLiked,
    postId,
    mutateFetchedPosts,
    mutateFetchedPost,
    router,
  ]);

  return {
    hasLiked,
    toggleLike,
  };
};

export default useLike;
