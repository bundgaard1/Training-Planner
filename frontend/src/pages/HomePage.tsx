import { Link } from "react-router-dom";

export function HomePage() {
  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <h1 className="text-4xl font-bold mb-8">Traning Planner</h1>
      <Link to="/login" className="px-4 py-2 bg-blue-500 text-white rounded-md">
        Login
      </Link>
      <Link to="/login" className="px-4 py-2 bg-whute text-white rounded-md">
        Register
      </Link>
    </div>
  );
}

export default HomePage;
