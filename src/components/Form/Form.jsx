/* eslint-disable */
import axios from "axios";
import { useEffect } from "react";
import { useState } from "react";
import GridLoader from "react-spinners/GridLoader";
import { Recipes } from "../../components/Recipes/Recipes";
import { useAuthContext } from "../../context/AuthContext";
import { getDataFire, setDataFire } from "../../firestore/firestore";
import {
  FormContainer,
  OptionContainer,
  CheckContainer,
  RangeContainer,
  ButtonContainer,
  Button,
  RecipeContainer,
  SecondContainer,
} from "../Form/Form.styled";

const Form = () => {
  const [show, setShow] = useState(false);
  const [first, setFirst] = useState(false);
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
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
    desserts: false,
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
  const [value, setValue] = useState({
    minCalories: "",
    maxCalories: "",
    minIngr: "",
    maxIngr: "",
    minTime: "",
    maxTime: "",
  });
  const { currentUser } = useAuthContext();

  const get = async (input) => {
    let url = `https://api.edamam.com/search?app_id=${process.env.REACT_APP_EDAMAM_APP_ID}&app_key=${process.env.REACT_APP_EDAMAM_APP_KEY}`;

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
        } else {
          url = url + "&" + `${param}=` + `${input[param]}`;
        }
      } else if (input[param].length > 0 && param !== "q") {
        url = url + "&" + `${param}=` + `${input[param].join(" ")}`;
      }
    }

    const response = await axios(url);
    setLoading(true);
    setTimeout(() => setLoading(false), 1000);
    setData(response.data.hits);
  };

  useEffect(() => {
    if (currentUser) {
      getDataFire(currentUser.uid, "data", setData, get);
      getDataFire(currentUser.uid, "input", setInput, get);
      getDataFire(currentUser.uid, "check", setCheck, get);
      getDataFire(currentUser.uid, "value", setValue, get);
    } else {
      let localData = JSON.parse(localStorage.getItem("DATA")) || [];
      setData(localData);

      localData.length === 0 && get({ q: "chicken" });
      let localInput = JSON.parse(localStorage.getItem("INPUT")) || [];

      localInput.length !== 0 && setInput(localInput);

      let localCheck = JSON.parse(localStorage.getItem("CHECK")) || [];
      localCheck.length !== 0 && setCheck(localCheck);

      let localRange = JSON.parse(localStorage.getItem("RANGE")) || [];
      localRange.length !== 0 && setValue(localRange);
    }
  }, []);

  useEffect(() => {
    if (currentUser) {
      if (data.length) {
        setDataFire(currentUser.uid, "data", { data: data });
      }
    } else {
      data.length && localStorage.setItem("DATA", JSON.stringify(data));
    }
  }, [data]);

  useEffect(() => {
    if (currentUser) {
      if (data.length) {
        setDataFire(currentUser.uid, "input", { input: input });
      }
    } else {
      data.length && localStorage.setItem("INPUT", JSON.stringify(input));
    }
  }, [input]);

  useEffect(() => {
    if (currentUser) {
      if (data.length) {
        setDataFire(currentUser.uid, "check", { check: check });
      }
    } else {
      data.length && localStorage.setItem("CHECK", JSON.stringify(check));
    }
  }, [check]);
  useEffect(() => {
    if (currentUser) {
      if (data.length) {
        setDataFire(currentUser.uid, "value", { value: value });
      }
    } else {
      data.length && localStorage.setItem("RANGE", JSON.stringify(value));
    }
  }, [value]);

  const handleCheck = (e) => {
    let array = input[e.target.name];

    if (e.target.checked) {
      array.push(e.target.value);
      return setInput({ ...input, [e.target.name]: array });
    }

    array = array.filter((element) => element !== e.target.value);

    return setInput({ ...input, [e.target.name]: array });
  };

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

  const handleRange = (e) => {
    if (e.target.className === "min") {
      if (e.target.value === "") {
        if (input[e.target.name].indexOf("%") !== -1) {
          return setInput({ ...input, [e.target.name]: "" });
        }

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
        return setInput({ ...input, [e.target.name]: "" });
      } else {
        return setInput({ ...input, [e.target.name]: e.target.value + "%2B" });
      }
    } else if (e.target.className === "max") {
      if (e.target.value === "") {
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
        if (e.target.value === "") {
          return setInput({
            ...input,
            [e.target.name]:
              input[e.target.name].slice(0, input[e.target.name].indexOf("-")) +
              "%2B",
          });
        }

        return setInput({
          ...input,
          [e.target.name]:
            input[e.target.name].slice(0, input[e.target.name].indexOf("-")) +
            "-" +
            e.target.value,
        });
      } else {
        return setInput({
          ...input,
          [e.target.name]: "0" + "-" + e.target.value,
        });
      }
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setFirst(true);
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
      desserts: false,
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
  };

  return (
    <>
      <FormContainer
        action="get"
        id="form"
        primary={show ? "show" : "notshow"}
        onSubmit={(e) => handleSubmit(e)}
      >
        <div className="first">
          <OptionContainer>
            <CheckContainer>
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
            </CheckContainer>
          </OptionContainer>
        </div>
        <CheckContainer>
          <ButtonContainer>
            <Button type="reset" primary onClick={(e) => handleReset(e)}>
              Reset
            </Button>
            <Button type="submit" form="form">
              Submit
            </Button>
          </ButtonContainer>
        </CheckContainer>
        <div className="filter">
          <p onClick={() => setShow(!show)}>
            Filters
            <i
              className={show ? "fa fa-arrow-down" : "fa fa-arrow-up"}
              aria-hidden="true"
            ></i>
          </p>
        </div>
        <SecondContainer primary={show ? "show" : "notshow"}>
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
            <CheckContainer>
              <input
                type="checkbox"
                name="dishType"
                id="desserts"
                value="desserts"
                checked={check["desserts"]}
                onChange={(e) => {
                  handleCheck(e);
                  setCheck({ ...check, [e.target.value]: e.target.checked });
                }}
              />
              <label htmlFor="desserts">Desserts</label>
            </CheckContainer>
          </OptionContainer>
          <OptionContainer>
            <div>
              <label htmlFor="health">
                Health Preferences:
                <span style={{ fontSize: "0.8rem", color: "#FC6011" }}>
                  {" "}
                  (Choose only one!)
                </span>
              </label>
            </div>
            <CheckContainer>
              <input
                type="checkbox"
                name="health"
                id="alcohol-free"
                value="alcohol-free"
                checked={check["alcohol-free"]}
                onChange={(e) => handleRadio(e)}
              />
              <label htmlFor="alcohol-free">Alcohol-free</label>
            </CheckContainer>
            <CheckContainer>
              {" "}
              <input
                type="checkbox"
                name="health"
                id="vegan"
                value="vegan"
                checked={check["vegan"]}
                onChange={(e) => handleRadio(e)}
              />
              <label htmlFor="vegan">Vegan</label>
            </CheckContainer>
            <CheckContainer>
              {" "}
              <input
                type="checkbox"
                name="health"
                id="vegetarian"
                value="vegetarian"
                checked={check["vegetarian"]}
                onChange={(e) => handleRadio(e)}
              />
              <label htmlFor="vegetarian">Vegetarian</label>
            </CheckContainer>
            <CheckContainer>
              {" "}
              <input
                type="checkbox"
                name="health"
                id="kidney-friendly"
                value="kidney-friendly"
                checked={check["kidney-friendly"]}
                onChange={(e) => handleRadio(e)}
              />
              <label htmlFor="kidney-friendly">Kidney-friendly</label>
            </CheckContainer>

            <CheckContainer>
              {" "}
              <input
                type="checkbox"
                name="health"
                id="pork-free"
                value="pork-free"
                checked={check["pork-free"]}
                onChange={(e) => handleRadio(e)}
              />
              <label htmlFor="pork-free">Pork-free</label>
            </CheckContainer>
          </OptionContainer>
          <OptionContainer>
            <div>
              <label htmlFor="diet">
                Diet Preferences:
                <span style={{ fontSize: "0.8rem", color: "#FC6011" }}>
                  {" "}
                  (Choose only one!)
                </span>
              </label>
            </div>
            <CheckContainer>
              <input
                type="checkbox"
                name="diet"
                id="balanced"
                value="balanced"
                checked={check["balanced"]}
                onChange={(e) => handleRadio(e)}
              />
              <label htmlFor="balanced">Balanced</label>
            </CheckContainer>
            <CheckContainer>
              <input
                type="checkbox"
                name="diet"
                id="high-protein"
                value="high-protein"
                checked={check["high-protein"]}
                onChange={(e) => handleRadio(e)}
              />
              <label htmlFor="high-protein">High-protein</label>
            </CheckContainer>

            <CheckContainer>
              <input
                type="checkbox"
                name="diet"
                id="low-carb"
                value="low-carb"
                checked={check["low-carb"]}
                onChange={(e) => handleRadio(e)}
              />
              <label htmlFor="low-carb">Low-carb</label>
            </CheckContainer>
            <CheckContainer>
              <input
                type="checkbox"
                name="diet"
                id="low-fat"
                value="low-fat"
                checked={check["low-fat"]}
                onChange={(e) => handleRadio(e)}
              />
              <label htmlFor="low-fat">Low-fat</label>
            </CheckContainer>

            <CheckContainer>
              <input
                type="checkbox"
                name="diet"
                id="low-sodium"
                value="low-sodium"
                checked={check["low-sodium"]}
                onChange={(e) => handleRadio(e)}
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
                  min={1}
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
                  min={1}
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
                  min={1}
                  placeholder="0"
                  onChange={(e) => {
                    handleRange(e);
                    setValue({ ...value, [e.target.id]: e.target.value });
                  }}
                />
              </div>
            </RangeContainer>
          </OptionContainer>
        </SecondContainer>
      </FormContainer>
      <RecipeContainer>
        {loading ? (
          <GridLoader color={"#FC6011"} size={30} speedMultiplier={1} />
        ) : data.length < 1 && first ? (
          <p className="no-match">No Match Found!</p>
        ) : (
          <Recipes data={data} />
        )}
      </RecipeContainer>
    </>
  );
};

export { Form as default };
