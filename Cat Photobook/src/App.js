import { request } from './api.js'
import Nodes from './Nodes.js'
import ImageViewer from './ImageViewer.js'
// DUMMY DATA 1,2 임의로 설정
const DUMMY_DATA = [{"id":"1","name":"노란고양이","type":"DIRECTORY","filePath":null,"parent":null},{"id":"3","name":"까만고양이","type":"DIRECTORY","filePath":null,"parent":null},{"id":"10","name":"고등어무늬 고양이","type":"DIRECTORY","filePath":null,"parent":null},{"id":"13","name":"삼색이 고양이","type":"DIRECTORY","filePath":null,"parent":null},{"id":"14","name":"회색고양이","type":"DIRECTORY","filePath":null,"parent":null},{"id":"20","name":"하얀고양이","type":"DIRECTORY","filePath":null,"parent":null}]
const DUMMY_DATA_2 = [{"id":"5","name":"2021/04","type":"DIRECTORY","filePath":null,"parent":{"id":"1"}},{"id":"19","name":"물 마시는 사진","type":"FILE","filePath":"/images/a2i.jpg","parent":{"id":"1"}}]
// App Component 설정
export default function App({ $target }) {
    this.state = {
        isRoot: true,
        nodes: [],
        paths: [],
    }
    // 초기 값 설정
    this.setState = nextState => {
        this.state = nextState
        nodes.setState({
            isRoot: this.state.isRoot,
            nodes: this.state.nodes
        })
        imageViewer.setState({
            selectedImageUrl: this.state.selectedImageUrl
        })
    }
    // Nodes Component 생성
    const nodes = new Nodes({
        $target,
        initialState: {
            isRoot: this.state.isRoot,
            nodes: this.state.nodes,
            selectedImageUrl: null,
        },
        onClick: async (node) => {
            if (node.type === 'DIRECTORY') {
                await fetchNodes(node.id)
                this.setState({
                    ...this.state,
                    paths: [...this.state.paths, node]
                })
            }
            if (node.type === 'FILE') {
                this.setState({
                    ...this.state,
                    selectedImageUrl: `https://cat-api.roto.codes/static${node.filePath}`
                })
            }
        },
        // 뒤로가기 기능 구현
        onPrevClick: async () => {
            const nextPaths = [...this.state.paths]
            nextPaths.pop()
            this.setState({
                ...this.state,
                paths: nextPaths
            })
            console.log(nextPaths)
            if (nextPaths.length === 0) {
                await fetchNodes()
            } else {
                await fetchNodes(nextPaths[nextPaths.length - 1].id)
            }
        }
    })
    // ImageViewer Component 생성
    const imageViewer = new ImageViewer({
        $target,
        onClose: () => {
            this.setState({
                ...this.state,
                selectedImageUrl: null,
            })
        },
    })
    // api 호출하기
    const fetchNodes = async (id) => {
        const nodes = await request(id ? `/${id}` : '/')
        this.setState({
            ...this.state,
            isRoot: id ? false : true,
            nodes
        })
    }
    fetchNodes()
}