import PhotoList from './PhotoList.js'
import { request } from './api.js'


export default function App({ $target }) {
    // 헤더 제목 이름 생성
    const $h1 = document.createElement('h1')
    $h1.innerText = 'Cat Photos'
    $h1.style.textAlign = 'center'
    $target.appendChild($h1)
    // 기본 값 설정
    this.state = {
        limit: 5,
        nextStart: 0, // limit 갯수만큼 계속 더해짐
        photos: [],
        isLoading: false
    }
    // 고양이 사진 리스트 생성
    const photoListComponent = new PhotoList({
        $target,
        initialState: {
            isLoading: this.state.isLoading,
            photos: this.state.photos
        },
        onScrollEnded: async () => {
            await fetchPhotos()
        }
    })
    // 상태 재설정
    this.setState = nextState => {
        this.state = nextState
        photoListComponent.setState({
            isLoading: this.state.isLoading,
            photos: nextState.photos
        })
    }
    // 사진 api 불러오기
    const fetchPhotos = async () => {
        this.setState({
            ...this.state,
            isLoading: true
        })
        const { limit, nextStart } = this.state
        const photos = await request(`/cat-photos?_limit=${limit}&_start=${nextStart}`)
        this.setState({
            ...this.state,
            nextStart: nextStart + limit,
            photos: [ ...this.state.photos, ...photos ],
            isLoading: false,
        })
    }
    fetchPhotos()
}