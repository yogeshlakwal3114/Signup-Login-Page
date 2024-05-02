import { useState } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css'
import { Link, Navigate } from 'react-router-dom'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

function Login() {
    const [email, setEmail] = useState();
    const [password, setPassword] = useState();
    const navigate = useNavigate();


    const handleSubmit = (e) => {
        e.preventDefault();

        axios.post("http://localhost:3001/login", { email, password })  // make HTTP requests
            .then(result => {
                // console.log(result)
                if (result.status === 200) {
                    navigate('/home')
                }else{
                    window.alert("Invalid Email or Password")
                }
            })
            .catch(err => console.log(err))
    }

    return (
        <div>
            <div className="container mt-5">
                <div className="row justify-content-center">
                    <div className="col-md-6">
                        <div className="card">
                            <div className="card-header">
                                Login Form
                            </div>
                            <div className="card-body">
                                <form onSubmit={handleSubmit}>
                                    <div className="form-group">
                                        <label >Email address</label>
                                        <input type="email" className="form-control" id="email" aria-describedby="emailHelp" placeholder="Enter email" value={email}
                                            onChange={(e) => setEmail(e.target.value)}
                                        />
                                    </div>
                                    <div className="form-group">
                                        <label >Password</label>
                                        <input type="password" className="form-control" id="password" placeholder="Password" value={password}
                                            onChange={(e) => setPassword(e.target.value)}
                                        />
                                    </div>
                                    <button type="submit" className="btn btn-primary" style={{marginTop:'13px'}}>Login</button>
                                </form>
                            </div>
                            <div className="card-footer text-muted text-center">
                                If don't have an account!
                            </div>
                            <Link to='/register' type="submit" className="btn btn-primary">Signup</Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Login
