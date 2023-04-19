import { useRouter } from 'next/router';
import { FaFeather } from 'react-icons/fa';

const SidebarTweetButton = () => {
  const { push } = useRouter();
  return (
    <div onClick={() => push('/')}>
      <div className="lg:hidden flex items-center justify-center mt-6 rounded-full h-14 w-14 bg-sky-500 hover:bg-opacity-80 transition cursor-pointer">
        <FaFeather size={24} color="white" />
      </div>
      <div className="hidden lg:block px-4 py-2 mt-6 rounded-full bg-sky-500 hover:bg-opacity-90 transition cursor-pointer">
        <p className="text-center text-white font-semibold text-xl">
          Tweet
        </p>
      </div>
    </div>
  );
};

export default SidebarTweetButton;
