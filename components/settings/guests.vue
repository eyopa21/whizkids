<template>
    <div class="bg-white dark:bg-gray-900 shadow-lg shadow-gray-200 dark:shadow-gray-700 rounded-2xl p-4 mb-6">
        <div class="">

            <h3 class="text-xl font-bold dark:text-gray-100">Invited Admins</h3>
            <ul class="mb-6 divide-y divide-gray-200">
                <li v-for="(i, key) in guests" :key="key" class="py-4">
                    <div class="flex justify-between xl:block 2xl:flex align-center 2xl:space-x-4">
                        <div class="flex space-x-4 xl:mb-4 2xl:mb-0">
                            <div>
                                <Icon class="w-6 h-6 rounded-full text-fuchsia-500" name="heroicons:user-20-solid" />

                            </div>
                            <div class="flex-1 min-w-0">
                                <p
                                    class="text-base font-semibold text-gray-900 dark:text-gray-400 leading-none truncate mb-0.5">
                                    {{ i.user_name }} {{ i.is_super_guest ? '(Super)' : '' }}
                                </p>
                                <p class="mb-1 text-sm font-normal text-fuchsia-600 truncate">
                                    {{ i.email }}
                                </p>
                                <p class="text-xs font-medium text-gray-500">
                                    Invited on: {{ i.created_at?.split('T')[0] }}
                                </p>
                            </div>
                        </div>
                        <div class="flex justify-end space-x-2  items-center w-auto xl:w-full 2xl:w-auto">
                            <VueButton @click="toggleSuperGuest(i.id, i.is_super_guest ? false : true)"
                                :name="i.is_super_guest ? 'Remove' : 'Super'" type="button" variation="edit"
                                className=" bg-white  border border-gray-300 hover:bg-gray-50 hover:scale-[1.02] transition-transform"
                                :loading="onToggleSuperLoading" />
                            <!--VueButton @click="suspend(i.id, i.is_suspended ? false : true)"
                                :name="i.is_suspended ? 'UnSuspend' : 'Suspend'" type="button" variation="edit"
                                className=" bg-white  border border-gray-300 hover:bg-gray-50 hover:scale-[1.02] transition-transform"
                                :loading="onSuspendLoading" /-->
                            <VueButton @click="layout.showDeleteAlert = true" name="Delete" type="button" variation="delete"
                                className="" />
                            <VueAlert v-if="layout.showDeleteAlert" @delete="deleteGuest(i.id)"
                                :loading="onDeleteLoading" />

                        </div>
                    </div>

                </li>

            </ul>
            <div class=" flex justify-end mt-2">
                <VueButton className="w-full" @click="layout.showInviteModal = true" name="Invite New" type="button"
                    variation="normal" />
            </div>
        </div>
    </div>
    <VueModal v-if="layout.showInviteModal" showInviteModal="true" @close="layout.showInviteModal = false" />
</template>
<script setup>
import suspend_query from '../queries/guests/suspend.gql'
import delete_query from '../queries/guests/delete-guests.gql'
import toogle_super_guest_query from '../queries/guests/super-guest.gql'
const layout = useLayout();
const mainData = useData()
const guests = ref(mainData.value.user.guests)

const nuxtApp = useNuxtApp()
const { mutate: suspendd, onDone: onSuspendDone, onError: onSuspendError, loading: onSuspendLoading } = useMutation(suspend_query)
const suspend = (id, value) => {

    suspendd({ id: id, is_suspended: value })
    onSuspendDone(async res => {
        await nuxtApp.$reFetch()
        console.log(res)

        layout.value.showAlert.error = false
        layout.value.showAlert.message = value ? 'Guest suspended successfully' : 'Guest unsuspended successfully'
    })
    onSuspendError(err => {

        console.log(err)
        if (err.message === 'no mutations exist') {
            layout.value.showAlert = { error: true, message: 'Sorry!, You are not allowed for this operation' }
        } else {

            layout.value.showAlert.error = true
            layout.value.showAlert.message = value ? 'Suspention not successful' : 'UnSuspention not successful'
        }
    })

}
const { mutate: toggle, onDone: onToggleSuperDone, onError: onToggleSuperError, loading: onToggleSuperLoading } = useMutation(toogle_super_guest_query)
const toggleSuperGuest = (id, value) => {

    toggle({ id: id, is_super_guest: value })
    onToggleSuperDone(async res => {
        await nuxtApp.$reFetch()
        console.log(res)


        layout.value.showAlert.error = false
        layout.value.showAlert.message = value ? 'Super guest successfull' : 'Removed successfully'
    })
    onToggleSuperError(err => {
        console.log(err)

        if (err.message === 'no mutations exist') {
            layout.value.showAlert = { error: true, message: 'Sorry!, You are not allowed for this operation' }
        } else {

            layout.value.showAlert.error = true
            layout.value.showAlert.message = value ? 'Super guest unsuccessfull' : 'Removed unsuccessfull'
        }
    })

}

const { mutate: deleteGuestt, onDone: onDeleteDone, onError: onDeleteError, loading: onDeleteLoading } = useMutation(delete_query)
const deleteGuest = (id) => {

    deleteGuestt({ id: id })
    onDeleteDone(async res => {
        await nuxtApp.$reFetch()
        console.log(res)

        layout.value.showAlert.error = false

        layout.value.showAlert.message = 'Guest Removed successfully'
    })
    onDeleteError(err => {
        console.log(err)

        layout.value.showAlert.error = true
        if (err.message === 'no mutations exist') {
            layout.value.showAlert = { error: true, message: 'Sorry!, You are not allowed for this operation' }
        }
        else layout.value.showAlert.message = 'Remove not successfull'
    })
}

</script>