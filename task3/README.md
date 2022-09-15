# FIGMA TO HTML

## Тестер

Здесь вы можете протестировать ваше решение. 

1. Чтобы проверить корректность выполнения задания, поместите решение в файл `./solution/index.js`.

2. Далее введите в консоль 
```bash 
node run.js
```

3. После выполнения скрипта, выходной файл будет создан здесь: `./output/output.html`.

4. Если все прошло успешно, можно идти в браузер и открывать output.html, чтобы убедиться в корректности работы решения.

5. Сдавать нужно только то, что находится в файле `./solution/index.js`.

## Бонус

В `./example` лежит пример превращения компонента TEXT в HTML. Если не знаете с чего начать, рекомендуем заглянуть. 

Чтобы запустить пример, выполните команду:
```bash 
node example/run.js
```

Далее откройте `./example/output.html` в браузере.

(*) Этот пример не эталон, а помощник на старте на случай, если нет идей.

### Желаем удачи!


### Условие задачи:

В современном мире каждый фронтенд-разработчик так или иначе работает с Figma – инструментом для создания дизайн-систем, макетов интерфейсов и прототипирования сценариев. Дизайнеры любят Figma за лёгкость и простоту.

Хороший специалист выстроит структуру макета так, чтобы разработчику была понятна упорядоченность компонентов. Грамотно составленная структура позволяет сразу приступить к вёрстке. Сам процесс вёрстки давно не является rocket science, но всё ещё требует много времени и усилий. Хотя время разработчика – дорогой ресурс, предлагаем потратить его на создание универсального адаптера из Figma-файла в HTML, чтобы упростить жизнь в будущем.

Макет списка товаров, который ранее уже предстояло сверстать, представлен в Figma и с помощью API выгружен в виде JSON-файла (ссылка «Скачать условие задачи» – ниже).

Нужно написать функцию, которая преобразует этот файл в HTML, а затем вернет HTML в виде строки. При тестировании эта строка будет подставлена внутрь тега body. Для локального тестирования решения – ссылка ниже.

Описание функции и параметров дано на Typescript, но функцию требуется написать на JS.

module.exports = function(json: object): string {}
Формат данных
Описание формата JSON доступно по ссылке на документацию.

Обращаем внимание, что цвета в json заданы от 0 до 1. Ссылка на документацию.

У тега body в тестируемом файле уже стоит padding: 0 и margin: 0.

Решение будет проверяться на Node 12.

Примечания
Также обращайте внимание на все отступы, высоты и ширины. При полном соответствии макету, не должно возникнуть проблем с решением.

Шрифты загружать не нужно.