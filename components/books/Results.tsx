import Image from "next/image";

export default function Result() {
  return (
    <div>
      <div>
        <Card />
      </div>
      <div>
        <Pagenation />
      </div>
    </div>
  );
}

function Card() {
  return (
    <div>
      <Image alt="bookname" src=""></Image>
      <div>Title</div>
      <div>by author</div>
      <div>Price</div>
      <div>Stock</div>
    </div>
  );
}

function Pagenation() {
  return <div>1</div>;
}
