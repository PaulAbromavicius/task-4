import React, { useState } from 'react';
import { register } from '../authService';
import { useNavigate } from 'react-router-dom';
import { Card, Form, Button, Alert, Container, Row, Col } from 'react-bootstrap';

const Register = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [name, setName] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await register({ email, password, name });
            navigate('/login'); // Redirect to login after successful registration
        } catch (err) {
            setError('Registration failed');
        }
    };

    return (
        <Container fluid className="vh-100">
            <Row className="h-100">
                {/* Left side - Form */}
                <Col md={6} className="d-flex justify-content-center align-items-center">
                    <Card className="shadow-lg border-0 rounded-4 w-75">
                        <Card.Body className="p-5">
                            <div className="text-center mb-4">
                                <h2 className="fw-bold text-primary">Create an Account</h2>
                                <p className="text-muted">Register to get started</p>
                            </div>
                            
                            <Form onSubmit={handleSubmit}>
                                {error && (
                                    <Alert variant="danger" className="mb-3">
                                        {error}
                                    </Alert>
                                )}
                                
                                <Form.Group className="mb-3">
                                    <Form.Label>Name</Form.Label>
                                    <Form.Control 
                                        type="text" 
                                        placeholder="Enter your name"
                                        value={name}
                                        onChange={(e) => setName(e.target.value)}
                                        required
                                        className="py-2"
                                    />
                                </Form.Group>

                                <Form.Group className="mb-3">
                                    <Form.Label>Email Address</Form.Label>
                                    <Form.Control 
                                        type="email" 
                                        placeholder="Enter your email"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        required
                                        className="py-2"
                                    />
                                </Form.Group>

                                <Form.Group className="mb-4">
                                    <Form.Label>Password</Form.Label>
                                    <Form.Control 
                                        type="password" 
                                        placeholder="Enter your password"
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        required
                                        className="py-2"
                                    />
                                </Form.Group>
                                
                                <Button 
                                    variant="primary" 
                                    type="submit" 
                                    className="w-100 py-2 fw-bold"
                                >
                                    Register
                                </Button>
                                
                                <div className="text-center mt-3">
                                    <span className="text-muted">
                                        Already have an account? <a href="/login" className="text-primary text-decoration-none">Sign In</a>
                                    </span>
                                </div>
                            </Form>
                        </Card.Body>
                    </Card>
                </Col>

                {/* Right side - Optional background */}
                <Col md={6} className="bg-primary d-none d-md-block"></Col>
            </Row>
        </Container>
    );
};

export default Register;
