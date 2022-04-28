import React, { Suspense } from "react";
import { Redirect } from "react-router-dom";
import { Switch } from "react-router-dom";
import { Route } from "react-router-dom";
import Layout from "./components/Layout/Layout";
import LoadingSpinner from "./components/UI/LoadingSpinner";
//import AllQuotes from "./Pages/AllQuotes";
//import NewQuote from "./Pages/NewQuote";
//import NotFound from "./Pages/NotFound";
//import QuoteDetail from "./Pages/QuoteDetail";

function App() {
  const NewQuote = React.lazy(() => import("./Pages/NewQuote"));
  const NotFound = React.lazy(()=>import('./Pages/NotFound'));
  const QuoteDetail = React.lazy(()=>import('./Pages/QuoteDetail'));
  const AllQuotes = React.lazy(()=>import('./Pages/AllQuotes'));
  return (
    <Layout>
      <Suspense fallback={<LoadingSpinner/>}>
      <Switch>
        <Route path="/" exact>
          <Redirect to="/quotes" />
        </Route>
        <Route path="/quotes" exact>
          <AllQuotes />
        </Route>
        <Route path="/quotes/:details">
          <QuoteDetail />
        </Route>
        <Route path="/newquote">
          <NewQuote />
        </Route>
        <Route path="*">
          <NotFound />
        </Route>
      </Switch>
      </Suspense>
    </Layout>
  );
}

export default App;
