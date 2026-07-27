import { cn } from "@nextui-org/react";

const OverlayWhileLoading = ({ isLoading }) => {
  return (
    <div
      className={cn(
        isLoading &&
          `fixed inset-0 bg-transparent z-50 flex items-center justify-center`,
      )}
    ></div>
  );
};

export default OverlayWhileLoading;
