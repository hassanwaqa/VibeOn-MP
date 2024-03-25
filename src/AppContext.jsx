import { useState } from "react";

import { LoaderContext } from "./context";
import  Loader  from "./components/LoaderA.jsx";

const AppContext = ({ children }) => {
  const [loading, setLoading] = useState(false);

  return (
    <>
      <Loader visible={loading} />
      <LoaderContext.Provider value={{ loading, setLoading }}>
        {children}
      </LoaderContext.Provider>
    </>
  );
};

export default AppContext;
