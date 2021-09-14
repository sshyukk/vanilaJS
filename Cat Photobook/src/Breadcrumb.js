export default function Breadcrumb({ $target, initialState, onClick }) {
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
            <div class="Breadcrumb__item">Root</div>
            ${this.state.map(({ id, name }) => `
                <div class="Breadcrumb__item" data-id="${id}">${name}</div>
            `).join('')}
        `
    }
    this.render()
    // breadcrumb 클릭 시 해당 경로로 이동
    $breadcrumb.addEventListener('click', (e) => {
        const $breadcrumbItem = e.target.closest('.Breadcrumb__item')
        const { id } = $breadcrumbItem.dataset
        onClick(id)
    })
}
