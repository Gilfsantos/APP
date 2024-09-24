const {select, input, checkbox} = require('@inquirer/prompts')

let meta = {
    value: "Tomar 3l de agua por dia",
    checked: false,

}
let metas = [meta]

const cadastrarMeta = async ()=> {

    const meta = await input ({message: "Digite a meta:"})

    if (meta.length == 0) {
        console.log (" A meta nao pode ser vazia.")
        return
    }
    metas.push({
        value:meta,checked: false
    })
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
        console.log("Nenhuma meta selecionada")
        return
    }
                                                                     
  
                           
    respostas.forEach ((resposta)=>{
        const meta = metas.find((m)=>{
            return m.value == resposta
        })

        meta.checked = true
    })

    console.log("Meta(s) marcada como  concluida(s)")
}

const metasRealizadas = async () => {
    const realizadas = metas.filter((meta) => {
return meta.checked
    })
if (realizadas.length == 0) {
    console.log("Nao exitem metas realizadas :( ")
    return
}
await select ({
    message : "metas Realizadas",
    choices : [...realizadas]
})
    console.log (realizadas)
}
const  start = async()=>{
    
    
while (true){

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
            name:"Sair",
            value:"sair"
        }
        ]

    })
switch(opcao){
    case "cadastrar":
      await cadastrarMeta()
      console.log(metas)
    break
    case "listar":
        await listarMetas()
        break

    case "realizadas":
        await metasRealizadas()
        break

    case "sair":
        console.log("ate a proxima")
        return
}
}
}

start()


