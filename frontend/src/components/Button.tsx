// Placeholder for Button component
const Button = ({ children, ...props }: React.ButtonHTMLAttributes<HTMLButtonElement>) => (
  <button className="bg-blue-700 hover:bg-blue-800 text-white px-4 py-2 rounded" {...props}>{children}</button>
);
export default Button;
