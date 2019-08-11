import { get } from 'axios'

export default function() {
    return get(
        process.env.NODE_ENV === 'development'
            ? 'https://meals-data.muhun.kim/dev'
            : 'https://meals-data.muhun.kim/dev'
    )
        .then(res => res.data)
        .catch(res => {
            throw res
        })
}
