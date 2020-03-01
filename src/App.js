import React from 'react';
import logo from './logo.svg';
import './App.css';
import zenroom from 'zenroom'
// or without ES6 syntax
// const zenroom = require('zenroom').default
 
const encrypt_secret_to_many = {
 script: `keyring = ECDH.new()
           secret = str(DATA)
           keys = JSON.decode(KEYS)
           keyring:private( base64(keys.keyring.secret) )
           res = {}
           for name,pubkey in pairs(keys.recipients) do
             pub = base64(pubkey)
             enc = ECDH.encrypt(keyring,pub,secret,keyring:public())
             res[name] = str( MSG.pack( map(enc,base64) ) ):base64()
           end
           print(JSON.encode(res))`,
 
 keys: {
     keyring : {
       public : "BHMjcDM/aljpi8pNxFQ436R6F3J+kaB/Xk1kAVFPmkoLVyeFltDZPgiIYRquh+m2IfvPioBfet7YCd5vVXYoRTk=",
       secret : "ChW5qi5y//ISDIHKx5Fvxl+XY8IyDGVBHUfELp3PqJQ="
     },
     recipients : {
       paulus : "BBUw6Nr3A30cN65maERvAk1cEv2Ji6Vs80kSlpodOC0SCtM8ucaS7e+s158uVMSr3BsvIXVspBeafiL8Qb3kcgc=",
       mayo : "BHqBoQ2WJ3/FGVNTXzdIc+K/HzNx05bWzEhn8m58FvSsaqWVdH52jI6fQWdkdjnbqVKCJGmbjA/OCJ+IKHbiySI=",
       mark : "BFgkjrRMvN+wkJ6qA4UvMaNlYBvl37C9cNYGkqOE4w43AUzkEzcyIIdE6BrgOEUEVefhOOnO6SCBQMgXHXJUUPY=",
       francesca : "BCo102mVybieKMyhex8tnVtFM5+Wo1oP02k8JVwKF9OLIjw7w0LmofItbuAcfWl9rcoe++XLI3sySZnqljIfeyU=",
       jim : "BEs1jeqL0nVwFi7OmG4YdtlWuKADyOvZR4XHpLAEswg8ONPXQHvwJ8+PkHkphoORfSjk2045bMdYkwboU4FdG2Y=",
       jaromil : "BBZYJtHvFg0vGCxPROAWrThcGZ+vFZJj86k+uncjvbm4DysIg7cWS3J6GrcJKCY55Uf40m2KfBwfaT+T7TTO1e8="
     }
 },
 
 data: 'This is a secret message.'
}
 
 
zenroom.init(encrypt_secret_to_many).zenroom_exec()




function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;
