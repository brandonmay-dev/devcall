import { LoaderIcon } from "lucide-react";

function LoaderUI() {
  return (
    <div className="flex h-[calc(100dvh-4rem-1px)] items-center justify-center">
      <LoaderIcon className="h-8 w-8 animate-spin text-muted-foreground" />
    </div>
  );
}
export default LoaderUI;
