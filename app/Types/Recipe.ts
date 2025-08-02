export default class Recipe {
  public id?: number;
  public name: string = "";
  public recipePicture: string = "";
  public ingredients: string = "";
  public howToPrepare: string = "";

  constructor(
    _name: string,
    _recipePicture: string,
    _ingredients: string,
    _howToPrepare: string,
  ) {
    this.name = _name;
    this.recipePicture = _recipePicture;
    this.ingredients = _ingredients;
    this.howToPrepare = _howToPrepare;
  }
  
}
