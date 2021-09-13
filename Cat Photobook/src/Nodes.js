export default function Nodes({ $target, initialState, onClick }) {
    // 영역 값 설정
    const $nodes = document.createElement('div')
    $nodes.classList.add('Nodes')
    $target.appendChild($nodes)

    // 초기 값 설정
    this.state = initialState
    this.setState = nextState => {
        this.state = nextState
        this.render()
    }
    // 렌더링 과정
    this.render = () => {
        const { isRoot, nodes } = this.state
        // 뒤로가기 버튼 생성 & 디렉토리와 파일 아이콘 구분
        $nodes.innerHTML = `
            ${isRoot ? '' : `
                <div class="Node">
                    <img src="https://cdn.roto.codes/images/prev.png" />
                </div>
            `}
            ${nodes.map(node => `
                <div class="Node">
                    <img src="${node.type === 'DIRECTORY' ?
                        "https://cdn.roto.codes/images/directory.png" :
                        "https://cdn.roto.codes/images/file.png"
                    }" />
                    ${node.name}
                </div>
            `).join('')}
        `
    }
    this.render()
}