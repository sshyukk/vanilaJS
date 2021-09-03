import PostsPage from "./PostsPage.js"
import PostEditPage from "./PostEditPage.js"

/*
    url 규칙
    루트: postsPage 그리기

    posts/{id} - id에 해당하는 post 생성
    posts/new - 새 post 생성
*/


export default function App({ $target }) {


    const postsPage = new PostsPage({ $target })
    const postEditPage = new PostEditPage( { $target, initialState: {
        postId: 'new'
    } })

    // 라우터 처리
    this.route = () => {
        const { pathname } = window.location

        if (pathname === '/') {
            postsPage.render()
        } else if (pathname.indexOf('/posts/') === 0) {
            const [ , , postId] = pathname.split('/')
            postEditPage.setState({ postId })
        }
    }
    this.route()
}