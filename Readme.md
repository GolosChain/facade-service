# FACADE-SERVICE
  
**FACADE-SERVICE** является микросервисом роутинга запросов между фронтендом и микросервисами [golos.io](https://golos.io).
Для работы сервису необходим совместимый фронтенд-гейт, осуществляющий конечное общение с фронтендом и авторизацию входящих запросов.

##### API JSON-RPC
Общий формат всех входящих запросов должен соответствовать .....

```
 //
```

Детальное описание:

```
 offline:                  // Оповещает все заинтересованные сервисы о том что пользователь офлайн
     user <string>         // Имя пользователя
     channelId <string>    // Идентификатор канала передачи данных
             
     
 getOptions:               // Запрос на получение настрек пользователя
                           // Автоматически создает дефолтные настройки при первом запросе
     user <string>         // Имя пользователя
     params:               // Параметры запроса из гейта
         profile <string>  // Идентификатор профиля пользователя
     
 setOptions:               // Запрос на установку настроек пользователя
     user <string>         // Имя пользователя
     params:               // Параметры запроса из гейта
         profile <string>  // Идентификатор профиля пользователя
         basic <object>    //
         notify <object>   //
         push <object>     //
         mail <object>     //
     
 onlineNotifyOn:                // Подписывает на онлайн оповещения для пользователя
     user <string>              // Имя пользователя
     channelId <string>         // Идентификатор канала передачи данных
     requestId <number|string>  //
     
 onlineNotifyOff:               // Отписывает от онлайн оповещений для пользователя
     user <string>              // Имя пользователя
     channelId <string>         // Идентификатор канала передачи данных
     
 pushNotifyOn:                  // Подписывает на push-оповещения для пользователя по профилю
     user <string>              // Имя пользователя
     params:                    // Параметры запроса из гейта
         profile <string>       // Идентификатор профиля пользователя
         deviceType <string>    // Тип устройства
     
 getNotifyHistory:                     // Получение истории нотификаций
     user <string>                     // Имя пользователя
     params:                           // Параметры запроса из гейта
         fromId <string|null>(null)    // ID с которого нужно начать показывать историю, опционально
         limit <number>                // 
         types                         //
         markAsViewed <boolean>(true)  // Пометить ли все выгруженные записи как прочитанные
     
 getNotifyHistoryFresh:      // Получение количества непрочитанных нотификаций
     user <string>           // Имя пользователя
                         
 notify. // --- Ветка работы с нотификациями ---                      
                         
 notify.markAsViewed:        // Пометить указанные нотификации как прочитанные
     user <string>           // Имя пользователя
     params:                 // Параметры запроса из гейта
         ids <string[]>      // Список идентификаторов для пометки
     
 notify.markAllAsViewed:     // Пометить все нотификации как прочитанные
     user <string>           // Имя пользователя
     
 getFavorites:               // Получить избранные посты пользователя
     user <string>           // Имя пользователя
     
 addFavorite:                // Добавить пост в избранные
     user <string>           // Имя пользователя
     params:                 // Параметры запроса из гейта
         permlink <string>   // Пермлинк поста
     
 removeFavorite:             // Удалить пост из избранных
     user <string>           // Имя пользователя
     params:                 // Параметры запроса из гейта
         permlink <string>   // Пермлинк поста
```

Апи, доступное без авторизации:

```
 registration. // --- Ветка работы с регистрацией ---    
     
 registration.getState:      // Получить текущее состояние регистрации
     params:                 // Параметры запроса из гейта
         user                // Имя пользователя
   
 registration.firstStep:     // Сделать первый шаг регистрации
     params:                 // Параметры запроса из гейта
         captcha? <string>   // Верификационный код капчи (если не отключена)
         user <string>       // Имя пользователя
         phone <string>      // Телефон пользователя
         mail <string>       // Почта пользователя
     
 registration.verify:        // Сделать верификацию регистрации (кроме стратегии smsFromUser)
     params:                 // Параметры запроса из гейта
         user <sting>        // Имя пользователя
         code? <string>      // Код из смс (стратегия smsToUser)
     
 registration.toBlockChain:  // Зарегистрировать пользователя в блокчейн
     params:                 // Параметры запроса из гейта
         user <string>       // Имя пользователя
         owner <string>      // Ключ владельца
         active <string>     // Активный ключ
         posting <string>    // Постинг ключ
         memo <string>       // Мемо ключ (ключ заметок)
 
 registration.changePhone:   // Сменить номер телефона (стратегия smsFromUser, smsToUser)
     params:                 // Параметры запроса из гейта
         user <string>       // Имя пользователя
         phone <string>      // Телефон пользователя
    
 registration.resendSmsCode:      // Переотправить код на телефон пользователя (стратегия smsToUser)
     params:                      // Параметры запроса из гейта
         user <string>            // Имя пользователя
         phone <string>           // Телефон пользователя
     
 registration.subscribeOnSmsGet:  // Подписаться на получение смс от пользователя (стратегия smsFromUser)
     channelId <string>           // Идентификатор канала передачи данных
     params:                      // Параметры запроса из гейта
         user <string>            // Имя пользователя
         phone <string>           // Телефон пользователя
 
 rates. // --- Ветка работы с курсами обмена ---
        
 rates.getActual:             // Получить актуальные курсы обмена
      <empty>                 // Без параметров
 
 rates.getHistorical:         // Получить историю курсов обмена
     params:                  // Параметры запроса из гейта
         date <timestamp>     // Необходимая дата
                   
 rates.getHistoricalMulti:    // Получить историю курсов обмена для нескольких дат
     params:                  // Параметры запроса из гейта
         dates <timestamp[]>  // Массив необходимых дат
```

Апи для обращения из внутренних микросервисов:

```
 transfer:                     // Переправить данные пользователю в виде JSON-RPC нотификации
     channelId <string>        // Идентификатор канала передачи данных
     method <string>           // Имя RPC метода
     error <object|null>       // Объект ошибки (нет если есть result)
     result <object|null>      // Объект данных (нет если есть error)
     _frontendGate? <boolean>  // Флаг того что запрос был отправлен из гейта
                               // В случае true - запрос будет заблокирован
```

### Переменные окружения

Возможные переменные окружения `ENV`:

  - `GLS_FRONTEND_GATE_CONNECT` *(обязательно)* - адрес подключения к микросервису фронтенд-гейту.

  - `GLS_ONLINE_NOTIFY_CONNECT` *(обязательно)* - адрес подключения к микросервису онлайн нотификаций.

  - `GLS_NOTIFY_CONNECT` *(обязательно)* - адрес подключения к микросервису регистрации нотификаций.

  - `GLS_OPTIONS_CONNECT` *(обязательно)* - адрес подключения к микросервису настроек.

  - `GLS_PUSH_CONNECT` *(обязательно)* - адрес подключения к микросервису рассылки push-уведомлений.

  - `GLS_MAIL_CONNECT` *(обязательно)* - адрес подключения к микросервису рассылки писем.
  
  - `GLS_REGISTRATION_CONNECT` *(обязательно)* - адрес подключения к микросервису регистрации пользователей.

  - `GLS_RATES_CONNECT` *(обязательно)* - адрес подключения к микросервису хранящему курсы валют.

  - `GLS_GATE_HOST` *(обязательно)* - адрес, который будет использован для входящих подключений связи микросервисов.  
   Дефолтное значение при запуске без докера - `127.0.0.1`
    
  - `GLS_GATE_PORT` *(обязательно)* - адрес порта, который будет использован для входящих подключений связи микросервисов.  
   Дефолтное значение при запуске без докера - `8080`, пересекается с `GLS_FRONTEND_GATE_PORT`
    
  - `GLS_METRICS_HOST` *(обязательно)* - адрес хоста для метрик StatsD.  
   Дефолтное значение при запуске без докера - `127.0.0.1`
          
  - `GLS_METRICS_PORT` *(обязательно)* - адрес порта для метрик StatsD.  
   Дефолтное значение при запуске без докера - `8125`
    
  - `GLS_MONGO_CONNECT` - строка подключения к базе MongoDB.  
   Дефолтное значение - `mongodb://mongo/admin`
    
  - `GLS_DAY_START` - время начала нового дня в часах относительно UTC.
   Дефолтное значение - `3` (день начинается в 00:00 по Москве).
   
### Запуск

Для запуска достаточно вызвать команду `docker-compose up` в корне проекта, предварительно указав необходимые `ENV` переменные.    
