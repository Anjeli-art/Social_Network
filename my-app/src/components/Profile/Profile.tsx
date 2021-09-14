import React from "react";
import {ProfileInfo} from "./MyPost/ProfileInfo/ProfileInfo";
import {MyPostContainer} from "./MyPost/MyPostContainer";
import {Store} from "redux";
import {ActionValuesType, RootStateType} from "../../redux/redux-store";

export type propsTypeProfile = {
    // profile: PostType[]
    // dispatch: (action: ActionValuesType) => void
    // NewPost: string
    // store: Store<RootStateType, ActionValuesType>

}


export const Profile: React.FC<propsTypeProfile> = (props) => {

    return (
        <div>
            <ProfileInfo/>
            <MyPostContainer />
                {/*store={props.store} />*/}
        </div>
    )
}
// posts={props.profile} NewPost={props.NewPost} dispatch={props.dispatch}