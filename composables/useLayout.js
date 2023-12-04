export default function() {
    return useState('layout', () => {
        return {
            showEmployeeModal: false,
            showAttendanceModal: false,
            showAlert: {
                message: '',
                error: true,
                warning: false
            }

        }
    })
}