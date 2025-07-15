
const searchbox = document.querySelector(".searchbox");
const searchbtn = document.querySelector(".searchbtn");
const recipeContainer = document.querySelector(".recipe-container");
const recipeDetailsContent = document.querySelector(".recipe-details-content");
const recipeClosebtn = document.querySelector(".recipe-close-btn");


//function to get recipes
const fetchrecipes = async (query) => {
    recipeContainer.innerHTML = "<h2>fetching Recipes...</h2>"
    try {
    const data = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${query}`);
    const response = await data.json();

    recipeContainer.innerHTML = "";
    response.meals.forEach(meal => {
        const recipediv = document.createElement('div');
        recipediv.classList.add('recipe');
        recipediv.innerHTML = `
            <img src="${meal.strMealThumb}">
            <h1>${meal.strMeal}</h1>
            <p><span>${meal.strArea}</span> dish</p>
            <p><span>${meal.strCategory}</span> Category</p>
        `

        const button = document.createElement('button');
        button.textContent = "view recipe details";
        recipediv.appendChild(button);

        button.addEventListener('click',() =>{
            openrecipePopup(meal);
        })

        const fetchIngredents = (meal) => {
            // console.log(meal);
            let ingredientList = ""
            for(let i = 1; i <= 20;i++){
                const ingredients = meal[`strIngredient${i}`];
                if(ingredients){
                    const measure = meal[`strMeasure${i}`];
                    ingredientList += `<li>${measure} ${ingredients}</li>`;
                }
                else{
                    break;
                }
            }
            return ingredientList;
        }

        const openrecipePopup = (meal)=>{
            recipeDetailsContent.innerHTML = `
            <h2 class="recipeName">${meal.strMeal}</h2>
            <h3>Ingredents:</h3?
            <ul class="ingredientList">${fetchIngredents(meal)}</ul>
            <div class="recipeInstructions">
                <h3>Instructions:</h3>
                <p>${meal.strInstructions}</p>
            </div>

            `

            recipeDetailsContent.parentElement.style.display = "block";
        }


        recipeContainer.appendChild(recipediv);
    });
    } 
    catch (error) {
         recipeContainer.innerHTML = "<h2>Error in Fetching Recipes...</h2>"
        
    }
    
}

recipeClosebtn.addEventListener('click',(e) => {
    recipeDetailsContent.parentElement.style.display = "none";
})

searchbtn.addEventListener('click',(e) => {
    e.preventDefault();
    // console.log('btton clicked');
    const searchinput = searchbox.value.trim();
    if(!searchinput){
        recipeContainer.innerHTML = `<h2>Please type the meal in search box</h2>`
        return;
    }
    fetchrecipes(searchinput);
})