import React, { useState } from 'react';
import axios from 'axios';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import "../components/admin/styles/adminlogin.css";
import { ApiPath } from '../config';

const BlogComment = () => {
  const [comment, setCommentData] = useState({
    comment: '',
    name: '',
    email: '',
  });

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        `${ApiPath}jaavapotcomments/api/comments`,
        // 'https://pagoanalytics.azurewebsites.net/jaavapotcomments/api/comments',
        {
          comment: comment.comment,
          name: comment.name,
          email: comment.email,
        }
      );
      if (response.status === 200) {
        setCommentData({ comment: '', name: '', email: '' });
        alert('Thank you for your Comment');
      }
    } catch (error) {
      alert('Error submitting comment');
      console.error(error);
    }
  };

  const onChange = (e) => {
    setCommentData({ ...comment, [e.target.name]: e.target.value });
  };

  return (
    <div className="login-container">
      <Form
        className="formbgnew"
        // style={{ width: '50%',self }}
        onSubmit={handleSubmit}
      >
        <div className="text-center m-5">
          <h3>Leave a Reply</h3>
        </div>
        <div className="m-3">
          <Form.Label>Comment</Form.Label>
          <Form.Control
            as="textarea"
            rows="4"
            name="comment"
            value={comment.comment}
            onChange={onChange}
            aria-describedby="emailHelp"
          />
        </div>
        <div className="m-3">
          <Form.Label>Name</Form.Label>
          <Form.Control
            type="text"
            name="name"
            value={comment.name}
            onChange={onChange}
            aria-describedby="emailHelp"
          />
        </div>
        <div className="m-3">
          <Form.Label>Email address</Form.Label>
          <Form.Control
            type="email"
            name="email"
            value={comment.email}
            onChange={onChange}
            aria-describedby="emailHelp"
          />
        </div>

        <Button type="submit" className="m-3 btn btn-danger">
          POST COMMENT
        </Button>
      </Form>
    </div>
  );
};

export default BlogComment;
