// load meals

const loadMeals = async (id) => {
  try {
    const searchField = document.getElementById("search-field").value;

    const search = searchField || id;

    const res = await fetch(
      `https://www.themealdb.com/api/json/v1/1/search.php?s=${search}`
    );
    const data = await res.json();
    showMeals(data.meals.slice(0, 6));
  } catch (err) {
    console.log("error:" + err);
  }
};

// watch button on card
function watch(youtube) {
  window.location.href = youtube;
}

// show data
const showMeals = (meals) => {
  console.log(meals);

  if (meals.length <= 5) {
    document.getElementById("show-all").classList.add("hidden");
  }

  const cardContainer = document.getElementById("card-container");

  cardContainer.innerHTML = "";

  meals.forEach((meal) => {
    const div = document.createElement("div");
    div.classList.add(
      "card",
      "card-side",
      "bg-base-100",
      "shadow-xl",
      "border"
    );
    const { strMeal, strMealThumb, strInstructions, strYoutube, idMeal } = meal;

    div.innerHTML = `
<figure><img class =""  src="${strMealThumb}" alt="Movie"/></figure>
<div class="card-body">
  <h2 class="card-title">${strMeal}</h2>
  <p>${strInstructions.slice(0, 100)}...</p>
  <label for="my-modal-6" onclick ="openModal('${idMeal}')" >
  <p class="text-[#FFC107] underline text-xl mb-2">View Details</p>
  </label>

  <div class="card-actions ">
    <button onclick="watch('${strYoutube}')" class="btn btn-primary">Watch</button>
  </div>
</div>
`;

    cardContainer.appendChild(div);
  });
};

// modal function for details

const openModal = async (id) => {
  try {
    console.log(id);
    const res = await fetch(
      `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`
    );
    const data = await res.json();
    showDetails(data.meals[0]);
  } catch (err) {
    console.log("error:" + err);
  }
};

// show details on modal
const showDetails = (meal) => {
  const {
    strMeal,
    strMealThumb,
    strInstructions,
    strYoutube,
    strCategory,
    strArea,
  } = meal;
  console.log(meal);

  const modalContainer = document.getElementById("food-modal-container");
  modalContainer.innerHTML = "";

  modalContainer.innerHTML = `
          
    <label for="my-modal-6" class="btn btn-sm btn-circle absolute  z-10 right-2 top-2   md:right-4 md:top-5  bg-[#EB5757] border-none"> ✕</label>
    
        <h3 class="font-bold text-2xl mt-4 mb-4 text-[#403F3F]">${strMeal}</h3>
        <hr>
       <div> <img class ="mt-4 rounded-lg "  src="${strMealThumb}" alt="Movie"/> </div>
        <h1 class="my-4"><span  class=" font-bold" >  Category:</span> ${strCategory} </h1> 
        <h1 class="my-4"><span  class=" font-bold" >  Area:</span> ${strArea} </h1> 
        <h1 class="my-4"><span  class=" font-bold" >  Instruction:</span> ${strInstructions} </h1> 
        <h1 class="my-4"><span  class=" font-bold" >  youtube:</span> ${strYoutube} </h1> 
        <div class="modal-action">
          <label for="my-modal-6" class="btn bg-[#DC3545] text-white border-none">Close</label>
        
    </div>`;
};

// enter click on search-field

document
  .getElementById("search-field")
  .addEventListener("keypress", function (event) {
    if (event.key === "Enter") {
      loadMeals();
    }
  });

// show all btn

const showAll = async () => {
  try {
    const id = "chicken";

    const searchField = document.getElementById("search-field").value;

    const search = searchField || id;
    const res = await fetch(
      `https://www.themealdb.com/api/json/v1/1/search.php?s=${search}`
    );
    const data = await res.json();
    showMeals(data.meals);
    document.getElementById("show-all").classList.add("hidden");
  } catch (err) {
    console.log("error:" + err);
  }
};

// default call

loadMeals("chicken");
