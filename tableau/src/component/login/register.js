import React, { useState } from "react";
import { Button, FormGroup, FormControl } from "react-bootstrap";
// import "./Login.css";

export default function Login(props) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");

  function validateForm() {
    return email.length > 0 && password.length > 0 && password === passwordConfirm;
  }

  function handleSubmit(event) {
    event.preventDefault();
    console.log('good');
    
  }


  return (
    <div className='container'>

      <div className="Login">
        <form onSubmit={handleSubmit}>
          <FormGroup controlId="email">
            <label> Email</label>
            <FormControl
              autoFocus
              type="email"
              value={email}
              onChange={e => setEmail(e.target.value)}
            />
          </FormGroup>
          <FormGroup controlId="password">
            <label>Mot de passe</label>
            <FormControl
              value={password}
              onChange={e => setPassword(e.target.value)}
              type="password"
            />
          </FormGroup>
          <FormGroup controlId="password">
            <label>Mot de passe (confirmation)</label>
            <FormControl
              value={passwordConfirm}
              onChange={e => setPasswordConfirm(e.target.value)}
              type="password"
              id='passwordConfirm'
            />
          </FormGroup>
          <Button block disabled={!validateForm()} type="submit">
            Login
        </Button>
        </form>
      </div>
    </div>
  );
}