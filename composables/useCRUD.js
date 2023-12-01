import query from '../queries/users/get-users.gql'
export default function() {
    const compareDisable = computed((a, b) => {
        if (a == b) {
            return true
        } else {
            return false
        }
    })
    return {
        compareDisable
    }
}