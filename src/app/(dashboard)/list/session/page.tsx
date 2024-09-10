"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Loader } from "lucide-react"; // Spinner icon from lucide-react
import { Modal } from "@/components/Modal";

// Define the type for your class items
interface Class {
  id: number;
  name: string;
  capacity: number;
  ClassIncharge: string;
}

// Define the type for the filters
interface Filters {
  session: string | null;
  section: string | null;
}

const classes: Class[] = [
  { id: 1, name: "Playgroup", capacity: 20, ClassIncharge: "Ms. A" },
  { id: 2, name: "Class 1", capacity: 25, ClassIncharge: "Ms. B" },
  { id: 3, name: "Class 2", capacity: 30, ClassIncharge: "Ms. C" },
  { id: 4, name: "Class 3", capacity: 28, ClassIncharge: "Ms. D" },
  { id: 5, name: "Class 4", capacity: 24, ClassIncharge: "Ms. E" },
  { id: 6, name: "Class 5", capacity: 26, ClassIncharge: "Ms. F" },
  { id: 7, name: "Class 6", capacity: 27, ClassIncharge: "Ms. G" },
  { id: 8, name: "Class 7", capacity: 22, ClassIncharge: "Ms. H" },
  { id: 9, name: "Class 8", capacity: 23, ClassIncharge: "Ms. I" },
];

export default function Session() {
  const [modalOpen, setModalOpen] = useState<boolean>(true);
  const [loading, setLoading] = useState<boolean>(false);
  const router = useRouter();

  const handleApplyFilters = (session: string | null, section: string | null) => {
    console.log("Filters applied:", { session, section });
    setLoading(true);

    // Simulate loading delay, then hide spinner
    setTimeout(() => {
      setLoading(false);
    }, 2000);
  };


  // Handle modal close, navigate back to /admin
  const handleModalClose = () => {
    setModalOpen(false); // Navigate back to admin page
  };

  return (
    <div className="bg-white p-4 rounded-md flex-1 m-4 mt-0">
      {/* Modal */}
      {modalOpen && (
        <Modal
          isOpen={modalOpen}
          onClose={handleModalClose}
          onApply={(filters: Filters) => handleApplyFilters(filters.session, filters.section)}
        />
      )}

      {/* Loading spinner */}
      {loading && (
        <div className="flex items-center justify-center mt-6">
          <Loader className="animate-spin h-12 w-12 text-blue-600" />
        </div>
      )}
    </div>
  );
}
