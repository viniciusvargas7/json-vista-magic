
import { Button } from "@/components/ui/button";

interface FormatButtonProps {
  onClick: () => void;
  disabled?: boolean;
}

const FormatButton = ({ onClick, disabled }: FormatButtonProps) => {
  return (
    <Button
      onClick={onClick}
      disabled={disabled}
      className="w-full"
    >
      Formatar
    </Button>
  );
};

export default FormatButton;
