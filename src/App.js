import "./App.css";
import { useState } from "react";
import validator from "validator";

function App() {

  const [signUpInput, setSignUpInput] = useState({
    email: "",
    password: "",
    confirmPassword: ""
  })

  const [errorMessage, setErrorMessage] = useState("")

  const handleChange = (e) => {
    setSignUpInput({
      ...signUpInput,
      [e.target.name]: e.target.value
    })
  }

  const handleClick = (e) => {
    e.preventDefault();
    if(!validator.isEmail(signUpInput.email)){
      return setErrorMessage("This email address is not valid")
    } else {
      if(signUpInput.password.length < 5) {
        return setErrorMessage("The password you entered should contain 5 or more character")
        } else if(!(signUpInput.password === signUpInput.confirmPassword)){
          return setErrorMessage("The password don't match. Try again")
        }
    }
  }

  return (
    <div className="container my-5">
      <form>
        <div className="mb-3">
          <label htmlFor="email" className="form-label">
            Email address
          </label>
          <input
            type="email"
            id="email"
            name="email"
            className="form-control"
            value={signUpInput.email}
            onChange={handleChange}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="password" className="form-label">
            Password
          </label>
          <input
            type="password"
            id="password"
            name="password"
            className="form-control"
            value={signUpInput.password}
            onChange={handleChange}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="confirm-password" className="form-label">
            Confirm Password
          </label>
          <input
            type="password"
            id="confirm-password"
            name="confirmPassword"
            className="form-control"
            value={signUpInput.confirmPassword}
            onChange={handleChange}
          />
        </div>
        {errorMessage && <p>{errorMessage}</p>}
        <button  type="submit" className="btn btn-primary" onClick={handleClick}>
          Submit
        </button>
      </form>
    </div>
  );
}

export default App;