import React, { useContext, useState } from 'react';

import OtpInput from 'react-otp-input';
import { OtpContext } from './ForgetPass';
import toast from 'react-hot-toast';

const Otp = () => {
    const [otp, setOtp] = useState('');
    const { email, setPage } = useContext(OtpContext)
    const [verify, setVerifying] = useState(false)
    const handleOtpMatching = () => {
        if (!otp) {
            toast.error("Please input the otp")
            return
        }
        setVerifying(true)
        fetch('https://banao-social-media-server-mu.vercel.app/match-otp', {
            method: 'POST',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify({ email, otp })
        })
            .then(res => res.json())
            .then(data => {
                if (data.statusCode === 400) {
                    return toast.error(data?.message)
                } else {
                    setPage('newpass')
                    setVerifying(false)
                    setOtp('')
                }
            })
            .catch(err => {
                toast.error("OPT didn't match")
                setVerifying(false)
                setOtp('')
            })
            .finally(() => {
                setVerifying(false)
                setOtp('')
            })

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
            {
                verify ? <div className='d-flex justify-content-center mt-4'>
                    <div className="spinner-grow" style={{ width: '3rem', height: '3rem' }} role="status">
                        <span className="visually-hidden">Loading...</span>
                    </div>
                </div>
                    :
                    <div className="d-flex justify-content-evenly  mt-5">
                        <button onClick={() => setOtp('')} className='btn btn-light border-1  border-dark  '>
                            Clear
                        </button>
                        <button onClick={handleOtpMatching} className='btn btn-primary  text-white'>
                            Verify
                        </button>
                    </div>
            }
        </div >
    );
};

export default Otp;