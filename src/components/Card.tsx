"use client";
import Image from "next/image";
import { useRouter } from "next/navigation"; // Use Next.js router

interface UserCardProps {
  id: string;
  name: string;
}

const Card: React.FC<UserCardProps> = ({  name, id }) => {
  const router = useRouter(); // Initialize useRouter

  const handleClick = () => {
    if (id === "teachers") router.push("/list/teachers");
    else if (id === "students") router.push("/list/students");
    else if (id === "classes") router.push("/list/classes");
  };

  return (
    <div
      onClick={handleClick}
      className="cursor-pointer rounded-3xl shadow-lg transition-transform transform hover:scale-105 hover:shadow-2xl odd:bg-lamaPurple even:bg-lamaYellow p-6 flex-1  min-w-[200px] max-w-[400px] mx-2  mb-6"
    >
      <div className="flex flex-wrap items-center justify-between sm:h-8">
        <h1 className="text-2xl font-semibold text-gray-500 ">{name}</h1>
        <Image src="/more.png" alt="more icon" width={24} height={24} className="ml-2" />
      </div>
    </div>
  );
};

export default Card;
