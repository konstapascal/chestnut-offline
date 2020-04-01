## Chestnut API Overview
### HTTP requests

#### GET requests
| Type | URI | Description |
| --- | --- | --- |
| `GET` | **/api/users** | Get all registered users |
| `GET` | **/api/users/:user_id** | Get 1 user by its user id |
| `GET` | **/api/keys** | Get all public keys of all registered users |
| `GET` | **/api/keys/:user_id** | Get all public keys of 1 user by his id |

#### POST requests
| Type | URI | Description |
| --- | --- | --- |
| `POST` | **/api/keys/new** | Generate new key to the currently authenticated user |
| `POST` | **/api/login** | Login route that will check username and password |
| `POST` | **/api/signup** | Signup route that will validate details and add to the DB |
| `POST` | **/api/encrypt** | Server side encryption of provided string with the chosen type of method, returns encrypted data |
| `POST` | **/api/decrypt** | Same as encryption request but that takes in encrypted string instead, returns decrypted data |

#### DELETE requests
| Type | URI | Description |
| --- | --- | --- |
| `DELETE` | **/api/users/:user_id** | Delete 1 user by id, usually the currently authenticated user |
| `DELETE` | **/api/keys/:key_id** | Delete 1 key by id |

#### PATCH requests
| Type | URI | Description |
| --- | --- | --- |
| `PATCH` | **/api/users/:user_id** | Changes details of registered used, admin only |

\* PATCH request is currently not our highest priority, it is not required to make the application functional but is a consideration