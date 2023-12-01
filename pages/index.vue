<template>
  <main>


    <div class="m-32">



      <button @click="sign()"
        class="p-2 px-4 bg-red-500 rounded-md text-white hover:scale-[105%] transition-all duration-500" type="button">
        <span v-if="loading">Click me to Sign</span>
        <span v-else>Signing...</span>


      </button>
    </div>


  </main>
</template>

<script setup>



const query = gql`
mutation {
  insert_attendance_one(object: { employee_id: "b3806149-1b18-4200-b7c7-e5683202db3b" }) {
    id
    user {
      email
    }
  }
}`

const { mutate: attend, onDone, onError, loading } = useMutation(query)

const sign = () => {
  attend();
  onDone(res => {
    console.log(res)
  })
  onError(err => {
    console.log(err)
  })
}


</script>