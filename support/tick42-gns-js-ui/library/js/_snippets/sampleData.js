/**
 * > sample data as it might be sent from
 * a REST or JS-agm publisher
 * > after it goes through the DM it gets pushed
 * to a subscribed UI as shown in sampleReturnData.js
 */

var categoryNews = {
    "name": 'News',
    "glueRouting": {
        "popupMethod": {
            "name": "T42.GNS.News.AgmPopup",
            "parameters": [
                {
                    "name": "toastText",
                    "value": {
                        "stringValue": "A News item has arrived!"
                    }
                }
            ]
        },
        "actions": {
            "path": "/Actions/News",
            "items": [
                {
                    "name": "T42.GNS.Email",
                    "image": "EmailIcon",
                    "description": "Sends an email after several minutes delay",
                    "parameters": [
                        {
                            "name": "delay",
                            "value": {
                                "intValue": 7
                            }
                        }
                    ]
                },
                {
                    "name": "T42.GNS.News.OpenGenericNewsFeed",
                    "description": "Opens or brings to focus the NewsFeed window."
                }
            ]
        }
    },
    "resources": {
        "images": [
            {
                "name": "newsImage",
                "format": "url",
                "data": "url/pointing/to/GenericNewsItem.png"
            },
            {
                "name": "EmailIcon",
                "format": "url",
                "data": "url/pointing/to/envelope.jpg"
            }
        ]
    }
}

var categoryNewsRSS = {
    "name": 'News/RSS',
    "glueRouting": {
        "handlerMethod": {},
        "popupMethod": {
            "name": "T42.GNS.News.Rss.AgmPopup",
            "parameters": [
                {
                    "name": "displayTitle",
                    "value": {
                        "stringValue": "$(title)"
                    }
                }
            ]
        },
        "detailMethod": {
            "name": "T42.GNS.News.Rss.DetailsView",
            "parameters": [
                {
                    "name": "notification",
                    "value": {
                        "stringValue": "$(this)"
                    }
                }
            ]
        },
        "actions": {
            "path": "/Actions/Rss",
            "items": [
                {
                    "name": "T42.GNS.Email",
                    //TODO:   "image": "iconName",
                    "description": "Sends the notification details using the configured email service",
                    "parameters": [
                        {
                            "name": "priority",
                            "value": {
                                "stringValue": "$(severity)"
                            }
                        },
                        {
                            "name": "recepients",
                            "value": {
                                "stringValues": [
                                    "test@mail.com",
                                    "test2@mail.com",
                                    "test3@mail.com"
                                ]
                            }
                        }
                    ]
                },
                {
                    "name": "T42.GNS.News.RSS.Reset"
                }
            ]
        }
    },
    "resources": {
        "images": [
            {
                "name": "newsImage",
                "format": "url",
                "data": "url/pointing/to/RssIcon.png"
            }
        ]
    }
}

var sourceEikon = {
    "name": "Eikon",
    "glueRouting": {
        "actions": {
            "path": "/Actions/Eikon",
            "items": [
                {
                    "name": "T42.GNS.Eikon.CloseSource",
                    "image": "EikonIcon"
                }
            ]
        }
    },
    "resources": {
        "images": [
            {
                "name": "EikonIcon",
                "format": "url",
                "resourceType": "image",
                "data": "url/pointing/to/resource"
            }
        ]
    }
}

var sampleNotification = {
    "id": "1a1bd623-082f-4ef2-92d9-9fe4697715f9",
    "sequenceId": null,
    "type": "Workflow",
    "category": "News/RSS",
    "source": "Eikon",
    "sourceNotificationId": "BPMEngine_cihqc81w30001s8ip0juf7ivf",
    "title": "Uhium biaziti mu ceknoig weeb za.",
    "notificationTime": "3035-01-12T10:28:25.107Z",
    "creationTime": "2016-01-12T10:28:25.107Z",
    "severity": "Info",
    "description": "Gimonara ci her tapeffab tiffajzi saroco pe rotket.",
    "state": "Closed",
    "isRead": false,
    "revision": 0,
    "lifetime": {
        "expiresIn": 43594
    },
    "attributes": [
        {
            "key": "bool",
            "value": {
                "boolValue": true
            }
        },
        {
            "key": "int",
            "value": {
                "intValue": 7
            }
        },
        {
            "key": "long",
            "value": {
                "longValue": 95
            }
        },
        {
            "key": "double",
            "value": {
                "doubleValue": 55.689
            }
        },
        {
            "key": "dateTime",
            "value": {
                "dateTimeValue": "2015-11-07T14:28:25.107Z"
            }
        },
        {
            "key": "string",
            "value": {
                "stringValue": "lorem ipsum"
            }
        },
        {
            "key": "arr bool",
            "value": {
                "boolValues": [
                    true,
                    false,
                    false,
                    true
                ]
            }
        },
        {
            "key": "arr int",
            "value": {
                "intValues": [
                    88,
                    90,
                    4,
                    -9,
                    0
                ]
            }
        },
        {
            "key": "arr long",
            "value": {
                "longValues": [
                    -8908,
                    790,
                    0,
                    -53990,
                    1
                ]
            }
        },
        {
            "key": "arr double",
            "value": {
                "doubleValues": [
                    123089.12809,
                    -980123,
                    8809.12,
                    0
                ]
            }
        },
        {
            "key": "arr dateTime",
            "value": {
                "dateTimeValues": [
                    "2003-01-05T21:32:44.945Z",
                    "2003-01-05T16:00:44.945Z",
                    "2015-12-03T07:09:16.856Z"
                ]
            }
        },
        {
            "key": "arr string",
            "value": {
                "stringValues": [
                    "will",
                    "learn more",
                    "about powerful search",
                    "values",
                    "in",
                    "the"
                ]
            }
        }
    ],
    "target": {
        "groups": [
            "Newfoundland and Labrador"
        ]
    },
    "glueRouting": {
        "detailMethod": {
            "name": "T42.GNS.Custom.NotificationViewer",
            "parameters": [
                {
                    "name": "notification",
                    "value": {
                        "stringValue": "$(this)"
                    }
                }
            ]
        },
        "actions": {
            "path": "/Actions/Rss",
            "items": [
                {
                    "name": "T42.GNS.Email",
                    "image": "EikonIcon",
                    "description": "Sends the notification details using the configured email service",
                    "parameters": [
                        {
                            "name": "priority",
                            "value": {
                                "stringValue": "$(severity)"
                            }
                        },
                        {
                            "name": "recepients",
                            "value": {
                                "stringValues": [
                                    "test@mail.com",
                                    "test2@mail.com",
                                    "test3@mail.com"
                                ]
                            }
                        }
                    ]
                },
                {
                    "name": "T42.GNS.News.OpenGenericNewsFeed",
                    "description": "Opens the news feed without bringing it to focus",
                    "parameters": [
                        {
                            "name": "toFocus",
                            "value": {
                                "boolValue": false
                            }
                        }
                    ]
                },
                {
                    "name": "T42.GNS.Translate",
                    "description": "Passes the title into a translation tool",
                    "parameters": [
                        {
                            "name": "sourceText",
                            "value": {
                                "stringValue": "$(title)"
                            }
                        }
                    ]
                }
            ]
        }
    }
}
