document.addEventListener('DOMContentLoaded', () => {
    const apiUrl = 'http://api.interfile.local/api';
    const produtoLista = document.getElementById('produto-lista');
    const produtoForm = document.getElementById('produto-form');

    const getProdutos = async () => {
        const response = await fetch(apiUrl + '/produtos');
        const produtos = await response.json();
        produtoLista.innerHTML = '';
        produtos.forEach(produto => {
            const li = document.createElement('li');
            li.textContent = `Id: ${produto.id} - Nome: ${produto.ds_Nome} - Valor: R$ ${produto.vl_Preco.toFixed(2)} - Estoque: ${produto.qt_Estoque}`;
			
			
            const deleteButton = document.createElement('button');
            deleteButton.textContent = 'Deletar';
            deleteButton.addEventListener('click', () => deletarProduto(produto.id));
            li.appendChild(deleteButton);
            produtoLista.appendChild(li);
			
			
			const atualizarButton = document.createElement('button');
            atualizarButton.textContent = 'Atualizar';
            atualizarButton.addEventListener('click', () => selecionarAtualizarProduto(produto));
            li.appendChild(atualizarButton);
            produtoLista.appendChild(li);
        });
    };

    const adicionarProduto = async (e) => {
        e.preventDefault();
        const nome = document.getElementById('nome').value;
        const preco = document.getElementById('preco').value;
        const estoque = document.getElementById('estoque').value;
		
		let produto = {
			id: 0,
			ds_Nome: nome,
			vl_Preco: preco,
			qt_Estoque: estoque
		}
		
        const response = await fetch(`${apiUrl}/produtos`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(produto)
        });
        if (response.ok) {
            getProdutos();
			document.getElementById("produto-form").reset();
        }
    };

    const deletarProduto = async (id) => {
        const response = await fetch(`${apiUrl}/produtos/${id}`, {
            method: 'DELETE'
        });
        if (response.ok) {
            getProdutos();
        }
    };

	const atualizarProduto = async (id, e) => {
		e.preventDefault();
		const nome = document.getElementById('nome').value;
        const preco = document.getElementById('preco').value;
        const estoque = document.getElementById('estoque').value;
		
		let produto = {
			id: id,
			ds_Nome: nome,
			vl_Preco: preco,
			qt_Estoque: estoque
		}
		
        const response = await fetch(`${apiUrl}/produtos/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(produto)
        });
		
        if (response.ok) {
            getProdutos();
			document.getElementById("produto-form").reset();
        }
	};

	const selecionarAtualizarProduto = async (produto) => {
		document.getElementById('id').value = produto.id;
		document.getElementById('nome').value = produto.ds_Nome;
        document.getElementById('preco').value = produto.vl_Preco;
        document.getElementById('estoque').value = produto.qt_Estoque;
	}

	const btnSalvar = async (e) => {
		const id = document.getElementById('id').value;
		
		if(id == ''){			
			adicionarProduto(e);		
		}else{
			atualizarProduto(id, e);
		}
	}
	
    produtoForm.addEventListener('submit', btnSalvar);
	
    getProdutos();
});
