const resposta = document.querySelector("#resposta");
const lista = document.querySelector("#lista-atletas");
const modelo = document.querySelector("#modelo-atleta");


const apiKey = "cv_smKHJEv3e4V8qLqAxJE4rw5B4wXZb38uBeLTMTKOXQw92z9onHUK1jzp8t6MfBYs";

const apiUrl = "https://api-ds.codeverse.dev.br/api/atletas";

async function buscarAtletas() {

  resposta.textContent="Carregando atletas..."
  
  try {
    const retorno = await fetch(apiUrl, {
      method: "GET",
      headers: {"x-api-key" : apiKey},
    });
    
    if(!retorno.ok){
      throw new Error("Não foi possível carregar os atletas.");
    }

    const resultado = await retorno.json();


    for (const atleta of resultado.data){

      const card = modelo.content.cloneNode(true);



      card.querySelector(".nome").textContent = atleta.nome;
      card.querySelector(".esporte").textContent = atleta.esporte;
      card.querySelector(".pais").textContent = atleta.pais;
      card.querySelector(".idade").textContent = atleta.idade;  
      card.querySelector(".conquistas").textContent = atleta.conquistas;

      const imagem = card.querySelector(".imagem-atleta");

      if (atleta.imageUrl){
        imagem.src = atleta.imageUrl;
        imagem.alt = atleta.nome;
        
        imagem.onerror = () => imagem.remove();
        
      } else {
        imagem.remove();
      }

      lista.appendChild(card);
      resposta.textContent = "";

    }

  } catch (error) {
    console.error(error);
    resposta.textContent= "Não foi possível carregar os atletas. Tente novamente!" 
  }
}


buscarAtletas();