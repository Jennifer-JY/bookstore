import Result from "@/components/books/Results";
import SideNav from "@/components/books/SideNav";

export default function Books() {
  return (
    <div className="border-t-1 border-gray-200 shadow-sm lg:flex lg:flex-row lg:h-full">
      <SideNav />
      <h2>Results</h2>
      <Result />
    </div>
  );
}
