import styled from "styled-components";

type ContainerProps ={
    
    showBackground:boolean

}


export const Container = styled.div<ContainerProps>`

        background-color: ${props=>props.showBackground ?'#1550FF':'#E2E3E3'}; //se o props.showBackground for verdadeiro eu exibo uma cor(azul), caso contrario exibo outra
        heigth: 100px;
        border-radius:20px;
        display:flex;
        justify-content: center;
        align-items:center;
        cursos: pointer
`
type iconProps ={
    
    opacity?:number;

}

export const icon = styled.img <iconProps>`

        heigth: 40px;
        width: 40px;
        opacity: ${props => props.opacity? props.opacity:1}
            
`


