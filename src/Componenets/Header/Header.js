import React, { useContext, useEffect, useState } from 'react';
import { toast } from 'react-hot-toast';
import { AiOutlineSearch } from 'react-icons/ai';
import { FaFacebook, FaHandshake } from 'react-icons/fa'
import { FcGoogle } from 'react-icons/fc'
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../AuthContext/AuthProvider';

const Header = () => {
    const authCtx = useContext(AuthContext);
    const user = authCtx.isLoggedIn
    const parsedData = JSON.parse(authCtx.userData)
    const handleLogout = authCtx.logout
    const navigate = useNavigate()


    return (
        <header className='container py-4'>
            <div className="d-md-flex d-none d-sm-none justify-content-between">
                <div>
                    <Link to="/"><img src="img/logo.png" alt="" /></Link>
                </div>

                <form>

                    <div className='d-flex align-items-center rounded-5 px-3 border'>
                        <AiOutlineSearch className='fs-4'></AiOutlineSearch> <input placeholder='Search for your favorite groups in ATG' type="text" className="form-control search-input border-0 rounded-5" id="exampleInputPassword1" />
                    </div>


                </form>
                <div>
                    <span className="fw-bolde">
                        {user && <span className="fw-bolder"> <FaHandshake className="fs-3 me-2"></FaHandshake> Hi {parsedData?.username} </span>}
                    </span>
                    {!user && <><Link to="/login" className='text-decoration-none text-success fw-bolder px-3'>Login</Link>
                        <Link to="/register" className='text-decoration-none text-success fw-bolder px-3'>Register</Link></>}
                    {user && <span onClick={handleLogout} style={{ cursor: 'pointer' }} className='text-decoration-none text-success fw-bolder px-3'>Logout</span>}
                </div>
            </div>







        </header>
    );
};

export default Header;