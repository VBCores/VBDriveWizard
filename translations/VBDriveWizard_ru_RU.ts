<?xml version='1.0' encoding='utf-8'?>
<TS version="2.1" language="ru_RU">
<context>
    <name>CanInterfaceList</name>
    <message>
        <source>No CAN interface selected.</source>
        <translation>CAN-интерфейс не выбран.</translation>
    </message>
    <message>
        <source>Interface %1 is down. Bring it up, for example:
  sudo ip link set %1 up type can bitrate 500000 dbitrate 2000000 fd on</source>
        <translation>Интерфейс %1 выключен. Включите его, например:
  sudo ip link set %1 up type can bitrate 500000 dbitrate 2000000 fd on</translation>
    </message>
    <message>
        <source>Interface %1 is not running in CAN FD mode (MTU %2, expected %3).
VBDrive uses Cyphal over CAN FD, so an FD-capable adapter is required.</source>
        <translation>Интерфейс %1 работает не в режиме CAN FD (MTU %2, ожидается %3).
VBDrive использует Cyphal поверх CAN FD, поэтому нужен адаптер с поддержкой FD.</translation>
    </message>
</context>
<context>
    <name>ConfigManager</name>
    <message>
        <source>Cannot write %1: %2</source>
        <translation>Не удалось записать %1: %2</translation>
    </message>
    <message>
        <source>Settings loaded.</source>
        <translation>Настройки загружены.</translation>
    </message>
    <message>
        <source>No settings file found; defaults are in use.</source>
        <translation>Файл настроек не найден; используются значения по умолчанию.</translation>
    </message>
    <message>
        <source>Settings file could not be read; defaults are in use.</source>
        <translation>Не удалось прочитать файл настроек; используются значения по умолчанию.</translation>
    </message>
</context>
<context>
    <name>CyphalBridge</name>
    <message>
        <source>The Cyphal stack reported an internal error.</source>
        <translation>Внутренняя ошибка стека Cyphal.</translation>
    </message>
    <message>
        <source>Could not open CAN interface %1.</source>
        <translation>Не удалось открыть CAN-интерфейс %1.</translation>
    </message>
</context>
<context>
    <name>CyphalService</name>
    <message>
        <source>The CAN connection was closed.</source>
        <translation>CAN-соединение закрыто.</translation>
    </message>
    <message>
        <source>No VBDrive answered on %1 within %2 seconds.</source>
        <translation>За %2 с на интерфейсе %1 не ответил ни один привод VBDrive.</translation>
    </message>
    <message numerus="yes">
        <source>Found %n drive(s) on %1.</source>
        <translation><numerusform>Найден %n привод на %1.</numerusform><numerusform>Найдено %n привода на %1.</numerusform><numerusform>Найдено %n приводов на %1.</numerusform></translation>
    </message>
    <message>
        <source>The drive stopped answering.</source>
        <translation>Привод перестал отвечать.</translation>
    </message>
    <message>
        <source>The drive did not answer register '%1' in time.</source>
        <translation>Привод не ответил на регистр «%1» за отведённое время.</translation>
    </message>
    <message>
        <source>Could not send the request.</source>
        <translation>Не удалось отправить запрос.</translation>
    </message>
    <message>
        <source>The drive did not accept the value.</source>
        <translation>Привод не принял значение.</translation>
    </message>
    <message>
        <source>Register '%1' is read-only.</source>
        <translation>Регистр «%1» доступен только для чтения.</translation>
    </message>
    <message>
        <source>Register '%1' is not available on this drive.</source>
        <translation>Регистр «%1» недоступен на этом приводе.</translation>
    </message>
    <message>
        <source>These registers were rejected by the drive: %1</source>
        <translation>Привод отклонил запись регистров: %1</translation>
    </message>
</context>
<context>
    <name>DeviceModel</name>
    <message>
        <source>Unknown drive</source>
        <translation>Неизвестный привод</translation>
    </message>
</context>
<context>
    <name>FirmwareDownloader</name>
    <message>
        <source>A firmware download is already running.</source>
        <translation>Загрузка прошивки уже выполняется.</translation>
    </message>
    <message>
        <source>Looking up the latest release...</source>
        <translation>Поиск последнего релиза...</translation>
    </message>
    <message>
        <source>Could not reach the VBDrive releases: %1</source>
        <translation>Не удалось получить список релизов VBDrive: %1</translation>
    </message>
    <message>
        <source>Release %1 does not contain %2.</source>
        <translation>Релиз %1 не содержит %2.</translation>
    </message>
    <message>
        <source>(unknown)</source>
        <translation>(неизвестно)</translation>
    </message>
    <message>
        <source>Downloading %1...</source>
        <translation>Загрузка %1...</translation>
    </message>
    <message>
        <source>Firmware download failed: %1</source>
        <translation>Не удалось загрузить прошивку: %1</translation>
    </message>
    <message>
        <source>Could not write %1: %2</source>
        <translation>Не удалось записать %1: %2</translation>
    </message>
    <message>
        <source>Download complete.</source>
        <translation>Загрузка завершена.</translation>
    </message>
