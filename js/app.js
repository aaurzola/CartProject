//variables
const subMenuCart = document.querySelector("#carrito");
const addBtn = document.querySelector("#lista-cursos");
const cartContainer = document.querySelector("#lista-carrito tbody");
const emptyCartBtn = document.querySelector("#vaciar-carrito");
const headerContainer = document.querySelector(".u-pull-right");

console.log(headerContainer);

const HTMLCounter = document.createElement("p");
HTMLCounter.innerHTML = `<span class="cartCounter">${3}</span>`;


headerContainer.appendChild(HTMLCounter);
console.log(headerContainer.children);
let coursesList = [];

//counter on header






//events
addBtn.addEventListener("click", addArticle);
subMenuCart.addEventListener("click", emptyCartContainer);
subMenuCart.addEventListener("click", deleteCourse);

//functions
function addArticle(e) {
  e.preventDefault();
  if (e.target.classList.contains("agregar-carrito")) {
    const selectedCourse = e.target.parentElement.parentElement;
    const selectedCourseId = selectedCourse.querySelector("a").getAttribute("data-id");
    const exists = coursesList.some(course => course.id === selectedCourseId);

    if (exists) { //if there is a course already in the array
      const index = coursesList.findIndex(course => course.id === selectedCourseId);
      coursesList[index].quantity++;
    } else { //if there isn't a course in the array
      coursesList.push(courseToObject(selectedCourse));
    }
    listToHTML(coursesList);
  }
}

//gets the corresponding course and wraps it into an object
function courseToObject(course) {
  let courseObject = {
    imgSrc: course.querySelector("img").src,
    title: course.querySelector(".info-card h4").textContent,
    price: course.querySelector(".precio span").textContent,
    quantity: 1,
    id: course.querySelector("a").getAttribute("data-id")
  }
  return courseObject;
}

//gets a list and writes the main document HTML into the table element
function listToHTML(list) {
  resetCartContainer();//need to reset the courses Object list.

  list.forEach(courseObject => {
    const { imgSrc, title, price, quantity, id } = courseObject;
    const row = document.createElement("tr");
    row.innerHTML = `
    <td><img src="${imgSrc}" width="100px"></td>
    <td>${title}</td>
    <td>${price}</td>
    <td>${quantity}</td>
    <td><a href="#" class="borrar-curso" data-id="${id}"> x </a></td>
    `;

    cartContainer.appendChild(row);
  });
}

function resetCartContainer() {
  while (cartContainer.children.length !== 0) {
    cartContainer.removeChild(cartContainer.children[0]);
  }
}

function emptyCartContainer(e) {
  if (e.target.classList.contains("button")) {
    coursesList = []
    listToHTML(coursesList);
  }
}

function deleteCourse(e) {
  if (e.target.classList.contains("borrar-curso")) {
    const selectedCourseId = e.target.getAttribute("data-id");
    coursesList = coursesList.filter(course => (course.id !== selectedCourseId));
    listToHTML(coursesList);
  }
}
