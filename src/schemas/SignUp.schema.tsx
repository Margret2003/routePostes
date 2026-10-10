import * as zod from "zod"



export  let schema = zod
  .object({
    name: zod
      .string()
      .min(2, "min length is 2 char")
      .max(40, "max length is 40 char"),
    username: zod.string().optional(),
    email: zod
      .string()
      .regex(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/),
    dateOfBirth: zod.coerce.date(),
    gender: zod.enum(["male", "femail"]),
    password: zod.string().regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*]).{8,}$/),
    rePassword: zod.string().regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*]).{8,}$/),
  })
  .refine(
    function (values) {
      return values.password == values.rePassword;
    },
    {
      path: ["rePassword"],
      error: "password doesn't match repassword",
    },
  );

export type signupType = zod.infer<typeof schema>