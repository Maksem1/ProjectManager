import DefaultInput from "./DefaltInput"
import DefaultButton from "./DefautButton"
import {useNavigate} from "react-router-dom"

const Menu = () => {
    const navigate = useNavigate() 
    return(
        <div className="menu">
                <div className="logo">logo</div>
                <DefaultInput text="test"></DefaultInput>
                <DefaultButton onClick={()=>{navigate("/")}}>главная</DefaultButton>
                <DefaultButton onClick={()=>{navigate("/documentList")}}>документы</DefaultButton>
                <DefaultButton onClick={()=>{navigate("/taskAdd")}}>добавить проект</DefaultButton>
            </div>
    )
} 
export default Menu