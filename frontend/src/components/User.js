import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import axios from "axios";
import Employee_Welcome from "./Employee_Welcome";

function User() {
  const [employeeData, setEmployeeData] = useState([]); // employee database data
  const [userdetails, setUserDetails] = useState([]); // user database data
  const [userData, setUserData] = useState(null); // State variable to hold user data
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isInEmployee, setIsInEmployee] = useState(false);
  const [nameError, setNameError] = useState("");
  const location = useLocation();
  const queryparams = location.search;
  const username = queryparams.substring(1, queryparams.length - 1);
  const [formData, setFormData] = useState({
    Name: username,
    Education: "",
    PhoneNumber: ""
  });

  useEffect(() => {
    fetchemployeedata();
    fetchuserdetailsdata();
  }, []);

  const fetchemployeedata = async () => {
    try {
      const response = await axios.get("http://localhost:5147/api/employee/");
      const data = response.data;
      setEmployeeData(data);
      const user = data.some((item) => item.name === username);
      if (user) {
        setIsInEmployee(true);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const fetchuserdetailsdata = async () => {
    try {
      let response = await axios.get("http://localhost:5147/api/user/");
      setUserDetails(response.data);
      const user = response.data.find((item) => item.username === username);
      setUserData(user); // Set the user data into state
    } catch (error) {
      console.log(error);
    }
  };

  const handleInputChange = (event) => {
    event.preventDefault();
    const { name, value } = event.target;
    if (name === "Name") {
      if (value !== username) {
        setNameError("Name should not be other the login name !!");
        console.log(nameError);
        setFormData({ ...formData, [name]: value });
        return;
      } else {
        setNameError("");
      }
    }
    setFormData({ ...formData, [name]: value });
  };

  const handlesubmit = async (event) => {
    event.preventDefault();
    if (!userData) {
      if (!isSubmitted) {
        try {
          const response = await axios.post("http://localhost:5147/api/user/", {
            username: username,
            comments: ["newlogin"]
          });
          setIsSubmitted(true);
          console.log(response);
        } catch (error) {
          console.log(error);
        }
      } else {
        console.log("your details are updated!!");
      }
    } else {
      try {
        const response = await axios.put(
          `http://localhost:5147/api/user/${userData.id}`,
          {
            username: username,
            comments: [...userData.comments, "resubmitted"]
          }
        );
        console.log(response);
      } catch (error) {
        console.log(error);
      }
    }
    localStorage.setItem(
      formData.Name,
      JSON.stringify({
        Name: username,
        Education: formData.Education,
        PhoneNumber: formData.PhoneNumber,
        Comments: ""
      })
    );
  };

  console.log("user data in database", userdetails);
  console.log("current user is", userData);
  return (
    <div>
      {userData ? (
        userData.comments.slice(-1) == "employee" && isInEmployee ? (
          <Employee_Welcome />
        ) : (
          <div class="bg-white ">
            <div class="relative isolate px-6 pt-0 lg:px-8">
              <div
                class="absolute inset-x-0 -top-40 -z-10 transform-gpu overflow-hidden blur-3xl sm:-top-80"
                aria-hidden="true"
              >
                <div class="relative left-[calc(50%-11rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-[#ff80b5] to-[#9089fc] opacity-30 sm:left-[calc(50%-30rem)] sm:w-[72.1875rem]"></div>
              </div>
              <div class="flex min-h-full flex-col justify-center px-6 py-4 lg:px-8">
                <div class="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
                  
                  <form class="space-y-6" onSubmit={handlesubmit}>
                    <label
                      for="username"
                      class="block text-sm font-medium leading-6 text-gray-900"
                    >
                      Name
                    </label>
                    <div class="mt-2">
                      <input
                        name="Name"
                        onChange={handleInputChange}
                        value={formData.Name}
                        type="text"
                        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                      />
                    </div>
                    {nameError && (
                      <span style={{ color: "red" }}>{nameError}</span>
                    )}
                    <label class="block text-sm font-medium leading-6 text-gray-900">
                      Education
                    </label>
                    <input
                      name="Education"
                      onChange={handleInputChange}
                      value={formData.Education}
                      type="text"
                      className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    />
                    <label class="block text-sm font-medium leading-6 text-gray-900">
                      PhoneNumber
                    </label>
                    <input
                      name="PhoneNumber"
                      onChange={handleInputChange}
                      value={formData.PhoneNumber}
                      type="number"
                      className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    />
                    <button
                      type="submit"
                      class="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                    >
                      Re-Submit
                    </button>
                    <button
                      type="submit"
                      class="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                      onClick={() => {
                        window.location.href = "/";
                      }}
                    >
                      Logout
                    </button>
                    <h1 class="text-2xl font-bold tracking-tight text-gray-500 sm:text-3xl">
                    {userData.comments.slice(-1)}
                  </h1>
                  </form>
                </div>
              </div>
            </div>
          </div>
        )
      ) : (
        <div class="bg-white ">
          <div class="relative isolate px-6 pt-0 lg:px-8">
            <div
              class="absolute inset-x-0 -top-40 -z-10 transform-gpu overflow-hidden blur-3xl sm:-top-80"
              aria-hidden="true"
            >
              <div class="relative left-[calc(50%-11rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-[#ff80b5] to-[#9089fc] opacity-30 sm:left-[calc(50%-30rem)] sm:w-[72.1875rem]"></div>
            </div>
            <div class="flex min-h-full flex-col justify-center px-6 py-4 lg:px-8">
              <div class="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
                <form class="space-y-6" onSubmit={handlesubmit}>
                  <label
                    for="username"
                    class="block text-sm font-medium leading-6 text-gray-900"
                  >
                    Name
                  </label>
                  <div class="mt-2">
                    <input
                      name="Name"
                      onChange={handleInputChange}
                      value={formData.Name}
                      type="text"
                      className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    />
                  </div>
                  {nameError && (
                    <span style={{ color: "red" }}>{nameError}</span>
                  )}
                  <label class="block text-sm font-medium leading-6 text-gray-900">
                    Education
                  </label>
                  <input
                    name="Education"
                    onChange={handleInputChange}
                    value={formData.Education}
                    type="text"
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                  <label class="block text-sm font-medium leading-6 text-gray-900">
                    PhoneNumber
                  </label>
                  <input
                    name="PhoneNumber"
                    onChange={handleInputChange}
                    value={formData.PhoneNumber}
                    type="number"
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                  <button
                    type="submit"
                    class="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                  >
                    Submit
                  </button>
                  <button
                    type="submit"
                    class="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                    onClick={() => {
                      window.location.href = "/";
                    }}
                  >
                    Logout
                  </button>
                  
                </form>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
export default User;
