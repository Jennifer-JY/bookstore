import SideNav from "@/components/books/SideNav";

export default function Books() {
  return (
    <div className="border-t-1 border-gray-200 shadow-sm lg:flex lg:flex-row lg:h-full">
      <SideNav />
      <div>
        <div>Fiction</div>
        Lorem ipsum dolor sit, amet consectetur adipisicing elit. Dolor enim
        obcaecati quidem? Earum ipsam quia maxime harum asperiores dignissimos
        hic. Et veniam, repellendus impedit fugit sequi nam quia laudantium
        consequuntur?
      </div>
    </div>
  );
}
