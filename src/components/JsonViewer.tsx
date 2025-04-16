import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { ChevronDown, ChevronRight } from "lucide-react";
import { useState } from "react";

interface JsonViewerProps {
  jsonData: any;
}

const JsonViewer = ({ jsonData }: JsonViewerProps) => {
  const formatAsText = () => {
    try {
      return JSON.stringify(jsonData, null, 2);
    } catch {
      return "JSON inválido";
    }
  };

  const TreeNode = ({ data, label }: { data: any; label?: string }) => {
    const [isOpen, setIsOpen] = useState(true);
    
    if (typeof data !== "object" || data === null) {
      return (
        <div className="flex items-center gap-2">
          {label && <span className="text-gray-700">{label}: </span>}
          <span className="text-blue-600">{JSON.stringify(data)}</span>
        </div>
      );
    }

    return (
      <Collapsible open={isOpen} onOpenChange={setIsOpen}>
        <div className="flex items-center gap-1">
          <CollapsibleTrigger className="hover:bg-gray-100 rounded p-1">
            {isOpen ? <ChevronDown size={16} /> : <ChevronRight size={16} />}
          </CollapsibleTrigger>
          {label && <span className="text-gray-700">{label}</span>}
        </div>
        <CollapsibleContent className="ml-4">
          {Object.entries(data).map(([key, value], index) => (
            <div key={index} className="my-1">
              <TreeNode data={value} label={key} />
            </div>
          ))}
        </CollapsibleContent>
      </Collapsible>
    );
  };

  const renderTable = (data: any) => {
    if (typeof data !== "object" || data === null) {
      return <div>Dados não podem ser exibidos em formato de tabela</div>;
    }

    return (
      <table className="w-full border-collapse">
        <thead>
          <tr>
            <th className="border p-2 bg-gray-100">Chave</th>
            <th className="border p-2 bg-gray-100">Valor</th>
          </tr>
        </thead>
        <tbody>
          {Object.entries(data).map(([key, value], index) => (
            <tr key={index}>
              <td className="border p-2">{key}</td>
              <td className="border p-2 font-mono">
                {typeof value === "object"
                  ? JSON.stringify(value)
                  : String(value)}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    );
  };

  return (
    <Tabs defaultValue="tree" className="h-full">
      <TabsList className="mb-4">
        <TabsTrigger value="tree">Árvore</TabsTrigger>
        <TabsTrigger value="text">Texto</TabsTrigger>
        <TabsTrigger value="table">Tabela</TabsTrigger>
      </TabsList>
      
      <ScrollArea className="h-[500px]">
        <TabsContent value="tree" className="m-0">
          <div className="p-4 font-mono bg-white rounded-md">
            <TreeNode data={jsonData} />
          </div>
        </TabsContent>
        
        <TabsContent value="text" className="m-0">
          <pre className="p-4 bg-white rounded-md overflow-x-auto">
            {formatAsText()}
          </pre>
        </TabsContent>
        
        <TabsContent value="table" className="m-0">
          <div className="p-4 bg-white rounded-md overflow-x-auto">
            {renderTable(jsonData)}
          </div>
        </TabsContent>
      </ScrollArea>
    </Tabs>
  );
};

export default JsonViewer;
