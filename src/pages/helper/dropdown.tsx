import React from "react";
import Autocomplete from "@mui/material/Autocomplete";
import TextField from "@mui/material/TextField";

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
    value: User | null;
    onChange: (user: User | null) => void;
  }
> = ({ users, value, onChange }) => {
  return (
    <Autocomplete
      value={value}
      onChange={(event, user) => onChange(user)}
      options={users}
      getOptionLabel={(user) => `${user.lastName} ${user.firstName}`}
      renderInput={(params) => <TextField {...params} label="User" />}
    />
  );
};

export default SingleSelectUser;
