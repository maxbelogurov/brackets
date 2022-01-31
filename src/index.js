module.exports = function check(str, config) {
  let elemStatus = [];
  let elemSearch = [];
  let testObj = {}

  // записываем в массив elemStatus каждый символ из config с набором значений:
  // символ: кол-во раз в строке
  // position: в каком месте встречается
  // status: открыт, закрыт (только у открывающих скобок)
  config.forEach((value) => {
    for (let i in value) {
      testObj = {
        [value[i]]: 0, 
        'positionInStr': []
      }
      i === '0' ? testObj['statusOpen'] = false: '';
      elemStatus.push(testObj);
      elemSearch.push(value[i]);
      testObj = {};
    }
  });


  //переделываем строку в массив, ищем и записывем данные в elemStatus
  str = Array.from(str);
  // console.log(str, elemSearch)

  // если откытая скобка первая в списке - сразу ошибка, если закрывающая скобка в конце списка - ошиибка. ПОСТАВИТЬ RETURN!
  for (let i in elemSearch) {
    if (i % 2 === 0 && elemSearch[i] === str[str.length - 1]) {
      return false;
    }
    if (i % 2 !== 0 && elemSearch[i] === str[0]) {
      return false;
    }
  }

  for (let key in elemSearch) { //перебор элементов поиска
    for (let i in str) { //перебор строки
      if (elemSearch[key] === str[i]) { //проверяем равен ли искомый элемент элементу в строке
        elemStatus[key][elemSearch[key]]++; //увеличиваем этот элемент в elemSearch на 1
        elemStatus[key]['positionInStr'].push(i);
        if (key % 2 === 0) {
          elemStatus[key]['statusOpen'] = true;
        } else {
          elemStatus[key - 1]['statusOpen'] = false;
        }
      }
    }
  }
  let checkStatus;
  for (let n in elemStatus) {
    if (n % 2 === 0) {
      if (elemStatus[n][elemSearch[n]] === elemStatus[Number(n) + 1][elemSearch[Number(n) + 1]] && elemStatus[0]['statusOpen'] === false) {
        checkStatus = true;
      } else {
        checkStatus = false;
      }
    }
  };

  return elemStatus;

}
