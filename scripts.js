/*FUNÇÃO EM JAVASCRIPT (FEITA COM AUXILIO DE IA)*/

document.addEventListener("DOMContentLoaded", function() {
    // Detecta se a página atual está dentro da pasta "website"
    const isSubfolder = window.location.pathname.includes("/website/");
    
    // Se estiver na subpasta, usa "../" para voltar. Se estiver na raiz, usa "./" (pasta atual)
    const pathPrefix = isSubfolder ? "../" : "./";

    // Carrega os componentes usando o prefixo correto
    carregarcomponente("header", pathPrefix + "componentes/header.html");
    carregarcomponente("footer", pathPrefix + "componentes/footer.html");
});

function carregarcomponente(id, url) {
    fetch(url)
        .then(response => {
            if (!response.ok) throw new Error("Erro ao carregar: " + url);
            return response.text();
        })
        .then(data => {
            const element = document.getElementById(id);
            if (element) {
                element.innerHTML = data;
                
                // IMPORTANTE: Após carregar o header, precisamos corrigir os links do menu
                corrigirLinksMenu(element);
            }
        })
        .catch(error => console.error(error));
}

/* Função extra para garantir que os links do menu funcionem em qualquer página */
function corrigirLinksMenu(element) {
    // Verifica onde estamos de novo
    const isSubfolder = window.location.pathname.includes("/website/");
    
    // Pega todos os links (tags 'a') dentro do header/footer carregado
    const links = element.querySelectorAll('a');
    
    links.forEach(link => {
        const href = link.getAttribute('href');
        
        // Se for link externo (http) ou âncora (#), ignora
        if (!href || href.startsWith('http') || href.startsWith('#')) return;

        // LÓGICA PARA CORRIGIR OS LINKS:
        
        // 1. Se estamos na raiz (index.html) e o link aponta para algo na raiz (ex: index.html)
        // não precisa mudar nada. Mas se aponta para index.html vindo de fora, ajustamos.
        
        if (isSubfolder) {
            // ESTAMOS NA PASTA WEBSITE (ex: p3.html)
            // Se o link for apenas "index.html", ele quebraria. Temos que mudar para "../index.html"
            if (href === "index.html" || href === "./index.html") {
                link.setAttribute('href', "../index.html");
            }
            // Se o link for para outra página do site (ex: p2.html) e estiver escrito "website/p2.html",
            // temos que mudar para apenas "p2.html" pois já estamos na pasta website.
            else if (href.includes("website/")) {
                link.setAttribute('href', href.replace("website/", ""));
            }
        } else {
            // ESTAMOS NA RAIZ (index.html)
            // Se o link for "index.html", funciona.
            // Se o link for "p2.html", vai quebrar. Tem que ser "website/p2.html".
            // O ideal é que no seu header.html os links para as páginas internas sejam "website/p2.html"
        }
    });
}