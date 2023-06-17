import { useState } from 'react';
import { Col, Button, Row, Container, Card, Form } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { BASE_URL } from '../services/helper';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(`${BASE_URL}/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email,
          password,
        }),
      });

      if (response.ok) {
        const nameResponse = await fetch(`${BASE_URL}/users/name?email=${encodeURIComponent(email)}`);
        const nameData = await nameResponse.json();
        const name = nameData.name;
        const userId = nameData.userId;

        const nameQuery = encodeURIComponent(name);
        const userIdQuery = encodeURIComponent(userId);
        console.log(userIdQuery);
        // const localUrl = window.location.origin;
        // console.log(localUrl);
        // window.location.href = `${localUrl}/tasks?name=${nameQuery}&userId=${userIdQuery}`
        const tasksUrl = `/tasks?name=${nameQuery}&userId=${userIdQuery}`;
        navigate(tasksUrl);
        console.log(name + ' ' + nameQuery);
        console.log('Login successful');
      } else {
        // Login failed
        const data = await response.json();
        setErrorMessage(data.message);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <Container>
        <Row className="vh-100 w-100 d-flex justify-content-center align-items-center">
          <Col md={8} lg={6} xs={12}>
            <div className="border border-3 border-dark"></div>
            <Card className="shadow">
              <Card.Body>
                <div className="mb-3 mt-md-4">
                  <h2 className="fw-bold mb-2 text-uppercase">Welcome back!</h2>
                  <p className=" mb-5">Please enter your login and password!</p>
                  <div className="mb-3">
                    <Form onSubmit={handleSubmit}>
                      <Form.Control
                        className=""
                        type="email"
                        placeholder="Enter email"
                        value={email}
                        onChange={handleEmailChange}
                      />

                      <Form.Control
                        className="mt-4 mb-3"
                        type="password"
                        placeholder="Enter Password"
                        value={password}
                        onChange={handlePasswordChange}
                      />
                      {errorMessage && (
                        <div className="alert alert-danger" role="alert">
                          {errorMessage}
                        </div>
                      )}
                      <Form.Group className="mb-3" controlId="formBasicCheckbox">
                        <p className="small">
                          <a className="text-primary" href="#!">
                            Forgot password?
                          </a>
                        </p>
                      </Form.Group>
                      <div className="d-grid">
                        <Button variant="primary" className="btn btn-dark" type="submit">
                          Login
                        </Button>
                      </div>
                    </Form>
                    <div className="mt-3">
                      <p className="mb-0  text-center">
                        Don't have an account?{' '}
                        <a href="/register" className="text-primary fw-bold">
                          Sign Up
                        </a>
                      </p>
                    </div>
                  </div>
                </div>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </div>
  );
}
