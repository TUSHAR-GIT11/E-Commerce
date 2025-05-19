import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

function ProductList() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    getProducts();
  }, []);

  const getProducts = async () => {
  let result = await fetch("http://localhost:4000/products", {
  headers: {
    Authorization: `Bearer ${localStorage.getItem('token')}`
  }
});

    result = await result.json();
    setProducts(result);
  };

  const deleteProduct = async (id) => {
    let result = await fetch(`http://localhost:4000/product/${id}`, {
      method: "DELETE",  
     headers: {
    Authorization: `Bearer ${localStorage.getItem('token')}`
  }
});
    result = await result.json();
    if (result) {
      alert("Record is deleted");
      getProducts();
    }
  };

  const searchHandle = async (e) => {
    let key = e.target.value;
    if (key) {
      let result = await fetch(`http://localhost:4000/search/${key}`,{
  headers: {
    Authorization: `Bearer ${localStorage.getItem('token')}`
  }
});
      result = await result.json();
      if (result) {
        setProducts(result);
      }
    } else {
      getProducts();
    }
  };

  return (
    <div className="flex flex-col items-center">
      <h1 className="text-2xl font-bold mt-7">Product list</h1>
      <input
        onChange={searchHandle}
        className="border border-gray-600 p-1 rounded-md w-1/4 px-3 mt-4"
        type="text"
        placeholder="Enter product"
      />

      <div className="flex mt-10 font-semibold">
        <div className="border border-gray-600 w-36 px-7">S.No</div> 
        <div className="border-t border-b border-r border-gray-600 w-72 px-7">
          Name
        </div> 
        <div className="border-t border-b border-r border-gray-600 w-40 px-7">
          Price
        </div>
        <div className="border-t border-b border-r border-gray-600 w-40 px-7">
          Category
        </div> 
        <div className="border-t border-b border-r border-gray-600 w-48 px-7">
          Company
        </div> 
        <div className="border-t border-b border-r border-gray-600 w-56 px-12">
          Operations
        </div>
      </div>

      {products.length > 0 ? (
        products.map((item, index) => (
          <div className="flex mt-6" key={item._id}>
            <div className="border border-gray-600 w-36 px-7">{index + 1}</div> 
            <div className="border-t border-b border-r border-gray-600 w-72 px-7">
              
              <div className="truncate">{item.name}</div>
            </div> 
            <div className="border-t border-b border-r border-gray-600 w-40 px-7">
              ${item.price}
            </div> 
            <div className="border-t border-b border-r border-gray-600 w-40 px-7">
              {item.category}
            </div> 
            <div className="border-t border-b border-r border-gray-600 w-48 px-7">
              
              <div className="truncate">{item.company}</div>
            </div> 
            <div className="border-t border-b border-r border-gray-600 w-56 px-4 flex gap-4 justify-center items-center">
              <button
                onClick={() => deleteProduct(item._id)}
                className="text-red-600 hover:underline"
              >
                Delete
              </button>
              <Link
                to={"/update/" + item._id}
                className="text-blue-600 hover:underline"
              >
                Update
              </Link>
            </div>
          </div>
        ))
      ) : (
        <h1 className="mt-10 text-xl font-semibold text-gray-500">
          No Result Found
        </h1>
      )}
    </div>
  );
}

export default ProductList;
