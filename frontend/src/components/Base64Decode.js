import React, { useState, useEffect } from 'react';
import { Form } from 'semantic-ui-react';

var forge = require('node-forge');

const Base64Decode = () => {
   const [userInput, setUserInput] = useState('');
   const [base64Decoded, setBase64Decoded] = useState('');

   useEffect(() => {
      const newBase64Decoded = forge.util.decode64(userInput);
      setBase64Decoded(newBase64Decoded);
   }, [userInput]);

   return (
      <div style={{ margin: '2.5rem' }}>
         <h3>Base64</h3>
         <p>
            Write plain text in the first area and it will be encoded into
            Base64.
         </p>
         <Form>
            <Form.TextArea
               placeholder='Write or paste your text here...'
               style={{ minHeight: 100 }}
               onChange={(e) => setUserInput(e.target.value)}
            />
            <Form.TextArea
               readOnly
               placeholder='Encoded text appears here...'
               value={base64Decoded}
               style={{ minHeight: 100 }}
            />
         </Form>
      </div>
   );
};

export default Base64Decode;
