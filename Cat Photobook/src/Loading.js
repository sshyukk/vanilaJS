export default function Loading({ $target }) {
    // 영역 값 설정
    const $loading = document.createElement('div')
    $loading.className = 'Loading Modal'
    $target.appendChild($loading)
    // 초기 값 설정
    this.state = false
    this.setState = nextState => {
        this.state = nextState
        this.render()
    }
    // 렌더링 과정
    this.render = () => {
        $loading.innerHTML = `
            <div class="content">
                <img src="https://cdn.roto.codes/images/nyan-cat.gif" alt="Loading..." width="100%" />
            </div>
        `
        $loading.style.display = this.state ? 'block' : 'none'
    }
    this.render()
}