import "../style.css"
const DefaultButton = ({children,...props}) => {
    return (
       <button {...props} className="defaltButton">{children}

       </button>
    )
}
export default DefaultButton