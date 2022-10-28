
import axios from "axios";
import { useEffect } from "react";
import { useState } from "react";

const App = () => {
  const [data, setData] = useState("");
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


  let a = "1";
  const get = async (data) => {
    /*     const response = await axios(`https://api.edamam.com/search?q=chicken&app_id=61112930&app_key=617e15bff01b2760c29ccc82729d0e21&${a && `to=${a.toString()}`}`); */

    let url = "https://api.edamam.com/search?app_id=61112930&app_key=617e15bff01b2760c29ccc82729d0e21"
    url = url + "&" + "q=" + (data.q ? data.q : " ");

    for (let param in data) {
      /*  console.log(param,data[param],typeof data[param],data[param]===""); */
      console.log(param === "q");
      if ((typeof data[param] === 'string' || data[param] instanceof String) && data[param] !== "" && param !== "q") {
        if (data[param].indexOf("-") !== -1) {
          let firstPart = data[param].slice(0, (data[param].indexOf("-")));
          let secondPart = data[param].slice(data[param].indexOf("-") + 1, data[param].length);
          if (Number(firstPart) < Number(secondPart)) {
            url = url + "&" + `${param}=` + `${data[param]}`;
          } else {
            url = url + "&" + `${param}=` + `${secondPart + "-" + firstPart}`;
          }
          console.log(firstPart, "fir")
          console.log(secondPart, "seonc");
        }

        console.log("if")
        console.log(param, data[param]);
      } else if (data[param].length > 0 && param !== "q") {
        console.log("else");
        console.log(param, data[param]);
        console.log(data[param].join(" "))
        url = url + "&" + `${param}=` + `${data[param].join(" ")}`;
      }

    }
    console.log(url);
    const response = await axios(url);
    setData(response.data.hits);
    console.log(response.data.hits);
    /*     (response.data.hits).map(element => {
          console.log(element.recipe.dishType, "dish")
          console.log(element.recipe.cuisineType, "cuiseine")
          console.log(element.recipe.mealType, "meal")
        }); */
  }

  useEffect(() => {
   /*   get(input);  */


/*     console.log(input.calories, "use effect")
    console.log(input.time,"time effect") */
    /*    console.log(input, "input") */
  }, [input])

  const handleCheck = (e) => {
    let array = input[e.target.name];
    console.log(array, "array")
    console.log(e.target.id, "target id")

    if (e.target.checked) {
      array.push(e.target.value)
      return setInput({ ...input, [e.target.name]: array })
    }
    console.log("else")
    array = array.filter(element => element !== e.target.value)
    console.log(array, "array else")
    return setInput({ ...input, [e.target.name]: array })
  }

  const handleRange = (e) => {


    if (e.target.className === "min") {
      console.log(input[e.target.name]);
      if (e.target.value === "") {
        if(input[e.target.name].indexOf("%") !== -1){
          return setInput({ ...input, [e.target.name]: "" });
        }
        console.log("min target");
        return (setInput({ ...input, [e.target.name]: ("0" + "-" + input[e.target.name].slice(input[e.target.name].indexOf("-") + 1, input[e.target.name].length)) }))
      }
      if (input[e.target.name].indexOf("-") === 1 && e.target.value === "") {
        console.log("Min if")
        return setInput({ ...input, [e.target.name]: (input[e.target.name].slice(input[e.target.name].indexOf("-") + 1, input[e.target.name].length)) })
      }
      else if (input[e.target.name] !== "" && input[e.target.name].indexOf("%") === -1) {

        console.log("Min x")
        return setInput({ ...input, [e.target.name]: (e.target.value + "-" + input[e.target.name].slice(input[e.target.name].indexOf("-") + 1, input[e.target.name].length)) })


      } else if (e.target.value === "" && input[e.target.name].indexOf("%") !== -1) {
        console.log("else if 3");
        return setInput({ ...input, [e.target.name]: "" })
      }

      else {
        console.log("else");
        return setInput({ ...input, [e.target.name]: (e.target.value + "%2B") })
      }

    }



    else if (e.target.className === "max") {

      if (e.target.value === "") {
        console.log("max target");
        console.log(input[e.target.name])

        return setInput({ ...input, [e.target.name]: (input[e.target.name].slice(0, input[e.target.name].indexOf("-")) + "%2B") })
      }
      if (input[e.target.name] !== "" && input[e.target.name].indexOf("%") !== -1) {
        console.log("if max")

        return setInput({ ...input, [e.target.name]: (input[e.target.name].slice(0, input[e.target.name].indexOf("%")) + "-" + e.target.value) })
      } else if (input[e.target.name] !== "" && input[e.target.name].indexOf("-") !== -1) {
        console.log("else max")
        console.log(input[e.target.name]);
        console.log(e.target.value)
        if (e.target.value === "") {
          return setInput({ ...input, [e.target.name]: (input[e.target.name].slice(0, input[e.target.name].indexOf("-")) + "%2B") })
        }
        console.log((input[e.target.name].slice(0, input[e.target.name].indexOf("-"))));
        return setInput({ ...input, [e.target.name]: (input[e.target.name].slice(0, input[e.target.name].indexOf("-")) + "-" + e.target.value) })
      } else {
        console.log("else");
        return (setInput({ ...input, [e.target.name]: ("0" + "-" + e.target.value) }))
      }
    }

  }

  const handleSubmit = (e, data) => {
    e.preventDefault();
    console.log(input)
    get(input);
    setInput({
      q: "",
      ingr: "",
      diet: "",
      health: "",
      cuisineType: [],
      mealType: [],
      dishType: [],
      calories: "",
      time: "",
    })

  }

  return (
    <form action="get" onSubmit={(e, input) => { handleSubmit(e, input) }}>
      <div>

        <label htmlFor="q">Type</label>
        <input type="text" name="q" id="q" value={input.q} placeholder="Enter a type" onChange={(e) => setInput({ ...input, [e.target.id]: e.target.value })} />

      </div>
      <div>
        <div><label htmlFor="mealType">Meal Type:</label></div>

        <input type="checkbox" name="mealType" id="breakfast" value="breakfast" onClick={(e) => handleCheck(e)} />

        <label htmlFor="breakfast">Breakfast</label>


        <input type="checkbox" name="mealType" id="dinner" value="dinner" onClick={(e) => handleCheck(e)} />
        <label htmlFor="dinner">Dinner</label>

        <input type="checkbox" name="mealType" id="lunch" value="lunch" onClick={(e) => handleCheck(e)} />
        <label htmlFor="lunch">Lunch</label>


        <input type="checkbox" name="mealType" id="snack" value="snack" onClick={(e) => handleCheck(e)} />
        <label htmlFor="snack">Snack</label>

        <input type="checkbox" name="mealType" id="teatime" value="teatime" onClick={(e) => handleCheck(e)} />
        <label htmlFor="teatime">Teatime</label>



      </div>
      <div>
        <div><label htmlFor="dishType">Dish Type:</label></div>

        <input type="checkbox" name="dishType" id="drinks" value="drinks" onClick={(e) => handleCheck(e)} />
        <label htmlFor="drinks">Drinks</label>


        <input type="checkbox" name="dishType" id="mainCourse" value="main course" onClick={(e) => handleCheck(e)} />
        <label htmlFor="mainCourse">Main Course</label>

        <input type="checkbox" name="dishType" id="preps" value="preps" onClick={(e) => handleCheck(e)} />
        <label htmlFor="preps">Preps</label>


        <input type="checkbox" name="dishType" id="sideDish" value="side dish" onClick={(e) => handleCheck(e)} />
        <label htmlFor="sideDish">Side Dish</label>

        <input type="checkbox" name="dishType" id="soup" value="soup" onClick={(e) => handleCheck(e)} />
        <label htmlFor="soup">Soup</label>



      </div>

      <div>
        <div><label htmlFor="health">Health Preferences:</label></div>

        <input type="checkbox" name="health" id="alcohol-free" value="alcohol-free" onClick={(e) => handleCheck(e)} />
        <label htmlFor="alcohol-free">Alcohol-free</label>


        <input type="checkbox" name="health" id="vegan" value="vegan" onClick={(e) => handleCheck(e)} />
        <label htmlFor="vegan">Vegan</label>

        <input type="checkbox" name="health" id="vegetarian" value="vegetarian" onClick={(e) => handleCheck(e)} />
        <label htmlFor="vegetarian">Vegetarian</label>


        <input type="checkbox" name="health" id="kidney-friendly" value="kidney-friendly" onClick={(e) => handleCheck(e)} />
        <label htmlFor="kidney-friendly">Kidney-friendly</label>

        <input type="checkbox" name="health" id="pork-free" value="pork-free" onClick={(e) => handleCheck(e)} />
        <label htmlFor="pork-free">Pork-free</label>
      </div>
      <div>
        <div><label htmlFor="diet">Diet Preferences:</label></div>

        <input type="checkbox" name="diet" id="balanced" value="balanced" onClick={(e) => handleCheck(e)} />
        <label htmlFor="balanced">Balanced</label>


        <input type="checkbox" name="diet" id="high-protein" value="high-protein" onClick={(e) => handleCheck(e)} />
        <label htmlFor="high-protein">High-protein</label>

        <input type="checkbox" name="diet" id="low-carb" value="low-carb" onClick={(e) => handleCheck(e)} />
        <label htmlFor="low-carb">Low-carb</label>


        <input type="checkbox" name="diet" id="low-fat" value="low-fat" onClick={(e) => handleCheck(e)} />
        <label htmlFor="low-fat">Low-fat</label>

        <input type="checkbox" name="diet" id="low-sodium" value="low-sodium" onClick={(e) => handleCheck(e)} />
        <label htmlFor="low-sodium">Low-sodium</label>
      </div>

      <div>
        <div><label htmlFor="calories">Calories</label></div>


        <label htmlFor="calories">Minimum: </label>
        <input type="number" name="calories" id="minCalories" className="min" min={0} onChange={(e) => handleRange(e)} />



        <label htmlFor="calories">Maximum : </label>
        <input type="number" name="calories" id="maxCalories" className="max" min={0} onChange={(e) => handleRange(e)} />



      </div>
      <div>
        <div><label htmlFor="ingr">Ingridients</label></div>


        <label htmlFor="ingr">Minimum: </label>
        <input type="number" name="ingr" id="minIngr" className="min" min={0} onChange={(e) => handleRange(e)} />



        <label htmlFor="ingr">Maximum : </label>
        <input type="number" name="ingr" id="maxIngr" className="max" min={0} onChange={(e) => handleRange(e)} />



      </div>
      <div>
        <div><label htmlFor="time">Time:</label></div>


        <label htmlFor="intimegr">Minimum: </label>
        <input type="number" name="time" id="minTime" className="min" min={0} onChange={(e) => handleRange(e)} />



        <label htmlFor="time">Maximum : </label>
        <input type="number" name="time" id="maxTime" className="max" min={0} onChange={(e) => handleRange(e)} />



      </div>
      <button type="submit">Submit</button>
    </form>
  );
}

export default App;
