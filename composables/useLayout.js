export default function() {
    return useState('layout', () => {
        return {
            showEmployeeModal: false,
            showAlert: {
                message: '',
                error: true,
                warning: false
            }

        }
    })
}