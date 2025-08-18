import { useState, useEffect } from "react";

export default function Toast(props) {
  const [show, setShow] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setShow(false), 7000); // Auto-dismiss after 3s
    return () => clearTimeout(timer);
  }, []);

  if (!show) return null;

  return (
    <div
      className="fixed bottom-5 right-5 bg-blue-600 text-white rounded-lg shadow-lg flex items-center justify-between p-4 w-full max-w-xs"
      role="alert"
      aria-live="assertive"
      aria-atomic="true"
    >
      <div className="text-sm">Hello,WELCOME E-library Explore </div>
      <button
        onClick={() => setShow(false)}
        className="ml-4 text-white hover:text-gray-300 focus:outline-none"
        aria-label="Close"
      >
        ✕
      </button>
    </div>
  );
}
