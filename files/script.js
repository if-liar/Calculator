
        //ЛОГИКА КАЛЬКУЛЯТОРА

        let res = document.querySelector('.result');
        let res2 = document.querySelector('.result2');
        let operationRemove = document.querySelector('#operationRemove');
        let operationPercent = document.querySelector('#operationPercent');
        let operationDelete = document.querySelector('#operationDelete');
        let operationSign = document.querySelector('#operationSign');

        res.innerHTML = '0';

        //ПЕРЕМЕННЫЕ:
        //eq - в памяти калькулятора нажата одна из кнопок: плюс, минус, умножить, делить; Значение математического знака присвоено переменной symb;
        //eq2 - последняя нажатая кнопка действия это "равно". Кнопка "процент" и кнопка "сменить знак" значение eq2 на противоположное значение не меняют;
        //swP - если последняя нажатая кнопка "процент";
        //a,b,c,d,old - это переменные содержащие в себе числа, над которыми проводятся операции. Такое количество необходимо для корректных вычислений;
        //symb - переменная хранит последний нажатый знак (один из: + - / *)

        let eq, eq2, a, b, c, d, old, symb, swP;
        let numStr = '1234567890';

        document.addEventListener('click', pressNumber)
        document.addEventListener('click', pressSymbol)
        document.addEventListener('click', pressEquals)

        document.addEventListener('keydown', function(event) {})

        //Удалить один символ справа в поле ввода:
        operationDelete.onclick = (event)=>{
            console.log('delete onclick press')
            res.innerHTML = res.innerHTML.slice(0, res.innerHTML.length - 1);
            a = res.innerHTML;
            if (res.innerHTML == '')
                res.innerHTML = 0;
        }

        //Очистить поля, обнулить переменные:
        operationRemove.onclick = (event)=>{
            console.log('remove onclick press')
            res.innerHTML = '0';
            res2.innerHTML = '';
            a = b = c = d = old = symb = eq = eq2 = null;
        }

        //Поменять знак на противолополжный:
        operationSign.onclick = (event)=>{
            console.log('sign onclick press')
            //if (eq) return
            if (res.innerHTML == 0)
                return
            if (res.innerHTML[0] == '-') {
                res.innerHTML = res.innerHTML.slice(1, res.innerHTML.length)

            } else {
                res.innerHTML = '-' + res.innerHTML
            }
            a = res.innerHTML;
            console.log(eq, eq2, a, b, c, d, symb)
        }

        //Расчет процентов:
        operationPercent.onclick = (event)=>{
            console.log('percent onclick press')
            if (res.innerHTML == 'Ошибка')
                return
            swP = true;
            if (a && b) {
                switch (symb) {
                case '+':
                    {
                        a = b / 100 * res.innerHTML;
                        res.innerHTML = (Math.round(a * 1_000_000_000_000) / 1_000_000_000_000);

                    }
                    break;
                case '-':
                    {
                        a = b / 100 * res.innerHTML;
                        res.innerHTML = (Math.round(a * 1_000_000_000_000) / 1_000_000_000_000);
                    }
                    break;
                case '*':
                    {
                        a = 1 / 100 * res.innerHTML;
                        res.innerHTML = (Math.round(a * 1_000_000_000_000) / 1_000_000_000_000);
                    }
                    break;
                case '/':
                    {
                        a = (1 / 100) * res.innerHTML;
                        res.innerHTML = (Math.round(a * 1_000_000_000_000) / 1_000_000_000_000);
                        ;
                    }
                    ;break;
                }
            }
            console.log(eq, eq2, a, b, c, d, symb)
        }

        //Выполнить рассчёт если последовательно нажаты: число, операция, число.
        function calc(sign) {
            console.log('function calc')

            if (res.innerHTML == 'Ошибка')
                return

            old = b;
            b = a;
            a = old;
            old = null;

            switch (sign) {
            case '+':
                c = Math.round((+a + +b) * 1_000_000_000_000) / 1_000_000_000_000
                break;
            case '-':
                c = Math.round((a - b) * 1_000_000_000_000) / 1_000_000_000_000
                break;
            case '*':
                c = Math.round((a * b) * 1_000_000_000_000) / 1_000_000_000_000
                break;
            case '/':
                c = Math.round((a / b) * 1_000_000_000_000) / 1_000_000_000_000
                break;
            }
            if (c == 0)
                c = '0'
            if (c) {
                if (c.toString().length > 10) {
                    let newStr = '';

                    for (let i = 0; i <= 9; i++) {
                        if (i == 9) {
                            newStr += 'e'
                        } else {
                            newStr += c.toString()[i];

                        }
                    }
                    c = newStr;
                }
            }
            if (!(c == 'Infinity')) {
                res.innerHTML = c;

            } else {
                res.innerHTML = 'Ошибка';
                return
            }

            if (Number.isNaN(c)) {
                res.innerHTML = 'Ошибка';
                return
            }

            eq = true;

            if (swP) {
                a = c;
                d = c;
            }

        }

        //Выполнить рассчёт если после знака "равно" опять нажимается знак "равно".
        function calc2(sign) {
            console.log('function calc2')

            if (typeof (c) == 'string' || typeof (d) == 'string')
                return
            if (res.innerHTML == 'Ошибка')
                return

            switch (sign) {
            case '+':
                d = Math.round((+c + +b) * 1_000_000_000_000) / 1_000_000_000_000
                break;
            case '-':
                d = Math.round((c - b) * 1_000_000_000_000) / 1_000_000_000_000
                break;
            case '*':
                d = Math.round((c * b) * 1_000_000_000_000) / 1_000_000_000_000
                break;
            case '/':
                d = Math.round((c / b) * 1_000_000_000_000) / 1_000_000_000_000
                break;
            }

            if (d == 0)
                d = '0'

            c = d;
            a = c;

            if (d.toString().length > 10) {
                let newStr = '';

                for (let i = 0; i <= 9; i++) {
                    if (i == 9) {
                        newStr += 'e'
                    } else {
                        newStr += d.toString()[i];

                    }
                }
                d = newStr;
            }

            res.innerHTML = d;

        }

        //Выполнить рассчёт если последовательно нажаты: число, знак, равно.
        function calc3(sign) {
            console.log('function calc3')

            switch (sign) {
            case '+':
                c = Math.round((+b + +b) * 1_000_000_000_000) / 1_000_000_000_000
                break;
            case '-':
                c = Math.round((b - b) * 1_000_000_000_000) / 1_000_000_000_000
                break;
            case '*':
                c = Math.round((b * b) * 1_000_000_000_000) / 1_000_000_000_000
                break;
            case '/':
                c = Math.round((b / b) * 1_000_000_000_000) / 1_000_000_000_000
                break;
            }
            res2.innerHTML = '';
            a = b;

            if (c == 0) {
                res.innerHTML = '0'
            } else {
                res.innerHTML = c
            }
            ;
        }

        //нажимаем на кнопку "равно".
        function pressEquals(event) {
            console.log('function pressEquals')
            console.log(eq, eq2, a, b, c, d, symb)
            if (res.innerHTML == 'Ошибка')
                return

            let target = event.target;
            if (target.id != 'operationEquals')
                return;

            if (b && eq && !a)
                calc3(symb);

            if (!(a && b))
                return

            if (!eq2) {
                calc(symb);
                res2.innerHTML = ''
            } else {
                calc2(symb)
            }

            eq = true
            eq2 = true
            console.log(eq, eq2, a, b, c, d, symb)

        }

        //Нажимаем на кнопки: плюс, минус, умножить, делить.
        function pressSymbol(event) {
            console.log('function pressSymbol')
            if (res.innerHTML == 'Ошибка')
                return
            let target = event.target;
            if (!(target.id.indexOf('symb') != -1))
                return;
            if (c && c.toString(10).at(-1) == 'e')
                return
            if (d && d.toString(10).at(-1) == 'e')
                return

            if (res.innerHTML.at(-1) == '.') {
                res.innerHTML = res.innerHTML.slice(0, res.innerHTML.length - 1)
                a = res.innerHTML;
            }

            if (a && b) {

                if (!eq2) {
                    calc(symb)
                    //в этом условии не будет проверки знака
                } else {
                    b = res.innerHTML;
                    //в этом условии не будет проверки знака
                }

                res2.innerHTML += b;
                b = c;

                a = null;

                //в этом условии не будет проверки знака
            } else {

                b = res.innerHTML;
                if (res2.innerHTML == '') {
                    //если там ещё пусто добавить число
                    res2.innerHTML += b;

                } else if (numStr.indexOf(res2.innerHTML.at(-1)) != -1) {
                    //если там число, то добавим знак
                    symb = target.innerHTML;
                    res2.innerHTML += symb;
                } else {
                    //если там знак, то заменим знак

                    let x = res2.innerHTML.slice(0, (res2.innerHTML.length - 1));
                    res2.innerHTML = x;
                    symb = target.innerHTML;
                    res2.innerHTML += symb;
                }

            }

            a = null

            if (numStr.indexOf(res2.innerHTML.at(-1)) == -1) {// если там знак ничего не делаем
            } else {
                symb = target.innerHTML;
                res2.innerHTML += symb;
            }
            eq = true;
            eq2 = false;
            console.log(eq, eq2, a, b, c, d, symb)
        }

        //нажимаем на любую цифру или на знак "точка"
        function pressNumber(event) {
            console.log('function pressNumber')
            if (res.innerHTML == 'Ошибка')
                return
            let target = event.target;
            if ((!(target.id.indexOf('num') != -1)) || (res.innerHTML.length >= 10))
                return;

            if ((res.innerHTML.indexOf('.') != -1) && (target.id.indexOf('Dot') != -1))
                return
            if ((target.id.indexOf('Dot') != -1) && (eq2)) {
                eq = false;
                eq2 = false;
                res.innerHTML = '0.'
                a = res.innerHTML;
                b = c = d = null;
                console.log(eq, eq2, a, b, c, d, symb)
            }

            if ((target.id.indexOf('Dot') != -1) && (eq))
                return

            let num = target.innerHTML;

            if (res.innerHTML == 0) {
                //если нажали точку, когда в главном поле цифра 0
                if ((target.id.indexOf('Dot') != -1)) {
                    res.innerHTML = 0;
                    res.innerHTML += num;
                    a = res.innerHTML;

                } else {
                    //если нажали любую цифру, когда в главном поле цифра 0
                    if (res.innerHTML.at(-1) == '.') {
                        //если в главном поле последний символ точка
                        res.innerHTML += +num;
                        a = res.innerHTML;
                    } else {
                        res.innerHTML = '';
                        res.innerHTML = num;
                        a = res.innerHTML;
                    }

                }
            } else {

                if (eq) {
                    res.innerHTML = '';
                    res.innerHTML = num;
                    a = res.innerHTML;
                    eq = false;

                } else {

                    res.innerHTML += num;
                    a = res.innerHTML;

                }
            }
            ;eq2 = false
            console.log(eq, eq2, a, b, c, d, symb)
        }

        //ПОЗИЦИОНИРОВАНИЕ И ПЕРЕТАСКИВАНИЕ

        document.addEventListener('mousedown', mouseDown);

        //зажали лкм на корпусе калькялтора
        function mouseDown(event) {

            if (!(event.target.className == 'calculator'))
                return

            elem = event.target;

            elem.ondragstart = function() {
                return false
            }

            event.preventDefault();
            elem.style.position = 'absolute';
            elem.style.zIndex = 1000;

            let shiftX = event.clientX - elem.getBoundingClientRect().left - window.pageXOffset;
            let shiftY = event.clientY - elem.getBoundingClientRect().top - window.pageYOffset;

            document.addEventListener('mousemove', move);
            document.addEventListener('mouseup', stopMove);

            //перемещаем калькулятор, зажата лкм
            function move(event) {
                //координаты для дальнейшего ограничения перемещения карточки рамками документа
                let elemCoord = {
                    left: event.clientX - shiftX,
                    top: event.clientY - shiftY
                }

                //ограничиваю пермещение слева
                if (elemCoord.left < 0)
                    elemCoord.left = 0;

                //ограничиваю пермещение справа
                if (elemCoord.left > (document.documentElement.clientWidth - elem.clientWidth + window.pageXOffset)) {
                    elemCoord.left = document.documentElement.clientWidth - elem.clientWidth + window.pageXOffset
                }
                ;//сверху
                if (elemCoord.top < 0)
                    elemCoord.top = 0;

                //снизу
                if (elemCoord.top > (document.documentElement.clientHeight - elem.clientHeight + window.pageYOffset)) {
                    elemCoord.top = document.documentElement.clientHeight - elem.clientHeight + window.pageYOffset
                }
                ;elem.style.left = elemCoord.left + 'px';
                elem.style.top = elemCoord.top + 'px';

            }
            //Остановить перемещение, отпустили лкм
            function stopMove(event) {
                //elem = event.target;
                //elem.style.position='absolute';

                document.removeEventListener('mousemove', move);

                document.removeEventListener('mouseup', stopMove);

            }

        }