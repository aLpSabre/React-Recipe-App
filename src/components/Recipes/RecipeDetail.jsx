import React from 'react'
import { useLocation} from "react-router-dom";
export const RecipeDetail = () => {

  const {state:{data}} =useLocation();
  console.log(data);
  console.log(typeof data);
console.log(data.recipe)
  return (


      <div>
      <div>

      <div>
        <img src="" alt="" />
      </div>
      <div>
        <div>
        <p>{data?.recipe?.label} jjhj</p>
        <p>recipe</p>
        </div>
      <div>
        <div>low-sodiom</div>
      </div>
        <div>
          <h2>Nutrion</h2>
          <p>calorie</p>
          <p>daily value</p>
          <p>servings</p>
        </div>

        <div>
          <p>Ingridients number</p>
          <ul>
            <li>ingridienta</li>
          </ul>
        </div>
        <div>
          <p>Preparation</p>
          <button>Instructions</button>
        </div>
      </div>
      </div>
      
     

    </div>
   
    
  )
}
