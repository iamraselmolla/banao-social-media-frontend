import React from 'react';
import { AiOutlineComment } from 'react-icons/ai';

const Comment = ({ sinleComment }) => {
    const { comment, commentorInfo, commentTime } = sinleComment
    return (
        <div className='py-1 my-1 d-flex'>
            <AiOutlineComment className='fs-3 text-success me-3' style={{ cursor: 'pointer' }}></AiOutlineComment>
            <div>
                <p className="fw-bold mb-0">
                    {comment}
                </p>
                <div className='d-flex gap-4'>
                    <div>
                        Commented By: {commentorInfo?.username}
                    </div>
                    <div>
                        Commented at: {new Date(commentTime).toLocaleString('GB')}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Comment;