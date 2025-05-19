import { Link, useNavigate } from 'react-router-dom';

function Nav() {
  const navigate = useNavigate();
  let user = null;

  try {
    const storedUser = localStorage.getItem('user');
    if (storedUser && storedUser !== "undefined") {
      user = JSON.parse(storedUser);
    }
  } catch (err) {
    console.error("Invalid user in localStorage:", err);
    user = null;
  }

  function Logout() {
    localStorage.clear();
    navigate('/signup');
  }

  return (
    <div className="w-screen flex items-center px-8 py-4 bg-gray-500 ">
      <img
        alt="logo"
        className="w-12 h-12 rounded-full object-cover"
        src="https://wallpaperbat.com/img/820047-mern-stack-wallpaper.png"
      />

      {user ? (
        <div className=" flex items-center gap-10 ml-10">
          <Link className="text-white" to="/">Products</Link>
          <Link className="text-white" to="/add">Add Product</Link>
          <Link className="text-white" to="/update">Update Product</Link>
          <Link className="text-white" to="/profile">Profile</Link>
          <Link className="text-white" onClick={Logout} to="/signup">
            Logout ({user.name})
          </Link>
        </div>
      ) : (
        <div className="flex items-center gap-7 ml-auto">
          <Link className="text-white" to="/signup">SignUp</Link>
          <Link className="text-white" to="/login">Login</Link>
        </div>
      )}
    </div>
  );
}

export default Nav;
