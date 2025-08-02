import Recipe from "./Recipe";

export default class OldRecipe {
  public id?: number;
  public title: string = "";
  public ingredients: string = "";
  public instructions: string = "";

  constructor(_title: string, _ingredients: string, _instructions: string) {
    this.id = 0;
    this.title = _title;
    this.ingredients = _ingredients;
    this.instructions = _instructions;
  }

  public static ParseFromRecipe(recipes: Recipe[]): OldRecipe[] {
    return recipes.map(
      (r) => new OldRecipe(r.name, r.ingredients, r.howToPrepare)
    );
  }
}