</context>
<context>
    <name>FirmwareFlasher</name>
    <message>
        <source>A flashing operation is already running.</source>
        <translation>Прошивка уже выполняется.</translation>
    </message>
    <message>
        <source>Firmware file not found: %1</source>
        <translation>Файл прошивки не найден: %1</translation>
    </message>
    <message>
        <source>openocd was not found. Install it, for example:
  sudo apt install openocd</source>
        <translation>openocd не найден. Установите его, например:
  sudo apt install openocd</translation>
    </message>
    <message>
        <source>openocd could not be started.</source>
        <translation>Не удалось запустить openocd.</translation>
    </message>
    <message>
        <source>Done.</source>
        <translation>Готово.</translation>
    </message>
    <message>
        <source>Firmware written and verified.</source>
        <translation>Прошивка записана и проверена.</translation>
    </message>
    <message>
        <source>openocd exited with code %1.

%2</source>
        <translation>openocd завершился с кодом %1.

%2</translation>
    </message>
    <message>
        <source>Starting openocd...</source>
        <translation>Запуск openocd...</translation>
    </message>
</context>
<context>
    <name>MainWindow</name>
    <message>
        <source>VBDrive Wizard</source>
        <translation>VBDrive Wizard</translation>
    </message>
    <message>
        <source>CONNECTION</source>
        <translation>ПОДКЛЮЧЕНИЕ</translation>
    </message>
    <message>
        <source>Serial</source>
        <translation>Serial</translation>
    </message>
    <message>
        <source>Connect</source>
        <translation>Подключить</translation>
    </message>
    <message>
        <source>Refresh</source>
        <translation>Обновить</translation>
    </message>
    <message>
        <source>CAN</source>
        <translation>CAN</translation>
    </message>
    <message>
        <source>DEVICES</source>
        <translation>УСТРОЙСТВА</translation>
    </message>
    <message>
        <source>CONFIGURATION</source>
        <translation>КОНФИГУРАЦИЯ</translation>
    </message>
    <message>
        <source>Basic</source>
        <translation>Основные</translation>
    </message>
    <message>
        <source>Limits</source>
        <translation>Ограничения</translation>
    </message>
    <message>
        <source>Angle</source>
        <translation>Угол</translation>
    </message>
    <message>
        <source>min:</source>
        <translation>мин:</translation>
    </message>
    <message>
        <source>max</source>
        <translation>макс</translation>
    </message>
    <message>
        <source>Velocity</source>
        <translation>Скорость</translation>
    </message>
    <message>
        <source>Torque</source>
        <translation>Момент</translation>
    </message>
    <message>
        <source>Voltage</source>
        <translation>Напряжение</translation>
    </message>
    <message>
        <source>The firmware exposes no voltage limit register yet.</source>
        <translation>В прошивке пока нет регистра ограничения напряжения.</translation>
    </message>
    <message>
        <source>Current</source>
        <translation>Ток</translation>
    </message>
    <message>
        <source>Direction</source>
        <translation>Направление</translation>
    </message>
    <message>
        <source>CCW</source>
        <translation>Против часовой</translation>
    </message>
    <message>
        <source>CW</source>
        <translation>По часовой</translation>
    </message>
    <message>
        <source>Data Baud Rate</source>
        <translation>Скорость data-сегмента</translation>
    </message>
    <message>
        <source>Node ID</source>
        <translation>Node ID</translation>
    </message>
    <message>
        <source>62.5 kHz</source>
        <translation>62.5 kHz</translation>
    </message>
    <message>
        <source>125 kHz</source>
        <translation>125 kHz</translation>
    </message>
    <message>
        <source>250 kHz</source>
        <translation>250 kHz</translation>
    </message>
    <message>
        <source>500 kHz</source>
        <translation>500 kHz</translation>
    </message>
    <message>
        <source>1 MHz</source>
        <translation>1 MHz</translation>
    </message>
    <message>
        <source>2 MHz</source>
        <translation>2 MHz</translation>
    </message>
    <message>
        <source>4 MHz</source>
        <translation>4 MHz</translation>
    </message>
    <message>
        <source>8 MHz</source>
        <translation>8 MHz</translation>
    </message>
    <message>
        <source>Nominal Baud Rate</source>
        <translation>Номинальная скорость</translation>
    </message>
    <message>
        <source>Advanced</source>
        <translation>Расширенные</translation>
    </message>
    <message>
        <source>Gear Ratio</source>
        <translation>Передаточное число</translation>
    </message>
    <message>
        <source>Encoder</source>
        <translation>Энкодер</translation>
    </message>
    <message>
        <source>Torque const</source>
        <translation>Константа момента</translation>
    </message>
    <message>
        <source>Current Kp</source>
        <translation>Kp тока</translation>
    </message>
    <message>
        <source>Current Ki</source>
        <translation>Ki тока</translation>
    </message>
    <message>
        <source>Position Offset</source>
        <translation>Смещение положения</translation>
    </message>
    <message>
        <source>Main Filter Param A</source>
        <translation>Параметр A основного фильтра</translation>
    </message>
    <message>
        <source>Filter Gain 1</source>
        <translation>Коэффициент фильтра 1</translation>
    </message>
    <message>
        <source>Filter Gain 2</source>
        <translation>Коэффициент фильтра 2</translation>
    </message>
    <message>
        <source>Filter Gain 3</source>
        <translation>Коэффициент фильтра 3</translation>
    </message>
    <message>
        <source>Current LPF Gain</source>
        <translation>Коэффициент ФНЧ тока</translation>
    </message>
    <message>
        <source>rotor</source>
        <translation>ротор</translation>
    </message>
    <message>
        <source>shaft</source>
        <translation>вал</translation>
    </message>
    <message>
        <source>external</source>
        <translation>внешний</translation>
    </message>
    <message>
        <source>Current Kd</source>
        <translation>Kd тока</translation>
    </message>
    <message>
        <source>System</source>
        <translation>Система</translation>
    </message>
    <message>
        <source>Sensor</source>
        <translation>Датчик</translation>
    </message>
    <message>
        <source>Calibrate</source>
        <translation>Калибровать</translation>
    </message>
    <message>
        <source>Register Parameters</source>
        <translation>Параметры регистров</translation>
    </message>
    <message>
        <source>Save to File...</source>
        <translation>Сохранить в файл...</translation>
    </message>
    <message>
        <source>Load from File...</source>
        <translation>Загрузить из файла...</translation>
    </message>
    <message>
        <source>Restore to Default</source>
        <translation>Значения по умолчанию</translation>
    </message>
    <message>
        <source>Firmware</source>
        <translation>Прошивка</translation>
    </message>
    <message>
        <source>Current Version:</source>
        <translation>Текущая версия:</translation>
    </message>
    <message>
        <source>0.0.1</source>
        <translation>0.0.1</translation>
    </message>
    <message>
        <source>Choose file</source>
        <translation>Выбрать файл</translation>
    </message>
    <message>
        <source>Open</source>
        <translation>Открыть</translation>
    </message>
    <message>
        <source>Download from remote repo</source>
        <translation>Скачать из репозитория</translation>
    </message>
    <message>
        <source>Flash</source>
        <translation>Прошить</translation>
    </message>
    <message>
        <source>Read</source>
        <translation>Прочитать</translation>
    </message>
    <message>
        <source>Write</source>
        <translation>Записать</translation>
    </message>
    <message>
        <source>Set Origin</source>
        <translation>Задать ноль</translation>
    </message>
    <message>
        <source>&lt;html&gt;&lt;head/&gt;&lt;body&gt;&lt;p align="center"&gt;Logo&lt;/p&gt;&lt;/body&gt;&lt;/html&gt;</source>
        <translation>&lt;html&gt;&lt;head/&gt;&lt;body&gt;&lt;p align="center"&gt;Logo&lt;/p&gt;&lt;/body&gt;&lt;/html&gt;</translation>
    </message>
    <message>
        <source>REALTIME DATA</source>
        <translation>ДАННЫЕ В РЕАЛЬНОМ ВРЕМЕНИ</translation>
    </message>
    <message>
        <source>Signal:</source>
        <translation>Сигнал:</translation>
    </message>
    <message>
        <source>Position</source>
        <translation>Положение</translation>
    </message>
    <message>
        <source>Temperature</source>
        <translation>Температура</translation>
    </message>
    <message>
        <source>Log</source>
        <translation>Журнал</translation>
    </message>
    <message>
        <source>Units:</source>
        <translation>Единицы:</translation>
    </message>
    <message>
        <source>rad</source>
        <translation>rad</translation>
    </message>
    <message>
        <source>deg</source>
        <translation>deg</translation>
    </message>
    <message>
        <source>Preferences</source>
        <translation>Настройки</translation>
    </message>
    <message>
        <source>Language:</source>
        <translation>Язык:</translation>
    </message>
    <message>
        <source>English</source>
        <translation>English</translation>
    </message>
    <message>
        <source>Русский</source>
        <translation>Русский</translation>
    </message>
    <message>
        <source>中文</source>
        <translation>中文</translation>
    </message>
    <message>
        <source>Pause</source>
        <translation>Пауза</translation>
    </message>
    <message>
        <source>Save as CSV...</source>
        <translation>Сохранить в CSV...</translation>
    </message>
    <message>
        <source>Save as PNG...</source>
        <translation>Сохранить в PNG...</translation>
    </message>
    <message>
        <source>CONTROL</source>
        <translation>УПРАВЛЕНИЕ</translation>
    </message>
    <message>
        <source>Servo</source>
        <translation>Servo</translation>
    </message>
    <message>
        <source>Control Type</source>
        <translation>Тип управления</translation>
    </message>
    <message>
        <source>Transient Form</source>
        <translation>Переходный процесс</translation>
    </message>
    <message>
        <source>Linear</source>
        <translation>Линейный</translation>
    </message>
    <message>
        <source>Polynomial</source>
        <translation>Полиномиальный</translation>
    </message>
    <message>
        <source>Set</source>
        <translation>Задать</translation>
    </message>
    <message>
        <source>Feedback Gains</source>
        <translation>Коэффициенты регулятора</translation>
    </message>
    <message>
        <source>Kp:</source>
        <translation>Kp:</translation>
    </message>
    <message>
        <source>Ki:</source>
        <translation>Ki:</translation>
    </message>
    <message>
        <source>Kd:</source>
        <translation>Kd:</translation>
    </message>
    <message>
        <source>User</source>
        <translation>Вручную</translation>
    </message>
    <message>
        <source>Target position:</source>
        <translation>Заданное положение:</translation>
    </message>
    <message>
        <source>Start</source>
        <translation>Пуск</translation>
    </message>
    <message>
        <source>Sin</source>
        <translation>Синус</translation>
    </message>
    <message>
        <source>Amplitude</source>
        <translation>Амплитуда</translation>
    </message>
    <message>
        <source>Frequency</source>
        <translation>Частота</translation>
    </message>
    <message>
        <source>Meander</source>
        <translation>Меандр</translation>
    </message>
    <message>
        <source>Triangle</source>
        <translation>Треугольник</translation>
    </message>
    <message>
        <source>MIT</source>
        <translation>MIT</translation>
    </message>
    <message>
        <source>Trajectory</source>
        <translation>Траектория</translation>
    </message>
    <message>
        <source>Step</source>
        <translation>Ступенька</translation>
    </message>
    <message>
        <source>Step Targets</source>
        <translation>Параметры ступеньки</translation>
    </message>
    <message>
        <source>Kp</source>
        <translation>Kp</translation>
    </message>
    <message>
        <source>Kd</source>
        <translation>Kd</translation>
    </message>
    <message>
        <source>Trajectory Targets</source>
        <translation>Параметры траектории</translation>
    </message>
    <message>
        <source>+derivative</source>
        <translation>+производная</translation>
    </message>
    <message>
        <source>STATUS</source>
        <translation>СОСТОЯНИЕ</translation>
    </message>
    <message>
        <source>Model</source>
        <translation>Модель</translation>
    </message>
    <message>
        <source>M4310R10</source>
        <translation>M4310R10</translation>
    </message>
    <message>
        <source>Temperature MCU</source>
        <translation>Температура МК</translation>
    </message>
    <message>
        <source>TextLabel</source>
        <translation>TextLabel</translation>
    </message>
    <message>
        <source>C</source>
        <translation>C</translation>
    </message>
    <message>
        <source>Temperature Stator</source>
        <translation>Температура статора</translation>
    </message>
    <message>
        <source>Bus Voltage</source>
        <translation>Напряжение шины</translation>
    </message>
    <message>
        <source>V</source>
        <translation>V</translation>
    </message>
    <message>
        <source>Motor Encoder</source>
        <translation>Энкодер ротора</translation>
    </message>
    <message>
        <source>-</source>
        <translation>-</translation>
    </message>
    <message>
        <source>Shaft Encoder</source>
        <translation>Энкодер вала</translation>
    </message>
    <message>
        <source>Fault</source>
        <translation>Ошибка</translation>
    </message>
    <message>
        <source>STOP</source>
        <translation>СТОП</translation>
    </message>
    <message>
        <source>Connection failed</source>
        <translation>Не удалось подключиться</translation>
    </message>
    <message>
        <source>Firmware download failed</source>
        <translation>Не удалось загрузить прошивку</translation>
    </message>
    <message>
        <source>Downloaded firmware %1.</source>
        <translation>Прошивка %1 загружена.</translation>
    </message>
    <message>
        <source>Flashing failed</source>
        <translation>Не удалось прошить</translation>
    </message>
    <message>
        <source>Disconnect</source>
        <translation>Отключить</translation>
    </message>
    <message>
        <source>Resume</source>
        <translation>Продолжить</translation>
    </message>
    <message>
        <source>Not connected</source>
        <translation>Не подключено</translation>
    </message>
    <message>
        <source>Unsaved changes</source>
        <translation>Несохранённые изменения</translation>
    </message>
    <message>
        <source>Some register changes have not been written to the drive.
