// 여기서 초기값은 편집할 id값을 넘겨받는다. 어느 페이지를 편집하고 있는지 알아보기 위함!
import { request } from './api.js'
import Editor from './Editor.js'
import LinkButton from './LinkButton.js'
import { getItem, removeItem, setItem } from './storage.js'

export default function PostEditPage({ $target, initialState }) {
    const $postEditPage = document.createElement('div')

    this.state = initialState

    // [editor 가지고 오기]
    // 로컬 스토리지에 값이 이미 있는 경우 초기 값 세팅. 키 값.
    let postLocalSaveKey = 'temp-post-${this.state.postId}'

    // 새로 작성하는 페이지가 아니면 원래 있던 페이지를 불러온다. 포스트 불러오기.
    const post = getItem(postLocalSaveKey, {
        title: '',
        content: ''
    })
    // debounce 처리.
    let timer = null
    // 일단 PostsPage.js에 넣기 전에 main.js에서 시험을 해보자.[완료]
    const editor = new Editor({ 
        $target: $postEditPage,
        initialState: {
            title: '',
            content: '',
        }, // [?]그냥 post로 해야하지 않을까?
        onEditing: (post) => {
            // debounce 처리.
            if (timer !== null) {
                clearTimeout(timer)
            }
            // setTimeout 일정한 숫자값 반환
            timer = setTimeout(async () => {
                setItem(postLocalSaveKey, {
                    ...post,
                    // 저장시간 측정.
                    tempSaveDate: new Date()
                })


                const isNew = this.state.postId === 'new'
                if (isNew) {
                    const createdPost = await request('/posts', {
                        method: 'POST',
                        body: JSON.stringify(post)
                    })
                    history.replaceState(null, null, `/posts/${createdPost.id}`)
                    removeItem(postLocalSaveKey)

                    this.setState({
                        postId: createdPost.id,
                        
                    })
                } else {
                    await request(`/posts/${post.id}`, {
                        method: 'PUT',
                        body: JSON.stringify(post)
                    })
                    removeItem(postLocalSaveKey)

                }
            }, 2000)
        },
    })

    this.setState = async nextState => {
        if (this.state.postId !== nextState.postId) {
            postLocalSaveKey = `temp-post-${nextState.postId}`
            this.state = nextState

            if(this.state.postId === 'new') {
                const post = getItem(postLocalSaveKey, {
                    title: '',
                    content: ''
                })
                this.render()
                editor.setState(post)
            } else {
                await fetchPost()
            }
            return 
        }

        this.state = nextState
        this.render()

        editor.setState(this.state.post || {
            title: '',
            content: ''
        })
    }

    this.render = () => {
        $target.appendChild($postEditPage)
    }
    
    // 아닌 경우.
    const fetchPost = async () => {
        const { postId } = this.state

        // 선택적 불러오기. 아이디 키 값이 있으면 수정. 아니면 새로 생성.
        if (postId !== 'new') {
            const post = await request(`/posts/${postId}`)

            // 새로고침 시 psot 내용 업데이트 하기.
            const tempPost = getItem(postLocalSaveKey, {
                title: '',
                content: ''
            })

            if (tempPost.tempSaveDate && tempPost.tempSaveDate > post.updated_at) {
                if ( confirm('저장되지 않은 임시 데이터가 있습니다. 불러올까요?')) {
                    this.setState({
                        ...this.state,
                        post: tempPost
                    })
                    return 
                }
            }

            this.setState({
                ...this.state,
                post
            })
        }
    }

    new LinkButton({
        $target: $postEditPage,
        initialState: {
            text: '목록으로 이동',
            link: '/' 
        }
    })
}