const {select,input} = require('@inquirer/prompts')

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
        console.log("vamos listar")
        break
    case "sair":
        console.log("ate a proxima")
        return
}
}
}

start()


