# The World's Food

## Table of contents

- [Overview](#overview)
  - [Screenshot](#screenshot)
  - [Links](#links)
- [My process](#my-process)
  - [Built with](#built-with)
  - [What I learned](#what-i-learned)
  - [Useful resources](#useful-resources)
- [Author](#author)

## Overview

This is a real-time Recipe App made with React.

Users are able to:

- View the optimal layout for each page depending on their device's screen size
- Search for any food recipes with its own name or product name
- Filter results by meal type, dish type, health preferences, diet preferences, calories, ingridients and time
- See their last selections on the form and recipe results on their next visit 
- See the recipe details
- See 404 Error message if they try to go to unexisting part of the website
- Sign up by creating their own account or with their google account
- Get error message if they try to sign up with invalid email or password with under 6 characters
- Sign in with their account on the app or google account
- Get error message if they try to sign up with invalid email or password
- Do these if they have an account:
  - Save the recipes and see them, on Saved Recipes tab under my account
  - See their last selections on the form,recipe results and saved recipes by their own account on their next visit 
  - See their own personal info on the personal info tab under my account
  - Change their password if they want to, on the change password tab under my account
  - Reset their password if they forget it, on forgot password tab under sign in tab

### Screenshot

-💻 Desktop-View
![](./gifs/desktop-gif.gif)

![](./gifs/desktop-gif-2.gif)

-📱 Mobile-View
![](./gifs/mobile-view.gif)

### Links

- Solution URL: [click here.](https://github.com/aLpSabre/React-Recipe-App)
- Live Site URL: [click here.](https://theworldsfood.netlify.app/)

### Built with

- HTML5 markup
- CSS custom properties
- Styled Components
- MUI
- React JS
- Context API
- Local Storage
- Firebase Authentication
- Firestore
- Dotenv
- Netlify

### What I learned

I have learned how to fetch data from an API with asyn functions and use special methods from the API's

```js
const getIP = async function (ip) {
  try {
    const res = await fetch(`https://ipapi.co/${ip}/json/`);

    if (res.error) {
      renderError();
      throw new Error(`${res.status}`);
    }
    const data = await res.json();
    renderData(data);
  } catch (error) {}
};
```

### Useful resources

- [Leaflet JS Library](https://leafletjs.com/examples/quick-start/) -I used this JS Library for the interactive map on the project.
- [IAPI](https://ipapi.co/) -I used this API to get the informations about IP's.
- [Ipify](https://www.ipify.org/) -I used this API to get the informations about IP's.
- [JAWG](https://www.jawg.io/docs/) -I used the tile for the map with Leaflet.
- [Leaflet Providers](https://github.com/leaflet-extras/leaflet-providers) -An extension to Leaflet that contains configurations for various free tile providers.

## Author

- Frontend Mentor - [@alpbrace](https://www.frontendmentor.io/profile/alpbrace)
