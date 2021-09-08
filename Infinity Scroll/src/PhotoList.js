/*
initialState = [
    {
        id: 1,
        imagePath: ''
    }
]
*/
export default function PhotoList({ $target, initialState, onScrollEnded }) {
    const $photoList = document.createElement('div')
    $target.appendChild($photoList)
    this.state = initialState
    this.setState = nextState => {
        this.state = nextState
        this.render()
    }

    this.render = () => {
        console.log(this.state)
        $photoList.innerHTML = `
        <ul>
            ${this.state.map(photo => 
                `
                    <li style="list-style: none;">
                        <img width="100%" src="${photo.imagePath}" />
                    </li>
                `
            ).join('')}
        </ul>
        <button class="PhotoList__loadMore" style="width: 100%; height: 200px; font-size: 20px;">Load More</button>
        `
    }
    this.render()

    $photoList.addEventListener('click', e => {
        if (e.target.className === 'PhotoList__loadMore') {
            onScrollEnded()
        }
    })
}