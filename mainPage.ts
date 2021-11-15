function loadPage(page: string): void {
  window.location.href = page;
}

function startGame(): void {
  const size: number = Number((document.getElementById('sizeInputValue') as HTMLInputElement).value);
  const bomb_count: number = Number((document.getElementById('bombInputValue') as HTMLInputElement).value);
  if (isNaN(size) || isNaN(bomb_count) || 
      !(5 <= size && size <= 30) || !(3 <= bomb_count && bomb_count <= size * size - 1) ||
      size != Math.floor(size) || bomb_count != Math.floor(bomb_count)) {
    askForCorrectValues(size, bomb_count);
    return;
  }
  sessionStorage.setItem('SIZE', String(size));
  sessionStorage.setItem('BOMB_COUNT', String(bomb_count));
  loadPage("game.html");
}

function askForCorrectValues(size: number, bomb_count: number): void {
  let errorDisplayer: HTMLElement = document.getElementById('errorDisplayer');
  if (isNaN(size) || !(5 <= size && size <= 30) || size != Math.floor(size)) {
    errorDisplayer.innerHTML = "The size should be an integer number between 5 to 30.";
  } else if (isNaN(bomb_count) || !(3 <= bomb_count && bomb_count <= size * size - 1) || bomb_count != Math.floor(bomb_count)) {
    errorDisplayer.innerHTML = "The number of bombs should be an integer number between 3 and " + Math.floor(size * size - 1);
  }
}