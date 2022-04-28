import { useEffect } from "react";
import { Link } from "react-router-dom";
import { useRouteMatch } from "react-router-dom";
import { useParams, Route } from "react-router-dom";
import Comments from "../components/comments/Comments";
import HighlightedQuote from "../components/quote/HighlightedQuote";
import LoadingSpinner from "../components/UI/LoadingSpinner";
import useHttp from "../hooks/use-http";
import { getSingleQuote } from "../lib/api";


const QuoteDetail = () => {
  const params = useParams();
  const match = useRouteMatch();

  const {details} = params

 const {sendRequest,status,data : receivedQuote,error}=useHttp(getSingleQuote);

 useEffect(()=>{
   sendRequest(details)

 },[sendRequest,details])

 
 if(status==='pending'){
  return <div className="centered"><LoadingSpinner/></div>
}
if(error){
  return <p className="centered focused">{error}</p>
}
if(!receivedQuote){
  
      return <p>No Quote Found</p>
  
}
  return (
    <>
      <HighlightedQuote text={receivedQuote.text} author={receivedQuote.author} />
      <Route path={match.path} exact>
      <div className="centered">
        <Link className="btn--flat" to={`${match.url}/comments`}>
          Load Comments
        </Link>
      </div>
      </Route>
      

      <Route path={`${match.path}/comments`}>
        <Comments />
      </Route>
    </>
  );
};
export default QuoteDetail;
