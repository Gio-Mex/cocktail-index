import { useState, useEffect } from "react";
import "./App.css";
import { SearchBar } from "./components/SearchBar";
import { ItemCard } from "./components/ItemCard";
import { ItemDialog } from "./components/ItemDialog";
function App() {
  const [cocktails, setCocktails] = useState([]);
  const [searchType, setSearchType] = useState("s");
  const [searchInput, setSearchInput] = useState("");
  const [dialogOpen, setDialogOpen] = useState(false);
  const [cocktail, setCocktail] = useState({});

  useEffect(() => {
    fetch(
      `https://www.thecocktaildb.com/api/json/v1/1/search.php?${searchType}=${searchInput}`
    )
      .then((res) => res.json())
      .then((data) => setCocktails(data.drinks))
      .catch((err) => console.log(err));
  }, []);
  
  const inputHandler = (input: string) => {
    setSearchInput(input);
  };

  const selectHandler = (selection: string) => {
    setSearchType(selection);
  };

  const searchHandler = async () => {
    const searchString = searchType === "s" ? "search" : "filter";
    try {
      const res = await fetch(
        `https://www.thecocktaildb.com/api/json/v1/1/${searchString}.php?${searchType}=${searchInput}`
      );
      const data = await res.json();
      setCocktails(data.drinks);
    } catch (err) {
      console.log(err);
      setCocktails([]);
    }
    setSearchInput("");
  };

const cocktailDetails = async (drinkID: string) => {
  try {
    const res = await fetch(`https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${drinkID}`);
    const data = await res.json();
    setCocktail(data.drinks[0]);
    setDialogOpen(true);
  } catch (err) {
    console.log(err);
  }
};

  return (
    <>
  <div className="w-full h-96 top-0 fixed -z-50">
        <video src="/video/indexVideo.mp4" className="object-none top-36 w-full h-full" autoPlay muted loop></video>
  </div>
 <div className="mb-10">

        <h1 className="text-6xl md:text-7xl lg:text-9xl font-bold text-center mt-8 mb-20 md:mt-28 md:mb-60">
          C o c k t a i l 🍸n d e x
        </h1>


        <SearchBar
          searchType={searchType}
          onSelectChange={selectHandler}
          searchInput={searchInput}
          onInputChange={inputHandler}
          onClick={searchHandler}
        />
        {dialogOpen && (
          <ItemDialog
            cocktail={cocktail}
            title={cocktail.strDrink}
            instructions={cocktail.strInstructions}
            glass={cocktail.strGlass}
            category={cocktail.strCategory}
            onClose={() => setDialogOpen(false)}
          />
        )}
        <div className="mt-44 md:mt-28 mx-auto flex flex-wrap justify-center gap-10">
          {cocktails ? cocktails.map((cocktail: any) => {
            return (
              <ItemCard
                onClick={() => {
                  cocktailDetails(cocktail.idDrink);
                }}
                key={cocktail.idDrink}
                title={cocktail.strDrink}
                category={cocktail.strCategory}
                img={cocktail.strDrinkThumb}
              ></ItemCard>
            );
          }) : null}
        </div>
      </div>
    </>
  );
}

export default App;
