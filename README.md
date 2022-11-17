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
  - Save the recipes and see them  by their account for every user, on Saved Recipes tab under my account
  - See their last selections on the form,recipe results and saved recipes by their own account on their next visit
  - See their own personal info on the personal info tab under my account
  - Change their password if they want to, on the change password tab under my account
  - Reset their password if they forget it, on forgot password tab under sign in tab

### Screenshot

-💻 Desktop-View(Please wait until the videos are uploaded,if not please refresh the page!)

-Part1

https://user-images.githubusercontent.com/85255784/202580904-57307061-a938-4170-96c8-c8b942085b1d.mp4

-Part2

https://user-images.githubusercontent.com/85255784/202580910-eda44f17-e2fd-449d-8788-bc1eb022bf0b.mp4

-📱 Mobile-View (Please wait until the videos are uploaded,if not please refresh the page!)

https://user-images.githubusercontent.com/85255784/202580925-f551fac6-f5c2-4a98-af3f-96251734a800.mp4

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
- React Spinners,React Lazy Load
- Dotenv
- Netlify

### What I learned

I used the Edamam API as a developer for free and because of it I can`t use the API fully and can only one filter with diet and heal preferences. Firstly, I changed the input types to radio, so with the same name user could choose only one option but the problem is that radio buttons can not be unchecked. I learned that it is not possible to set the states multiple time in a map function.So I haD to make my own radio button with check buttons and set the state one time lastly. Here is my code:

```js
const handleRadio = (e) => {
  let array = input[e.target.name];

  const health = [
    "alcohol-free",
    "vegan",
    "vegetarian",
    "kidney-friendly",
    "pork-free",
  ];
  const diet = [
    "balanced",
    "high-protein",
    "low-carb",
    "low-fat",
    "low-sodium",
  ];
  if (e.target.checked) {
    array = [];
    array.push(e.target.value);

    const object = {};

    if (health.indexOf(e.target.value) !== -1) {
      health
        .filter((element) => element !== e.target.value)
        .map((element) => (object[element] = false));
      setCheck({ ...check, ...object, [e.target.value]: e.target.checked });
    } else {
      diet
        .filter((element) => element !== e.target.value)
        .map((element) => (object[element] = false));
      setCheck({ ...check, ...object, [e.target.value]: e.target.checked });
    }
  } else {
    array = [];
    setCheck({ ...check, [e.target.value]: false });
  }
  return setInput({ ...input, [e.target.name]: array });
};
```

I also learned how to useNavigate hook with useParams and use recipe id in a link to make an API call with it, so I can show to recipe details to the user and user can go to that recipe detail every time with the same link (It is not possible if you send the data with state in useNavigate hook.). Additionally, I learned that you have to encode the "#" in a link like this "owl%23$". 

```js
  const { id } = useParams();
  const get = async () => {
  const response = await axios(
    `https://api.edamam.com/search?app_id=${process.env.REACT_APP_EDAMAM_APP_ID}&app_key=${process.env.REACT_APP_EDAMAM_APP_KEY}&r=http://www.edamam.com/ontologies/edamam.owl%23${id}`
  );
```
I also learned how to use Context API, Firebase Authentication, Firestore, React Spinners ,React Lazy Load.

### Useful resources

- [EDAMAM RECIPE API](https://developer.edamam.com/edamam-docs-recipe-api) -I used this API to get recipes.
- [Firebase](https://firebase.google.com/) -I used this SDK for user authentication.
- [Firestore](https://firebase.google.com/docs/firestore?hl=en) -I used this NoSQL cloud database to store the users informations.
- [REACT SPINNERS by David Hu](https://www.davidhu.io/react-spinners/) -I used this package for spinners.
- [React Lazy Load Component](https://www.npmjs.com/package/react-lazy-load) -I used this Component for image lazy load.



## Author

- Muhammed Ubeyde Alpkilic - [@aLpSabre](https://github.com/aLpSabre)
