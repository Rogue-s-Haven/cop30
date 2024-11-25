
    document.getElementById('toJSON').addEventListener('click', async () => {
        try {
            // Fazendo a requisição GET para o endpoint
            const response = await fetch('http://localhost:8080/compras');
            
            if (!response.ok) {
                throw new Error(`Erro ao obter dados: ${response.statusText}`);
            }

            const data = await response.json();
            
            // Criando um arquivo JSON para download
            const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
            const url = URL.createObjectURL(blob);

            // Criando o link de download
            const a = document.createElement('a');
            a.href = url;
            a.download = 'relatorio_compras.json';
            a.click();

            // Limpando o URL do objeto para liberar memória
            URL.revokeObjectURL(url);
        } catch (error) {
            console.error('Erro ao exportar JSON:', error);
            alert('Erro ao exportar JSON. Verifique o console para mais detalhes.');
        }
    });