Close anyway?</source>
        <translation>Часть изменений регистров не записана в привод.
Всё равно закрыть?</translation>
    </message>
    <message>
        <source>%1 (unavailable)</source>
        <translation>%1 (недоступен)</translation>
    </message>
    <message>
        <source>No serial port selected.</source>
        <translation>Serial-порт не выбран.</translation>
    </message>
    <message>
        <source>Opening %1...</source>
        <translation>Открытие %1...</translation>
    </message>
    <message>
        <source>Listening for drives on %1...</source>
        <translation>Поиск приводов на %1...</translation>
    </message>
    <message>
        <source>Serial connected</source>
        <translation>Serial подключён</translation>
    </message>
    <message>
        <source>CAN connected</source>
        <translation>CAN подключён</translation>
    </message>
    <message>
        <source>Disconnected.</source>
        <translation>Отключено.</translation>
    </message>
    <message>
        <source>Sort by model</source>
        <translation>Сортировать по модели</translation>
    </message>
    <message>
        <source>Sort by Node ID</source>
        <translation>Сортировать по Node ID</translation>
    </message>
    <message>
        <source>  (no heartbeat)</source>
        <translation>  (нет heartbeat)</translation>
    </message>
    <message>
        <source>Drive %1 has register changes that were not written.
Write them before switching?</source>
        <translation>У привода %1 есть незаписанные изменения регистров.
