import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
function Profile() {
  const navigate = useNavigate()
  const [userData, setUserData] = useState({
    name: '',
    email: '',
    password: ''
  });

  const [user, setUser] = useState(null);
  const [token, setToken] = useState('');

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    const storedToken = localStorage.getItem('token');

    if (storedUser && storedUser !== 'undefined') {
      const parsedUser = JSON.parse(storedUser);
      setUser(parsedUser);
      setUserData({
        name: parsedUser.name || '',
        email: parsedUser.email || '',
        password: parsedUser.password || ''
      });
    }

    if (storedToken && storedToken !== 'undefined') {
      setToken(storedToken);
    }

  }, []);


  const handleUpdate = async () => {
    if (!user || !token) {
      alert('User or token not available.');
      
    }

    const userId = user._id;

    const response = await fetch(`http://localhost:4000/user/update/${userId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify(userData)
    });

    if (response.ok) {
      const updatedUser = await response.json();
      localStorage.setItem('user', JSON.stringify(updatedUser));
      alert('Profile Updated');
    } else {
      alert('Failed to update');
    }
    navigate('/')
  };

  return (
    <div className="flex flex-col items-center mt-20 gap-5">
      <h1 className="text-2xl font-bold">Profile Section</h1>
      <input
        onChange={(e) => setUserData({ ...userData, name: e.target.value })}
        value={userData.name}
        className="border-2 border-black rounded-md px-2 py-1 w-1/5"
        type="text"
        placeholder="Enter Name"
      />
      <input
        onChange={(e) => setUserData({ ...userData, email: e.target.value })}
        value={userData.email}
        className="border-2 border-black rounded-md px-2 py-1 w-1/5"
        type="text"
        placeholder="Enter Email"
      />
      <input
        onChange={(e) => setUserData({ ...userData, password: e.target.value })}
        value={userData.password}
        className="border-2 border-black rounded-md px-2 py-1 w-1/5"
        type="text"
        placeholder="Enter Password"
      />
      <button onClick={handleUpdate} className="border-2 border-black rounded-md w-1/5">Update</button>
    </div>
  );
}

export default Profile;
