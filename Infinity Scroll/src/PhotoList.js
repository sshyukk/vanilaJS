/*
initialState = [
    {
        id: 1,
        imagePath: ''
    }
]
*/
export default function PhotoList({ $target, initialState, onScrollEnded }) {
    // 기본요소
    let isInitialize = false
    const $photoList = document.createElement('div')
    $target.appendChild($photoList)
    this.state = initialState
    this.setState = nextState => {
        this.state = nextState
        this.render()
    }
    // intersection observer 객체 생성
    const observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting && !this.state.isLoading) {
                console.log('화면 끝!!', entry)
                if (this.state.totalCount > this.state.photos.length) {
                    onScrollEnded()
                }
            }
        })
    }, {
        root: null,
        threshold: 1,
    })
    let $lastLi = null
    //렌더링
    this.render = () => {
        // 렌더링 리스트 생성 중복 방지
        if (!isInitialize) {
            $photoList.innerHTML = `
                <ul class="PhotoList__photos"></ul>
                <button class="PhotoList__loadMore" style="width: 100%; height: 200px; font-size: 20px;">Load More</button>
            `
            isInitialize = true
        }
        const { photos } = this.state
        const $photos = $photoList.querySelector('.PhotoList__photos')
        photos.forEach(photo => {
            // photo의 id 기준으로 렌더링이 되어 있는지 체크
            if ($photos.querySelector(`li[data-id="${photo.id}"]`) === null) {
                // 없으면 li 생성하고 $photos에 appendChild
                const $li = document.createElement('li')
                $li.setAttribute('data-id', photo.id)
                $li.style = 'list-style: none; min-height: 500px;'
                $li.innerHTML = `<img width="100%" src="${photo.imagePath}" />`
                $photos.appendChild($li)
            }
        })
        // intersection observer 감시 대상 설정
        const $nextLi = $photos.querySelector('li:last-child')
        if ( $nextLi !== null) {
            if ($lastLi !== null) {
                observer.unobserve($lastLi)
            }
            $lastLi = $nextLi
            observer.observe($lastLi)
        }
    }
    this.render()

    // 사진 불러오기 버튼 생성
    $photoList.addEventListener('click', e => {
        if (e.target.className === 'PhotoList__loadMore' && !this.state.isLoading) {
            onScrollEnded()
        }
    })
    // 스크롤 기능 구현
    window.addEventListener('scroll', () => {
        const { isLoading, totalCount, photos } = this.state
        const isScrollEnded = (window.innerHeight + window.scrollY) + 100 >= document.body.offsetHeight
        if (isScrollEnded && !isLoading && photos.length < totalCount ) {
            onScrollEnded()
        }
    })
}

