function invokeDetailMethod(notification){
    //the popupMethod and actions can be invoked in a similar way

    var method = notification.glueRouting.detailMethod

    invokeGlueRoutingMethod(method, notification)
}

function tokensToStringArr(tokens){
    return tokens.map(function(token){
        var result = token.literal ? token.literal : ("~" + token.macro + "~")

        return result
    })
}

function testMacroParsing(){

    var testCases = []

    var longText = "This is a $(severity) grade notification. Please respond to all $(type) events via email $(source)@email.com, making sure to quote '$(id): $(title)' in the subject."
    testCases.push({input: longText, expected:[
            {literal:"This is a "},{macro:"severity"},{literal:" grade notification. Please respond to all "},
            {macro:"type"},{literal:" events via email "},{macro:"source"},
            {literal:"@email.com, making sure to quote '"},{macro:"id"},{literal:": "},{macro:"title"},
            {literal:"' in the subject."}
        ]
    })

    var justMacro = "$(env::region?defaultValue)"
    testCases.push({input: justMacro, expected:
        [{literal:""},{macro:"env::region?defaultValue"}]
    })

    var justLiteral = "This is just a Literal"
    testCases.push({input:justLiteral, expected:
        [{literal:"This is just a Literal"}]
    })

    var startWithMacro = "$(env::region?defaultValue) kjsdlaskjd"
    testCases.push({input: startWithMacro, expected:
        [{literal:""},{macro:"env::region?defaultValue"},{literal:" kjsdlaskjd"}]
    })

    var macrosSequence = "$(sys::count)$(creationTime)"
    testCases.push({input:macrosSequence, expected:
        [{literal:""},{macro:"sys::count"},{literal:""},{macro:"creationTime"}]
    })

    var failToClose = " $(type kjsdlaskjd"
    testCases.push({input: failToClose, expected:
        [{literal:" "},{literal:"$(type kjsdlaskjd"}]
    })

    var failToOpen = "some type) of"
    testCases.push({input: failToOpen, expected:
        [{literal:"some type) of"}]
    })

    var doubleOpen = "the cjih $(type $(severity)"
    testCases.push({input: doubleOpen, expected:
        [{literal:"the cjih "},{macro:"type $(severity"}]
    })

    var nestedMacros = "dsf $($())"
    testCases.push({input: nestedMacros, expected:
        [{literal:"dsf "},{macro:"$("},{literal:")"}]
    })

    var emptyText = ""
    testCases.push({input: emptyText, expected:
        []
    })

    var emptyMacro = "ashd $() sdsF"
    testCases.push({input: emptyMacro, expected:
        [{literal:"ashd "},{macro:""},{literal:" sdsF"}]
    })

    //console.log(parseMacro(justMacro)); return;

    var series = testCases.map(function(test){
        test.passed = false

        try {
            test.actual = parseMacro(test.input)

            if(Array.isArray(test.actual) && test.actual.length === test.expected.length){

                test.passed = test.actual.reduce(function(passed, currEl, index){
                    if( passed
                        && currEl.literal === test.expected[index].literal
                        && currEl.macro === test.expected[index].macro
                        && !(currEl.macro && currEl.literal) )
                    {
                        return true
                    }
                    return false
                }, true)

            }

        } catch (e) {
            test.exception = e.name
        }

        return test
    })

    printSeriesInConsole(series)
}

