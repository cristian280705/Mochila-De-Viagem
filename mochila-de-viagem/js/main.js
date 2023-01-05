const form = document.getElementById('form');

const lista = document.getElementById('lista');

const items = JSON.parse(localStorage.getItem('items')) || [];

items.forEach( (element) => criaElemento(element));

form.addEventListener('submit', (event) => {

    event.preventDefault();

    const nomeItem = event.target.elements.nome;
    const quantidadeItem = event.target.elements.quantidade;

    const itemAtual = {

        'nome': nomeItem.value,
        'quantidade': quantidadeItem.value
    };

    const existeItem = items.find((element) => element.nome === itemAtual.nome);

    if (existeItem) {

        itemAtual.id = existeItem.id;

        atualizaElemento(itemAtual);

        items[items.findIndex( element => element.id === existeItem.id)] = itemAtual;

    } else {

        itemAtual.id = items[items.length - 1] != undefined ? items[items.length - 1].id + 1: 0;

        criaElemento(itemAtual);

        items.push(itemAtual);
    }

    localStorage.setItem('items', JSON.stringify(items));

    nomeItem.value = '';
    quantidadeItem.value = '';
})

function criaElemento(item) {

    const novoItem = document.createElement('li');
    novoItem.classList.add('item');

    const quantidadeNovoItem = document.createElement('strong');
    quantidadeNovoItem.innerHTML = item.quantidade;
    quantidadeNovoItem.dataset.id = item.id;

    novoItem.append(quantidadeNovoItem);
    novoItem.innerHTML += item.nome;
    novoItem.appendChild(botaoDeleta(item.id));

    lista.appendChild(novoItem);
}

function atualizaElemento(item) {

    const quantidadeItem = document.querySelector(`[data-id="${item.id}"]`);
    quantidadeItem.innerHTML = item.quantidade;
}

function botaoDeleta(id) {

    const botaoDeletador = document.createElement('button');
    botaoDeletador.innerText = 'x';

    botaoDeletador.addEventListener('click', function () {

        deletaElemento(this.parentNode, id);
    })

    return botaoDeletador;
}

function deletaElemento(tag, id) {

    tag.remove();

    items.splice(items.findIndex( (element) => element.id === id), 1);

    localStorage.setItem('items', JSON.stringify(items));
}