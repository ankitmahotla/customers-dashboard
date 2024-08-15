import { useEffect, useCallback, memo } from 'react';
import UserCard from './UserCard';
import { useIntersectionObserver } from "@uidotdev/usehooks";
import { useUserStore } from '../store/userStore';
import { LoaderCircle } from 'lucide-react';

function UserList() {
  const { users, loading, fetchUsers } = useUserStore();

  const [ref, entry] = useIntersectionObserver({
    threshold: 0,
    root: null,
    rootMargin: "0px",
  });

  const memoizedFetchUsers = useCallback(() => {
    fetchUsers();
  }, [fetchUsers]);

  useEffect(() => {
    memoizedFetchUsers();
  }, [memoizedFetchUsers]);

  useEffect(() => {
    if (entry?.isIntersecting) {
      memoizedFetchUsers();
    }
  }, [entry, memoizedFetchUsers]);

  return (
    <div className='overflow-y-auto max-h-[100vh] max-w-[100vh] border-slate-200 border-r-2'>
      {users.map((user, index) => (
        <UserCard key={index} user={user} />
      ))}
      <div ref={ref} className='w-20 p-4'>
        {loading && <LoaderCircle className="animate-spin" />}
      </div>
    </div>
  );
}

export default memo(UserList);