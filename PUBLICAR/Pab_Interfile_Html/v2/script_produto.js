document.addEventListener('DOMContentLoaded', () => {
  const apiUrl = 'http://api.interfile.local/api/produtos';
  const produtoTabela = document.getElementById('produto-tabela');
  const produtoForm = document.getElementById('produto-form');
  const produtoId = document.getElementById('produto-id');
  const produtoNome = document.getElementById('produto-nome');
  const produtoPreco = document.getElementById('produto-preco');
  const produtoEstoque = document.getElementById('produto-estoque');

  const getProdutos = async () => {
	  
	  	const token = getCookie('jwt');	
	if (token) { 
	  
    const response = await fetch(apiUrl);
    const produtos = await response.json();
    produtoTabela.innerHTML = '';
    produtos.forEach(produto => {
      const row = document.createElement('tr');
      row.innerHTML = `
        <th scope="row">${produto.id}</th>
        <td>${produto.ds_Nome}</td>
        <td>R$ ${produto.vl_Preco.toFixed(2)}</td>
        <td>${produto.qt_Estoque}</td>
        <td>
          <button class="btn btn-warning btn-sm" onclick="editarProduto(${produto.id})"><i class="bi bi-pencil-square"></i> Editar</button>
          <button class="btn btn-danger btn-sm" onclick="deletarProduto(${produto.id})"><i class="bi bi-trash3"></i> Deletar</button>
        </td>
      `;
      produtoTabela.appendChild(row);
    });
  
	}
  };

  const adicionarOuAtualizarProduto = async (e) => {
    e.preventDefault();
    const id = produtoId.value == '' ? 0 : produtoId.value;
    const nome = produtoNome.value;
    const preco = parseFloat(produtoPreco.value);
    const estoque = produtoEstoque.value;

	let produto = {
		id: id,
		ds_Nome: nome,
		vl_Preco: preco,
		qt_Estoque: estoque
	}

    if (id) {
		
			const token = getCookie('jwt');	
	if (token) { 
      // Atualizar produto
      const response = await fetch(`${apiUrl}/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(produto)
      });
      if (response.ok) {
        getProdutos();
      }
	  
	}
    } else {
      // Adicionar novo produto
      const response = await fetch(apiUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(produto)
      });
      if (response.ok) {
        getProdutos();
      }
    }

    produtoForm.reset();
    produtoId.value = '';
	
	const produtoTab = new bootstrap.Tab(document.getElementById('produtos-tab'));
	produtoTab.show();
	$('#cadastro-tab').addClass('disabled');
	$('#produtos-tab').removeClass('disabled');	
  };

  const editarProduto = async (id) => {
	  
	  	const token = getCookie('jwt');	
	if (token) { 
    const response = await fetch(`${apiUrl}/${id}`);
    const produto = await response.json();
    produtoId.value = produto.id;
    produtoNome.value = produto.ds_Nome;
    produtoPreco.value = produto.vl_Preco;
    produtoEstoque.value = produto.qt_Estoque;
	const cadastroTab = new bootstrap.Tab(document.getElementById('cadastro-tab'));
	cadastroTab.show();
	$('#produtos-tab').addClass('disabled');
	$('#pessoas-tab').addClass('disabled');
	$('#cadastro-tab').removeClass('disabled');
	
	}
  };

  const deletarProduto = async (id) => {
	  
	  	const token = getCookie('jwt');	
	if (token) { 
    const response = await fetch(`${apiUrl}/${id}`, {
      method: 'DELETE'
    });
    if (response.ok) {
      getProdutos();
    }
	
	}
  };
  
  const cancelarProduto = (e) => {
	e.preventDefault();	 
	produtoForm.reset();
	const cadastroTab = new bootstrap.Tab(document.getElementById('produtos-tab'));
	cadastroTab.show();
	$('#cadastro-tab').addClass('disabled');
	$('#produtos-tab').removeClass('disabled');
	$('#pessoas-tab').removeClass('disabled');
  };

  const addProduto_btn = (e) => {
	e.preventDefault();	 
	const cadastroTab = new bootstrap.Tab(document.getElementById('cadastro-tab'));
	cadastroTab.show();
	$('#produtos-tab').addClass('disabled');
	$('#cadastro-tab').removeClass('disabled');
	produtoForm.reset();
  };
  
  const sairProduto_btn = (e) => {	  
	e.preventDefault();	 
	deleteCookie('jwt');
	const loginTab = new bootstrap.Tab(document.getElementById('login-tab'));
	loginTab.show();
	$('#produtos-tab').addClass('disabled');
	$('#pessoas-tab').addClass('disabled');
	$('#login-tab').removeClass('disabled');
  };
	
	produtoForm.addEventListener('submit', adicionarOuAtualizarProduto);
	
	document.getElementById('btnAddProduto').addEventListener('click', cancelarProduto, false);
	
	document.getElementById('btnCancelar').addEventListener('click', cancelarProduto, false);
	
	document.getElementById('btnAddProduto').addEventListener('click', addProduto_btn, false);
	
	document.getElementById('btnSair').addEventListener('click', sairProduto_btn, false);
	
	getProdutos();
	
window.getProdutos = getProdutos; 
window.editarProduto = editarProduto;
window.deletarProduto = deletarProduto;
});


