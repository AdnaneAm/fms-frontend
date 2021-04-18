export const menuItems = [
    {
        id: 1,
        label: "menuitems.menu.text",
        isTitle: true
    },
    {
        id: 2,
        label: 'menuitems.dashboard.text',
        icon: 'ri-dashboard-line',
        link: '/'
    },
    {
        id: 3,
        label: 'menuitems.farmers.text',
        isTitle: true
    },
    {
        id: 4,
        label: 'menuitems.farmers.list.farmers',
        icon: ' ri-group-line',
        link: '/farmers',
    },
    {
        id: 5,
        label: 'menuitems.farmers.list.addfarmer',
        icon: 'ri-user-add-line',
        link: '/farmers/create',
    },
    {
        id: 6,
        label: 'menuitems.crops.text',
        isTitle: true
    },
    {
        id:7,
        label: 'menuitems.crops.list.peach.text',
        link:'',
        subItems:[
            {
                id:8,
                label:'menuitems.crops.list.peach.list.peachcrops',
                link:'/crops/peach'
            },
            {
                id:9,
                label:'menuitems.crops.list.peach.list.addpeach',
                link:'/crops/peach/create'
            }
        ]
    },
    {
        id:10,
        label: 'menuitems.crops.list.olives.text',
        link:'',
        subItems:[
            {
                id:11,
                label:'menuitems.crops.list.olives.list.olivescrops',
                link:'/crops/olives'
            },
            {
                id:12,
                label:'menuitems.crops.list.olives.list.addolives',
                link:'/crops/olives/create'
            }
        ]
    },
    {
        id:13,
        label: 'menuitems.crops.list.almond.text',
        link:'',
        subItems:[
            {
                id:14,
                label:'menuitems.crops.list.almond.list.almondcrops',
                link:'/crops/almond'
            },
            {
                id:15,
                label:'menuitems.crops.list.almond.list.addalmond',
                link:'/crops/almond/create',
            }
        ]
    },
    {
        id:16,
        label:'menuitems.outgoings.text',
        isTitle: true
    },
    {
        id:17,
        label:'menuitems.expenses.text',
        icon:'ri-bill-line',
        requireAdmin:true,
        subItems:[
            {
                id:18,
                label:'menuitems.expenses.list.expenses',
                link:'/expenses'
            },
            {
                id:19,
                label:'menuitems.expenses.list.addexpenses',
                link:'/expenses/create'
            },
        ]
    },
    {
        id:20,
        label:'menuitems.expensetypes.text',
        icon:'ri-ticket-line',
        requireAdmin:true,
        subItems:[
            {
                id:21,
                label:'menuitems.expensetypes.list.expensetypes',
                link:'/expensetypes'
            },
            {
                id:22,
                label:'menuitems.expensetypes.list.addexpensetype',
                link:'/expensetypes/create'
            },
        ]
    },
    {
        id:23,
        label:'menuitems.outgoings.text',
        icon:'ri-wallet-3-line',
        subItems:[
            {
                id:24,
                label:'menuitems.outgoings.list.outgoings',
                link:'/outgoings'
            },
            {
                id:25,
                label:'menuitems.outgoings.list.addoutgoing',
                link:'/outgoings/create'
            },
        ]
    },
    {
        id:26,
        label:'menuitems.elements.text',
        isTitle: true
    },
    {
        id:27,
        label:'menuitems.elements.list.parcels.text',
        link:'',
        subItems:[
            {
                id:28,
                label:'menuitems.elements.list.parcels.list.parcelslist',
                link:'/elements/parcels'
            },
            {
                id:29,
                label:'menuitems.elements.list.parcels.list.addparcel',
                link:'/elements/parcels/create'
            },
        ]
    },
    {
        id:30,
        label:'menuitems.elements.list.calibers.text',
        link:'',
        subItems:[
            {
                id:31,
                label:'menuitems.elements.list.calibers.list.caliberslist',
                link:'/elements/calibers'
            },
            {
                id:32,
                label:'menuitems.elements.list.calibers.list.addcaliber',
                link:'/elements/calibers/create'
            },
        ]
    },
    {
        id:33,
        label:'menuitems.elements.list.rootstocks.text',
        link:'',
        subItems:[
            {
                id:34,
                label:'menuitems.elements.list.rootstocks.list.rootstockslist',
                link:'/elements/rootstocks'
            },
            {
                id:35,
                label:'menuitems.elements.list.rootstocks.list.addrootstock',
                link:'/elements/rootstocks/create'
            },
        ]
    },
    {
        id:36,
        label:'menuitems.elements.list.varieties.text',
        link:'',
        subItems:[
            {
                id:37,
                label:'menuitems.elements.list.varieties.list.varietieslist',
                link:'/elements/varieties'
            },
            {
                id:38,
                label:'menuitems.elements.list.varieties.list.addvariety',
                link:'/elements/varieties/create'
            },
        ]
    },
]