// DECLARANDOA AS VARIAVEIS

const modal = document.querySelector('.modal-container')
const tbody = document.querySelector('tbody')
const sNome = document.querySelector('#n-nome')
const sServico = document.querySelector('#n-servico')
const sData = document.querySelector('#d-data')
const sPreco = document.querySelector('#p-preco')
const btnSalvar = document.querySelector('#btnSalvar')

let itens
let id

//MODAL
function openModal(edit = false, index = 0) {
    modal.classList.add('active')

        modal.onclick = e => {
            if (e.target.className.indexOf('modal-container') !== -1) {
            modal.classList.remove('active')
        }
    }   

    if (edit) {
        sNome.value = itens[index].nome
        sServico.value = itens[index].servico
        sData.value = itens[index].data
        sPreco.value = itens[index].preco
        id = index
    } else {
        sNome.value = ''
        sServico.value = ''
        sData.value = ''
        sPreco.value = ''
    }

}

function editItem(index) {

    openModal(true, index)
}

function deleteItem(index) {
    itens.splice(index, 1)
    setItensBD()
    loadItens()
}

function insertItem(item, index) {
let tr = document.createElement('tr')

tr.innerHTML = `
    <td>${item.nome}</td>
    <td>${item.servico}</td>
    <td>${item.data}</td>
    <td>R$ ${item.preco}</td>
    <td class="acao">
    <button onclick="editItem(${index})"><i class='bx bx-edit' ></i></button>
    </td>
    <td class="acao">
    <button onclick="deleteItem(${index})"><i class='bx bx-trash'></i></button>
    </td>
`
tbody.appendChild(tr)
}

btnSalvar.onclick = e => {

if (sNome.value == '' || sServico.value == '' || sData.value == '' || sPreco.value == '') {
    return
}

e.preventDefault();

if (id !== undefined) {
    itens[id].nome = sNome.value
    itens[id].servico = sServico.value
    itens[id].funcao = sData.value
    itens[id].salario = sPreco.value
} else {
    itens.push({'nome': sNome.value, 'servico': sServico.value, 'data': sData.value, 'preco': sPreco.value})
}

setItensBD()

modal.classList.remove('active')
    loadItens()
    id = undefined
}

function loadItens() {
    itens = getItensBD()
    tbody.innerHTML = ''
    itens.forEach((item, index) => {
        insertItem(item, index)
})

}

const getItensBD = () => JSON.parse(localStorage.getItem('dbfunc')) ?? []
const setItensBD = () => localStorage.setItem('dbfunc', JSON.stringify(itens))

loadItens()