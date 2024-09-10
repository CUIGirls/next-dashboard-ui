import UserCard from "@/components/UserCard";

export default function section() {
  const sections = [
    { section: "A", year: 2021, name: "Section A" },
    { section: "B", year: 2022, name: "Section B" },
    { section: "C", year: 2023, name: "Section C" },
    { section: "D", year: 2024, name: "Section D" },
  ];

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center p-6 space-y-6">
      <h1 className="text-4xl font-bold mb-6">Select a Section</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
        {sections.map((sectionData) => (
          <UserCard
            key={sectionData.section}
            section={sectionData.section}
            year={sectionData.year}
            name={sectionData.name}
          />
        ))}
      </div>
    </div>
  );
}
