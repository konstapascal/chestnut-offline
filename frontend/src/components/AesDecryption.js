import React, { useState, useEffect } from 'react';
import { Form, Input } from 'semantic-ui-react';

var forge = require('node-forge');

const AesDecryption = () => {
   const [userInput, setUserInput] = useState('');
   const [aesDecrypted, setAesDecrypted] = useState('');
   const [userPassword, setUserPassword] = useState('');

   useEffect(() => {
      const encrypt = () => {
         let exampleString = userInput;

         // the password used for derviation of a key, assign your password here
         // if none is assigned a random one is generated
         let password = userPassword;
         if (password === '') {
            return;
         }

         // derive key with password and salt
         // keylength adheres to the "ECRYPT-CSA Recommendations" on "www.keylength.com"
         let salt = 'this is my salt';
         let key = forge.pkcs5.pbkdf2(password, salt, 300, 32);

         // generate a random initialization Vector
         let iv = 'this is my vector';

         //  console.log(userInput);

         // ENCRYPT the text
         let cipher = forge.cipher.createCipher('AES-CBC', key);

         // DECRYPT the text
         let tag = cipher.mode.tag;
         let decipher = forge.cipher.createDecipher('AES-CBC', key);
         decipher.start({
            iv: iv,
            tag: tag,
         });
         decipher.update(
            forge.util.createBuffer(forge.util.decode64(userInput))
         );
         decipher.finish();
         let decrypted = decipher.output.data;

         setAesDecrypted(decrypted);

         console.log('decrypted: ' + decrypted);
         //  console.log(password);
      };

      encrypt();
   }, [userInput, userPassword]);

   return (
      <div style={{ margin: '2.5rem' }}>
         <h3>Aes Encryption</h3>
         <p>
            Write plain text in the first area and it will be encrypted using
            aes.
         </p>

         <Form>
            <Form.Input
               label='Enter your password here'
               type='text'
               flucid
               onChange={(e) => setUserPassword(e.target.value)}
            />
            <Form.TextArea
               placeholder='Write or paste your text here...'
               style={{ minHeight: 100 }}
               onChange={(e) => setUserInput(e.target.value)}
            />
            <Form.TextArea
               readOnly
               placeholder='Ecrypted text appears here...'
               value={aesDecrypted}
               style={{ minHeight: 100 }}
            />
         </Form>
      </div>
   );
};

export default AesDecryption;
