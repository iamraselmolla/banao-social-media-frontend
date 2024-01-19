import React, { useContext, useState } from 'react';
import toast from 'react-hot-toast';
import { FaFacebook } from 'react-icons/fa';
import { FcGoogle } from 'react-icons/fc';
import { Link, useNavigate } from 'react-router-dom';

const Register = () => {
    const [error, setError] = useState(null)
    const [loading, setLoading] = useState(false)
    const [userInfo, setUserInfo] = useState({
        username: '',
        email: '',
        password: ''
    })
    const navigate = useNavigate();
    const handleUsernameChange = (newUsername) => {
        setUserInfo({
            ...userInfo,
            username: newUsername
        });
    };

    const handleEmailChange = (newEmail) => {
        setUserInfo({
            ...userInfo,
            email: newEmail
        });
    };

    const handlePasswordChange = (newPassword) => {
        setUserInfo({
            ...userInfo,
            password: newPassword
        });
    };
    const handleCreateUser = async (e) => {
        e.preventDefault()
        if (!userInfo.email || !userInfo.password || !userInfo.username) {
            setError('Please fill up all input fields')
            return
        }
        if (userInfo.password.length <= 5) {
            return toast.error("please use more than 6 digit password")
        }


        try {
            setError(null);
            setLoading(true)
            const response = await fetch('https://banao-social-media-server-mu.vercel.app/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(userInfo),
            });
            const data = await response.json()
            if (response.status === 409) {
                setError(data.message)
                setLoading(false)
            }
            if (response.status === 200) {
                setLoading(false)
                toast.success("Registration successfull")
                navigate("/login")
            }
        } catch (error) {
            console.error('Error:', error);
            setLoading(false)
        }
    }
    const handleChange = (e) => {
        setUserInfo({
            ...userInfo,
            [e.target.name]: e.target.value
        });
    };



    return (
        <div className="container py-5">
            <div className="register-user pb-2 px-4 pt-4">
                <div className="row">
                    <div className="col-md-6">
                        <div className="form-part">
                            <h3 className="fw-bold mb-3">
                                Create Account
                            </h3>
                            <div className="register-user-form">
                                <form>
                                    <div className="row">
                                        <input placeholder='Username' type="text" className="form-control rounded-0 fw-bold py-3 border-bottom-none text-muted" id="firstnameinput"
                                            value={userInfo.username}
                                            onChange={(e) => handleUsernameChange(e.target.value)} />
                                    </div>
                                    <div className="row">
                                        <input name='email' placeholder='Email' type="email" className="form-control rounded-0 fw-bold py-3  border-bottom-none text-muted" id="emailinput"
                                            value={userInfo.email}
                                            onChange={(e) => handleEmailChange(e.target.value)}
                                        />
                                    </div>
                                    <div className="row">
                                        <input name='password' placeholder='Password' type="password" className="form-control rounded-0 fw-bold py-3 text-muted" id="passinputlogin"
                                            value={userInfo.password}
                                            onChange={(e) => handlePasswordChange(e.target.value)}
                                        />
                                    </div>
                                    <p className='text-danger fw-bolder'>{error && error}</p>
                                    <div className="row">
                                        {!loading && <button onClick={handleCreateUser} type="submit" className="btn mt-3 py-2 w-100 rounded-5 fw-bold btn-success">Create Account</button>}
                                        {loading && <button class="btn mt-3 py-2 w-100 rounded-5 fw-bold btn-success" type="button" disabled>
                                            <span class="spinner-border me-2 spinner-border-sm" role="status" aria-hidden="true"></span>
                                            Please Wait...
                                        </button>}
                                    </div>
                                </form>
                                <button className="border fw-bold mt-4 w-100 px-3 py-2 bg-transparent border-1 rounded-0">
                                    <FaFacebook className='text-primary mr-2 fs-5'></FaFacebook>  Sign up with Facebook
                                </button>
                                <button className="border fw-bold mt-2 w-100 px-3 py-2 bg-transparent border-1 rounded-0">
                                    <FcGoogle className='mr-2 fs-5'></FcGoogle>  Sign up with Goggle
                                </button>
                            </div>
                        </div>
                    </div>
                    <div className="col-md-6 text-center">
                        <p className="mb-0">
                            Already have an account? <Link to="/login" className='text-success text-decoration-none fw-bold'>Sign In</Link>
                        </p>
                        <img src="register.png" className='img-fluid' alt="Register user" />
                        <p className="mt-4 text-muted">
                            By signing up, you agree to our Terms & conditions, Privacy policy
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Register;