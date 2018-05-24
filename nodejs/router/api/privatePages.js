'use strict';
const valenceConnect = require('valence-connect');

/**
 * Private Pages Api
 */
module.exports = (req, res) => {
    let action       = valenceConnect.getParams(req, 'action'),
        sendDocument = (document) => {
            res.sendFile('/privatePages/' + document);
        };

    if (!valenceConnect.isEmpty(action)) {
        if (action === 'hrEmployeeInfo') {
            sendDocument('hrEmployeeInfo.html');
            return;
        } else if (action === 'johnnyMajor') {
            sendDocument('JohnnyMajorInfo.html');
            return;
        }
    }

    // invalid action passed
    //
    res.json({
        success: false,
        msg: 'Invalid action!'
    });
};