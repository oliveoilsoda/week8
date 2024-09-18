class Game {
    constructor(name, publisher) { //Gives the game a name and publisher
        this.name = name;
        this.publisher = publisher;
    }
    
    describe() { // Presents the game info
        return `${this.name} was published by ${this.publisher}`;
    }
}
class Collection {
    constructor(name) { //Create Collection for games to be sorted into
        this.name = name;
        this.games = []; //creates array that holds games
    }
    
    addGame(game) {
        if (game instanceof Game) {
            this.games.push(game); //Pushes games into array 
        } else {
            throw new Error(`ERROR!! What you entered is not an instance of a game. You entered: ${game}`); // Shows up if incorrect instance is inserted
        }
    }
    
    describe() {
        return `${this.name} has ${this.games.length} games in it.`; //Displays collection info
    }
}
class Menu { // What allows us to view and manage game collection
    constructor() {
        this.collections = [];
        this.selectedCollection = null; // manage one collection at a time
    }
    
    start() { // Starts menu application
        let selection = this.showMainMenuOptions(); //returns user selection
        while (selection != 0) {
            switch(selection) { //determines what was selected as long as its not zero
    case '1' :
        this.createCollection();
        break;
    case '2' :
        this.viewCollection();
        break;
    case '3' :
        this.deleteCollection();
        break;
    case '4' :
        this.displayCollections();
        break;
    default:
    selection = 0;
    }
    selection = this.showMainMenuOptions(); //loops code until exit
    }
    alert('See Ya!');
    }
    
    showMainMenuOptions() { //creates popup and returns input
        return prompt(`
            0) Leave
            1) Create a New, Totally Awesome, Game Collection
            2) View a Awesome Game Collection
            3) Destroy a Collection :(
            4) Show All of your Awesome Game Collections
        `);
    }
    
    showCollectionMenuOptions(collectionInfo) {
        return prompt(`
            0) Go Back
            1) Add a Game to your Collection
            2) Remove a Game from your Collection
            -----------------
            ${collectionInfo}
        `);
    }
    
    displayCollections() { //Builds string to display collection info
        let collectionString = '';
            for (let i = 0; i < this.collections.length; i++) {
            collectionString += i+ ') ' + this.collections[i].name + '\n'; //identifies index of each collection and adds them to a new string to be displayed with an index number
        }
        alert(collectionString); //display collection in popup
    }
    
    createCollection() {
        let name = prompt('Name your Collection');
        this.collections.push(new Collection(name)); //pushes new name into collections array
    }
    
    viewCollection() {
        let index = prompt("What is the index of the collection your looking for? ");
        if (index > -1 && index < this.collections.length) { //Avoids error if a number under 0 or more than the number of collections we have is inputed
            this.selectedCollection = this.collections[index]; //sets selected team to index inputed by user
            let description = 'Collection Name: ' + this.selectedCollection.name + '\n';
            description += ' ' + this.selectedCollection.describe() + '\n ';
            for (let i = 0; i < this.selectedCollection.games.length; i++) {
            description += i + ') ' + this.selectedCollection.games[i].describe() + '\n';
            }


        let selection1 = this.showCollectionMenuOptions(description);
        switch (selection1) {
            case '1' :
                this.createGame();
            break;
                case '2' :
            this.deleteGame();
            }
        } // validate user input
    }
    
    deleteCollection() {
        let index = prompt('Whats the Index of the Collection you want to destroy?');
        if (index > -1 && index < this.collections.length) { //validates selection
            this.collections.splice(index,1);
        }
    }
    
    
    createGame() {
        let name = prompt('Enter Game');
        let publisher = prompt('Who Published this Game?');
        this.selectedCollection.addGame(new Game(name,publisher)); //adds both game and publisher info to array
    }
    
    deleteGame() {
        let index = prompt('Whats the index of the game you want to remove from collection? ');
        if (index > -1 && index < this.selectedCollection.games.length) { this.selectedCollection.games.splice(index,1); //validates selection
        }
    }
}
let menu = new Menu();
menu.start();
    