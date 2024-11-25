document.getElementById("btnDeletar").addEventListener("click", function(event) {
    // Impede o envio padrão do formulário se o botão estiver dentro de um formulário
    event.preventDefault();

    let onibusPlaca = document.getElementById("placa").value;

    // Exibe uma confirmação antes de excluir os assentos
    let confirmacao = confirm("Tem certeza que deseja excluir todos os assentos deste ônibus?");

    if (confirmacao) {
        // Chama a API para excluir os assentos existentes se o usuário confirmar
        fetch(`./assentos/excluir?placa=${onibusPlaca}`, {
            method: 'DELETE',
        })
        .then(response => {
            if (!response.ok) {
                throw new Error("Erro ao excluir os assentos existentes");
            }
            return response.text();
        })
        .then(data => {
            alert(data);  // Exibe mensagem de sucesso após exclusão
        })
        .catch(error => {
            console.error("Erro:", error);  // Log do erro
            alert("Erro ao excluir os assentos");
        });
    } else {
        alert("Exclusão cancelada.");  // Exibe mensagem caso o usuário cancele a exclusão
    }
});