import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import "./ItemCard.css";
export function ItemCard(
  {
    title,
    category,
    img,
    onClick
  }: {
    title: string;
    category: string;
    img: string;
    onClick: () => void;
  }) {
  return (
    <Card
      className="w-80 flex flex-col items-center bg-slate-900 border-none m-0 rounded-lg shadow-2xl"
      onClick={onClick}
    >
      <CardHeader>
        <img className="rounded mb-3" src={img} alt={title} />
        <CardTitle className="text-center mb-1">
          {title}
        </CardTitle>
        <CardDescription className="text-center text-pink-500">
          {category}
        </CardDescription>
      </CardHeader>
    </Card>
  );
}
