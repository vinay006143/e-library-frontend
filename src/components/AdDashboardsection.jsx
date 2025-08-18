import { Book, PlusSquare, Users, Layers } from "lucide-react";

const stats = [
  {
    title: "Total Books",
    value: 1240,
    icon: <Book className="w-6 h-6 text-blue-600" />,
    bg: "bg-blue-100",
  },
  {
    title: "New Books",
    value: 42,
    icon: <PlusSquare className="w-6 h-6 text-green-600" />,
    bg: "bg-green-100",
  },
  {
    title: "Total Users",
    value: 318,
    icon: <Users className="w-6 h-6 text-purple-600" />,
    bg: "bg-purple-100",
  },
  {
    title: "Categories",
    value: 15,
    icon: <Layers className="w-6 h-6 text-yellow-600" />,
    bg: "bg-yellow-100",
  },
];

export default function DashboardStatsSection() {
  return (
    <section className="px-6 py-8">
      <h2 className="text-2xl font-semibold mb-6 text-gray-800">📊 Dashboard Overview</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <div
            key={index}
            className="flex items-center justify-between p-5 rounded-2xl shadow-sm bg-white border hover:shadow-md transition duration-200"
          >
            <div>
              <p className="text-sm text-gray-500">{stat.title}</p>
              <p className="text-2xl font-bold text-gray-800">{stat.value}</p>
            </div>
            <div className={`p-3 rounded-full ${stat.bg}`}>
              {stat.icon}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
