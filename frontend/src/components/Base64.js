import React, { useState, useEffect } from "react";
import { TextArea, Form, Button } from "semantic-ui-react";

const Base64 = () => {
   const [userInput, setUserInput] = useState("");
   const [base64Encoded, setBase64Encoded] = useState("");
   const [isEncodeMode, setIsEncodeMode] = useState(true);

   const switchModeHandler = () => {
      if (!isEncodeMode) {
         setIsEncodeMode(false);
         console.log(isEncodeMode);
      } else {
         setIsEncodeMode(true);
         console.log(isEncodeMode);
      }
      setIsEncodeMode((prevMode) => !prevMode);
   };

   useEffect(() => {
      let base64EncodeDecode;
      if (isEncodeMode) {
         base64EncodeDecode = btoa(userInput);
         setBase64Encoded(base64EncodeDecode);
         console.log(userInput);
         console.log(base64EncodeDecode);
      } else {
      }
   }, [userInput]);

   return (
      <div style={{ margin: "2.5rem" }}>
         <h3>Base64</h3>
         <p>
            Write plain text in the first area and it will be encoded into
            Base64.
         </p>
         <Form>
            <TextArea
               placeholder="Write or paste your text here..."
               style={{ minHeight: 100 }}
               onChange={(e) => setUserInput(e.target.value)}
            />
            <br />
            <br />
            <TextArea
               disabled
               placeholder="Response goes here..."
               value={base64Encoded}
               style={{ minHeight: 100 }}
               onChange={(e) => setUserInput(e.target.value)}
            />
            <br />
            <br />
            <Button color="green" onClick={switchModeHandler}>
               Switch to {!isEncodeMode ? "Encoder" : "Decoder"}
            </Button>
         </Form>
      </div>
   );
};

export default Base64;
