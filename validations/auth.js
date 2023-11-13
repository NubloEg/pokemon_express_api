import {body} from "express-validator"

export const registerValidation=[
    body('email',"Неверный email").isEmail(),
    body('password',"Пароль меньше 5 символов").isLength({min:5}),
    body('fullName',"Имя меньше 3 символов").isLength({min:3}),
    body('avatarUrl',"Некорректный URL").optional().isURL(),   
];