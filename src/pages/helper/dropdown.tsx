import React, { useState } from "react";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import Select, { SelectChangeEvent } from "@mui/material/Select";

// Define the User interface to type each user object
interface User {
  _id: string;
  firstName: string;
  lastName: string;
}

// Define the props interface to type the props expected by the component
interface SingleSelectUserProps {
  users: User[];
}

const SingleSelectUser: React.FC<
  SingleSelectUserProps & {
    value: string;
    onChange: (event: SelectChangeEvent<string>) => void;
  }
> = ({ users, value, onChange }) => {
  return (
    <FormControl fullWidth>
      <InputLabel id="user-select-label">User</InputLabel>
      <Select
        labelId="user-select-label"
        id="user-select"
        value={value}
        label="User"
        onChange={onChange}
      >
        {users.map((user) => (
          <MenuItem
            key={user._id}
            value={user._id}
          >{`${user.lastName} ${user.firstName} `}</MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};

export default SingleSelectUser;
