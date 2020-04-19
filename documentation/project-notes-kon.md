## Chestnut API Overview

**NEEDS UPDATING**

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
| `DELETE` | **/api/users/me**  | User         | Delete currently **authenticated** user.                                       |
| `DELETE` | **/api/keys/:id**  | User         | Delete key by **id**. User will be **denied** to delete a key he does not own. |

#### PATCH requests

| Type    | URI                | Availability | Description                               |
| ------- | ------------------ | ------------ | ----------------------------------------- |
| `PATCH` | **/api/users/:id** | Admin        | Update the fields of an user with **id**. |

\* While `GET` **/api/users/:id** is implemented, it is unavailable as we could not find an use for it. We chose to just not make it active rather than delete it altogether.

\* User availability includes **both** users and admins.

\* **Public** means that the endpoint can be used without a token. Everyone can use it.

## Chestnut API notes

#### Roy Fielding

Father of REST, wished a new standard, past and history, before REST communication, SOAP.

#### API ( Application Program Interface )

#### REST API ( Representational State Transfer)

Architecture and design style, set guidelines and constraints.

REST key characteristics:

- Client-server based architecture
- Stateless, cacheable
- Multiple layered system
- Uniform Resource Identifier (URI)
- Follows HTTP protocol
- Communication happening in JSON, XML data format

#### Public API's (eBay, Amazon)

First commercial use of APIs.
2005 - today seeing huge increase in public APIs.

#### HATEOAS (Hypermedia As The Engine of Application State)

"Component" on top of REST API.

**HATEOAS** is a concept of application architecture. It defines the way in which application clients interact with the server, by navigating hypermedia links they find inside resource models returned by the server. Make server and client entirely independent and decoupled.

**Hypertext** used to navigate API with little to no prior knowledge or documentation of the API.

To implement HATEOAS you need some standard way of representing resources such as **HAL** ( Hypertext Application Langue ).

Other examples of hypermedia standard:

**Collection+JSON:**
http://amundsen.com/media-types/collection/examples/

**JSON-LD 1.1:**
https://www.w3.org/TR/json-ld/

**LinkHeader:**
https://www.w3.org/wiki/LinkHeader

### **Tools used for Chestnut API development and documentation:**

Architectural design, standards, guidelines, constraints:

REST API, HATEOAS, HAL.

Postman, Swagger UI, OpenAPI 3.0

- REST API and HATEOAS
- HAL
- Postman
- Swagger UI for the visual and yaml representation and documentation
- The above follows OpenAPI specifications

### **USEFUL LINKS:**

**PayPal API** implementation of **HATEOAS**\
https://developer.paypal.com/docs/api/reference/api-responses/#hateoas-links

**History** and articles about **REST APIs**\
https://blog.restcase.com/4-maturity-levels-of-rest-api-design/\
https://blog.readme.com/the-history-of-rest-apis/

Official **HAL** **documentation**\
http://stateless.co/hal_specification.html\
https://tools.ietf.org/html/draft-kelly-json-hal-08

**Web Linking** ( Useful info about links and rel in HTTP based communication )\
https://tools.ietf.org/html/rfc5988

Rsources about **designing** a **REST API** with **HATEOAS**, **HAL**\
https://opencredo.com/blogs/designing-rest-api-fine-grained-resources-hateoas-hal/\
https://www.contenttoolsrijksoverheid.nl/documentation.html\
https://idratherbewriting.com/learnapidoc/

**HTTP status codes**\
https://blog.cloud-elements.com/error-code-writing-good-api-status-codes\
https://restfulapi.net/http-status-codes/
