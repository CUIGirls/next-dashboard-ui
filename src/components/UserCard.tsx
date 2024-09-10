"use client"
import Image from "next/image";
import { useRouter } from "next/navigation"; // Use Next.js router

interface UserCardProps {
  section: string;
  year: number;
  name: string;
}

const UserCard: React.FC<UserCardProps> = ({ section, year, name }) => {
  const router = useRouter(); // Initialize useRouter

  const handleClick = () => {
    router.push("/list/students"); // Navigate using Next.js's router
  };

  return (
    <div
      onClick={handleClick}
      className="cursor-pointer rounded-2xl shadow-lg transition-transform transform hover:scale-105 hover:shadow-2xl odd:bg-lamaPurple even:bg-lamaYellow p-6 flex-1 min-w-[130px] max-w-[300px] mx-auto"
    >
      <div className="flex justify-between items-center">
        <span className="text-[12px] bg-white px-3 py-1 rounded-full text-green-600 shadow-sm">
          {year}
        </span>
        <Image src="/more.png" alt="more icon" width={20} height={20} />
      </div>
      <h1 className="text-2xl font-semibold my-4">{name}</h1>
      <h2 className="text-lg text-gray-500">{section}</h2>
    </div>
  );
};

export default UserCard;