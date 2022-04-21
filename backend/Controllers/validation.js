import Joi from "joi";

export const signUpConsumerSchema = Joi.object({
  account: Joi.object({
    userName: Joi.string().alphanum().min(5).max(15).required(),
    email: Joi.string()
      .email({
        minDomainSegments: 2,
        tlds: { allow: ["com", "net"] },
      })
      .required(),
    password: Joi.string().min(5).max(15).required(),
    phoneNo: Joi.string().pattern(new RegExp("^[0-9]{10,12}$")).required(),
  }),

  profile: Joi.object({
    firstName: Joi.string().trim().min(1).max(25).required(),
    lastName: Joi.string().trim().max(25),
    age: Joi.number().integer().min(10).max(100).required(),
    sex: Joi.string().trim().min(4).max(6).required(),
    bio: Joi.string().trim().max(50),
  }),
});

// const { error, value } = schema.validate({ a: "a string" });
//If the input is valid, then the error will be undefined.
//  If the input is invalid, error is assigned a ValidationError object providing more information.

export const loginSchema = Joi.object({
  email: Joi.string().email({
    minDomainSegments: 2,
    tlds: { allow: ["com", "net"] },
  }),
  password: Joi.string().min(5).max(15).required(),
  phoneNo: Joi.string().pattern(new RegExp("^[0-9]{10,12}$")),
}).xor("email", "phoneNo");
//Possible validation errors: object.xor, object.missing

export const forgetPasswordSchema = Joi.object({
  email: Joi.string()
    .email({
      minDomainSegments: 2,
      tlds: { allow: ["com", "net"] },
    })
    .required(),
});
