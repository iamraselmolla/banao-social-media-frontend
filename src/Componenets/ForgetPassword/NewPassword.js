import React, { useContext, useState } from 'react';
import toast from 'react-hot-toast';
import { OtpContext } from './ForgetPass';
import { useNavigate } from 'react-router-dom';

const NewPassword = () => {
    const { email } = useContext(OtpContext)
    const [newPass, setNewPass] = useState({
        pass1: '',
        pass2: ''
    });
    const navigate = useNavigate()
    const handleChange = (e) => {
        const { name, value } = e.target;
        setNewPass((prevPass) => ({
            ...prevPass,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!email) {
            toast.error("something Wrong")
        }
        // Validation
        if (newPass.pass1 === '' || newPass.pass2 === '') {
            toast.error('Please fill in both password fields.')
            return;
        }

        if (newPass.pass1 !== newPass.pass2) {
            toast.error('Passwords do not match. Please re-type them.')
            return;
        }
        if (newPass.pass1.length <= 5) {
            {
                return toast.error("Please use minimum 6 digits passwords")
            }
        }
        const result = await fetch('https://banao-social-media-server-mu.vercel.app/reset-password',
            {
                method: 'PUT',
                headers: {
                    'content-type': 'application/json'
                },
                body: JSON.stringify({ password: newPass.pass1, email: email })
            })
            .then(res => res.json())
            .then(data => {
                if (data?.statusCode === 200) {
                    toast.success("Password changed successfully");
                    navigate('/login')
                }

            })
            .catch(err => console.log(err.message))




    };

    return (
        <div className='container'>
            <div className="row">
                <form onSubmit={handleSubmit}>
                    <div className="mb-3">
                        <label htmlFor="exampleInputPassword1" className="form-label">New Password</label>
                        <input
                            type="password"
                            className="form-control w-100"
                            id="exampleInputPassword1"
                            name="pass1"
                            value={newPass.pass1}
                            onChange={handleChange}
                        />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="exampleInputPassword2" className="form-label">Re-type Password</label>
                        <input
                            type="password"
                            className="form-control w-100"
                            id="exampleInputPassword2"
                            name="pass2"
                            value={newPass.pass2}
                            onChange={handleChange}
                        />
                    </div>
                    <button type="submit" className='btn btn-primary'>Save Password</button>
                </form>
            </div>
        </div>
    );
};

export default NewPassword;
