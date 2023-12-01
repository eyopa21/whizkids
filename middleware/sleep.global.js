const sleeep = () => new Promise((resolve) => setTimeout(resolve, 500))
export default async() => {

    console.log("sleep")
    await sleeep()
    return
}