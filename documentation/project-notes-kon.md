## Chestnut API Overview

### HTTP requests

#### GET requests

| Type  | URI                    | Availability | Description                                                               |
| ----- | ---------------------- | ------------ | ------------------------------------------------------------------------- |
| `GET` | **/api/users**         | Admin        | Get **all** registered users info.                                        |
| `GET` | **/api/users/:id**     | None         | **UNAVAILABLE** Get 1 user by his **id**.                                 |
| `GET` | **/api/keys**          | User         | Get **all** public keypairs and usernames of **all** registered users.    |
| `GET` | **/api/keys/users/me** | User         | Get **all** keys, public and private of currently **authenticated** user. |

#### POST requests

| Type   | URI                        | Availability | Description                                                                                                      |
| ------ | -------------------------- | ------------ | ---------------------------------------------------------------------------------------------------------------- |
| `POST` | **/api/keys/new/users/me** | User         | Generate a new keypair for currently **authenticated** user.                                                     |
| `POST` | **/api/login**             | User         | Log in endpoint. Check if username exists, check if password is correct. Provide **token** on successful log in. |
| `POST` | **/api/signup**            | User         | Signup endpoint. Makes sure username and email are unique. Hashes password and adds info to db.                  |
| `POST` | **/api/encrypt**           | Public       | Endpoint that will **encrypt** provided string.                                                                  |
| `POST` | **/api/decrypt**           | Public       | Endpoint that will **decrypt** provided cipher.                                                                  |

#### DELETE requests

| Type     | URI                | Availability | Description                                                                    |
| -------- | ------------------ | ------------ | ------------------------------------------------------------------------------ |
| `DELETE` | **/api/users/:id** | Admin        | Delete an user by his **id**, request can only be made by an **admin**.        |
| `DELETE` | **/api/keys/:id**  | User         | Delete key by **id**. User will be **denied** to delete a key he does not own. |
| `DELETE` | **/api/keys/me**   | User         | Delete currently **authenticated** user.                                       |

#### PATCH requests

| Type    | URI                | Availability | Description                               |
| ------- | ------------------ | ------------ | ----------------------------------------- |
| `PATCH` | **/api/users/:id** | Admin        | Update the fields of an user with **id**. |

\* While `GET` **/api/users/:id** is implemented, it is unavailable as we could not find an use for it. We chose to just not make it active rather than delete it altogether.

\* User availability includes **both** users and admins.

\* **Public** means that the endpoint can be used without a token. Everyone can use it.
