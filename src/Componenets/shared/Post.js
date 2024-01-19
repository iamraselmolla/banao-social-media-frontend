import React, { useContext, useEffect, useState } from 'react';
import { toast } from 'react-hot-toast';

import { AiFillLike, AiOutlineComment, AiOutlineEdit, AiOutlineLike } from 'react-icons/ai';
import { MdOutlineDelete } from 'react-icons/md';
import { AuthContext } from '../AuthContext/AuthProvider';
import Comment from './Comment';
import { useDispatch } from 'react-redux';
import { userActions } from '../redux/userSlice';
import { useNavigate } from 'react-router-dom';

const Post = ({ post, handleShow, setEditPost, setReload, reload }) => {
    const authCtx = useContext(AuthContext)
    const user = authCtx.isLoggedIn
    const { userData } = authCtx
    const parsedUser = JSON.parse(userData)
    const [commentRealod, setCommentRealod] = useState(false);
    const [comments, setComments] = useState([]);
    const navigate = useNavigate()
    const { _id, postData, postedTime, userName } = post;
    const timePosted = new Date(postedTime).toLocaleString("en-GB")
    const dispatch = useDispatch()
    const handleDelete = (id) => {
        if (window.confirm('Do you want to delete this?')) {
            fetch(`https://banao-social-media-server-mu.vercel.app/delete-post/${_id}`, {
                method: 'DELETE'
            })
                .then(res => res.json())
                .then(data => {
                    toast.success("Post deleted successfully");
                    dispatch(userActions.setRefresh())

                })
                .catch(err => console.log(err.message))
        }
    }
    const handleUpdatePost = () => {
        setEditPost(post)
        handleShow()
    }
    const handleComment = (e) => {
        e.preventDefault()
        if (!user) {
            navigate("/login")
            return toast.error("please login first to comment")
        }
        if (!e.target.comment.value) {
            return toast.error("Please write something")
        }
        const commentorInfo = { username: parsedUser?.username, email: parsedUser?.email }
        const comment = e.target.comment.value;
        const commentTime = new Date().getTime()
        const commentData = { commentorInfo, comment, commentTime }
        fetch('https://banao-social-media-server-mu.vercel.app/comment', {
            method: 'PUT',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify({ postId: post?._id, commentData })
        })
            .then(res => res.json())
            .then(data => {
                e.target.reset()
                dispatch(userActions.setRefresh())
                toast.success("Comment shared successfully")
            })
            .catch(err => console.log(err.message))

    }


    const hanldeLike = () => {
        if (!authCtx.isLoggedIn) {
            navigate("/login")
            return toast.error("Please login First")
        }

        const username = parsedUser?.username


        fetch(`https://banao-social-media-server-mu.vercel.app/like`, {
            method: 'PUT',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify({ id: _id, username })
        })
            .then(res => res.json())
            .then(data => {
                if (data?.exist) {
                    dispatch(userActions.setRefresh())

                } else {
                    dispatch(userActions.setRefresh())


                }
            })
            .catch(err => console.log(err.message))
    }

    return (
        <div className='single-post border px-3 py-4 border-1 my-2 rounded'>
            <div cl className="fw-bolder position-relative">
                <span className="position-absolute" style={{ right: '-10px', top: '-20px' }}>

                    {user && parsedUser?.email === post?.userInfo?.usermail &&
                        <div className="d-flex">
                            <div><AiOutlineEdit onClick={handleUpdatePost} style={{ cursor: 'pointer' }} className="fs-4 text-success userhandleicon"></AiOutlineEdit></div>
                            <div>
                                <MdOutlineDelete style={{ cursor: 'pointer' }} onClick={() => handleDelete(_id)} className="fs-4 ms-2 text-danger userhandleicon"></MdOutlineDelete>
                            </div>

                        </div>
                    }

                </span>
                <p className="fw-bolder">
                    {postData}
                </p>

                <div className="d-flex text-muted">
                    <div>
                        Posted By: {post?.userInfo?.username}
                    </div>
                    <div className="ms-3">
                        Posted On: {timePosted}
                    </div>
                </div>

                <div className="d-flex fs-4 gap-3 mt-2">
                    <div>
                        {user && <p className='mb-0 fw-light fs-6'>
                            {(post?.likes.length)} liked this
                        </p>}
                        {!post?.likes.includes(parsedUser?.username) ?
                            <>
                                <AiOutlineLike style={{ cursor: 'pointer' }} className='text-success' onClick={hanldeLike}></AiOutlineLike>
                            </>
                            : <>
                                <AiFillLike style={{ cursor: 'pointer' }} className='text-success'></AiFillLike>
                            </>}
                    </div>

                </div>
                <p className="fs-4 mt-4 ">
                    <span className="text-success fw-bold">
                        All comments ({post?.comments?.length})
                    </span>
                </p>
                {comments && <>
                    <div className="ms-4 mt-3 fw-light">

                        {post?.comments?.map(sinleComment => <Comment key={sinleComment?._id} sinleComment={sinleComment}></Comment>)}
                    </div>
                </>}
                <><div className='mt-3'>
                    Write a Comment
                </div>
                    <form onSubmit={handleComment}>
                        <div className="mt-2">
                            <textarea name='comment' className="form-control" placeholder="Write your comment..." id="floatingTextarea"></textarea>
                            <button type="submit" className="btn mt-3 py-2 px-4 rounded-5 fw-bold btn-success">Comment</button>
                        </div>
                    </form></>

            </div>
        </div>
    );
};

export default Post;