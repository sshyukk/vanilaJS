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
                <div class="Node" data-id="${node.id}">
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
    // 클릭 이벤트 구현. 클릭 시 노드에 해당하는 아이디 추출.
    $nodes.addEventListener('click', e => {
        const $node = e.target.closest('.Node')
        const { id } = $node.dataset
        // id가 없는 경우. 뒤로가기 버튼 처리.
        if (!id) {

        }
        // id가 있는 경우. 각 노드에 해당하는 클릭 버튼 처리.
        const node = this.state.nodes.find(node => node.id === id)
        if (node) {
            onClick(node)
        } else {
            alert('올바르지 않은 Node입니다!')
        }
    })
}