function testMacroInterpret(){

    var testCases = []

    var envVar = "env::region?defaultRegion"
    testCases.push({input: envVar, expected: htmlContainer.env.region})

    var envVarNoDefault = "env::env"
    testCases.push({input: envVarNoDefault, expected: htmlContainer.env.env})

    var envVarNotExists = "env::missingprop"
    testCases.push({input:envVarNotExists, expected: undefined})

    var envVarNotExistsWithDefault = "env::missingprop?missingDefault"
    testCases.push({input:envVarNotExistsWithDefault, expected:'missingDefault'})

    var envTooManyQuestionMarks = "env::region?some?more"
    testCases.push({input: envTooManyQuestionMarks, expected: htmlContainer.env.region})

    var envMissingTooManyQuestionMarks = "env::missingprop?some?more"
    testCases.push({input: envMissingTooManyQuestionMarks, expected: 'some?more'})

    var sysCount = "sys::count"
    var expectedSysCount = '7'
    testCases.push({input: sysCount, expected: expectedSysCount})

    var sysMissingMethod = "sys::missing"
    testCases.push({input: sysMissingMethod, expected: undefined})

    var simpleProperty = "severity"
    testCases.push({input: simpleProperty, expected: sampleNotification.severity})

    var propNested = "lifetime.expiresIn"
    testCases.push({input: propNested, expected: sampleNotification.lifetime.expiresIn.toString()})

    var validIndexNotValidPropName = "1"
    testCases.push({input: validIndexNotValidPropName, expected: undefined})

    var invalidPropName = "^%(("
    testCases.push({input: invalidPropName, expected: undefined})

    var collectionOfStrings = "testCollection"
    sampleNotification.testCollection = ['a', 'b', 'c']
    testCases.push({input: collectionOfStrings, expected: sampleNotification.testCollection.toString()})

    var collectionElement = "testCollection[1]"
    sampleNotification.testCollection = ['a', 'b', 'c']
    testCases.push({input: collectionElement, expected: 'b'})

    var collectionElementOutOfRange = "testCollection[5]"
    sampleNotification.testCollection = ['a', 'b', 'c']
    testCases.push({input: collectionElementOutOfRange, expected: undefined})

    var collectionNestedElement = "testProp.nestedTestCollection[2]"
    sampleNotification.testProp = {nestedTestCollection: ['d','e','f']}
    testCases.push({input: collectionNestedElement, expected: 'f'})

    var propObject = "testProp"
    testCases.push({input: propObject, expected: sampleNotification.testProp.toString()})

    var nestedAction = "glueRouting.actions.items[1].name"
    testCases.push({input: nestedAction, expected: sampleNotification.glueRouting.actions.items[1].name})

    var nestedActionBadRoute = "glueRouting.actions.items[sddvae].name"
    testCases.push({input: nestedActionBadRoute, expected: undefined})

    var nestedActionWithBrackets = "glueRouting[actions].items[1].name"
    testCases.push({input: nestedActionWithBrackets, expected: sampleNotification.glueRouting.actions.items[1].name})

    var nestedActionMissedDot = "glueRouting[actions]items[1].name"
    testCases.push({input: nestedActionMissedDot, expected: undefined})

    //console.log(interpretMacro(nestedAction, sampleNotification)); return;

    var series = testCases.map(function(test){
        test.passed = false

        try {
            test.actual = interpretMacro(test.input, sampleNotification, function(){return expectedSysCount})
            test.passed = (test.expected === test.actual)
        } catch (e) {
            test.exception = e.name
        }

        return test
    })

    printSeriesInConsole(series)
}

