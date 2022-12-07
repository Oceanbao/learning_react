function Spinner() {
  return (
    <div className='relative inline-block h-16 w-16' aria-label='loading...'>
      <div className='absolute rounded-full border-4 border-solid border-[#bad] opacity-100' />
      <div className='absolute rounded-full border-4 border-solid border-[#bad] opacity-100' />
    </div>
  )
}

export default Spinner

// .lds-ripple div {
//   position: absolute;
//   border: 4px solid #bad;
//   opacity: 1;
//   border-radius: 50%;
//   animation: lds-ripple 1s cubic-bezier(0, 0.2, 0.8, 1) infinite;
// }
// .lds-ripple div:nth-child(2) {
//   animation-delay: -0.5s;
// }
// @keyframes lds-ripple {
//   0% {
//     top: 28px;
//     left: 28px;
//     width: 0;
//     height: 0;
//     opacity: 1;
//   }
//   100% {
//     top: -1px;
//     left: -1px;
//     width: 58px;
//     height: 58px;
//     opacity: 0;
//   }
// }
