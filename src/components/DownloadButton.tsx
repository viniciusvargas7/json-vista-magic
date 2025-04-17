
import React from 'react';
import { Button } from "@/components/ui/button";
import { Download } from "lucide-react";

const DownloadButton = () => {
  const generateHTML = () => {
    // Get all CSS from stylesheets
    const styles = Array.from(document.styleSheets)
      .filter(sheet => {
        try {
          // Check if it's a same-origin stylesheet (not external)
          return sheet.cssRules !== null;
        } catch (e) {
          return false;
        }
      })
      .map(sheet => {
        try {
          return Array.from(sheet.cssRules)
            .map(rule => rule.cssText)
            .join('\n');
        } catch (e) {
          console.error('Error accessing CSS rules:', e);
          return '';
        }
      })
      .join('\n');

    // Create the HTML content with inline styles and scripts
    const htmlContent = `
<!DOCTYPE html>
<html lang="pt-BR">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Formatador de JSON</title>
  <style>
    ${styles}
    
    /* Additional custom styles for standalone version */
    body {
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen,
        Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
      margin: 0;
      padding: 0;
    }
    
    #root {
      width: 100%;
      margin: 0;
      padding: 0;
    }
    
    .container {
      padding: 0 16px;
      max-width: 1200px;
      margin: 0 auto;
    }
    
    .header {
      width: 100%;
      background-color: #221F26;
      color: white;
      padding: 16px 0;
      margin-bottom: 24px;
    }
    
    .header h1 {
      font-size: 1.5rem;
      font-weight: bold;
      margin: 0;
    }
    
    .main-content {
      padding: 0 16px 32px;
      background-color: rgba(200, 200, 201, 0.2);
      min-height: calc(100vh - 80px);
      display: flex;
      flex-direction: column;
    }
    
    .grid-container {
      display: grid;
      grid-template-columns: 1fr;
      gap: 24px;
      margin-bottom: 24px;
    }
    
    @media (min-width: 768px) {
      .grid-container {
        grid-template-columns: 1fr 1fr;
      }
    }
    
    .json-box {
      border: 1px solid #8A898C;
      border-radius: 8px;
      padding: 16px;
      background-color: rgba(159, 158, 161, 0.1);
      height: 600px;
      display: flex;
      flex-direction: column;
    }
    
    .json-box h2 {
      font-size: 1.125rem;
      font-weight: 600;
      margin-bottom: 16px;
      color: #221F26;
    }
    
    .input-area {
      height: calc(100% - 40px);
      width: 100%;
    }
    
    .textarea {
      width: 100%;
      height: 100%;
      font-family: monospace;
      resize: none;
      background-color: rgba(142, 145, 150, 0.1);
      color: #403E43;
      border: 1px solid #8A898C;
      border-radius: 4px;
      padding: 8px;
    }
    
    .textarea:focus {
      outline: none;
      border-color: #33C3F0;
    }
    
    .format-button {
      margin-top: 24px;
      padding: 8px 16px;
      background-color: #0FA0CE;
      color: white;
      border: none;
      border-radius: 4px;
      cursor: pointer;
      font-weight: 500;
      transition: background-color 0.2s;
    }
    
    .format-button:hover {
      background-color: #33C3F0;
    }
    
    .format-button:disabled {
      opacity: 0.6;
      cursor: not-allowed;
    }
    
    .tabs {
      width: 100%;
      margin-bottom: 16px;
    }
    
    .tabs-list {
      display: flex;
      gap: 8px;
      border-bottom: 1px solid #e5e7eb;
      margin-bottom: 16px;
    }
    
    .tab {
      padding: 8px 16px;
      background: none;
      border: none;
      cursor: pointer;
      border-bottom: 2px solid transparent;
    }
    
    .tab.active {
      border-bottom-color: #0FA0CE;
      color: #0FA0CE;
    }
    
    .tab-content {
      display: none;
      height: 500px;
      overflow: auto;
    }
    
    .tab-content.active {
      display: block;
    }
    
    pre {
      margin: 0;
      padding: 16px;
      background-color: white;
      border-radius: 4px;
      overflow-x: auto;
      white-space: pre-wrap;
    }
    
    .tree-view {
      font-family: monospace;
      padding: 16px;
      background-color: white;
      border-radius: 4px;
    }
    
    .table-view {
      padding: 16px;
      background-color: white;
      border-radius: 4px;
      overflow-x: auto;
    }
    
    table {
      width: 100%;
      border-collapse: collapse;
    }
    
    th, td {
      border: 1px solid #e5e7eb;
      padding: 8px;
      text-align: left;
    }
    
    th {
      background-color: #f9fafb;
    }
    
    .collapsible {
      margin-bottom: 4px;
    }
    
    .collapsible-trigger {
      background: none;
      border: none;
      cursor: pointer;
      padding: 4px;
      display: inline-flex;
      align-items: center;
    }
    
    .collapsible-trigger:hover {
      background-color: #f9fafb;
      border-radius: 4px;
    }
    
    .collapsible-content {
      margin-left: 16px;
    }
    
    .toast-container {
      position: fixed;
      bottom: 16px;
      right: 16px;
      z-index: 9999;
    }
    
    .toast {
      padding: 12px 16px;
      border-radius: 4px;
      margin-bottom: 8px;
      display: flex;
      align-items: center;
      box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
      animation: slideIn 0.3s ease-out;
      max-width: 350px;
    }
    
    .toast-success {
      background-color: #34d399;
      color: white;
    }
    
    .toast-error {
      background-color: #f87171;
      color: white;
    }
    
    @keyframes slideIn {
      from {
        transform: translateX(100%);
        opacity: 0;
      }
      to {
        transform: translateX(0);
        opacity: 1;
      }
    }
  </style>
</head>
<body>
  <div id="root">
    <div class="header">
      <div class="container">
        <h1>Formatador de JSON</h1>
      </div>
    </div>
    
    <div class="main-content container">
      <div class="grid-container">
        <div class="json-box">
          <h2>JSON de Entrada</h2>
          <div class="input-area">
            <textarea id="jsonInput" class="textarea" placeholder="Cole seu JSON aqui..."></textarea>
          </div>
        </div>
        
        <div class="json-box">
          <h2>JSON Formatado</h2>
          <div class="tabs">
            <div class="tabs-list">
              <button class="tab active" data-tab="tree">Árvore</button>
              <button class="tab" data-tab="text">Texto</button>
              <button class="tab" data-tab="table">Tabela</button>
            </div>
            
            <div class="tab-content active" id="tree-tab">
              <div class="tree-view" id="tree-view"></div>
            </div>
            
            <div class="tab-content" id="text-tab">
              <pre id="text-view"></pre>
            </div>
            
            <div class="tab-content" id="table-tab">
              <div class="table-view" id="table-view"></div>
            </div>
          </div>
        </div>
      </div>
      
      <div style="display: flex; justify-content: center;">
        <button id="formatButton" class="format-button" disabled>Formatar</button>
      </div>
    </div>
    
    <div class="toast-container" id="toast-container"></div>
  </div>

  <script>
    // Toast notification system
    class Toast {
      constructor() {
        this.container = document.getElementById('toast-container');
      }
      
      show(message, type = 'success') {
        const toast = document.createElement('div');
        toast.className = \`toast toast-\${type}\`;
        toast.innerText = message;
        
        this.container.appendChild(toast);
        
        setTimeout(() => {
          toast.style.opacity = '0';
          toast.style.transform = 'translateX(100%)';
          toast.style.transition = 'all 0.3s ease-out';
          
          setTimeout(() => {
            this.container.removeChild(toast);
          }, 300);
        }, 3000);
      }
    }
    
    // Main application
    document.addEventListener('DOMContentLoaded', () => {
      const jsonInput = document.getElementById('jsonInput');
      const formatButton = document.getElementById('formatButton');
      const treeView = document.getElementById('tree-view');
      const textView = document.getElementById('text-view');
      const tableView = document.getElementById('table-view');
      const tabs = document.querySelectorAll('.tab');
      const tabContents = document.querySelectorAll('.tab-content');
      
      const toast = new Toast();
      let formattedJson = null;
      
      // Tab switching
      tabs.forEach(tab => {
        tab.addEventListener('click', () => {
          // Remove active class from all tabs
          tabs.forEach(t => t.classList.remove('active'));
          tabContents.forEach(c => c.classList.remove('active'));
          
          // Add active class to current tab
          tab.classList.add('active');
          const tabId = tab.dataset.tab + '-tab';
          document.getElementById(tabId).classList.add('active');
        });
      });
      
      // Enable/disable format button based on input
      jsonInput.addEventListener('input', () => {
        formatButton.disabled = !jsonInput.value.trim();
      });
      
      // Format button click handler
      formatButton.addEventListener('click', () => {
        try {
          if (!jsonInput.value.trim()) {
            toast.show('Por favor, insira um JSON válido', 'error');
            return;
          }
          
          formattedJson = JSON.parse(jsonInput.value);
          
          // Update text view
          textView.innerText = JSON.stringify(formattedJson, null, 2);
          
          // Update tree view
          treeView.innerHTML = '';
          renderTreeView(formattedJson, treeView);
          
          // Update table view
          tableView.innerHTML = '';
          renderTableView(formattedJson, tableView);
          
          toast.show('JSON formatado com sucesso!');
        } catch (error) {
          toast.show('JSON inválido. Verifique a sintaxe.', 'error');
        }
      });
      
      // Tree view renderer
      function renderTreeView(data, container, label) {
        if (typeof data !== 'object' || data === null) {
          const valueEl = document.createElement('div');
          valueEl.className = 'flex items-center gap-2';
          
          if (label) {
            const labelEl = document.createElement('span');
            labelEl.className = 'text-gray-700';
            labelEl.innerText = label + ': ';
            valueEl.appendChild(labelEl);
          }
          
          const valueTextEl = document.createElement('span');
          valueTextEl.className = 'text-blue-600';
          valueTextEl.innerText = JSON.stringify(data);
          valueEl.appendChild(valueTextEl);
          
          container.appendChild(valueEl);
          return;
        }
        
        const collapsible = document.createElement('div');
        collapsible.className = 'collapsible';
        
        const header = document.createElement('div');
        header.className = 'flex items-center gap-1';
        
        const trigger = document.createElement('button');
        trigger.className = 'collapsible-trigger';
        
        const icon = document.createElement('span');
        icon.innerHTML = '▼';
        icon.style.fontSize = '10px';
        icon.style.width = '16px';
        icon.style.height = '16px';
        icon.style.display = 'inline-flex';
        icon.style.alignItems = 'center';
        icon.style.justifyContent = 'center';
        
        trigger.appendChild(icon);
        header.appendChild(trigger);
        
        if (label) {
          const labelEl = document.createElement('span');
          labelEl.className = 'text-gray-700';
          labelEl.innerText = label;
          header.appendChild(labelEl);
        }
        
        const content = document.createElement('div');
        content.className = 'collapsible-content';
        
        let isOpen = true;
        
        trigger.addEventListener('click', () => {
          isOpen = !isOpen;
          content.style.display = isOpen ? 'block' : 'none';
          icon.innerHTML = isOpen ? '▼' : '►';
        });
        
        collapsible.appendChild(header);
        collapsible.appendChild(content);
        container.appendChild(collapsible);
        
        Object.entries(data).forEach(([key, value]) => {
          renderTreeView(value, content, key);
        });
      }
      
      // Table view renderer
      function renderTableView(data, container) {
        if (typeof data !== 'object' || data === null) {
          container.innerText = 'Dados não podem ser exibidos em formato de tabela';
          return;
        }
        
        const table = document.createElement('table');
        
        const thead = document.createElement('thead');
        const headerRow = document.createElement('tr');
        
        const keyHeader = document.createElement('th');
        keyHeader.innerText = 'Chave';
        
        const valueHeader = document.createElement('th');
        valueHeader.innerText = 'Valor';
        
        headerRow.appendChild(keyHeader);
        headerRow.appendChild(valueHeader);
        thead.appendChild(headerRow);
        
        const tbody = document.createElement('tbody');
        
        Object.entries(data).forEach(([key, value]) => {
          const row = document.createElement('tr');
          
          const keyCell = document.createElement('td');
          keyCell.innerText = key;
          
          const valueCell = document.createElement('td');
          valueCell.style.fontFamily = 'monospace';
          
          if (typeof value === 'object' && value !== null) {
            valueCell.innerText = JSON.stringify(value);
          } else {
            valueCell.innerText = String(value);
          }
          
          row.appendChild(keyCell);
          row.appendChild(valueCell);
          tbody.appendChild(row);
        });
        
        table.appendChild(thead);
        table.appendChild(tbody);
        container.appendChild(table);
      }
    });
  </script>
  <!-- IMPORTANT: DO NOT REMOVE THIS SCRIPT TAG OR THIS VERY COMMENT! -->
  <script src="https://cdn.gpteng.co/gptengineer.js" type="module"></script>
</body>
</html>
    `;

    // Create a Blob from the HTML content
    const blob = new Blob([htmlContent], { type: 'text/html' });
    const url = URL.createObjectURL(blob);
    
    // Create a temporary link and trigger download
    const link = document.createElement('a');
    link.href = url;
    link.download = 'formatador-json.html';
    document.body.appendChild(link);
    link.click();
    
    // Clean up
    document.body.removeChild(link);
    setTimeout(() => URL.revokeObjectURL(url), 100);
  };

  return (
    <Button onClick={generateHTML} className="mt-4 bg-[#0FA0CE] hover:bg-[#33C3F0] text-white">
      <Download className="mr-2 h-4 w-4" />
      Download HTML
    </Button>
  );
};

export default DownloadButton;
