'use server';

import { db } from "@/db";
import { redirect } from "next/navigation";

// export default async function createSnippet(formData: FormData) {
//     // Check the user's input s and make sure that they are valid
//     const title = formData.get('title') as string;
//     const code = formData.get('code') as string;

//     // Create the snippet
//     const snippet = await db.snippet.create({
//         data: {
//             title,
//             code
//         }
//     });

//     console.log('Snippet created:', snippet);
// }

export async function editSnippet(id: number, code: string) {
    await db.snippet.update({
        where: {
            id
        },
        data: {
            code
        }
    });

    redirect('/snippets/' + id);
}

export async function deleteSnippet(id: number) {
    await db.snippet.delete({
        where: { id }
    });

    redirect('/');
}