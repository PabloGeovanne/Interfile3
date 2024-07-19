document.addEventListener('DOMContentLoaded', () => {
  const apiUrl = 'http://api.interfile.local/api/Auth/login';
  const loginForm = document.getElementById('login-form');
  const loginCpf = document.getElementById('username');
  const loginSenha = document.getElementById('password');  
  

  const logar_btn = (e) => {
	    e.preventDefault();
		
		
		
		const produtosTab = new bootstrap.Tab(document.getElementById('produtos-tab'));
		produtosTab.show();
		
		
		
		
		$('#login-tab').addClass('disabled');
		$('#produtos-tab').removeClass('disabled');
		$('#pessoas-tab').removeClass('disabled');
		
		loginForm.reset();
  };
	
  const autenticarLogin = async (e) => {
    e.preventDefault();
    const cpf = loginCpf.value;
    const senha = loginSenha.value;

	let login = {
		username: cpf,
		password: senha,
	}

      // Autenticar Login - Token
      const response = await fetch(apiUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(login)
      });
      if (response.statusText == 'OK') {
        autorizaLogin(response, e);
      }else{
		  alert('CPF ou SENHA invalida!');
	  }

  };	
	
  const autorizaLogin = async (response) => {
	
	const data = await response.json();
	setCookie('jwt', data.token, 1); // Armazena o token por 1 dia

	const token = getCookie('jwt');	
    if (!token) {
        alert('Você precisa fazer login');
        return;
    }
	  
    getPessoas();
	getProdutos();
	  
    loginForm.reset();
	const produtoTab = new bootstrap.Tab(document.getElementById('produtos-tab'));
	produtoTab.show();
	$('#login-tab').addClass('disabled');
	$('#cadastro-tab').addClass('disabled');
	$('#produtos-tab').removeClass('disabled');	
	$('#pessoas-tab').removeClass('disabled');	
	
	
  }
		
  const validaStatusLogado = async () => {
		const token = getCookie('jwt');	
		if (token) {
			if(await getValidaPessoa(decodeJwt(token).Id)){
				autorizaLogin(token);				
			}else{
				deleteCookie('jwt');
				alert('Token invalido, entre novamente');
			}
		}
	}
		
	const deleteCookie = (nome) => {
		$.cookie('jwt', '', { expires: -1, path: '/'});
	}
	
	const getCookie = (nome) => {
		const nomeEQ = nome + "=";
		
		try{
		
		const ca = document.cookie.split(';');
		for (let i = 0; i < ca.length; i++) {
			let c = ca[i];
			while (c.charAt(0) == ' ') c = c.substring(1, c.length);
			if (c.indexOf(nomeEQ) == 0) return c.substring(nomeEQ.length, c.length);
		}
		return null;
		
		}catch{
			
			return null;
			
		}
	}
		
	loginForm.addEventListener('submit', autenticarLogin);

	//validaStatusLogado(); //Conflito na pipe async

window.getCookie = getCookie;
window.deleteCookie = deleteCookie;
});


	function setCookie(nome, valor, dias) {
		const d = new Date();
		d.setTime(d.getTime() + (dias * 24 * 60 * 60 * 1000));
		const expira = "expires=" + d.toUTCString();
		document.cookie = nome + "=" + valor + ";" + expira + ";path=/";
	}

	
	function decodeJwt (token) {
		var base64Url = token.split('.')[1];
		var base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
		var jsonPayload = decodeURIComponent(window.atob(base64).split('').map(function(c) {
			return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
		}).join(''));
	
		return JSON.parse(jsonPayload);
	}