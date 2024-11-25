document.addEventListener("DOMContentLoaded", () => {
    const formCompra = document.getElementById("formCompra");
    const onibusSelect = document.getElementById("onibus");
    const assentoSelect = document.getElementById("assento");

    // Função para enviar o status do assento para o servidor
    async function atualizarAssento(onibusPlaca, numeroAssento) {
        const url = `http://localhost:8080/assentos/${onibusPlaca}/${numeroAssento}`;
        const dadosAssento = {
            id: "", // Opcional, pode ser preenchido pelo backend se necessário
            onibusPlaca,
            numeroAssento: parseInt(numeroAssento, 10),
            status: "ocupado"
        };

        try {
            const response = await fetch(url, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(dadosAssento)
            });

            if (!response.ok) {
                throw new Error("Erro ao atualizar o status do assento");
            }

            alert("Assento atualizado com sucesso!");
        } catch (error) {
            console.error("Erro ao atualizar assento:", error);
            alert("Erro ao atualizar o assento. Tente novamente.");
        }
    }

    // Evento de submissão do formulário
    formCompra.addEventListener("submit", async (event) => {
        event.preventDefault();

        const onibusPlaca = onibusSelect.value;
        const numeroAssento = assentoSelect.value;

        if (onibusPlaca && numeroAssento) {
            await atualizarAssento(onibusPlaca, numeroAssento);
        } else {
            alert("Por favor, selecione o ônibus e o assento.");
        }
    });
});
