import React, { createContext, useContext, useState } from 'react';
import { AuthContext } from '../AuthContext/AuthProvider';
import toast from 'react-hot-toast';
import ForgetEmail from './ForgetEmail';
import Otp from './Otp';
import NewPassword from './NewPassword';

export const OtpContext = createContext()
const ForgetPass = () => {
    const [page, setPage] = useState('forget')
    const [email, setEmail] = useState()
    const [generatedotp, setGeneratedOtp] = useState()

    function HandleOtpComponenet() {
        if (page === 'forget') return <ForgetEmail />
        if (page === 'otp') return <Otp />
        if (page === 'newpass') return <NewPassword />
    }

    const value = { page, setPage, email, setEmail, generatedotp, setGeneratedOtp }




    return (
        <OtpContext.Provider value={value}>
            <div className="container py-5">
                <div className="row">
                    <div className="col-md-6 offset-md-3">
                        <div className="border px-3 py-4 border-success border-2">
                            <h2 className="fw-bolder text-center ">
                                Reset Password
                            </h2>
                            <HandleOtpComponenet />
                        </div>
                    </div>
                </div>
            </div>
        </OtpContext.Provider>
    );
};

export default ForgetPass;