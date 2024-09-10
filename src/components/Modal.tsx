import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/UI/Button"; // Shadcn button
import { Select, SelectItem } from "@/components/UI/Select"; // Shadcn select

const sessions = ["2023", "2024", "2025"];
const sections = ["Section A", "Section B", "Section C"];

interface ModalProps {
    isOpen: boolean;
    onClose: () => void;
    onApply: (session: string | null, section: string | null) => void;
}


export function Modal({ isOpen, onClose, onApply }: ModalProps) {
  const [selectedSession, setSelectedSession] = useState<string | null>(null);
  const [selectedSection, setSelectedSection] = useState<string | null>(null);
  const router = useRouter();

  const apply = () => {
    onApply(selectedSession, selectedSection); // Pass the selected values back to parent
    setTimeout(() => {
      onClose(); // Close the modal after a brief delay (for spinner)
    }, 2000); // Simulate delay for loading spinner
    router.push("/list/afterFilter"); // Navigate to /list/classes after clicking apply
  };

  const close = () => {
    onClose(); // Close the modal
    router.push("/admin"); // Navigate to /admin when the close button is clicked
  };

  return (
    isOpen ? (
      <div className="fixed inset-0 bg-gray-800 bg-opacity-75 flex items-center justify-center z-50 ">
        <div className="relative bg-white dark:bg-gray-900 p-8 rounded-xl shadow-2xl w-full max-w-lg transform transition-all duration-300 ease-in-out scale-100 hover:scale-105">
          <h2 className="text-3xl font-semibold text-gray-800 dark:text-gray-100 mb-6 text-center">Filter Classes</h2>
          
          {/* Session Select */}
          <div className="mb-6 flex justify-center flex-col">
            <label className="block text-lg font-medium text-gray-700 dark:text-gray-300 mb-2">Select Session</label>
            <Select
              onValueChange={setSelectedSession} >
              <SelectItem  value="placeholder">
                Select Session
              </SelectItem>

              {/* Scrollable Dropdown */}
              <div className="max-h-40 overflow-y-auto">
                {sessions.map((session) => (
                  <SelectItem key={session} value={session}>
                    {session}
                  </SelectItem>
                ))}
              </div>
            </Select>
          </div>

          {/* Buttons */}
          <div className="flex justify-end mt-8">
            <Button
              onClick={apply}
              className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-all duration-200"
            >
              Apply
            </Button>
          </div>

          {/* Close Button */}
          <button
            onClick={close}
            className="absolute top-4 right-4 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300"
          >
            <span className="sr-only">Close</span>
            &times;
          </button>
        </div>
      </div>
    ) : null
  );
}
