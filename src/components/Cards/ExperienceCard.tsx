const ExperienceCard = ({ experience }: { experience: any }) => {
    return (
        <div className="w-[300px] md:w-[650px] rounded-[10px] shadow-[0_0_10px_rgba(0,0,0,0.1)] py-[10px] md:py-[12px] px-[10px] md:px-[16px] justify-between relative overflow-hidden bg-white/5 flex flex-col gap-[8px] md:gap-[12px] transition-all duration-300 ease-in-out hover:shadow-[0_0_20px_rgba(0,0,0,0.2)] hover:-translate-y-[5px] border-[0.1px] border-primary shadow-[0_4px_24px_rgba(23,92,230,0.15)] group">
            <div className="w-full flex gap-[12px]">
                <img 
                    src={experience.img} 
                    alt={experience.company}
                    className="h-[40px] w-[40px] md:h-[50px] md:w-[50px] object-cover bg-black rounded-[10px] shrink-0 mt-[4px]" 
                />
                <div className="w-full flex flex-col">
                    <div className="text-[14px] md:text-[18px] font-semibold text-text_primary/99">
                        {experience.role}
                    </div>
                    <div className="text-[12px] md:text-[14px] font-medium text-text_secondary/99">
                        {experience.company}
                    </div>
                    <div className="text-[10px] md:text-[12px] font-normal text-text_secondary/80">
                        {experience.date}
                    </div>
                </div>
            </div>
            
            <div className="w-full text-[12px] md:text-[15px] leading-[20px] md:leading-[24px] font-normal text-text_primary/99 mb-[10px]">
                {experience?.desc &&
                    <span className="overflow-hidden display-webkit-box max-w-full webkit-line-clamp-4 webkit-box-orient-vertical text-ellipsis group-hover:overflow-visible group-hover:webkit-line-clamp-unset line-clamp-4 group-hover:line-clamp-none">
                        {experience?.desc}
                    </span>
                }
                
                {experience?.skills && (
                    <>
                        <br />
                        <div className="w-full flex gap-[12px] -mt-[10px]">
                            <b>Skills:</b>
                            <div className="flex flex-wrap gap-[8px]">
                                {experience?.skills?.map((skill: string, index: number) => (
                                    <div key={index} className="text-[12px] md:text-[15px] font-normal text-text_primary/99">
                                        • {skill}
                                    </div>
                                ))}
                            </div>
                        </div>
                    </>
                )}
            </div>
            
            {experience.doc && (
                <a href={experience.doc} target="new">
                    <img 
                        src={experience.doc} 
                        alt="Document"
                        className="hidden group-hover:flex h-[70px] w-fit bg-black rounded-[10px] cursor-pointer hover:opacity-80" 
                    />
                </a>
            )}
        </div>
    )
}

export default ExperienceCard;