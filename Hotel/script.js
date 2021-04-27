
		var db = openDatabase("Meubanco", "2.0", "Mybase", 4048);

		db.transaction(function(criar){
			criar.executeSql("CREATE TABLE hospedes (id INTEGER PRIMARY KEY, nome TEXT, sobrenome TEXT, sexo TEXT, endereco TEXT, telefone TEXT, email TEXT)");
		});
		db.transaction(function(criar){
			criar.executeSql("CREATE TABLE fornecedor (id INTEGER PRIMARY KEY, nome TEXT, telefone TEXT, tipo TEXT)");
		});
		db.transaction(function(criar){
			criar.executeSql("CREATE TABLE funcionario (id INTEGER PRIMARY KEY, nome TEXT, telefone TEXT, funcao TEXT)");
		});

		function salvar(){
			var c_nome = document.getElementById('nome').value;
			var c_sobrenome = document.getElementById('sobrenome').value;
			var c_sexo = document.getElementById('sexo').value;
			var c_endereço = document.getElementById('endereço').value;
			var c_telefone = document.getElementById('telefone').value;
			var c_email = document.getElementById('email').value;

			db.transaction(function(tx){
				tx.executeSql('INSERT INTO hospedes (nome, sobrenome, sexo, endereco, telefone, email) VALUES (?,?,?,?,?,?)' , 
													[c_nome, c_sobrenome, c_sexo, c_endereço, c_telefone, c_email]);
			});
			mostra();
		}

		function mostra(){
			db.transaction(function(tx){
				tx.executeSql('SELECT * FROM hospedes', [], function(tx, resultado){
					var rows = resultado.rows;
					for(var i = 0; i < rows.length; i++){
						document.getElementById('tt').innerHTML = rows[i].id;
						$("#tb").append("<tr><td>"+rows[i].nome+"</td><td>"+rows[i].sobrenome+"</td><td>"+rows[i].sexo+"</td><td>"+rows[i].endereco+"</td><td>"+rows[i].telefone+"</td><td>"+rows[i].email+"</td></tr>");
					}
				})

			})
		}

		function salvarFornecedor(){
			var c_nome = document.getElementById('nomeF').value;
			var c_telefone = document.getElementById('telefoneF').value;
			var c_tipo = document.getElementById('tipoF').value;

			db.transaction(function(tx){
				tx.executeSql('INSERT INTO fornecedor (nome, telefone, tipo) VALUES (?,?,?)' , 
													[c_nome, c_telefone, c_tipo]);
			});
			addFornecedor();
		}

		function addFornecedor(){
			db.transaction(function(tx){
				tx.executeSql('SELECT * FROM fornecedor', [], function(tx, resultado){
					var rows = resultado.rows;
					for(var i = 0; i < rows.length; i++){
						document.getElementById('tf').innerHTML = rows[i].id;
						$("#tabelaFornecedor").append("<tr><td>"+rows[i].nome+"</td><td>"+rows[i].telefone+"</td><td>"+rows[i].tipo+"</td></tr>");
					}
				})

			})
		}

		function salvarFuncionario(){
			var c_nome = document.getElementById('nomeFu').value;
			var c_telefone = document.getElementById('telefoneFu').value;
			var c_tipo = document.getElementById('tipoFu').value;

			db.transaction(function(tx){
				tx.executeSql('INSERT INTO funcionario (nome, telefone, funcao) VALUES (?,?,?)' , 
													[c_nome, c_telefone, c_tipo]);
			});
			addFuncionario();
		}

		function addFuncionario(){
			db.transaction(function(tx){
				tx.executeSql('SELECT * FROM funcionario', [], function(tx, resultado){
					var rows = resultado.rows;
					for(var i = 0; i < rows.length; i++){
						document.getElementById('tfu').innerHTML = rows[i].id;
						$("#tabelaFuncionarios").append("<tr><td>"+rows[i].nome+"</td><td>"+rows[i].telefone+"</td><td>"+rows[i].funcao+"</td></tr>");
					}
				})

			})
		}