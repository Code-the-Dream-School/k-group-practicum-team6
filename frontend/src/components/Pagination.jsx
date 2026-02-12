import { Button } from "flowbite-react";
import { CircleArrowLeft, CircleArrowRight } from "lucide-react";

const Pagination = ({
  currentPage,
  totalPages,
  onPrevious,
  onNext,
  disabled,
}) => {
  if (totalPages <= 1) return null;

  const isPrevDisabled = disabled || currentPage <= 1;
  const isNextDisabled = disabled || currentPage >= totalPages;

  return (
    <>
      <div className=" flex items-center justify-center mx-2 space-x-3">
        <Button
          className="cursor-pointer"
          onClick={onPrevious}
          disabled={isPrevDisabled}
        >
          <CircleArrowLeft />
        </Button>

        <span>
          Page {currentPage} of {totalPages}{" "}
        </span>

        <Button
          className="cursor-pointer"
          onClick={onNext}
          disabled={isNextDisabled}
        >
          <CircleArrowRight />
        </Button>
      </div>
    </>
  );
};

export default Pagination;
