
import { useState } from "react";
import JsonInput from "@/components/JsonInput";
import JsonViewer from "@/components/JsonViewer";
import FormatButton from "@/components/FormatButton";
import { useToast } from "@/components/ui/use-toast";

const Index = () => {
  const [inputJson, setInputJson] = useState("");
  const [formattedJson, setFormattedJson] = useState<any>(null);
  const { toast } = useToast();

  const handleFormat = () => {
    try {
      if (!inputJson.trim()) {
        toast({
          title: "Erro",
          description: "Por favor, insira um JSON válido",
          variant: "destructive",
        });
        return;
      }
      
      const parsed = JSON.parse(inputJson);
      setFormattedJson(parsed);
      
      toast({
        title: "Sucesso",
        description: "JSON formatado com sucesso!",
      });
    } catch (error) {
      toast({
        title: "Erro",
        description: "JSON inválido. Verifique a sintaxe.",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6">JSON Vista Magic</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        <div className="border rounded-lg p-4">
          <h2 className="text-lg font-semibold mb-4">JSON de Entrada</h2>
          <JsonInput value={inputJson} onChange={setInputJson} />
        </div>
        
        <div className="border rounded-lg p-4">
          <h2 className="text-lg font-semibold mb-4">JSON Formatado</h2>
          <JsonViewer jsonData={formattedJson} />
        </div>
      </div>
      
      <div className="max-w-xs mx-auto">
        <FormatButton onClick={handleFormat} disabled={!inputJson.trim()} />
      </div>
    </div>
  );
};

export default Index;
