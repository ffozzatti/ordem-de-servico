import './App.css';

import { useFetch } from "./hooks/useFetch"
import GeneratePdf from './components/GeneratePdf';
import Navbar from './components/Navbar';
import AddProduct from './components/AddProduct';
import { useState } from 'react';
import ProductList from './components/ProductList'




const url = "http://localhost:3000/serviceOrder"

function App() {

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

  
  const sumTotalValue = items && items
    .map(value => value.price)
    .reduce(( prev, next) => prev + next, 0)  

  return (
    <div className="App">
          <header>
           <Navbar />
          </header>
          <main className='container'>
            <AddProduct 
              handleSubmit={handleSubmit} 
              service={service} 
              setService={setService} 
              price={price} 
              setPrice={setPrice}
              loading={loading}
            />          
            {loading && <p>Carregando dados...</p>}
            {error && <p>{error}</p>}
            {!error && (
              <ProductList 
                items={items} 
                handleRemove={handleRemove}
              />
            )}

            <div className="total">
              <p>O valor total é: {<span> R$ {sumTotalValue}</span> }</p>
            </div>
            
            <GeneratePdf />
  
           
          </main>
          
          

    </div>
  )
}

export default App;
