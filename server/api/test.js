export default defineEventHandler(async(event) => {
    // const sleeep = () => new Promise((resolve) => setTimeout(resolve, 25000))

    const tests = [{
            name: 'hello',
            type: 'user'
        },
        {
            name: 'hello',
            type: 'user'
        },
        {
            name: 'hello',
            type: 'user'
        },
        {
            name: 'hello',
            type: 'users '
        }
    ]


    return {
        test: tests
    }
})