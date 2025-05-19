import { useState } from "react"
import { useNavigate } from "react-router-dom"
function AddProduct(){
    const navigate = useNavigate()
    const [name, setName] = useState('')
    const [price,setPrice] = useState('')
    const [category, setCategory] = useState('')
    const [company, setCompany] = useState('')
    const [error, setError] = useState(false)

    const addProduct = async ()=>{
        if(!name || !price || !category || !company)
        {
            setError(true)
            return false
        }
        console.log(name,price,category,company)
        const userId = JSON.parse(localStorage.getItem('user'))._id
        let result = await fetch('http://localhost:4000/add-product',{
            method:'post',
            body:JSON.stringify({name,price,category,company,userId}),
            headers:{
                'Content-Type':'application/json',
                 Authorization: `Bearer ${localStorage.getItem('token')}`
            }
        })
         result = await result.json()
         console.log(result)
         navigate('/')

        
    }
    return(
        <div className="flex justify-center mt-7">
            <div className="flex flex-col gap-5">
            <h1 className="text-2xl font-bold" >Add Product</h1>
            <input onChange={(e)=>setName(e.target.value)} value={name} className="border-2 border-black rounded-md p-1 w-80" type="text" placeholder="Enter product name"/>
            {error && !name && <span className="text-red-500">Enter valid name</span>}
            <input onChange={(e)=>setPrice(e.target.value)} value={price} className="border-2 border-black rounded-md p-1 w-80" type="text" placeholder="Enter product price"/>
           { error && !price && <span className="text-red-400">Enter valid price</span>}
            <input onChange={(e)=>setCategory(e.target.value)} value={category} className="border-2 border-black rounded-md p-1 w-80" type="text" placeholder="Enter product category"/>
          { error && !category && <span className="text-red-500">Enter valid category</span>}
            <input onChange={(e)=>setCompany(e.target.value)} value={company} className="border-2 border-black rounded-md p-1 w-80" type="text" placeholder="Enter product company"/>
           { error && !company && <span className="text-red-500">Enter valid company</span>}
            <button onClick={addProduct} className="border-2 border-black rounded-md p-1 w-80">Add Product</button>
        </div>

        </div>

    )
}

export default AddProduct