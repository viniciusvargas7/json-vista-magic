
import { Button } from "@/components/ui/button";

interface FormatButtonProps {
  onClick: () => void;
  disabled?: boolean;
  className?: string;
}

const FormatButton = ({ onClick, disabled, className }: FormatButtonProps) => {
  return (
    <Button
      onClick={onClick}
      disabled={disabled}
      className={`w-full ${className}`}
    >
      Formatar
    </Button>
  );
};

export default FormatButton;
