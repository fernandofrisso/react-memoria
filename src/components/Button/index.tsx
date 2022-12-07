import * as C from './styles';

type Props ={

    label:string;
    icon:any; // any aceita qualquer coisa
    onClick: React.MouseEventHandler<HTMLDivElement>;

}

export const Button = ({label, icon, onClick}:Props) =>{

    return(


        <C.Container onClick={onClick}>

        {icon && // se o icone existir, aparece essa mensagem

            <C.IconArea>
               

                <C.Icon src={icon}/>
            
            </C.IconArea>
        }

            <C.Label>

                {label}

            </C.Label>

        </C.Container>


    );

    
}