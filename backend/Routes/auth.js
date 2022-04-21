import express from "express";
import * as auth from "../Controllers/Auth/authentication.js";

const authRouter = express.Router();

authRouter.post("/login", auth.loginConsumer);
authRouter.post("/logout", auth.logoutUser);
authRouter.post("/signup", auth.signupConsumer);
authRouter.post("/verify/:emailCode", auth.verifyConsumer);
authRouter.post("/forget-password", auth.forgotPassword);
authRouter.post("/password-reset", auth.resetPassword);
authRouter.post("/refresh", auth.getAccessTokenUsingRefreshToken);

authRouter.get("/debug/allusers", auth.getAllUsers);
authRouter.get("/debug/deleteusers", auth.deleteAllUsers);

export default authRouter;

/*
Sign UP Consumer

http://localhost:5000/auth/signup

{
	"account":{
		"userName":"deepakdk",
		"email":"deepak@gmail.com",
		"password":"neasdf1234",
		"phoneNo":"9876543211"
	},
	"profile":{
		"firstName":"newdeepak",
		"lastName":"dk",//nr
		"age":25,
		"sex":"male",
		"bio":"i'm new so cool" //nr
	}
}

Verify Consumer

http://localhost:5000/auth/verify/XffORtq8s1ek26laA8KcD?email=deepak@gmail.com

{
	"password":"asdf1234"
}

Login Consumer

http://localhost:5000/auth/login

{
		"password":"asdf1234",
		"email":"deepak@gmail.com"
}


Forget Password

http://localhost:5000/auth/forget-password

{
		"email":"deepak@gmail.com"
}

Reset Password

http://localhost:5000/auth/password-reset?resetToken=XffORtq8s1ek26laA8KcD

{
		"password":"NEW-asdf1234",

}

Get Access Token using Refresh token

http://localhost:5000/auth/refresh
- sent a cokkie named jwt in req.cokkie

To get all users

http://localhost:5000/auth/debug/allusers?key=iamadmin

To delete all users

http://localhost:5000/auth/debug/deleteusers?key=iamadmin

*/
