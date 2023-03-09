// load meals

const loadMeals = async (id) => {
  try {

    const searchField= document.getElementById('search-field').value ;

const search = searchField || id ;

    const res = await fetch(
      `https://www.themealdb.com/api/json/v1/1/search.php?s=${search}`
    );
     const data = await res.json();
     showMeals(data.meals.slice(0,6))
  }
  
  catch (err) {
    console.log("error:" + err);
  }
};



// watch button on card 
function watch(youtube){
 
    window.location.href = youtube ;
  }

  
  // show data 
const showMeals =(meals) => {

    console.log(meals)


    if(meals.length <=5 ){
      document.getElementById('show-all').classList.add('hidden');


    }

    const cardContainer = document.getElementById('card-container');   
    
    cardContainer.innerHTML='';

    meals.forEach(meal => {

      const div = document.createElement('div');
      div.classList.add(
        "card", "card-side", "bg-base-100", "shadow-xl" ,"border"

      )
     const {strMeal, strMealThumb,strInstructions ,strYoutube} =meal ;


     div.innerHTML =`
<figure><img class =""  src="${strMealThumb}" alt="Movie"/></figure>
<div class="card-body">
  <h2 class="card-title">${strMeal}</h2>
  <p>${strInstructions.slice(0,100)}...</p>
  <p class="text-[#FFC107] underline text-xl mb-2">View Details</p>


  <div class="card-actions ">
    <button onclick="watch('${strYoutube}')" class="btn btn-primary">Watch</button>
  </div>
</div>
`

cardContainer.appendChild(div);




    });







}


// show all btn 

const showAll = async() =>{
  try {
   const id='chicken'

   const searchField= document.getElementById('search-field').value ;

   const search = searchField || id ;
    const res = await fetch(
      `https://www.themealdb.com/api/json/v1/1/search.php?s=${search}`
    );
     const data = await res.json();
     showMeals(data.meals)
     document.getElementById('show-all').classList.add('hidden');
  }
  
  catch (err) {
    console.log("error:" + err);
  }

}


// default call 

loadMeals('chicken')