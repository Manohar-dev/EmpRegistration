import { useEffect, useState } from "react";
import axios from "axios";

const Admin = () => {
  const [employeeData, setEmployeeData] = useState([]);
  const [userdetails, setUserDetails] = useState([]);
  const [commentdetails, setCommentDetails] = useState([]);

  var userdata = [];
  var keys = Object.keys(localStorage);
  var i = 0;

  keys.forEach((key) => {
    userdata[i] = localStorage.getItem(key);
    i++;
  });

  useEffect(() => {
    fetchemployeedata();
    fetchuserdetailsdata();
    let comments = keys.map(() => {
      return "";
    });
    setCommentDetails(comments);
  }, []);

  const fetchemployeedata = async () => {
    try {
      let response = await axios.get("http://localhost:5147/api/employee/");
      setEmployeeData(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  const fetchuserdetailsdata = async () => {
    try {
      let response = await axios.get("http://localhost:5147/api/user/");
      setUserDetails(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  console.log(employeeData);
  console.log(userdetails);
  const handleChangeComment = (event, index) => {
    const { value } = event.target;

    const updatedComments = [...commentdetails];
    updatedComments[index] = value;
    setCommentDetails(updatedComments);
    console.log(commentdetails);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const row = event.target.closest("tr");
    const tds = row.querySelectorAll("td");
    const data = {
      Name: tds[0].textContent,
      Education: tds[1].textContent,
      PhoneNumber: tds[2].textContent
    };

    if (!employeeData.some((item) => item.username === data.Name)) {
      try {
        const response = await axios.post(
          "http://localhost:5147/api/employee/",
          data
        );
        console.log("data sent to employee data", response.data);
      } catch (error) {
        console.log(error);
      }
    }
    if (userdetails.some((item) => item.username === data.Name)) {
      const user = userdetails.filter((item) => item.username === data.Name);
      console.log(user);
      try {
        const response = await axios.put(
          `http://localhost:5147/api/user/${user[0].id}`,
          { username: data.Name, comments: [...user[0].comments, "employee"] }
        );
        console.log("user comments set to null", response.data);
      } catch (error) {
        console.log(error);
      }
    } else {
      console.log("userdetails doesn't exsist in user table ");
    }
    localStorage.removeItem(data.Name);
    row.remove();
  };

  const handleReject = async (event, index) => {
    const row = event.target.closest("tr");
    const tds = row.querySelectorAll("td");

    const data = {
      username: tds[0].textContent,
      comments: commentdetails[index]
    };
    console.log("handle reject data", data);
    const user = userdetails.filter((item) => item.username === data.username);
    console.log(user[0]);
    try {
      const response = await axios.put(
        `http://localhost:5147/api/user/${user[0].id}`,
        {
          username: data.username,
          comments: [...user[0].comments, data.comments]
        }
      );
      console.log(response.data);
    } catch (error) {
      console.log(error);
    }
    localStorage.removeItem(data.username);
    row.remove();
  };
  console.log(userdetails);
  console.log(employeeData);
  return (
    <>
      <div class="bg-white ">
        <div class="relative isolate px-6 pt-14 lg:px-8">
          <div
            class="absolute inset-x-0 -top-40 -z-10 transform-gpu overflow-hidden blur-3xl sm:-top-80"
            aria-hidden="true"
          >
            <div class="relative left-[calc(50%-11rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-[#ff80b5] to-[#9089fc] opacity-30 sm:left-[calc(50%-30rem)] sm:w-[72.1875rem]"></div>
          </div>
          {/* <table>
            <thead>
              <tr>
                <th>Name</th>
                <th>Education</th>
                <th>PhoneNumber</th>
                <th>SubmitButton</th>
                <th>Comments</th>
              </tr>
            </thead>
            <tbody>
              {userdata.map((data, index) => (
                <tr key={JSON.parse(data).Name}>
                  <td class="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 text-left text-blueGray-700 ">
                    {JSON.parse(data).Name}
                  </td>
                  <td class="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 text-left text-blueGray-700 ">
                    {JSON.parse(data).Education}
                  </td>
                  <td class="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 text-left text-blueGray-700 ">
                    {JSON.parse(data).PhoneNumber}
                  </td>
                  <td class="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 text-left text-blueGray-700 ">
                    <button onClick={handleSubmit}>submit</button>
                  </td>
                  <td class="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 text-left text-blueGray-700 ">
                    <label>Comments</label>
                    <input
                      onChange={(event) => handleChangeComment(event, index)}
                      value={commentdetails[index]}
                      type="text"
                    />
                    <button onClick={(event) => handleReject(event, index)}>
                      Reject
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table> */}

          <section class="py-1 bg-blueGray-50">
            <div class="w-full xl:w-8/12 mb-12 xl:mb-0 px-4 mx-auto mt-24">
              <div class="relative flex flex-col min-w-0 break-words bg-white w-full mb-6 shadow-lg rounded ">
                <div class="rounded-t mb-0 px-4 py-3 border-0">
                  <div class="flex flex-wrap items-center">
                    <div class="relative w-full px-4 max-w-full flex-grow flex-1">
                      <h3 class="font-semibold text-base text-blueGray-700">
                        Employee
                      </h3>
                    </div>
                    <div class="relative w-full px-4 max-w-full flex-grow flex-1 text-right">
                      <button
                        class="bg-indigo-600 text-white active:bg-indigo-600 text-xs font-bold uppercase px-3 py-1 rounded outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                        type="button"
                        onClick={()=>{
                          window.location.href= "/";
                        }}
                      >
                        Logout
                      </button>
                    </div>
                  </div>
                </div>

                <div class="block w-full overflow-x-auto">
                  <table class="items-center bg-transparent w-full border-collapse ">
                    <thead>
                      <tr>
                        <th class="px-6 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-base uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                          Name
                        </th>
                        <th class="px-6 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-base uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                          Education
                        </th>
                        <th class="px-6 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-base uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                          PhoneNumber
                        </th>
                        <th class="px-6 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-base uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                          Submit Button
                        </th>
                        <th class="px-6 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-base uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                          Comments
                        </th>
                        <th class="px-6 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-base uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                          Reject
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {userdata.map((data, index) => (
                        <tr key={JSON.parse(data).Name}>
                          <td class="border-t-0 px-6 align-middle border-l-0 border-r-0 text-base whitespace-nowrap p-4 text-left text-blueGray-700 ">
                            {JSON.parse(data).Name}
                          </td>
                          <td class="border-t-0 px-6 align-middle border-l-0 border-r-0 text-base whitespace-nowrap p-4 text-left text-blueGray-700 ">
                            {JSON.parse(data).Education}
                          </td>
                          <td class="border-t-0 px-6 align-middle border-l-0 border-r-0 text-base whitespace-nowrap p-4 text-left text-blueGray-700 ">
                            {JSON.parse(data).PhoneNumber}
                          </td>
                          <td class="border-t-0 px-6 align-middle border-l-0 border-r-0 text-base whitespace-nowrap p-4 text-left text-blueGray-700 ">
                            <button
                              class="flex w-50px justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                              onClick={handleSubmit}
                            >
                              submit
                            </button>
                          </td>
                          <td class="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 text-left text-blueGray-700 ">
                            <input
                              class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                              onChange={(event) =>
                                handleChangeComment(event, index)
                              }
                              value={commentdetails[index]}
                              type="text"
                            />
                          </td>
                          <td class="border-t-0 px-6 align-middle border-l-0 border-r-0 text-base whitespace-nowrap p-4 text-left text-blueGray-700 ">
                            <button
                              class="flex w-50px justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                              onClick={(event) => handleReject(event, index)}
                            >
                              Reject
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </section>
        </div>
      </div>
    </>
  );
};
export default Admin;
