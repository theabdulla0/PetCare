import { LuQuote } from "react-icons/lu";

function TestimonialCard({ quote, author }) {
  return (
    <div className="bg-white p-6 rounded-2xl shadow-md">
      <LuQuote className="text-primary mb-4" />
      <p className="text-gray-700">{quote}</p>
      <p className="text-sm text-gray-400 mt-2">{author}</p>
    </div>
  );
}

export default TestimonialCard;
