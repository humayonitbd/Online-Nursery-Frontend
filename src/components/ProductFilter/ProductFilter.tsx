import { Button } from "../ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";

const ProductFilter = ({ setFilterValue, filterValue }: any) => {
  const handleFilter = (e: any) => {
    const target = e.target as HTMLInputElement;
    setFilterValue(target.value);
  };
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button className="text-base bg-gradient-to-r from-[#76AE42] to-[#AFD136] text-white py-2 px-4 rounded hover:from-[#AFD136] hover:to-[#76AE42] transition-colors duration-300">
          Filter
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56">
        <DropdownMenuLabel className="text-center">
          Price Range Filter- {filterValue} - {Number(filterValue) + 100}
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <div className="py-5 px-3">
          <input
            onClick={handleFilter}
            type="range"
            min={50}
            max="500"
            defaultValue={filterValue}
            className="range range-md bg-[#76AE42] range-black"
          />
        </div>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default ProductFilter;
