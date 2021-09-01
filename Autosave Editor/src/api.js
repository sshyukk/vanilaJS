// API 주소값을 불러오는 부분은 꼭 상수 처리하는 습관을 들이자.
export const API_END_POINT = 'https://kdt.roto.codes'

export const request = async (url, options = {}) => {
    try {
        const res = await fetch(`${API_END_POINT}${url}`, {
            ...options,
            headers: {
                'Content-Type': 'application/json'
            }
        })

        if (res.ok) {
            // await 키워드는 빼먹지 말자.
            return await res.json()
        }
        throw new Error('API를 처리하는 과정에서 오류가 발생했습니다!')

    } catch (e) {
        alert(e.message)
    }
}