import React, { useState } from 'react';
import { v4 as uuid } from 'uuid';
import { Form, List, Message, Icon } from 'semantic-ui-react';

const UUIDGenerator = () => {
   const [generatedUUID, setGeneratedUUID] = useState([]);
   const [number, setNumber] = useState('');
   const [error, setError] = useState('');
   let index;
   let uuids = [];
   let uuidGen = '';

   const genrate = () => {
      if (number < 0 || number > 100) {
         setError('Please choose a number between 1 and 100');
         return;
      } else {
         for (index = 0; index < number; index++) {
            uuidGen = uuid();
            uuids.push(uuidGen);
         }
      }

      setGeneratedUUID(uuids);
   };

   return (
      <div>
         <h3>Hello</h3>
         <Form>
            <Form.Input
               type='number'
               fluid
               placeholder='Max 100'
               label='How many uuid?'
               focus
               onChange={(e) => {
                  setNumber(e.target.value);
                  setError('');
               }}
               value={number}
            />
            <Form.Button type='button' fluid onClick={genrate}>
               Genrate
            </Form.Button>
            {error !== '' && (
               <Message error visible>
                  <Icon color='red' name='times' size='small' />
                  {error}
               </Message>
            )}
            <List>
               {!error &&
                  generatedUUID.map((item) => (
                     <List.Item key={item}>{item}</List.Item>
                  ))}
            </List>
         </Form>
      </div>
   );
};

export default UUIDGenerator;
