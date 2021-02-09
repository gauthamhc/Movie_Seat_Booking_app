const movieSelect = document.getElementById("movie");
const container = document.querySelector(".container");
const seats = document.querySelectorAll('.row .seat:not(.occupied)');
const count = document.getElementById("count");
const total = document.getElementById("total");


populateUI()

let ticketPrice = +movieSelect.value;

function updateSelected() {
  const selectedSeats = document.querySelectorAll('.row .seat.selected');

  count.innerText = selectedSeats.length;
  total.innerText = (selectedSeats.length)*ticketPrice;

  const seatsIndex = [...selectedSeats].map(seat => {
    return [...seats].indexOf(seat);
  })

  localStorage.setItem('selectedSeats', JSON.stringify(seatsIndex))

}

function setMovieData(movieIndex, moviePrice) {
  localStorage.setItem('selectedMovieIndex', movieIndex )
  localStorage.setItem('selectedMoviePrice', moviePrice )
}

function populateUI() { 
  const selectedSeats = JSON.parse(localStorage.getItem('selectedSeats'));
  
  //populate on UI
  if(selectedSeats !==null &&  selectedSeats.length > 0) {
    seats.forEach((seat, index) => {
      if(selectedSeats.indexOf(index) > -1) {
        seat.classList.add('selected')
      }
    })
  }

  const selectedMovieIndex = localStorage.getItem('selectedMovieIndex')

  if(selectedMovieIndex !== null) {
    movieSelect.selectedIndex = selectedMovieIndex;
  }
}


//adding event listeners
container.addEventListener('click', (e) => {
  e.preventDefault();
  if((e.target.classList.contains('seat')) && !(e.target.classList.contains('occupied'))) {
  } e.target.classList.toggle('selected');

  updateSelected();
});
movieSelect.addEventListener('change', e => {
  // e.preventDefault();
  ticketPrice = +e.target.value;
  setMovieData(e.target.selectedIndex, e.target.value);
  updateSelected()

})

updateSelected();