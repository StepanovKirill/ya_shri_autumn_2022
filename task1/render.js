const solution = (photo_number, background_width, background_height) => {
  if (photo_number == 0 || background_width <= 0 || background_height <= 0) return [];
  
  const column_number = Math.ceil(Math.sqrt(photo_number));
  const rows_number = photo_number % column_number 
    ? Math.ceil(photo_number / column_number)
    : photo_number / column_number;
  const aspect_ratio = background_width / background_height;

  // размеры фоторамок
  const photo_width = Math.round(background_width / column_number);
  const photo_height = Math.round(photo_width / aspect_ratio);

  // сдвиг по оси у
  const shift_y = (background_height - photo_height * rows_number) / 2;

  let photos = [];
  
  for (let current_row = 0; current_row < rows_number; current_row++) {
    // количество фото в строке
    let photo_per_line = photo_number % column_number || column_number;
    photo_number -= photo_per_line;

    for (let current_column = 0; current_column < photo_per_line; current_column++) {
      // сдвиг первого фото в строке относительно левого края
      const shift_x = (background_width - photo_per_line * photo_width) / 2;

      photos.push({
        width: photo_width,
        height: photo_height,
        
        // положение крепления - середина верхней стороны рамки
        x: Math.round(shift_x + photo_width * current_column + photo_width / 2),
        y: Math.round(current_row * photo_height + background_height % photo_height + shift_y)
      });
    }
  }

  return (photos)
}

const form = document.querySelector("form")
const result = document.querySelector("#result")

form.addEventListener("submit", (e) => {
  e.preventDefault();
  result.innerHTML = ''
  const container = document.createElement("div")
  container.className = 'container';

  const width =  document.querySelector("#width").value
  const height =  document.querySelector("#height").value
  container.style.width = width + 'px';
  container.style.height = height + 'px';

  result.appendChild(container);

  const photo_number = document.querySelector("#num").value;
  const photos = solution(photo_number, width, height);

  photos.forEach((item, index) => {
    const photo = document.createElement("div")
    photo.className = 'photo';
    photo.style.width = item.width + 'px';
    photo.style.height = item.height + 'px';
    photo.style.top = item.y + 'px';
    photo.style.left = item.x - item.width / 2 + 'px';
    photo.textContent = index + 1;

    container.appendChild(photo)

    const dot = document.createElement('div');

    dot.className = 'dot'
    dot.style.top = item.y - 2.5 + 'px';
    dot.style.left = item.x - 2.5 + 'px';
    container.appendChild(dot)

  });
});

