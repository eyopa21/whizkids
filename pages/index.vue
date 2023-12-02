<template>
  <main>

    <div class="px-4 pt-6">
      <div class="grid grid-cols-1 gap-6 mb-6 w-full xl:grid-cols-2 2xl:grid-cols-4">
        <DashboardAnalysis v-for="i in 4" :key="i" />
      </div>
      <div class="grid grid-cols-0 gap-6 mb-6 w-full xl:grid-cols-1 2xl:grid-cols-3">

        <DashboardMessages />
        <DashboardLogs />
      </div>
      <!--div class="grid grid-cols-1 gap-6 mb-6 w-full xl:grid-cols-2">
        <DashboardMap />
      </div>
      <div class="grid grid-cols-1 my-4 xl:grid-cols-2 2xl:grid-cols-3 xl:gap-6">

        <DashboardLatestCustomers />
        <DashboardChart />

      </div-->
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