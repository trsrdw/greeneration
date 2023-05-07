import './login.scss';
import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Button, Form, Alert } from "react-bootstrap";
import useAuth from "../../hooks/useAuth";


export default function Login() {

    const { setAuth } = useAuth();

    const navigate = useNavigate();
    const location = useLocation();
    const from = location.state?.from?.pathname || "/";

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errMsg, setErrorMsg] = useState('');

    const handleSubmit = async (event) => {
        event.preventDefault();
        if (validateEmail(email) && validatePassword(password)) {
            try {

                fetch('https://6453b11ae9ac46cedf2cd38a.mockapi.io/users')
                    .then((response) => response.json())
                    .then((data) => {
                        const foundUser = data.find(
                            (user) => user.email === email && user.password === password
                        );
                        if (foundUser) {
                            setAuth({ email, password });
                            localStorage.setItem("user", JSON.stringify(foundUser));
                            setEmail('');
                            setPassword('');
                            navigate(from, { replace: true });
                        } else {
                            setErrorMsg('Invalid email or password');
                        }
                    })
                    .catch((error) => console.log(error));

            } catch (err) {
                setErrorMsg('Error fetching data');
            }
        } else {
            if (!validateEmail(email) && !validatePassword(password)) {
                setErrorMsg('Invalid email and password');
            } else if (!validateEmail(email)) {
                if (email === '') {
                    setErrorMsg('Please input your email')
                } else {
                    setErrorMsg('Please input the correct email format');
                }
            } else if (!validatePassword(password)) {
                if (password === '') {
                    setErrorMsg('Please input your password')
                } else {
                    setErrorMsg('Password must be at least 5 characters');
                }
            }
        }
    };

    const validateEmail = (email) => {
        const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return regex.test(email);
    };

    const validatePassword = (password) => {
        return password.length >= 5;
    };

    return (
        <div className="px-4 wrapper">
            {
                errMsg !== '' ?
                    <div className="alert-area">
                        <Alert variant="danger" dismissible>
                            {errMsg}
                        </Alert>
                    </div>
                    : null
            }

            <div className="login-container">
                <div className="login-form">
                    <Form noValidate onSubmit={handleSubmit}>
                        <Form.Group className="mb-3" controlId="formBasicEmail">
                            <Form.Control value={email} onChange={e => setEmail(e.target.value)} className="input-custom" required type="email" placeholder="Email address" />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="formBasicPassword">
                            <Form.Control value={password} onChange={e => setPassword(e.target.value)} className="input-custom" required type="password" placeholder="Password" />
                        </Form.Group>
                        <Form.Group className="mb-3 py-2" controlId="formBasicCheckbox">
                            <Form.Check type="checkbox" label="Remember me" />
                        </Form.Group>
                        <Button type="submit" className="button-primary">
                            Login
                        </Button>
                    </Form>
                </div>
            </div>
        </div>
    )
}