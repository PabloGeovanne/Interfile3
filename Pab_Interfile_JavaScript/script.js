document.addEventListener('DOMContentLoaded', () => {
    const apiUrl = 'https://localhost:5001/api/produtos';
    const produtoLista = document.getElementById('produto-lista');
    const produtoForm = document.getElementById('produto-form');

    const getProdutos = async () => {
        const response = await fetch(apiUrl);
        const produtos = await response.json();
        produtoLista.innerHTML = '';
        produtos.forEach(produto => {
            const li = document.createElement('li');
            li.textContent = `${produto.nome} - R$${produto.preco.toFixed(2)}`;
            const deleteButton = document.createElement('button');
            deleteButton.textContent = 'Deletar';
            deleteButton.addEventListener('click', () => deletarProduto(produto.id));
            li.appendChild(deleteButton);
            produtoLista.appendChild(li);
        });
    };

    const adicionarProduto = async (e) => {
        e.preventDefault();
        const nome = document.getElementById('nome').value;
        const preco = document.getElementById('preco').value;
        const response = await fetch(apiUrl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ nome, preco: parseFloat(preco) })
        });
        if (response.ok) {
            getProdutos();
        }
    };

    const deletarProduto = async (id) => {
        const response = await fetch(`${apiUrl}/${id}`, {
            method: 'DELETE'
        });
        if (response.ok) {
            getProdutos();
        }
    };

    produtoForm.addEventListener('submit', adicionarProduto);
    getProdutos();
});
