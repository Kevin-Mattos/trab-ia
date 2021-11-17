
//function criarTabela(){
    var tabela = document.createElement("table");
    var cabecalho = document.createElement("thead");
    var corpo = document.createElement("tbody");
    tabela.appendChild(cabecalho);
    tabela.appendChild(corpo);
    document.getElementById("tabela").appendChild(tabela);

    for(i=0; i<13; i++){       //cria as linhas
       
       var tr = document.createElement('tr');
        for(j=0; j<15; j++){        //cria as colunas
           
                var td = document.createElement('td'); //insere a tag <td> na variavel td   
                
                td.setAttribute('id', j); //insere um id de acordo com o indice [j] a cada td
                if(j==0 && i>0 && i<11){                    
                    var texto=document.createTextNode(i);
                    td.appendChild(texto);
                }
                else if(j==2 && i>0 && i<11){
                    var texto=document.createTextNode(i+10);
                    td.appendChild(texto);

                }
                else if(j==3 && i>0 && i<11){
                    var texto=document.createTextNode(i+30);
                    td.appendChild(texto);

                }
                else if(j==5 && i>0 && i<11){
                    var texto=document.createTextNode(i+40);
                    td.appendChild(texto);

                }
                else if(j==6 && i>0 && i<11){
                    var texto=document.createTextNode(i+50);
                    td.appendChild(texto);

                }
                else if(j==8 && i>0 && i<11){
                    var texto=document.createTextNode(i+60);
                    td.appendChild(texto);

                }
                else if(j==9 && i>0 && i<11){
                    var texto=document.createTextNode(i+70);
                    td.appendChild(texto);

                }
                else if(j==11 && i>0 && i<11){
                    var texto=document.createTextNode(i+80);
                    td.appendChild(texto);

                }
                else if(j==12 && i>0 && i<11){
                    var texto=document.createTextNode(i+90);
                    td.appendChild(texto);

                }
                else if(j==14 && i>0 && i<11){
                    var texto=document.createTextNode(i+100);
                    td.appendChild(texto);
                    
                }
                else if(i==12 && j>=0 && j < 5){                    
                    var texto=document.createTextNode('R'+(1+j));                 
                    td.appendChild(texto);
                }
                else if(i==11 && j==14){
                    var texto=document.createTextNode('X');                 
                    td.appendChild(texto);
                }

                tr.appendChild(td)
           
                

        }
        tr.setAttribute('id', i);   //insere um id de acordo com o indice [i] a cada tr

            
        document.querySelector('tbody').appendChild(tr);    //insere as linhas
    }
//}

    