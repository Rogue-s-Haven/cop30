document.getElementById("formEdicao").addEventListener("submit", function(event) {
    event.preventDefault(); // Impede o envio padrão do formulário

    let onibusPlaca = document.getElementById("placa").value;
    let numeroAssento = document.getElementById("numero_assentos").value;
    let status = "disponível"; // Adiciona o status "disponível" para todos os assentos

    // Passo 1: Excluir assentos existentes
    fetch(`./assentos/excluir?placa=${onibusPlaca}`, { // Ajuste a URL conforme necessário
        method: 'DELETE',
    })
    .then(response => {
        if (!response.ok) {
            throw new Error("Erro ao excluir os assentos existentes");
        }
        return response.text(); // Resposta do backend após exclusão
    })
    .then(() => {
        // Passo 2: Criar novos assentos
        let requestBody = {
            onibusPlaca: onibusPlaca,
            numeroAssento: numeroAssento,
            status: status
        };

        return fetch('./assentos/criar', {  // Ajuste a URL conforme necessário
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'  // Definir o tipo como JSON
            },
            body: JSON.stringify(requestBody)  // Converte o objeto para JSON
        });
    })
    .then(response => {
        if (!response.ok) {
            throw new Error("Erro ao criar os novos assentos");
        }
        return response.text(); // Resposta do backend após criação
    })
    .then(data => {
        alert(data);  // Mensagem de sucesso
    })
    .catch(error => {
        console.error("Erro:", error);  // Log do erro
    });
});
