const searchRecipes = async (searchTerm: string, page: number) => {
  const baseUrl = `http://localhost:5000/api/recipes/search?searchTerm=${searchTerm}&page=${page.toString()}`;
  const response = await fetch(baseUrl);
  //If the response is not ok, we throw an error
  if(!response.ok) {
    throw new Error('HTTP error! Status: ' + response.status);
  }
  return  response.json();
}

export { searchRecipes };
