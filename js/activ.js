// get total
// create Product
// save localStorage
// clear input
// read
// count
// delete
// update
// search
// clean data
// --------------------------------------

// -------- inputs -----------
let title = document.getElementById("title");

let price = document.getElementById("price");
let texes = document.getElementById("texes");
let ads = document.getElementById("ads");
let discount = document.getElementById("discount");
let total = document.getElementById("total");

let count = document.getElementById("count");
let category = document.getElementById("category");
let sub = document.getElementById("sub");

let mood = "create";
let tmp;
// -------- inputs -----------




// ------------------ get total------------------------
function getTotal() {
  if (price.value != "") {
    // Calculate the result by adding price, taxes, and ads, and subtracting the discount.
    let result = +price.value + +texes.value + +ads.value - +discount.value;

    // Set the inner HTML of the 'total' element to the calculated result.
    total.innerHTML = result;

    // Apply bold font weight to the 'total' element.
    total.style.fontWeight = "bold";
  } else {
    // If the price is empty, clear the inner HTML of the 'total' element.
    total.innerHTML = "";
  }
}



// Define an array to store product data.
let dataPro;
// Create a new product and save it to local storage.
if (localStorage.prodact != null) {
  dataPro = JSON.parse(localStorage.prodact);
} else {
  dataPro = [];
}

// -------------------- onclick create ------------------------
sub.onclick = () => {


  // Create a new product object with input values.
  let newProw = {
    title: title.value.toLowerCase(),
    price: price.value,
    texes: texes.value,
    ads: ads.value,
    discount: discount.value,
    total: total.innerHTML,
    count: count.value,
    category: category.value.toLowerCase(),
  };






  // clean data
  if (title.value != "" && price.value != "" && newProw.count < 100) {





    
    // Add the new product to the products array.
    // mood = create
    if (mood === "create") {



      // count
      if (newProw.count > 1) {
        for (let i = 0; i < newProw.count; i++) {
          // Add the new product object to the 'dataPro' array.
          dataPro.push(newProw);
        }
      } else {
        // يطبعلي منتج واحد بس
        // Add the new product object to the 'dataPro' array.
        dataPro.push(newProw);
      }
    } else {
      dataPro[tmp] = newProw;
      mood = "create";
      sub.innerHTML = "Create";
      count.style.display = "block";
      category.style.width = "49.6%";
    }

    // Clear input fields.
    clearData();
  }

  // Save or update the 'dataPro' array in local storage.
  localStorage.setItem("prodact", JSON.stringify(dataPro));

  // Update the displayed table.
  showData();
};

// Clear input fields.
function clearData() {
  title.value = "";
  price.value = "";
  texes.value = "";
  ads.value = "";
  discount.value = "";
  total.innerHTML = "";
  count.value = "";
  category.value = "";
}

// read Product
// Display the stored product data in an HTML table.
function showData() {
  // total
  getTotal();

  // Initialize an empty string to store the HTML table rows.
  let table = "";

  // Loop through the 'dataPro' array and generate HTML rows.
  for (let i = 0; i < dataPro.length; i++) {
    table += `
      <tr>
          <td>${i + 1}</td>
          <td>${dataPro[i].title}</td>
          <td>${dataPro[i].price}</td>
          <td>${dataPro[i].texes}</td>
          <td>${dataPro[i].ads}</td>
          <td>${dataPro[i].discount}</td>
          <td>${dataPro[i].total}</td>
          <td>${dataPro[i].category}</td>
          <td><button onclick="updateData(${i})" id="update">update</button></td>
          <td><button onclick="deleteData(${i})" id="delete">delete</button></td>
      </tr>
    `;
  }

  // Set the inner HTML of the 'tbody' element to the generated table.
  document.getElementById("tbody").innerHTML = table;

  //Delete All
  let subDelAll = document.getElementById("Delete-All");
  if (dataPro.length > 0) {
    subDelAll.innerHTML = `
        <td><button onclick="DeleteAll()" id="delete"> Delete All (${dataPro.length})</button></td>
    `;
  } else {
    subDelAll.innerHTML = "";
  }
}



// Call the showData function to display the initial data.
showData();

// delete item
function deleteData(i) {
  dataPro.splice(i, 1);
  localStorage.setItem("prodact", JSON.stringify(dataPro));
  showData();
}

// DeleteAll
function DeleteAll() {
  dataPro.splice(0);
  localStorage.clear();
  showData();
}

// update
function updateData(i) {
  title.value = dataPro[i].title;
  price.value = dataPro[i].price;
  texes.value = dataPro[i].texes;
  ads.value = dataPro[i].ads;
  discount.value = dataPro[i].discount;

  getTotal();

  count.style.display = "none";
  category.value = dataPro[i].category;
  category.style.width = "100%";
  sub.innerHTML = "Update";

  mood = "Update";
  tmp = i;

  scroll({
    top: 0,
    left: 0,
    behavior: "smooth",
  });
}

// search
let searchMood = "title";
function getSearchMood(id) {
  let search = document.getElementById("search");

  if (id == "search-title") {
    searchMood = "title";
  } else {
    searchMood = "category";
  }
  search.placeholder = " Search By " + searchMood;
  search.focus();
  search.value = "";
  showData();
}

// search
function searchData(value) {
  let table = "";
  for (let i = 0; i < dataPro.length; i++) {
    if (searchMood == "title") {
      if (dataPro[i].title.includes(value.toLowerCase())) {
        table += `
        <tr>
            <td>${i}</td>
            <td>${dataPro[i].title}</td>
            <td>${dataPro[i].price}</td>
            <td>${dataPro[i].texes}</td>
            <td>${dataPro[i].ads}</td>
            <td>${dataPro[i].discount}</td>
            <td>${dataPro[i].total}</td>
            <td>${dataPro[i].category}</td>
            <td><button onclick="updateData(${i})" id="update">update</button></td>
            <td><button onclick="deleteData(${i})" id="delete">delete</button></td>
        </tr>
      `;
      }
    } else {
      if (dataPro[i].category.includes(value.toLowerCase())) {
        table += `
        <tr>
            <td>${i}</td>
            <td>${dataPro[i].title}</td>
            <td>${dataPro[i].price}</td>
            <td>${dataPro[i].texes}</td>
            <td>${dataPro[i].ads}</td>
            <td>${dataPro[i].discount}</td>
            <td>${dataPro[i].total}</td>
            <td>${dataPro[i].category}</td>
            <td><button onclick="updateData(${i})" id="update">update</button></td>
            <td><button onclick="deleteData(${i})" id="delete">delete</button></td>
        </tr>
      `;
      }
    }
  }
  // Set the inner HTML of the 'tbody' element to the generated table.
  document.getElementById("tbody").innerHTML = table;
}
