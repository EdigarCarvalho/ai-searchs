# Algoritmo de Buscas para Traçar Diferentes Rotas

Este projeto implementa um algoritmo de buscas para encontrar diferentes rotas com base no mapa fornecido. O algoritmo solicita ao usuário a origem e o destino do translado e retorna os resultados de diversas estratégias de busca, incluindo o somatório das distâncias percorridas.

https://github.com/user-attachments/assets/b61ccb88-a788-43d2-9b95-0532028c20b7

## Estratégias de Busca Implementadas

### 1. Buscas sem Informação (Buscas Cegas)
1.1. **Busca em Extensão (Amplitude)**  
1.2. **Busca de Custo Uniforme**  
1.3. **Busca em Profundidade**  
1.4. **Busca em Profundidade Limitada**  
1.5. **Busca de Aprofundamento Iterativo**  
1.6. **Busca Direcional**  

### 2. Buscas com Informação (Buscas Heurísticas)
2.1. **Busca Gulosa**  
2.2. **Algoritmo A\*** 
 
![image](https://github.com/user-attachments/assets/196eb895-e85f-4925-adb9-e7ffe57db948)

## Como Executar o Projeto

### Pré-requisitos
- Node.js (versão 14 ou superior)
- npm (gerenciador de pacotes do Node.js)

### Instalação
1. Clone o repositório
   ```bash
   git clone https://github.com/EdigarCarvalho/ai-searchs.git
   cd ifma/ai
   ```

2. Instale as dependências
   ```bash
   npm install
   ```

### Execução
1. Inicie o servidor de desenvolvimento
   ```bash
   npm start ou npm dev
   ```

2. Ou faça a build do projeto
   ```bash
   npm run build
   ```

3. Acesse a aplicação
   - O servidor de desenvolvimento abrirá automaticamente o navegador em http://localhost:9000
   - Se você fez apenas a build, abra o arquivo public/index.html em seu navegador

-- English

# Search Algorithm for Mapping Different Routes

This project implements a search algorithm to find different routes based on the provided map. The algorithm prompts the user to enter the starting point and destination, then returns the results of various search strategies, including the total distance traveled.

## Implemented Search Strategies

### 1. Uninformed Search (Blind Search)
1.1. **Breadth-First Search (BFS)**  
1.2. **Uniform Cost Search (UCS)**  
1.3. **Depth-First Search (DFS)**  
1.4. **Limited Depth Search**  
1.5. **Iterative Deepening Search (IDS)**  
1.6. **Directional Search**  

### 2. Informed Search (Heuristic Search)
2.1. **Greedy Search**  
2.2. **A\* Algorithm**  

 
![image](https://github.com/user-attachments/assets/196eb895-e85f-4925-adb9-e7ffe57db948)

## How to Run the Project

### Prerequisites
- Node.js (version 14 or higher)
- npm (Node.js package manager)

### Installation
1. Clone the repository
   ```bash
   git clone https://github.com/EdigarCarvalho/ai-searchs.git
   cd ifma/ai
   ```

2. Install dependencies
   ```bash
   npm install
   ```

### Running
1. Start the development server
   ```bash
   npm start or npm dev
   ```

2. Or build the project
   ```bash
   npm run build
   ```

3. Access the application
   - The development server will automatically open the browser at http://localhost:9000
   - If you only built the project, open the public/index.html file in your browser
