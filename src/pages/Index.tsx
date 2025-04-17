
import { useState } from "react";
import JsonInput from "@/components/JsonInput";
import JsonViewer from "@/components/JsonViewer";
import FormatButton from "@/components/FormatButton";
import Header from "@/components/Header";
import DownloadButton from "@/components/DownloadButton";
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
    <div className="min-h-screen flex flex-col">
      <Header />
      <div className="container mx-auto p-6 bg-[#C8C8C9] bg-opacity-20 flex-grow">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6 h-[calc(100%-4rem)]">
          <div className="border rounded-lg p-4 bg-[#9F9EA1] bg-opacity-10 border-[#8A898C] h-full">
            <h2 className="text-lg font-semibold mb-4 text-[#221F26]">JSON de Entrada</h2>
            <div className="h-[calc(100%-4rem)]">
              <JsonInput value={inputJson} onChange={setInputJson} />
            </div>
          </div>
          
          <div className="border rounded-lg p-4 bg-[#9F9EA1] bg-opacity-10 border-[#8A898C] h-full">
            <h2 className="text-lg font-semibold mb-4 text-[#221F26]">JSON Formatado</h2>
            <div className="h-[calc(100%-4rem)]">
              <JsonViewer jsonData={formattedJson} />
            </div>
          </div>
        </div>
        
        <div className="flex flex-col items-center mt-6">
          <FormatButton 
            onClick={handleFormat} 
            disabled={!inputJson.trim()} 
            className="bg-[#0FA0CE] hover:bg-[#33C3F0] text-white"
          />
          
          <DownloadButton />
        </div>
      </div>
    </div>
  );
};

export default Index;
