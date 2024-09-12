export default defineEventHandler(async event => {

    const body = await readBody(event) as {
        uid: string;
        server: string
    };

    // if (!body.uid)
    //     throw createError({
    //         message: "Uid required",
    //         status: 400,
    //         cause: "halo",

    //     })

    /**
     * 
     * Logic validation account id game 
     * or anytihing you want before create transaction
     */

    return {
        message: "success",
        result: {
            username: "ion.",
            uid: body.uid,
            server: ""
        }
    }
})