import {RouterOutputs} from "~/utils/api";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime"
import Image from "next/image";

dayjs.extend(relativeTime)

type PostViewWithUser = RouterOutputs["post"]["getAllPosts"][number]

export const PostView = (props: PostViewWithUser) => {
    const {post, author} = props
    return <div key={post.id} className="p-4 border-b border-slate-400 flex gap-3">
        <Image className="rounded-full h-10 w-10" src={author?.profilePicture ?? ''} alt={`userImg${author?.id}`}
               width={56} height={56}/>
        <div className="flex flex-col">
            <div className="flex text-slate-400 font-bold gap-2">
                <span>{`@${author?.username} `}</span><span
                className="font-thin">{` | ${dayjs(post.createdAt).fromNow()}`}</span>
            </div>
            <span>{post.content}</span>
        </div>
    </div>

}
