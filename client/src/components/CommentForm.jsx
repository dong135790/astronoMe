import PropTypes from 'prop-types'
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useMutation } from '@apollo/client';

import { ADD_COMMENT } from '../utils/mutations';

import Auth from '../utils/auth';

const CommentForm = ({ blogpostId }) => {
  const [commentText, setCommentText] = useState('');

  const [addComment] = useMutation(ADD_COMMENT);

  const handleFormSubmit = async (event) => {
    event.preventDefault();

    try {
      await addComment({
        variables: {
          blogpostId,
          commentText,
          commentAuthor: Auth.getProfile().data.username,
        },
      });

      setCommentText('');
    } catch (err) {
      console.error(err);
    }
  };

  const handleChange = (event) => {
    const { name, value } = event.target;

    if (name === 'commentText' && value.length <= 280) {
      setCommentText(value);
    }
  };

  return (
    <div className='w-full '>
      {Auth.loggedIn() ? (
        <>
          <form
            className="flex flex-col justify-center items-center w-full font-body"
            onSubmit={handleFormSubmit}
          >
            <div className="w-full">
              <textarea
                name="commentText"
                placeholder="Add your comment..."
                value={commentText}
                className='mb-3 bg-gray-300 pl-2 pr-2 py-1 rounded text-darkest w-full leading-6'
                style={{resize: 'horizontal' }}
                onChange={handleChange}
              ></textarea>
            </div>

            <div className="flex justify-end w-full">
              <button className='px-4 py-2 bg-div-gray hover:bg-hover-blue rounded flex' type="submit">
                Add Comment
              </button>
            </div>
          </form>
        </>
      ) : (
        <p>
          You need to be logged in to comment. Please{' '}
          <Link to="/login">login</Link> or <Link to="/signup">signup.</Link>
        </p>
      )}
    </div>
  );
};

export default CommentForm;


CommentForm.propTypes = {
    blogpostId: PropTypes.string.isRequired,
  };
