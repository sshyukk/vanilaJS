import { request } from "./api.js"
import PostList from "./PostList.js"

export default function PostsPage({
    $target
}) {
    // 바로 appendChild()하지 않는다. app.js에서 이 PostsPage 객체를 렌더링하는 시점에서 실행. 렌더 함수를 통해.
    const $postsPage = document.createElement('div')

    // [게시글 목록 생성]
    const postList = new PostList({
        $target,
        initialState: []
    })
    // [API 게시글 목록 불러오기]
    const fetchPosts = async () => {
        const posts = await request('/posts')
        postList.setState(posts)
    }
    // [게시글 생성하는 버튼]
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

