const FlyerBenifits = ({title,text,imgSrc}) => {
  return (
    <div className="p-5 w-full rounded-[20px] shadow-black/15 shadow-lg flex flex-col border-[1px] border-[#f4f4f4]">
      <h4 className="font-semibold text-sm text-[#7C7C7C]">{title}</h4>
      <p className="gradient-text text-xl font-semibold">{text}</p>
      <div className="w-full">
        <img src={imgSrc} className="object-contain object-center w-full" alt="showcase image" />
      </div>
    </div>
  )
}

export default FlyerBenifits
