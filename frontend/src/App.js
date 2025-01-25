import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Login from './pages/Login';
import Register from './pages/Register';
import AdminPanel from './pages/AdminPanel';
import ProtectedRoute from './components/ProtectedRoute';
import 'bootstrap/dist/css/bootstrap.min.css';

const App = () => {
    return (
        <Router>
            <div>
                {/* Navigation Links */}
                <nav style={{ marginBottom: '20px' }}>
                    <Link to="/login" style={{ marginRight: '10px' }}>Login</Link>
                    <Link to="/register" style={{ marginRight: '10px' }}>Register</Link>
                    <Link to="/admin">Admin Panel</Link>
                </nav>
                
                {/* Route Definitions */}
                <Routes>
                    <Route path="/login" element={<Login />} />
                    <Route path="/register" element={<Register />} />
                    <Route
                        path="/admin"
                        element={
                            <ProtectedRoute>
                                <AdminPanel />
                            </ProtectedRoute>
                        }
                    />
                </Routes>
            </div>
        </Router>
    );
};

export default App;
