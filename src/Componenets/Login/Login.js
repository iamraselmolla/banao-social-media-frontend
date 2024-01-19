import React, { useContext, useState } from 'react';
import { toast } from 'react-hot-toast';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../AuthContext/AuthProvider';

const Login = () => {
    const authCtx = useContext(AuthContext)
    const [loading, setLoading] = useState(false)
    const [userInfo, setUserInfo] = useState({
        username: '',
        password: ''
    })
    const navigate = useNavigate()
    const handleUsernameChange = (newUsername) => {
        setUserInfo({
            ...userInfo,
            username: newUsername
        });
    };
    const handlePasswordChange = (newPassword) => {
        setUserInfo({
            ...userInfo,
            password: newPassword
        });
    };

    const handleLogin = async (e) => {
        e.preventDefault()
        setLoading(true)
        if (!userInfo.password) {
            return toast.error("Please give  password")
        }
        if (!userInfo.username) {
            return toast.error("Please give  valid username")
        }


        try {
            const response = await fetch('https://banao-social-media-server-mu.vercel.app/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(userInfo),
            });
            const data = await response.json()

            if (response?.status === 404) {
                setLoading(false)
                return toast.error(data?.message)
            }
            if (response.status === 401) {
                setLoading(false)
                return toast.error(data?.message)
            }
            if (response.status === 200) {
                setLoading(false)
                console.log(data?.data)

                authCtx.login(data?.localid, data?.token, data?.data)
                navigate("/")
                return toast.success(data?.message)


            }




        } catch (error) {
            setLoading(false)
            console.error('Error:', error);
        }
    }


    return (
        <div className="container py-5">
            <div className="register-user pb-2 px-4 pt-4">
                <div className="row">
                    <div className="col-md-6">
                        <div className="form-part">
                            <h3 className="fw-bold mb-3">
                                Welcome Back !
                            </h3>
                            <div className="register-user-form">
                                <form>
                                    <div className="row">
                                        <input name='username' placeholder='Username' type="text" className="form-control rounded-0 fw-bold py-3  border-bottom-none text-muted" id="emailinput"
                                            value={userInfo.username}
                                            onChange={(e) => handleUsernameChange(e.target.value)}
                                        />
                                    </div>
                                    <div className="row">
                                        <input name='password' placeholder='Password' type="password" className="form-control rounded-0 fw-bold py-3  text-muted" id="passinputlogin"

                                            value={userInfo.password}
                                            onChange={(e) => handlePasswordChange(e.target.value)}
                                        />
                                    </div>
                                    <div className="row">
                                        {!loading && <button onClick={handleLogin} type="submit" className="btn mt-3 py-2 w-100 rounded-5 fw-bold btn-success">Log in</button>}

                                        {loading && <button class="btn mt-3 py-2 w-100 rounded-5 fw-bold btn-success" type="button" disabled>
                                            <span class="spinner-border me-2 spinner-border-sm" role="status" aria-hidden="true"></span>
                                            Please Wait...
                                        </button>}
                                    </div>
                                </form>

                                <p className="fw-bolder">
                                    Forget Password? <Link className='text-decoration-none text-success' to="/forget-password">reset!</Link>
                                </p>

                            </div>
                        </div>
                    </div>
                    <div className="col-md-6 text-center">
                        <p className="mb-0">
                            Not have an Account? <Link to="/register" className='text-success text-decoration-none fw-bold'>Please Register First</Link>
                        </p>
                        <img src="register.png" className='img-fluid' alt="Register user" />

                    </div>
                </div>
            </div>
        </div>
    );
};

export default Login;