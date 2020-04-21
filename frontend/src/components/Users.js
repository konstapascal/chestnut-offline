import React, { useState, useEffect, useContext } from "react";
import ReactDOM from "react-dom";
import Axios from "axios";
import { List, Item, Segment, Input } from "semantic-ui-react";
import { AuthContext } from "../context/auth-context";

const UsersList = () => {
  const auth = useContext(AuthContext);
  const [isLoading, setIsLoading] = useState(false);
  const [state, setState] = useState({
    search: "",
  });
  const [loadedUser, setLoadedUsers] = useState({ users: [] });
  let search = "";

  useEffect(() => {
    const fetchUsers = async () => {
      setIsLoading(true);
      const response = await Axios.get("http://localhost:8080/api/users/", {
        headers: {
          Authoriazation: auth.token,
        },
      });

      setLoadedUsers(response.data);
      setIsLoading(false);
    };

    fetchUsers();
  }, []);

  const handleChange = (event) => {
    setState({ search: event.target.value });
    search = event.target.value;
    console.log(event.target.value);
  };

  const filteredUsers = loadedUser.users.filter((user) => {
    return user.username.toLowerCase().indexOf(search.toLowerCase()) !== -1;
  });

  return (
    <React.Fragment>
      {console.log(auth.token)}
      <Segment style={{ width: 600 }}>
        <List as="ul" divided relaxed>
          <List.Item>
            <h1>List of users</h1>
            <div>
              <Input icon="search" onChange={handleChange} />
            </div>
          </List.Item>
          {filteredUsers.map((item) => (
            <List.Item>
              <Item.Content>
                <List.Header as="a">{item.username}</List.Header>
                <List.Description as="a">{item.email}</List.Description>
              </Item.Content>
            </List.Item>
          ))}
        </List>
      </Segment>
    </React.Fragment>
  );
};

export default UsersList;
