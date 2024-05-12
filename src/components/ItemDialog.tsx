import { useEffect } from "react";
import { useState } from "react";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "./ui/button";

export function ItemDialog({
  cocktail,
  title,
  category,
  glass,
  instructions,
  onClose,
}: {
  cocktail: object;
  title: string;
  category: string;
  glass: string;
  instructions: string;
  onClose: () => void;
}) 
{
  const [imgs, setImgs] = useState<string[]>([]);

  const ingredients = Object.entries(cocktail)
    .filter(([key]) => key.includes("Ingredient"))
    .map(([, value]) => value)
    .filter((value) => value !== null);

    useEffect(() => {
      const fetchImages = async () => {
        const urls = await Promise.all(
          ingredients.map(async (ingredient) => {
            try {
              const res = await fetch(
                `https://www.thecocktaildb.com/images/ingredients/${ingredient}-small.png`
              );
              const blob = await res.blob();
              const url = URL.createObjectURL(blob);
              return url;
            } catch (err) {
              console.log(err);
              return null;
            }
          })
        );
        setImgs(urls.filter((url): url is string => url !== null));};
      fetchImages();
    }, [ingredients]);

  const loadedImgs = imgs.map((img) => (
    <img
      className="w-20 m-2"
      src={img}
    />
  ));


  const misure = Object.entries(cocktail)
    .filter(([key]) => key.includes("Measure"))
    .map(([, value]) => value)
    .filter((value) => value !== null);

  const mergedArray = ingredients.map(
    (ingredient, index) =>
      `${misure[index] ? `${misure[index]} ` : ""}${ingredient}` +
      `${index === ingredients.length - 1 ? "." : ", "}`
  );

  return (
    <>
      <Dialog open={true} onOpenChange={onClose}>
        <DialogContent className=" max-h-[90vh] p-8 overflow-y-auto">
          <DialogHeader>
            <DialogTitle
              className="text-center text-orange-400 text-3xl"
              style={{ fontFamily: "Poetsen One" }}
            >
              {title}
            </DialogTitle>
            <DialogDescription className="text-center text-pink-500 text-xl">
              {category}
            </DialogDescription>
          </DialogHeader>
          <div className="text-center">
            <p className="text-lg mb-5">
              <span
                className="font-bold text-zinc-700"
                style={{ fontFamily: "Poetsen One" }}
              >
                Ingredients
              </span>
              <br />
              <div className="flex flex-wrap justify-around my-5">
              {loadedImgs}
              </div>
              {mergedArray}
            </p>
            <p className="text-lg mb-5">
              <span
                className="font-bold text-zinc-700"
                style={{ fontFamily: "Poetsen One" }}
              >
                Glass
              </span>
              <br />
              {glass}
            </p>
            <p className="text-lg">
              <span
                className="font-bold text-zinc-700"
                style={{ fontFamily: "Poetsen One" }}
              >
                Instructions
              </span>
              <br />
              {instructions}
            </p>
          </div>
          <DialogFooter>
            <DialogClose asChild>
              <Button
                type="button"
                className="w-[80px] text-pink-500 mx-auto mt-5 focus-visible:ring-transparent"
                onClick={onClose}
              >
                Close
              </Button>
            </DialogClose>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}
