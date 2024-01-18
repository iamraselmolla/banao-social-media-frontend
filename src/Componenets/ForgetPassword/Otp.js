import React, { useContext, useState } from 'react';

import OtpInput from 'react-otp-input';
import { OtpContext } from './ForgetPass';
import toast from 'react-hot-toast';

const Otp = () => {
    const [otp, setOtp] = useState('');
    const { email, generatedotp, setPage } = useContext(OtpContext)
    const handleOtpMatching = () => {
        if (!generatedotp || !otp) {
            toast.error("Something wrong")
            return
        }
        if (parseInt(otp) !== generatedotp) {
            toast.error('OTP didn\'t match')
        }
        if (parseInt(otp) === generatedotp) {
            setPage('newpass')
            return
        }
    }
    return (
        <div className="otp_container">
            <p className="">
                Please provide the otp we sent to {email}
            </p>
            <div className="d-flex justify-content-center">
                <OtpInput
                    shouldAutoFocus={true}
                    value={otp}
                    onChange={setOtp}
                    numInputs={4}
                    inputStyle={{ width: '2em' }}
                    renderSeparator={<span>-</span>}
                    renderInput={(props) => <input className='mx-3' {...props} />}
                />
            </div>
            <div className="d-flex justify-content-evenly  mt-5">
                <button onClick={() => setOtp('')} className='btn btn-light border-1  border-dark  '>
                    Clear
                </button>
                <button onClick={handleOtpMatching} className='btn btn-primary  text-white'>
                    Verify
                </button>
            </div>
        </div>
    );
};

export default Otp;