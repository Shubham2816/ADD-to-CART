
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js"
import { getDatabase, ref, push, onValue, remove } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-database.js"

const appSettings ={
    databaseURL: "https://realtime-5c26c-default-rtdb.europe-west1.firebasedatabase.app"
}//adding realtime database using firebase

const app = initializeApp(appSettings)
const database = getDatabase(app)
const shoppingListInDB = ref(database, "shoppingList")

const inputFieldEl = document.getElementById("input-field")//connecting the elements of html to javascript i.e field and button
const addButtonEl = document.getElementById("add-button")
const shoppingListEl = document.getElementById("shopping-list")//connect html and javascript

addButtonEl.addEventListener("click", function() {
    let inputValue = inputFieldEl.value
    
    push(shoppingListInDB, inputValue)
// clear the feed me after it is added to the list
    clearInputFieldEl() 
})

onValue(shoppingListInDB, function(snapshot) {
    if (snapshot.exists()) {
      let itemsArray = Object.entries(snapshot.val())

      // Challenge: Change the onValue code so that it uses snapshot.exists() to show items when there are items in the database and if there are not displays the text 'No items here... yet'.
         clearShoppingListEl()

      // Challenge: Write a for loop to iterate on itemsArray and console log each item
      for (let i = 0; i < itemsArray.length; i++) {
        // Challenge: Use the appendItemToShoppingListEl(itemValue) function inside of the for loop to append item to the shopping list element for each iteration.
        let currentItem = itemsArray[i]
        // Challenge: Make two let variables:
        // currentItemID and currentItemValue and use currentItem to set both of
        // them equal to the correct values.
        let currentItemID = currentItem[0]
        let currentItemValue = currentItem[1]
        
        appendItemToShoppingListEl(currentItem)
    }
    }
     else {shoppingListEl.innerHTML = "Hungry... yet"}
})

function clearShoppingListEl() {
    shoppingListEl.innerHTML = ""
}

function clearInputFieldEl() {
    inputFieldEl.value = ""
}

function appendItemToShoppingListEl(item) {
    let itemID = item[0]
    let itemValue = item[1]
    
    let newEl = document.createElement("li")
    
    // Challenge: Make it so the item name shows instead of 'Something'
    newEl.textContent = itemValue
    
    newEl.addEventListener("click", function() {
    //   // Challenge: Make a let variable called 'exactLocationOfItemInDB' and set it equal to 
    //   ref(database, something) where you substitute something with the code that will give you the exact
    //    location of the item in question.
      let exactLocationOfItemInDB = ref(database, `shoppingList/${itemID}`)
      remove(exactLocationOfItemInDB)
    })

    shoppingListEl.append(newEl)
}