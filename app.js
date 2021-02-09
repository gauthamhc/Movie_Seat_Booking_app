const movieSelect = document.getElementById('movie');
const container = document.querySelector('.container');
const seats = document.querySelectorAll('.row .seat:not(.occupied)');
const count = document.getElementById('count');
const total = document.getElementById('total');

populateUI()
let ticketPrice =  +movieSelect.value;



//function to update selected seats
function updateSelectedSeats() {
  const selectedSeats = document.querySelectorAll('.row .seat.selected');

  const seatsIndex = [...selectedSeats].map(seat =>
    [...seats].indexOf(seat));
  
  localStorage.setItem('selectedSeats', JSON.stringify(seatsIndex));
  
 
  count.innerText = selectedSeats.length;
  total.innerText = selectedSeats.length * ticketPrice;
}
//function to update the movie
function updateMovie(movieIndex, moviePrice) {
  localStorage.setItem('selectedMovieIndex', movieIndex);
  localStorage.setItem('selectedPrice', moviePrice);
}

//function to populate UI
function populateUI() {
  const selectedSeats = JSON.parse(localStorage.getItem('selectedSeats'));

  if(selectedSeats !== null && selectedSeats.length>0) {
    seats.forEach((seat, index) => {
      if(selectedSeats.indexOf(index) > -1) {
        seat.classList.add('selected')
      }
    })
  }

  const selectedMovieIndex = localStorage.getItem('selectedMovieIndex');

  if(selectedMovieIndex !==null) {
    movieSelect.selectedIndex = selectedMovieIndex;
  }


}


// adding event listener
container.addEventListener('click', (e) => {
  if((e.target.classList.contains('seat')) && !(e.target.classList.contains('occupied'))) {
    e.target.classList.toggle('selected')
    updateSelectedSeats();
  }
})

movieSelect.addEventListener('change', e => {
  ticketPrice =  +movieSelect.value;
  updateSelectedSeats();
  updateMovie(movieSelect.selectedIndex, movieSelect.value) ;
})

//calling function
updateSelectedSeats()