const API_END_POINT = 'https://cat-api.roto.codes'
export const request = async (url) => {
    try {
        const res = await fetch(`${API_END_POINT}${url}`)
        if (!res.ok) {
            throw new Error('API 호출에 문제가 생겼습니다!')
        }
        return await res.json()
    } catch (e) {
        alert(e.message)
    }
}