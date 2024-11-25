document.addEventListener("DOMContentLoaded", function () {
    const apiUrl = 'http://localhost:8080/compras'; // URL da API
    const modal = document.getElementById("infoModal");
    const closeModal = document.querySelector(".close");
    const saveChangesButton = document.getElementById("saveChanges");

    // Função para buscar as compras do servidor
    function buscarCompras() {
        fetch(apiUrl)
            .then(response => response.json())
            .then(compras => {
                preencherTabela(compras);
                reiniciarEventosPlanilhaJS(); // Reaplicar eventos do planilha.js após preencher a tabela
            })
            .catch(error => console.error("Erro ao carregar as compras:", error));
    }

    // Função para preencher a tabela com as compras
    function preencherTabela(compras) {
        const tbody = document.querySelector("tbody");
        tbody.innerHTML = ""; // Limpar a tabela antes de adicionar os novos dados

        compras.forEach((compra, index) => {
            const tr = document.createElement("tr");

            // Formatação do valor pago
            const valorPagoFormatado = compra.valorPago
                ? compra.valorPago.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })
                : '-------------';

            // Formatação da data
            const dataCompraFormatada = compra.dataCompra
                ? new Date(compra.dataCompra).toLocaleDateString('pt-BR', { day: 'numeric', month: 'long' })
                : '';

            // Determinar a classe e texto do status
            let statusClass = '';
            let statusText = 'Pendente';

            switch (compra.status?.toLowerCase()) {
                case 'pago':
                    statusClass = 'delivered';
                    statusText = 'Pago';
                    break;
                case 'cancelado':
                    statusClass = 'cancelled';
                    statusText = 'Cancelado';
                    break;
                case 'pendente':
                default:
                    statusClass = 'shipped';
                    statusText = 'Pendente';
                    break;
            }

            // Montando a linha com o botão Editar
            tr.innerHTML = `
                <td>${index + 1}</td>
                <td>${compra.cpf}</td>
                <td>${compra.nomec}</td>
                <td>${dataCompraFormatada}</td>
                <td>
                    <p class="status ${statusClass}" id="${statusClass}">${statusText}</p>
                </td>
                <td><strong>${valorPagoFormatado}</strong></td>
                <td><button class="edit-button">Editar</button></td>
            `;

            // Evento do botão "Editar" para abrir o modal
            const editButton = tr.querySelector(".edit-button");
            editButton.addEventListener("click", () => abrirModal(compra));

            tbody.appendChild(tr); // Adiciona a linha na tabela
        });
    }

    // Função para abrir o modal e preencher os dados
    function abrirModal(compra) {
        const form = document.getElementById("modalForm");

        // Preencher os campos do modal com os dados da compra
        preencherCamposModal(compra);

        // Salvar alterações feitas no modal
        saveChangesButton.setAttribute("data-id", compra.id); // Definir o ID da compra
        modal.style.display = "block";
    }

    // Função para preencher os campos do modal com os dados
    function preencherCamposModal(compra) {
        // Lista dos campos no modal
        const camposModal = [
            "id", "nomec", "endereco", "assento", "nomeVendedor", "dataCompra", "horarioCompra", "valorPago", "cpf", "onibus", "status", "cep", "numero", "email", "contato"
        ];

        camposModal.forEach(campo => {
            const input = document.getElementById(campo);
            if (input) {
                input.value = compra[campo] || ""; // Preenche com os dados ou deixa vazio
            }
        });

        // Preencher o campo "Método de Pagamento" com as opções selecionáveis
        const metodoPagamento = document.getElementById("metodoPagamento");
        if (metodoPagamento) {
            metodoPagamento.value = compra.metodoPagamento || ""; // Define o valor do método de pagamento
        }
    }

    // Fechar o modal ao clicar no botão "Fechar"
    closeModal.addEventListener("click", () => {
        modal.style.display = "none";
    });

    // Função para salvar alterações no modal
    function salvarAlteracoes() {
        saveChangesButton.addEventListener("click", function () {
            const formData = new FormData(document.getElementById("modalForm"));
            const updatedData = Object.fromEntries(formData.entries());
            const compraId = saveChangesButton.getAttribute("data-id"); // Recuperar o ID da compra

            // Excluir a compra com o ID anterior
            fetch(`${apiUrl}/${compraId}`, {
                method: "DELETE"
            })
            .then(response => {
                if (!response.ok) {
                    return response.text().then(text => {
                        throw new Error(`Erro ao excluir compra: ${response.status} - ${text}`);
                    });
                }
                // Não tentamos chamar response.json() aqui, pois uma exclusão normalmente não retorna um corpo JSON.
                return; // Apenas retorna quando a exclusão for bem-sucedida.
            })
            .then(() => {
                // Após excluir, salvar a nova compra
                fetch(apiUrl, {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify(updatedData)
                })
                .then(response => {
                    if (!response.ok) {
                        return response.text().then(text => {
                            throw new Error(`Erro ao salvar as alterações: ${response.status} - ${text}`);
                        });
                    }
                    return response.json();
                })
                .then(data => {
                    console.log("Alterações salvas:", data);
                    modal.style.display = "none"; // Fechar o modal após salvar
                    buscarCompras(); // Recarregar a tabela
                })
                .catch(error => {
                    console.error("Erro ao salvar as alterações:", error);
                    alert("Houve um erro ao tentar salvar as alterações. Verifique os detalhes no console.");
                });
            })
            .catch(error => {
                console.error("Erro ao excluir compra:", error);
                alert("Houve um erro ao tentar excluir a compra.");
            });
        });
    }

    // Chamar a função salvarAlteracoes uma vez
    salvarAlteracoes();

    // Fechar o modal ao clicar fora dele
    window.addEventListener("click", event => {
        if (event.target == modal) {
            modal.style.display = "none";
        }
    });

    // Função para aplicar eventos do planilha.js
    function reiniciarEventosPlanilhaJS() {
        const search = document.querySelector('.input-group input');
        const tableHeadings = document.querySelectorAll('thead th');
        const tableRows = document.querySelectorAll('tbody tr');

        // Aplicar evento de busca novamente
        if (search) {
            search.addEventListener('input', function () {
                const searchValue = search.value.toLowerCase();
                tableRows.forEach((row, i) => {
                    const text = row.textContent.toLowerCase();
                    row.classList.toggle('hide', !text.includes(searchValue));
                    row.style.setProperty('--delay', `${i / 25}s`);
                });
            });
        }

        // Aplicar evento de ordenação novamente
        tableHeadings.forEach((heading, i) => {
            heading.addEventListener('click', function () {
                let sortAsc = heading.classList.toggle('asc');
                tableHeadings.forEach(h => h.classList.remove('active'));
                heading.classList.add('active');

                [...tableRows].sort((a, b) => {
                    let aText = a.querySelectorAll('td')[i].textContent.trim();
                    let bText = b.querySelectorAll('td')[i].textContent.trim();
                    return sortAsc ? aText.localeCompare(bText) : bText.localeCompare(aText);
                }).forEach(row => row.parentNode.appendChild(row));
            });
        });
    }

    // Inicializar a tabela
    buscarCompras();
});
