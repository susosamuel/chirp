import {UserButton, useUser} from "@clerk/nextjs";

export const CreatePostWizzard = () => {
    const {user } = useUser()

    if(!user) return null

    return (
        <div className="flex gap-3 w-full">
            <UserButton afterSignOutUrl="/"/>
            <input placeholder="Type some emojis!" className="bg-transparent grow outline-none"/>
        </div>
    )
}
