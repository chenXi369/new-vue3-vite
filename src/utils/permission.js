import router from '@/router'
import getPageTitle from './get-page-title'

import { getToken } from './auth'
import { confirmDialog } from './dialog'

const whiteList = ['/', '/login']

router.beforeEach(async (to, from, next) => {
    // set page title
    document.title = getPageTitle(to.meta.title)

    // determine whether the user has logged in
    const hasToken = getToken()

    if (hasToken) {
        if (to.path === '/login') {
            // if is logged in, redirect to the home page
            next({ path: '/' })
        } else {
            const hasGetUserInfo = store.getters.name
            if (hasGetUserInfo) {
                next()
            } else {
                try {
                    // get user info
                    // await store.dispatch('user/getInfo')

                    next()
                } catch (error) {
                    // remove token and go to login page to re-login
                    await store.dispatch('user/resetToken')
                    confirmDialog(error || 'Has Error')
                    next('/login')
                    NProgress.done()
                }
            }
        }
    } else {
        /* has no token*/

        if (whiteList.indexOf(to.path) !== -1) {
            // in the free login whitelist, go directly
            next()
        } else {
            // other pages that do not have permission to access are redirected to the login page.
            next('/login')
            NProgress.done()
        }
    }
})