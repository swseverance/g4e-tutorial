var mockedData = module.exports = {}

mockedData.getData = function getData () {
    //console.log('getting mock data...')
    return [
        {
            "creationTime": "2014-07-08T09:02:21.377",
            "description": "Order 12345 to buy 100 shares of VOD.L at 0.9 filled with 50 lots",
            "id": "fead152f382443bd9907e966670c9d3a",
            "lifetime": {
                "expiresAt": "2014-07-08T09:02:21.377"
            },
            "notificationTime": "2014-07-08T09:02:21.377",
            "revision": 1,
            "sequenceId": 1,
            "severity": "Info",
            "source": "OMS",
            "category": "weffdqwqekh",
            "sourceNotificationId": "101",
            "state": "Acknowledged",
            "attributes": [
                {
                    "key": "type",
                    "value": "execution"
                },
                {
                    "key": "orderStatus",
                    "value": "filled"
                }
            ],
            "target": {
                "groups": [
                    "SalesTrader",
                    "ProgramTrader"
                ]
            },
            "title": "Bought 50 VOD.L @ 0.9",
            "type": "TRADING"
        },
        {
            "creationTime": "2015-07-08T09:02:22.450",
            "description": "Order 12346 to sell 100 shares of VOD.L at 1.2 filled with 30 lots",
            "id": "f62abdf6500b4fba9387252fd60b8875",
            "lifetime": {
                "expiresAt": "2015-07-08T09:02:21.377"
            },
            "notificationTime": "2015-07-08T09:02:21.377",
            "revision": 1,
            "sequenceId": 2,
            "severity": "Info",
            "source": "OMS",
            "sourceNotificationId": "102",
            "state": "Active",
            "attributes": [
                {
                    "key": "type",
                    "value": "execution"
                },
                {
                    "key": "orderStatus",
                    "value": "partiallyFilled"
                }
            ],
            "target": {
                "_users": [
                    "N559541",
                    "N630647"
                ]
            },
            "title": "Sold 30 VOD.L @ 1.2",
            "type": "TRADING"
        },
        {
            "creationTime": "2015-07-07T09:02:21.377",
            "description": "Due to maintenance, your machine will be automatically rebooted in 30 minutes. Please save your work.",
            "id": "b801f81d701f4fdf95f206413ef4e1c0",
            "lifetime": {
                "expiresAt": "2015-07-08T09:02:21.377"
            },
            "notificationTime": "2015-07-08T09:02:21.377",
            "revision": 1,
            "sequenceId": 3,
            "severity": "Warn",
            "source": "OPERATE",
            "sourceNotificationId": "1795",
            "state": "Closed",
            "attributes": [
                {
                    "key": "importance",
                    "value": "high"
                },
                {
                    "key": "type",
                    "value": "reboot"
                }
            ],
            "target": {
                "group": [
                    "Users"
                ]
            },
            "title": "Your machine will be rebooted in 30 minutes",
            "type": "NOTIFICATION"
        },
        {
            "creationTime": "2015-07-07T09:02:21.377",
            "description": "Due to maintenance, your machine will be automatically rebooted in 45 minutes. Please save your work.",
            "id": "000cecad49cf4edb8d24858fa1f81a4e",
            "lifetime": {
                "expiresAt": "2015-07-08T09:02:21.377"
            },
            "notificationTime": "2015-07-08T09:02:21.377",
            "revision": 1,
            "sequenceId": 4,
            "severity": "Warn",
            "source": "OPERATE",
            "sourceNotificationId": "1796",
            "state": "Active",
            "attributes": [
                {
                    "key": "importance",
                    "value": "high"
                },
                {
                    "key": "type",
                    "value": "reboot"
                }
            ],
            "target": {
                "group": [
                    "Users"
                ]
            },
            "title": "Your machine will be rebooted in 45 minutes",
            "type": "NOTIFICATION"
        },
        {
            "creationTime": "2005-07-07T09:02:21.377",
            "description": "Oldest notification",
            "id": "000cecad49cf4edb8d24858fa1f81a4e",
            "lifetime": {
                "expiresAt": "2015-07-08T09:02:21.377"
            },
            "notificationTime": "2015-07-08T09:02:21.377",
            "revision": 1,
            "sequenceId": 4,
            "severity": "Error",
            "source": "OPERATE",
            "sourceNotificationId": "1796",
            "state": "Active",
            "attributes": [
                {
                    "key": "importance",
                    "value": "high"
                },
                {
                    "key": "type",
                    "value": "reboot"
                }
            ],
            "target": {
                "group": [
                    "Users"
                ]
            },
            "title": "Oldest",
            "type": "NOTIFICATION"
        },
        {
            "creationTime": "2015-11-30T09:02:21.377",
            "description": "Most recent notification",
            "id": "000cecad49cf4edb8d24858fa1f81a4e",
            "lifetime": {
                "expiresAt": "2015-11-30T09:02:21.377"
            },
            "notificationTime": "2015-07-08T09:02:21.377",
            "revision": 1,
            "sequenceId": 4,
            "severity": "Error",
            "source": "OPERATE",
            "sourceNotificationId": "1796",
            "state": "Active",
            "attributes": [
                {
                    "key": "importance",
                    "value": "high"
                },
                {
                    "key": "type",
                    "value": "reboot"
                }
            ],
            "target": {
                "group": [
                    "Users"
                ]
            },
            "title": "Most recent",
            "type": "NOTIFICATION"
        }

    ]
}

mockedData.getColumns = function getColumns () {

    return [
        { 'title': 'Time', data: 'notificationTime', name: 'notificationTime', className: 'notificationTime' },
        { 'title': 'Severity', data: 'severity', name: 'severity', className: 'severity' },
        { 'title': 'Type', data: 'type', name: 'type', className: 'type' },
        { 'title': 'Title', data: 'title', name: 'title', className: 'title' },
        { 'title': 'Category', data: 'category', name: 'category', className: 'category', defaultContent: ''},
        { 'title': 'Source', data: 'source', name: 'source', className: 'source' },
        { 'title': 'State', data: 'state', name: 'state', className: 'state' }
        /*,
        { 'title': 'Fields', data: 'hasReqFields', name: 'hasReqFields', className: 'has-req-fields' }*/
    ]
}

mockedData.getOne = function getOne() {
    return [{
            "creationTime": "2015-12-10T10:42:21.377",
            "description": "Order 12345 to buy 100 shares of VOD.L at 0.9 filled with 50 lots",
            "id": "fead152f382443bd9s907e966670c9d3a",
            "lifetime": {
            "expiresAt": "2014-07-08T09:02:21.377"
        },
            "notificationTime": "2015-12-18T09:02:21.377",
            "revision": 1,
            "sequenceId": 1,
            "severity": "Info",
            "source": "OMS",
            "sourceNotificationId": "101",
            "state": "Acknowledged",
            "attributes": [
            {
                "key": "type",
                "value": "execution"
            },
            {
                "key": "orderStatus",
                "value": "filled"
            }
        ],
            "target": {
            "groups": [
                "SalesTrader",
                "ProgramTrader"
            ],
            "users": [
                "user 1",
                "user 2"
            ]
        },

            "reminder": {
                //"remindPeriod": 180
        },

            "title": "Bought 50 VOD.L @ 0.9",
            "type": "TRADING"
    }]
}