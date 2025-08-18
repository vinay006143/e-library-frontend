export default function BookCard({ book }) {
  const stars = Array(5).fill(false).map((_, i) => i < book.rating);

  return (
    <div className="bg-white p-4 shadow-md rounded-lg">
      <div className="h-40 bg-gray-200 rounded mb-4 flex items-center justify-center text-gray-400">
        📘
      </div>
      <h3 className="text-lg font-bold">{book.title}</h3>
      <p className="text-sm text-gray-600">{book.author}</p>
      <div className="flex mt-2 text-yellow-500">
        {stars.map((filled, idx) => (
          <svg key={idx} className="w-5 h-5" fill={filled ? "currentColor" : "none"} stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.47 4.529a1 1 0 00.95.69h4.754c.969 0 1.371 1.24.588 1.81l-3.857 2.798a1 1 0 00-.364 1.118l1.47 4.529c.3.921-.755 1.688-1.54 1.118l-3.857-2.798a1 1 0 00-1.176 0l-3.857 2.798c-.785.57-1.84-.197-1.54-1.118l1.47-4.529a1 1 0 00-.364-1.118L2.287 9.956c-.783-.57-.38-1.81.588-1.81h4.754a1 1 0 00.95-.69l1.47-4.529z" />
          </svg>
        ))}
      </div>
    </div>
  );
}
