import React, { useState, useEffect } from 'react';
import { Form } from 'semantic-ui-react';

const Base64 = () => {
   const [userInput, setUserInput] = useState('');
   const [base64Encoded, setBase64Encoded] = useState('');

   useEffect(() => {
      const newBase64Encoded = btoa(userInput);
      setBase64Encoded(newBase64Encoded);
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
               readonly
               placeholder='Encoded text appears here...'
               value={base64Encoded}
               style={{ minHeight: 100 }}
            />
         </Form>
      </div>
   );
};

export default Base64;
