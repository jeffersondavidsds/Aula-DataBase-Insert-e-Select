const sqlite3 = require('sqlite3')

const { open } = require('sqlite')

const criarBanco = async() => {
    const db = await open({
        filename: './database.db',
        driver: sqlite3.Database
    })

    
    await db.exec(` 
        CREATE TABLE IF NOT EXISTS produtos (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        nome TEXT,
        categoria TEXT,
        quantidade TEXT,
        preco REAL )
        `)



    await db.exec(`
        INSERT INTO produtos (nome, categoria, quantidade, preco) VALUES
        ('Smartphone Xiaomi Redmi Note 10', 'Eletrônicos', 10, 1500.00),
        ('Notebook Dell Inspiron 15', 'Informática', 5, 3500.00),
        ('Fone de Ouvido Bluetooth JBL', 'Acessórios', 20, 250.00)
        `)
    
    const inventario =await db.all(`SELECT * FROM produtos`)
    console.log("Tabela de estoque pronta para receber mercadorias")
    console.table(inventario)


    //buscando item específico
    const produtoEspecifico = await db.all(`SELECT preco, categoria FROM
    produtos WHERE id = 2`)
    console.log(produtoEspecifico)

    //Situação real:
    //O Gerente da loja avisou que o preço do Notebook mudou
    //UPDATE (O 'U' do CRUD)

    await db.run(`
        UPDATE produtos -- ATUALIZE produtos
        SET preco = 3200.00 -- DEFINA o preco para 3500.00
            quantidade = 5 -- DEFINA a quantidade para 5
        WHERE id = 2 -- ONDE o id for igual a 2        
        `)

    await db.run(`
        UPDATE produtos
        SET categoria = 'Eletrônicos Premium'
        WHERE id = 2
        `)

    await db.run(`
        DELETE FROM produtos
        WHERE id = 3
        `)


    console.log("Preço do Notebook Atualizado")
    



}

criarBanco()