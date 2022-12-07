import { GridItemType } from "../../types/GridItemType"
import * as C from "./styles";
import b7Svg from "../../svgs/b7.svg"
import {items} from "../../data/items"

type Props = {

    item: GridItemType,
    onClick: () => void

}

export const GridItem = ({item, onClick}:Props) =>{


    return(

        <C.Container 
        
        showBackground = {item.permaneShown || item.shown }
        onClick={onClick}
        
        >
        
            {item.permaneShown === false && item.shown === false && // se o item.permaneShown e item.shown estiveram como falso, exibo a imagem

                    <C.icon src={b7Svg} alt="" opacity={.1}/>
            
            
            }

            {(item.permaneShown || item.shown ) && item.item !==null && // se o item.permaneShown e item.shown estiveram como verdadeiro, e tiver um item para exibir, exibo a imagem

                    <C.icon src={items[item.item].icon} alt=""/>


            }

        </C.Container>

    )


}