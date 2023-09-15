import axios from "axios";
import React, { useState } from "react";
import { BACKEND_URL } from "../../config";

const UserSearch = ({ handleAddUserAsCompanyOwner }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [usersResult, setUsersResult] = useState([]);

  const handleSearch = (e) => {
    // e.preventDefault();

    setSearchTerm(e.target.value);

    // TODO: [MERNSTACK-170] Make API call to backend to find users by query on username, name or email, use useEffect to call this function when query changes
    axios
      .get(BACKEND_URL + "/users/search/" + e.target.value)
      .then((response) => {
        setUsersResult(response.data);
        console.log(response.data);
      });
    // TODO: [MERNSTACK-171] Display results in a list displaying the username, name and email

    console.log(e.target.value);
  };

  const handleAddOwner = (e) => {
    handleAddUserAsCompanyOwner(e.target.value);
  };

  return (
    <div>
      <div className="my-4">
        <label className="text-xl mr-4 text-gray-500">
          Search user to add as company owner:
        </label>
        <div className="my-4">
          <p className="text-gray-400">
            <strong>Note:</strong> Register more accounts if you want results,
            search query will match on username, first name, last name and
            email.
          </p>
        </div>

        <input
          type="text"
          value={searchTerm}
          // onChange is a function that takes an event as an argument
          // and sets the title state to the value of the input
          // e.target.value is the value of the input
          onChange={handleSearch}
          className="border-2 border-gray-500 px-4 py-2 w-full"
        />
      </div>
      <ul>
        {usersResult.map((user) => (
          <div className="flex border-sky-400 rounded-xl mx-auto justify-between">
            <div>
              <li key={user._id}>
                {user.username} {user.name} {user.email}{" "}
              </li>
            </div>
            <div>
              <button
                className="bg-sky-300 hover:bg-sky-600 px-4 py-1 rounded-lg mx-auto mb-4"
                value={user._id}
                onClick={handleAddOwner}
              >
                Add
              </button>
            </div>
          </div>
        ))}
      </ul>
    </div>
  );
};

export default UserSearch;