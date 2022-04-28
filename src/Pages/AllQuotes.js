import { useEffect } from "react";
import NoQuotesFound from "../components/quote/NoQuotesFound";
import QuoteList from "../components/quote/QuoteList";
import LoadingSpinner from "../components/UI/LoadingSpinner";
import useHttp from "../hooks/use-http";
import { getAllQuotes } from "../lib/api";


const AllQuotes =()=>{

    const {sendRequest,data:receivedQuoteData,status,error} = useHttp(getAllQuotes,true);

    useEffect(()=>{
        sendRequest()
    },[sendRequest])

    if(status==='pending'){
        return <div className="centered"><LoadingSpinner/></div>
    }
    if(error){
        return <p className="centered focused">{error}</p>
    }
    if(status==='completed' && (!receivedQuoteData || receivedQuoteData.length === 0)){
        
            return <NoQuotesFound/>
        
    }
    return(
        <QuoteList quotes={receivedQuoteData}/>
    )

};
export default AllQuotes;