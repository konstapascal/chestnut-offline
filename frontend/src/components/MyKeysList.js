import React, { useState, useEffect, useContext } from "react";
import Axios from "axios";
import { List, Button, Tab } from "semantic-ui-react";
import { AuthContext } from "../context/auth-context";
import { KeyContext } from "../context/key-context";
import { useLocation } from "react-router-dom";

const MyKeysList = () => {
   const KeyCntxt = useContext(KeyContext);
   const auth = useContext(AuthContext);
   const authHeader = {
      headers: {
         Authorization: auth.token,
      },
   };

   const [isLoading, setIsLoading] = useState(false);
   const [loadedKeys, setLoadedKeys] = useState([]);
   const [keyPairId, setKeyPairId] = useState("");
   const [keyName, setKeyName] = useState();
   const [keyType, setKeyType] = useState("");
   const [keyLenth, setKeyLength] = useState("");
   const [keyPrivate, setKeyPrivate] = useState("");
   const [keyPublic, setKeyPublic] = useState("");
   const [keyCreator, setKeyCreator] = useState("");

   const getUrl = "http://localhost:8080/api/keys/users/me";
   const userId = auth.id;
   let location = useLocation();

   // GET my all keys request
   useEffect(() => {
      const fetchMyKeys = async () => {
         setIsLoading(true);
         await Axios.get(getUrl, authHeader)
            .then((response) => {
               setLoadedKeys(response.data.keypairs);
               setIsLoading(false);
            })
            .catch((err) => {
               console.log(err.response.data);
            });
      };
      fetchMyKeys();
   }, [Axios.get]);

   const viewKey = (keyId) => {
      setKeyPairId();
      setKeyName();
      setKeyType();
      setKeyLength();
      setKeyPublic();
      setKeyPrivate();
      setKeyCreator();
      loadedKeys.forEach((key) => {
         if (key.KeypairID === keyId) {
            setKeyPairId(key.KeypairID);
            setKeyName(key.Name);
            setKeyType(key.Type);
            setKeyLength(key.Length);
            setKeyPublic(key.PublicKey);
            setKeyPrivate(key.PrivateKey);
            setKeyCreator(key.UserID);
         }
      });
   };

   // DELETE a key request
   const deleteKey = (KeypairID) => {
      const deleteUrl = "http://localhost:8080/api/keys/" + KeypairID;

      setIsLoading(true);
      Axios.delete(deleteUrl, authHeader)
         .then(() => {
            return Axios.get(getUrl, authHeader);
         })
         .then((response) => {
            const updatedKeys = response.data.keypairs;
            setLoadedKeys(updatedKeys);
            setIsLoading(false);
         })
         .catch((err) => {
            console.log(err.response.data);
         });
   };

   {
      console.log(keyPrivate);
   }

   const listPanes = [
      {
         menuItem: "My keypairs",
         render: () => (
            <Tab.Pane>
               <List as="ul" divided relaxed>
                  {!isLoading &&
                     loadedKeys.map((item) => (
                        <List.Item
                           as="a"
                           key={item.KeypairID}
                           onClick={() => viewKey(item.KeypairID)}
                        >
                           <List.Icon
                              name="key"
                              size="large"
                              verticalAlign="middle"
                           />
                           <List.Content>
                              <List.Header>{item.Name}</List.Header>
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

                              <List.Description>
                                 ID: {item.KeypairID}
                              </List.Description>
                              <List.Description>
                                 Type: {item.Type}
                              </List.Description>
                              <List.Description>
                                 Length: {item.Length}
                              </List.Description>
                           </List.Content>
                        </List.Item>
                     ))}
               </List>
            </Tab.Pane>
         ),
      },
      {
         menuItem: "User Public Keys",
         render: () => <Tab.Pane>Saved User Keys</Tab.Pane>,
      },
   ];

   return (
      <React.Fragment>
         <KeyContext.Provider
            value={{
               KeypairID: keyPairId,
               Name: keyName,
               Type: keyType,
               Length: keyLenth,
               PublicKey: keyPublic,
               PrivateKey: keyPrivate,
               UserID: keyCreator,
            }}
         ></KeyContext.Provider>

         <Tab panes={listPanes} />
      </React.Fragment>
   );
};

export default MyKeysList;
