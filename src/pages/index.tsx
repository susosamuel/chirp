import Head from "next/head";

import {SignInButton, UserButton, useUser} from "@clerk/nextjs";
import {api} from "~/utils/api";

export default function Home() {

    const user = useUser()

    const {data} = api.post.getAllPosts.useQuery()


    return (
        <>
            <Head>
                <title>Create T3 App</title>
                <meta name="description" content="Generated by create-t3-app"/>
                <link rel="icon" href="/favicon.ico"/>
            </Head>
            <main
                className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-b from-[#2e026d] to-[#15162c]">
                <SignInButton/>
                <UserButton afterSignOutUrl="/"/>
                {user.user?.fullName}
                <div>
                    {data?.map((post) => (
                        <div key={post.id}>{post.content}</div>))}
                </div>
            </main>
        </>
    );
}
