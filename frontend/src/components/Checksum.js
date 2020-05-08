import React, { useState, useEffect } from 'react';
import { Form } from 'semantic-ui-react';
var forge = require('node-forge');

const Checksum = () => {
   const [userInput, setUserInput] = useState('');
   const [md5Hash, setMD5Hash] = useState('');
   const [sha1Hash, setSHA1Hash] = useState('');
   const [sha256Hash, setSHA256] = useState('');
   const [sha512Hash, setSHA512] = useState('');

   useEffect(() => {
      if (userInput === '') {
         return;
      }
      let md5Hasher = forge.md.md5.create();
      md5Hasher.update(userInput);
      setMD5Hash(md5Hasher.digest().toHex());

      let sha1Hasher = forge.md.sha1.create();
      sha1Hasher.update(userInput);
      setSHA1Hash(sha1Hasher.digest().toHex());

      let sha256Hasher = forge.md.sha256.create();
      sha256Hasher.update(userInput);
      setSHA256(sha256Hasher.digest().toHex());

      let sha512Hasher = forge.md.sha512.create();
      sha512Hasher.update(userInput);
      setSHA512(sha512Hasher.digest().toHex());
   }, [userInput]);

   return (
      <div>
         <Form>
            <Form.Input
               type='text'
               label='Data to checksum'
               onChange={(e) => {
                  setUserInput(e.target.value);
               }}
            ></Form.Input>
            {/* {console.log(userInput)} */}

            <Form.TextArea
               type='text'
               value={md5Hash}
               label='MD5'
            ></Form.TextArea>
            <Form.TextArea
               type='text'
               value={sha1Hash}
               label='SHA-1'
            ></Form.TextArea>
            <Form.TextArea
               type='text'
               value={sha256Hash}
               label='SHA-256'
            ></Form.TextArea>
            <Form.TextArea
               type='text'
               value={sha512Hash}
               label='SHA-512'
            ></Form.TextArea>
         </Form>
      </div>
   );
};

export default Checksum;
