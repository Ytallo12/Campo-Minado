  var matriz = []
  var bombas = 0
  var linhaAtual;
  var colunaAtual;




  class CampoMinado{
  	constructor(){

  	}

  	gerarTabela(){
  		var str = "<table>";

  		for(var i = 0; i < matriz.length; i++){
  			str += "<tr>";
  			for(var j = 0; j < matriz[i].length; j++){
  				if(matriz[i][j] === 'BOMBA'){
  					str += `<td id='bomba' class='espaco'><a href="clicar/${[i]}/${[j]}"></a></td>`;	
  				}
  				else if(typeof matriz[i][j] === 'string'){
  					str += `<td class='espaco numero'><a href="clicar/${[i]}/${[j]}">${matriz[i][j]}</a></td>`;
  				}
  				else{
  					str += `<td class='espaco'><a href="clicar/${[i]}/${[j]}"></a></td>`;
  				}
  			}
  			str += "</tr>";
  		}
  		str += "</table>";
  		return str
  	}

  	clicar(linha, coluna){  		
  		if(matriz[linha][coluna] == -1){
  			matriz[linha][coluna] = 'BOMBA'
  		}
  		else{
  			matriz[linha][coluna] = matriz[linha][coluna].toString()  			
  		}
  	}

//monta a matriz dependendo do nivel
nivel(value){

	if(value == 0){
		matriz = []
		bombas = 10
		this.gerarMatriz(5, 8)
	}else if(value == 1){
		matriz = []
		bombas = 10
		this.gerarMatriz(8, 12)  		
	}else if(value == 2){
		matriz = []
		bombas = 30 
		this.gerarMatriz(10, 20)  		 		
	}
}

gerarMatriz(linha, coluna){
	for(var i = 0; i < linha; i++){
		matriz[i] = new Array(coluna).fill(0)
	}
	this.colocarBombas(linha, coluna)
	this.bombasEmVolta(linha, coluna)
}


colocarBombas(linha, coluna){
	for(var b = 0; b < bombas;){
		for(var i = 0; i < linha; i++){
			for(var j = 0; j < coluna; j++){
				if((Math.floor(Math.random() * 10)) == 0 && b < bombas){
					b++
					matriz[i][j] = -1
				}
			}
		}
	}
}

somarBombasEmVolta(linhaAtual, colunaAtual, linha, coluna){
	var n = 0;

	for(var i = (linhaAtual-1); i <= (linhaAtual+1); i++){
		for (var j = (colunaAtual-1); j <= (colunaAtual+1); j++){  			
			if((i < 0 || i > (linha-1)) || (j < 0 || j > (coluna-1))){
				continue
			}
			if(matriz[i][j] == -1){
				n++
			}
		}
	}
	matriz[linhaAtual][colunaAtual] = n
}

bombasEmVolta(linha, coluna){
	for(linhaAtual = 0; linhaAtual < linha; linhaAtual++){
		for(colunaAtual = 0; colunaAtual < coluna; colunaAtual++){  			
			if(matriz[linhaAtual][colunaAtual] != -1){  				
				this.somarBombasEmVolta(linhaAtual, colunaAtual, linha, coluna)
			}
		}
	}
	this.gerarTabela()	
}
}

module.exports = new CampoMinado()