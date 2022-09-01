import './styles.css'
import { MdLogout } from "react-icons/md";


const Navbar = () => {
  return (
    <>
        <nav>
            <h1>MakeOS</h1>
            <div className='login'>              
              <p>Olá, Felipe!</p>  <span><MdLogout /></span>  
            </div>
        </nav>
    </>
  )
}

export default Navbar