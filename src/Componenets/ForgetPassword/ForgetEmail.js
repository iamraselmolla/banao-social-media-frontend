import React, { useContext, useState } from 'react';
import toast from 'react-hot-toast';
import { OtpContext } from './ForgetPass';
import { useNavigate } from 'react-router-dom';


const ForgetEmail = () => {
    const [mailInput, setMailInput] = useState()
    const { setEmail, setPage } = useContext(OtpContext)
    const [loading, setLoading] = useState(false)


    const handleReset = (e) => {
        e.preventDefault();


        if (!mailInput) {
            return toast.error("Please provide an email for OTP to change the password");
        }

        setLoading(true)
        fetch('https://banao-social-media-server-mu.vercel.app/forget-password', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ mailInput }),
        })
            .then((res) => {
                if (res.status === 400) {
                    toast.error("User not found")
                    throw new Error('User not found. Please register')

                }
                if (!res.ok) {
                    setLoading(false)
                    throw new Error(`HTTP error! Status: ${res.status}`);
                }


            })
            .then(data => {
                if (data?.statusCode === 400) {
                    return;
                }
                toast.success('OPT has been sent to your email')

                setEmail(mailInput);
                setPage('otp');
                setLoading(false)
            })
            .catch(err => {
                setLoading(false)
                console.error(err);
            });
    };
    return (
        <form onSubmit={handleReset}>
            <input onChange={(e) => setMailInput(e.target.value)} placeholder='email' name="email" type="email" className="form-control rounded-0 fw-bold py-2 rounded-5 text-muted" id="firstnameinput11" />
            <label>Please input your account email to reset password</label>
            {!loading && <button type="submit" className="btn mt-3 py-2 w-100 rounded-5 fw-bold btn-success">Reset Password</button>}
            {loading && <button className="btn mt-3 py-2 w-100 rounded-5 fw-bold btn-success" type="button" disabled>
                <span className="spinner-border me-2 spinner-border-sm" role="status" aria-hidden="true"></span>
                Please Wait...
            </button>}
        </form>
    );
};

export default ForgetEmail;