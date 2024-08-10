import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

interface PaginationSectionProps {
  totalItems?: number;
  page: number;
  limit?: number;
  onPageChange: (page: number) => void;
}

const PaginationSection = ({
  totalItems = 0,
  page,
  limit = 12,
  onPageChange,
}: PaginationSectionProps) => {
  const totalPages = Math.ceil(totalItems / limit);
  let pageNumber = [];

  for (let i = 1; i <= totalPages; i++) {
    pageNumber.push(i);
  }

  const handlePageChange = (pageNum: number) => {
    console.log("pageNum", pageNum);
    if (pageNum >= 1 && pageNum <= totalPages) {
      onPageChange(pageNum);
    }
  };

  // console.log("page", page);
  return (
    <Pagination>
      <PaginationContent>
        <PaginationItem>
          {page > 1 ? (
            <PaginationPrevious onClick={() => handlePageChange(page - 1)}>
              Previous
            </PaginationPrevious>
          ) : (
            <span style={{ color: "#ccc", cursor: "not-allowed" }}>
              Previous
            </span>
          )}
        </PaginationItem>
        {pageNumber.map((num) => (
          <PaginationItem key={num}>
            <PaginationLink
              isActive={num === page}
              onClick={() => handlePageChange(num)}
            >
              {num}
            </PaginationLink>
          </PaginationItem>
        ))}
        <PaginationItem>
          {page < totalPages ? (
            <PaginationNext onClick={() => handlePageChange(page + 1)}>
              Next
            </PaginationNext>
          ) : (
            <span style={{ color: "#ccc", cursor: "not-allowed" }}>Next</span>
          )}
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
};

export default PaginationSection;
