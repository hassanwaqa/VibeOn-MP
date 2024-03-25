import { useContext } from "react";
import { LoaderContext } from "../context";

const useLoader = () => {
  const { setLoading } = useContext(LoaderContext);

  return { setLoading };
};

export default useLoader; 
