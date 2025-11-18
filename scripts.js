/*FUNÇÃO EM JAVASCRIPT (FEITA COM AUXILIO DE IA)*/

// Espera todo o HTML da página ser carregado antes de rodar o script
document.addEventListener("DOMContentLoaded", function() {  
    // Chama a função para carregar o header
    carregarcomponente("header", "../componentes/header.html");
    // Chama a função para carregar o footer
    carregarcomponente("footer", "../componentes/footer.html");
});

function carregarcomponente(id, url) {
    // 1. Busca o conteúdo do arquivo (ex: header.html)
    fetch(url)
        .then(response => {
            // Se não achar o arquivo, avisa no console
            if (!response.ok) {
                throw new Error("Erro ao carregar o componente: " + url);
            }
            return response.text(); // 2. Converte o arquivo em texto
        })
        .then(data => {
            // 3. Pega o elemento "placeholder" na página
            const element = document.getElementById(id);
            if (element) {
                // 4. "Injeta" o HTML do componente dentro do placeholder
                element.innerHTML = data;
            } else {
                console.error("Erro: Placeholder com ID '" + id + "' não foi encontrado.");
            }
        })
        .catch(error => {
            console.error(error);
        });
}