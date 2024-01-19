import React, { useContext } from 'react';

import { useEffect } from 'react';
import { useState } from 'react';
import Post from '../../../../shared/Post';
import { AiFillEdit } from 'react-icons/ai';
import { AuthContext } from '../../../../AuthContext/AuthProvider';
import { toast } from 'react-hot-toast';
import Modal from 'react-bootstrap/Modal';
import { Button } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { userActions } from '../../../../redux/userSlice';
import { useNavigate } from 'react-router-dom';

const PostSection = () => {
    const authCtx = useContext(AuthContext)
    const user = authCtx.isLoggedIn
    const { userData } = authCtx
    const parsedUser = JSON.parse(userData)
    const { allpost, refresh } = useSelector(state => state.user)
    const [posts, setPosts] = useState([]);
    const [show, setShow] = useState(false);
    const [editPost, setEditPost] = useState(null);
    const navigate = useNavigate()

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const dispatch = useDispatch()
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch('https://banao-social-media-server-mu.vercel.app/posts', {
                    method: 'GET',
                    mode: 'cors',
                    headers: {
                        'Content-Type': 'application/json',
                        // Add any additional headers if required
                    },
                });

                if (!response.ok) {
                    throw new Error(`HTTP error! Status: ${response.status}`);
                }

                const data = await response.json();
                setPosts(data);
                dispatch(userActions.setallPost(data));
            } catch (error) {
                console.error('Error fetching data:', error.message);
            }
        };

        fetchData(); // Call the async function

    }, [refresh, dispatch]);
    const handlePost = (e) => {
        e.preventDefault()
        if (!user) {
            navigate("/login")
            return toast.error("Please login first to post something")
        }
        if (!parsedUser?.username) {
            return toast.error("Login again please")
        }
        if (!e.target.postText.value) {
            return toast.error("Please write something")
        }


        const postData = e.target.postText.value;
        const postedTime = new Date().getTime();
        const usermail = parsedUser?.email;
        const userInfo = { username: parsedUser?.username, usermail: parsedUser?.email }
        const likes = [];
        const comments = []
        const allDataInfo = { postData, postedTime, userInfo, likes, comments };
        fetch('https://banao-social-media-server-mu.vercel.app/posts', {
            method: 'POST',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(allDataInfo)
        })
            .then(res => res.json())
            .then(data => {
                dispatch(userActions.setRefresh())
                toast.success('Your post has been shared successfully')
                e.target.reset()

                dispatch(userActions.setRefresh())
            })
            .catch(err => console.log(err.message))

    }
    const handleUpdate = (e) => {
        e.preventDefault()
        handleClose();
        const editedPost = e.target.editpostText.value;
        fetch(`https://banao-social-media-server-mu.vercel.app/edit-post/${editPost?._id}`, {
            method: 'PUT',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify({ editedPost })
        })
            .then(res => res.json())
            .then(data => {
                dispatch(userActions.setRefresh())
                toast.success("Post updated");

            })
            .catch(err => console.log(err.message))
    }
    return (
        <section>

            <div className="container position-relative">
                <div className="row">
                    <div className="col-md-8">
                        <h2 className="fw-bolder mb-4">
                            All Posts ({allpost?.length})
                        </h2>
                        {posts?.map(singlePost => <Post setEditPost={setEditPost} handleShow={handleShow} key={singlePost?._id} post={singlePost}></Post>)}
                        <a href="#post">
                            <div className="post-btn d-block d-sm-block d-md-none">
                                <AiFillEdit></AiFillEdit>
                            </div>
                        </a>
                    </div>
                    <div id='post' className="col-md-4 position-relative">
                        <div className="position-sticky mt-3 top-0">
                            <h2 className="fw-bolder mb-4">
                                Write a Post <AiFillEdit></AiFillEdit>
                            </h2>
                            <form onSubmit={handlePost}>
                                <div className="mb-3">
                                    <textarea name='postText' className="form-control" placeholder="Write your thought..." id="floatingTextarea"></textarea>
                                </div>
                                {/* <div className="mb-3">
                                <input name='postFile' className="form-control" type="file" id="formFile" />
                            </div> */}
                                <button type="submit" className="btn mt-1 py-2 w-100 rounded-5 fw-bold btn-success">Post</button>
                            </form>

                        </div>
                    </div>
                </div>
            </div>


            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Edit Post</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <form onSubmit={handleUpdate}>
                        <div className="mb-3">
                            <textarea defaultValue={editPost?.postData} name='editpostText' className="form-control" id="floatingTextarea"></textarea>
                        </div>
                        <Modal.Footer>
                            <Button variant="secondary" onClick={handleClose}>
                                Close
                            </Button>
                            <Button type="submit" variant="primary">
                                Save Changes
                            </Button>
                        </Modal.Footer>
                    </form>

                </Modal.Body>

            </Modal>
        </section>
    );
};

export default PostSection;