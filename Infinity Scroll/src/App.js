import PhotoList from './PhotoList.js'
import { request } from './api.js'


export default function App({ $target }) {
    const $h1 = document.createElement('h1')
    $h1.innerText = 'Cat Photos'
    $h1.style.textAlign = 'center'
    $target.appendChild($h1)

    this.state = {
        limit: 5,
        start: 0, // limit 갯수만큼 계속 더해짐
        photos: []
    }
    const photoListComponent = new PhotoList({
        $target,
        initialState: this.state.photos
    })

    this.setState = nextState => {
        this.state = nextState
        photoListComponent.setState(nextState.photos)
    }

    const fetchPhotos = async () => {
        const photos = await request(`/cat-photos?_limit=5&_start=0`)
        this.setState({
            ...this.state,
            photos
        })
    }
    fetchPhotos()
}