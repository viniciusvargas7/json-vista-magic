
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ScrollArea } from "@/components/ui/scroll-area";

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

  const renderTree = (data: any, level = 0) => {
    if (typeof data !== "object" || data === null) {
      return <span className="text-blue-600">{JSON.stringify(data)}</span>;
    }

    return (
      <div style={{ marginLeft: level * 20 }}>
        {Object.entries(data).map(([key, value], index) => (
          <div key={index} className="my-1">
            <span className="text-gray-700">{key}: </span>
            {renderTree(value, level + 1)}
          </div>
        ))}
      </div>
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
            {renderTree(jsonData)}
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
