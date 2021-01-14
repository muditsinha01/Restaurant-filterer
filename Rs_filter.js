/ Creating a class FluentRestaurants for storing the data and extracting pertinent information from it, it has the methods fromState, ratingLeq,
// ratingGeq, category, hasAmbience, bestPlace and mostReviews. 
class FluentRestaurants{
  //constructor for FluentRestaurant it assigns the value passed in it's parameters.
  constructor(jsonData){
    this.data = jsonData;
  }
  // a method to get all restaurants in a particular state, it takes in a state of string value and filters through the dataset 
  // returning a new FluentRestaurant object with restaurants only from the state which was passed in as a parameter. 
  fromState(stateStr){
    let f = new FluentRestaurants(this.data.filter(function f(x){return (lib220.getProperty(x, 'state').value ===  stateStr);}));
    return f;
  }
  // a method to get all restaurants rated less than or equal to  num value passed in the parameter(rating), it filters through
  // the dataset returning a new FluentRestaurant object with restaurants which satisfied the above mentioned condition.
  ratingLeq(rating){
    return new FluentRestaurants(this.data.filter(function f(x){ return(lib220.getProperty(x, 'stars').value <= rating);}));
  }
  // a method to get all restuarants rated greater than or equal to the rating of num value passed in the parameter(rating),it
  // filters through the dataset returning a new FluentRestaurant object with restaurants that have passed the rating criteria.
  ratingGeq(rating){
    return new FluentRestaurants(this.data.filter(function f(x){ return(lib220.getProperty(x, 'stars').value >= rating);}));
  }
  // a method which filters through the dataset to find whether the restaurant belongs to the particular category passed in the parameter or not
  // It then returns a new FluentRestaurants object with restuarants only from that particular category. While filtering it checks wheter 
  // the category string is in the categories object which is an object of strings, if it is then that restuarant isn't filtered. 
  category(categoryStr){
    const eql = (element) => element === categoryStr;
    return new FluentRestaurants(this.data.filter(function f(x){ return (lib220.getProperty(x, 'categories').value.some(eql) === true)}));
  }
  // The method first checks if the restaurant has an Ambience object under it's attributes, if it does then it checks whether the restaurant has 
  // the particular Ambience that is passed in by the parameter. If it does then the restaurant is retained in the new FluentRestaurant object which
  // is returned otherwise it is filtered.
  hasAmbience(ambienceStr){
    return new FluentRestaurants(this.data.filter(function f(x){ if(lib220.getProperty(x.attributes, 'Ambience').found){
      if(ambienceStr === 'hipster'){
        return lib220.getProperty(x.attributes.Ambience, 'hipster').value ;
      }
      if(ambienceStr === 'trendy'){
        return lib220.getProperty(x.attributes.Ambience,'trendy').value ;
      }
      if(ambienceStr === 'upscale'){
        return lib220.getProperty(x.attributes.Ambience, 'upscale').value;
      }
      if(ambienceStr === 'casual'){
        return lib220.getProperty(x.attributes.Ambience, 'casual').value;
      }}}));
  }
  //A method which first checks if a particular restaurant has ratings, it then compares to a mininum inital rating and then the new initial rating
  // becomes the first restaurants rating, this way we reach the restaurant with the highest rating, if there are two restaurants with the same ratings
  // then there review count is checked, the one with the higher count is the winner, if their reviews are the same then the first restaurant gets preference.
  // We reduce all the restaurant objects into a single object with the highest rating using the above algorithm and reduce function.
  bestPlace(){
    let x = new FluentRestaurants(this.data.reduce(function(acc,res){
      if(lib220.getProperty(res, 'stars').found && lib220.getProperty(acc, 'stars').found){
        if(lib220.getProperty(res, 'stars').value > lib220.getProperty(acc, 'stars').value){
          return acc = Object.create(res);
        }
        if(lib220.getProperty(res, 'stars').value === lib220.getProperty(acc, 'stars').value){
          if(lib220.getProperty(res, 'review_count').value > lib220.getProperty(acc, 'review_count').value){
          return acc = Object.create(res);
          }
          else if(lib220.getProperty(acc, 'review_count').value > lib220.getProperty(res, 'review_count').value){
            return acc;
          }
          if(lib220.getProperty(acc, 'review_count').value === lib220.getProperty(res, 'review_count').value){
            return acc;
          }
        }
      }
      else{
      return {};
    }
  }, {stars: 0}));
  return x;
  }
  // Similar to the bestPlace method we reduce the restaurant objects into a single object with the highest reviews using the same algorithm 
  // replacing ratings with review count and review count with ratings. 
  mostReviews(){
    let x = new FluentRestaurants(this.data.reduce(function(acc,currElem){
      if(lib220.getProperty(currElem, 'review_count').found  && lib220.getProperty(acc, 'review_count').found){
         if(lib220.getProperty(currElem, 'review_count').value > lib220.getProperty(acc, 'review_count').value){
            return acc = Object.create(currElem);
         }
         if(lib220.getProperty(acc, 'review_count').value === lib220.getProperty(currElem, 'review_count').value){
           if(lib220.getProperty(currElem, 'stars').value > lib220.getProperty(acc, 'stars').value){
            return acc = Object.create(currElem);
          }
          else if(lib220.getProperty(acc, 'stars').value > lib220.getProperty(currElem, 'stars').value){
            return acc;
          }
          if(lib220.getProperty(currElem, 'stars').value === lib220.getProperty(acc, 'stars').value){
            return acc;
          }
        }
      }
      else{
      return {};
    }
  }, {review_count: 0}));
  return x;
  }
}

const testData = [
{
 name: "Applebee's",
 state: "NC",
 stars: 4,
 review_count: 6,
 categories: ["restaurant", "American"]
 },
 {
 name: "China Garden",
 state: "NC",
 stars: 4,
 review_count: 10,
 categories: ["restaurant", "Chinese"]
 },
 {
 name: "Beach Ventures Roofing",
 state: "AZ",
 stars: 3,
 review_count: 30,
 categories: ["Adventure", "Bar"]
 },
 {
 name: "Alpaul Automobile Wash",
 state: "NC",
 stars: 3,
 review_count: 30,
 categories: ["Leisure"]
 }
]