const {select, input, checkbox} = require('@inquirer/prompts')
let mensagem = "Bem vindo ao APP metas";

let meta = {
    value: "Tomar 3l de agua por dia",
    checked: false,

}
let metas = [meta]

const cadastrarMeta = async ()=> {

    const meta = await input ({message: "Digite a meta:"})

    if (meta.length == 0) {
        mensagem = " A meta nao pode ser vazia."
        return
    }
    metas.push({
        value:meta,checked: false
    })
    mensagem =" Meta cadastrada com sucesso"
}

const listarMetas =async () => {
    const respostas = await checkbox({
        message:"Use as setas para mudar de meta, o espaco para selecionar e o enter para finalizar",
        choices:[...metas],
        instructions:false,
    })
    metas.forEach((m) => {
        m.checked = false     
    })

    if(respostas.length == 0){
        mensagem = "Nenhuma meta selecionada"
        return
    }
                                                                     
  
                           
    respostas.forEach ((resposta)=>{
        const meta = metas.find((m)=>{
            return m.value == resposta
        })

        meta.checked = true
    })

    mensagem ="Meta(s) marcada como  concluida(s)"
}

const metasRealizadas = async () => {
    const realizadas = metas.filter((meta) => {
return meta.checked
    })
if (realizadas.length == 0) {
    mensagem = "Nao exitem metas realizadas :( "
    return
}
await select ({
    message : "metas Realizadas " + realizadas.length,
    choices : [...realizadas]
})
    console.log (realizadas)
}

const metasAbertas = async () => {
    const abertas = metas.filter((meta) => {
  return meta.checked != true // ou !meta.checked
    })

    if (abertas.length == 0){
        mensagem = " Nao existem metas abertas :) "
        return 
    }

    await select({
        message: "metas abertas " + abertas.length,
        choices: [...abertas]
    })

}

const metasDeletadas = async () => {

    const metasDesmarcadas = metas.map((meta) => {

     return {value: meta.value, checked: false}
    })
     
    const itensADeletar = await checkbox({
        message:"Selecione itens para deletar",
        choices:[...metasDesmarcadas],
        instructions:false

    })
    if (itensADeletar.length == 0) {
        mensagem = "Nenhum item pra deletar"
        return
    }

    itensADeletar.forEach((item) => {

        metas = metas.filter((meta) => {
            return meta.value != item
        })
    })
mensagem = "Meta(s) deletada(s) com sucesso"
   
}

const mostrarMenssagem = () => {
    console.clear();
    if (mensagem != ""){
        console.log(mensagem)
        console.log("")
        mensagem = ""
    }
}




const  start = async()=>{
    
    
while (true){
    mostrarMenssagem()

    const opcao = await select({
        message:"menu >",
        choices:[{
            name:"cadastrar meta",
            value:"cadastrar"
        },
        {
            name:"Listar metas",
            value:"listar"
        },
        {
            name:"Metas Realizadas",
            value:"realizadas"
        },
        {
            name:"Metas Abertas",
            value:"abertas"
        },
        {
            name:"Deletar Metas ",
            value:"deletar"
        },
        {
            name:"Sair",
            value:"sair"
        }
        ]

    })
switch(opcao){
    case "cadastrar":
      await cadastrarMeta()
    
    break
    case "listar":
        await listarMetas()
        break

    case "realizadas":
        await metasRealizadas()
        break

    case "abertas":
        await metasAbertas()
        break

    case "deletar":
            await metasDeletadas()
            break

    case "sair":
        console.log("ate a proxima")
        return
}
}
}

start()


