import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

function UpdateProduct() {
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("");
  const [company, setCompany] = useState("");
  const params = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await fetch(`http://localhost:4000/product/${params.id}`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        });
        const data = await response.json();
        setName(data.name);
        setPrice(data.price);
        setCategory(data.category);
        setCompany(data.company);
      } catch (error) {
        console.error('Error fetching product:', error);
      }
    };

    fetchProduct();
  }, [params.id]);

  
  const updateProduct = async () => {
    try {
      const response = await fetch(`http://localhost:4000/product/${params.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
           Authorization: `Bearer ${localStorage.getItem('token')}`
        },
        body: JSON.stringify({ name, price, category, company }),
      });

      const data = await response.json();
      console.log("Update response:", data);
      navigate("/");
    } catch (error) {
      console.error('Error updating product:', error);
    }
  };

  return (
    <div className="flex justify-center mt-7">
      <div className="flex flex-col gap-5">
        <h1>Update Product</h1>
        <input
          onChange={(e) => setName(e.target.value)}
          value={name}
          className="border-2 border-black rounded-md p-1 w-80"
          type="text"
          placeholder="Enter product name"
        />
        <input
          onChange={(e) => setPrice(e.target.value)}
          value={price}
          className="border-2 border-black rounded-md p-1 w-80"
          type="text"
          placeholder="Enter product price"
        />
        <input
          onChange={(e) => setCategory(e.target.value)}
          value={category}
          className="border-2 border-black rounded-md p-1 w-80"
          type="text"
          placeholder="Enter product category"
        />
        <input
          onChange={(e) => setCompany(e.target.value)}
          value={company}
          className="border-2 border-black rounded-md p-1 w-80"
          type="text"
          placeholder="Enter product company"
        />
        <button
          onClick={updateProduct}
          className="border-2 border-black rounded-md p-1 w-80"
        >
          Update Product
        </button>
      </div>
    </div>
  );
}

export default UpdateProduct;
