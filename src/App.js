import './App.css';

import { useState } from "react";

import { useFetch } from "./hooks/useFetch"
import GeneratePdf from './components/GeneratePdf';


const url = "http://localhost:3000/serviceOrder"

function App() {

  const [serviceOrder, setServiceOrder] = useState([])
 

  const {data: items, httpConfig, loading, error} = useFetch(url)

  const [service, setService] = useState("")
  const [price, setPrice] = useState("")

  const handleSubmit = async (e) => {
    e.preventDefault()

    const serviceOrder = {
      service,
      price
    }

    httpConfig(serviceOrder, "POST")

    setService("")
    setPrice("")
  }  

  const handleRemove = (id) => {
    httpConfig(id, "DELETE")
  }

  
  const sumTotalValue = items && items.map(sumTotalValue => sumTotalValue.price).reduce(( value, next) => value + next, 0)  



  return (
    <div className="App">

      <h1>Ordem de Serviço</h1>      
          <div className="add-product">
            <form onSubmit={handleSubmit}>
              <label>
                Serviço:
                <input type="text" value={service} name="service" onChange={(e) => setService(e.target.value)} />
              </label>
              <label>
                Preço:
                <input type="number" value={price} name="price" onChange={(e) => setPrice(e.target.valueAsNumber)} />
              </label>
              {/* 7 - state de loading post */}
              {loading && <input type="submit" disable value="Aguarde"/>}
              {!loading && <input type="submit" value="Criar"/>}

            </form>
          </div>

          {loading && <p>Carregando dados...</p>}
          {error && <p>{error}</p>}
          {!error && (
            <ul>
              {items && items.map((serviceOrder) => (
                <li key={serviceOrder.id}>
                  {serviceOrder.service} - R$: {serviceOrder.price}
                  <button onClick={() => handleRemove(serviceOrder.id)} >Excluir</button>
                </li>                        
              ))}                  
            </ul>
          )}

          <div className="total">
            <p>O valor total é: R$ {sumTotalValue}</p>
          </div>
          
          <GeneratePdf />
          

    </div>
  );
}

export default App;
