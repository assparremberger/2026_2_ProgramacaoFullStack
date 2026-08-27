const URL = "http://localhost:8001"
const endPointCategoria = URL + "/category"
const endPointProduto = URL + "/product"

const formulario = document.getElementById("formCategoria")

const campoId = document.getElementById("idCat")
const campoNome = document.getElementById("txtNome")

const listaCategorias = document.getElementById("listaCategorias")

async function loadCategorias() {
    
    try{
        const resposta = await fetch( endPointCategoria )
        if( !resposta.ok ){
            alert("Erro")
            return
        }

        const categorias = await resposta.json()

    }catch( erro ){
        console.error( erro )
        alert( "Erro ao carregar categorias!")
    }
    
}

