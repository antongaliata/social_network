import {addPostAC, changeTextInputPostAC, handlerLikeAC, postsType, postInProfileReducer} from "./post-in-profile-reducer";

let startState: postsType = {
    posts: [],
    textInput: ''
}

beforeEach(()=>{
    startState = {
        posts: [{id: '1', message: '', like: 0}],
        textInput: 'new post'
    }
})


test('add text in input',()=>{
    const action = changeTextInputPostAC('new text')
    const endState =  postInProfileReducer(startState,action)

    expect(endState.textInput).toBe('new text')
})

test('add post', ()=>{
    const action = addPostAC()
    const endState = postInProfileReducer(startState, action)

    expect(endState.posts[0].message).toBe('new post')
    expect(endState.posts[0].like).toBe(0)
    expect(endState.posts[0].id).toBeTruthy()
})

test('add like is post', ()=>{
    const action = handlerLikeAC('1')
    const endState = postInProfileReducer(startState, action)

    expect(endState.posts[0].like).toBe(1)

} )

