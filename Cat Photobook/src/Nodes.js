export default function Nodes({ $target, initialState, onClick }) {
    // 초기 세팅
    const $nodes = document.createElement('div')
    $target.appendChild($nodes)
    $nodes.classList.add('Nodes')
    this.state = initialState
    // 초기 값 세팅
    this.setState = nextState => {
        this.state = nextState
        this.render()
    }
    // 렌더링
    this.render = () => {
        const { isRoot, nodes } = this.state

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