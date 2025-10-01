const txtPersonagem = document.querySelector('#personagem')
const txtNome = document.querySelector('#nome');                               
const txtPai = document.querySelector('#pai');
const txtMae = document.querySelector('#mae');
const txtVila = document.querySelector('#vila');
const txtRank = document.querySelector('#rank');
const txtResumo = document.querySelector('#resumo');
const txtPower = document.querySelector('#power');
const txtJutsus = document.querySelector('#jutsus');

async function buscaPersonagem() {


    const resultDiv = document.querySelector('#resultDiv');
    let personagemBuscado = document.querySelector('#personagem').value;


    await fetch(`https://naruto-br-api.site/characters/${personagemBuscado}`)
        .then(response => response.json())
        .then(dados => {

            console.log(dados);

            if (!dados.name) {
                resultDiv.innerHTML = '<p>Personagem não encontrado. Tente novamente.</p>';

            } else {


                txtNome.value = dados.name || "Nome não informado";
                txtPai.value = dados.family?.father || "Desconhecido";
                txtMae.value = dados.family?.mother || "Desconhecida";
                txtVila.value = typeof dados.village === "object" 
                ? dados.village.name || "Não informado" // Ajuste conforme a estrutura do objeto
                 : dados.village || "Não informado";

                txtRank.value = dados.rank || " Não informado";
                txtResumo.value = dados.summary || "Sem resumo disponível";
                txtPower.value = dados.power || "Não informado";
                txtJutsus.value = Array.isArray(dados.jutsus) && dados.jutsus.length > 0
                ? dados.jutsus.map(j => j.name).join(", ")
                : "Nenhum Jutsus cadastrado";
            
            }

            console.log(dados.village);
            console.log(dados.jutsus.join(", "));

        })
        .catch(err =>{
            console.error(err);
            resultDiv.innerHTML = '<p>Erro ao buscar personagem.</p>'

        });



}

function limparDados() {
    txtPersonagem.value = "";
    txtNome.value = "";
    txtPai.value = "";
    txtMae.value = "";
    txtVila.value = "";
    txtRank.value = "";
    txtResumo.value = "";
    txtPower.value = "";
    txtJutsus.value = "";
    document.querySelector('#resultDiv').innerHTML = "";
  }
  