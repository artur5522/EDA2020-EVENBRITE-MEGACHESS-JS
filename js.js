/*Los comentarios aclaratorios estan unicamente en el inicio de cada método.
para evitar duplicidad de explicaciones*/
const c = console;
let tablero_general = [];
let fichas_blancas = new RegExp("[KQPBHR]", "");
let fichas_negras = new RegExp("[kqpbhr]", "");
let contador = 0;
const rellenaTablero = (a) => {
  //creo matriz para poder manipular cordenadas
  let tablero_fila = [];
  let stringTablero = a.data.board;
  let contador = 0;
  for (let i = 0; i < stringTablero.length; i++) {
    tablero_fila.push(stringTablero.charAt(i));
    contador++;
    if (contador == 16) {
      tablero_general.push(tablero_fila);
      contador = 0;
      tablero_fila = [];
    }
  }
  return tablero_general;
};
const limpiaTablero = () => {
  //limpio para que en cada turno tenga unicamente el ultimo estado del tablero
  tablero_general = [];
};
const valorAleatorioParaPrimerMovimiento = () => {  
  let aleatorio = -1;
  while (aleatorio > 15 || aleatorio < 0) {
    aleatorio = Math.floor(Math.random() * 100);
  }
  return aleatorio;
};
//creo clases para que las fichas saquen provecho de los metodos
class MovimientosRectos {
  static movimientoVerticalNorte(i, j, tablero_general, fichas_propias, color) {
    let posicion_provisoria = [0, 0, 0, 0, 0];
    //BUSCO PIEZA ENEMIGA
    for (let m = 1; i - m >= 0; m++) {
      if (color === "white") {
        if (fichas_negras.test(tablero_general[i - m][j])) {
          //SI LA ENCUENTRO, CAPTURO LA CORDENADA
          posicion_provisoria = piezaHacia(i, j, i - m, j, tablero_general);
          //CHEQUEO SI ENTRE ESA CORDENADA Y LA CORDENADA DE ORIGEN NO HAY FICHAS AMIGAS
          for (let y = 1; i - y >= 0; y++) {
            if (fichas_blancas.test(tablero_general[i - y][j])) {
              fichas_propias = atrapaFichaAmiga(i, j, i - y, j);
              //SI ENCUENTRO FICHA AMIGA CAPTURO Y DEJO DE BUSCAR.
              break;
            } else fichas_propias = [0, 0, 0, 0];            
            //SI NO ENCUENTRO, CORDENADAS EN CERO
          }
          //CHEQUEO QUE LA FICHA AMIGA ESTE MAS "LEJOS" QUE LA FICHA ENEMIGA
          if (fichas_propias[2] > posicion_provisoria[2]) posicion_provisoria = [0, 0, 0, 0, 0];
          //si el movimiento no vale, posicion provisoria se anula
          break;
        }
      } else if (color === "black") {
        if (fichas_blancas.test(tablero_general[i - m][j])) {         
          posicion_provisoria = piezaHacia(i, j, i - m, j, tablero_general);        
          for (let y = 1; i - y >= 0; y++) {
            if (fichas_negras.test(tablero_general[i - y][j])) {
              fichas_propias = atrapaFichaAmiga(i, j, i - y, j);                     
              break;
            } else fichas_propias = [0, 0, 0, 0];               
          }         
          if (fichas_propias[2] > posicion_provisoria[2]) posicion_provisoria = [0, 0, 0, 0, 0];        
          break;
        }
      }
    }
    return posicion_provisoria;
  }
  static movimientoVerticalSur(i, j, tablero_general, fichas_propias, color) {
    let posicion_provisoria = [0, 0, 0, 0, 0];
    for (let m = 1; i + m < tablero_general.length; m++) {
      if (color === "white") {
        if (fichas_negras.test(tablero_general[i + m][j])) {
          posicion_provisoria = piezaHacia(i, j, i + m, j, tablero_general);
          for (let y = 1; i + y < tablero_general.length; y++) {
            if (fichas_blancas.test(tablero_general[i + y][j])) {
              fichas_propias = atrapaFichaAmiga(i, j, i + y, j);
              break;
            } else fichas_propias = [0, 0, 0, 0];            
          }
          if (fichas_propias[2] < posicion_provisoria[2]) posicion_provisoria = [0, 0, 0, 0, 0];
          break;
        }
      } else if (color === "black") {
        if (fichas_blancas.test(tablero_general[i + m][j])) {
          posicion_provisoria = piezaHacia(i, j, i + m, j, tablero_general);
          for (let y = 1; i + y < tablero_general.length; y++) {
            if (fichas_negras.test(tablero_general[i + y][j])) {
              fichas_propias = atrapaFichaAmiga(i, j, i + y, j);
              break;
            } else fichas_propias = [0, 0, 0, 0];            
          }
          if (fichas_propias[2] < posicion_provisoria[2]) posicion_provisoria = [0, 0, 0, 0, 0];
          break;
        }
      }
    }
    return posicion_provisoria;
  }
  static movimientoHorizontalEste(i,j,tablero_general,fichas_propias,color) {
    let posicion_provisoria = [0, 0, 0, 0, 0];
    for (let m = 1; j + m < tablero_general.length; m++) {
      if (color === "white") {
        if (fichas_negras.test(tablero_general[i][j + m])) {
          posicion_provisoria = piezaHacia(i, j, i, j + m, tablero_general);
          for (let y = 1; j + y < tablero_general.length; y++) {
            if (fichas_blancas.test(tablero_general[i][j + y])) {
              fichas_propias = atrapaFichaAmiga(i, j, i, j + y);
              break;
            } else fichas_propias = [0, 0, 0, 0];            
          }
          if (fichas_propias[3] < posicion_provisoria[3]) posicion_provisoria = [0, 0, 0, 0, 0];
          break;
        }
      } else if (color === "black") {
        if (fichas_blancas.test(tablero_general[i][j + m])) {
          posicion_provisoria = piezaHacia(i, j, i, j + m, tablero_general);
          for (let y = 1; y + j < tablero_general.length; y++) {
            if (fichas_negras.test(tablero_general[i][j + y])) {
              fichas_propias = atrapaFichaAmiga(i, j, i, j + y);
              break;
            } else  fichas_propias = [0, 0, 0, 0];            
          }
          if (fichas_propias[3] < posicion_provisoria[3]) posicion_provisoria = [0, 0, 0, 0, 0];
          break;
        }
      }
    }
    return posicion_provisoria;
  }
  static movimientoHorizontalOeste(i,j,tablero_general,fichas_propias,color) {
    let posicion_provisoria = [0, 0, 0, 0, 0];
    for (let m = 1; j - m >= 0; m++) {
      if (color === "white") {
        if (fichas_negras.test(tablero_general[i][j - m])) {
          posicion_provisoria = piezaHacia(i, j, i, j - m, tablero_general);
          for (let y = 1; j - y >= 0; y++) {
            if (fichas_blancas.test(tablero_general[i][j - y])) {
              fichas_propias = atrapaFichaAmiga(i, j, i, j - y);
              break;
            } else fichas_propias = [0, 0, 0, 0];            
          }
          if (fichas_propias[3] > posicion_provisoria[3]) posicion_provisoria = [0, 0, 0, 0, 0];
          break;
        }
      } else if (color === "black") {
        if (fichas_blancas.test(tablero_general[i][j - m])) {
          posicion_provisoria = piezaHacia(i, j, i, j - m, tablero_general);
          for (let y = 1; j - y >= 0; y++) {
            if (fichas_negras.test(tablero_general[i][j - y])) {
              fichas_propias = atrapaFichaAmiga(i, j, i, j - y);
              break;
            } else fichas_propias = [0, 0, 0, 0];            
          }
          if (fichas_propias[3] > posicion_provisoria[3]) posicion_provisoria = [0, 0, 0, 0, 0];
          break;
        }
      }
    }
    return posicion_provisoria;
  }
}
class MovimientosOblicuos {
  //mismas aclaraciones que para movimientos rectos
  static movimientoDiagonalInferiorDerecho(i,j,tablero_general,fichas_propias,color) {
    let posicion_provisoria = [0, 0, 0, 0, 0];
    for (let m = 1; m + i < tablero_general.length && m + j < tablero_general.length; m++) {
      if (color === "white") {
        if (fichas_negras.test(tablero_general[i + m][j + m])) {
          posicion_provisoria = piezaHacia(i, j, i + m, j + m, tablero_general);
          for (let y = 1; y + i < tablero_general.length && y + j < tablero_general.length; y++) {
            if (fichas_blancas.test(tablero_general[i + y][j + y])) {
              fichas_propias = atrapaFichaAmiga(i, j, i + y, j + y);
              break;
            } else fichas_propias = [0, 0, 0, 0];
          }
          if (fichas_propias[2] < posicion_provisoria[2]) posicion_provisoria = [0, 0, 0, 0, 0];
          break;
        }
      } else if (color === "black") {
        if (fichas_blancas.test(tablero_general[i + m][j + m])) {
          posicion_provisoria = piezaHacia(i, j, i + m, j + m, tablero_general);
          for (let y = 1; y + i < tablero_general.length && y + j < tablero_general.length; y++) {
            if (fichas_negras.test(tablero_general[i + y][j + y])) {
              fichas_propias = atrapaFichaAmiga(i, j, i + y, j + y);
              break;
            } else fichas_propias = [0, 0, 0, 0];            
          }
          if (fichas_propias[2] < posicion_provisoria[2]) posicion_provisoria = [0, 0, 0, 0, 0];
          break;
        }
      }
    }
    return posicion_provisoria;
  }
  static movimientoDiagonalSuperiorDerecho(i,j,tablero_general,fichas_propias,color) {
    let posicion_provisoria = [0, 0, 0, 0, 0];
    for (let m = 1; m + j < tablero_general.length && i - m >= 0; m++) {
      if (color === "white") {
        if (fichas_negras.test(tablero_general[i - m][j + m])) {
          posicion_provisoria = piezaHacia(i, j, i - m, j + m, tablero_general);
          for (let y = 1; y + j < tablero_general.length && i - y >= 0; y++) {
            if (fichas_blancas.test(tablero_general[i - y][j + y])) {
              fichas_propias = atrapaFichaAmiga(i, j, i - y, j + y);
              break;
            } else fichas_propias = [0, 0, 0, 0];            
          }
          if (fichas_propias[2] < posicion_provisoria[2] && fichas_propias[3] > posicion_provisoria[3]) posicion_provisoria = [0, 0, 0, 0, 0];
          break;
        }
      } else if (color === "black") {
        if (fichas_blancas.test(tablero_general[i - m][j + m])) {
          posicion_provisoria = piezaHacia(i, j, i - m, j + m, tablero_general);
          for (let y = 1; y + j < tablero_general.length && i - y >= 0; y++) {
            if (fichas_negras.test(tablero_general[i - y][j + y])) {
              fichas_propias = atrapaFichaAmiga(i, j, i - y, j + y);
              break;
            } else  fichas_propias = [0, 0, 0, 0];            
          }
          if (fichas_propias[2] < posicion_provisoria[2] &&  fichas_propias[3] > posicion_provisoria[3]) posicion_provisoria = [0, 0, 0, 0, 0];
          break;
        }
      }
    }
    return posicion_provisoria;
  }
  static movimientoDiagonalSuperiorIzquierdo(i,j,tablero_general,fichas_propias,color) {
    let posicion_provisoria = [0, 0, 0, 0, 0];
    for (let m = 1; i - m >= 0 && j - m >= 0; m++) {
      if (color === "white") {
        if (fichas_negras.test(tablero_general[i - m][j - m])) {
          posicion_provisoria = piezaHacia(i, j, i - m, j - m, tablero_general);
          for (let y = 1; i - y >= 0 && j - y >= 0; y++) {
            if (fichas_blancas.test(tablero_general[i - y][j - y])) {
              fichas_propias = atrapaFichaAmiga(i, j, i - y, j - y);
              break;
            } else fichas_propias = [0, 0, 0, 0];            
          }
          if (fichas_propias[2] > posicion_provisoria[2]) posicion_provisoria = [0, 0, 0, 0, 0];
          break;
        }
      } else if (color === "black") {
        if (fichas_blancas.test(tablero_general[i - m][j - m])) {
          posicion_provisoria = piezaHacia(i, j, i - m, j - m, tablero_general);
          for (let y = 1; i - y >= 0 && j - y >= 0; y++) {
            if (fichas_negras.test(tablero_general[i - y][j - y])) {
              fichas_propias = atrapaFichaAmiga(i, j, i - y, j - y);
              break;
            } else fichas_propias = [0, 0, 0, 0];            
          }
          if ( fichas_propias[2] > posicion_provisoria[2] &&  fichas_propias[3] > posicion_provisoria[3]) posicion_provisoria = [0, 0, 0, 0, 0];
          break;
        }
      }
    }
    return posicion_provisoria;
  }
  static movimientoDiagonalInferiorIzquierdo(i,j,tablero_general,fichas_propias,color) {
    let posicion_provisoria = [0, 0, 0, 0, 0];
    for (let m = 1; m + i < tablero_general.length && j - m >= 0; m++) {
      if (color === "white") {
        if (fichas_negras.test(tablero_general[i + m][j - m])) {
          posicion_provisoria = piezaHacia(i, j, i + m, j - m, tablero_general);
          for (let y = 1; y + i < tablero_general.length && j - y >= 0; y++) {
            if (fichas_blancas.test(tablero_general[i + y][j - y])) {
              fichas_propias = atrapaFichaAmiga(i, j, i + y, j - y);
              break;
            } else  fichas_propias = [0, 0, 0, 0];            
          }
          if (
            fichas_propias[2] > posicion_provisoria[2] && fichas_propias[3] < posicion_provisoria[3]) posicion_provisoria = [0, 0, 0, 0, 0];
          break;
        }
      } else if (color === "black") {
        if (fichas_blancas.test(tablero_general[i + m][j - m])) {
          posicion_provisoria = piezaHacia(i, j, i + m, j - m, tablero_general);
          for (let y = 1; y + i < tablero_general.length && j - y >= 0; y++) {
            if (fichas_negras.test(tablero_general[i + y][j - y])) {
              fichas_propias = atrapaFichaAmiga(i, j, i + y, j - y);
              break;
            } else fichas_propias = [0, 0, 0, 0];            
          }
          if (fichas_propias[2] > posicion_provisoria[2] && fichas_propias[3] < posicion_provisoria[3]) posicion_provisoria = [0, 0, 0, 0, 0];
          break;
        }
      }
    }
    return posicion_provisoria;
  }
}
class MovimientosPeones {

