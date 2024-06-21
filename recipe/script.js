function searchRecipes() {
    var ingredients = document.getElementById("searchInput").value;
    var appId = 'b7d41da6'; // Replace 'YOUR_APP_ID' with your actual Edamam application ID
    var appKey = '681dceb81d6f5149aeb21fe1be834b7d'; // Replace 'YOUR_APP_KEY' with your actual Edamam application key
    var url = `https://api.edamam.com/search?q=${ingredients}&app_id=${appId}&app_key=${appKey}`;

    fetch(url)
        .then(response => response.json())
        .then(data => {
            displayRecipes(data.hits);
        })
        .catch(error => {
            console.error('Error fetching recipes:', error);
        });
}

function displayRecipes(recipes) {
    var recipeResultsDiv = document.getElementById("recipeResults");
    recipeResultsDiv.innerHTML = '';

    recipes.forEach(recipe => {
        var recipeTitle = recipe.recipe.label;
        var recipeImage = recipe.recipe.image;
        var recipeUrl = recipe.recipe.url;

        var recipeItem = `
            <div class="recipeItem">
                <h2>${recipeTitle}</h2>
                <img src="${recipeImage}" alt="${recipeTitle}">
                <a href="${recipeUrl}" target="_blank">View Recipe</a>
            </div>
        `;

        recipeResultsDiv.innerHTML += recipeItem;
    });
}
