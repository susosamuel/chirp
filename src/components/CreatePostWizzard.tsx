import {UserButton, useUser} from "@clerk/nextjs";
import {api} from "~/utils/api";
import {useState} from "react";

export const CreatePostWizzard = () => {
    const [input, setInput] = useState('')
    const {user} = useUser()

    const ctx = api.useContext()

    const {mutate, isLoading: isPosting} = api.post.createPost.useMutation({
        onSuccess: () => {
            setInput('')
            void ctx.post.getAllPosts.invalidate()
        }
    })

    if (!user) return null

    return (
        <div className="flex gap-3 w-full">
            <UserButton afterSignOutUrl="/"/>
            <input placeholder="Type some emojis!" className="bg-transparent grow outline-none" value={input}
                   onChange={(e) => setInput(e.target.value)} disabled={isPosting}/>
            <button onClick={() => mutate({content: input})}>Post</button>
        </div>
    )
}
