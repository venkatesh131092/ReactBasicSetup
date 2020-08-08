# React Redux Boilerplate

## Features :

- **Module Based**,
- **Better Integration with Material UI**,
- **Better Handling of Forms,Declarative Routing and Authorization**,
- **Better Integration with Axios and Redux**,
- **Less Jumping Between Files**,
- **Appropriate for Teams.**

### Module based

If a React component is building block, that means smallest but complete in itself part of UI, then modules are like kitchen,bedroom,hall and bathroom. Each module compromises of many components some are unique to them,than some are even unique to one part of them, some shared between other parts of module and some that module is sharing from other module.

Without having a predefined guidline, different people in team will like to put them at different places, with this boilerplate(or modifying this more) you can create a guideline for that.

I have kept reducers,redux and route module wise instead of handling them somewhere at top level, so that you don't have to go there to write a action and handle that in reducer and come back.

In `src/appModules` you can write your modules which have these three files and one pages folder.

```
pages/
actions.js
reducer.js
routes.js
```

In `pages` you have `styles` folder, pages folders like `forgot-password`,`sign up` , `sign`, and if shared component between these pages then they can be also in the root folder like this.

```
styles/
sign-in/
forgot-password/
sign-up/
Form.js
AnyOtherComponent.js
```

This way we are keeping all needed files as close as possible to this module with a clear strategy to share code without jumping much from file to file.

### Material UI intergration and form handling

We can use material UI components like Snackbar to show notifications very efficiently with redux. we have kept Snackbar component at some top level Layout component which open when provided open prop equals to true, which is subscribed to redux, so any where in app if we call `showMessage("something successfully done")` it will show. Providing theme,dark mode, showing header or not all these things can be configured in Layout component in `src/baseComponents` folder.

Also there is material UI wrapper of a high performing form library called react-final-form. React Final Form manages form state out of react which make it out perform any competitor library with order of magnitude and very easy to learn API also.

### Delclarative Routing and Authorization

To define a route you only have to write this arr of objects in routes file of module and import in `src/routes/index.js` like this.

By default every component requires to authenticated(if getAccessToken from utils file returns true), if you want to opt out of authenticated provide loginNotRequired to true.

```js
import Login from './pages/Login/'

const authRoutes =[
    {
        path:"/login",
        component: Login,
        loginNotRequired:true // don't need authentication,
        settings:{
            hideHeader:true // now you can get this setting in layout component and handle there, any route level setting also
        }
    }
];

// then in
// src/routes/index.js
const other =[
    {
        path:"/dashboard", // will require authentication
        component: Dasboard,
    }
];
const appRoutes = [
  ...authRoutes,
  ...other
  { path: "*", component: NotFound, loginNotRequired: true }
];
```

done.

### Better Integration with Axios and Redux

A abstraction to handle all api calls errors,success, request in progress all these states and to set them in redux state.
check reduxAxios function in utils and how it is used in `configs/axiosConfigs`.

### General Best Pratices

here write all guidelines for your team to maintain consistencies.

- Every file returning a component should be named as that component with first letter capital (community best practice). For auto import suggestion also if you are doing export default then auto import suggestion will work by file name. If you want import suggestion and don't want file name to be changed like in module we have reducer.js which only import one reducer but if export default it import suggestion won't work, so exporting as named export is good idea there.

- `componentWillReceiveProps` ,`componentWillMount` are deprecated for one and half year,stop using them.
- Eslint and Prettier (code formatter) configurations are done, better install these two vscode extensions for code format consistencies between team.

- use custom hooks to seperate logic.
- use constants like appRoutes, apiRoutes, languageConstants for all texts,
- write actions to handle loading also .
- Either use CSS-in-Js or css/css modules, why use both ?
- Don't use map to loop over, map returns a new array of exact length, use forEach to loop over
- Don't write like this

```js
this.props.addTemplate().then(() => {
  if (success) {
  } else {
  }
});
```

else write like this

```js
const handleAfterEffects = () => {};
this.props.addTemplate().then(handleAfterEffects);
```

- write your best practices here, you think can be valuable.
# ReactBasicSetup
