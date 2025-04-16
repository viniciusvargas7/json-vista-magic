
import { Textarea } from "@/components/ui/textarea";

interface JsonInputProps {
  value: string;
  onChange: (value: string) => void;
}

const JsonInput = ({ value, onChange }: JsonInputProps) => {
  return (
    <div className="h-full">
      <Textarea
        placeholder="Cole seu JSON aqui..."
        className="h-full min-h-[500px] font-mono resize-none"
        value={value}
        onChange={(e) => onChange(e.target.value)}
      />
    </div>
  );
};

export default JsonInput;
