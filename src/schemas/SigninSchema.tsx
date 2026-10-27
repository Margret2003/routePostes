import * as zod from "zod"


export let SigninSchema = zod.object({
    
    email: zod.string().regex(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/),
     password: zod.string().regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*]).{8,}$/),
});


export type SigninType = zod.infer<typeof SigninSchema>