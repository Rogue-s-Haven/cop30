document.getElementById("formCadastro").addEventListener("submit", function(event) {
    event.preventDefault(); // Impede o envio padrão do formulário

    let onibusPlaca = document.getElementById("placa").value;
    let numeroAssento = document.getElementById("numero_assentos").value;
    let status = "disponível"; // Adiciona o status "disponível" para todos os assentos

    // Monta o objeto JSON a ser enviado
    let requestBody = {
        onibusPlaca: onibusPlaca,
        numeroAssento: numeroAssento,
        status: status
    };

    // Enviar os dados via fetch para o backend
    fetch('./assentos/criar', {  // Ajuste a URL conforme necessário
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'  // Definir o tipo como JSON
        },
        body: JSON.stringify(requestBody)  // Converte o objeto para JSON
    })
    .then(response => response.text())  // Recebe a resposta do servidor
    .then(data => {
        alert(data);  // Mensagem de sucesso ou erro
    })
    .catch(error => {
        console.error("Erro:", error);  // Log do erro
    });
});
