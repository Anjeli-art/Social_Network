import {addPostActionCreator, deletePostActionCreator, InitialProfilePageType, profileReducer} from "./profile-reducer";



let initialstate: InitialProfilePageType = {
    posts: [
        {id: 1, message: "vy hhhhh", likecount: 3},
        {id: 2, message: "vvv", likecount: 4}],
    profile: {
        "aboutMe": "",
        "contacts": {
            "facebook": "",
            "website": null,
            "vk": "",
            "twitter": "",
            "instagram": "",
            "youtube": null,
            "github": "",
            "mainLink": null
        },
        "lookingForAJob": true,
        "lookingForAJobDescription": "",
        "fullName": "",
        "userId": 19622,
        "photos": {
            "small": "",
            "large": ""
        }
    },
    status: "",
    errorMessage: "",
    flagEditMode: false,
    errorStatus: false,
    errorStatusText: ""
}

it("message new post should be correct",()=>{
let action=addPostActionCreator("it-kamasutra.com")
let newState=profileReducer(initialstate,action)
    expect(newState.posts[2].message).toBe("it-kamasutra.com")
})
it("post length should be incremented",()=>{
    let action=addPostActionCreator("it-kamasutra.com")
    let newState=profileReducer(initialstate,action)
    expect(newState.posts.length).toBe(3)
})

it("after deliting length of post should be decrement",()=>{
    let action=deletePostActionCreator(2)
    let newState=profileReducer(initialstate,action)
    expect(newState.posts.length).toBe(1)
})

it("after deliting length of post should not be decrement if id incorrect",()=>{
    let action=deletePostActionCreator(100)
    let newState=profileReducer(initialstate,action)
    expect(newState.posts.length).toBe(2)
})
