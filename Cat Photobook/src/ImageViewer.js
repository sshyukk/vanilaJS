export default function ImageViewer({ $target }) {
    // 영역 값 설정
    const $imageViewer = document.createElement('div')
    $imageViewer.className = 'ImageViewer Modal'
    $target.appendChild($imageViewer)
    // 초기 값 설정
    this.state = {
        selectedImageUrl: null,
    }
    this.setState = nextState => {
        this.state = nextState
        this.render()
    }
    // 렌더링 과정
    this.render = () => {
        $imageViewer.style.display = this.state.selectedImageUrl ? 'block' : 'none'
        $imageViewer.innerHTML = `
            <div class="content">
                <img src="${this.state.selectedImageUrl}" />
            <div>
        `
    }
    this.render()
}