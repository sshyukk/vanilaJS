import { request } from "./api.js"
import PostList from "./PostList.js"

export default function PostsPage({
    $target
}) {
    // appendChild()하지 않는다. app.js에서 이 PostsPage 객체를 렌더링할 때 실행.
    const $postsPage = document.createElement('div')



    // [API 불러오기]
    // new PostList()의 값을 따로 appendChild()하지 않아도 되는 이유는?
    // 이미 PostList 객체 안에서 타겟을 받고 그 타겟을 appendChild하는 값이 있기 때문.
    const postList = new PostList({
        $target,
        initialState: []
    })
    const fetchPosts = async () => {
        const posts = await request('/posts')
    
        postList.setState(posts)
    }

    const $newPostButton = document.createElement('button')
    $newPostButton.textContent = 'New Post'
    $postsPage.appendChild($newPostButton)



    // 렌더함수에 append와 fetchPosts 실행.
    // app.js에서 이 PostsPage 객체를 렌더링할 때 append와 fetchPosts 실행.
    this.render = async () => {
        await fetchPosts()
        $target.appendChild($postsPage)
    }
}