import { createResolver, defineNuxtModule, addServerHandler } from 'nuxt/kit'

export default defineNuxtModule({
    meta: {
        name: 'hello'
    },
    setup() {
        const { resolve } = createResolver(import.meta.url)

        console.log("module")

        // Add an API route
        addServerHandler({
            route: '/api/hello',
            handler: resolve('./hello/api-route')
        })
    }
})