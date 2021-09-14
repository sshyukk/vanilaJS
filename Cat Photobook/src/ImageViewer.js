export default function ImageViewer({ $target, onClose }) {
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
    // window 닫는 처리
    window.addEventListener('keyup', (e) => {
        // Esc 키를 눌렀을 경우 onClose를 호출.
        if (e.key === 'Escape') {
            onClose()
        }
    })
    // 모달 click 이벤트 처리. 닫기 기능 추가.
    $imageViewer.addEventListener('click', (e) => {
        if (Array.from(e.target.classList).includes('Modal')) {
            onClose()
        }
    })
}