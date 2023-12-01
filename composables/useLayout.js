export default function() {
    return useState('layout', () => {
        return {
            showSideBar: false,
            showProjectModal: false,
            showSkillModal: false,
            showTimelineModal: false,
            showServiceModal: false,
            showBehaviorModal: false,
            showBlogModal: false,
            showLinksModal: false,
            showInviteModal: false,
            showDeleteAlert: false,
            showAlert: {
                message: '',
                error: true,
                warning: false
            }

        }
    })
}