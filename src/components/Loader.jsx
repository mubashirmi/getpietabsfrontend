const Loader = () => {
  return (
    <div className='w-[100vw] h-[100vh] bg-[#f4f4f4] absolute top-0 left-0 flex justify-center items-center'>
<div className="blobs">
	<div className="blob-center"></div>
	<div className="blob"></div>
	<div className="blob"></div>
	<div className="blob"></div>
	<div className="blob"></div>
	<div className="blob"></div>
	<div className="blob"></div>
</div>
<svg xmlns="http://www.w3.org/2000/svg" version="1.1">
  <defs>
    <filter id="goo">
      <feGaussianBlur in="SourceGraphic" stdDeviation="10" result="blur"></feGaussianBlur>
      <feColorMatrix in="blur" mode="matrix" values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 18 -7" result="goo"></feColorMatrix>
      <feBlend in="SourceGraphic" in2="goo"></feBlend>
  	</filter>
  </defs>
</svg>
    </div>
  )
}

export default Loader
