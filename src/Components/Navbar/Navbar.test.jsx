import React from "react";
import { render, fireEvent, screen } from "@testing-library/react";
import '@testing-library/jest-dom';
import { BrowserRouter as Router } from "react-router-dom";
import { AuthProvider, AuthContext } from "../../Context/Auth";
import Navbar from "./index";

const customRender = (ui, { providerProps, ...renderOptions }) => {
  return render(
    <AuthContext.Provider {...providerProps}>
      <Router>{ui}</Router>
    </AuthContext.Provider>,
    renderOptions
  );
};

test("renders Navbar component with login form when not logged in", () => {
  const providerProps = {
    value: {
      isLoggedin: false,
      login: jest.fn(),
      logout: jest.fn(),
    },
  };

  customRender(<Navbar />, { providerProps });

  expect(screen.getByPlaceholderText("Username")).toBeInTheDocument();
  expect(screen.getByPlaceholderText("Password")).toBeInTheDocument();
  expect(screen.getByRole("button", { name: "Login" })).toBeInTheDocument();
});

test("renders Navbar component with logout button when logged in", () => {
  const providerProps = {
    value: {
      isLoggedin: true,
      login: jest.fn(),
      logout: jest.fn(),
    },
  };

  customRender(<Navbar />, { providerProps });

  expect(screen.getByRole("button", { name: "Logout" })).toBeInTheDocument();
});

test("handles login and logout correctly", () => {
  const mockLogin = jest.fn();
  const mockLogout = jest.fn();

  const providerProps = {
    value: {
      isLoggedin: false,
      login: mockLogin,
      logout: mockLogout,
    },
  };

  customRender(<Navbar />, { providerProps });

  const usernameInput = screen.getByPlaceholderText("Username");
  const passwordInput = screen.getByPlaceholderText("Password");
  const loginButton = screen.getByRole("button", { name: "Login" });

  fireEvent.change(usernameInput, { target: { value: "testuser" } });
  fireEvent.change(passwordInput, { target: { value: "testpassword" } });
  fireEvent.click(loginButton);

  expect(mockLogin).toHaveBeenCalledWith("testuser", "testpassword");

  providerProps.value.isLoggedin = true;

  customRender(<Navbar />, { providerProps });

  const logoutButton = screen.getByRole("button", { name: "Logout" });
  fireEvent.click(logoutButton);

  expect(mockLogout).toHaveBeenCalledTimes(1);
});
