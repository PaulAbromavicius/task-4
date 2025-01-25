import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { login } from '../authService';
import { Card, Form, Button, Alert, Container, Row, Col } from 'react-bootstrap';
import { LockIcon, MailIcon } from 'lucide-react';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await login({ email, password });
            navigate('/admin');
        } catch (err) {
            setError('Invalid email or password');
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
                                <h2 className="fw-bold text-primary">Welcome Back</h2>
                                <p className="text-muted">Sign in to continue</p>
                            </div>
                            
                            <Form onSubmit={handleSubmit}>
                                {error && (
                                    <Alert variant="danger" className="mb-3">
                                        {error}
                                    </Alert>
                                )}
                                
                                <Form.Group className="mb-3">
                                    <Form.Label className="d-flex align-items-center">
                                        <MailIcon className="me-2 text-muted" size={20} />
                                        Email Address
                                    </Form.Label>
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
                                    <Form.Label className="d-flex align-items-center">
                                        <LockIcon className="me-2 text-muted" size={20} />
                                        Password
                                    </Form.Label>
                                    <Form.Control 
                                        type="password" 
                                        placeholder="Enter your password"
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        required
                                        className="py-2"
                                    />
                                    <Form.Text className="text-muted">
                                        <a href="#" className="text-primary text-decoration-none">Forgot password?</a>
                                    </Form.Text>
                                </Form.Group>
                                
                                <Button 
                                    variant="primary" 
                                    type="submit" 
                                    className="w-100 py-2 fw-bold"
                                >
                                    Sign In
                                </Button>
                                
                                <div className="text-center mt-3">
                                    <span className="text-muted">
                                        Don't have an account? <a href="#" className="text-primary text-decoration-none">Sign Up</a>
                                    </span>
                                </div>
                            </Form>
                        </Card.Body>
                    </Card>
                </Col>

                {/* Right side - Optional, you can add a background or image */}
                <Col md={6} className="bg-primary d-none d-md-block"></Col>
            </Row>
        </Container>
    );
};

export default Login;
