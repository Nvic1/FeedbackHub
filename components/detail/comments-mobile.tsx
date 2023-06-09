'use client';


import { useProps } from "@/context/app-theme";
import Image from "next/image";

export const CommentsMobile = ({id}:{id:string}) =>{

    const {datastore, setDatastore, currentUser} = useProps();

    const ReplyComment = (event) =>   {
        
        event.preventDefault();
        const {target} = event;
        
        const message = target[0].value;
        const index = parseInt(target.id.at(-1))

        setDatastore(old => old.map((item) => {
            return item.id.toString() === id ? {...item, comments: {...item.comments.map(obj => {
                return obj.id === index ? {
                    ...obj,
    
                    replies: [

                         ...obj?.replies,                        
                        {
                            content: message,
                            replyingTo: 'mr.nobody',
                            user:{
                                image: currentUser.image,
                                name: currentUser.name,
                                username: currentUser.username
                            }
                        }
                    ]
                } : obj
            })}}: item
        }))

        
    }


    return (
        <>
        {
            datastore.filter(value => value.id.toString() === id).map((obj, i) => {
                const {comments} = obj;

                return (
                    <div key={i}>
                        {
                            comments.map((obj, i) => (
                                <div key={i} className="flex flex-col py-6">

                                <div className="flex items-center pb-6">
                                    <Image className='rounded-full mr-6' src={`/${obj.user.image}`} alt={obj.user.name} width={40} height={40} />
                                    <span className="flex-1">
                                        <h4 className="font-bold leading-20 tracking-close text-13x text-xSlate-600">{obj.user.name}</h4>
                                        <p className="text-13x font-normal text-xSlate-500">@{obj.user.username}</p>
                                    </span>
                                    <button type="button" aria-controls={`MobileReplyMain${obj.id}`} data-collapse-toggle={`MobileReplyMain${obj.id}`} className="font-semibold text-13x leading-19 cursor-pointer text-xIndigo-600 hover:underline hover:decoration-xIndigo-600">Reply</button>                                
                
                                </div>
                
                                <p className="leading-22 text-13x text-xSlate-500 font-normal pb-6">{obj.content}</p>

                                {/* reply box */}
                
                                <form id={`MobileReplyMain${obj.id}`} onSubmit={ReplyComment} className="hidden flex justify-between space-x-4">
                                        <div className="flex-1 h-20 rounded-md mb-2">
                                            <textarea  minLength={10} maxLength={205} rows={4} className=" focus:border focus:border-xIndigo-600 resize-none w-full h-full placeholder-slate-400  text-13x bg-xSiolet-50 rounded-xl px-6 py-4 outline-none  text-xSlate-600" placeholder="Type Your reply here"></textarea>
                
                                        </div>
    
                                        <div className="flex items-start">
                                            <button type="submit" className='flex px-4 py-2 bg-xFuchisia-600 hover:bg-fuchsia-500 rounded-lg'>
                                                <span className="leading-20 tracking-close font-bold text-13x text-xSiolet-50">Post Reply</span>
                                            </button>
                                        </div>
    
                
                                </form>
                
                                {/* reply box */}                    
                                
                
                
                                {
                                    obj.replies?.map((reply, i) => (
                                        <div key={i} className="flex flex-col">
                                        
                                            <div className="flex flex-col py-6 pl-6 pt-6">
                                                <div className="flex items-center pb-6">
                                                    <Image className='rounded-full mr-6' alt={reply.user.name} src={`/${reply.user.image}`} width={40} height={40} />
                                                    <span className="flex-1">
                                                        <h4 className="font-bold leading-20 tracking-close text-13x text-xSlate-600">{reply.user.user}</h4>
                                                        <p className="text-13x font-normal text-xSlate-500">@{reply.user.username}</p>
                                                    </span>
                                                    <h6 aria-controls={`MobileReplyChild${reply.id}`} data-collapse-toggle={`MobileReplyChild${reply.id}`} className="font-semibold text-13x leading-19 cursor-pointer text-xIndigo-600 hover:underline hover:decoration-xIndigo-600">Reply</h6>                                
                            
                                                </div>
                            
                                                <p className="leading-22 text-13x text-xSlate-500 font-normal">
                                                    <span className="font-bold text-13x text-xFuchisia-600">@{reply.replyingTo}&nbsp;</span>
                                                    {reply.content}
                                                </p>
                                            </div>

                                            <form id={`MobileReplyChild${reply.id}`} onSubmit={null} className="hidden flex justify-between space-x-4">
                                                <div className="flex-1 h-20 rounded-md mb-2 pl-14">
                                                    <textarea rows={4} minLength={10} maxLength={205} className=" focus:border focus:border-xIndigo-600 resize-none w-full h-full placeholder-slate-400  text-13x bg-xSiolet-50 rounded-xl px-6 py-4 outline-none  text-xSlate-600" placeholder="Type Your reply here"></textarea>
                                                </div>

                                                <div className="flex items-start">
                                                    <button type='submit'  className='flex px-6 py-3 bg-xFuchisia-600 hover:bg-fuchsia-500 rounded-lg'>
                                                        <span className="leading-20 tracking-close font-bold text-14x text-xSiolet-50">Post Reply</span>
                                                    </button>
                                                </div>
                                            </form> 

                                        </div>

                                    ))
                                    
                                }
                
                
                
                            </div>                                
                            ))
                        }
                    </div>
                );
        }
        

        
        
        )
}
        </>
)};