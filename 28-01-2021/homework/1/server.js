// 1*. Генератор случайных паролей. Требуется реализовать генератор
// (function*) случайных паролей указанной длины. В пароле можно
// использовать любые символы в верхнем и нижнем регистре.
//     Например: password_generator(16), вернет случайный пароль
// длиной 16 символов.

function* gen(n){

    let pass = '';
    while (pass.length < n){
        pass += String.fromCharCode(Math.floor(Math.random() * 40) + 60);
    }
    return yield pass;

}
function password_generator_dec(){
    return function (n){
        let result = gen(n).next().value;
        return result;
    }
}

let password_generator = password_generator_dec();
console.log(password_generator(60));