function testGnsValueParsing() {

    var enumTypes = [
        '__missingEnum__',
        'INVALID_ENUM_TYPE',
        'boolValue',
        'intValue',
        'longValue',
        'doubleValue',
        'dateTimeValue',
        'stringArray',
        'boolArray',
        'intArray',
        'longArray',
        'doubleArray',
        'dateTimeArray',
        'stringValue'
    ]

    var keyTypes = [
        "__missingKey__",
        "invalidKeyType",
        "boolValue",
        "intValue",
        "longValue",
        "doubleValue",
        "dateTimeValue",
        "stringValue",
        "boolValues",
        "intValues",
        "longValues",
        "doubleValues",
        "dateTimeValues",
        "stringValues"
    ]

    var inputDataSet = [
        undefined,
        null,
        true,
        false,
        897,
        -72364,
        456892189789,
        -7456892189789,
        45689218.9789,
        -745689218.9789,
        '2015-11-07T14:28:25.107Z',
        new Date('2015-11-07T14:28:25.107Z'),
        new Date('invalid date'),
        'some string lorem ipsum',
        NaN,
        [],
        [true, false, false],
        [1287387, -898, 9],
        [1287123387, -548898, 29],
        [45689218.9789, -548.898, 29],
        [45689218.9789, -548.898, 29, NaN],
        [
            '2015-11-07T14:28:25.107Z',
            '2015-01-07T14:28:25.107Z',
            'this should be invalid date'
        ],
        [
            new Date('2015-11-07T14:28:25.107Z'),
            new Date('2015-01-07T14:28:25.107Z'),
            new Date('this should be invalid date')
        ],
        ['asd uhas 78y3b  98', 'йсдхфб 873 б', '']
    ]
    //inputDataSet = ['test1'] //TODO testing only one to reduce the number of cases (from 4700)

    var extraProps = _.cloneDeep(keyTypes)

    var invalidCases = []

    /**
     * nested loops create invalid data
     * combinations of mismatched key-enum with data
     * extra prop is a 3rd property; *any* 3rd property must make the object invalid
     */
    extraProps.forEach(function (extraProp, xtradex) {

        enumTypes.forEach(function (enumType, endex) {

            keyTypes.forEach(function (keyType, keydex) {

                inputDataSet.forEach(function (dataPod) {

                    //since either it's a valid case or it's an already-covered invalid case
                    //only add an extra property if the keyType property is missing
                    if (keyType === "__missingKey__" && extraProp !== "__missingKey__" ){
                        return;
                    }

                    if (endex !== keydex                   //enum-vs-key mismatch
                        || endex === 0 || keydex === 0     //invalid enum or invalid key
                        || endex === 1 || keydex === 1) {  //missing enum or invalid key
                        var badObj

                        if (enumType === '__missingEnum__') {
                            badObj = {}
                        } else {
                            badObj = {
                                type: enumType
                            }
                        }

                        if (keyType !== "__missingKey__") {
                            badObj[keyType] = dataPod
                        }

                        //TODO test with all kinds of data
                        if (extraProp !== "__missingKey__") {
                            badObj[extraProp] = dataPod
                        }

                        invalidCases.push({
                            input: badObj,
                            expected: undefined //all invalid GnsValue object must be parsed to 'undefined'
                        })

                    } else if (endex === keydex
                        && endex !== 0
                        && endex !== 1
                        && extraProp !== "__missingKey__") {

                        //includes all potentially valid cases where key and enum match (valid depending on data)
                        //having the extra prop invalidates them
                        var badObj = {
                            type: enumType
                        }
                        badObj[keyType] = dataPod
                        badObj[extraProp] = dataPod //TODO test with all kinds of data

                        invalidCases.push({
                            input: badObj,
                            expected: undefined //all invalid GnsValue object must be parsed to 'undefined'
                        })

                    }

                })

            })

        })

    })


    var validCases = []
    
    /** enum-typed GnsValues */
    var typedBool = {type: 'boolValue', boolValue: true}
    validCases.push({input: typedBool, expected: true})

    var typedBoolFalse = {type: 'boolValue', boolValue: false}
    validCases.push({input: typedBoolFalse, expected: false})

    var typedInt = {type: 'intValue', intValue: 897}
    validCases.push({input: typedInt, expected: 897})

    var typedIntNeg = {type: 'intValue', intValue: -72364}
    validCases.push({input: typedIntNeg, expected: -72364})

    var typedLong = {type: 'longValue', longValue: 456892189789}
    validCases.push({input: typedLong, expected: 456892189789})

    var typedLongNeg = {type: 'longValue', longValue: -7456892189789}
    validCases.push({input: typedLongNeg, expected: -7456892189789})

    var typedDouble = {type: 'doubleValue', doubleValue: 45689218.9789}
    validCases.push({input: typedDouble, expected: 45689218.9789})

    var typedDoubleNeg = {type: 'doubleValue', doubleValue: -745689218.9789}
    validCases.push({input: typedDoubleNeg, expected: -745689218.9789})

    var expectedDate = new Date('2015-11-07T14:28:25.107Z')
    var typedDate = {type: 'dateTimeValue', dateTimeValue: expectedDate}
    validCases.push({input: typedDate, expected: expectedDate })

    var typedString = {type: 'stringValue', stringValue: 'akbbhjbd'}
    validCases.push({input: typedString, expected: 'akbbhjbd'})


    /** enum-typed GnsValues array[s] */
    var typedBoolArr = {type: 'boolArray', boolValues: [true, false, false]}
    validCases.push({input: typedBoolArr, expected: [true, false, false]})

    var typedBoolArr_empty = {type: 'boolArray', boolValues: []}
    validCases.push({input: typedBoolArr_empty, expected: []})

    var typedIntArr = {type: 'intArray', intValues: [1287387, -898, 9]}
    validCases.push({input: typedIntArr, expected: [1287387, -898, 9]})

    var typedIntArr_empty = {type: 'intArray', intValues: []}
    validCases.push({input: typedIntArr_empty, expected: []})

    var typedLongArr = {type: 'longArray', longValues: [1287123387, -548898, 29]}
    validCases.push({input: typedLongArr, expected: [1287123387, -548898, 29]})

    var typedLongArr_empty = {type: 'longArray', longValues: []}
    validCases.push({input: typedLongArr_empty, expected: []})

    var typedDoubleArr = {type: 'doubleArray', doubleValues: [45689218.9789, -548.898, 29]}
    validCases.push({input: typedDoubleArr, expected: [45689218.9789, -548.898, 29]})

    var typedDoubleArr_empty = {type: 'doubleArray', doubleValues: []}
    validCases.push({input: typedDoubleArr_empty, expected: []})

    var typedDateArr = {type: 'dateTimeArray', dateTimeValues: [
        new Date('2015-11-07T14:28:25.107Z'),
        new Date('2015-01-07T14:28:25.107Z'),
        new Date('this should be invalid date')
    ]}
    validCases.push({input: typedDateArr, expected: [
        new Date('2015-11-07T14:28:25.107Z'),
        new Date('2015-01-07T14:28:25.107Z'),
        new Date('this should be invalid date')
    ]})

    var typedDateArr_empty = {type: 'dateTimeArray', dateTimeValues: []}
    validCases.push({input: typedDateArr_empty, expected: []})

    var typedStringArr = {type: 'stringArray', stringValues: ['asd uhas 78y3b  98', 'йсдхфб 873 б', '']}
    validCases.push({input: typedStringArr, expected: ['asd uhas 78y3b  98', 'йсдхфб 873 б', '']})

    var typedStringArr_empty = {type: 'stringArray', stringValues: []}
    validCases.push({input: typedStringArr_empty, expected: []})



    /** untyped GnsValues */
        /*
    var simpleBool = {boolValue: true}
    testCases.push({input: simpleBool, expected: undefined})

    var simpleBoolFalse = {boolValue: false}
    testCases.push({input: simpleBoolFalse, expected: undefined})

    var simpleInt = {intValue: 897}
    testCases.push({input: simpleInt, expected: undefined})

    var simpleIntNeg = {intValue: -72364}
    testCases.push({input: simpleIntNeg, expected: undefined})

    var simpleLong = {longValue: 456892189789}
    testCases.push({input: simpleLong, expected: undefined})

    var simpleLongNeg = {longValue: -7456892189789}
    testCases.push({input: simpleLongNeg, expected: undefined})

    var simpleDouble = {doubleValue: 45689218.9789}
    testCases.push({input: simpleDouble, expected: undefined})

    var simpleDoubleNeg = {doubleValue: -745689218.9789}
    testCases.push({input: simpleDoubleNeg, expected: undefined})

    var aDateString = '2015-11-07T14:28:25.107Z'
    var simpleDate = {dateTimeValue: aDateString}
    testCases.push({input: simpleDate, expected: undefined })

    var simpleString = {stringValue: 'just a string'}
    testCases.push({input: simpleString, expected: undefined})
*/
    /** untyped GnsValues array[s] */
        /*
    var simpleBoolArr = {boolValues: [true, false, false]}
    testCases.push({input: simpleBoolArr, expected: undefined})

    var simpleBoolArr_empty = {boolValues: []}
    testCases.push({input: simpleBoolArr_empty, expected: undefined})

    var simpleIntArr = {intValues: [1287387, -898, 9]}
    testCases.push({input: simpleIntArr, expected: undefined})

    var simpleIntArr_empty = {intValues: []}
    testCases.push({input: simpleIntArr_empty, expected: undefined})

    var simpleLongArr = {longValues: [1287123387, -548898, 29]}
    testCases.push({input: simpleLongArr, expected: undefined})

    var simpleLongArr_empty = {longValues: []}
    testCases.push({input: simpleLongArr_empty, expected: undefined})

    var simpleDoubleArr = {doubleValues: [45689218.9789, -548.898, 29]}
    testCases.push({input: simpleDoubleArr, expected: undefined})

    var simpleDoubleArr_empty = {doubleValues: []}
    testCases.push({input: simpleDoubleArr_empty, expected: undefined})

    var simpleDateArr = {dateTimeValues: [
        '2015-11-07T14:28:25.107Z',
        '2015-01-07T14:28:25.107Z',
        'this should be invalid date'
    ]}
    testCases.push({input: simpleDateArr, expected: undefined})

    var simpleDateArr_empty = {dateTimeValues: []}
    testCases.push({input: simpleDateArr_empty, expected: undefined})

    var simpleStringArr = {stringValues: ['asd uhas 78y3b  98', 'йсдхфб 873 б', '']}
    testCases.push({input: simpleStringArr, expected: undefined})

    var simpleStringArr_empty = {stringValues: []}
    testCases.push({input: simpleStringArr_empty, expected: undefined})
*/
    /** untyped, with type-key js-type mismatch */
        /*
    var badKey = {invalidKeyValue: true}
    testCases.push({input: badKey, expected: undefined})

    var unparsableDate = {dateTimeValue: 'i am unparsable'}
    testCases.push({input: unparsableDate, expected: new Date('')})//'InvalidDate' object

    //expect the parser to round if it is a 'number'
    var simpleIntNeg_misFloat = {intValue: -364.6456}
    testCases.push({input: simpleIntNeg_misFloat, expected: -365})

    var simpleIntNeg_misRandomString = {intValue: 'akbbhjbd'}
    testCases.push({input: simpleIntNeg_misRandomString, expected: undefined})

    var simpleIntNeg_getNaN = {intValue: NaN}
    testCases.push({input: simpleIntNeg_getNaN, expected: undefined})

    var simpleString_getNumber = {stringValue: 832}
    testCases.push({input: simpleString_getNumber, expected: undefined})
*/

    /** mixed js-types in array for otherwise valid type */
    var mixedArrInvalidCases = []

    var mixedDateArr = {type: 'dateTimeArray', dateTimeValues: [
        new Date('2015-11-07T14:28:25.107Z'),
        new Date('2015-01-07T14:28:25.107Z'),
        'lorem ipsum'
    ]}
    mixedArrInvalidCases.push({input: mixedDateArr, expected: undefined})


    //var testCases =  validCases.concat(invalidCases, mixedArrInvalidCases)
    //var testCases = validCases
    //var testCases = invalidCases
    var testCases = mixedArrInvalidCases

    //console.log(gnsValueToPlainJsValue(simpleBoolArr, sampleNotification)); return;
    //testCases = [];
    //testCases.push({input: {}, expected: undefined});

    var testComparer = function (expected, actual) {
        if(Object.prototype.toString.call(expected) === "[object Date]") {

            if (Object.prototype.toString.call(actual) !== "[object Date]") {

                return false //actual is not a date

            } else if (isNaN(expected.getTime())) {

                return isNaN(actual.getTime()) //check if both are 'Invalid Date'

            } else {

                return expected.getTime() === actual.getTime() //compare dates

            }

        } else if( expected != expected) {

            return actual != actual //checking the NaN

        } else {

            return expected === actual

        }
    }
    var series = testCases.map(function(test){
        test.passed = false

        try {
            test.actual = gnsValueToPlainJsValue(test.input, sampleNotification)

            if(Array.isArray(test.actual) && Array.isArray(test.expected) && test.actual.length === test.expected.length) {
                test.passed = test.actual.reduce(function(passed, currEl, index){
                    return ( passed && testComparer(test.expected[index], currEl) )
                }, true)
            } else {
                test.passed = testComparer(test.expected, test.actual)
            }

        } catch (e) {
            //test.exception = e.name
            console.log(e.stack)
        }

        //TODO refactor display to show detailed inputs
        var propName;
        for(var keyName in test.input){
            if (test.input.hasOwnProperty(keyName) && keyName !== 'type'){
                propName = keyName
            }
        }
        test.input = '{ '
            + ( test.input.hasOwnProperty('type') ? ('type: ' + test.input.type + ', ') : '' ) +
            (
                propName === undefined
                    ? ''
                    : propName.toString()+ ': ' +
                        (
                            test.input[propName] === undefined || test.input[propName] === null
                                ? ''
                                : test.input[propName].toString()
                        )
            )
            + ' }'

        test.actual = Array.isArray(test.actual) ? '[ '+test.actual.toString()+' ]' : test.actual
        test.expected = Array.isArray(test.expected) ? '[ '+test.expected.toString()+' ]' : test.expected
        //TODO ...to here

        return test
    })

    printSeriesInConsole(series)
}

function printSeriesInConsole(series){
    console.table(series)
    var summary = series.reduce(function(failed, cur){
        failed = cur.passed ? failed : (failed + 1)
        return failed
    }, 0)
    summary > 0 ? console.warn('Failed tests_____ ', summary) : console.log("__All Pass__")
}

function listAllActions(notification){
    var actions = []

    if(!notification.glueRouting || !notification.glueRouting.actions || !notification.glueRouting.actions.items){
        return;
    }

    var items = notification.glueRouting.actions.items

    for(var index in items){
        var item = items[index]
        actions.push({methodName: item.name, image: item.image, description: item.description})
    }

    return actions
}

function listAllResourceInfo(notification){
    var resourcesImages = []

    if(!notification.resources || !notification.resources.images){
        return;
    }

    var images = notification.resources.images

    for(var index in images){
        var image = images[index]
        var name = image.name
        var data = image.format === 'url' ? image.data : ''
        resourcesImages.push({name: name, data: data})
    }

    return resourcesImages
}
