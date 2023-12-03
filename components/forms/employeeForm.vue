<template>
    <div>
        <form @submit.prevent="submit()">
            <div class="grid grid-cols-6 gap-6">
                <div class="col-span-6 sm:col-span-3">
                    <VueInput label="User name" name="user_name" type="text" placeholder="User name ..." rule="required" />
                </div>
                <div class="col-span-6 sm:col-span-3">
                    <VueInput label="Full name" name="full_name" type="text" placeholder="Full name..." rule="required" />
                </div>
                <div class="col-span-6 sm:col-span-3">
                    <VueInput label="Sex" name="sex" type="text" placeholder="Employee sex..." rule="required" />
                </div>
                <div class="col-span-6 sm:col-span-3">
                    <VueInput label="Email" name="email" type="email" placeholder="Email..." rule="email" />
                </div>
                <div class="col-span-6 sm:col-span-3">
                    <VueInput label="Password" name="password" type="text" placeholder="Password.." rule="password" />
                </div>
                <div class="col-span-6 sm:col-span-3">
                    <VueInput label="Date of entry" name="date_of_entry" type="date" placeholder="Employee date of entry..."
                        rule="required" />
                </div>
                <div class="col-span-6 sm:col-span-3">
                    <VueInput label="Role" name="role" type="text" placeholder="Company role..." rule="required" />
                </div>

                <div class="col-span-6 sm:col-span-3">
                    <VueInput label="Salary" name="salary" type="number" placeholder="Salary..."
                        rule="number:1000,100000" />
                </div>


            </div>


            <div class="  pt-6 mt-8 rounded-b border-t border-gray-200">

                <VueButton type="submit" name="Register" variation="normal" :loading="loading" />
            </div>
        </form>

    </div>
</template>

<script setup>
import register_employee_query from '../queries/employee/register-employee.gql'

import { useForm } from "vee-validate";

const layout = useLayout();

const uid = useCookie('uid')


const { handleSubmit } = useForm();

const { mutate: Register, onDone, onError, laoding } = useMutation(register_employee_query)

const submit = handleSubmit((formValues) => {
    console.log(formValues);

    Register({ user_name: formValues.user_name, full_name: formValues.full_name, email: formValues.email, password: formValues.password, sex: formValues.sex, date_of_entry: formValues.date_of_entry, role: formValues.role, salary: formValues.salary })


    onDone(res => {
        console.log("done")

    })

    onError(err => {

        console.log("erorororor", err)

    })




})






</script>