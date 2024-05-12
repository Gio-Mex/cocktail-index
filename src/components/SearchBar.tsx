import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export function SearchBar( {
  searchType,
  onSelectChange,
  searchInput,
  onInputChange,
  onClick,
}: {
  searchType: string;
  onSelectChange: (value: string) => void;
  searchInput: string;
  onInputChange: (value: string) => void;
  onClick: () => void;
}) {
 
  return (
    <>
      <div className="flex flex-row mx-3 justify-center items-center">
        <Select
          value={searchType}
          onValueChange={(value) => onSelectChange(value)}
        >
          <SelectTrigger className="w-[120px] bg-slate-900 border-slate-900 text-pink-500 m-1 rounded-e-none">
            <SelectValue placeholder="Name" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="s">Name</SelectItem>
            <SelectItem value="i">Ingredient</SelectItem>
          </SelectContent>
        </Select>

        <Input
          className="max-w-[400px] me-1 rounded-none border-s-0"
          placeholder="Search..."
          value={searchInput}
          onChange={(e) => onInputChange(e.target.value)}
        />

        <Button type="button" className="w-[80px] text-pink-500 rounded-s-none" onClick={onClick}>
          <span
            className="material-symbols-outlined"
          >
            search
          </span>
        </Button>
      </div>
    </>
  );
}
