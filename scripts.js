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
                
                // Corrige os links do menu (sua função antiga)
                corrigirLinksMenu(element);
                
                // NOVO: Corrige o caminho das imagens (logo e ícones)
                corrigirCaminhosImagens(element);
            }
        })
        .catch(error => console.error(error));
}

/* Função para corrigir os links (<a>) */
function corrigirLinksMenu(element) {
    const isSubfolder = window.location.pathname.includes("/website/");
    const links = element.querySelectorAll('a');
    
    links.forEach(link => {
        const href = link.getAttribute('href');
        
        if (!href || href.startsWith('http') || href.startsWith('#')) return;

        if (isSubfolder) {
            // Estamos na subpasta (ex: p2.html)
            if (href === "index.html" || href === "./index.html") {
                link.setAttribute('href', "../index.html");
            }
            else if (href.includes("website/")) {
                link.setAttribute('href', href.replace("website/", ""));
            }
        } else {
            // Estamos na raiz (index.html)
            // Se o link for "index.html", ok.
            // Se o link apontar para uma página interna sem o prefixo, o padrão HTML já deve resolver,
            // mas aqui mantemos a lógica existente.
        }
    });
}

/* NOVA FUNÇÃO: Garante que as imagens apareçam tanto na raiz quanto nas subpastas */
function corrigirCaminhosImagens(element) {
    const isSubfolder = window.location.pathname.includes("/website/");
    const images = element.querySelectorAll('img');

    images.forEach(img => {
        const src = img.getAttribute('src');
        
        // Se não tiver src ou for imagem externa (http), ignora
        if (!src || src.startsWith('http')) return;

        // LÓGICA:
        // O header.html provavelmente tem as imagens como "../imagens/foto.png" (para funcionar nas subpastas).
        
        if (!isSubfolder) {
            // ESTAMOS NA RAIZ (index.html)
            // Precisamos remover o "../" para virar "./imagens/..." ou apenas "imagens/..."
            if (src.startsWith("../")) {
                img.setAttribute('src', src.replace("../", "./"));
            }
        } 
        // Se estivermos na subpasta (isSubfolder = true), o caminho "../" que já está no HTML
        // é o correto, então não precisamos fazer nada.
    });
}