'use server';

import { db } from "@/db";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";

export async function createSnippet(
    formState: {message: string}, 
    formData: FormData
) {
    try {
        // Check the user's input s and make sure that they are valid
        const title = formData.get('title');
        const code = formData.get('code');

        if (typeof title !== 'string' || title.length < 3) {
            return {
                message: "Title must be longer!"
            }
        }

        if (typeof code !== 'string' || code.length < 10) {
            return {
                message: "Code must be longer!"
            }
        }

        // Create the snippet
        const snippet = await db.snippet.create({
            data: {
                title,
                code
            }
        });

        console.log('Snippet created:', snippet);
    } catch (err: unknown) {
        console.error(err);
        return {
            message: err instanceof Error ? err.message : 'An error occurred!'
        }
    }
    

    // Redirect the user to the root route
    revalidatePath('/');
    redirect('/');
}

export async function editSnippet(id: number, code: string) {
    await db.snippet.update({
        where: {
            id
        },
        data: {
            code
        }
    });

    revalidatePath('/snippets/' + id);
    redirect('/snippets/' + id);
}

export async function deleteSnippet(id: number) {
    await db.snippet.delete({
        where: { id }
    });

    revalidatePath('/');
    redirect('/');
}