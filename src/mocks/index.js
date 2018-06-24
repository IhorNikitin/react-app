import firebase from 'firebase';

import conferences from './conferences';

export function saveEventsToFB() {
    const eventsRef = firebase.database().ref('/events');
    conferences.forEach(conference => eventsRef.push(conference));
}

window.runMigration = function() {
    firebase.database().ref('/events').once('value', data => {
        if (!data.val()) saveEventsToFB()
    });
};
