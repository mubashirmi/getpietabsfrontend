const ReferralFormComponent = ({ item }) => {
  return (
    <div className='bg-white rounded-[10px] p-5 flex flex-col gap-y-2.5'>
      <h4 className="font-medium text-xl">{item.heading}</h4>
      {item.description !== "none" && <p className="font-light text-sm">{item.description}</p>}
      {item.type === "text"?<input type="text" placeholder="Your Answer" className="outline-none rounded-none border-[1px] border-[#7C7C7C] p-2.5 placeholder:text-sm placeholder:text-[#333] text-sm placeholder:font-light font-light"/>:
        <div className="flex flex-col gap-y-2.5">
            {
                item.options.map((option,index)=>(
                    <label className="inline-flex items-center mr-6" key={index}>
                        <input type="radio" name={item.fieldName} value={option} className="form-radio w-[18px] h-[18px]"/>
                        <span className="ml-[6px] text-sm font-light">{option}</span>
                    </label>
                ))
            }
        </div>
      }
    </div>
  )
}

export default ReferralFormComponent
