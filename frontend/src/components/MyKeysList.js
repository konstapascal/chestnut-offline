import React, { useState, useEffect, useContext } from "react";
import Axios from "axios";
import { List, Tab, Icon, Button, Modal, Header } from "semantic-ui-react";
import { AuthContext } from "../context/auth-context";
import { useLocation } from "react-router-dom";

import moment from "moment";

const MyKeysList = () => {
   const auth = useContext(AuthContext);
   const authHeader = {
      headers: {
         Authorization: auth.token,
      },
   };

   const [isLoading, setIsLoading] = useState(false);
   const [loadedKeys, setLoadedKeys] = useState([]);
   const [ModalOpen, setModalOpen] = useState(false);

   const handleModalOpen = (modalID) => setModalOpen(modalID);
   const handleModalClose = () => setModalOpen(false);

   const getUrl = "http://localhost:8080/api/keys/users/me";
   let location = useLocation();

   // GET all my keys request
   useEffect(() => {
      const fetchMyKeys = () => {
         setIsLoading(true);
         Axios.get(getUrl, authHeader)
            .then((response) => {
               setLoadedKeys(response.data.keypairs);
               setIsLoading(false);
            })
            .catch((err) => {
               console.log(err.response.data);
            });
      };
      fetchMyKeys();
   }, []);

   // DELETE a key request
   const deleteKey = (KeypairID) => {
      const deleteUrl = "http://localhost:8080/api/keys/" + KeypairID;

      setIsLoading(true);
      Axios.delete(deleteUrl, authHeader)
         .then(() => {
            return Axios.get(getUrl, authHeader);
         })
         .then((response) => {
            setLoadedKeys(response.data.keypairs);
            setIsLoading(false);
         })
         .catch((err) => {
            console.log(err.response.data);
         });
   };

   const listPanes = [
      {
         menuItem: "My keypairs",
         render: () => (
            <Tab.Pane>
               <List divided relaxed>
                  {!isLoading &&
                     loadedKeys.map((item) => (
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
                                 {/*API request date is in UTC, so converting to local time*/}
                                 Date:{" "}
                                 {moment(item.createdAt)
                                    .local()
                                    .format("DD/MM/YYYY, HH:MM")}
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
                                    <Button
                                       color="red"
                                       onClick={handleModalClose}
                                    >
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
         // Working on this - Kon
         menuItem: "User Public Keys",
         render: () => (
            <Tab.Pane>
               <List divided relaxed>
                  {!isLoading &&
                     loadedKeys.map((item) => (
                        <List.Item as="a" key={item.KeypairID}>
                           <List.Icon
                              name="key"
                              size="large"
                              verticalAlign="middle"
                           />
                           <List.Content>
                              <List.Header>Title</List.Header>
                              {location.pathname === "/keys" && (
                                 <Button
                                    floated="right"
                                    size="small"
                                    compact
                                    negative
                                    onClick={() => deleteKey(item.KeypairID)}
                                 >
                                    Delete
                                 </Button>
                              )}
                              <List.Description>Length:</List.Description>
                              <List.Description>Date: </List.Description>
                           </List.Content>
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
