import * as Linking from 'expo-linking';

export default {
  prefixes: [Linking.makeUrl('/')],
  config: {
    screens: {
      Root: {
        screens: {
          TabOne: {
            screens: {
              DashboardScreen: 'one',
            },
          },
          TabTwo: {
            screens: {
              ActionsScreen: 'two',
            },
          },
          TabThree: {
            screens: {
              SettingsScreen: 'three',
            },
          },
          TabOneAya: {
            screens: {
              InventoryScreen: 'oneAya',
            },
          },
          TabTwoAya: {
            screens: {
              FAQScreen: 'twoAya',
            },
          },
        },

      },
      NotFound: '*',
    },
  },
};