Записать их перед переключением?</translation>
    </message>
    <message>
        <source>Reading registers...</source>
        <translation>Чтение регистров...</translation>
    </message>
    <message>
        <source>No changes to write.</source>
        <translation>Нет изменений для записи.</translation>
    </message>
    <message numerus="yes">
        <source>Writing %n register(s)...</source>
        <translation><numerusform>Запись %n регистра...</numerusform><numerusform>Запись %n регистров...</numerusform><numerusform>Запись %n регистров...</numerusform></translation>
    </message>
    <message>
        <source>Origin set; angle offset is now %1.</source>
        <translation>Ноль задан; смещение угла теперь %1.</translation>
    </message>
    <message>
        <source>Calibrate sensor</source>
        <translation>Калибровка датчика</translation>
    </message>
    <message>
        <source>Calibration moves the motor and cannot be cancelled. The drive stops answering until it finishes.

Start calibration?</source>
        <translation>Калибровка вращает двигатель и не может быть прервана. Привод не отвечает до её завершения.

Начать калибровку?</translation>
    </message>
    <message>
        <source>Calibration started; the drive will not answer until it is done.</source>
        <translation>Калибровка запущена; привод не будет отвечать до её окончания.</translation>
    </message>
    <message>
        <source>Save register profile</source>
        <translation>Сохранить профиль регистров</translation>
    </message>
    <message>
        <source>YAML files (*.yaml *.yml)</source>
        <translation>Файлы YAML (*.yaml *.yml)</translation>
    </message>
    <message>
        <source>Could not save the profile</source>
        <translation>Не удалось сохранить профиль</translation>
    </message>
    <message>
        <source>Profile saved to %1.</source>
        <translation>Профиль сохранён в %1.</translation>
    </message>
    <message>
        <source>Load register profile</source>
        <translation>Загрузить профиль регистров</translation>
    </message>
    <message>
        <source>Could not load the profile</source>
        <translation>Не удалось загрузить профиль</translation>
    </message>
    <message numerus="yes">
        <source>Loaded %n register(s) from the profile.</source>
        <translation><numerusform>Из профиля загружен %n регистр.</numerusform><numerusform>Из профиля загружено %n регистра.</numerusform><numerusform>Из профиля загружено %n регистров.</numerusform></translation>
    </message>
    <message>
        <source>Loaded with warnings: %1</source>
        <translation>Загружено с предупреждениями: %1</translation>
    </message>
    <message>
        <source>Could not load the default profile</source>
        <translation>Не удалось загрузить профиль по умолчанию</translation>
    </message>
    <message>
        <source>Default values for %1 loaded into the editors.</source>
        <translation>Значения по умолчанию для %1 загружены в поля.</translation>
    </message>
    <message>
        <source>Could not read '%1': %2</source>
        <translation>Не удалось прочитать «%1»: %2</translation>
    </message>
    <message>
        <source>Could not write '%1': %2</source>
        <translation>Не удалось записать «%1»: %2</translation>
    </message>
    <message>
        <source>Registers written.</source>
        <translation>Регистры записаны.</translation>
    </message>
    <message>
        <source>Some registers were not written</source>
        <translation>Часть регистров не записана</translation>
    </message>
    <message>
        <source>Drive lost</source>
        <translation>Связь с приводом потеряна</translation>
    </message>
    <message>
        <source>Drive %1 (node %2) stopped sending heartbeats.</source>
        <translation>Привод %1 (узел %2) перестал отправлять heartbeat.</translation>
    </message>
    <message>
        <source>Wait for it to come back, keeping your unsaved register changes, or drop it and discard them?</source>
        <translation>Дождаться его возвращения, сохранив несохранённые изменения регистров, или убрать привод и отменить их?</translation>
    </message>
    <message>
        <source>Reconnect</source>
        <translation>Подключить снова</translation>
    </message>
    <message>
        <source>Remove drive</source>
        <translation>Убрать привод</translation>
    </message>
    <message>
        <source>Waiting for node %1 to return...</source>
        <translation>Ожидание возвращения узла %1...</translation>
    </message>
    <message>
        <source>Node %1 is back.</source>
        <translation>Узел %1 снова на связи.</translation>
    </message>
    <message>
        <source>Yes</source>
        <translation>Да</translation>
    </message>
    <message>
        <source>No</source>
        <translation>Нет</translation>
    </message>
    <message>
        <source>Serial cannot sustain %1 Hz; running at %2 Hz instead.</source>
        <translation>Serial не выдерживает %1 Гц; используется %2 Гц.</translation>
    </message>
    <message>
        <source>Feedback gains written.</source>
        <translation>Коэффициенты регулятора записаны.</translation>
    </message>
    <message>
        <source>Transient form written.</source>
        <translation>Параметры переходного процесса записаны.</translation>
    </message>
    <message>
        <source>Emergency stop: all drives disabled.</source>
        <translation>Аварийная остановка: все приводы выключены.</translation>
    </message>
    <message>
        <source>Stop</source>
        <translation>Стоп</translation>
    </message>
    <message>
        <source>Save plot data</source>
        <translation>Сохранить данные графика</translation>
    </message>
    <message>
        <source>CSV files (*.csv)</source>
        <translation>Файлы CSV (*.csv)</translation>
    </message>
    <message>
        <source>Could not save the CSV</source>
        <translation>Не удалось сохранить CSV</translation>
    </message>
    <message>
        <source>Plot data saved.</source>
        <translation>Данные графика сохранены.</translation>
    </message>
    <message>
        <source>Save plot image</source>
        <translation>Сохранить изображение графика</translation>
    </message>
    <message>
        <source>PNG images (*.png)</source>
        <translation>Изображения PNG (*.png)</translation>
    </message>
    <message>
        <source>Could not save the image</source>
        <translation>Не удалось сохранить изображение</translation>
    </message>
    <message>
        <source>Plot image saved.</source>
        <translation>Изображение графика сохранено.</translation>
    </message>
    <message>
        <source>Select firmware image</source>
        <translation>Выбрать файл прошивки</translation>
    </message>
    <message>
        <source>Intel HEX files (*.hex)</source>
        <translation>Файлы Intel HEX (*.hex)</translation>
    </message>
    <message>
        <source>Selected %1.</source>
        <translation>Выбрано: %1.</translation>
    </message>
    <message>
        <source>No firmware selected</source>
        <translation>Прошивка не выбрана</translation>
    </message>
    <message>
        <source>Choose a .hex file first, or switch to downloading the latest release.</source>
        <translation>Сначала выберите .hex-файл или переключитесь на загрузку последнего релиза.</translation>
    </message>
    <message>
        <source>Flashing %1...</source>
        <translation>Прошивка %1...</translation>
    </message>
