import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function App() {
  const [formData, setFormData] = useState({
    username: "",
    password: ""
  });
  const navigate = useNavigate();

  const handleChange = (event) => {
    event.preventDefault();
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
    // console.log(name);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (formData.password === "user") {
      const queryParams = new URLSearchParams(formData.username).toString();
      window.location.href = `/user?${queryParams}`;
    }
    if (formData.username === "admin" && formData.password === "password") {
      navigate("/admin");
    }
  };

  return (
    <div class="flex min-h-full flex-col justify-center px-6 py-12 lg:px-8">
      <div class="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
        <form class="space-y-6" onSubmit={handleSubmit}>
        <div>
        <label for="username" class="block text-sm font-medium leading-6 text-gray-900">UserName</label>
        <div class="mt-2">
          <input id="username" name="username" type="text"   
            value={formData.username}
            onChange={handleChange}
            className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"/>
        </div>
      </div>
      <div>
        <div class="flex items-center justify-between">
          <label for="password" class="block text-sm font-medium leading-6 text-gray-900">Password</label>
          </div>
        <div class="mt-2">
          <input id="password" name="password" type="password" 
           onChange={handleChange}
           value={formData.password}
           class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"/>
        </div>
      </div>
      
      <div>
        <button type="submit" class="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">Login</button>
      </div>
          {/* <label>username</label>
          <input
            name="username"
            type="text"
            value={formData.username}
            onChange={handleChange}
          /> */}
          {/* <label>password</label>
          <input
            name="password"
            type="password"
            onChange={handleChange}
            value={formData.password}
          /> */}
          {/* <button type="submit">Login</button> */}
        </form>
      </div>
    </div>
  );
}
export default App;
