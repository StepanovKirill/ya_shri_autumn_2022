function renderWaterfall(rootNode, columnCount, elementGap) {
  const articles = Array.from(rootNode.children);
  
  rootNode.setAttribute('style', `display: flex; flex-wrap: wrap; column-gap: ${elementGap}px;`);

  const rootWidth = rootNode.getBoundingClientRect().width;
  const columnWidth = ((rootWidth - (columnCount - 1) * elementGap) / (columnCount));

  // удалим содержимое rootNode
  rootNode.innerHTML = '';

  // добавим колонки
  for (let i = 0; i < columnCount; i++) {
    const column = document.createElement("div");
    column.id = i.toString();
    
    column.setAttribute('style', `display: flex; flex-direction: column; width: ${columnWidth}px; row-gap: ${elementGap}px`);

    rootNode.appendChild(column);
  }

  // раскидываем статьи по колонкам с минимальной высотой
  for (let i = 0; i < articles.length; i++) {
    getMinColumn(rootNode, elementGap).appendChild(articles[i]);
  }

}

function getMinColumn(rootNode, gap) {

  let minIndex = 0;
  const columns = Array.from(rootNode.children);

  if (columns.length == 0) {
    return
  }

  let minHeight = calculateHeightColumn(columns[0], gap);
  
  columns.forEach((item, index) => {
    const heightCurrentColumn = calculateHeightColumn(item, gap);
    if (heightCurrentColumn < minHeight) {
      minHeight = heightCurrentColumn;
      minIndex = index;
    }
  });

  return (columns[minIndex])
}

function calculateHeightColumn(column, gap) {
  // подсчет высоты колонки

  const articles = Array.from(column.children);
  return (articles.reduce((sum, element) => sum += element.getBoundingClientRect().height, 0) + (articles.length - 1) * gap)
}

const lorem = "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Suscipit consectetur magnam ex asperiores atque recusandae quisquam expedita repellat. Itaque voluptates expedita eius veniam ut, perferendis excepturi rem sequi illum, fugit voluptatem minima voluptate hic. Nam ab aliquid adipisci sed dignissimos, corrupti ipsa ut illo, excepturi earum est aut cumque debitis."

function generateArticles(count) {
  const container = document.querySelector(".root");

  for (let i = 0; i < count; i++) {
    const newItem = document.createElement("div");
    newItem.className = "el";
    newItem.textContent = lorem.slice(0, Math.ceil(Math.random() * 1000 % lorem.length))
    container.appendChild(newItem)
  }
}

const form = document.querySelector("form")
const result = document.querySelector(".root")

form.addEventListener("submit", (e) => {
  e.preventDefault();
  result.innerHTML = '';
  
  const articlesCount =  document.querySelector("#articles_count").value;
  const columnCount =  document.querySelector("#column_count").value;
  const gap = document.querySelector("#gap").value;

  generateArticles(articlesCount);

  renderWaterfall(result, columnCount, gap);
});