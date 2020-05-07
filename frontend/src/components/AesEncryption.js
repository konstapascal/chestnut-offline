import React, { useState, useEffect } from 'react';
import { Form, Input } from 'semantic-ui-react';

var forge = require('node-forge');

const AesEncryption = () => {
   const [userInput, setUserInput] = useState('');
   const [aesEncrypted, setAesEncrypted] = useState('');
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
         let salt = forge.random.getBytesSync(128);
         let key = forge.pkcs5.pbkdf2(password, salt, 300, 32);

         // generate a random initialization Vector
         let iv = forge.random.getBytesSync(16);

         //  console.log(userInput);

         // ENCRYPT the text
         let cipher = forge.cipher.createCipher('AES-GCM', key);
         cipher.start({ iv: iv });
         cipher.update(forge.util.createBuffer(exampleString));
         cipher.finish();
         let tag = cipher.mode.tag;
         let encrypted = forge.util.encode64(cipher.output.data);

         setAesEncrypted(encrypted);

         // DECRYPT the text
         let decipher = forge.cipher.createDecipher('AES-GCM', key);
         decipher.start({
            iv: iv,
            tag: tag,
         });
         decipher.update(
            forge.util.createBuffer(forge.util.decode64(encrypted))
         );
         decipher.finish();
         let decrypted = decipher.output.data;

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
               readonly
               placeholder='Ecrypted text appears here...'
               value={aesEncrypted}
               style={{ minHeight: 100 }}
            />
         </Form>
      </div>
   );
};

export default AesEncryption;
