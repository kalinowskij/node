// 1. Требуется реализовать декоратор с параметрами pause,
//     который откладывает выполнение функции на указанное
// количество секунд. Пример использования:
//     function func() {
//         console.log('Функция выполниться с задержкой в 2 секунды!');
//     }
// let paused = pause(func, 2);
// paused();

function pause(func, ms) {
    return function () {
        setTimeout(() => func.apply(this, arguments), ms);
    }
}

function func() {
    console.log('Функция выполниться с задержкой в 2 секунды!');
}
console.log('Функция');
let paused = pause(func, 2000);
paused();
