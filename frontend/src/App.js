import ErrorBoundary from "./error/errorBoundary";
import { useEffect, useState } from "react";
import AppRouter from "./routes/AppRouter";
import { useSelector } from "react-redux";
import ScrollToTop from "./components/common/ScrollToTop";
import Session from "./components/common/Session";
import { SESSION_TIMEOUT } from "./components/helpers/Helper";
import { useLocation } from "react-router";
import Chat from "./components/common/Chat";

const App = () => {
  const [visible, setVisible] = useState(false);
  const history = useLocation();

  const authToken = useSelector(
    (state) => state?.auth?.login?.data?.data?.token || null
  );

  //create session
  useEffect(() => {
    if (authToken) {
      if (SESSION_TIMEOUT(authToken)) setVisible(true);
    }
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }, [authToken, history]);

  return (
    <ErrorBoundary>
      <AppRouter />
      <Session visible={visible} setVisible={setVisible} />
      <ScrollToTop />
      <Chat token={authToken} />
    </ErrorBoundary>
  );
};

export default App;
