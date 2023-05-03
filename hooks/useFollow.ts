import axios from 'axios';
import { useCallback, useMemo } from 'react';
import { toast } from 'react-hot-toast';

import useCurrentUser from './useCurrentUser';
import useUser from './useUser';
import { useRouter } from 'next/router';

const useFollow = (userId: string) => {
  const {
    data: currentUser,
    mutate: mutateCurrentUser,
  } = useCurrentUser();
  const { mutate: mutateFetchedUser } =
    useUser(userId);

  const router = useRouter();

  const isFollowing = useMemo(() => {
    const list = currentUser?.followingIds || [];

    return list.includes(userId);
  }, [currentUser, userId]);

  const toggleFollow = useCallback(async () => {
    if (!currentUser) {
      return router.push('/auth');
    }

    try {
      let request;

      if (isFollowing) {
        request = () =>
          axios.delete('/api/follow', {
            data: { userId },
          });
      } else {
        request = () =>
          axios.post('/api/follow', { userId });
      }

      await request();
      mutateCurrentUser();
      mutateFetchedUser();

      toast.success('Success');
    } catch (error) {
      toast.error('Something went wrong');
    }
  }, [
    currentUser,
    isFollowing,
    userId,
    mutateCurrentUser,
    mutateFetchedUser,
    router,
  ]);

  return {
    isFollowing,
    toggleFollow,
  };
};

export default useFollow;
