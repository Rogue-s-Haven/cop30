document.addEventListener("DOMContentLoaded", function() {
    const formCompra = document.getElementById('formCompra');  // O formulário onde o status do assento será atualizado
    const assentoSelect = document.getElementById('assento');  // O select de assentos
    const statusSelect = document.getElementById('status');    // O select de status (disponível / ocupado)

    // Quando o formulário for enviado
    formCompra.addEventListener('submit', function(event) {
        event.preventDefault(); // Previne o comportamento padrão do formulário

        const assentoId = assentoSelect.value; // ID do assento selecionado
        const novoStatus = statusSelect.value; // Status selecionado (disponível / ocupado)

        // Verifica se o assento e o status estão selecionados
        if (!assentoId || !novoStatus) {
            alert('Por favor, selecione um assento e um status.');
            return;
        }

        // Faz a requisição PUT para atualizar o status do assento no banco
        fetch(`http://localhost:8080/assento/${assentoId}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ status: novoStatus })  // Envia o novo status como JSON
        })
        .then(response => {
            if (response.ok) {
                alert('Status do assento atualizado com sucesso!');
            } else {
                alert('Falha ao atualizar o status. Tente novamente.');
            }
        })
        .catch(error => {
            console.error('Erro ao atualizar o status:', error);
            alert('Ocorreu um erro ao tentar atualizar o status.');
        });
    });
});
