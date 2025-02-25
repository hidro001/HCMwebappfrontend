


// // src/components/common/FullScreenLoader.jsx
// import React from "react";
// import { FidgetSpinner } from "react-loader-spinner";

// export default function FullScreenLoader() {
//   return (
//     <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
//       <FidgetSpinner
//         // visible={true}
//         // height="160"
//         // width="160"
//         // ariaLabel="fidget-spinner-loading"
//         // wrapperStyle={{}}
//         // wrapperClass=""
//         // ballColors={["#ff0000", "#00ff00", "#0000ff"]}
//         // backgroundColor="#333" // or any color you like
//         visible={true}
//         height="160"
//         width="160"
//         ariaLabel="fidget-spinner-loading"
//         wrapperStyle={{}}
//         wrapperClass="fidget-spinner-wrapper"
//       />
//     </div>
//   );
// }


// src/components/common/FullScreenLoader.jsx


import React from "react";
import { FidgetSpinner } from "react-loader-spinner";
import BaseModal from "./BaseModal";


export default function FullScreenLoader() {
  return (
    <BaseModal isOpen={true} onClose={() => {}}>
      <FidgetSpinner
        visible={true}
        height="160"
        width="160"
        ariaLabel="fidget-spinner-loading"
        wrapperStyle={{}}
        wrapperClass="fidget-spinner-wrapper"
      />
    </BaseModal>
  );
}
