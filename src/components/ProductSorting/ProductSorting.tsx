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


const ProductSorting = ({ setSortingValue }: any) => {

    const handleSorting = (value: string) => {
      
      setSortingValue(value);
    };
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button className="text-base bg-gradient-to-r from-[#76AE42] to-[#AFD136] text-white py-2 px-4 rounded hover:from-[#AFD136] hover:to-[#76AE42] transition-colors duration-300">
          Sorting
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56">
        <DropdownMenuLabel>Select Sorting Field</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuRadioGroup onValueChange={handleSorting}>
          <DropdownMenuRadioItem value="price">Price</DropdownMenuRadioItem>
          <DropdownMenuRadioItem value="title">Name</DropdownMenuRadioItem>
        </DropdownMenuRadioGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default ProductSorting;
