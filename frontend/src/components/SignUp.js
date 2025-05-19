import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function SignUp() {
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const navigate = useNavigate();
useEffect(() => {
  const auth = localStorage.getItem('user');
  if (auth) {
    navigate('/');
  }
}, [navigate]); 



  const collectData = async () => {
    let result = await fetch("http://localhost:4000/register", {
      method: "post",
      body: JSON.stringify({ name, email, password }),
      headers: {
        "Content-Type": "application/json",
      },
    });

    result = await result.json();
    console.log(result);

    
    if (result && result.user && result.token) {
      localStorage.setItem("user", JSON.stringify(result.user));
      localStorage.setItem("token", result.token);
      navigate("/");
    } else {
      alert("Something went wrong with registration.");
    }
  };

  return (
    <div className="flex justify-center mt-16">
      <div className="flex flex-col gap-5">
        <h1 className="text-xl font-bold mb-2">Register</h1>

        <input
          className="border-2 border-black rounded-md p-1"
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Enter Name"
        />
        <input
          className="border-2 border-black rounded-md p-1 w-80"
          type="text"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Enter Email"
        />
        <input
          className="border-2 border-black rounded-md p-1"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Enter Password"
        />
        <button
          onClick={collectData}
          className="border-2 border-black rounded-md py-1"
        >
          Sign Up
        </button>
      </div>
    </div>
  );
}

export default SignUp;