</context>
<context>
    <name>PlotController</name>
    <message>
        <source>t, s</source>
        <translation>t, с</translation>
    </message>
    <message>
        <source>Position</source>
        <translation>Положение</translation>
    </message>
    <message>
        <source>Velocity</source>
        <translation>Скорость</translation>
    </message>
    <message>
        <source>Torque</source>
        <translation>Момент</translation>
    </message>
    <message>
        <source>MCU</source>
        <translation>МК</translation>
    </message>
    <message>
        <source>Bus current</source>
        <translation>Ток шины</translation>
    </message>
    <message>
        <source>Rotor</source>
        <translation>Ротор</translation>
    </message>
    <message>
        <source>Target</source>
        <translation>Задание</translation>
    </message>
    <message>
        <source>Stator</source>
        <translation>Статор</translation>
    </message>
    <message>
        <source>Shaft</source>
        <translation>Вал</translation>
    </message>
    <message>
        <source>Position, %1</source>
        <translation>Положение, %1</translation>
    </message>
    <message>
        <source>Velocity, %1</source>
        <translation>Скорость, %1</translation>
    </message>
    <message>
        <source>Torque, N*m</source>
        <translation>Момент, Н·м</translation>
    </message>
    <message>
        <source>Temperature, C</source>
        <translation>Температура, °C</translation>
    </message>
    <message>
        <source>Current, A</source>
        <translation>Ток, А</translation>
    </message>
    <message>
        <source>Encoder, counts</source>
        <translation>Энкодер, отсчёты</translation>
    </message>
    <message>
        <source>The plot is not initialised.</source>
        <translation>График не инициализирован.</translation>
    </message>
    <message>
        <source>The log view cannot be exported as an image.</source>
        <translation>Журнал нельзя сохранить как изображение.</translation>
    </message>
    <message>
        <source>The plot could not be rendered.</source>
        <translation>Не удалось отрисовать график.</translation>
    </message>
    <message>
        <source>Could not write %1.</source>
        <translation>Не удалось записать %1.</translation>
    </message>
    <message>
        <source>Could not write %1: %2</source>
        <translation>Не удалось записать %1: %2</translation>
    </message>
