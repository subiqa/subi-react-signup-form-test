import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from './App';

beforeEach (() => {
  render(<App />);
})

const typeIntoForm = ({ email, password, confirmPassword}) => {
  const emailInpulEl = screen.getByLabelText("Email address");
  const passwordInputEl = screen.getByLabelText("Password");
  const confirmPasswordInputEl = screen.getByLabelText("Confirm Password");

  if (email) {
    userEvent.type(emailInpulEl, email)
  } 
  if (password) {
    userEvent.type(passwordInputEl, password)
  }
  if (confirmPassword) {
    userEvent.type(confirmPasswordInputEl, confirmPassword)
  }
  return {
    emailInpulEl,
    passwordInputEl,
    confirmPasswordInputEl
  }
}

const clickSubmitButton = () => {
  const submitButtonEl = screen.getByRole("button", {name: "Submit"})
  userEvent.click(submitButtonEl)
}

test('Login form input should be initially empty', () => {
 
  expect(screen.getByLabelText("Email address")).toBeVisible()
  expect(screen.getByLabelText("Password")).toBeVisible()
  expect(screen.getByLabelText("Confirm Password")).toBeVisible()

});

test('User type in into email textbox', () => {

  const {emailInpulEl} = typeIntoForm({email: "subi@gmail.com"})
  expect(emailInpulEl.value).toBe("subi@gmail.com")

});

test('User type in into password textbox', () => {

  const {passwordInputEl} = typeIntoForm({password: "password123"})
  expect(passwordInputEl.value).toBe("password123")

});

test('User type in into confirm password textbox', () => {

  const {confirmPasswordInputEl} = typeIntoForm({confirmPassword: "password123"})
  expect(confirmPasswordInputEl.value).toBe("password123")

});

test('Display error message for invalid email address', () => {

  expect(screen.queryByText(/This email address is not valid/i)).not.toBeInTheDocument()

  typeIntoForm({email: "abcd"})
  clickSubmitButton()

  const errorMessageAfterSubmit = screen.getByText("This email address is not valid")
  expect(errorMessageAfterSubmit).toBeVisible()

});

test('Display error message for password less than 5 characters', () => {


  expect(screen.queryByText(/The password you entered should contain 5 or more character/i)).not.toBeInTheDocument()

  typeIntoForm({
    email: "subi@gmail.com",
    password: "1234"
  })
  clickSubmitButton()

  expect(screen.getByText("The password you entered should contain 5 or more character")).toBeVisible()

});

test('Display error message for incorrect confirm password', () => {
  
  expect(screen.queryByText(/The password don't match. Try again./i)).not.toBeInTheDocument()

  typeIntoForm({
    email: "subi@gmail.com",
    password: "pass123",
    confirmPassword: "pass1234"
  })
  clickSubmitButton()


  expect(screen.getByText("The password don't match. Try again")).toBeVisible()

});