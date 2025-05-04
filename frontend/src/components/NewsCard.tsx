// Placeholder for NewsCard component
const NewsCard = ({ title, summary, date }:{ title:string, summary:string, date:string }) => (
  <div className="bg-white rounded shadow p-4 mb-4">
    <h3 className="font-semibold text-lg mb-1">{title}</h3>
    <p className="text-gray-700 mb-2">{summary}</p>
    <span className="text-xs text-gray-500">{date}</span>
  </div>
);
export default NewsCard;