</context>
<context>
    <name>PreferencesDialog</name>
    <message>
        <source>Preferences</source>
        <translation>Настройки</translation>
    </message>
    <message>
        <source>Appearance</source>
        <translation>Оформление</translation>
    </message>
    <message>
        <source>Theme:</source>
        <translation>Тема:</translation>
    </message>
    <message>
        <source>Dark</source>
        <translation>Тёмная</translation>
    </message>
    <message>
        <source>Light</source>
        <translation>Светлая</translation>
    </message>
    <message>
        <source>Interface font size, pt:</source>
        <translation>Размер шрифта интерфейса, пт:</translation>
    </message>
    <message>
        <source>Plot</source>
        <translation>График</translation>
    </message>
    <message>
        <source>Plot font size, pt:</source>
        <translation>Размер шрифта графика, пт:</translation>
    </message>
    <message>
        <source>Line width, px:</source>
        <translation>Толщина линии, пикс:</translation>
    </message>
    <message>
        <source>Time window, s:</source>
        <translation>Временное окно, с:</translation>
    </message>
    <message>
        <source>Redraw rate, Hz:</source>
        <translation>Частота перерисовки, Гц:</translation>
    </message>
    <message>
        <source>Connection</source>
        <translation>Подключение</translation>
    </message>
    <message>
        <source>This application's Cyphal node ID:</source>
        <translation>Cyphal Node ID этого приложения:</translation>
    </message>
    <message>
        <source>Serial baud rate:</source>
        <translation>Скорость Serial-порта:</translation>
    </message>
    <message>
        <source>Firmware flashing (OpenOCD)</source>
        <translation>Прошивка (OpenOCD)</translation>
    </message>
    <message>
        <source>Interface config:</source>
        <translation>Конфигурация интерфейса:</translation>
    </message>
    <message>
        <source>Target config:</source>
        <translation>Конфигурация цели:</translation>
    </message>
    <message>
        <source>OpenOCD interface script, relative to its scripts directory.
