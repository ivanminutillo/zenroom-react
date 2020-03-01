import React from 'react';
import './App.css';
import zenroom from 'zenroom'


// Alice encrypts a message for Bob
const option = {
  script: `Rule check version 1.0.0
  Scenario 'simple': Alice encrypts a message for Bob
  Given that I am known as 'Alice'
  and I have my valid 'keypair'
  and I have a valid 'public key' from 'Bob'
  When I write 'This is my secret message.' in 'message'
  and I write 'This is the header' in 'header'
  and I encrypt the message for 'Bob'
  Then print the 'secret message'`,
  keys: {
    "zenroom":{"curve":"goldilocks","encoding":"url64","version":"1.0.0+53387e8","scenario":"simple"},
    "Alice":{"keypair":{"private_key":"P-aY-bv0vSC-cW2Er8NJk6WrErF11GotEiEqPj4Xs8qxpCu_YHujUzLD3bpgQDH845cxeWRbNjI","public_key":"BDgebXNQhnQs0lqVS3JWbcvu3GWf8_ri3O0jVxAR-o1_cEP-rBPTu-PqPB6tGMpcX0JRIAHArN8pl2mBGJTO9rz-L4u3ojxzdWZ1BwNRrC5Jb26C4G4LyZEOPn_dpK1_5sbotlqvV6TGvZFmh4CeqnE"}},
    "Bob": {"public_key":"BGI3AFTtcM8fI55VQxsLJsxa_A3OBpOEIktIly_UBEvZw-klpgl0B9LPwAo5cK8USuY-mDcfeH8AiuQ07F-I4-P5KwBlzHLv0Qf3fMiEHBG7wqIuxaWvvrg102pNh0sD2aX0rPDnvvN3sDCUKcE_aRI"},  
  }
} 


zenroom.init(option).zencode_exec()

function App() {

  return (
    <div className="App">
      <header className="App-header">
        
      </header>
    </div>
  );
}

export default App;
