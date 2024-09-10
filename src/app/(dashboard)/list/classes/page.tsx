'use client'

import FormModal from "@/components/FormModal";
import Pagination from "@/components/Pagination";
import Table from "@/components/Table";
import TableSearch from "@/components/TableSearch";
import { classesData, role } from "@/lib/data";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { Loader } from "lucide-react"; 
import { useState } from "react";

interface Section {
  id: number;
  name: string;
  ClassIncharge: string;
}

interface Class {
  id: number;
  name: string;
  capacity: number;
  ClassIncharge: string;
  sections: Section[];
}

const classes = [
  { 
    id: 1, 
    name: "Playgroup", 
    capacity: 20, 
    ClassIncharge: "Ms. A", 
    sections: [
      { id: 1, name: "Section A", ClassIncharge: "Mr. X" },
      { id: 2, name: "Section B", ClassIncharge: "Ms. Y" },
      { id: 3, name: "Section C", ClassIncharge: "Mr. Z" }
    ]
  },
  { 
    id: 2, 
    name: "Class 1", 
    capacity: 25, 
    ClassIncharge: "Ms. B", 
    sections: [
      { id: 1, name: "Section A", ClassIncharge: "Ms. P" },
      { id: 2, name: "Section B", ClassIncharge: "Ms. Q" },
      { id: 3, name: "Section C", ClassIncharge: "Mr. R" }
    ]
  },
  { 
    id: 3, 
    name: "Class 2", 
    capacity: 30, 
    ClassIncharge: "Mr. C", 
    sections: [
      { id: 1, name: "Section A", ClassIncharge: "Ms. U" },
      { id: 2, name: "Section B", ClassIncharge: "Mr. V" },
      { id: 3, name: "Section C", ClassIncharge: "Ms. W" }
    ]
  },
  { 
    id: 4, 
    name: "Class 3", 
    capacity: 28, 
    ClassIncharge: "Ms. D", 
    sections: [
      { id: 1, name: "Section A", ClassIncharge: "Mr. M" },
      { id: 2, name: "Section B", ClassIncharge: "Ms. N" },
      { id: 3, name: "Section C", ClassIncharge: "Mr. O" }
    ]
  },
  { 
    id: 5, 
    name: "Class 4", 
    capacity: 24, 
    ClassIncharge: "Ms. E", 
    sections: [
      { id: 1, name: "Section A", ClassIncharge: "Ms. K" },
      { id: 2, name: "Section B", ClassIncharge: "Mr. L" },
      { id: 3, name: "Section C", ClassIncharge: "Ms. M" }
    ]
  }
];


const columns = [
  {
    header: "Class Name",
    accessor: "name",
  },
  {
    header: "Capacity",
    accessor: "capacity",
    className: "hidden md:table-cell",
  },
  {
    header: "ClassIncharge",
    accessor: "ClassIncharge",
    className: "hidden md:table-cell",
  },
  {
    header: "Actions",
    accessor: "action",
  },
];

const ClassListPage = () => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<number | null>(null);

  const handleClassView = (sectionId: number) => {
    router.push(`/list/students`);
  };

  const renderRow = (item: Class) => (
    <tr
      key={item.id}
      className="border-b border-gray-200 even:bg-slate-50 text-sm hover:bg-lamaPurpleLight relative"
      onMouseEnter={() => setOpenDropdown(item.id)}
      onMouseLeave={() => setOpenDropdown(null)}
    >
      <td className="flex items-center gap-4 p-4">{item.name}</td>
      <td className="hidden md:table-cell">{item.capacity}</td>
      <td className="hidden md:table-cell">{item.ClassIncharge}</td>
      <td>
        <div className="flex items-center gap-2">
          <button
            onClick={() => handleClassView(item.id)}
            className="w-8 h-8 flex items-center justify-center rounded-full bg-lamaPurpleLight text-white"
          >
            <Image src="/view.png" alt="View" width={14} height={14} />
          </button>
        </div>
      </td>

      {/* Dropdown for sections */}
      {openDropdown === item.id && (
        <td colSpan={4} className="absolute left-0 right-0 top-full bg-white border mt-1 z-10">
          <div className="p-2">
            <h3 className="text-sm font-semibold mb-2">Sections</h3>
            {item.sections.map((section) => (
              <div
                key={section.id}
                className="py-2 px-4 odd:hover:bg-lamaYellowLight even:hover:bg-lamaPurpleLight cursor-pointer "
                onClick={() => handleClassView(section.id)}
              >
                <p>{section.name}</p>
                <p className="text-xs text-gray-500">Incharge: {section.ClassIncharge}</p>
              </div>
            ))}
          </div>
        </td>
      )}
    </tr>
  );

  return (
    <div className="bg-white p-4 rounded-md flex-1 m-4 mt-0">
      {/* TOP */}
      <div className="flex items-center justify-between">
        <h1 className="hidden md:block text-lg font-semibold">All Classes</h1>
        <div className="flex flex-col md:flex-row items-center gap-4 w-full md:w-auto">
          <TableSearch />
          <div className="flex items-center gap-4 self-end">
            <button className="w-8 h-8 flex items-center justify-center rounded-full bg-lamaYellow">
              <Image src="/filter.png" alt="Filter" width={14} height={14} />
            </button>
            <button className="w-8 h-8 flex items-center justify-center rounded-full bg-lamaYellow">
              <Image src="/sort.png" alt="Sort" width={14} height={14} />
            </button>
          </div>
        </div>
      </div>

      {/* LIST */}
      <Table columns={columns} renderRow={renderRow} data={classes} />

      {/* Loading spinner */}
      {loading && (
        <div className="flex items-center justify-center mt-6">
          <Loader className="animate-spin h-12 w-12 text-blue-600" />
        </div>
      )}
    </div>
  );
};

export default ClassListPage;