VBDrive is programmed over SWD with an ST-Link.</source>
        <translation>Скрипт интерфейса OpenOCD относительно его каталога scripts.
VBDrive программируется по SWD через ST-Link.</translation>
    </message>
    <message>
        <source>OpenOCD target script. VBDrive uses an STM32G431VB.</source>
        <translation>Скрипт цели OpenOCD. В VBDrive используется STM32G431VB.</translation>
    </message>
    <message>
        <source>Node ID this application announces on the CAN bus.
It must not collide with any drive.</source>
        <translation>Node ID, который приложение объявляет на шине CAN.
Он не должен совпадать с Node ID приводов.</translation>
    </message>
</context>
<context>
    <name>RegisterYaml</name>
    <message>
        <source>File does not exist: %1</source>
        <translation>Файл не существует: %1</translation>
    </message>
    <message>
        <source>Cannot parse %1: %2</source>
        <translation>Не удалось разобрать %1: %2</translation>
    </message>
    <message>
        <source>%1 is not a map of register names to values.</source>
        <translation>%1 не содержит отображение «имя регистра: значение».</translation>
    </message>
    <message>
        <source>unknown register '%1'</source>
        <translation>неизвестный регистр «%1»</translation>
    </message>
    <message>
        <source>'%1' does not hold a single value</source>
        <translation>«%1» содержит не одно значение</translation>
    </message>
    <message>
        <source>'%1' has a value of the wrong type</source>
        <translation>у «%1» значение неверного типа</translation>
    </message>
    <message>
        <source>%1 contains no recognised registers.</source>
        <translation>В %1 нет ни одного известного регистра.</translation>
    </message>
    <message>
        <source>Cannot write %1: %2</source>
        <translation>Не удалось записать %1: %2</translation>
    </message>
