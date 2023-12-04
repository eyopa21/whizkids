<template>
    <div>
        <form @submit.prevent="submit()">
            <div class="grid grid-cols-6 gap-6">
                <div class="col-span-6 sm:col-span-3">
                    <VueInput label="User name" name="user_name" type="text" placeholder="User name ..." rule="required"
                        :value="props.employee ? props.employee.user_name : ''" />
                </div>
                <div class="col-span-6 sm:col-span-3">
                    <VueInput label="Full name" name="full_name" type="text" placeholder="Full name..." rule="required"
                        :value="props.employee ? props.employee.full_name : ''" />
                </div>
                <div class="col-span-6 sm:col-span-3">
                    <VueInput label="Sex" name="sex" type="select" placeholder="Employee sex..." rule="required"
                        :value="props.employee ? props.employee.sex : ''" />
                </div>
                <div class="col-span-6 sm:col-span-3">
                    <VueInput label="Email" name="email" type="email" placeholder="Email..." rule="email"
                        :value="props.employee ? props.employee.email : ''" />
                </div>
                <div v-if="!props.employee" class="col-span-6 sm:col-span-3">
                    <VueInput label="Password" name="password" type="text" placeholder="Password.." rule="password" />
                </div>
                <div class="col-span-6 sm:col-span-3">
                    <VueInput label="Date of entry" name="date_of_entry" type="date" placeholder="Employee date of entry..."
                        rule="required" :value="props.employee ? props.employee.date_of_entry : ''" />
                </div>
                <div class="col-span-6 sm:col-span-3">
                    <VueInput label="Role" name="role" type="text" placeholder="Company role..." rule="required"
                        :value="props.employee ? props.employee.role : ''" />
                </div>

                <div class="col-span-6 sm:col-span-3">
                    <VueInput label="Salary" name="salary" type="number" placeholder="Salary..." rule="number:1000,100000"
                        :value="props.employee ? props.employee.salary : ''" />
                </div>
                <div class="col-span-6 sm:col-span-3">
                    <VueInput label="Phone number" name="phone_number" type="text" placeholder="0911223344"
                        rule="required" />
                </div>


            </div>


            <div class="  pt-6 mt-8 rounded-b border-t border-gray-200">

                <VueButton type="submit" :name="props.employee ? 'Update' : 'Register'" variation="normal"
                    :loading="onRegisterLoading || onUpdateLoading" />
            </div>
        </form>

    </div>
</template>

<script setup>
import register_employee_query from '../queries/employee/register-employee.gql'
import update_employee_query from '../queries/employee/update-employee.gql'
import { useForm } from "vee-validate";

const layout = useLayout();

const uid = useCookie('uid')
const nuxtApp = useNuxtApp();

const { handleSubmit } = useForm();

const { mutate: Register, onDone: onRegisterDone, onError: onRegisterError, loading: onRegisterLoading } = useMutation(register_employee_query)
const { mutate: Update, onDone: onUpdateDone, onError: onUpdateError, loading: onUpdateLoading } = useMutation(update_employee_query)

const submit = handleSubmit((formValues) => {
    console.log(formValues);
    if (props.employee) {
        console.log("updateing")
        Update({ id: props.employee.id, user_name: formValues.user_name, full_name: formValues.full_name, email: formValues.email, sex: formValues.sex, date_of_entry: formValues.date_of_entry, role: formValues.role, salary: formValues.salary, phone_number: formValues.phone_number })
        onUpdateDone(res => {
            console.log("done")
            layout.value.showAlert = { error: false, message: 'Employee Updated successfully' }
            nuxtApp.$reFetch()
        })
        onUpdateError(err => {
            console.log("erorororor", err)
            layout.value.showAlert = { error: true, message: err.message }
        })
    } else {
        console.log("registering")
        Register({ user_name: formValues.user_name, full_name: formValues.full_name, email: formValues.email, password: formValues.password, sex: formValues.sex, date_of_entry: formValues.date_of_entry, role: formValues.role, salary: formValues.salary, phone_number: formValues.phone_number })
        onRegisterDone(res => {
            console.log("done")
            layout.value.showAlert = { error: false, message: 'Employee Registered successfully' }
            nuxtApp.$reFetch()
        })
        onRegisterError(err => {
            console.log("erorororor", err)
            layout.value.showAlert = { error: true, message: err.message }
        })
    }





})






</script>