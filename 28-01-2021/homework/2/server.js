// 2*. Работа с файлами. Файл "data.txt" заполнен случайными целыми числами,
//     числа разделены одним пробелом.
//     Сформировать файл "out-1.txt" из элементов файла "data.txt", делящихся
// без остатка на 2. Сформировать файл "out-2.txt" из элементов файла "data.txt",
//     возведенных в степень 3. Тестовый набор данных для тестирования можно
// скачать отсюда: https://yadi.sk/d/s7Gz7ypi3XCBXP
//     Для записи текстовых файлов воспользуйтесь функцией
// writeFile описанной в документации:
//     https://nodejs.org/dist/latest-v8.x/docs/api/fs.html#fs_fs_writefile_file_data_options_callback
//         или в русской версии:
//     https://js-node.ru/site/article?id=23#fs_fs_writefile_file_data_options_callback

const fs = require('fs');
const filename = 'data.txt';

fs.readFile(filename, 'utf8', (err, data) => {
    if(err){
        console.log('Could not find or open file for reading \n');
    }else{
        console.log(`The file ${filename} is read \n`);
        let arr = data.split(" ");
        let data1 = arr.filter((item) => {
            return item % 2 === 0;
        }).join(" ");
        let data2 = arr.map((item) => {
            return Math.pow(item, 3);
        }).join(" ")
        fs.writeFile('out-1.txt', data1, () => {
            console.log("ok")
        });
        fs.writeFile('out-2.txt', data2, () => {
            console.log("ok")
        });
    }
})