</context>
<context>
    <name>RestoreLabel</name>
    <message>
        <source>Restore the value this field had when the drive was selected</source>
        <translation>Вернуть значение, которое было при выборе привода</translation>
    </message>
</context>
<context>
    <name>RestoreModelDialog</name>
    <message>
        <source>Restore Default Registers</source>
        <translation>Восстановление значений по умолчанию</translation>
    </message>
    <message>
        <source>Load the factory register profile for this drive model. The values are placed in the editors; nothing is written to the drive until you press Write.</source>
        <translation>Загрузить заводской профиль регистров для этой модели привода. Значения попадут в поля; в привод ничего не записывается, пока вы не нажмёте «Записать».</translation>
    </message>
    <message>
        <source>Drive model:</source>
        <translation>Модель привода:</translation>
    </message>
    <message>
        <source>M4310R10</source>
        <translation>M4310R10</translation>
    </message>
    <message>
        <source>M4310R36</source>
        <translation>M4310R36</translation>
    </message>
</context>
<context>
    <name>SerialService</name>
    <message>
        <source>Serial service is shutting down.</source>
        <translation>Serial-сервис завершает работу.</translation>
    </message>
    <message>
        <source>Reconnecting.</source>
        <translation>Переподключение.</translation>
    </message>
    <message>
        <source>Disconnected.</source>
        <translation>Отключено.</translation>
    </message>
    <message>
        <source>Serial port is not open.</source>
        <translation>Serial-порт не открыт.</translation>
    </message>
    <message>
        <source>Command '%1' failed: %2</source>
        <translation>Команда «%1» не выполнена: %2</translation>
    </message>
    <message>
        <source>Drive detected on %1.</source>
        <translation>Привод обнаружен на %1.</translation>
    </message>
    <message>
        <source>No drive answered on %1: %2</source>
        <translation>На %1 ни один привод не ответил: %2</translation>
    </message>
    <message>
        <source>These registers were rejected by the drive: %1</source>
        <translation>Привод отклонил запись регистров: %1</translation>
    </message>
    <message>
        <source>Serial connection lost.</source>
        <translation>Serial-соединение потеряно.</translation>
    </message>
    <message>
        <source>The drive did not answer in time.</source>
        <translation>Привод не ответил за отведённое время.</translation>
    </message>
    <message>
        <source>Could not interpret the value '%1'.</source>
        <translation>Не удалось разобрать значение «%1».</translation>
    </message>
</context>
<context>
    <name>SerialWorker</name>
    <message>
        <source>Port %1 opened at %2 baud.</source>
        <translation>Порт %1 открыт на скорости %2 бод.</translation>
    </message>
    <message>
        <source>Serial port is not open.</source>
        <translation>Serial-порт не открыт.</translation>
    </message>
</context>
</TS>