  static muevePeonNegro(tablero_general) {
    let posiciones = [];
    let aleatorio = valorAleatorioParaPrimerMovimiento();
    //si es el primer movimiento, ese movimiento será aleatorio
    if (contador == 0) {
      posiciones.push(3);
      posiciones.push(aleatorio);
      posiciones.push(5);
      posiciones.push(aleatorio);
      contador++;
    } else {   
     for (let i = tablero_general.length; i > 0; i--) {
      for (let j = tablero_general.length; j > 0; j--) {
        //chequeo que si los peones estan en filas 2 o 3 , pueden mover 2 espacios  
        if (tablero_general[i - 1][j] === "p" && (i - 1 == 2 || i - 1 == 3)) {
          //chequeo si la posicion a mover está vacia     
          if (tablero_general[i + 1][j] === " ") {
            posiciones.push(i - 1);
            posiciones.push(j);
            posiciones.push(i + 1);
            posiciones.push(j);
          }
        } else if (tablero_general[i - 1][j] === "p") {
          if (tablero_general[i][j] === " ") {
            posiciones.push(i - 1);
            posiciones.push(j);
            posiciones.push(i);
            posiciones.push(j);
            break;
          }
        }
      }
      }
    }  
    return posiciones;
  }
  static comeConPeonNegro(tablero_general,color) {
    let posiciones = [0,0,0,0,0];   
    let bandera=false
    for (let i = 0; i < tablero_general.length; i++) {      
      for (let j = 0; j < tablero_general[0].length; j++) {
        //chequeo cordenadas para ver si hay fichas enemigas
        if (tablero_general[i][j] === "p" && color==="black" && j+1 < tablero_general.length && j-1 >= 0) {          
            if (fichas_blancas.test(tablero_general[i + 1][j + 1])) {
              posiciones = piezaHacia(i,j, i+1, j+1 ,tablero_general)
              if (posiciones[4]>0) bandera=true              
            }
            else if (fichas_blancas.test(tablero_general[i + 1][j -1])) {
              posiciones = piezaHacia(i,j, i+1, j-1 ,tablero_general)
              if (posiciones[4]>0) bandera=true      
            }
          }
         if(bandera) break;         
      } 
      if(bandera) break;      
    }
    return posiciones;
  }
  static muevePeonBlanco(tablero_general) {
    let posiciones = [];
    let aleatorio = valorAleatorioParaPrimerMovimiento();
    if (contador == 0) {
      posiciones.push(3);
      posiciones.push(aleatorio);
      posiciones.push(5);
      posiciones.push(aleatorio);
      contador++;
    } else {
    for (let i = 0; i < tablero_general.length; i++) { 
      for (let j = tablero_general.length; j > 0; j--) {     
      // for (let j = 0; j < tablero_general[0].length; j++) {
        if (tablero_general[i][j] === "P" && (i == 12 || i == 13)) {
          if (tablero_general[i - 2][j] === " ") {
            posiciones.push(i);
            posiciones.push(j);
            posiciones.push(i - 2);
            posiciones.push(j);
            break;
          }
        } else if (tablero_general[i][j] === "P") {
          if (tablero_general[i - 1][j] === " ") {
            posiciones.push(i);
            posiciones.push(j);
            posiciones.push(i - 1);
            posiciones.push(j);
            break;
          }
        }
      }
      }
    }
    return posiciones;
  }
  static comeConPeonBlanco(tablero_general,color) {
    let posiciones = [0,0,0,0,0];   
    let bandera=false
    for (let i = 0; i < tablero_general.length; i++) {      
      for (let j = 0; j < tablero_general[0].length; j++) {
        if (tablero_general[i][j] === "P" && color==="white" && j+1 < tablero_general.length && j-1 >= 0) {          
            if (fichas_negras.test(tablero_general[i - 1][j + 1])) {
              posiciones = piezaHacia(i,j, i-1, j+1 ,tablero_general)
              if (posiciones[4]>0) bandera=true  
            }
            else if (fichas_negras.test(tablero_general[i - 1][j -1])) {
              posiciones = piezaHacia(i,j, i-1, j-1 ,tablero_general)
              if (posiciones[4]>0) bandera=true  
            }          
        }
        if(bandera) break;
      } 
      if(bandera) break;      
    }
    return posiciones;
  }
}
const mejorMovimientoTorre = (i, j, tablero_general, color) =>{
  let posicion_provisoria = [0, 0, 0, 0, 0];
  let posicion_final_movimiento = [0, 0, 0, 0, 0]; 
  let fichas_propias = [];
        //RECORRO VERTICALMENTE. NORTE
        posicion_provisoria = MovimientosRectos.movimientoVerticalNorte(i, j, tablero_general, fichas_propias, color);
        //comparo puntajes de movimientos para ver el mejor
        if (posicion_provisoria[4] > posicion_final_movimiento[4]) {
          posicion_final_movimiento = [];
          posicion_final_movimiento = [...posicion_provisoria];
         }
        //RECORRO VERTICALMENTE. SUR
        posicion_provisoria = MovimientosRectos.movimientoVerticalSur(i, j, tablero_general, fichas_propias, color);
        if (posicion_provisoria[4] > posicion_final_movimiento[4]) {
          posicion_final_movimiento = [];
          posicion_final_movimiento = [...posicion_provisoria];
        }
        //RECORRO HORIZONTALMENTE. OESTE
        posicion_provisoria = MovimientosRectos.movimientoHorizontalOeste(i, j, tablero_general, fichas_propias, color);
        if (posicion_provisoria[4] > posicion_final_movimiento[4]) {
          posicion_final_movimiento = [];
          posicion_final_movimiento = [...posicion_provisoria];
        }
        //RECORRO HORIZONTALMENTE. ESTE
        posicion_provisoria = MovimientosRectos.movimientoHorizontalEste(i, j, tablero_general, fichas_propias, color);
        if (posicion_provisoria[4] > posicion_final_movimiento[4]) {
          posicion_final_movimiento = [];
          posicion_final_movimiento = [...posicion_provisoria];
        }    
  //devuelvo el mejor movimiento de esa Torre en particular    
  return posicion_final_movimiento  
}
const mejorMovimientoReina = (i, j, tablero_general, color) =>{
  let posicion_provisoria = [0, 0, 0, 0, 0];
  let posicion_final_movimiento = [0, 0, 0, 0, 0]; 
  let fichas_propias = [];
        //RECORRO VERTICALMENTE. NORTE
        posicion_provisoria = MovimientosRectos.movimientoVerticalNorte(i, j, tablero_general, fichas_propias, color);
        //comparo puntajes de movimientos para ver el mejor
        if (posicion_provisoria[4] > posicion_final_movimiento[4]) {
          posicion_final_movimiento = [];
          posicion_final_movimiento = [...posicion_provisoria];
         }
        //RECORRO VERTICALMENTE. SUR
        posicion_provisoria = MovimientosRectos.movimientoVerticalSur(i, j, tablero_general, fichas_propias, color);
        if (posicion_provisoria[4] > posicion_final_movimiento[4]) {
          posicion_final_movimiento = [];
          posicion_final_movimiento = [...posicion_provisoria];
        }
        //RECORRO HORIZONTALMENTE. OESTE
        posicion_provisoria = MovimientosRectos.movimientoHorizontalOeste(i, j, tablero_general, fichas_propias, color);
        if (posicion_provisoria[4] > posicion_final_movimiento[4]) {
          posicion_final_movimiento = [];
          posicion_final_movimiento = [...posicion_provisoria];
        }
        //RECORRO HORIZONTALMENTE. ESTE
        posicion_provisoria = MovimientosRectos.movimientoHorizontalEste(i, j, tablero_general, fichas_propias, color);
        if (posicion_provisoria[4] > posicion_final_movimiento[4]) {
          posicion_final_movimiento = [];
          posicion_final_movimiento = [...posicion_provisoria];
        }    
        //RECORRO DIAGONAL INFERIOR DERECHA
        posicion_provisoria = MovimientosOblicuos.movimientoDiagonalInferiorDerecho(i, j, tablero_general, fichas_propias, color);
        if (posicion_provisoria[4] > posicion_final_movimiento[4]) {
          posicion_final_movimiento = [];
          posicion_final_movimiento = [...posicion_provisoria];
        }
        //RECORRO DIAGONAL SUPERIOR DERECHA
        posicion_provisoria = MovimientosOblicuos.movimientoDiagonalSuperiorDerecho(i, j, tablero_general, fichas_propias, color);
        if (posicion_provisoria[4] > posicion_final_movimiento[4]) {
          posicion_final_movimiento = [];
          posicion_final_movimiento = [...posicion_provisoria];
        }
        //RECORRO DIAGONAL SUPERIOR IZQUIERDA
        posicion_provisoria = MovimientosOblicuos.movimientoDiagonalSuperiorIzquierdo(i, j, tablero_general, fichas_propias, color);
        if (posicion_provisoria[4] > posicion_final_movimiento[4]) {
          posicion_final_movimiento = [];
          posicion_final_movimiento = [...posicion_provisoria];
        }
        //RECORRO DIAGONAL INFERIOR IZQUIERDA
        posicion_provisoria = MovimientosOblicuos.movimientoDiagonalInferiorIzquierdo(i, j, tablero_general, fichas_propias, color);
        if (posicion_provisoria[4] > posicion_final_movimiento[4]) {
          posicion_final_movimiento = [];
          posicion_final_movimiento = [...posicion_provisoria];
        }
  //devuelvo el mejor movimiento de esa Torre en particular    
  return posicion_final_movimiento  
}
const mejorMovimientoAlfil = (i, j, tablero_general, color) =>{
  let posicion_provisoria = [0, 0, 0, 0, 0];
  let posicion_final_movimiento = [0, 0, 0, 0, 0]; 
  let fichas_propias = [];         
        //RECORRO DIAGONAL INFERIOR DERECHA
        posicion_provisoria = MovimientosOblicuos.movimientoDiagonalInferiorDerecho(i, j, tablero_general, fichas_propias, color);
         //comparo puntajes de movimientos para ver el mejor
        if (posicion_provisoria[4] > posicion_final_movimiento[4]) {
          posicion_final_movimiento = [];
          posicion_final_movimiento = [...posicion_provisoria];
        }
        //RECORRO DIAGONAL SUPERIOR DERECHA
        posicion_provisoria = MovimientosOblicuos.movimientoDiagonalSuperiorDerecho(i, j, tablero_general, fichas_propias, color);
        if (posicion_provisoria[4] > posicion_final_movimiento[4]) {
          posicion_final_movimiento = [];
          posicion_final_movimiento = [...posicion_provisoria];
        }
        //RECORRO DIAGONAL SUPERIOR IZQUIERDA
        posicion_provisoria = MovimientosOblicuos.movimientoDiagonalSuperiorIzquierdo(i, j, tablero_general, fichas_propias, color);
        if (posicion_provisoria[4] > posicion_final_movimiento[4]) {
          posicion_final_movimiento = [];
          posicion_final_movimiento = [...posicion_provisoria];
        }
        //RECORRO DIAGONAL INFERIOR IZQUIERDA
        posicion_provisoria = MovimientosOblicuos.movimientoDiagonalInferiorIzquierdo(i, j, tablero_general, fichas_propias, color);
        if (posicion_provisoria[4] > posicion_final_movimiento[4]) {
          posicion_final_movimiento = [];
          posicion_final_movimiento = [...posicion_provisoria];
        }
  //devuelvo el mejor movimiento de esa Torre en particular    
  return posicion_final_movimiento  
}
const mueveRey = (tablero_general, color) => {
  let posicion_provisoria = [0, 0, 0, 0, 0];
  let posicion_final_movimiento = [0, 0, 0, 0, 0];
  let movimiento_final = [0, 0, 0, 0, 0];
  let m = 1;
  for (let i = 0; i < tablero_general.length; i++) {
    for (let j = 0; j < tablero_general[0].length; j++) {
      //CHEQUEO QUE EL REY NO SE PUEDA SALIR DEL TABLERO
      if (i - m >= 0 && i + m < tablero_general.length && j - m >= 0 && j + m < tablero_general.length) {        
        if (color === "white" && tablero_general[i][j] === "K") {
            //comparo todas las direcciones en las que el rey pueda comer
            //MUEVO VERTICALMENTE. NORTE
            if (fichas_negras.test(tablero_general[i - m][j])) {
              //SI LA ENCUENTRO, CAPTURO LA CORDENADA
              posicion_provisoria = piezaHacia(i, j, i - m, j, tablero_general);
            }
            //si el movimiento fue comer, entonces lo voy almacenando para capturar la mejor posibilidad
            if (posicion_provisoria[4] > posicion_final_movimiento[4]) {
              posicion_final_movimiento = [];
              posicion_final_movimiento = [...posicion_provisoria];
            }
            //RECORRO VERTICALMENTE. SUR
            if (fichas_negras.test(tablero_general[i + m][j])) {
              posicion_provisoria = piezaHacia(i, j, i + m, j, tablero_general);
            }
            if (posicion_provisoria[4] > posicion_final_movimiento[4]) {
              posicion_final_movimiento = [];
              posicion_final_movimiento = [...posicion_provisoria];
            }
            //RECORRO HORIZONTALMENTE. OESTE
            if (fichas_negras.test(tablero_general[i][j - m])) {
              posicion_provisoria = piezaHacia(i, j, i, j - m, tablero_general);
            }
            if (posicion_provisoria[4] > posicion_final_movimiento[4]) {
              posicion_final_movimiento = [];
              posicion_final_movimiento = [...posicion_provisoria];
            }
            //RECORRO HORIZONTALMENTE. ESTE
            if (fichas_negras.test(tablero_general[i][j + m])) {
              posicion_provisoria = piezaHacia(i, j, i, j + m, tablero_general);
            }
            if (posicion_provisoria[4] > posicion_final_movimiento[4]) {
              posicion_final_movimiento = [];
              posicion_final_movimiento = [...posicion_provisoria];
            }
            //RECORRO DIAGONAL INFERIOR DERECHA
            if (fichas_negras.test(tablero_general[i + m][j + m])) {
              posicion_provisoria = piezaHacia(i, j, i + m, j + m, tablero_general);
            }
            if (posicion_provisoria[4] > posicion_final_movimiento[4]) {
              posicion_final_movimiento = [];
              posicion_final_movimiento = [...posicion_provisoria];
            }
            //RECORRO DIAGONAL SUPERIOR DERECHA
            if (fichas_negras.test(tablero_general[i - m][j + m])) {
              posicion_provisoria = piezaHacia(i, j, i - m, j + m, tablero_general);
            }
            if (posicion_provisoria[4] > posicion_final_movimiento[4]) {
              posicion_final_movimiento = [];
              posicion_final_movimiento = [...posicion_provisoria];
            }
            //RECORRO DIAGONAL SUPERIOR IZQUIERDA
            if (fichas_negras.test(tablero_general[i - m][j - m])) {
              posicion_provisoria = piezaHacia(i, j, i - m, j + m, tablero_general);
            }
            if (posicion_provisoria[4] > posicion_final_movimiento[4]) {
              posicion_final_movimiento = [];
              posicion_final_movimiento = [...posicion_provisoria];
            }
            //RECORRO DIAGONAL INFERIOR IZQUIERDA
            if (fichas_negras.test(tablero_general[i + m][j - m])) {
              posicion_provisoria = piezaHacia(i, j, i + m, j - m, tablero_general);
            }
            if (posicion_provisoria[4] > posicion_final_movimiento[4]) {
              posicion_final_movimiento = [];
              posicion_final_movimiento = [...posicion_provisoria];
            }
            //comparo el mejor movimiento de esta pieza vs mejor movimiento de los demas reys
            if (posicion_final_movimiento[4] > movimiento_final[4]) {
              movimiento_final = [];
              movimiento_final = [...posicion_final_movimiento];
            }
        } else if (color === "black" && tablero_general[i][j] === "k") {         
            if (fichas_blancas.test(tablero_general[i - m][j])) {       
              posicion_provisoria = piezaHacia(i, j, i - m, j, tablero_general);
            }        
            if (posicion_provisoria[4] > posicion_final_movimiento[4]) {
              posicion_final_movimiento = [];
              posicion_final_movimiento = [...posicion_provisoria];
            }         
            if (fichas_blancas.test(tablero_general[i + m][j])) {
              posicion_provisoria = piezaHacia(i, j, i + m, j, tablero_general);
            }
            if (posicion_provisoria[4] > posicion_final_movimiento[4]) {
              posicion_final_movimiento = [];
              posicion_final_movimiento = [...posicion_provisoria];
            }        
            if (fichas_blancas.test(tablero_general[i][j + m])) {
              posicion_provisoria = piezaHacia(i, j, i, j + m, tablero_general);
            }
            if (posicion_provisoria[4] > posicion_final_movimiento[4]) {
              posicion_final_movimiento = [];
              posicion_final_movimiento = [...posicion_provisoria];
            }         
            if (fichas_blancas.test(tablero_general[i][j - m])) {
              posicion_provisoria = piezaHacia(i, j, i, j - m, tablero_general);
            }
            if (posicion_provisoria[4] > posicion_final_movimiento[4]) {
              posicion_final_movimiento = [];
              posicion_final_movimiento = [...posicion_provisoria];
            }        
            if (fichas_blancas.test(tablero_general[i + m][j + m])) {
              posicion_provisoria = piezaHacia(i, j, i + m, j + m, tablero_general);
            }
            if (posicion_provisoria[4] > posicion_final_movimiento[4]) {
              posicion_final_movimiento = [];
              posicion_final_movimiento = [...posicion_provisoria];
            }         
            if (fichas_blancas.test(tablero_general[i - m][j + m])) {
              posicion_provisoria = piezaHacia(i, j, i - m, j + m, tablero_general);
            }
            if (posicion_provisoria[4] > posicion_final_movimiento[4]) {
              posicion_final_movimiento = [];
              posicion_final_movimiento = [...posicion_provisoria];
            }      
            if (fichas_blancas.test(tablero_general[i - m][j - m])) {
              posicion_provisoria = piezaHacia(i, j, i - m, j + m, tablero_general);
            }
            if (posicion_provisoria[4] > posicion_final_movimiento[4]) {
              posicion_final_movimiento = [];
              posicion_final_movimiento = [...posicion_provisoria];
            }        
            if (fichas_blancas.test(tablero_general[i + m][j - m])) {
              posicion_provisoria = piezaHacia(i, j, i + m, j - m, tablero_general);
            }
            if (posicion_provisoria[4] > posicion_final_movimiento[4]) {
              posicion_final_movimiento = [];
              posicion_final_movimiento = [...posicion_provisoria];
            }         
            if (posicion_final_movimiento[4] > movimiento_final[4]) {
              movimiento_final = [];
              movimiento_final = [...posicion_final_movimiento];
            }
        }
      }
    }
  }
  return movimiento_final;
};
const mueveAlfil = (tablero_general, color) => {
  let posicion_provisoria = [0, 0, 0, 0, 0]; 
  let movimiento_final = [0, 0, 0, 0, 0];
  for (let i = 0; i < tablero_general.length; i++) {
    for (let j = 0; j < tablero_general[0].length; j++) {        
      if (color === "white" && tablero_general[i][j] === "B") {
        posicion_provisoria = mejorMovimientoAlfil(i, j, tablero_general, color);         
        //comparo el mejor movimiento vs mejor movimiento mismo tipo de pieza y elijo el mejor
        if (posicion_provisoria[4] > movimiento_final[4]) {
          movimiento_final = [];
          movimiento_final = [...posicion_provisoria];
        }
      } else if (color === "black" && tablero_general[i][j] === "b") {
        posicion_provisoria = mejorMovimientoAlfil(i, j, tablero_general, color);      
        if (posicion_provisoria[4] > movimiento_final[4]) {
          movimiento_final = [];
          movimiento_final = [...posicion_provisoria];
        }
      }
    }
  }
  return movimiento_final;
};
const mueveTorre = (tablero_general, color) => {
  let posicion_provisoria = [0, 0, 0, 0, 0]; 
  let movimiento_final = [0, 0, 0, 0, 0]; 
  for (let i = 0; i < tablero_general.length; i++) {
    for (let j = 0; j < tablero_general[0].length; j++) {   
      //PREGUNTO SI EL TURNO ES PARA EL BLANCO
      if (color === "white" && tablero_general[i][j] === "R") {
        posicion_provisoria=mejorMovimientoTorre(i,j,tablero_general,color)
        //comparo el mejor movimiento vs mejor movimiento mismo tipo de pieza y elijo el mejor
        if (posicion_provisoria[4] > movimiento_final[4]) {
          movimiento_final = [];
          movimiento_final = [...posicion_provisoria];
        }
      } else if (color === "black" && tablero_general[i][j] === "r") {
        posicion_provisoria=mejorMovimientoTorre(i,j,tablero_general,color)       
        if (posicion_provisoria[4] > movimiento_final[4]) {
          movimiento_final = [];
          movimiento_final = [...posicion_provisoria];
        }
      }
    }
  }
  return movimiento_final;
};
const mueveCaballo = (tablero_general, color) => {
  let posicion_provisoria = [0, 0, 0, 0, 0];
  let posicion_final_movimiento = [0, 0, 0, 0, 0];
  let movimiento_final = [0, 0, 0, 0, 0];  
  for (let i = 0; i < tablero_general.length; i++) {
    for (let j = 0; j < tablero_general[0].length; j++) {         
      if (color === "white" && tablero_general[i][j] === "H") {
        //abarco los 8 movimientos posibles.
        if (i + 2 < tablero_general.length && j + 1 < tablero_general.length && fichas_negras.test(tablero_general[i + 2][j + 1])) {
          posicion_provisoria = piezaHacia(i, j, i + 2, j + 1, tablero_general);
        }//1
        if (posicion_provisoria[4] > posicion_final_movimiento[4]) {
          posicion_final_movimiento = [];
          posicion_final_movimiento = [...posicion_provisoria];
        }
        if (i + 1 < tablero_general.length && j + 2 < tablero_general.length && fichas_negras.test(tablero_general[i + 1][j + 2])) {
          posicion_provisoria = piezaHacia(i, j, i + 1, j + 2, tablero_general);
        }//2
        if (posicion_provisoria[4] > posicion_final_movimiento[4]) {
          posicion_final_movimiento = [];
          posicion_final_movimiento = [...posicion_provisoria];
        }
        if (i + 2 < tablero_general.length && j - 1 >= 0 && fichas_negras.test(tablero_general[i + 2][j - 1])) {
          posicion_provisoria = piezaHacia(i, j, i + 2, j - 1, tablero_general);
        }//3
        if (posicion_provisoria[4] > posicion_final_movimiento[4]) {
          posicion_final_movimiento = [];
          posicion_final_movimiento = [...posicion_provisoria];
        }
        if (i + 1 < tablero_general.length && j - 2 >= 0 && fichas_negras.test(tablero_general[i + 1][j - 2])) {
          posicion_provisoria = piezaHacia(i, j, i + 1, j - 2, tablero_general);
        } //4
        if (posicion_provisoria[4] > posicion_final_movimiento[4]) {
          posicion_final_movimiento = [];
          posicion_final_movimiento = [...posicion_provisoria];
        }
        if (i - 1 >= 0 && j + 2 < tablero_general.length && fichas_negras.test(tablero_general[i - 1][j + 2])) {
          posicion_provisoria = piezaHacia(i, j, i - 1, j + 2, tablero_general);
        } //5
        if (posicion_provisoria[4] > posicion_final_movimiento[4]) {
          posicion_final_movimiento = [];
          posicion_final_movimiento = [...posicion_provisoria];
        }
        if (i - 2 >= 0 && j + 1 < tablero_general.length && fichas_negras.test(tablero_general[i - 2][j + 1])) {
          posicion_provisoria = piezaHacia(i, j, i - 2, j + 1, tablero_general);
        } //6
        if (posicion_provisoria[4] > posicion_final_movimiento[4]) {
          posicion_final_movimiento = [];
          posicion_final_movimiento = [...posicion_provisoria];
        }
        if (i - 2 >= 0 && j - 1 >= 0 && fichas_negras.test(tablero_general[i - 2][j - 1])) {
          posicion_provisoria = piezaHacia(i, j, i - 2, j - 1, tablero_general);
        } //7
        if (posicion_provisoria[4] > posicion_final_movimiento[4]) {
          posicion_final_movimiento = [];
          posicion_final_movimiento = [...posicion_provisoria];
        }
        if (i - 1 >= 0 && j - 2 >= 0 && fichas_negras.test(tablero_general[i - 1][j - 2])) {
          posicion_provisoria = piezaHacia(i, j, i - 1, j - 2, tablero_general);
        } //8
        if (posicion_provisoria[4] > posicion_final_movimiento[4]) {
          posicion_final_movimiento = [];
          posicion_final_movimiento = [...posicion_provisoria];
        }
        //comparo el mejor movimiento vs mejor movimiento mismo tipo de pieza y elijo el mejor
        if (posicion_final_movimiento[4] > movimiento_final[4]) {
          movimiento_final = [];
          movimiento_final = [...posicion_final_movimiento];
        }
      } else if (color === "black" && tablero_general[i][j] === "h") {
        if (i + 2 < tablero_general.length && j + 1 < tablero_general.length && fichas_blancas.test(tablero_general[i + 2][j + 1])) {
          posicion_provisoria = piezaHacia(i, j, i + 2, j + 1, tablero_general);
        } //1
        if (posicion_provisoria[4] > posicion_final_movimiento[4]) {
          posicion_final_movimiento = [];
          posicion_final_movimiento = [...posicion_provisoria];
        }
        if (i + 1 < tablero_general.length && j + 2 < tablero_general.length && fichas_blancas.test(tablero_general[i + 1][j + 2])) {
          posicion_provisoria = piezaHacia(i, j, i + 1, j + 2, tablero_general);
        } //2
        if (posicion_provisoria[4] > posicion_final_movimiento[4]) {
          posicion_final_movimiento = [];
          posicion_final_movimiento = [...posicion_provisoria];
        }
        if (i + 2 < tablero_general.length && j - 1 >= 0 && fichas_blancas.test(tablero_general[i + 2][j - 1])) {
          posicion_provisoria = piezaHacia(i, j, i + 2, j - 1, tablero_general);
        } //3
        if (posicion_provisoria[4] > posicion_final_movimiento[4]) {
          posicion_final_movimiento = [];
          posicion_final_movimiento = [...posicion_provisoria];
        }
        if (i + 1 < tablero_general.length && j - 2 >= 0 && fichas_blancas.test(tablero_general[i + 1][j - 2])) {
          posicion_provisoria = piezaHacia(i, j, i + 1, j - 2, tablero_general);
        } //4
        if (posicion_provisoria[4] > posicion_final_movimiento[4]) {
          posicion_final_movimiento = [];
          posicion_final_movimiento = [...posicion_provisoria];
        }
        if (i - 1 >= 0 && j + 2 < tablero_general.length && fichas_blancas.test(tablero_general[i - 1][j + 2])) {
          posicion_provisoria = piezaHacia(i, j, i - 1, j + 2, tablero_general);
        } //5
        if (posicion_provisoria[4] > posicion_final_movimiento[4]) {
          posicion_final_movimiento = [];
          posicion_final_movimiento = [...posicion_provisoria];
        }
        if (i - 2 >= 0 && j + 1 < tablero_general.length && fichas_blancas.test(tablero_general[i - 2][j + 1])) {
          posicion_provisoria = piezaHacia(i, j, i - 2, j + 1, tablero_general);
        } //6
        if (posicion_provisoria[4] > posicion_final_movimiento[4]) {
          posicion_final_movimiento = [];
          posicion_final_movimiento = [...posicion_provisoria];
        }
        if (i - 2 >= 0 && j - 1 >= 0 && fichas_blancas.test(tablero_general[i - 2][j - 1])) {
          posicion_provisoria = piezaHacia(i, j, i - 2, j - 1, tablero_general);
        } //7
        if (posicion_provisoria[4] > posicion_final_movimiento[4]) {
          posicion_final_movimiento = [];
          posicion_final_movimiento = [...posicion_provisoria];
        }
        if (i - 1 >= 0 && j - 2 >= 0 && fichas_blancas.test(tablero_general[i - 1][j - 2])) {
          posicion_provisoria = piezaHacia(i, j, i - 1, j - 2, tablero_general);
        } //8
        if (posicion_provisoria[4] > posicion_final_movimiento[4]) {
          posicion_final_movimiento = [];
          posicion_final_movimiento = [...posicion_provisoria];
        }
        //comparo el mejor movimiento vs mejor movimiento mismo tipo de pieza y elijo el mejor
        if (posicion_final_movimiento[4] > movimiento_final[4]) {
          movimiento_final = [];
          movimiento_final = [...posicion_final_movimiento];
        }
      }
    }
  }
  return movimiento_final;
};
const mueveReina = (tablero_general, color) => {
  let posicion_provisoria = [0, 0, 0, 0, 0]; 
  let movimiento_final = [0, 0, 0, 0, 0];
  for (let i = 0; i < tablero_general.length; i++) {
    for (let j = 0; j < tablero_general[0].length; j++) {      
      if (color === "white" && tablero_general[i][j] === "Q") {       
        posicion_provisoria = mejorMovimientoReina(i, j, tablero_general, color);         
        //comparo el mejor movimiento vs mejor movimiento mismo tipo de pieza y elijo el mejor
        if (posicion_provisoria[4] > movimiento_final[4]) {
          movimiento_final = [];
          movimiento_final = [...posicion_provisoria];
        }
      } else if (color === "black" && tablero_general[i][j] === "q") {
        posicion_provisoria = mejorMovimientoReina(i, j, tablero_general, color);        
        if (posicion_provisoria[4] > movimiento_final[4]) {
          movimiento_final = [];
          movimiento_final = [...posicion_provisoria];
        }       
      }
    }
  }
  return movimiento_final;
};
const piezaHacia = (i, j, k, l, t) => {
  let array = [];
  let ficha_a_comer = t[k][l];
  let valor_ficha_a_comer = 0;
  array.push(i);
  array.push(j);
  array.push(k);
  array.push(l);
  switch (ficha_a_comer) {
    case "k":
    case "K":
      valor_ficha_a_comer = 6;
      break;
    case "r":
    case "R":
      valor_ficha_a_comer = 5;
      break;
    case "b":
    case "B":
      valor_ficha_a_comer = 4;
      break;
    case "h":
    case "H":
      valor_ficha_a_comer = 3;
      break;
    case "p":
    case "P":
      valor_ficha_a_comer = 1;
      break;
    case "q":
    case "Q":
      valor_ficha_a_comer = 2;
      break;
  }
  array.push(valor_ficha_a_comer);
  return array;
};
const atrapaFichaAmiga = (i, j, k, l) => {
  let array = [];
  array.push(i);
  array.push(j);
  array.push(k);
  array.push(l);
  return array;
};
const elijeMejorMovida = (mov1, mov2, tablero, color) => {
  //los para metros son 2 arrays vacios.
  mov1 = mueveRey(tablero, color);
  mov2 = [...mov1];
  //si el rey puede comer, es porque está en peligo. PRIORIDAD AL COMER
  if (mov2[4]>0) {
    return mov2
  }else{
    if (color==="white") {
      mov1= MovimientosPeones.comeConPeonBlanco(tablero,color)
      //en la posicion 4 está el puntaje de la movida
      if (mov1[4] > mov2[4]) {
        mov2 = [];
        //si el puntaje de la movida de la pieza es mayor que la otra, se sobrescribe el mov2
        mov2 = [...mov1];
      } 
    }else{
      mov1= MovimientosPeones.comeConPeonNegro(tablero,color)
      if (mov1[4] > mov2[4]) {
        mov2 = [];
        mov2 = [...mov1];
      } 
    } 
    mov1 = mueveCaballo(tablero, color);
    if (mov1[4] > mov2[4]) {
      mov2 = [];
      mov2 = [...mov1];
    }
    mov1 = mueveTorre(tablero, color);
    if (mov1[4] > mov2[4]) {
      mov2 = [];
      mov2 = [...mov1];
    }
    mov1 = mueveReina(tablero, color);
    if (mov1[4] > mov2[4]) {
      mov2 = [];
      mov2 = [...mov1];
    }  
    //si ninguna ficha puede comer, entonces la decicion es mover un peon
    if (mov2[4] === 0 && color === "white") {
      mov2 = MovimientosPeones.muevePeonBlanco(tablero);
    } else if (mov2[4] === 0 && color === "black") {
      mov2 = MovimientosPeones.muevePeonNegro(tablero);
    }
  }  
  //devuelvo un array con las cordenadas que se usaran para el movimiento
  return mov2;
};
const devuelveMovida = (datos) => {
  //recopila todos los datos y lo manda por ws
  let color = datos.data.actual_turn;
  let obj;
  let tablero = rellenaTablero(datos);
  let movimiento = [];
  let movimiento_provisorio = [];
  let movimiento_final = [];
  if (color === "black") {
    //las posiciones de mi array movimiento son las cordenadas del siguiente movimiento
    movimiento = elijeMejorMovida(movimiento_provisorio, movimiento_final, tablero, color);
    obj = {
      action: "move",
      data: {
        board_id: datos.data.board_id,
        turn_token: datos.data.turn_token,
        from_row: movimiento[0],
        from_col: movimiento[1],
        to_row: movimiento[2],
        to_col: movimiento[3],
      },
    };
  } else if (datos.data.actual_turn === "white") {
    movimiento = elijeMejorMovida(movimiento_provisorio, movimiento_final, tablero, color);
    obj = {
      action: "move",
      data: {
        board_id: datos.data.board_id,
        turn_token: datos.data.turn_token,
        from_row: movimiento[0],
        from_col: movimiento[1],
        to_row: movimiento[2],
        to_col: movimiento[3],
      },
    };
  }
  //devuelvo objeto a transormar a JSON para servidor
  return obj;
};
const ws = new WebSocket(
  "ws://megachess.herokuapp.com/service?authtoken=6dc5827d-4173-40e8-b735-8bbf376f407f"
);
const desafiar = {
  action: "challenge",
  data: {
    username: "ArturoFernando",
    message: "a jugar?",
  },
};
ws.onopen = () => {
  console.log("conectado");
  ws.send(JSON.stringify(desafiar));
};

ws.onmessage = (e) => {
  const msg = JSON.parse(e.data);
  if (msg.event == "update_user_list") {
    console.log("usuarios actualizados");
    console.log(msg.data.users_list);
  }
  if (msg.event == "ask_challenge") {
    const obj2 = {
      action: "accept_challenge",
      data: {
        board_id: msg.data.board_id,
      },
    };
    ws.send(JSON.stringify(obj2));
  } 
  if (msg.event == "abort") {
    const obj = {
      action: "abort",
      data: {
        Board_id: "2d348323-2e79-4961-ac36-1b000e8c42a5",
      }
    } 
    ws.send(JSON.stringify(obj));
  } 
  if (msg.event == "your_turn") {
    c.log(msg.data);
    c.log(rellenaTablero(msg));
    limpiaTablero();
    ws.send(JSON.stringify(devuelveMovida(msg)));
    limpiaTablero();
  }
  if (msg.event == "gameover") {
    c.log(msg.data);
  }
};