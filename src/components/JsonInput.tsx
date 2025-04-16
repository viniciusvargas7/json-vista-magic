
import { Textarea } from "@/components/ui/textarea";

interface JsonInputProps {
  value: string;
  onChange: (value: string) => void;
}

const JsonInput = ({ value, onChange }: JsonInputProps) => {
  return (
    <div className="h-full w-full">
      <Textarea
        placeholder="Cole seu JSON aqui..."
        className="h-full w-full min-h-[500px] font-mono resize-none bg-[#8E9196] bg-opacity-10 text-[#403E43] border-[#8A898C] focus:border-[#33C3F0]"
        value={value}
        onChange={(e) => onChange(e.target.value)}
      />
    </div>
  );
};

export default JsonInput;
