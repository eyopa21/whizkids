export default defineI18nConfig(() => ({
    legacy: false,
    //locale: 'am',
    messages: {
        en: {
            welcome: 'Eyoba\'s admin panel',
            lang: 'English(US)',
            navs: ['Dashboard', 'Settings', 'Behaviors', 'Projects', 'Skills', 'Services', 'Timelines', 'Blogs', 'Test2']
        },
        fr: {
            welcome: 'Bienvenue',
            lang: 'French(fr)',
            navs: ['Fr,Dashboard', 'Fr,Settings', 'Fr,Behaviors', 'Fr,Projects', 'Fr,Skills', 'Fr,Services', 'Fr,Timelines', 'Fr,Blogs', 'Fr,Test2']

        },
        am: {
            welcome: 'እንኳን ደህና መጡ',
            lang: 'አማርኛ(ETH)',
            navs: ['ዋና', 'መቼት', 'ባህሪ', 'ስራዎች', 'ሙያ', 'አገልግሎት', 'ጊዜያት', 'ዜናዎች', 'ሙከራ']
        }
    }
}))