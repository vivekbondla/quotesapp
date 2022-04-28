import { useEffect, useRef } from 'react';
import useHttp from '../../hooks/use-http';
import { addComment } from '../../lib/api';

import classes from './NewComment.module.css';

const NewComment = (props) => {
  const commentTextRef = useRef();

  const {sendRequest,status,error}=useHttp(addComment);
  const {onAddComment}=props

  const submitFormHandler = (event) => {
    event.preventDefault();

    // optional: Could validate here
    const enteredText = commentTextRef.current.value;

    sendRequest({commentData:{text:enteredText},quoteId:props.quoteId})
  };
  useEffect(()=>{

    if(status==='completed' && !error){
      onAddComment()

    }

  },[status,error,onAddComment])

  return (
    <form className={classes.form} onSubmit={submitFormHandler}>
      <div className={classes.control} onSubmit={submitFormHandler}>
        <label htmlFor='comment'>Your Comment</label>
        <textarea id='comment' rows='5' ref={commentTextRef}></textarea>
      </div>
      <div className={classes.actions}>
        <button className='btn'>Add Comment</button>
      </div>
    </form>
  );
};

export default NewComment;