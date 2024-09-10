import Card from "@/components/Card";

export default function afterFilter() {
  const feature = [
    { name: "Students",  id: "students" },
    { name: "Teachers",  id: "teachers" },
    { name: "Classes",  id: "classes" },
  ];

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center lg:justify-start lg:pt-60 justify-center py-12 px-3"> {/* Adjust padding */}
      <h1 className="text-4xl font-bold text-center mb-9 text-gray-700">Select</h1> {/* Centered and styled */}
      
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 w-full max-w-screen-lg"> {/* Responsive grid */}
        {feature.map((data) => (
          <Card
            key={data.id}
            id={data.id}
            name={data.name}
          />
        ))}
      </div>
    </div>
  );
}  
