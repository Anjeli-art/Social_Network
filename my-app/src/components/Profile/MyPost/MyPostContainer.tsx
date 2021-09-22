import React from "react";
import {addPostActionCreator, initialProfilePageType, upDateNewPostActionCreator} from "../../../redux/profile-reducer";
import {MyPost} from "./MyPost";
import {Store} from "redux";
import {ActionValuesType, RootStateType} from "../../../redux/redux-store";
import { connect } from "react-redux";



// export type propsTypeMyPost = {
//     // store: Store<RootStateType, ActionValuesType>
//     // posts: PostType[]
//     // dispatch:(action:ActionValuesType)=>void
//     // NewPost: string
// }
// export const MyPostContainer: React.FC<propsTypeMyPost> = (props) => {

    // let state = props.store.getState()
    //
    // let onButtonClick = () => {
    //     let action = addPostActionCreator()
    //     props.store.dispatch(action);
    // }
    // let onChangeText = (text: string) => {
    //     let action = upDateNewPostActionCreator(text)
    //     props.store.dispatch(action);
    // }


//     return (
//         <StoreContext.Consumer>
//             {(store) => {
//                 let state = store.getState()
//
//                 let onButtonClick = () => {
//                     let action = addPostActionCreator()
//                     store.dispatch(action);
//                 }
//                 let onChangeText = (text: string) => {
//                     let action = upDateNewPostActionCreator(text)
//                     store.dispatch(action);
//                 }
//
//                 return <MyPost updateNewPostText={onChangeText} addPost={onButtonClick} posts={state.profilepage.posts}
//                         NewPost={state.profilepage.NewPost}/>}}
//         </StoreContext.Consumer>
//     )
//
// }

type mapDispatch={
    updateNewPostText:(text:string)=>void,
    addPost:()=>void
}

const mapStateToProps=(state:RootStateType):initialProfilePageType=>{
    return{
        posts:state.profilepage.posts,
        NewPost:state.profilepage.NewPost,
    }
}
const mapDispatchToProps=(dispatch:(action: ActionValuesType)=>void):mapDispatch=>{
    return{
        updateNewPostText:(text:string)=>{dispatch(upDateNewPostActionCreator(text)) },
        addPost:()=>{dispatch(addPostActionCreator())},
    }
}

export const MyPostContainer=connect(mapStateToProps,mapDispatchToProps)(MyPost)