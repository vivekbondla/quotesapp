import { useCallback, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import useHttp from '../../hooks/use-http';
import { getAllComments } from '../../lib/api';

import classes from './comments.module.css';
import NewComment from './NewComment';
import CommentsList from './CommentsList';
import LoadingSpinner from '../UI/LoadingSpinner';

const Comments = () => {
  const [isAddingComment, setIsAddingComment] = useState(false);
  const params = useParams();
  const{details}=params

  const {sendRequest,status,data:commentsData}=useHttp(getAllComments);

  


  const startAddCommentHandler = () => {
    setIsAddingComment(true);
  };

  const addCommentHandler=useCallback(()=>{
    sendRequest(details)

  },[sendRequest,details])

  useEffect(()=>{
    sendRequest(details);

  },[sendRequest,details])
  let comments;

  if(status === 'pending'){
    comments =<div className='centered'><LoadingSpinner/></div>
  }
  
  if(status === 'completed' && commentsData){
    comments = <CommentsList comments={commentsData}/>
  }

  if(status === 'completed' && ((!commentsData) || (commentsData.length === 0))){
    comments = <p className='centered'>No comments found</p>
  }

  
  return (
    <section className={classes.comments}>
      <h2>User Comments</h2>
      {!isAddingComment && (
        <button className='btn' onClick={startAddCommentHandler}>
          Add a Comment
        </button>
      )}
      {isAddingComment && <NewComment quoteId={details} onAddComment={addCommentHandler}/>}
      {comments}
    </section>
  );
};

export default Comments;