import React, {useState} from 'react';
import './App.css';
import zenroom from 'zenroom'
import { Text, Box, Image, Flex, Button } from 'rebass';
import { Textarea } from '@rebass/forms'
import styled from 'styled-components'

function App() {
  const [sender, setKeys] = useState(null);
  const [receiver, setReceiverKeys] = useState(null);
  const [message, setMessage] = useState('');
  const [encrypted, setEncrypted] = useState(null);
  const [decrypted, setDecrypted] = useState(null);

  const generateKeypair = (name) => new Promise((resolve, reject) => {
    let result
    const options = {
      script: `Rule check version 1.0.0
      Scenario 'simple': generate keypair
      Given that I am known as '${name}'
      When I create the keypair
      Then print my data`,
      print: (data) => { result = JSON.parse(data) },
      success: () => {resolve(result)},
      error: () => {reject(result)},
    }
    return zenroom.init(options).zencode_exec()
  })
  
  const encryptMessage = (sender, receiver) => new Promise((resolve, reject) => {
      let keys = {
        zenroom: {
          curve: "goldilocks",
          encoding: "url64",
          version: "1.0.0+53387e8",
          scenario: "simple"
        }
      }
      keys["Alice"] = sender.Alice
      keys["Bob"] = {public_key: receiver.Bob.keypair.public_key}
      const script = `Rule check version 1.0.0
      Scenario 'simple': Alice encrypts a message for Bob
      Given that I am known as '${Object.keys(sender)[0]}'
      and I have my valid 'keypair'
      and I have a valid 'public key' from '${Object.keys(receiver)[0]}'
      When I write '${message}' in 'message'
      and I write 'This is the header' in 'header'
      and I encrypt the message for '${Object.keys(receiver)[0]}'
      Then print the 'secret message'`
      let result
      const options = {
        script: script,
        keys: keys,
        print: (data) => { result = JSON.parse(data) },
        success: () => {resolve(result)},
        error: () => {reject(result)},
      }
    return zenroom.init(options).zencode_exec()
    })

    const decryptMessage = (sender, receiver) => new Promise((resolve, reject) => {
      let keys = {
        zenroom: {
          curve: "goldilocks",
          encoding: "url64",
          version: "1.0.0+53387e8",
          scenario: "simple"
        }
      }
      keys["Alice"] = {public_key: sender.Alice.keypair.public_key}
      keys["Bob"] = receiver.Bob
      keys["secret_message"] = encrypted.secret_message
      const script = `Rule check version 1.0.0
        Scenario 'simple': Bob decrypts the message from Alice
        Given that I am known as '${Object.keys(receiver)[0]}'
        and I have my valid 'keypair'
        and I have a valid 'public key' from '${Object.keys(sender)[0]}'
        and I have a valid 'secret message'
        When I decrypt the secret message from '${Object.keys(sender)[0]}'
        Then print as 'string' the 'message'
        and print as 'string' the 'header' inside 'secret message'`
      let result
      const options = {
        script: script,
        keys: keys,
        print: (data) => { result = JSON.parse(data) },
        success: () => {resolve(result)},
        error: () => {reject(result)},
      }
      return zenroom.init(options).zencode_exec()
    })
  return (
    <Box mt={4} sx={{width: "610px", margin: "0 auto"}}>
    <Text mb={3} pb={2} sx={{fontWeight: "bold", borderBottom: "4px solid #c66685"}}>
        <Box
          mr={1}
          sx={{
            display: 'inline-block',
            color: 'white',
            bg: "rgb(243, 182, 97)",
            fontSize: "12px",
            px: 2,
            py: 1,
            borderRadius: 9999,
          }}>
          STEP 1
        </Box>San evokes her keypair </Text>
        <Flex>
    <Box sx={{width: "300px", marginRight: "10px"}}>
      <Flex>
        <Image sx={{
          width: 48,
          height: 48,
          borderRadius: 9999,
        }} 
        src="https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcSg6FoYup0__5MeA5G1tjztNmEV2VqQWC530OgL22dKKwpvt8tZ" />
        <Box>
        <Box ml={3} mt={1}>
          <Button onClick={() => generateKeypair("Alice").then(res => setKeys(res))} sx={{bg: "rgb(243, 182, 97)"}}>🧙‍♀️Generate 🧙‍♂️</Button>
        </Box>
        </Box>
      </Flex>
    </Box>
    <Code width="300px" sx={{overflow: "scroll", bg: "white", borderRadius: "6px", color: "#333", fontSize: "12px"}}>
      <pre className="prettyprint">
        <code className="language-json">
          {JSON.stringify(sender,null, "\t")}
        </code>
      </pre>
    </Code>
    </Flex>
    <Text mt={4} mb={3} pb={2} sx={{fontWeight: "bold", borderBottom: "4px solid #c66685"}}> <Box
          mr={1}
          sx={{
            display: 'inline-block',
            color: 'white',
            bg: "rgb(243, 182, 97)",
            fontSize: "12px",
            px: 2,
            py: 1,
            borderRadius: 9999,
          }}>
          STEP 2
        </Box>Ashitaka evokes his keypair </Text>
    <Flex>
    <Box sx={{width: "300px", marginRight: "10px"}}>
      <Flex>
        <Image sx={{
          width: 48,
          height: 48,
          borderRadius: 9999,
        }} 
        src="https://i.ytimg.com/vi/k4Q_YUXj4bU/maxresdefault.jpg" />
        <Box>
        <Box ml={3} mt={1}>
          <Button onClick={() => generateKeypair("Bob").then(res => setReceiverKeys(res))} sx={{bg: "rgb(243, 182, 97)"}}>🧙‍♀️Generate 🧙‍♂️</Button>
        </Box>
        </Box>
      </Flex>
    </Box>
    <Code width="300px" sx={{overflow: "scroll", bg: "white", borderRadius: "6px", color: "#333", fontSize: "12px"}}>
      <pre className="prettyprint">
        <code className="language-json">
          {JSON.stringify(receiver,null, "\t")}
        </code>
      </pre>
    </Code>
    </Flex>
    <Text mt={4} mb={3} pb={2} sx={{fontWeight: "bold", borderBottom: "4px solid #c66685"}}> <Box
          mr={1}
          sx={{
            display: 'inline-block',
            color: 'white',
            bg: "rgb(243, 182, 97)",
            fontSize: "12px",
            px: 2,
            py: 1,
            borderRadius: 9999,
          }}>
          STEP 3
        </Box>San encrypts a message for Ashitaka</Text>
        <Flex>
        <Image sx={{
          width: 48,
          height: 48,
          borderRadius: 9999,
        }} 
        src="https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcSg6FoYup0__5MeA5G1tjztNmEV2VqQWC530OgL22dKKwpvt8tZ" />
        <Box width="100%">
          <Textarea placeholder="Write a message..." ml={3} sx={{bg: "white", color: "#333"}} onChange={(e) => setMessage(e.target.value)} value={message} />
          <Button sx={{bg: "rgb(243, 182, 97)"}} ml={3} mt={2} onClick={() => encryptMessage(sender, receiver).then(res => setEncrypted(res))}>🔑🔒</Button>
          <Box ml={3} mt={2} sx={{fontSize: "14px", width: "600px", overflow: "scroll"}} >
              <Text my={2} sx={{fontWeight: "bold"}}>Encrypted text</Text>
              {encrypted === null ? "" : encrypted.secret_message.text}
          </Box>
        </Box>
        </Flex>
        <Text mt={4} mb={3} pb={2} sx={{fontWeight: "bold", borderBottom: "4px solid #c66685"}}> <Box
          mr={1}
          sx={{
            display: 'inline-block',
            color: 'white',
            bg: "rgb(243, 182, 97)",
            fontSize: "12px",
            px: 2,
            py: 1,
            borderRadius: 9999,
          }}>
          STEP 4
        </Box>Ashitaka decrypts the message</Text>
        <Flex>
        <Image sx={{
          width: 48,
          height: 48,
          borderRadius: 9999,
        }} 
        src="https://i.ytimg.com/vi/k4Q_YUXj4bU/maxresdefault.jpg" />
        <Box width="100%">
          <Button sx={{bg: "rgb(243, 182, 97)"}} ml={3} mt={2} onClick={() => decryptMessage(sender, receiver).then(res => setDecrypted(res))}>🔓🔑</Button>
          <Box ml={3} mt={2} sx={{fontSize: "14px", width: "600px", overflow: "scroll"}} >
              <Text my={2} sx={{fontWeight: "bold"}}>Decrypted text</Text>
              {decrypted && decrypted.message.replace(/_/g, " ")}
          </Box>
        </Box>
        </Flex>
    </Box>
  );
}

const Code = styled(Box)`
 pre {
   border: 0;
   padding: 0;
 }
 code {
   padding-left: 4px;
 }
`

export default App;
