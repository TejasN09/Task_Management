import { useState } from 'react';
import { Col, Button, Row, Container, Card, Form, Alert } from 'react-bootstrap';

export default function Registration() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [passwordError, setPasswordError] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const handleNameChange = (e) => {
    setName(e.target.value);
  };

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleConfirmPasswordChange = (e) => {
    setConfirmPassword(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (password === confirmPassword) {
      setPasswordError(false);
      setErrorMessage('');

      try {
        const response = await fetch('http://localhost:5500/register', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            name,
            email,
            password,
          }),
        });

        if (response.ok) {
          window.location.href=`http://localhost:3000/login`
          console.log('Registration successful');
        } else {
          // Registration failed
          const data = await response.json();
          setErrorMessage(data.message);
        }
      } catch (error) {
        console.log(error);
        setErrorMessage('Internal Server Error');
      }
    } else {
      setPasswordError(true);
      setErrorMessage('Passwords do not match');
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
                  <h2 className="fw-bold mb-2 text-uppercase">Sign Up</h2>
                  <p className="mb-5">Create your account</p>
                  <div className="mb-3">
                    <Form onSubmit={handleSubmit}>
                      <Form.Control
                      name="name"
                        className="mt-4"
                        type="text"
                        placeholder="Name"
                        value={name}
                        onChange={handleNameChange}
                      />
                      <Form.Control
                        name="email"
                        className="mt-4"
                        type="email"
                        placeholder="Email"
                        value={email}
                        onChange={handleEmailChange}
                      />
                      <Form.Control
                        name="password"
                        className="mt-4"
                        type="password"
                        placeholder="Password"
                        value={password}
                        onChange={handlePasswordChange}
                      />
                      <Form.Control
                        className="mt-4 mb-4"
                        type="password"
                        placeholder="Confirm Password"
                        value={confirmPassword}
                        onChange={handleConfirmPasswordChange}
                      />
                      {passwordError && (
                        <Alert variant="danger" className="mb-4">
                          Passwords do not match
                        </Alert>
                      )}
                      {errorMessage && (
                        <Alert variant="danger" className="mb-4">
                          {errorMessage}
                        </Alert>
                      )}
                      <div className="d-grid">
                        <Button variant="primary" className="btn btn-dark" type="submit">
                          Register
                        </Button>
                      </div>
                    </Form>
                    <div className="mt-3">
                      <p className="mb-0 text-center">
                        Already have an account?{' '}
                        <a href="/login" className="text-primary fw-bold">
                          Log In
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
