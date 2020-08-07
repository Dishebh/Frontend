import jwt from 'jsonwebtoken';

import firebase, { db } from '../firebase';

export async function GoogleSignIn() {
  const provider = new firebase.auth.GoogleAuthProvider();
  /*
      Define Required  Scopes here
  */
  return firebase
    .auth()
    .signInWithPopup(provider)
    .then((result) => {
      db.collection('users')
        .doc(result.user.uid)
        .set(
          {
            name: result.user.displayName,
            email: result.user.email,
            uid: result.user.uid,
            profileImageUrl: result.user.photoURL
          },
          { merge: true }
        )
        .then(() => {
          if (result.additionalUserInfo.isNewUser === true) {
            const firstName = result.additionalUserInfo.profile.given_name;
            if (result.additionalUserInfo.profile.family_name !== undefined) {
              const lastName = result.additionalUserInfo.profile.family_name;
              db.collection('users')
                .doc(result.user.uid)
                .update({ firstName, lastName });
            } else
              db.collection('users').doc(result.user.uid).update({ firstName });
          }
        });
      const resultData = {
        email: result.user.email,
        name: result.user.displayName,
        uid: result.user.uid,
        profileImageUrl: result.user.photoURL
      };

      const newSecureToken = jwt.sign(
        resultData,
        process.env.NEXT_PUBLIC_SECURE_TOKEN_ACCESS_KEY ||
          'af17aa374d12cb43e83faa1c4b4d29b89cfef929cfa5b36ee77e67ccf796cccda5357283ba2cdfc3884fbf6f60ee15ea6fef2f43cb2e028447d809dfeaf64e5823054ce35b362508bf9184e7a52068e36cb6a5c77fad255a99eb4d47a86ebc13b272ad365ee238462f84c39f681e019e23adc0dde9e9277b66c92580103b1c00303e9477ef4164f74d4b762cef5b5394ec3bc4fe8dd483adce3c33015f71b097b544d021033a7992def7af6c80c7241edb07aaa4262625780da9ccca8ff531116fbc9c31f09e7320fe86b23e424bcf7ebdb2dbb2bdcc884e12786f06438e1c4a219ad50462b59d21d82432b435eb590117fea6ac46ab7f7925b1d939ae39158a'
      );
      localStorage.setItem('osc-app-token', newSecureToken);
      return result;
    })
    .catch((error) => {
      return error;
    });
}

export async function GithubSignIn() {
  const provider = new firebase.auth.GithubAuthProvider();
  return firebase
    .auth()
    .signInWithPopup(provider)
    .then((result) => {
      db.collection('users')
        .doc(result.user.uid)
        .set(
          {
            name: result.user.displayName,
            email: result.user.email,
            uid: result.user.uid,
            profileImageUrl: result.user.photoURL
          },
          { merge: true }
        )
        .then(() => {
          if (result.additionalUserInfo.isNewUser === true) {
            const firstName = result.additionalUserInfo.profile.given_name;
            if (result.additionalUserInfo.profile.family_name !== undefined) {
              const lastName = result.additionalUserInfo.profile.family_name;
              db.collection('users')
                .doc(result.user.uid)
                .update({ firstName, lastName });
            } else
              db.collection('users').doc(result.user.uid).update({ firstName });
          }
        });

      const resultData = {
        email: result.user.email,
        name: result.user.displayName,
        uid: result.user.uid,
        profileImageUrl: result.user.photoURL
      };
      const newSecureToken = jwt.sign(
        resultData,
        process.env.NEXT_PUBLIC_SECURE_TOKEN_ACCESS_KEY ||
          'af17aa374d12cb43e83faa1c4b4d29b89cfef929cfa5b36ee77e67ccf796cccda5357283ba2cdfc3884fbf6f60ee15ea6fef2f43cb2e028447d809dfeaf64e5823054ce35b362508bf9184e7a52068e36cb6a5c77fad255a99eb4d47a86ebc13b272ad365ee238462f84c39f681e019e23adc0dde9e9277b66c92580103b1c00303e9477ef4164f74d4b762cef5b5394ec3bc4fe8dd483adce3c33015f71b097b544d021033a7992def7af6c80c7241edb07aaa4262625780da9ccca8ff531116fbc9c31f09e7320fe86b23e424bcf7ebdb2dbb2bdcc884e12786f06438e1c4a219ad50462b59d21d82432b435eb590117fea6ac46ab7f7925b1d939ae39158a'
      );
      localStorage.setItem('osc-app-token', newSecureToken);
      return result;
    })
    .catch((error) => {
      return error;
    });
}

export async function logout() {
  localStorage.removeItem('osc-app-token');
  return firebase
    .auth()
    .signOut()
    .then(() => {
      return 'Success';
    })
    .catch(() => {
      return 'Error';
    });
}

export async function getCurrentUser() {
  return firebase.auth().currentUser;
}

export async function verifySecuredToken(token) {
  return jwt.verify(
    token,
    process.env.NEXT_PUBLIC_SECURE_TOKEN_ACCESS_KEY,
    (err, userData) => {
      if (err) return null;
      if (
        userData.name === (null || undefined) ||
        userData.email === (null || undefined) ||
        userData.uid === (null || undefined)
      )
        return null;
      return userData;
    }
  );
}
