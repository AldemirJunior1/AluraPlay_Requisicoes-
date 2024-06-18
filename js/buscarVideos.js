import { conectaApi } from "./conectaApi.js";
import constroiCard from "./mostrarVideos.js";

async function buscaVideos(evento) {
    evento.preventDefault();
   
    const dadosDePesquisa = document.querySelector("[data-pesquisa]").value.toLowerCase();
    const busca = await conectaApi.buscaVideos(dadosDePesquisa); // Presumindo que conectaApi.buscaVideos aceita um argumento de pesquisa

    const lista = document.querySelector("[data-lista]");

    // Limpa a lista de vídeos existente
    while (lista.firstChild) {
        lista.removeChild(lista.firstChild);
    }

    // Filtra e adiciona vídeos correspondentes ao termo de pesquisa
    const resultadosFiltrados = busca.filter(elemento => 
        elemento.titulo.toLowerCase().includes(dadosDePesquisa)
    );

    if (resultadosFiltrados.length === 0) {
        lista.innerHTML = `<h2 class="mensagem__titulo">Não existem vídeos com esse termo "${dadosDePesquisa}"</h2>`;
    } else {
        resultadosFiltrados.forEach(elemento => {
            lista.appendChild(constroiCard(elemento.titulo, elemento.descricao, elemento.url, elemento.imagem));
        });
    }
}

const botaoDePesquisa = document.querySelector("[data-botao-pesquisa]");
botaoDePesquisa.addEventListener("click", evento => buscaVideos(evento));
