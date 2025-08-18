const features = [
  {
    name: 'Advanced Book Search',
    description: 'Quickly find books using keywords, filters, and categories.',
    icon: (
      <svg className="w-10 h-10 text-blue-600" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
        <path d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
      </svg>
    ),
  },
  {
    name: 'Latest & Trending Books',
    description: 'Explore new arrivals and trending academic books every day.',
    icon: (
      <svg className="w-10 h-10 text-blue-600" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
        <path d="M12 20h9" />
        <path d="M16.5 3.5a2.121 2.121 0 00-3 3L19 12l3-3-5.5-5.5z" />
        <path d="M6 8v11a1 1 0 001 1h11" />
      </svg>
    ),
  },
  {
    name: 'Star Ratings & Reviews',
    description: 'Check student reviews and star ratings before reading.',
    icon: (
      <svg className="w-10 h-10 text-yellow-500" fill="currentColor" viewBox="0 0 24 24">
        <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
      </svg>
    ),
  },
  {
    name: 'Favorites Shelf',
    description: 'Save and organize your favorite books to revisit anytime.',
    icon: (
      <svg className="w-10 h-10 text-red-500" fill="currentColor" viewBox="0 0 24 24">
        <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 6.01 4.02 4 6.5 4 8.28 4 9.9 5.1 10.44 6.61h1.12C13.1 5.1 14.72 4 16.5 4 18.98 4 21 6.01 21 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
      </svg>
    ),
  },
  {
    name: 'Mobile Friendly Design',
    description: 'Perfect viewing and interaction on phones, tablets, and desktops.',
    icon: (
      <svg className="w-10 h-10 text-green-500" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
        <rect x="7" y="4" width="10" height="16" rx="2" ry="2" />
        <path d="M11 5h2" />
        <path d="M11 19h2" />
      </svg>
    ),
  },
  {
    name: 'Clean Student UI',
    description: 'Fast-loading interface tailored for reading and learning.',
    icon: (
      <svg className="w-10 h-10 text-purple-500" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
        <path d="M20 21v-2a4 4 0 00-3-3.87M4 21v-2a4 4 0 013-3.87M16 3.13a4 4 0 010 7.75M8 3.13a4 4 0 000 7.75" />
      </svg>
    ),
  },
];

export default function FeaturesSection() {
  return (
    <div className="bg-gray-50 py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-12">📚 Key Features of Our eLibrary</h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
          {features.map((feature, index) => (
            <div key={index} className="bg-white rounded-xl shadow p-6 hover:shadow-md transition">
              <div className="mb-4">{feature.icon}</div>
              <h3 className="text-xl font-semibold text-gray-800">{feature.name}</h3>
              <p className="text-gray-600 mt-2">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
