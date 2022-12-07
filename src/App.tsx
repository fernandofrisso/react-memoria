import * as C from "./App.styles";
import { useEffect, useState } from "react";

import logoImage from "./assets/devmemory_logo.png";
import restarIcon  from "./svgs/restart.svg";

import { InfoItem } from "./components/InfoItem";
import { Button } from "./components/Button";
import { GridItem } from "./components/GridItem";

import { GridItemType } from "./types/GridItemType";
import { items } from "./data/items";

import {fomatTimeElapsed} from "./helpers/formatTimeElipsed"


const App =()=>{

  const [playing, setPlaying] = useState<boolean>(false); // ta rolando o jogo ou não ? no caso começa como false
  const [timeElapsed, setTimeElapsed] = useState<number>(0); // o tempo decorrido do jogo começa com zero
  const  [moveCount, setMovieCount] = useState<number>(0); //quantidade de movimentos
  const  [showCount, setShowCount] = useState<number>(0); //quantidade de cartas eu já exibi
  const  [gridItems, setGridItems] = useState<GridItemType[]>([]);


  useEffect(()=>resetAndCreatGrid, []);

  useEffect(()=>{
    
    const timer = setInterval(()=>{

      if(playing) {// se playing estiver com true, eu aumento o tempo

        setTimeElapsed(timeElapsed + 1);

      }

        },1000);
  
      return ()=> clearInterval(timer)  // zera o timer

  }, [playing, timeElapsed])

  //verificação se as cartas são iguais
  useEffect(()=>{

      if(showCount === 2){

        let oponed = gridItems.filter(item => item.shown === true); //vai pegar um array só com os intems que estão com show true
        

        if(oponed.length === 2) {

          // verificação 1 - se eles forem iguais, torná-los permanentes

          let tmpGrid = [...gridItems];

          if (oponed[0].item === oponed[1].item) {

            

            for(let i in tmpGrid) {

                if(tmpGrid[i].shown){

                  tmpGrid[i].permaneShown = true;
                  tmpGrid[i].shown = false

                }
              }

              setGridItems(tmpGrid);
              setShowCount(0);

            } else{

              // v2 - se eles n forem iguais, fecha as cartas

              setTimeout(() => {

                let tmpGrid = [...gridItems];

                for(let i in tmpGrid) {
  
                    tmpGrid[i].shown = false
  
                } 
                
                setGridItems(tmpGrid);
                setShowCount(0);
                
              }, 1000);

            }
        
            
            setMovieCount(moveCount => moveCount + 1)

          }

                
        }
  
  }, [showCount, gridItems]);

  // verificando se o jogo acabou

  useEffect(()=>{

    if(moveCount > 0 && gridItems.every(item => item.permaneShown === true)) { // se o moveConut for maior que 0 e o todos os items do meu array (gridItems) satisfazerem a condição (o gridPermanent for verdadeiro)

      setPlaying(false)

    }

  },[moveCount,gridItems])

  
  const resetAndCreatGrid = () =>{

    // passo 1 - resetar o jogo

    setTimeElapsed(0);
    setMovieCount(0);
    setShowCount(0);


    // passo 2 - criar o grid

    // passo 2.1 - criar um grid vazio 

      let tmpGrid: GridItemType [] = [] // criei um array vazio

      for(let i=0; i<(items.length *2); i++){

        tmpGrid.push({

          item: null,
          shown: false,
          permaneShown: false

        })

      }

      // passo 2.2 - preencher o grid 

      for(let linha=0; linha<2; linha++){

        console.log('estamos na linha: ' + linha)

        for(let coluna=0; coluna<items.length; coluna++){

          console.log('estamos na coluna: ' + coluna)


          let pos = -1;

          while (pos < 0 || tmpGrid[pos].item !== null){
            
            pos  = Math.floor(Math.random()* (items.length * 2))

            console.log('estamos na posição: ' + pos)

          }

          tmpGrid[pos].item = coluna;

          console.log('estamos na tmpGrid[pos]: ' + tmpGrid[pos])
        }

      }

      // passo 2.3 - jogar no state

      setGridItems(tmpGrid)
      
      // passo 3 - começar o jogo

      setPlaying(true);


  }

  const handleItemClick = (index:number) =>{

    if(playing && index !==null && showCount < 2) {

      let tmpGrid = [...gridItems];

      if(tmpGrid[index].permaneShown === false && tmpGrid[index].shown === false){

          tmpGrid[index].shown = true;

          setShowCount(showCount +1)
      }

      setGridItems(tmpGrid)
    }

  }

  return (

        <C.Container>

          <C.info>

              <C.LogoLink>

                <img src={logoImage} width='200' alt='' />

              </C.LogoLink>

              <C.InfoArea>
                  
                  <InfoItem label="tempo" value={fomatTimeElapsed(timeElapsed)} />
                  <InfoItem label="movimentos" value={moveCount.toString()} />

              </C.InfoArea>

                  <Button label="Reiniciar" icon={restarIcon} onClick={resetAndCreatGrid}/>

          </C.info>

          <C.GridArea>

            <C.Grid>

              {gridItems.map((item, index)=>(

                  <GridItem

                    key={index}
                    item= {item}
                    onClick= {()=> handleItemClick(index)}
                  
                  />

              ))}

            </C.Grid>

          </C.GridArea>

        </C.Container>
    

  );


};

export default App;