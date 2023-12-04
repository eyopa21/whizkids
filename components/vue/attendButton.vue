<script setup>
import attend_query from '../queries/attendances/attend.gql'
const props = defineProps(['id'])
const layout = useLayout();

const uid = useCookie('uid')

const mainData = useData();

const { mutate: attend, onDone, onError, loading } = useMutation(attend_query)

const sign = (id) => {
    attend({ id: id });
    onDone(res => {
        console.log(res)
        layout.value.showAlert = { error: false, message: 'You signed successfully' }
    })
    onError(err => {
        console.log(err)
        layout.value.showAlert = { error: true, message: err.message }
    })
}
</script>
<template>
    <div>

        <VueButton @click="sign(props.id)" name="Sign" type="button" variation="normal" :loading="loading" />
    </div>
</template>