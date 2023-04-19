import React, { useCallback } from 'react';
import { useRouter } from 'next/router';
import { BiArrowBack } from 'react-icons/bi';

interface HeaderProps {
  label: string;
  showBackArrow?: boolean;
}

const Header: React.FC<HeaderProps> = ({
  label,
  showBackArrow,
}) => {
  const router = useRouter();

  const handleBack = useCallback(() => {
    router.back();
  }, [router]);
  return (
    <div className="border-b border-neutral-800 p-5">
      <div className="flex flex-row items-center gap-2">
        {showBackArrow && (
          <BiArrowBack
            onClick={handleBack}
            className="cursor-pointer hover:opacity-70 transition"
            size={20}
            color="white"
          />
        )}
        <p className="text-white text-xl font-semibold">
          {label}
        </p>
      </div>
    </div>
  );
};

export default Header;
