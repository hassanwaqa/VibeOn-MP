import Lottie from "lottie-react";

import LoaderAnimation from "../assets/animations/Loader.json";

const Loader = ({ visible }) => {
  if (!visible) return null;

  return (
    <div
      className="w-100 h-100 d-flex justify-content-center align-items-center position-fixed opacity-75 bg-white "
      style={{ zIndex: 99999 }}
    >
      <Lottie
        animationData={LoaderAnimation}
        loop
        autoPlay
        rendererSettings={{ preserveAspectRatio: "xMidYMid slice" }}
        width={10}
        height={10}
      />
    </div>
  );
};

export default Loader;
