import { useState } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css'
import { Link, Navigate } from 'react-router-dom'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

function Signup() {
    const [name, setName] = useState();
    const [email, setEmail] = useState();
    const [password, setPassword] = useState();
    const [errors, setErrors] = useState({});
    const [isChecked, setIsChecked] = useState(false);
    const navigate = useNavigate();

    const handleCheckboxChange = (e) => {
        const { checked } = e.target;
        setIsChecked(checked);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        let errors = {};

        // Email validation using regular expression
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,3}$/;
        if (!emailRegex.test(email)) {
            errors.email = 'Invalid email address';
        }

        // Password validation
        if (password.length < 6) {
            errors.password = 'Password must be at least 6 characters long';
        }

        if (!isChecked) {
            errors.isChecked = 'Please agree to the terms and conditions.';
        }

        setErrors(errors);
        // If no errors, proceed with form submission

        if (Object.keys(errors).length === 0) {
            // Call backend API to submit the form data
            axios.post("http://localhost:3001/register", { name, email, password, isChecked })  // make HTTP requests
                .then(result => {
                    console.log(result)
                    navigate('/login')    // Navigate the page
                })
                .catch(err => console.log(err))
        }

    }

    return (
        <div>
            <div className="container mt-5">
                <div className="row justify-content-center">
                    <div className="col-md-6">
                        <div className="card">
                            <div className="card-header">
                                Signup Form
                            </div>
                            <div className="card-body">
                                <form onSubmit={handleSubmit}>
                                    <div className="form-group">
                                        <label >Name</label>
                                        <input type="text" className="form-control" id="name" placeholder="Enter your name"
                                            onChange={(e) => setName(e.target.value)}
                                        />
                                    </div>
                                    <div className="form-group">
                                        <label >Email address</label>
                                        <input type="email" className="form-control" id="email" aria-describedby="emailHelp" placeholder="Enter email" value={email}
                                            onChange={(e) => setEmail(e.target.value)}
                                        />
                                        {errors.email && <span>{errors.email}</span>}
                                    </div>
                                    <div className="form-group">
                                        <label >Password</label>
                                        <input type="password" className="form-control" id="password" placeholder="Password" value={password}
                                            onChange={(e) => setPassword(e.target.value)}
                                        />
                                        {errors.password && <span>{errors.password}</span>}
                                    </div>
                                    <label style={{color:'blue', marginTop:'5px'}}>
                                        <input
                                            type="checkbox"
                                            id="ischecked"
                                            value={isChecked}
                                            onChange={handleCheckboxChange}
                                        />
                                        I agree to the terms and conditions
                                    </label>
                                    <br/>
                                    {errors.isChecked && <span>{errors.isChecked}</span>}
                                    <br/>

                                    <button type="submit" className="btn btn-primary" style={{marginTop:'13px'}}>Sign Up</button>
                                </form>
                            </div>
                            <div className="card-footer text-muted text-center">
                                Already have an account?
                            </div>
                            <Link to='/login' type="submit" className="btn btn-primary">Login</Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Signup
