export default function Breadcrumb({ $target, initialState }) {
    // 영역 값 설정
    const $breadcrumb = document.createElement('nav')
    $breadcrumb.className = 'Breadcrumb'
    $target.appendChild($breadcrumb)
    // 초기 값 설정
    this.state = initialState
    this.setState = nextState => {
        this.state = nextState
        this.render()
    }
    // 렌더링 과정
    this.render = () => {
        $breadcrumb.innerHTML = `
            <div>Root</div>
            ${this.state.map(({ name }) => `
                <div>${name}</div>
            `).join('')}
        `
    }
    this.render()
}