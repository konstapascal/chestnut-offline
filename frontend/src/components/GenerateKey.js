import React, { useState } from "react";
import { Button, Form, Segment } from "semantic-ui-react";
import { useForm } from "../hooks/form-hook";
import { VALIDATOR_REQUIRE } from "../util/validators";
import Input from "../components/FormElements/Input";
var forge = require("node-forge");

// import rsaKeyPair from "rsa-keypair";

const GenerateKey = () => {
   const typeOptions = [
      {
         key: "rsa",
         text: "RSA",
         value: "rsa",
      },
   ];
   const lengthOptions = [
      {
         key: "512",
         text: "512",
         value: "512",
      },
      {
         key: "1024",
         text: "1024",
         value: "1024",
      },
      {
         key: "2048",
         text: "2048",
         value: "2048",
      },
      {
         key: "4096",
         text: "4096",
         value: "4096",
      },
   ];
   let pki = forge.pki;
   const [generatedPrivateKey, setGeneratedPrivateKey] = useState("");
   const [generatedPublicKey, setGeneratedPublicKey] = useState("");
   const [formState, inputHandler] = useForm(
      {
         keyname: {
            value: "",
            isValid: false,
         },
      },
      false
   );

   const exampleString =
      "Text that is going to be sent over an insecure channel and must be encrypted at all costs! ";

   const submitGenerateKey = () => {
      let keypair = pki.rsa.generateKeyPair({ bits: 2048, e: 0x10001 });

      let pemPublicKey = pki.publicKeyToPem(keypair.publicKey);
      let pemPrivateKey = pki.privateKeyToPem(keypair.privateKey);
      setGeneratedPrivateKey(pemPrivateKey);
      // ENCRYPT String
      let toEncrypt = Buffer.from(exampleString);
      let encrypted = forge.util.encode64(
         keypair.publicKey.encrypt(toEncrypt, "RSA-OAEP")
      );

      // DECRYPT String
      let decrypted = keypair.privateKey.decrypt(
         forge.util.decode64(encrypted),
         "RSA-OAEP"
      );

      // console.log(pemPublicKey);
      console.log(generatedPrivateKey);
      // console.log(encrypted);
      // console.log(decrypted);
   };

   return (
      <Segment style={{ textAlign: "center", maxWidth: 400, minWidth: 400 }}>
         <h3 style={{ textAlign: "center" }}>Generate keypair</h3>
         <hr />
         <Form onSubmit={submitGenerateKey}>
            <Form.Field>
               <Input
                  iconPosition="left"
                  element="input"
                  id="keyname"
                  type="text"
                  label="Your username"
                  validators={[VALIDATOR_REQUIRE()]}
                  errorText="Please enter a name for the key."
                  onInput={inputHandler}
                  placeholder="Key name"
               />
            </Form.Field>
            <Form.Select
               defaultValue={typeOptions[0].value}
               options={typeOptions}
            ></Form.Select>
            <Form.Select
               defaultValue={lengthOptions[2].value}
               options={lengthOptions}
            ></Form.Select>

            <Button type="submit" positive disabled={!formState.isValid}>
               Generate
            </Button>
         </Form>
      </Segment>
   );
};

export default GenerateKey;
