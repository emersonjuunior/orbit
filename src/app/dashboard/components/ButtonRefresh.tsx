"use client";
import { useRouter } from "next/navigation";
import { FiRefreshCcw } from "react-icons/fi";

const ButtonRefresh = () => {
  const router = useRouter();

  return (
    <button
      className="bg-gray-900 hover:bg-gray-800 duration-300 rounded px-4 py-1 cursor-pointer"
      onClick={() => router.refresh()}
    >
      <FiRefreshCcw size={24} color="#FFF" />
    </button>
  );
};

export default ButtonRefresh;
