import React, { useState, useEffect, useContext } from "react";
import Axios from "axios";
import {
   List,
   Tab,
   Icon,
   Button,
   Modal,
   Header,
   Message,
} from "semantic-ui-react";
import { AuthContext } from "../context/auth-context";
import { useLocation } from "react-router-dom";
import { Link } from "react-router-dom";

import moment from "moment";

const MyKeysList = () => {
   const auth = useContext(AuthContext);
   const authHeader = {
      headers: {
         Authorization: auth.token,
      },
   };

   const [loadedKeys, setLoadedKeys] = useState([]);
   const [loadedPublicKeys, setLoadedPublicKeys] = useState([]);
   const [ModalOpen, setModalOpen] = useState(false);

   const handleModalOpen = (modalID) => setModalOpen(modalID);
   const handleModalClose = () => setModalOpen(false);

   const getUrl = "http://localhost:8080/api/keys/users/me";
   let location = useLocation();

   // GET all my keys request
   useEffect(() => {
      const fetchMyKeys = () => {
         Axios.get(getUrl, authHeader)
            .then((response) => {
               setLoadedKeys(response.data.keypairs);
            })
            .catch((err) => {
               setLoadedKeys([]);
               console.log(err.response.data);
            });
      };
      fetchMyKeys();
   }, []);

   // Get saved public keys from localstorage
   useEffect(() => {
      const storageKeys = JSON.parse(localStorage.getItem("addedPublicKeys"));

      if (storageKeys == null) {
         // Make new local storage field if there isn't one
         return localStorage.setItem("addedPublicKeys", JSON.stringify([]));
      } else {
         // If there is local storage data, add it to state
         setLoadedPublicKeys(storageKeys);
      }
   }, []);

   // DELETE a key request
   const deleteKey = (KeypairID) => {
      const deleteUrl = "http://localhost:8080/api/keys/" + KeypairID;

      Axios.delete(deleteUrl, authHeader)
         .then(() => {
            return Axios.get(getUrl, authHeader);
         })
         .then((response) => {
            setLoadedKeys(response.data.keypairs);
         })
         .catch((err) => {
            console.log(err.response.data);
         });
   };

   const removePublicKey = (KeypairID) => {
      const newLoadedPublicKeys = loadedPublicKeys.filter(
         (key) => key.ID !== KeypairID
      );

      setLoadedPublicKeys(newLoadedPublicKeys);
      localStorage.setItem(
         "addedPublicKeys",
         JSON.stringify(newLoadedPublicKeys)
      );
   };

   const listPanes = [
      {
         menuItem: "My Keypairs",
         render: () => (
            <Tab.Pane>
               <List divided relaxed>
                  {loadedKeys.length == 0 && (
                     <Message>
                        <Icon name="key" size="large" />
                        No keypairs.
                     </Message>
                  )}
                  {loadedKeys.map((item) => (
                     <List.Item as="a" key={item.KeypairID}>
                        <List.Icon
                           name="key"
                           size="large"
                           verticalAlign="middle"
                        />
                        <List.Content>
                           <List.Header>{item.Name}</List.Header>
                           <List.Description>
                              Length: {item.Length}
                           </List.Description>
                           <List.Description>
                              Created:{" "}
                              {moment(item.createdAt)
                                 .local()
                                 .format("DD MMM YYYY, HH:mm")}
                           </List.Description>
                        </List.Content>
                        {location.pathname === "/keys" && (
                           <Modal
                              trigger={
                                 <List.Icon
                                    name="delete"
                                    floated="right"
                                    size="large"
                                    color="red"
                                    verticalAlign="middle"
                                    negative
                                    onClick={() =>
                                       handleModalOpen(item.KeypairID)
                                    }
                                 />
                              }
                              size="tiny"
                              open={ModalOpen == item.KeypairID}
                              onClose={handleModalClose}
                              closeIcon
                           >
                              <Header
                                 icon="delete"
                                 color="red"
                                 content="Delete key?"
                              />
                              <Modal.Content>
                                 <p>
                                    Are you sure you want to delete{" "}
                                    <b>{item.Name}</b>?
                                 </p>
                              </Modal.Content>
                              <Modal.Actions>
                                 <Button color="red" onClick={handleModalClose}>
                                    <Icon name="remove" /> No
                                 </Button>
                                 <Button
                                    color="green"
                                    onClick={() => deleteKey(item.KeypairID)}
                                 >
                                    <Icon name="checkmark" />
                                    Yes
                                 </Button>
                              </Modal.Actions>
                           </Modal>
                        )}
                     </List.Item>
                  ))}
               </List>
            </Tab.Pane>
         ),
      },
      {
         menuItem: "Public Keys",
         render: () => (
            <Tab.Pane>
               <List divided relaxed>
                  {loadedPublicKeys.length == 0 && (
                     <Message>
                        <Icon name="key" size="large" verticalAlign="middle" />
                        Click <Link to="/users">here</Link> to add public keys.
                     </Message>
                  )}
                  {loadedPublicKeys.map((key) => (
                     <List.Item as="a" key={key.ID}>
                        <List.Icon
                           name="key"
                           size="large"
                           verticalAlign="middle"
                        />
                        <List.Content>
                           <List.Header>{key.keyName}</List.Header>
                           <List.Description>
                              Owner: <b>{key.keyOwner}</b>
                           </List.Description>
                           <List.Description>
                              Length: {key.keyLength}
                           </List.Description>
                        </List.Content>
                        {location.pathname === "/keys" && (
                           <List.Icon
                              name="delete"
                              floated="right"
                              size="large"
                              color="red"
                              verticalAlign="middle"
                              negative
                              onClick={() => removePublicKey(key.ID)}
                           />
                        )}
                     </List.Item>
                  ))}
               </List>
            </Tab.Pane>
         ),
      },
   ];

   return <Tab panes={listPanes} />;
};

export default MyKeysList;
