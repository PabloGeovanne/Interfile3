document.addEventListener('DOMContentLoaded', () => {
  const apiUrl = 'http://api.interfile.local/api/pessoas';
  const pessoaTabela = document.getElementById('pessoa-tabela');
  const pessoaForm = document.getElementById('pessoa-form');
  const loginForm = document.getElementById('login-form');
  
  
  const pessoaId = document.getElementById('pessoa-id');
  const pessoaNome = document.getElementById('pessoa-nome');
  const pessoaNascimento = document.getElementById('pessoa-nascimento');
  const pessoaRenda = document.getElementById('pessoa-renda');
  const pessoaCpf = document.getElementById('pessoa-cpf');
  const pessoaSenha = document.getElementById('pessoa-senha');

  const getPessoas = async () => {
	  
	const token = getCookie('jwt');	
	if (token) { 
	  
    const response = await fetch(apiUrl);
    const pessoas = await response.json();
    pessoaTabela.innerHTML = '';
    pessoas.forEach(pessoa => {
      const row = document.createElement('tr');
      row.innerHTML = `
        <th scope="row">${pessoa.id}</th>
        <td>${pessoa.ds_Nome}</td>
        <td>${formatarData(pessoa.dt_Nascimento)}</td>
		<td>R$ ${pessoa.vl_Renda.toFixed(2)}</td>
        <td>${pessoa.ds_Cpf}</td>
        <td>${pessoa.ds_pw}</td>
        <td>
          <button class="btn btn-warning btn-sm" onclick="editarPessoa(${pessoa.id})"><i class="bi bi-pencil-square"></i> Editar</button>
          <button class="btn btn-danger btn-sm" onclick="deletarPessoa(${pessoa.id})"><i class="bi bi-trash3"></i> Deletar</button>
        </td>
      `;
      pessoaTabela.appendChild(row);
    });
	}
  
  };

  const adicionarOuAtualizarPessoa = async (e) => {
    e.preventDefault();
    const id = pessoaId.value == '' ? 0 : pessoaId.value;
    const nome = pessoaNome.value;
    const nascimento = pessoaNascimento.value;
    const renda = parseFloat(pessoaRenda.value);
    const cpf = pessoaCpf.value;
    const senha = pessoaSenha.value;

	let pessoa = {
		id: id,
		ds_Nome: nome,
		dt_Nascimento: formatarData(nascimento, 2),
		vl_Renda: renda,
		ds_Cpf: cpf,
		ds_pw: senha
	}

    if (id) {
		
	const token = getCookie('jwt');	
	if (token) { 
		
      // Atualizar pessoa
      const response = await fetch(`${apiUrl}/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(pessoa)
      });
      if (response.ok) {
        getPessoas();
      }
    }
	
	} else {
      // Adicionar novo pessoa
      const response = await fetch(apiUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(pessoa)
      });
      if (response.ok) {
        getPessoas();
      }
    }

    pessoaForm.reset();
    pessoaId.value = '';
	
	$("#modalCadPessoa").modal('toggle');	
  };

  const editarPessoa = async (id) => {
	  
	  	const token = getCookie('jwt');	
	if (token) { 
	  
    const response = await fetch(`${apiUrl}/${id}`);
    const pessoa = await response.json();
    pessoaId.value = pessoa.id;
    pessoaNome.value = pessoa.ds_Nome;
	pessoaNascimento.value = formatarData(pessoa.dt_Nascimento)
    pessoaRenda.value = pessoa.vl_Renda;
    pessoaCpf.value = pessoa.ds_Cpf;
    pessoaSenha.value = pessoa.ds_pw;	
	
	$("#modalCadPessoa").modal('show');
	
	}
  };

  const deletarPessoa = async (id) => {
	  
	  	const token = getCookie('jwt');	
	if (token) { 
	  
    const response = await fetch(`${apiUrl}/${id}`, {
      method: 'DELETE'
    });
    if (response.ok) {
      getPessoas();
    }
	
	}
  };
  
  const cancelarPessoa = (e) => {
	e.preventDefault();	 
	pessoaForm.reset();

	$("#modalCadPessoa").modal('toggle');
  };

  const addPessoa_btn = (e) => {
	e.preventDefault();	 
	$("#modalCadPessoa").modal('show');
	pessoaForm.reset();
  };
  
  const sairPessoa_btn = (e) => {	  
	e.preventDefault();	 
	deleteCookie('jwt');
	const loginTab = new bootstrap.Tab(document.getElementById('login-tab'));
	loginTab.show();
	$('#pessoas-tab').addClass('disabled');
	$('#produtos-tab').addClass('disabled');
	$('#login-tab').removeClass('disabled');
  };
	
  const getPessoa = async (id) => {
	const response = await fetch(`${apiUrl}/${id}`, {
      method: 'GET'
    });
    if (response.ok) {
      getPessoas();
    }
  }
  
  const getValidaPessoa = async (id) => {
	const response = await fetch(`${apiUrl}/${id}`, {
      method: 'GET'
    });
    if (response.statusText == 'OK') {
      return response;
    }else{
		return false;
	}
  }
	
  function formatarData (date, style = 1) {
	  
	  date = new Date(date);
	  
	  var year = date.getFullYear();

	  var month = (1 + date.getMonth()).toString();
	  month = month.length > 1 ? month : '0' + month;

	  var day = date.getDate().toString();
	  day = day.length > 1 ? day : '0' + day;
	  
	  let dateReturn = null;
	  
	  if(style == 1){		  
		dateReturn = day + '/' + month + '/' + year;	  
	  }else{	    
		dateReturn = year + '-' + day + '-' + month ;
	  }
	  
	  return dateReturn;
  }
	
	document.getElementById('btnSalvarPessoa').addEventListener('click', adicionarOuAtualizarPessoa, false);
	
	document.getElementById('btnCancelarPessoa').addEventListener('click', cancelarPessoa, false);
	
	document.getElementById('btnAddPessoa').addEventListener('click', addPessoa_btn, false);
	
	document.getElementById('btnSairPessoa').addEventListener('click', sairPessoa_btn, false);
	
	getPessoas();
	
window.getPessoas = getPessoas;
window.getValidaPessoa = getValidaPessoa;
window.editarPessoa = editarPessoa;
window.deletarPessoa = deletarPessoa;
});

