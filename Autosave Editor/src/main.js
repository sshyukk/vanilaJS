import { getItem, setItem } from "./storage.js"
import Editor from "./Editor.js"
import App from "./App.js"


const $target = document.querySelector('#app')

// new App({ $target })



// 로컬 스토리지에 값이 이미 있는 경우 초기 값 세팅.
const TEMP_POST_SAVE_KEY = 'temp-post'

const post = getItem(TEMP_POST_SAVE_KEY, {
    title: '',
    content: ''
})


// debounce 처리.
let timer = null

// 일단 PostsPage.js에 넣기 전에 main.js에서 시험을 해보자.
new Editor({ 
    $target,
    initialState: post,
    onEditing: (post) => {
        // debounce 처리.
        clearTimeout(timer)
        timer = setTimeout(() => {
            setItem(TEMP_POST_SAVE_KEY, {
                ...post,
                // 저장시간 측정.
                tempSaveDate: new Date()
            })
        }, 1000)
    },
 })




