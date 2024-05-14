import {asynchandler} from '../utils/asyncHandler.js';
import {ApiError} from "../utils/ApiError.js"
import {User} from '../models/user.models.js'
import { uploadOnCloudinary } from "../utils/cloudinary.js";
import { ApiResponse } from "../utils/ApiResponse.js"

const registerUser = asynchandler(async (req, res) => {
    // get user detail from frontend
    // validation - not empty
    // check if user already exists : username and email
    // check for images, check for avatar
    // upload them to cloudinary, avtar
    // create user object - create entry in db
    // remove password and refresh token field from response
    // check for user creation
    // return res


    const {email, username, passsword, fullname} = req.body
    
    const userExist = User.findOne({
        $or : [
            {username},
            {email}
        ]
    })

    if(userExist) {
        throw new ApiError(409, "user with email or username already exists")
    }

    const avatarLocalPath = req.files?.avatar[0]?.path
    const coverImageLocalPath = req.files?.coverImage[0]?.path

    if(!avatarLocalPath){
        throw new ApiError(400, "Avatar file is required")
    }

    const avatar = await uploadOnCloudinary(avatarLocalPath)
    const coverImage = await uploadOnCloudinary(coverImageLocalPath)

    if (!avatar) {
        throw new ApiError(400, "Avatar file is required")
    }

    const user = await User.create({
        fullname,
        avatar : avatar.url,
        coverImage : coverImage?.url ||  "",
        email,
        passsword,
        username :  username.toLowerCase()
    })

const createUser = await User.findById(user._id).select(
    "-password -refreshToken"
)

if(!createUser){
    throw new ApiError(500, "Internal server error")
}

return res.status(201).json(
    new ApiResponse(200, createUser, "user register successfully...")
);

}); 


export {
    registerUser
}