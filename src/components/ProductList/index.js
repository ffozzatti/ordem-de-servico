import "./styles.css"
import { MdCancel } from "react-icons/md";



const ProductList = ({items, handleRemove}) => {
  return (
    <div>
        <ul className="itemsList">
            {items && items.map((serviceOrder) => (
                <li key={serviceOrder.id}>
                    {serviceOrder.service} - R$: {serviceOrder.price}
                    <button onClick={() => handleRemove(serviceOrder.id)} >
                        <span> <MdCancel /> </span> 
                    </button>
                </li>                        
            ))}                  
        </ul>
    </div>
  )
}

export default ProductList