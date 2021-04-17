import store from '@/state/store'

export default [
    {
        path: '/login',
        name: 'login',
        component: () => import('../views/pages/account/login'),
        meta: {
            beforeResolve(routeTo, routeFrom, next) {
                // If the user is already logged in
                if (store.getters['auth/loggedIn']) {
                    // Redirect to the home page instead
                    next({ name: 'home' })
                } else {
                    // Continue to the login page
                    next()
                }
            },
        },
    },
    {
        path: '/register',
        name: 'register',
        component: () => import('../views/pages/account/register'),
        meta: {
            beforeResolve(routeTo, routeFrom, next) {
                // If the user is already logged in
                if (store.getters['auth/loggedIn']) {
                    // Redirect to the home page instead
                    next({ name: 'home' })
                } else {
                    // Continue to the login page
                    next()
                }
            },
        },
    },
    {
        path: '/forgot-password',
        name: 'Forgot-password',
        component: () => import('../views/pages/account/forgot-password'),
        meta: {
            beforeResolve(routeTo, routeFrom, next) {
                // If the user is already logged in
                if (store.getters['auth/loggedIn']) {
                    // Redirect to the home page instead
                    next({ name: 'home' })
                } else {
                    // Continue to the login page
                    next()
                }
            },
        },
    },
    {
        path: '/logout',
        name: 'logout',
        meta: {
            authRequired: true,
            beforeResolve(routeTo, routeFrom, next) {
                store.dispatch('auth/logOut')
                const authRequiredOnPreviousRoute = routeFrom.matched.some(
                    (route) => route.push('/login')
                )
                // Navigate back to previous page, or home as a fallback
                next(authRequiredOnPreviousRoute ? { name: 'home' } : { ...routeFrom })
            },
        },
    },
    {
        path: '/',
        name: 'home',
        meta: {
            authRequired: true,
        },
        component: () => import('../views/pages/dashboard/index')
    },
    /**
     * Farmers routes
     */
    // List all farmers
    {
        path:'/farmers',
        name:'farmers',
        meta: {
            authRequired: true,
        },
        component: () => import('../views/pages/dashboard/farmers/index')
    },
    // Create a farmer
    {
        path:'/farmers/create',
        name:'create-farmer',
        meta: {
            authRequired: true,
        },
        component: () => import('../views/pages/dashboard/farmers/create')
    },
    // Edit a farmer 
    {
        path:'/farmers/:id/edit',
        name:'edit-farmer',
        meta: {
            authRequired: true,
        },
        component: () => import('../views/pages/dashboard/farmers/edit')
    },
    // List all peach crops
    {
        path:'/crops/peach',
        name:'peach-crops',
        meta: {
            authRequired: true,
        },
        component: () => import('../views/pages/dashboard/crops/peach/index')
    },
    // Create a peach crop
    {
        path:'/crops/peach/create',
        name:'create-peach-crop',
        meta: {
            authRequired: true,
        },
        component: () => import('../views/pages/dashboard/crops/peach/create')
    },
    // Edit a peach crop
    {
        path:'/crops/peach/:id/edit',
        name:'edit-peach-crop',
        meta: {
            authRequired: true,
        },
        component: () => import('../views/pages/dashboard/crops/peach/edit')
    },
    // List all olives crops
    {
        path:'/crops/olives',
        name:'olives-crops',
        meta: {
            authRequired: true,
        },
        component: () => import('../views/pages/dashboard/crops/olives/index')
    },
    // Create an olives crop
    {
        path:'/crops/olives/create',
        name:'create-olives-crop',
        meta: {
            authRequired: true,
        },
        component: () => import('../views/pages/dashboard/crops/olives/create')
    },
    // Create an olives crop
    {
        path:'/crops/olives/:id/edit',
        name:'edit-olives-crop',
        meta: {
            authRequired: true,
        },
        component: () => import('../views/pages/dashboard/crops/olives/edit')
    },
    // List all almond crops
    {
        path:'/crops/almond',
        name:'almond-crops',
        meta: {
            authRequired: true,
        },
        component: () => import('../views/pages/dashboard/crops/almond/index')
    },
    // Create an almond crop
    {
        path:'/crops/almond/create',
        name:'create-almond-crop',
        meta: {
            authRequired: true,
        },
        component: () => import('../views/pages/dashboard/crops/almond/create')
    },
    // Create an almond crop
    {
        path:'/crops/almond/:id/edit',
        name:'edit-almond-crop',
        meta: {
            authRequired: true,
        },
        component: () => import('../views/pages/dashboard/crops/almond/edit')
    },
    // List all expenses
    {
        path:'/expenses',
        name:'expenses',
        meta: {
            authRequired: true,
        },
        component: () => import('../views/pages/dashboard/expenses/index')
    },
    // Create an expense
    {
        path:'/expenses/create',
        name:'create-expense',
        meta: {
            authRequired: true,
        },
        component: () => import('../views/pages/dashboard/expenses/create')
    },
    // Edit an expense
    {
        path:'/expenses/:id/edit',
        name:'edit-expense',
        meta: {
            authRequired: true,
        },
        component: () => import('../views/pages/dashboard/expenses/edit')
    },
    // List all expense types
    {
        path:'/expensetypes',
        name:'expensetypes',
        meta: {
            authRequired: true,
        },
        component: () => import('../views/pages/dashboard/expensetypes/index')
    },
    // Create an expense type
    {
        path:'/expensetypes/create',
        name:'create-expensetype',
        meta: {
            authRequired: true,
        },
        component: () => import('../views/pages/dashboard/expensetypes/create')
    },
    // Edit an expense type
    {
        path:'/expensetypes/:id/edit',
        name:'edit-expensetype',
        meta: {
            authRequired: true,
        },
        component: () => import('../views/pages/dashboard/expensetypes/edit')
    },
    // List all outgoings
    {
        path:'/outgoings',
        name:'outgoings',
        meta: {
            authRequired: true,
        },
        component: () => import('../views/pages/dashboard/outgoings/index')
    },
    // Create an outgoing
    {
        path:'/outgoings/create',
        name:'create-outgoing',
        meta: {
            authRequired: true,
        },
        component: () => import('../views/pages/dashboard/outgoings/create')
    },
    // Edit an expense type
    {
        path:'/outgoings/:id/edit',
        name:'edit-outgoing',
        meta: {
            authRequired: true,
        },
        component: () => import('../views/pages/dashboard/outgoings/edit')
    },
    // List all parcels
    {
        path:'/elements/parcels',
        name:'parcels',
        meta: {
            authRequired: true,
        },
        component: () => import('../views/pages/dashboard/elements/parcels/index')
    },
    // Create a parcel
    {
        path:'/elements/parcels/create',
        name:'create-parcel',
        meta: {
            authRequired: true,
        },
        component: () => import('../views/pages/dashboard/elements/parcels/create')
    },
    // Edit a parcel
    {
        path:'/elements/parcels/:id/edit',
        name:'edit-parcel',
        meta: {
            authRequired: true,
        },
        component: () => import('../views/pages/dashboard/elements/parcels/edit')
    },
    // List all calibers
    {
        path:'/elements/calibers',
        name:'calibers',
        meta: {
            authRequired: true,
        },
        component: () => import('../views/pages/dashboard/elements/calibers/index')
    },
    // Create an caliber
    {
        path:'/elements/calibers/create',
        name:'create-caliber',
        meta: {
            authRequired: true,
        },
        component: () => import('../views/pages/dashboard/elements/calibers/create')
    },
    // Edit a caliber
    {
        path:'/elements/calibers/:id/edit',
        name:'edit-caliber',
        meta: {
            authRequired: true,
        },
        component: () => import('../views/pages/dashboard/elements/calibers/edit')
    },
    // List all varieties
    {
        path:'/elements/varieties',
        name:'varieties',
        meta: {
            authRequired: true,
        },
        component: () => import('../views/pages/dashboard/elements/varieties/index')
    },
    // Create a variety
    {
        path:'/elements/varieties/create',
        name:'create-variety',
        meta: {
            authRequired: true,
        },
        component: () => import('../views/pages/dashboard/elements/varieties/create')
    },
    // Edit a variety
    {
        path:'/elements/varieties/:id/edit',
        name:'edit-variety',
        meta: {
            authRequired: true,
        },
        component: () => import('../views/pages/dashboard/elements/varieties/edit')
    },
    // List all rootstocks
    {
        path:'/elements/rootstocks',
        name:'rootstocks',
        meta: {
            authRequired: true,
        },
        component: () => import('../views/pages/dashboard/elements/rootstocks/index')
    },
    // Create an rootstock
    {
        path:'/elements/rootstocks/create',
        name:'create-rootstock',
        meta: {
            authRequired: true,
        },
        component: () => import('../views/pages/dashboard/elements/rootstocks/create')
    },
    {
        path:'/elements/rootstocks/:id/edit',
        name:'edit-rootstock',
        meta: {
            authRequired: true,
        },
        component: () => import('../views/pages/dashboard/elements/rootstocks/edit')
    },
]
