# BLUEPRINT

Cервіс для оцінювання успішності проектів. Проекти можуть бути як з гіт репозиторію, так і звичайними файлами. На сервісі можна переглядати опис проекту, його прогрес та критерії оцінювання, створені власником проекту.

## Як запустити проект

Для запуску бекенду використовуйте команду:

```bash
go run main.go
```

Для запуску фронтенду використовуйте команду:

```bash
npm run dev
```


## Що я встиг зробити

1. Авторизація та аутентифікація через next-auth
2. Реалізовано можливість авторизації та аутентифікації користувачів через бібліотеку next-auth, включаючи входи через GitHub.
3. Бекенд ендпоїнти: 
   1. Отримання одного проекту,
   2. Отримання всіх публічних проектів
   3. Отримання проектів тільки за окремим користувачем
   4. Створення користувача після реєстрації
4. Сторінки та загальна розмітка
5. Реалізовано сторінки для відображення контенту проекту та профілю користувача.
6. Створено загальну розмітку з декомпозованими елементами сайту.
7. Кастомні хуки


## Що ж не встиг до 03.06.2024 (достатньо)
1. Підключити REST API GitHub
2. Редагування користувача та відповідний бекенд ендпоїнт для цього.
3. Форма створення проекту та відповідний бекенд ендпоїнт для цього.
4. Редагування проекту власником проекту та відповідний бекенд ендпоїнт для цього.
5. Зробити приклад використання цього сервісу на прикладі репозиторію цього ж сервісу.

[Мої калякулі](https://excalidraw.com/#json=fDqVw199y2NrinonvLvUX,1fP3vBdPk5LxmHCEMpNYZw)
