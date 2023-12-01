export default function() {
    return useState('auth', () => {
        // const { clients, getToken, onLogin, onLogout } = useApollo()



        return {
            token: '',
            currentUser: ''
        }
    })
}