import axios from "axios";
import { useEffect } from "react";
import { useState } from "react";
import { Recipes } from "../../components/Recipes/Recipes";
import {
  FormContainer,
  OptionContainer,
  CheckContainer,
  RangeContainer,
  input,
  ButtonContainer,
  Button,
  RecipeContainer,
} from "../Form/Form.styled";
const Form = () => {
  const [data, setData] = useState([]);
  const [reset, setReset] = useState(false);
  const [input, setInput] = useState({
    q: "",
    diet: [],
    health: [],
    cuisineType: [],
    mealType: [],
    dishType: [],
    calories: "",
    ingr: "",
    time: "",
  });

  const [check, setCheck] = useState({
    breakfast: false,
    dinner: false,
    lunch: false,
    snack: false,
    teatime: false,
    drinks: false,
    "main course": false,
    preps: false,
    "side dish": false,
    soup: false,
    "alcohol-free": false,
    vegan: false,
    vegetarian: false,
    "kidney-friendly": false,
    "pork-free": false,
    balanced: false,
    "high-protein": false,
    "low-carb": false,
    "low-fat": false,
    "low-sodium": false,
  });

  const [health, setHealth] = useState({
    "alcohol-free": false,
    vegan: false,
    vegetarian: false,
    "kidney-friendly": false,
    "pork-free": false,
  });

  const [value, setValue] = useState({
    minCalories: "",
    maxCalories: "",
    minIngr: "",
    maxIngr: "",
    minTime: "",
    maxTime: "",
  });

  const get = async (input) => {
    let url =
      "https://api.edamam.com/search?app_id=61112930&app_key=617e15bff01b2760c29ccc82729d0e21";

    url = url + "&" + "q=" + (input.q ? input.q : " ");

    for (let param in input) {
      if (
        (typeof input[param] === "string" || input[param] instanceof String) &&
        input[param] !== "" &&
        param !== "q"
      ) {
        if (input[param].indexOf("-") !== -1) {
          let firstPart = input[param].slice(0, input[param].indexOf("-"));
          let secondPart = input[param].slice(
            input[param].indexOf("-") + 1,
            input[param].length
          );
          if (Number(firstPart) < Number(secondPart)) {
            url = url + "&" + `${param}=` + `${input[param]}`;
          } else {
            url = url + "&" + `${param}=` + `${secondPart + "-" + firstPart}`;
          }
          console.log(firstPart, "fir");
          console.log(secondPart, "seonc");
        } else {
          url = url + "&" + `${param}=` + `${input[param]}`;
        }

        console.log("if");
        console.log(param, input[param]);
      } else if (input[param].length > 0 && param !== "q") {
        console.log("else");
        console.log(param, input[param]);
        console.log(input[param].join(" "));
        url = url + "&" + `${param}=` + `${input[param].join(" ")}`;
      }
    }
    console.log(url);
    const response = await axios(url);
    console.log(response);
    setData(response.data.hits);

    /*     console.log(JSON.parse(localStorage.getItem("DATA"))); */
  /*   localStorage.setItem("DATA", JSON.stringify(response.data.hits));
    localStorage.setItem("INPUT", JSON.stringify(input));
    localStorage.setItem("CHECK", JSON.stringify(check));
    localStorage.setItem("RANGE", JSON.stringify(value)); */
 

    console.log(Array.isArray(response.data.hits));
    /*     (response.data.hits).map(element => {
          console.log(element.recipe.dishType, "dish")
          console.log(element.recipe.cuisineType, "cuiseine")
          console.log(element.recipe.mealType, "meal")
        }); */
  };

  useEffect(() => {
    let localData = JSON.parse(localStorage.getItem("DATA")) || [];
    setData(localData);

    let localInput = JSON.parse(localStorage.getItem("INPUT")) || [];
    console.log(localInput);
    localInput.length !== 0 && setInput(localInput);

    let localCheck = JSON.parse(localStorage.getItem("CHECK")) || [];
    localCheck.length !== 0 && setCheck(localCheck);

    let localRange = JSON.parse(localStorage.getItem("RANGE")) || [];
    localRange.length !== 0 && setValue(localRange);
    /*    
    let localRange=JSON.parse(localStorage.getItem("RANGE")) || [];
    setValue(localRange);
    console.log("use effect"); */
    /*   get(input);    */
    /*     console.log(input.calories, "use effect")
        console.log(input.time,"time effect") */
    /*    console.log(input, "input") */
    /*     console.log(input.ingr);
    console.log(input); */
    /*     console.log(check["low-sodium"]); */
  }, []);

  useEffect(() =>{
    localStorage.setItem("DATA", JSON.stringify(data));
    localStorage.setItem("INPUT", JSON.stringify(input));
    localStorage.setItem("CHECK", JSON.stringify(check));
    localStorage.setItem("RANGE", JSON.stringify(value));

  },[ data,input,check,value ])
  /*  useEffect(() => {
  
  }, [input,check]) */

  const handleCheck = (e) => {
    let array = input[e.target.name];
    console.log(array, "array");
    console.log(e.target.id, "target id");

    if (e.target.checked) {
      array.push(e.target.value);
      return setInput({ ...input, [e.target.name]: array });
    }
    console.log("else");
    array = array.filter((element) => element !== e.target.value);
    console.log(array, "array else");
    return setInput({ ...input, [e.target.name]: array });
  };

  const handleRadio = (e) => {
    let array = input[e.target.name];
    console.log(array, "array");
    console.log(e.target.id, "target id");
    console.log(e.target.checked);
    if (e.target.checked) {
      array = [];
      array.push(e.target.value);
      console.log(array, "array son");
      return setInput({ ...input, [e.target.name]: array });
    }
  };

  const handleRange = (e) => {
    if (e.target.className === "min") {
      console.log(input[e.target.name]);
      if (e.target.value === "") {
        if (input[e.target.name].indexOf("%") !== -1) {
          return setInput({ ...input, [e.target.name]: "" });
        }
        console.log("min target");
        return setInput({
          ...input,
          [e.target.name]:
            "0" +
            "-" +
            input[e.target.name].slice(
              input[e.target.name].indexOf("-") + 1,
              input[e.target.name].length
            ),
        });
      }
      if (input[e.target.name].indexOf("-") === 1 && e.target.value === "") {
        console.log("Min if");
        return setInput({
          ...input,
          [e.target.name]: input[e.target.name].slice(
            input[e.target.name].indexOf("-") + 1,
            input[e.target.name].length
          ),
        });
      } else if (
        input[e.target.name] !== "" &&
        input[e.target.name].indexOf("%") === -1
      ) {
        console.log("Min x");
        return setInput({
          ...input,
          [e.target.name]:
            e.target.value +
            "-" +
            input[e.target.name].slice(
              input[e.target.name].indexOf("-") + 1,
              input[e.target.name].length
            ),
        });
      } else if (
        e.target.value === "" &&
        input[e.target.name].indexOf("%") !== -1
      ) {
        console.log("else if 3");
        return setInput({ ...input, [e.target.name]: "" });
      } else {
        console.log("else");
        return setInput({ ...input, [e.target.name]: e.target.value + "%2B" });
      }
    } else if (e.target.className === "max") {
      if (e.target.value === "") {
        console.log("max target");
        console.log(input[e.target.name]);

        return setInput({
          ...input,
          [e.target.name]:
            input[e.target.name].slice(0, input[e.target.name].indexOf("-")) +
            "%2B",
        });
      }
      if (
        input[e.target.name] !== "" &&
        input[e.target.name].indexOf("%") !== -1
      ) {
        console.log("if max");

        return setInput({
          ...input,
          [e.target.name]:
            input[e.target.name].slice(0, input[e.target.name].indexOf("%")) +
            "-" +
            e.target.value,
        });
      } else if (
        input[e.target.name] !== "" &&
        input[e.target.name].indexOf("-") !== -1
      ) {
        console.log("else max");
        console.log(input[e.target.name]);
        console.log(e.target.value);
        if (e.target.value === "") {
          return setInput({
            ...input,
            [e.target.name]:
              input[e.target.name].slice(0, input[e.target.name].indexOf("-")) +
              "%2B",
          });
        }
        console.log(
          input[e.target.name].slice(0, input[e.target.name].indexOf("-"))
        );
        return setInput({
          ...input,
          [e.target.name]:
            input[e.target.name].slice(0, input[e.target.name].indexOf("-")) +
            "-" +
            e.target.value,
        });
      } else {
        console.log("else");
        return setInput({
          ...input,
          [e.target.name]: "0" + "-" + e.target.value,
        });
      }
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(input);
    get(input);
  };
  const handleReset = (e) => {
 
    e.preventDefault();
    setInput({
      q: "",
      diet: [],
      health: [],
      cuisineType: [],
      mealType: [],
      dishType: [],
      calories: "",
      ingr: "",
      time: "",
    });
    setCheck({
      breakfast: false,
      dinner: false,
      lunch: false,
      snack: false,
      teatime: false,
      drinks: false,
      "main course": false,
      preps: false,
      "side dish": false,
      soup: false,
      "alcohol-free": false,
      vegan: false,
      vegetarian: false,
      "kidney-friendly": false,
      "pork-free": false,
      balanced: false,
      "high-protein": false,
      "low-carb": false,
      "low-fat": false,
      "low-sodium": false,
    });
    setValue({
      minCalories: "",
      maxCalories: "",
      minIngr: "",
      maxIngr: "",
      minTime: "",
      maxTime: "",
    });
    setData([]);
    console.log(check);
 /*    localStorage.setItem("DATA", JSON.stringify([]));
    localStorage.setItem("INPUT", JSON.stringify(input));
    localStorage.setItem("CHECK", JSON.stringify(check));
    localStorage.setItem("RANGE", JSON.stringify(value)); */
  };
  return (
    <>
      <FormContainer action="get" id="form" onSubmit={(e) => handleSubmit(e)}>
        <OptionContainer>
          <input
            type="text"
            name="q"
            id="q"
            value={input.q}
            placeholder="Find the recipe.."
            onChange={(e) =>
              setInput({ ...input, [e.target.id]: e.target.value })
            }
          />
        </OptionContainer>
        <ButtonContainer>
          <Button type="reset" primary onClick={(e) => handleReset(e)}>
            Reset
          </Button>
          <Button type="submit" form="form">
            Submit
          </Button>
        </ButtonContainer>

        <OptionContainer>
          <div>
            <label htmlFor="mealType">Meal Type:</label>
          </div>
          <CheckContainer>
            <input
              type="checkbox"
              name="mealType"
              id="breakfast"
              value="breakfast"
              checked={check["breakfast"]}
              onChange={(e) => {
                handleCheck(e);
                setCheck({ ...check, [e.target.value]: e.target.checked });
              }}
            />

            <label htmlFor="breakfast">Breakfast</label>
          </CheckContainer>
          <CheckContainer>
            <input
              type="checkbox"
              name="mealType"
              id="dinner"
              value="dinner"
              checked={check["dinner"]}
              onChange={(e) => {
                handleCheck(e);
                setCheck({ ...check, [e.target.value]: e.target.checked });
              }}
            />
            <label htmlFor="dinner">Dinner</label>
          </CheckContainer>
          <CheckContainer>
            <input
              type="checkbox"
              name="mealType"
              id="lunch"
              value="lunch"
              checked={check["lunch"]}
              onChange={(e) => {
                handleCheck(e);
                setCheck({ ...check, [e.target.value]: e.target.checked });
              }}
            />
            <label htmlFor="lunch">Lunch</label>
          </CheckContainer>
          <CheckContainer>
            <input
              type="checkbox"
              name="mealType"
              id="snack"
              value="snack"
              checked={check["snack"]}
              onChange={(e) => {
                handleCheck(e);
                setCheck({ ...check, [e.target.value]: e.target.checked });
              }}
            />
            <label htmlFor="snack">Snack</label>
          </CheckContainer>
          <CheckContainer>
            <input
              type="checkbox"
              name="mealType"
              id="teatime"
              value="teatime"
              checked={check["teatime"]}
              onChange={(e) => {
                handleCheck(e);
                setCheck({ ...check, [e.target.value]: e.target.checked });
              }}
            />
            <label htmlFor="teatime">Tea time</label>
          </CheckContainer>
        </OptionContainer>
        <OptionContainer>
          <div>
            <label htmlFor="dishType">Dish Type:</label>
          </div>
          <CheckContainer>
            <input
              type="checkbox"
              name="dishType"
              id="drinks"
              value="drinks"
              checked={check["drinks"]}
              onChange={(e) => {
                handleCheck(e);
                setCheck({ ...check, [e.target.value]: e.target.checked });
              }}
            />
            <label htmlFor="drinks">Drinks</label>
          </CheckContainer>
          <CheckContainer>
            <input
              type="checkbox"
              name="dishType"
              id="mainCourse"
              value="main course"
              checked={check["main course"]}
              onChange={(e) => {
                handleCheck(e);
                setCheck({ ...check, [e.target.value]: e.target.checked });
              }}
            />
            <label htmlFor="mainCourse">Main Course</label>
          </CheckContainer>
          <CheckContainer>
            <input
              type="checkbox"
              name="dishType"
              id="preps"
              value="preps"
              checked={check["preps"]}
              onChange={(e) => {
                handleCheck(e);
                setCheck({ ...check, [e.target.value]: e.target.checked });
              }}
            />
            <label htmlFor="preps">Preps</label>
          </CheckContainer>
          <CheckContainer>
            <input
              type="checkbox"
              name="dishType"
              id="sideDish"
              value="side dish"
              checked={check["side dish"]}
              onChange={(e) => {
                handleCheck(e);
                setCheck({ ...check, [e.target.value]: e.target.checked });
              }}
            />
            <label htmlFor="sideDish">Side Dish</label>
          </CheckContainer>
          <CheckContainer>
            <input
              type="checkbox"
              name="dishType"
              id="soup"
              value="soup"
              checked={check["soup"]}
              onChange={(e) => {
                handleCheck(e);
                setCheck({ ...check, [e.target.value]: e.target.checked });
              }}
            />
            <label htmlFor="soup">Soup</label>
          </CheckContainer>
        </OptionContainer>

        <OptionContainer>
          <div>
            <label htmlFor="health">Health Preferences:</label>
          </div>
          <CheckContainer>
            <input
              type="radio"
              name="health"
              id="alcohol-free"
              value="alcohol-free"
              checked={check["alcohol-free"]}
              onChange={(e) => {
                handleRadio(e);
                setCheck({ ...check, [e.target.value]: e.target.checked });
              }}
            />
            <label htmlFor="alcohol-free">Alcohol-free</label>
          </CheckContainer>
          <CheckContainer>
            {" "}
            <input
              type="radio"
              name="health"
              id="vegan"
              value="vegan"
              checked={check["vegan"]}
              onChange={(e) => {
                handleRadio(e);
                setCheck({ ...check, [e.target.value]: e.target.checked });
              }}
            />
            <label htmlFor="vegan">Vegan</label>
          </CheckContainer>
          <CheckContainer>
            {" "}
            <input
              type="radio"
              name="health"
              id="vegetarian"
              value="vegetarian"
              checked={check["vegetarian"]}
              onChange={(e) => {
                handleRadio(e);
                setCheck({ ...check, [e.target.value]: e.target.checked });
              }}
            />
            <label htmlFor="vegetarian">Vegetarian</label>
          </CheckContainer>
          <CheckContainer>
            {" "}
            <input
              type="radio"
              name="health"
              id="kidney-friendly"
              value="kidney-friendly"
              checked={check["kidney-friendly"]}
              onChange={(e) => {
                handleRadio(e);
                setCheck({ ...check, [e.target.value]: e.target.checked });
              }}
            />
            <label htmlFor="kidney-friendly">Kidney-friendly</label>
          </CheckContainer>

          <CheckContainer>
            {" "}
            <input
              type="radio"
              name="health"
              id="pork-free"
              value="pork-free"
              checked={check["pork-free"]}
              onChange={(e) => {
                handleRadio(e);
                setCheck({ ...check, [e.target.value]: e.target.checked });
              }}
            />
            <label htmlFor="pork-free">Pork-free</label>
          </CheckContainer>
        </OptionContainer>
        <OptionContainer>
          <div>
            <label htmlFor="diet">Diet Preferences:</label>
          </div>
          <CheckContainer>
            <input
              type="radio"
              name="diet"
              id="balanced"
              value="balanced"
              checked={check["balanced"]}
              onChange={(e) => {
                handleRadio(e);
                setCheck({ ...check, [e.target.value]: e.target.checked });
              }}
            />
            <label htmlFor="balanced">Balanced</label>
          </CheckContainer>
          <CheckContainer>
            <input
              type="radio"
              name="diet"
              id="high-protein"
              value="high-protein"
              checked={check["high-protein"]}
              onChange={(e) => {
                handleRadio(e);
                setCheck({ ...check, [e.target.value]: e.target.checked });
              }}
            />
            <label htmlFor="high-protein">High-protein</label>
          </CheckContainer>

          <CheckContainer>
            <input
              type="radio"
              name="diet"
              id="low-carb"
              value="low-carb"
              checked={check["low-carb"]}
              onChange={(e) => {
                handleRadio(e);
                setCheck({ ...check, [e.target.value]: e.target.checked });
              }}
            />
            <label htmlFor="low-carb">Low-carb</label>
          </CheckContainer>
          <CheckContainer>
            <input
              type="radio"
              name="diet"
              id="low-fat"
              value="low-fat"
              checked={check["low-fat"]}
              onChange={(e) => {
                handleRadio(e);
                setCheck({ ...check, [e.target.value]: e.target.checked });
                console.log(check["low-sodium"]);
              }}
            />
            <label htmlFor="low-fat">Low-fat</label>
          </CheckContainer>

          <CheckContainer>
            <input
              type="radio"
              name="diet"
              id="low-sodium"
              value="low-sodium"
              checked={check["low-sodium"]}
              onChange={(e) => {
                setCheck({ ...check, [e.target.value]: e.target.checked });
                handleRadio(e);

                console.log(check["low-sodium"]);
              }}
            />
            <label htmlFor="low-sodium">Low-sodium</label>
          </CheckContainer>
        </OptionContainer>

        <OptionContainer>
          <div>
            <label htmlFor="calories">Calories:</label>
          </div>

          <RangeContainer>
            <div>
              <label htmlFor="calories">Min:</label>
              <input
                type="number"
                name="calories"
                id="minCalories"
                className="min"
                value={value["minCalories"]}
                min={0}
                placeholder="0"
                onChange={(e) => {
                  handleRange(e);
                  setValue({ ...value, [e.target.id]: e.target.value });
                }}
              />
            </div>
            <div>
              <label htmlFor="calories">Max:</label>
              <input
                type="number"
                name="calories"
                id="maxCalories"
                className="max"
                value={value["maxCalories"]}
                min={0}
                placeholder="0"
                onChange={(e) => {
                  handleRange(e);
                  setValue({ ...value, [e.target.id]: e.target.value });
                }}
              />
            </div>
          </RangeContainer>
        </OptionContainer>

        <OptionContainer>
          <div>
            <label htmlFor="ingr">Ingridients</label>
          </div>
          <RangeContainer>
            <div>
              <label htmlFor="ingr">Min:</label>
              <input
                type="number"
                name="ingr"
                id="minIngr"
                className="min"
                value={value["minIngr"]}
                min={0}
                placeholder="0"
                onChange={(e) => {
                  handleRange(e);
                  setValue({ ...value, [e.target.id]: e.target.value });
                }}
              />
            </div>
            <div>
              {" "}
              <label htmlFor="ingr">Max:</label>
              <input
                type="number"
                name="ingr"
                id="maxIngr"
                className="max"
                value={value["maxIngr"]}
                min={0}
                placeholder="0"
                onChange={(e) => {
                  handleRange(e);
                  setValue({ ...value, [e.target.id]: e.target.value });
                }}
              />
            </div>
          </RangeContainer>
        </OptionContainer>

        <OptionContainer>
          <div>
            <label htmlFor="time">Time:</label>
          </div>
          <RangeContainer>
            <div>
              <label htmlFor="time">Min:</label>
              <input
                type="number"
                name="time"
                id="minTime"
                className="min"
                value={value["minTime"]}
                min={0}
                placeholder="0"
                onChange={(e) => {
                  handleRange(e);
                  setValue({ ...value, [e.target.id]: e.target.value });
                }}
              />
            </div>
            <div>
              <label htmlFor="time">Max:</label>
              <input
                type="number"
                name="time"
                id="maxTime"
                className="max"
                value={value["maxTime"]}
                min={0}
                placeholder="0"
                onChange={(e) => {
                  handleRange(e);
                  setValue({ ...value, [e.target.id]: e.target.value });
                }}
              />
            </div>
          </RangeContainer>
        </OptionContainer>
      </FormContainer>

      <RecipeContainer>
        <Recipes data={data} />
      </RecipeContainer>
    </>
  );
};

export default Form;
