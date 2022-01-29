// import React from "react";
//
// import styled from "styled-components";
// import AnimatedComponent from "./AnimatedComponent";
//
// const LoaderComp = styled.div`
//   position: absolute;
//   width: 100%;
//   height: 100vh;
//   display: flex;
//   align-items: center;
//   justify-content: center;
//   background: rgba(255, 255, 255, 0.85);
//   left: 0;
//   top: 0;
//   z-index: 100000;
// `;
//
// const Loader = () => {
//   return (
//     <LoaderComp>
//       <AnimatedComponent>
//         <img
//           width={50}
//           src="https://gist.githubusercontent.com/maxovsanyuk/cebb7b4e2bf2111eb6155f8aa5147ec0/raw/cacd474444aae18dfb9dc6ce61e43845b394e70a/loader.svg"
//           alt="loader"
//         />
//       </AnimatedComponent>
//     </LoaderComp>
//   );
// };
//
// export default Loader;

import React from "react";

import styled from "styled-components";

const LoaderComponent = styled.div`
  width: 100%;
  height: 100%;
  position: fixed;
  top:0;
  left:0;
  background: rgba(255, 255, 255, 0.8);
  z-index: 100000;

  .container {
    width: 112px;
    height: 112px;
    transform: scale(0.8);
    position: absolute;
    top: 50%;
    left: 50%;
    margin-right: -50%;
    transform: translate(-50%, -50%);
    padding-left: 0;
    padding-right: 0;
  }

  .box1,
  .box2,
  .box3 {
    border: 16px solid #1A4F95;
    box-sizing: border-box;
    position: absolute;
    display: block;
  }

  .box1 {
    width: 112px;
    height: 48px;
    margin-top: 64px;
    margin-left: 0;
    animation: ${({ animationConfig }) =>
    `anime1 ${animationConfig?.duration} ${animationConfig?.delay} forwards ${animationConfig?.timeFunction} infinite;`};
  }

  .box2 {
    width: 48px;
    height: 48px;
    margin-top: 0;
    margin-left: 0;
    animation: ${({ animationConfig }) =>
    `anime2 ${animationConfig?.duration} ${animationConfig?.delay} forwards ${animationConfig?.timeFunction} infinite;`};
  }
  .box3 {
    width: 48px;
    height: 48px;
    margin-top: 0;
    margin-left: 64px;
    animation: ${({ animationConfig }) =>
    `anime3 ${animationConfig?.duration} ${animationConfig?.delay} forwards ${animationConfig?.timeFunction} infinite;`};
  }

  @keyframes anime1 {
    0% {
      width: 112px;
      height: 48px;
      margin-top: 64px;
      margin-left: 0;
    }

    12.5% {
      width: 48px;
      height: 48px;
      margin-top: 64px;
      margin-left: 0;
    }

    25% {
      width: 48px;
      height: 48px;
      margin-top: 64px;
      margin-left: 0;
    }

    37.5% {
      width: 48px;
      height: 48px;
      margin-top: 64px;
      margin-left: 0;
    }

    50% {
      width: 48px;
      height: 48px;
      margin-top: 64px;
      margin-left: 0;
    }

    62.5% {
      width: 48px;
      height: 48px;
      margin-top: 64px;
      margin-left: 0;
    }

    75% {
      width: 48px;
      height: 112px;
      margin-top: 0;
      margin-left: 0;
    }

    87.5% {
      width: 48px;
      height: 48px;
      margin-top: 0;
      margin-left: 0;
    }

    100% {
      width: 48px;
      height: 48px;
      margin-top: 0;
      margin-left: 0;
    }
  }

  @keyframes anime2 {
    0% {
      width: 48px;
      height: 48px;
      margin-top: 0;
      margin-left: 0;
    }
    12.5% {
      width: 48px;
      height: 48px;
      margin-top: 0;
      margin-left: 0;
    }
    25% {
      width: 48px;
      height: 48px;
      margin-top: 0;
      margin-left: 0;
    }
    37.5% {
      width: 48px;
      height: 48px;
      margin-top: 0;
      margin-left: 0;
    }
    50% {
      width: 112px;
      height: 48px;
      margin-top: 0;
      margin-left: 0;
    }

    62.5% {
      width: 48px;
      height: 48px;
      margin-top: 0;
      margin-left: 64px;
    }

    75% {
      width: 48px;
      height: 48px;
      margin-top: 0;
      margin-left: 64px;
    }

    87.5% {
      width: 48px;
      height: 48px;
      margin-top: 0;
      margin-left: 64px;
    }

    100% {
      width: 48px;
      height: 48px;
      margin-top: 0;
      margin-left: 64px;
    }
  }

  @keyframes anime3 {
    0% {
      width: 48px;
      height: 48px;
      margin-top: 0;
      margin-left: 64px;
    }

    12.5% {
      width: 48px;
      height: 48px;
      margin-top: 0;
      margin-left: 64px;
    }

    25% {
      width: 48px;
      height: 112px;
      margin-top: 0;
      margin-left: 64px;
    }

    37.5% {
      width: 48px;
      height: 48px;
      margin-top: 64px;
      margin-left: 64px;
    }

    50% {
      width: 48px;
      height: 48px;
      margin-top: 64px;
      margin-left: 64px;
    }

    62.5% {
      width: 48px;
      height: 48px;
      margin-top: 64px;
      margin-left: 64px;
    }

    75% {
      width: 48px;
      height: 48px;
      margin-top: 64px;
      margin-left: 64px;
    }

    87.5% {
      width: 48px;
      height: 48px;
      margin-top: 64px;
      margin-left: 64px;
    }
    100% {
      width: 112px;
      height: 48px;
      margin-top: 64px;
      margin-left: 0;
    }
  }
`;

const animationConfig = {
    timeFunction: "ease-in-out",
    duration: "2s",
    delay: "0s",
};

function Loader(){
  return (
    <LoaderComponent
      animationConfig={animationConfig}
      scrollY={window.screenX}>
      <div className="container">
          <div className="box1" />
          <div className="box2" />
          <div className="box3" />
      </div>
    </LoaderComponent>
  )
}

export default Loader

//TODO: Loader is not reproducing
