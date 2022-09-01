import "./styles.css"

import { MdAdd } from "react-icons/md";

const AddProduct = ({handleSubmit, service, price, setService, setPrice, loading}) => {     
  return (
      <div className="add-product">
          <form onSubmit={handleSubmit} autocomplete="off">
              <label>
                Serviço:
                <input type="text" required value={service} name="service" onChange={(e) => setService(e.target.value)} />
              </label>
              <label>
                Preço:
                <input type="number" required value={price} name="price" onChange={(e) => setPrice(e.target.valueAsNumber)} />
              </label>

              {loading && <input type="submit" disable value="Aguarde"/>}
              {!loading &&                   
                  <button type="submit"> 
                    <span> <MdAdd /> </span> 
                  </button>
              }

          </form>
      </div>
  )
}

export default AddProduct