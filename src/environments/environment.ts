// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: true,
   firebaseConfig : {
      apiKey: 'AIzaSyCezUq2TQEo1Ob7TY9byd0x8oID048tQzI',
      authDomain: 'odibuddy-bb12a.firebaseapp.com',
      databaseURL: 'https://odibuddy-bb12a.firebaseio.com',
      projectId: 'odibuddy-bb12a',
      storageBucket: 'odibuddy-bb12a.appspot.com',
      messagingSenderId: '142235172066',
      appId: '1:142235172066:web:bd21934d158a6ccf7ff2bb',
      measurementId: 'G-W12Q2TNXTE'
    },
    appShellConfig: {
      debug: false,
      networkDelay: 0
    }

};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
