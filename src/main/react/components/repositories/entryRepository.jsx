import React from 'react';
import firebase from '../../../firebase'

export default class EntryRepository {

  findAll() {
    let ref = firebase.database().ref('entries');
    return ref.once('value').then(function (snapshot) {
      return Object.keys(snapshot.val()).map(key => snapshot.val()[key]).reverse();
    }, function (error) {
      console.error(error);
    });
  }

  getNextId() {
    let ref = firebase.database().ref('entries');
    return ref
      .orderByChild('id')
      .limitToLast(1)
      .once('value').then(function (snapshot) {
        if (snapshot.val()) return snapshot.val()[Object.keys(snapshot.val())[0]].id + 1
      }, function (error) {
        console.error(error);
      });
  }

  findByFriendlyUrl(friendlyUrl) {
    let ref = firebase.database().ref('entries');
    return ref
      .orderByChild('friendlyUrl')
      .equalTo(friendlyUrl)
      .once('value').then(function (snapshot) {
        if (snapshot.val()) return snapshot.val()[Object.keys(snapshot.val())[0]]
      }, function (error) {
        console.error(error);
      });
  }

  create(entry) {
    let ref = firebase.database().ref('entries');
    ref.push(entry);
  }
}