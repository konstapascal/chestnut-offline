import React, { useState, useEffect, useContext } from "react";
import Axios from "axios";
import { List, Item, Segment, Input } from "semantic-ui-react";
import { AuthContext } from "../context/auth-context";

const UsersList = () => {
  const auth = useContext(AuthContext);
  const [isLoading, setIsLoading] = useState(false);
  const [loadedUser, setLoadedUsers] = useState([]);
  const [search, setSearch] = useState("");
  const [filteredUsers, setFilteredUsers] = useState([]);

  useEffect(() => {
    const fetchUsers = async () => {
      setIsLoading(true);
      const response = await Axios.get("http://localhost:8080/api/users/", {
        headers: {
          Authorization: auth.token,
        },
      })
        .then((response) => {
          setLoadedUsers(response.data.users);
          setIsLoading(false);
        })
        .catch((err) => {
          console.log(err.response.data);
        });
    };
    fetchUsers();
  }, [Axios.get]);

  useEffect(() => {
    !isLoading &&
      loadedUser &&
      setFilteredUsers(
        loadedUser.filter((user) =>
          user.Username.toLowerCase().includes(search.toLowerCase())
        )
      );
  }, [search, loadedUser]);

  return (
    <Segment style={{ width: 600 }}>
      <List as="ul" divided relaxed>
        <List.Item id="UsersHeader">
          <h1>List of users</h1>
          <div>
            <Input icon="search" onChange={(e) => setSearch(e.target.value)} />
          </div>
        </List.Item>
        {!isLoading &&
          loadedUser &&
          filteredUsers.map((item) => (
            <List.Item id={item.ID}>
              {/* {console.log(item)} */}
              <Item.Content>
                <List.Header as="a">{item.Username}</List.Header>
                <List.Description as="a">{item.Email}</List.Description>
              </Item.Content>
            </List.Item>
          ))}
      </List>
    </Segment>
  );
};

export default UsersList;
