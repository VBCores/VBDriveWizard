<?xml version="1.0" encoding="utf-8"?>
<!DOCTYPE TS>
<TS version="2.1" language="ru_RU">
<context>
    <name>CanInterfaceList</name>
    <message>
        <location filename="../transport/can_interface_list.cpp" line="29"/>
        <source>No CAN interface selected.</source>
        <translation>CAN-интерфейс не выбран.</translation>
    </message>
    <message>
        <location filename="../transport/can_interface_list.cpp" line="31"/>
        <source>Interface %1 is down. Bring it up, for example:
  sudo ip link set %1 up type can bitrate 500000 dbitrate 2000000 fd on</source>
        <translation>Интерфейс %1 выключен. Включите его, например:
  sudo ip link set %1 up type can bitrate 500000 dbitrate 2000000 fd on</translation>
    </message>
    <message>
        <location filename="../transport/can_interface_list.cpp" line="38"/>
        <source>Interface %1 is not running in CAN FD mode (MTU %2, expected %3).
VBDrive uses Cyphal over CAN FD, so an FD-capable adapter is required.</source>
        <translation>Интерфейс %1 работает не в режиме CAN FD (MTU %2, ожидается %3).
VBDrive использует Cyphal поверх CAN FD, поэтому нужен адаптер с поддержкой FD.</translation>
    </message>
</context>
<context>
    <name>ConfigManager</name>
    <message>
        <location filename="../ui/config_manager.cpp" line="191"/>
        <location filename="../ui/config_manager.cpp" line="226"/>
        <source>Cannot write %1: %2</source>
        <translation>Не удалось записать %1: %2</translation>
    </message>
    <message>
        <location filename="../ui/config_manager.cpp" line="237"/>
        <source>Settings loaded.</source>
        <translation>Настройки загружены.</translation>
    </message>
    <message>
        <location filename="../ui/config_manager.cpp" line="239"/>
        <source>No settings file found; defaults are in use.</source>
        <translation>Файл настроек не найден; используются значения по умолчанию.</translation>
    </message>
    <message>
        <location filename="../ui/config_manager.cpp" line="242"/>
        <source>Settings file could not be read; defaults are in use.</source>
        <translation>Не удалось прочитать файл настроек; используются значения по умолчанию.</translation>
    </message>
</context>
<context>
    <name>CyphalBridge</name>
    <message>
        <location filename="../transport/cyphal_worker.cpp" line="139"/>
        <source>The Cyphal stack reported an internal error.</source>
        <translation>Внутренняя ошибка стека Cyphal.</translation>
    </message>
    <message>
        <location filename="../transport/cyphal_worker.cpp" line="157"/>
        <source>Could not open CAN interface %1.</source>
        <translation>Не удалось открыть CAN-интерфейс %1.</translation>
    </message>
</context>
<context>
    <name>CyphalService</name>
    <message>
        <location filename="../transport/cyphal_service.cpp" line="74"/>
        <source>The CAN connection was closed.</source>
        <translation>CAN-соединение закрыто.</translation>
    </message>
    <message>
        <location filename="../transport/cyphal_service.cpp" line="105"/>
        <source>No VBDrive answered on %1 within %2 seconds.</source>
        <translation>За %2 с на интерфейсе %1 не ответил ни один привод VBDrive.</translation>
    </message>
    <message numerus="yes">
        <location filename="../transport/cyphal_service.cpp" line="111"/>
        <source>Found %n actuator(s) on %1.</source>
        <translation>
            <numerusform>Найден %n привод на %1.</numerusform>
            <numerusform>Найдено %n привода на %1.</numerusform>
            <numerusform>Найдено %n приводов на %1.</numerusform>
        </translation>
    </message>
    <message>
        <location filename="../transport/cyphal_service.cpp" line="135"/>
        <source>The actuator stopped answering.</source>
        <translation>Привод перестал отвечать.</translation>
    </message>
    <message>
        <location filename="../transport/cyphal_service.cpp" line="142"/>
        <source>The actuator did not answer register &apos;%1&apos; in time.</source>
        <translation>Привод не ответил на регистр «%1» за отведённое время.</translation>
    </message>
    <message>
        <location filename="../transport/cyphal_service.cpp" line="170"/>
        <source>Could not send the request.</source>
        <translation>Не удалось отправить запрос.</translation>
    </message>
    <message>
        <location filename="../transport/cyphal_service.cpp" line="193"/>
        <source>The actuator did not accept the value.</source>
        <translation>Привод не принял значение.</translation>
    </message>
    <message>
        <location filename="../transport/cyphal_service.cpp" line="194"/>
        <source>Register &apos;%1&apos; is read-only.</source>
        <translation>Регистр «%1» доступен только для чтения.</translation>
    </message>
    <message>
        <location filename="../transport/cyphal_service.cpp" line="203"/>
        <source>Register &apos;%1&apos; is not available on this actuator.</source>
        <translation>Регистр «%1» недоступен на этом приводе.</translation>
    </message>
    <message>
        <location filename="../transport/cyphal_service.cpp" line="231"/>
        <source>These registers were rejected by the actuator: %1</source>
        <translation>Привод отклонил запись регистров: %1</translation>
    </message>
</context>
<context>
    <name>DeviceModel</name>
    <message>
        <location filename="../core/device_model.cpp" line="21"/>
        <source>Unknown actuator</source>
        <translation>Неизвестный привод</translation>
    </message>
</context>
<context>
    <name>FirmwareDownloader</name>
    <message>
        <location filename="../firmware/firmware_downloader.cpp" line="46"/>
        <source>A firmware download is already running.</source>
        <translation>Загрузка прошивки уже выполняется.</translation>
    </message>
    <message>
        <location filename="../firmware/firmware_downloader.cpp" line="56"/>
        <source>Looking up the latest release...</source>
        <translation>Поиск последнего релиза...</translation>
    </message>
    <message>
        <location filename="../firmware/firmware_downloader.cpp" line="77"/>
        <source>Could not reach the VBDrive releases: %1</source>
        <translation>Не удалось получить список релизов VBDrive: %1</translation>
    </message>
    <message>
        <location filename="../firmware/firmware_downloader.cpp" line="96"/>
        <source>Release %1 does not contain %2.</source>
        <translation>Релиз %1 не содержит %2.</translation>
    </message>
    <message>
        <location filename="../firmware/firmware_downloader.cpp" line="97"/>
        <source>(unknown)</source>
        <translation>(неизвестно)</translation>
    </message>
    <message>
        <location filename="../firmware/firmware_downloader.cpp" line="106"/>
        <source>Downloading %1...</source>
        <translation>Загрузка %1...</translation>
    </message>
    <message>
        <location filename="../firmware/firmware_downloader.cpp" line="122"/>
        <source>Downloading %1: %2 of %3 (%4%)</source>
        <translation>Загрузка %1: %2 из %3 (%4%)</translation>
    </message>
    <message>
        <location filename="../firmware/firmware_downloader.cpp" line="128"/>
        <source>Downloading %1: %2 received</source>
        <translation>Загрузка %1: получено %2</translation>
    </message>
    <message>
        <location filename="../firmware/firmware_downloader.cpp" line="144"/>
        <source>Firmware download failed: %1</source>
        <translation>Не удалось загрузить прошивку: %1</translation>
    </message>
    <message>
        <location filename="../firmware/firmware_downloader.cpp" line="155"/>
        <location filename="../firmware/firmware_downloader.cpp" line="160"/>
        <source>Could not write %1: %2</source>
        <translation>Не удалось записать %1: %2</translation>
    </message>
    <message>
        <location filename="../firmware/firmware_downloader.cpp" line="164"/>
        <source>Download complete.</source>
        <translation>Загрузка завершена.</translation>
    </message>
</context>
<context>
    <name>FirmwareFlasher</name>
    <message>
        <location filename="../firmware/firmware_flasher.cpp" line="53"/>
        <source>A flashing operation is already running.</source>
        <translation>Прошивка уже выполняется.</translation>
    </message>
    <message>
        <location filename="../firmware/firmware_flasher.cpp" line="57"/>
        <source>Firmware file not found: %1</source>
        <translation>Файл прошивки не найден: %1</translation>
    </message>
    <message>
        <location filename="../firmware/firmware_flasher.cpp" line="62"/>
        <source>openocd was not found. Install it, for example:
  sudo apt install openocd</source>
        <translation>openocd не найден. Установите его, например:
  sudo apt install openocd</translation>
    </message>
    <message>
        <location filename="../firmware/firmware_flasher.cpp" line="81"/>
        <source>openocd could not be started.</source>
        <translation>Не удалось запустить openocd.</translation>
    </message>
    <message>
        <location filename="../firmware/firmware_flasher.cpp" line="89"/>
        <source>Done.</source>
        <translation>Готово.</translation>
    </message>
    <message>
        <location filename="../firmware/firmware_flasher.cpp" line="90"/>
        <source>Firmware written and verified.</source>
        <translation>Прошивка записана и проверена.</translation>
    </message>
    <message>
        <location filename="../firmware/firmware_flasher.cpp" line="94"/>
        <source>openocd exited with code %1.

%2</source>
        <translation>openocd завершился с кодом %1.

%2</translation>
    </message>
    <message>
        <location filename="../firmware/firmware_flasher.cpp" line="110"/>
        <source>Starting openocd...</source>
        <translation>Запуск openocd...</translation>
    </message>
</context>
<context>
    <name>MainWindow</name>
    <message>
        <location filename="../mainwindow.ui" line="14"/>
        <location filename="../mainwindow.ui" line="59"/>
        <location filename="../build/Desktop-Debug/VBDriveWizard_autogen/include/ui_mainwindow.h" line="2393"/>
        <location filename="../build/Desktop-Debug/VBDriveWizard_autogen/include/ui_mainwindow.h" line="2395"/>
        <source>VBDrive Wizard</source>
        <translation>VBDrive Wizard</translation>
    </message>
    <message>
        <location filename="../mainwindow.ui" line="95"/>
        <location filename="../build/Desktop-Debug/VBDriveWizard_autogen/include/ui_mainwindow.h" line="2396"/>
        <source>CONNECTION</source>
        <translation>ПОДКЛЮЧЕНИЕ</translation>
    </message>
    <message>
        <location filename="../mainwindow.ui" line="133"/>
        <location filename="../build/Desktop-Debug/VBDriveWizard_autogen/include/ui_mainwindow.h" line="2397"/>
        <source>Serial</source>
        <translation>Serial</translation>
    </message>
    <message>
        <location filename="../mainwindow.ui" line="203"/>
        <location filename="../mainwindow.ui" line="271"/>
        <location filename="../mainwindow.cpp" line="911"/>
        <location filename="../mainwindow.cpp" line="1172"/>
        <location filename="../mainwindow.cpp" line="1173"/>
        <location filename="../build/Desktop-Debug/VBDriveWizard_autogen/include/ui_mainwindow.h" line="2399"/>
        <location filename="../build/Desktop-Debug/VBDriveWizard_autogen/include/ui_mainwindow.h" line="2404"/>
        <source>Connect</source>
        <translation>Подключить</translation>
    </message>
    <message>
        <location filename="../mainwindow.ui" line="219"/>
        <location filename="../mainwindow.ui" line="290"/>
        <location filename="../build/Desktop-Debug/VBDriveWizard_autogen/include/ui_mainwindow.h" line="2401"/>
        <location filename="../build/Desktop-Debug/VBDriveWizard_autogen/include/ui_mainwindow.h" line="2406"/>
        <source>Refresh</source>
        <translation>Обновить</translation>
    </message>
    <message>
        <location filename="../mainwindow.ui" line="146"/>
        <location filename="../mainwindow.ui" line="699"/>
        <location filename="../build/Desktop-Debug/VBDriveWizard_autogen/include/ui_mainwindow.h" line="2398"/>
        <location filename="../build/Desktop-Debug/VBDriveWizard_autogen/include/ui_mainwindow.h" line="2448"/>
        <source>CAN</source>
        <translation>CAN</translation>
    </message>
    <message>
        <location filename="../mainwindow.ui" line="317"/>
        <location filename="../build/Desktop-Debug/VBDriveWizard_autogen/include/ui_mainwindow.h" line="2409"/>
        <source>DEVICES</source>
        <translation>УСТРОЙСТВА</translation>
    </message>
    <message>
        <location filename="../mainwindow.ui" line="416"/>
        <location filename="../build/Desktop-Debug/VBDriveWizard_autogen/include/ui_mainwindow.h" line="2414"/>
        <source>CONFIGURATION</source>
        <translation>КОНФИГУРАЦИЯ</translation>
    </message>
    <message>
        <location filename="../mainwindow.ui" line="441"/>
        <location filename="../build/Desktop-Debug/VBDriveWizard_autogen/include/ui_mainwindow.h" line="2433"/>
        <source>Basic</source>
        <translation>Основные</translation>
    </message>
    <message>
        <location filename="../mainwindow.ui" line="462"/>
        <location filename="../build/Desktop-Debug/VBDriveWizard_autogen/include/ui_mainwindow.h" line="2415"/>
        <source>Limits</source>
        <translation>Ограничения</translation>
    </message>
    <message>
        <location filename="../mainwindow.ui" line="615"/>
        <location filename="../mainwindow.ui" line="3661"/>
        <location filename="../build/Desktop-Debug/VBDriveWizard_autogen/include/ui_mainwindow.h" line="2428"/>
        <location filename="../build/Desktop-Debug/VBDriveWizard_autogen/include/ui_mainwindow.h" line="2583"/>
        <source>Angle</source>
        <translation>Угол</translation>
    </message>
    <message>
        <location filename="../mainwindow.ui" line="549"/>
        <location filename="../build/Desktop-Debug/VBDriveWizard_autogen/include/ui_mainwindow.h" line="2421"/>
        <source>min:</source>
        <translation>мин:</translation>
    </message>
    <message>
        <location filename="../mainwindow.ui" line="594"/>
        <location filename="../build/Desktop-Debug/VBDriveWizard_autogen/include/ui_mainwindow.h" line="2425"/>
        <source>max</source>
        <translation>макс</translation>
    </message>
    <message>
        <location filename="../mainwindow.ui" line="601"/>
        <location filename="../mainwindow.ui" line="1634"/>
        <location filename="../mainwindow.ui" line="2008"/>
        <location filename="../mainwindow.ui" line="2093"/>
        <location filename="../mainwindow.ui" line="3129"/>
        <location filename="../mainwindow.ui" line="3325"/>
        <location filename="../build/Desktop-Debug/VBDriveWizard_autogen/include/ui_mainwindow.h" line="2426"/>
        <location filename="../build/Desktop-Debug/VBDriveWizard_autogen/include/ui_mainwindow.h" line="2486"/>
        <location filename="../build/Desktop-Debug/VBDriveWizard_autogen/include/ui_mainwindow.h" line="2520"/>
        <location filename="../build/Desktop-Debug/VBDriveWizard_autogen/include/ui_mainwindow.h" line="2525"/>
        <location filename="../build/Desktop-Debug/VBDriveWizard_autogen/include/ui_mainwindow.h" line="2555"/>
        <location filename="../build/Desktop-Debug/VBDriveWizard_autogen/include/ui_mainwindow.h" line="2561"/>
        <source>Velocity</source>
        <translation>Скорость</translation>
    </message>
    <message>
        <location filename="../mainwindow.ui" line="608"/>
        <location filename="../mainwindow.ui" line="1639"/>
        <location filename="../mainwindow.ui" line="2015"/>
        <location filename="../mainwindow.ui" line="3159"/>
        <location filename="../mainwindow.ui" line="3335"/>
        <location filename="../build/Desktop-Debug/VBDriveWizard_autogen/include/ui_mainwindow.h" line="2427"/>
        <location filename="../build/Desktop-Debug/VBDriveWizard_autogen/include/ui_mainwindow.h" line="2487"/>
        <location filename="../build/Desktop-Debug/VBDriveWizard_autogen/include/ui_mainwindow.h" line="2521"/>
        <location filename="../build/Desktop-Debug/VBDriveWizard_autogen/include/ui_mainwindow.h" line="2556"/>
        <location filename="../build/Desktop-Debug/VBDriveWizard_autogen/include/ui_mainwindow.h" line="2562"/>
        <source>Torque</source>
        <translation>Момент</translation>
    </message>
    <message>
        <location filename="../mainwindow.ui" line="644"/>
        <location filename="../build/Desktop-Debug/VBDriveWizard_autogen/include/ui_mainwindow.h" line="2432"/>
        <source>Voltage</source>
        <translation>Напряжение</translation>
    </message>
    <message>
        <location filename="../mainwindow.ui" line="575"/>
        <location filename="../mainwindow.ui" line="641"/>
        <location filename="../build/Desktop-Debug/VBDriveWizard_autogen/include/ui_mainwindow.h" line="2423"/>
        <location filename="../build/Desktop-Debug/VBDriveWizard_autogen/include/ui_mainwindow.h" line="2430"/>
        <source>The firmware exposes no voltage limit register yet.</source>
        <translation>В прошивке пока нет регистра ограничения напряжения.</translation>
    </message>
    <message>
        <location filename="../mainwindow.ui" line="542"/>
        <location filename="../mainwindow.ui" line="1649"/>
        <location filename="../build/Desktop-Debug/VBDriveWizard_autogen/include/ui_mainwindow.h" line="2420"/>
        <location filename="../build/Desktop-Debug/VBDriveWizard_autogen/include/ui_mainwindow.h" line="2489"/>
        <source>Current</source>
        <translation>Ток</translation>
    </message>
    <message>
        <location filename="../mainwindow.ui" line="535"/>
        <location filename="../build/Desktop-Debug/VBDriveWizard_autogen/include/ui_mainwindow.h" line="2419"/>
        <source>Direction</source>
        <translation>Направление</translation>
    </message>
    <message>
        <location filename="../mainwindow.ui" line="405"/>
        <location filename="../build/Desktop-Debug/VBDriveWizard_autogen/include/ui_mainwindow.h" line="2412"/>
        <source>CAN ID</source>
        <translation type="unfinished"></translation>
    </message>
    <message>
        <location filename="../mainwindow.ui" line="506"/>
        <location filename="../build/Desktop-Debug/VBDriveWizard_autogen/include/ui_mainwindow.h" line="2416"/>
        <source>CCW</source>
        <translation>Против часовой</translation>
    </message>
    <message>
        <location filename="../mainwindow.ui" line="511"/>
        <location filename="../build/Desktop-Debug/VBDriveWizard_autogen/include/ui_mainwindow.h" line="2417"/>
        <source>CW</source>
        <translation>По часовой</translation>
    </message>
    <message>
        <location filename="../mainwindow.ui" line="723"/>
        <location filename="../build/Desktop-Debug/VBDriveWizard_autogen/include/ui_mainwindow.h" line="2434"/>
        <source>Data Baud Rate</source>
        <translation>Скорость data-сегмента</translation>
    </message>
    <message>
        <location filename="../mainwindow.ui" line="730"/>
        <location filename="../build/Desktop-Debug/VBDriveWizard_autogen/include/ui_mainwindow.h" line="2435"/>
        <source>Node ID</source>
        <translation>Node ID</translation>
    </message>
    <message>
        <location filename="../mainwindow.ui" line="757"/>
        <location filename="../build/Desktop-Debug/VBDriveWizard_autogen/include/ui_mainwindow.h" line="2436"/>
        <source>62.5 kHz</source>
        <translation>62.5 kHz</translation>
    </message>
    <message>
        <location filename="../mainwindow.ui" line="762"/>
        <location filename="../build/Desktop-Debug/VBDriveWizard_autogen/include/ui_mainwindow.h" line="2437"/>
        <source>125 kHz</source>
        <translation>125 kHz</translation>
    </message>
    <message>
        <location filename="../mainwindow.ui" line="767"/>
        <location filename="../build/Desktop-Debug/VBDriveWizard_autogen/include/ui_mainwindow.h" line="2438"/>
        <source>250 kHz</source>
        <translation>250 kHz</translation>
    </message>
    <message>
        <location filename="../mainwindow.ui" line="772"/>
        <location filename="../build/Desktop-Debug/VBDriveWizard_autogen/include/ui_mainwindow.h" line="2439"/>
        <source>500 kHz</source>
        <translation>500 kHz</translation>
    </message>
    <message>
        <location filename="../mainwindow.ui" line="777"/>
        <location filename="../mainwindow.ui" line="789"/>
        <location filename="../build/Desktop-Debug/VBDriveWizard_autogen/include/ui_mainwindow.h" line="2440"/>
        <location filename="../build/Desktop-Debug/VBDriveWizard_autogen/include/ui_mainwindow.h" line="2442"/>
        <source>1 MHz</source>
        <translation>1 MHz</translation>
    </message>
    <message>
        <location filename="../mainwindow.ui" line="794"/>
        <location filename="../build/Desktop-Debug/VBDriveWizard_autogen/include/ui_mainwindow.h" line="2443"/>
        <source>2 MHz</source>
        <translation>2 MHz</translation>
    </message>
    <message>
        <location filename="../mainwindow.ui" line="799"/>
        <location filename="../build/Desktop-Debug/VBDriveWizard_autogen/include/ui_mainwindow.h" line="2444"/>
        <source>4 MHz</source>
        <translation>4 MHz</translation>
    </message>
    <message>
        <location filename="../mainwindow.ui" line="804"/>
        <location filename="../build/Desktop-Debug/VBDriveWizard_autogen/include/ui_mainwindow.h" line="2445"/>
        <source>8 MHz</source>
        <translation>8 MHz</translation>
    </message>
    <message>
        <location filename="../mainwindow.ui" line="812"/>
        <location filename="../build/Desktop-Debug/VBDriveWizard_autogen/include/ui_mainwindow.h" line="2447"/>
        <source>Nominal Baud Rate</source>
        <translation>Номинальная скорость</translation>
    </message>
    <message>
        <location filename="../mainwindow.ui" line="863"/>
        <location filename="../build/Desktop-Debug/VBDriveWizard_autogen/include/ui_mainwindow.h" line="2465"/>
        <source>Advanced</source>
        <translation>Расширенные</translation>
    </message>
    <message>
        <location filename="../mainwindow.ui" line="917"/>
        <location filename="../build/Desktop-Debug/VBDriveWizard_autogen/include/ui_mainwindow.h" line="2449"/>
        <source>Gear Ratio</source>
        <translation>Передаточное число</translation>
    </message>
    <message>
        <location filename="../mainwindow.ui" line="940"/>
        <location filename="../mainwindow.ui" line="1654"/>
        <location filename="../build/Desktop-Debug/VBDriveWizard_autogen/include/ui_mainwindow.h" line="2450"/>
        <location filename="../build/Desktop-Debug/VBDriveWizard_autogen/include/ui_mainwindow.h" line="2490"/>
        <source>Encoder</source>
        <translation>Энкодер</translation>
    </message>
    <message>
        <location filename="../mainwindow.ui" line="969"/>
        <location filename="../build/Desktop-Debug/VBDriveWizard_autogen/include/ui_mainwindow.h" line="2455"/>
        <source>Torque const</source>
        <translation>Постоянная момента</translation>
    </message>
    <message>
        <location filename="../mainwindow.ui" line="995"/>
        <location filename="../build/Desktop-Debug/VBDriveWizard_autogen/include/ui_mainwindow.h" line="2456"/>
        <source>Current Kp</source>
        <translation>Kp тока</translation>
    </message>
    <message>
        <location filename="../mainwindow.ui" line="1021"/>
        <location filename="../build/Desktop-Debug/VBDriveWizard_autogen/include/ui_mainwindow.h" line="2457"/>
        <source>Current Ki</source>
        <translation>Ki тока</translation>
    </message>
    <message>
        <location filename="../mainwindow.ui" line="1070"/>
        <location filename="../build/Desktop-Debug/VBDriveWizard_autogen/include/ui_mainwindow.h" line="2459"/>
        <source>Position Offset</source>
        <translation>Смещение положения</translation>
    </message>
    <message>
        <location filename="../mainwindow.ui" line="1096"/>
        <location filename="../build/Desktop-Debug/VBDriveWizard_autogen/include/ui_mainwindow.h" line="2460"/>
        <source>Main Filter Param A</source>
        <translation>Коэф. A основного фильтра</translation>
    </message>
    <message>
        <location filename="../mainwindow.ui" line="1122"/>
        <location filename="../build/Desktop-Debug/VBDriveWizard_autogen/include/ui_mainwindow.h" line="2461"/>
        <source>Filter Gain 1</source>
        <translation>Коэф. фильтра 1</translation>
    </message>
    <message>
        <location filename="../mainwindow.ui" line="1148"/>
        <location filename="../build/Desktop-Debug/VBDriveWizard_autogen/include/ui_mainwindow.h" line="2462"/>
        <source>Filter Gain 2</source>
        <translation>Коэф. фильтра 2</translation>
    </message>
    <message>
        <location filename="../mainwindow.ui" line="1174"/>
        <location filename="../build/Desktop-Debug/VBDriveWizard_autogen/include/ui_mainwindow.h" line="2463"/>
        <source>Filter Gain 3</source>
        <translation>Коэф. фильтра 3</translation>
    </message>
    <message>
        <location filename="../mainwindow.ui" line="1200"/>
        <location filename="../build/Desktop-Debug/VBDriveWizard_autogen/include/ui_mainwindow.h" line="2464"/>
        <source>Current LPF Gain</source>
        <translation>Коэф. ФНЧ тока</translation>
    </message>
    <message>
        <location filename="../mainwindow.ui" line="948"/>
        <location filename="../build/Desktop-Debug/VBDriveWizard_autogen/include/ui_mainwindow.h" line="2451"/>
        <source>rotor</source>
        <translation>ротор</translation>
    </message>
    <message>
        <location filename="../mainwindow.ui" line="953"/>
        <location filename="../build/Desktop-Debug/VBDriveWizard_autogen/include/ui_mainwindow.h" line="2452"/>
        <source>shaft</source>
        <translation>вал</translation>
    </message>
    <message>
        <location filename="../mainwindow.ui" line="958"/>
        <location filename="../build/Desktop-Debug/VBDriveWizard_autogen/include/ui_mainwindow.h" line="2453"/>
        <source>external</source>
        <translation>внешний</translation>
    </message>
    <message>
        <location filename="../mainwindow.ui" line="1047"/>
        <location filename="../build/Desktop-Debug/VBDriveWizard_autogen/include/ui_mainwindow.h" line="2458"/>
        <source>Current Kd</source>
        <translation>Kd тока</translation>
    </message>
    <message>
        <location filename="../mainwindow.ui" line="1234"/>
        <location filename="../build/Desktop-Debug/VBDriveWizard_autogen/include/ui_mainwindow.h" line="2479"/>
        <source>System</source>
        <translation>Система</translation>
    </message>
    <message>
        <location filename="../mainwindow.ui" line="1255"/>
        <location filename="../build/Desktop-Debug/VBDriveWizard_autogen/include/ui_mainwindow.h" line="2466"/>
        <source>Sensor</source>
        <translation>Датчик</translation>
    </message>
    <message>
        <location filename="../mainwindow.ui" line="1279"/>
        <location filename="../build/Desktop-Debug/VBDriveWizard_autogen/include/ui_mainwindow.h" line="2467"/>
        <source>Calibrate</source>
        <translation>Калибровать</translation>
    </message>
    <message>
        <location filename="../mainwindow.ui" line="1299"/>
        <location filename="../build/Desktop-Debug/VBDriveWizard_autogen/include/ui_mainwindow.h" line="2468"/>
        <source>Register Parameters</source>
        <translation>Параметры регистров</translation>
    </message>
    <message>
        <location filename="../mainwindow.ui" line="1323"/>
        <location filename="../build/Desktop-Debug/VBDriveWizard_autogen/include/ui_mainwindow.h" line="2469"/>
        <source>Save to File...</source>
        <translation>Сохранить...</translation>
    </message>
    <message>
        <location filename="../mainwindow.ui" line="1330"/>
        <location filename="../build/Desktop-Debug/VBDriveWizard_autogen/include/ui_mainwindow.h" line="2470"/>
        <source>Load from File...</source>
        <translation>Загрузить...</translation>
    </message>
    <message>
        <location filename="../mainwindow.ui" line="1337"/>
        <location filename="../build/Desktop-Debug/VBDriveWizard_autogen/include/ui_mainwindow.h" line="2471"/>
        <source>Restore to Default</source>
        <translation>Значения по умолчанию</translation>
    </message>
    <message>
        <location filename="../mainwindow.ui" line="1347"/>
        <location filename="../build/Desktop-Debug/VBDriveWizard_autogen/include/ui_mainwindow.h" line="2472"/>
        <source>Firmware</source>
        <translation>Прошивка</translation>
    </message>
    <message>
        <location filename="../mainwindow.ui" line="1385"/>
        <location filename="../build/Desktop-Debug/VBDriveWizard_autogen/include/ui_mainwindow.h" line="2473"/>
        <source>Current Revision:</source>
        <translation>Текущая версия:</translation>
    </message>
    <message>
        <location filename="../mainwindow.ui" line="1392"/>
        <location filename="../build/Desktop-Debug/VBDriveWizard_autogen/include/ui_mainwindow.h" line="2474"/>
        <source>0.0.1</source>
        <translation>0.0.1</translation>
    </message>
    <message>
        <source>Choose file</source>
        <translation type="vanished">Выбрать файл</translation>
    </message>
    <message>
        <location filename="../mainwindow.ui" line="1460"/>
        <location filename="../build/Desktop-Debug/VBDriveWizard_autogen/include/ui_mainwindow.h" line="2477"/>
        <source>Open</source>
        <translation>Открыть</translation>
    </message>
    <message>
        <source>Download from remote repo</source>
        <translation type="vanished">Скачать из репозитория</translation>
    </message>
    <message>
        <location filename="../mainwindow.ui" line="1499"/>
        <location filename="../build/Desktop-Debug/VBDriveWizard_autogen/include/ui_mainwindow.h" line="2478"/>
        <source>Flash</source>
        <translation>Прошить</translation>
    </message>
    <message>
        <location filename="../mainwindow.ui" line="1552"/>
        <location filename="../build/Desktop-Debug/VBDriveWizard_autogen/include/ui_mainwindow.h" line="2480"/>
        <source>Read</source>
        <translation>Прочитать</translation>
    </message>
    <message>
        <location filename="../mainwindow.ui" line="1559"/>
        <location filename="../build/Desktop-Debug/VBDriveWizard_autogen/include/ui_mainwindow.h" line="2481"/>
        <source>Write</source>
        <translation>Записать</translation>
    </message>
    <message>
        <location filename="../mainwindow.ui" line="1566"/>
        <location filename="../build/Desktop-Debug/VBDriveWizard_autogen/include/ui_mainwindow.h" line="2482"/>
        <source>Set Origin</source>
        <translation>Задать ноль</translation>
    </message>
    <message>
        <source>&lt;html&gt;&lt;head/&gt;&lt;body&gt;&lt;p align=&quot;center&quot;&gt;Logo&lt;/p&gt;&lt;/body&gt;&lt;/html&gt;</source>
        <translation type="vanished">&lt;html&gt;&lt;head/&gt;&lt;body&gt;&lt;p align=&quot;center&quot;&gt;Logo&lt;/p&gt;&lt;/body&gt;&lt;/html&gt;</translation>
    </message>
    <message>
        <location filename="../mainwindow.ui" line="1580"/>
        <location filename="../build/Desktop-Debug/VBDriveWizard_autogen/include/ui_mainwindow.h" line="2483"/>
        <source>REALTIME DATA</source>
        <translation>ДАННЫЕ В РЕАЛЬНОМ ВРЕМЕНИ</translation>
    </message>
    <message>
        <location filename="../mainwindow.ui" line="1621"/>
        <location filename="../build/Desktop-Debug/VBDriveWizard_autogen/include/ui_mainwindow.h" line="2484"/>
        <source>Signal:</source>
        <translation>Сигнал:</translation>
    </message>
    <message>
        <location filename="../mainwindow.ui" line="1629"/>
        <location filename="../mainwindow.ui" line="1998"/>
        <location filename="../mainwindow.ui" line="3099"/>
        <location filename="../mainwindow.ui" line="3312"/>
        <location filename="../build/Desktop-Debug/VBDriveWizard_autogen/include/ui_mainwindow.h" line="2485"/>
        <location filename="../build/Desktop-Debug/VBDriveWizard_autogen/include/ui_mainwindow.h" line="2519"/>
        <location filename="../build/Desktop-Debug/VBDriveWizard_autogen/include/ui_mainwindow.h" line="2554"/>
        <location filename="../build/Desktop-Debug/VBDriveWizard_autogen/include/ui_mainwindow.h" line="2560"/>
        <source>Position</source>
        <translation>Положение</translation>
    </message>
    <message>
        <location filename="../mainwindow.ui" line="1644"/>
        <location filename="../build/Desktop-Debug/VBDriveWizard_autogen/include/ui_mainwindow.h" line="2488"/>
        <source>Temperature</source>
        <translation>Температура</translation>
    </message>
    <message>
        <location filename="../mainwindow.ui" line="1659"/>
        <location filename="../build/Desktop-Debug/VBDriveWizard_autogen/include/ui_mainwindow.h" line="2491"/>
        <source>Log</source>
        <translation>Журнал</translation>
    </message>
    <message>
        <location filename="../mainwindow.ui" line="1667"/>
        <location filename="../build/Desktop-Debug/VBDriveWizard_autogen/include/ui_mainwindow.h" line="2493"/>
        <source>Units:</source>
        <translation>Единицы:</translation>
    </message>
    <message>
        <location filename="../mainwindow.ui" line="1675"/>
        <location filename="../mainwindow.ui" line="3675"/>
        <location filename="../build/Desktop-Debug/VBDriveWizard_autogen/include/ui_mainwindow.h" line="2494"/>
        <location filename="../build/Desktop-Debug/VBDriveWizard_autogen/include/ui_mainwindow.h" line="2585"/>
        <source>rad</source>
        <translation>rad</translation>
    </message>
    <message>
        <location filename="../mainwindow.ui" line="1680"/>
        <location filename="../build/Desktop-Debug/VBDriveWizard_autogen/include/ui_mainwindow.h" line="2495"/>
        <source>deg</source>
        <translation>deg</translation>
    </message>
    <message>
        <location filename="../mainwindow.ui" line="1701"/>
        <location filename="../build/Desktop-Debug/VBDriveWizard_autogen/include/ui_mainwindow.h" line="2498"/>
        <source>Preferences</source>
        <translation>Настройки</translation>
    </message>
    <message>
        <source>Pause</source>
        <translation type="vanished">Пауза</translation>
    </message>
    <message>
        <source>Save as CSV...</source>
        <translation type="vanished">Сохранить как CSV...</translation>
    </message>
    <message>
        <source>Save as PNG...</source>
        <translation type="vanished">Сохранить как PNG...</translation>
    </message>
    <message>
        <location filename="../mainwindow.ui" line="1826"/>
        <location filename="../build/Desktop-Debug/VBDriveWizard_autogen/include/ui_mainwindow.h" line="2513"/>
        <source>X:</source>
        <translation>X:</translation>
    </message>
    <message>
        <location filename="../mainwindow.ui" line="1840"/>
        <location filename="../build/Desktop-Debug/VBDriveWizard_autogen/include/ui_mainwindow.h" line="2514"/>
        <source>Y:</source>
        <translation>Y:</translation>
    </message>
    <message>
        <location filename="../mainwindow.ui" line="1861"/>
        <location filename="../build/Desktop-Debug/VBDriveWizard_autogen/include/ui_mainwindow.h" line="2515"/>
        <source>Dist X:</source>
        <translation>ΔX:</translation>
    </message>
    <message>
        <location filename="../mainwindow.ui" line="1875"/>
        <location filename="../build/Desktop-Debug/VBDriveWizard_autogen/include/ui_mainwindow.h" line="2516"/>
        <source>Dist Y:</source>
        <translation>ΔY:</translation>
    </message>
    <message>
        <location filename="../mainwindow.ui" line="1911"/>
        <location filename="../build/Desktop-Debug/VBDriveWizard_autogen/include/ui_mainwindow.h" line="2517"/>
        <source>CONTROL</source>
        <translation>УПРАВЛЕНИЕ</translation>
    </message>
    <message>
        <location filename="../mainwindow.ui" line="1939"/>
        <location filename="../build/Desktop-Debug/VBDriveWizard_autogen/include/ui_mainwindow.h" line="2547"/>
        <source>Servo</source>
        <translation>Servo</translation>
    </message>
    <message>
        <location filename="../mainwindow.ui" line="1977"/>
        <location filename="../build/Desktop-Debug/VBDriveWizard_autogen/include/ui_mainwindow.h" line="2518"/>
        <source>Control Type</source>
        <translation>Режим</translation>
    </message>
    <message>
        <location filename="../mainwindow.ui" line="2038"/>
        <location filename="../build/Desktop-Debug/VBDriveWizard_autogen/include/ui_mainwindow.h" line="2522"/>
        <source>Transient Form</source>
        <translation>Переходный процесс</translation>
    </message>
    <message>
        <location filename="../mainwindow.ui" line="2059"/>
        <location filename="../build/Desktop-Debug/VBDriveWizard_autogen/include/ui_mainwindow.h" line="2523"/>
        <source>Linear</source>
        <translation>Линейный</translation>
    </message>
    <message>
        <location filename="../mainwindow.ui" line="2069"/>
        <location filename="../build/Desktop-Debug/VBDriveWizard_autogen/include/ui_mainwindow.h" line="2524"/>
        <source>Polynomial</source>
        <translation>Полиномиальный</translation>
    </message>
    <message>
        <location filename="../mainwindow.ui" line="2148"/>
        <location filename="../mainwindow.ui" line="2338"/>
        <location filename="../build/Desktop-Debug/VBDriveWizard_autogen/include/ui_mainwindow.h" line="2526"/>
        <location filename="../build/Desktop-Debug/VBDriveWizard_autogen/include/ui_mainwindow.h" line="2531"/>
        <source>Set</source>
        <translation>Задать</translation>
    </message>
    <message>
        <location filename="../mainwindow.ui" line="2175"/>
        <location filename="../build/Desktop-Debug/VBDriveWizard_autogen/include/ui_mainwindow.h" line="2527"/>
        <source>Feedback Gains</source>
        <translation>Коэффициенты регулятора</translation>
    </message>
    <message>
        <location filename="../mainwindow.ui" line="2216"/>
        <location filename="../build/Desktop-Debug/VBDriveWizard_autogen/include/ui_mainwindow.h" line="2528"/>
        <source>Kp:</source>
        <translation>Kp:</translation>
    </message>
    <message>
        <location filename="../mainwindow.ui" line="2246"/>
        <location filename="../build/Desktop-Debug/VBDriveWizard_autogen/include/ui_mainwindow.h" line="2529"/>
        <source>Ki:</source>
        <translation>Ki:</translation>
    </message>
    <message>
        <location filename="../mainwindow.ui" line="2276"/>
        <location filename="../build/Desktop-Debug/VBDriveWizard_autogen/include/ui_mainwindow.h" line="2530"/>
        <source>Kd:</source>
        <translation>Kd:</translation>
    </message>
    <message>
        <location filename="../mainwindow.ui" line="2354"/>
        <location filename="../build/Desktop-Debug/VBDriveWizard_autogen/include/ui_mainwindow.h" line="2534"/>
        <source>User</source>
        <translation>Вручную</translation>
    </message>
    <message>
        <location filename="../mainwindow.ui" line="2392"/>
        <location filename="../mainwindow.cpp" line="2073"/>
        <location filename="../build/Desktop-Debug/VBDriveWizard_autogen/include/ui_mainwindow.h" line="2532"/>
        <source>Target pos:</source>
        <translation>Команда:</translation>
    </message>
    <message>
        <location filename="../mainwindow.ui" line="2467"/>
        <location filename="../mainwindow.ui" line="2623"/>
        <location filename="../mainwindow.ui" line="2779"/>
        <location filename="../mainwindow.ui" line="2935"/>
        <location filename="../mainwindow.ui" line="3537"/>
        <location filename="../mainwindow.cpp" line="2492"/>
        <location filename="../build/Desktop-Debug/VBDriveWizard_autogen/include/ui_mainwindow.h" line="2533"/>
        <location filename="../build/Desktop-Debug/VBDriveWizard_autogen/include/ui_mainwindow.h" line="2537"/>
        <location filename="../build/Desktop-Debug/VBDriveWizard_autogen/include/ui_mainwindow.h" line="2541"/>
        <location filename="../build/Desktop-Debug/VBDriveWizard_autogen/include/ui_mainwindow.h" line="2545"/>
        <location filename="../build/Desktop-Debug/VBDriveWizard_autogen/include/ui_mainwindow.h" line="2568"/>
        <source>Start</source>
        <translation>Пуск</translation>
    </message>
    <message>
        <location filename="../mainwindow.ui" line="2477"/>
        <location filename="../mainwindow.ui" line="3004"/>
        <location filename="../build/Desktop-Debug/VBDriveWizard_autogen/include/ui_mainwindow.h" line="2538"/>
        <location filename="../build/Desktop-Debug/VBDriveWizard_autogen/include/ui_mainwindow.h" line="2550"/>
        <source>Sin</source>
        <translation>Синус</translation>
    </message>
    <message>
        <location filename="../mainwindow.ui" line="2518"/>
        <location filename="../mainwindow.ui" line="2674"/>
        <location filename="../mainwindow.ui" line="2830"/>
        <location filename="../mainwindow.ui" line="3367"/>
        <location filename="../build/Desktop-Debug/VBDriveWizard_autogen/include/ui_mainwindow.h" line="2535"/>
        <location filename="../build/Desktop-Debug/VBDriveWizard_autogen/include/ui_mainwindow.h" line="2539"/>
        <location filename="../build/Desktop-Debug/VBDriveWizard_autogen/include/ui_mainwindow.h" line="2543"/>
        <location filename="../build/Desktop-Debug/VBDriveWizard_autogen/include/ui_mainwindow.h" line="2564"/>
        <source>Amplitude</source>
        <translation>Амплитуда</translation>
    </message>
    <message>
        <location filename="../mainwindow.ui" line="2548"/>
        <location filename="../mainwindow.ui" line="2704"/>
        <location filename="../mainwindow.ui" line="2860"/>
        <location filename="../mainwindow.ui" line="3397"/>
        <location filename="../build/Desktop-Debug/VBDriveWizard_autogen/include/ui_mainwindow.h" line="2536"/>
        <location filename="../build/Desktop-Debug/VBDriveWizard_autogen/include/ui_mainwindow.h" line="2540"/>
        <location filename="../build/Desktop-Debug/VBDriveWizard_autogen/include/ui_mainwindow.h" line="2544"/>
        <location filename="../build/Desktop-Debug/VBDriveWizard_autogen/include/ui_mainwindow.h" line="2565"/>
        <source>Frequency</source>
        <translation>Частота</translation>
    </message>
    <message>
        <location filename="../mainwindow.ui" line="2633"/>
        <location filename="../mainwindow.ui" line="3014"/>
        <location filename="../build/Desktop-Debug/VBDriveWizard_autogen/include/ui_mainwindow.h" line="2542"/>
        <location filename="../build/Desktop-Debug/VBDriveWizard_autogen/include/ui_mainwindow.h" line="2551"/>
        <source>Meander</source>
        <translation>Меандр</translation>
    </message>
    <message>
        <location filename="../mainwindow.ui" line="2789"/>
        <location filename="../mainwindow.ui" line="3024"/>
        <location filename="../build/Desktop-Debug/VBDriveWizard_autogen/include/ui_mainwindow.h" line="2546"/>
        <location filename="../build/Desktop-Debug/VBDriveWizard_autogen/include/ui_mainwindow.h" line="2552"/>
        <source>Triangle</source>
        <translation>Треуг.</translation>
    </message>
    <message>
        <location filename="../mainwindow.ui" line="2949"/>
        <location filename="../build/Desktop-Debug/VBDriveWizard_autogen/include/ui_mainwindow.h" line="2569"/>
        <source>MIT</source>
        <translation>MIT</translation>
    </message>
    <message>
        <location filename="../mainwindow.ui" line="2970"/>
        <location filename="../build/Desktop-Debug/VBDriveWizard_autogen/include/ui_mainwindow.h" line="2548"/>
        <source>Trajectory</source>
        <translation>Траектория</translation>
    </message>
    <message>
        <location filename="../mainwindow.ui" line="2991"/>
        <location filename="../build/Desktop-Debug/VBDriveWizard_autogen/include/ui_mainwindow.h" line="2549"/>
        <source>Step</source>
        <translation>Ступень</translation>
    </message>
    <message>
        <location filename="../mainwindow.ui" line="3072"/>
        <location filename="../build/Desktop-Debug/VBDriveWizard_autogen/include/ui_mainwindow.h" line="2553"/>
        <source>Step Targets</source>
        <translation>Параметры ступени</translation>
    </message>
    <message>
        <location filename="../mainwindow.ui" line="3189"/>
        <location filename="../mainwindow.ui" line="3427"/>
        <location filename="../build/Desktop-Debug/VBDriveWizard_autogen/include/ui_mainwindow.h" line="2557"/>
        <location filename="../build/Desktop-Debug/VBDriveWizard_autogen/include/ui_mainwindow.h" line="2566"/>
        <source>Kp</source>
        <translation>Kp</translation>
    </message>
    <message>
        <location filename="../mainwindow.ui" line="3219"/>
        <location filename="../mainwindow.ui" line="3457"/>
        <location filename="../build/Desktop-Debug/VBDriveWizard_autogen/include/ui_mainwindow.h" line="2558"/>
        <location filename="../build/Desktop-Debug/VBDriveWizard_autogen/include/ui_mainwindow.h" line="2567"/>
        <source>Kd</source>
        <translation>Kd</translation>
    </message>
    <message>
        <location filename="../mainwindow.ui" line="3271"/>
        <location filename="../build/Desktop-Debug/VBDriveWizard_autogen/include/ui_mainwindow.h" line="2559"/>
        <source>Trajectory Targets</source>
        <translation>Параметры траектории</translation>
    </message>
    <message>
        <location filename="../mainwindow.ui" line="3360"/>
        <location filename="../build/Desktop-Debug/VBDriveWizard_autogen/include/ui_mainwindow.h" line="2563"/>
        <source>+derivative</source>
        <translation>+производная</translation>
    </message>
    <message>
        <location filename="../mainwindow.ui" line="3553"/>
        <location filename="../build/Desktop-Debug/VBDriveWizard_autogen/include/ui_mainwindow.h" line="2570"/>
        <source>STATUS</source>
        <translation>СОСТОЯНИЕ</translation>
    </message>
    <message>
        <location filename="../mainwindow.ui" line="400"/>
        <location filename="../mainwindow.ui" line="3577"/>
        <location filename="../build/Desktop-Debug/VBDriveWizard_autogen/include/ui_mainwindow.h" line="2413"/>
        <location filename="../build/Desktop-Debug/VBDriveWizard_autogen/include/ui_mainwindow.h" line="2571"/>
        <source>Model</source>
        <translation>Модель</translation>
    </message>
    <message>
        <location filename="../mainwindow.ui" line="1743"/>
        <location filename="../build/Desktop-Debug/VBDriveWizard_autogen/include/ui_mainwindow.h" line="2502"/>
        <source>Play/Pause Plot Data</source>
        <translation type="unfinished"></translation>
    </message>
    <message>
        <location filename="../mainwindow.ui" line="1783"/>
        <location filename="../build/Desktop-Debug/VBDriveWizard_autogen/include/ui_mainwindow.h" line="2510"/>
        <source>Crosshair</source>
        <translation>Курсор</translation>
    </message>
    <message>
        <location filename="../mainwindow.ui" line="1763"/>
        <location filename="../build/Desktop-Debug/VBDriveWizard_autogen/include/ui_mainwindow.h" line="2506"/>
        <source>Save as...</source>
        <translation>Сохранить как...</translation>
    </message>
    <message>
        <location filename="../mainwindow.ui" line="1435"/>
        <location filename="../build/Desktop-Debug/VBDriveWizard_autogen/include/ui_mainwindow.h" line="2475"/>
        <source>Local file</source>
        <translation>Файл</translation>
    </message>
    <message>
        <location filename="../mainwindow.ui" line="1448"/>
        <location filename="../build/Desktop-Debug/VBDriveWizard_autogen/include/ui_mainwindow.h" line="2476"/>
        <source>Remote repo</source>
        <translation>Репозиторий</translation>
    </message>
    <message>
        <location filename="../mainwindow.ui" line="3584"/>
        <location filename="../build/Desktop-Debug/VBDriveWizard_autogen/include/ui_mainwindow.h" line="2572"/>
        <source>M4310R10</source>
        <translation>M4310R10</translation>
    </message>
    <message>
        <location filename="../mainwindow.ui" line="3598"/>
        <location filename="../build/Desktop-Debug/VBDriveWizard_autogen/include/ui_mainwindow.h" line="2574"/>
        <source>Temperature MCU</source>
        <translation>Температура МК</translation>
    </message>
    <message>
        <location filename="../mainwindow.ui" line="3605"/>
        <location filename="../mainwindow.ui" line="3626"/>
        <location filename="../mainwindow.ui" line="3647"/>
        <location filename="../mainwindow.ui" line="3668"/>
        <location filename="../mainwindow.ui" line="3689"/>
        <location filename="../mainwindow.ui" line="3710"/>
        <location filename="../mainwindow.ui" line="3731"/>
        <location filename="../build/Desktop-Debug/VBDriveWizard_autogen/include/ui_mainwindow.h" line="2575"/>
        <location filename="../build/Desktop-Debug/VBDriveWizard_autogen/include/ui_mainwindow.h" line="2578"/>
        <location filename="../build/Desktop-Debug/VBDriveWizard_autogen/include/ui_mainwindow.h" line="2581"/>
        <location filename="../build/Desktop-Debug/VBDriveWizard_autogen/include/ui_mainwindow.h" line="2584"/>
        <location filename="../build/Desktop-Debug/VBDriveWizard_autogen/include/ui_mainwindow.h" line="2587"/>
        <location filename="../build/Desktop-Debug/VBDriveWizard_autogen/include/ui_mainwindow.h" line="2590"/>
        <location filename="../build/Desktop-Debug/VBDriveWizard_autogen/include/ui_mainwindow.h" line="2593"/>
        <source>TextLabel</source>
        <translation>TextLabel</translation>
    </message>
    <message>
        <location filename="../mainwindow.ui" line="3612"/>
        <location filename="../mainwindow.ui" line="3633"/>
        <location filename="../build/Desktop-Debug/VBDriveWizard_autogen/include/ui_mainwindow.h" line="2576"/>
        <location filename="../build/Desktop-Debug/VBDriveWizard_autogen/include/ui_mainwindow.h" line="2579"/>
        <source>C</source>
        <translation>C</translation>
    </message>
    <message>
        <location filename="../mainwindow.ui" line="3619"/>
        <location filename="../build/Desktop-Debug/VBDriveWizard_autogen/include/ui_mainwindow.h" line="2577"/>
        <source>Temperature Stator</source>
        <translation>Температура статора</translation>
    </message>
    <message>
        <location filename="../mainwindow.ui" line="3640"/>
        <location filename="../build/Desktop-Debug/VBDriveWizard_autogen/include/ui_mainwindow.h" line="2580"/>
        <source>Bus Voltage</source>
        <translation>Напряжение шины</translation>
    </message>
    <message>
        <location filename="../mainwindow.ui" line="3654"/>
        <location filename="../build/Desktop-Debug/VBDriveWizard_autogen/include/ui_mainwindow.h" line="2582"/>
        <source>V</source>
        <translation>V</translation>
    </message>
    <message>
        <location filename="../mainwindow.ui" line="3682"/>
        <location filename="../build/Desktop-Debug/VBDriveWizard_autogen/include/ui_mainwindow.h" line="2586"/>
        <source>Motor Encoder</source>
        <translation>Энкодер ротора</translation>
    </message>
    <message>
        <location filename="../mainwindow.ui" line="3696"/>
        <location filename="../mainwindow.ui" line="3717"/>
        <location filename="../mainwindow.ui" line="3738"/>
        <location filename="../build/Desktop-Debug/VBDriveWizard_autogen/include/ui_mainwindow.h" line="2588"/>
        <location filename="../build/Desktop-Debug/VBDriveWizard_autogen/include/ui_mainwindow.h" line="2591"/>
        <location filename="../build/Desktop-Debug/VBDriveWizard_autogen/include/ui_mainwindow.h" line="2594"/>
        <source>-</source>
        <translation>-</translation>
    </message>
    <message>
        <location filename="../mainwindow.ui" line="3703"/>
        <location filename="../build/Desktop-Debug/VBDriveWizard_autogen/include/ui_mainwindow.h" line="2589"/>
        <source>Shaft Encoder</source>
        <translation>Энкодер вала</translation>
    </message>
    <message>
        <location filename="../mainwindow.ui" line="3724"/>
        <location filename="../build/Desktop-Debug/VBDriveWizard_autogen/include/ui_mainwindow.h" line="2592"/>
        <source>Fault</source>
        <translation>Ошибка</translation>
    </message>
    <message>
        <location filename="../mainwindow.ui" line="3784"/>
        <location filename="../build/Desktop-Debug/VBDriveWizard_autogen/include/ui_mainwindow.h" line="2596"/>
        <source>STOP</source>
        <translation>СТОП</translation>
    </message>
    <message>
        <location filename="../mainwindow.cpp" line="273"/>
        <source>Reconnect failed</source>
        <translation>Не удалось переподключиться</translation>
    </message>
    <message>
        <location filename="../mainwindow.cpp" line="274"/>
        <source>The actuator did not answer after flashing; connect again by hand.

%1</source>
        <translation>Привод не ответил после прошивки; подключитесь заново вручную.

%1</translation>
    </message>
    <message>
        <location filename="../mainwindow.cpp" line="279"/>
        <location filename="../mainwindow.cpp" line="291"/>
        <location filename="../mainwindow.cpp" line="1028"/>
        <location filename="../mainwindow.cpp" line="1060"/>
        <source>Connection failed</source>
        <translation>Не удалось подключиться</translation>
    </message>
    <message>
        <location filename="../mainwindow.cpp" line="314"/>
        <source>Firmware download failed</source>
        <translation>Не удалось загрузить прошивку</translation>
    </message>
    <message>
        <location filename="../mainwindow.cpp" line="318"/>
        <source>Downloaded firmware %1.</source>
        <translation>Прошивка %1 загружена.</translation>
    </message>
    <message>
        <location filename="../mainwindow.cpp" line="338"/>
        <source>Flashing failed</source>
        <translation>Не удалось прошить</translation>
    </message>
    <message>
        <location filename="../mainwindow.cpp" line="485"/>
        <location filename="../mainwindow.cpp" line="487"/>
        <location filename="../mainwindow.cpp" line="911"/>
        <location filename="../mainwindow.cpp" line="1172"/>
        <location filename="../mainwindow.cpp" line="1173"/>
        <source>Disconnect</source>
        <translation>Отключить</translation>
    </message>
    <message>
        <source>Resume</source>
        <translation type="vanished">Продолжить</translation>
    </message>
    <message>
        <location filename="../mainwindow.cpp" line="1311"/>
        <source>No actuators found - press refresh</source>
        <translation>Устройства не найдены - нажмите обновить</translation>
    </message>
    <message>
        <location filename="../mainwindow.cpp" line="201"/>
        <location filename="../mainwindow.cpp" line="495"/>
        <location filename="../mainwindow.cpp" line="1113"/>
        <source>Not connected</source>
        <translation>Не подключено</translation>
    </message>
    <message>
        <location filename="../mainwindow.cpp" line="513"/>
        <location filename="../mainwindow.cpp" line="1372"/>
        <source>Unsaved changes</source>
        <translation>Несохранённые изменения</translation>
    </message>
    <message>
        <location filename="../mainwindow.cpp" line="514"/>
        <source>Some register changes have not been written to the actuator.
Close anyway?</source>
        <translation>Часть изменений регистров не записана в привод.
Всё равно закрыть?</translation>
    </message>
    <message>
        <location filename="../mainwindow.cpp" line="543"/>
        <location filename="../mainwindow.cpp" line="1021"/>
        <source>Disconnecting...</source>
        <translation>Отключение...</translation>
    </message>
    <message>
        <location filename="../mainwindow.cpp" line="959"/>
        <source>%1 (unavailable)</source>
        <translation>%1 (недоступен)</translation>
    </message>
    <message>
        <location filename="../mainwindow.cpp" line="1028"/>
        <source>No serial port selected.</source>
        <translation>Serial-порт не выбран.</translation>
    </message>
    <message>
        <location filename="../mainwindow.cpp" line="1038"/>
        <source>Opening %1...</source>
        <translation>Открытие %1...</translation>
    </message>
    <message>
        <location filename="../mainwindow.cpp" line="1066"/>
        <source>Listening for actuators on %1...</source>
        <translation>Поиск приводов на %1...</translation>
    </message>
    <message>
        <location filename="../mainwindow.cpp" line="1096"/>
        <source>Serial connected</source>
        <translation>Serial подключён</translation>
    </message>
    <message>
        <location filename="../mainwindow.cpp" line="1097"/>
        <source>CAN connected</source>
        <translation>CAN подключён</translation>
    </message>
    <message>
        <location filename="../mainwindow.cpp" line="1114"/>
        <source>Disconnected.</source>
        <translation>Отключено.</translation>
    </message>
    <message>
        <source>Sort by model</source>
        <translation type="vanished">Сортировать по модели</translation>
    </message>
    <message>
        <source>Sort by Node ID</source>
        <translation type="vanished">Сортировать по Node ID</translation>
    </message>
    <message>
        <location filename="../mainwindow.cpp" line="1297"/>
        <source>  (no heartbeat)</source>
        <translation>  (нет heartbeat)</translation>
    </message>
    <message>
        <location filename="../mainwindow.cpp" line="1373"/>
        <source>Actuator %1 has register changes that were not written.
Write them before switching?</source>
        <translation>У привода %1 есть незаписанные изменения регистров.
Записать их перед переключением?</translation>
    </message>
    <message>
        <location filename="../mainwindow.cpp" line="1445"/>
        <source>Reading registers...</source>
        <translation>Чтение регистров...</translation>
    </message>
    <message>
        <location filename="../mainwindow.cpp" line="1456"/>
        <source>No changes to write.</source>
        <translation>Нет изменений для записи.</translation>
    </message>
    <message numerus="yes">
        <location filename="../mainwindow.cpp" line="1492"/>
        <source>Writing %n register(s), the actuator restarts to apply them...</source>
        <translation>
            <numerusform>Запись %n регистра, привод перезапустится для применения...</numerusform>
            <numerusform>Запись %n регистров, привод перезапустится для применения...</numerusform>
            <numerusform>Запись %n регистров, привод перезапустится для применения...</numerusform>
        </translation>
    </message>
    <message numerus="yes">
        <location filename="../mainwindow.cpp" line="1497"/>
        <source>Writing %n register(s)...</source>
        <translation>
            <numerusform>Запись %n регистра...</numerusform>
            <numerusform>Запись %n регистров...</numerusform>
            <numerusform>Запись %n регистров...</numerusform>
        </translation>
    </message>
    <message>
        <location filename="../mainwindow.cpp" line="1524"/>
        <source>Origin set; angle offset is now %1.</source>
        <translation>Ноль задан; смещение угла теперь %1.</translation>
    </message>
    <message>
        <location filename="../mainwindow.cpp" line="1534"/>
        <source>Calibrate sensor</source>
        <translation>Калибровка датчика</translation>
    </message>
    <message>
        <location filename="../mainwindow.cpp" line="1535"/>
        <source>Calibration moves the motor and cannot be cancelled. The actuator stops answering until it finishes.

Start calibration?</source>
        <translation>Калибровка вращает двигатель и не может быть прервана. Привод не отвечает до её завершения.

Начать калибровку?</translation>
    </message>
    <message>
        <location filename="../mainwindow.cpp" line="1544"/>
        <source>Calibration started; the actuator will not answer until it is done.</source>
        <translation>Калибровка запущена; привод не будет отвечать до её окончания.</translation>
    </message>
    <message>
        <location filename="../mainwindow.cpp" line="1566"/>
        <source>Save register profile</source>
        <translation>Сохранить профиль регистров</translation>
    </message>
    <message>
        <location filename="../mainwindow.cpp" line="1569"/>
        <location filename="../mainwindow.cpp" line="1592"/>
        <source>YAML files (*.yaml *.yml)</source>
        <translation>Файлы YAML (*.yaml *.yml)</translation>
    </message>
    <message>
        <location filename="../mainwindow.cpp" line="1583"/>
        <source>Could not save the profile</source>
        <translation>Не удалось сохранить профиль</translation>
    </message>
    <message>
        <location filename="../mainwindow.cpp" line="1585"/>
        <source>Profile saved to %1.</source>
        <translation>Профиль сохранён в %1.</translation>
    </message>
    <message>
        <location filename="../mainwindow.cpp" line="1591"/>
        <source>Load register profile</source>
        <translation>Загрузить профиль регистров</translation>
    </message>
    <message>
        <location filename="../mainwindow.cpp" line="1600"/>
        <source>Could not load the profile</source>
        <translation>Не удалось загрузить профиль</translation>
    </message>
    <message numerus="yes">
        <location filename="../mainwindow.cpp" line="1605"/>
        <source>Loaded %n register(s) from the profile.</source>
        <translation>
            <numerusform>Из профиля загружен %n регистр.</numerusform>
            <numerusform>Из профиля загружено %n регистра.</numerusform>
            <numerusform>Из профиля загружено %n регистров.</numerusform>
        </translation>
    </message>
    <message>
        <location filename="../mainwindow.cpp" line="1607"/>
        <source>Loaded with warnings: %1</source>
        <translation>Загружено с предупреждениями: %1</translation>
    </message>
    <message>
        <location filename="../mainwindow.cpp" line="1623"/>
        <source>Could not load the default profile</source>
        <translation>Не удалось загрузить профиль по умолчанию</translation>
    </message>
    <message>
        <location filename="../mainwindow.cpp" line="1627"/>
        <source>Default values for %1 loaded into the editors.</source>
        <translation>Значения по умолчанию для %1 загружены в поля.</translation>
    </message>
    <message>
        <location filename="../mainwindow.cpp" line="1655"/>
        <source>Could not read &apos;%1&apos;: %2</source>
        <translation>Не удалось прочитать «%1»: %2</translation>
    </message>
    <message>
        <location filename="../mainwindow.cpp" line="1703"/>
        <source>Could not write &apos;%1&apos;: %2</source>
        <translation>Не удалось записать «%1»: %2</translation>
    </message>
    <message>
        <location filename="../mainwindow.cpp" line="1719"/>
        <source>Registers written.</source>
        <translation>Регистры записаны.</translation>
    </message>
    <message>
        <location filename="../mainwindow.cpp" line="1729"/>
        <source>Some registers were not written</source>
        <translation>Часть регистров не записана</translation>
    </message>
    <message>
        <location filename="../mainwindow.cpp" line="1735"/>
        <source>The actuator is not calibrated. Please calibrate the actuator to start working.</source>
        <translation>Привод не откалиброван. Пожалуйста, откалибруйте привод, чтобы начать работу.</translation>
    </message>
    <message>
        <location filename="../mainwindow.cpp" line="1742"/>
        <source>Actuator not calibrated</source>
        <translation>Привод не откалиброван</translation>
    </message>
    <message>
        <location filename="../mainwindow.cpp" line="1790"/>
        <source>Actuator lost</source>
        <translation>Связь с приводом потеряна</translation>
    </message>
    <message>
        <location filename="../mainwindow.cpp" line="1791"/>
        <source>Actuator %1 (node %2) stopped sending heartbeats.</source>
        <translation>Привод %1 (узел %2) перестал отправлять heartbeat.</translation>
    </message>
    <message>
        <location filename="../mainwindow.cpp" line="1794"/>
        <source>Wait for it to come back, keeping your unsaved register changes, or drop it and discard them?</source>
        <translation>Дождаться его возвращения, сохранив несохранённые изменения регистров, или убрать привод и отменить их?</translation>
    </message>
    <message>
        <location filename="../mainwindow.cpp" line="1796"/>
        <source>Reconnect</source>
        <translation>Подключить снова</translation>
    </message>
    <message>
        <location filename="../mainwindow.cpp" line="1797"/>
        <source>Remove actuator</source>
        <translation>Убрать привод</translation>
    </message>
    <message>
        <location filename="../mainwindow.cpp" line="1809"/>
        <source>Waiting for node %1 to return...</source>
        <translation>Ожидание возвращения узла %1...</translation>
    </message>
    <message>
        <location filename="../mainwindow.cpp" line="1831"/>
        <source>The actuator restarted with the new settings.</source>
        <translation>Привод перезапущен с новыми настройками.</translation>
    </message>
    <message>
        <location filename="../mainwindow.cpp" line="1844"/>
        <source>Node %1 is back.</source>
        <translation>Узел %1 снова на связи.</translation>
    </message>
    <message>
        <location filename="../mainwindow.cpp" line="1932"/>
        <source>Yes</source>
        <translation>Да</translation>
    </message>
    <message>
        <location filename="../mainwindow.cpp" line="1932"/>
        <source>No</source>
        <translation>Нет</translation>
    </message>
    <message>
        <location filename="../mainwindow.cpp" line="2071"/>
        <source>Target vel:</source>
        <translation>Команда:</translation>
    </message>
    <message>
        <location filename="../mainwindow.cpp" line="2072"/>
        <source>Target torq:</source>
        <translation>Команда:</translation>
    </message>
    <message>
        <location filename="../mainwindow.cpp" line="2355"/>
        <source>Serial cannot sustain %1 Hz; running at %2 Hz instead.</source>
        <translation>Serial не выдерживает %1 Гц; используется %2 Гц.</translation>
    </message>
    <message>
        <location filename="../mainwindow.cpp" line="2423"/>
        <source>Feedback gains written.</source>
        <translation>Коэффициенты регулятора записаны.</translation>
    </message>
    <message>
        <location filename="../mainwindow.cpp" line="2442"/>
        <source>Transient form written.</source>
        <translation>Параметры переходного процесса записаны.</translation>
    </message>
    <message>
        <location filename="../mainwindow.cpp" line="2457"/>
        <source>Emergency stop: all actuators disabled.</source>
        <translation>Аварийная остановка: все приводы выключены.</translation>
    </message>
    <message>
        <location filename="../mainwindow.cpp" line="2590"/>
        <source>Pause the plot</source>
        <translation>Приостановить график</translation>
    </message>
    <message>
        <location filename="../mainwindow.cpp" line="2590"/>
        <source>Resume the plot</source>
        <translation>Возобновить график</translation>
    </message>
    <message>
        <location filename="../mainwindow.cpp" line="2620"/>
        <source>No file was selected.</source>
        <translation>Файл не выбран.</translation>
    </message>
    <message>
        <location filename="../mainwindow.cpp" line="2624"/>
        <source>Save plot</source>
        <translation>Сохранение графика</translation>
    </message>
    <message>
        <location filename="../mainwindow.cpp" line="2625"/>
        <source>%1 already exists. Overwrite it?</source>
        <translation>%1 уже существует. Перезаписать?</translation>
    </message>
    <message>
        <location filename="../mainwindow.cpp" line="2651"/>
        <source>Saved to %1.</source>
        <translation>Сохранено в %1.</translation>
    </message>
    <message>
        <location filename="../mainwindow.cpp" line="2653"/>
        <source>Could not save the plot</source>
        <translation>Не удалось сохранить график</translation>
    </message>
    <message>
        <location filename="../mainwindow.cpp" line="1130"/>
        <source>Emergency stop</source>
        <translation>Экстренная остановка</translation>
    </message>
    <message>
        <location filename="../mainwindow.cpp" line="347"/>
        <source>Firmware flashed</source>
        <translation>Прошивка записана</translation>
    </message>
    <message>
        <location filename="../mainwindow.cpp" line="348"/>
        <source>Restart the actuator and press OK.</source>
        <translation>Перезапустите привод и нажмите OK.</translation>
    </message>
    <message>
        <location filename="../mainwindow.cpp" line="362"/>
        <source>%1 Connect to the actuator from CONNECTION.</source>
        <translation>%1 Подключитесь к приводу в панели ПОДКЛЮЧЕНИЕ.</translation>
    </message>
    <message>
        <location filename="../mainwindow.cpp" line="1131"/>
        <source>The actuator has been stopped by the emergency stop. To resume, restart the actuator and connect to it again.</source>
        <translation>Привод экстренно остановлен. Для возобновления работы перезагрузите привод и заново подключитесь к нему</translation>
    </message>
    <message>
        <location filename="../mainwindow.cpp" line="2492"/>
        <source>Stop</source>
        <translation>Стоп</translation>
    </message>
    <message>
        <location filename="../mainwindow.cpp" line="2598"/>
        <source>s</source>
        <translation>с</translation>
    </message>
    <message>
        <source>Save plot data</source>
        <translation type="vanished">Сохранить данные графика</translation>
    </message>
    <message>
        <source>CSV files (*.csv)</source>
        <translation type="vanished">Файлы CSV (*.csv)</translation>
    </message>
    <message>
        <source>Could not save the CSV</source>
        <translation type="vanished">Не удалось сохранить CSV</translation>
    </message>
    <message>
        <source>Plot data saved.</source>
        <translation type="vanished">Данные графика сохранены.</translation>
    </message>
    <message>
        <source>Save plot image</source>
        <translation type="vanished">Сохранить изображение графика</translation>
    </message>
    <message>
        <source>PNG images (*.png)</source>
        <translation type="vanished">Изображения PNG (*.png)</translation>
    </message>
    <message>
        <source>Could not save the image</source>
        <translation type="vanished">Не удалось сохранить изображение</translation>
    </message>
    <message>
        <source>Plot image saved.</source>
        <translation type="vanished">Изображение графика сохранено.</translation>
    </message>
    <message>
        <location filename="../mainwindow.cpp" line="2677"/>
        <source>Select firmware image</source>
        <translation>Выбрать файл прошивки</translation>
    </message>
    <message>
        <location filename="../mainwindow.cpp" line="2678"/>
        <source>Intel HEX files (*.hex)</source>
        <translation>Файлы Intel HEX (*.hex)</translation>
    </message>
    <message>
        <location filename="../mainwindow.cpp" line="2682"/>
        <source>Selected %1.</source>
        <translation>Выбрано: %1.</translation>
    </message>
    <message>
        <location filename="../mainwindow.cpp" line="2694"/>
        <source>No firmware selected</source>
        <translation>Прошивка не выбрана</translation>
    </message>
    <message>
        <location filename="../mainwindow.cpp" line="2695"/>
        <source>Choose a .hex file first, or switch to downloading the latest release.</source>
        <translation>Сначала выберите .hex-файл или переключитесь на загрузку последнего релиза.</translation>
    </message>
    <message>
        <location filename="../mainwindow.cpp" line="2720"/>
        <source>Flashing %1...</source>
        <translation>Прошивка %1...</translation>
    </message>
    <message>
        <location filename="../mainwindow.cpp" line="2736"/>
        <source>Reconnecting to the flashed actuator...</source>
        <translation>Переподключение к прошитому приводу...</translation>
    </message>
    <message>
        <location filename="../mainwindow.cpp" line="2762"/>
        <source>Reconnecting to %1...</source>
        <translation>Переподключение к %1...</translation>
    </message>
</context>
<context>
    <name>PlotController</name>
    <message>
        <location filename="../ui/plot_controller.cpp" line="149"/>
        <source>t, s</source>
        <translation>t, с</translation>
    </message>
    <message>
        <location filename="../ui/plot_controller.cpp" line="174"/>
        <source>Position</source>
        <translation>Положение</translation>
    </message>
    <message>
        <location filename="../ui/plot_controller.cpp" line="176"/>
        <source>Velocity</source>
        <translation>Скорость</translation>
    </message>
    <message>
        <location filename="../ui/plot_controller.cpp" line="178"/>
        <source>Torque</source>
        <translation>Момент</translation>
    </message>
    <message>
        <location filename="../ui/plot_controller.cpp" line="180"/>
        <source>MCU</source>
        <translation>МК</translation>
    </message>
    <message>
        <location filename="../ui/plot_controller.cpp" line="182"/>
        <source>Bus current</source>
        <translation>Ток шины</translation>
    </message>
    <message>
        <location filename="../ui/plot_controller.cpp" line="184"/>
        <source>Rotor</source>
        <translation>Ротор</translation>
    </message>
    <message>
        <location filename="../ui/plot_controller.cpp" line="197"/>
        <source>Target</source>
        <translation>Задание</translation>
    </message>
    <message>
        <location filename="../ui/plot_controller.cpp" line="199"/>
        <source>Stator</source>
        <translation>Статор</translation>
    </message>
    <message>
        <location filename="../ui/plot_controller.cpp" line="201"/>
        <source>Shaft</source>
        <translation>Вал</translation>
    </message>
    <message>
        <location filename="../ui/plot_controller.cpp" line="212"/>
        <source>Position, %1</source>
        <translation>Положение, %1</translation>
    </message>
    <message>
        <location filename="../ui/plot_controller.cpp" line="214"/>
        <source>Velocity, %1</source>
        <translation>Скорость, %1</translation>
    </message>
    <message>
        <location filename="../ui/plot_controller.cpp" line="217"/>
        <source>Torque, N*m</source>
        <translation>Момент, Н·м</translation>
    </message>
    <message>
        <location filename="../ui/plot_controller.cpp" line="219"/>
        <source>Temperature, C</source>
        <translation>Температура, °C</translation>
    </message>
    <message>
        <location filename="../ui/plot_controller.cpp" line="221"/>
        <source>Current, A</source>
        <translation>Ток, А</translation>
    </message>
    <message>
        <location filename="../ui/plot_controller.cpp" line="223"/>
        <source>Encoder, counts</source>
        <translation>Энкодер, отсчёты</translation>
    </message>
    <message>
        <location filename="../ui/plot_controller.cpp" line="590"/>
        <location filename="../ui/plot_controller.cpp" line="615"/>
        <source>The plot is not initialised.</source>
        <translation>График не инициализирован.</translation>
    </message>
    <message>
        <location filename="../ui/plot_controller.cpp" line="595"/>
        <source>The log view cannot be exported as an image.</source>
        <translation>Журнал нельзя сохранить как изображение.</translation>
    </message>
    <message>
        <source>The plot could not be rendered.</source>
        <translation type="vanished">Не удалось отрисовать график.</translation>
    </message>
    <message>
        <source>Could not write %1.</source>
        <translation type="vanished">Не удалось записать %1.</translation>
    </message>
    <message>
        <location filename="../ui/plot_controller.cpp" line="623"/>
        <location filename="../ui/plot_controller.cpp" line="631"/>
        <location filename="../ui/plot_controller.cpp" line="640"/>
        <location filename="../ui/plot_controller.cpp" line="676"/>
        <source>Could not write %1: %2</source>
        <translation>Не удалось записать %1: %2</translation>
    </message>
</context>
<context>
    <name>PlotCrosshairTool</name>
    <message>
        <location filename="../ui/plot_crosshair.cpp" line="59"/>
        <source>t, s</source>
        <translation>t, с</translation>
    </message>
</context>
<context>
    <name>PreferencesDialog</name>
    <message>
        <location filename="../ui/preferences_dialog.ui" line="59"/>
        <source>Language:</source>
        <translation>Язык:</translation>
    </message>
    <message>
        <location filename="../ui/preferences_dialog.ui" line="14"/>
        <source>Preferences</source>
        <translation>Настройки</translation>
    </message>
    <message>
        <location filename="../ui/preferences_dialog.ui" line="35"/>
        <source>Appearance</source>
        <translation>Оформление</translation>
    </message>
    <message>
        <location filename="../ui/preferences_dialog.ui" line="97"/>
        <source>Theme:</source>
        <translation>Тема:</translation>
    </message>
    <message>
        <location filename="../ui/preferences_dialog.ui" line="105"/>
        <source>Dark</source>
        <translation>Тёмная</translation>
    </message>
    <message>
        <location filename="../ui/preferences_dialog.ui" line="110"/>
        <source>Light</source>
        <translation>Светлая</translation>
    </message>
    <message>
        <location filename="../ui/preferences_dialog.ui" line="118"/>
        <source>Interface font size, pt:</source>
        <translation>Размер шрифта интерфейса, пт:</translation>
    </message>
    <message>
        <location filename="../ui/preferences_dialog.ui" line="138"/>
        <source>Plot</source>
        <translation>График</translation>
    </message>
    <message>
        <location filename="../ui/preferences_dialog.ui" line="162"/>
        <source>Plot font size, pt:</source>
        <translation>Размер шрифта графика, пт:</translation>
    </message>
    <message>
        <location filename="../ui/preferences_dialog.ui" line="179"/>
        <source>Line width, px:</source>
        <translation>Толщина линии, пикс:</translation>
    </message>
    <message>
        <location filename="../ui/preferences_dialog.ui" line="196"/>
        <source>Time window, s:</source>
        <translation>Временное окно, с:</translation>
    </message>
    <message>
        <location filename="../ui/preferences_dialog.ui" line="219"/>
        <source>Redraw rate, Hz:</source>
        <translation>Частота перерисовки, Гц:</translation>
    </message>
    <message>
        <location filename="../ui/preferences_dialog.ui" line="239"/>
        <source>Connection</source>
        <translation>Подключение</translation>
    </message>
    <message>
        <location filename="../ui/preferences_dialog.ui" line="263"/>
        <source>This application&apos;s Cyphal node ID:</source>
        <translation>Cyphal Node ID этого приложения:</translation>
    </message>
    <message>
        <location filename="../ui/preferences_dialog.ui" line="280"/>
        <source>Serial baud rate:</source>
        <translation>Скорость Serial-порта:</translation>
    </message>
    <message>
        <location filename="../ui/preferences_dialog.ui" line="303"/>
        <source>Firmware flashing (OpenOCD)</source>
        <translation>Прошивка (OpenOCD)</translation>
    </message>
    <message>
        <location filename="../ui/preferences_dialog.ui" line="327"/>
        <source>Interface config:</source>
        <translation>Конфигурация интерфейса:</translation>
    </message>
    <message>
        <location filename="../ui/preferences_dialog.ui" line="338"/>
        <source>Target config:</source>
        <translation>Конфигурация цели:</translation>
    </message>
    <message>
        <location filename="../ui/preferences_dialog.cpp" line="24"/>
        <source>OpenOCD interface script, relative to its scripts directory.
VBDrive is programmed over SWD with an ST-Link.</source>
        <translation>Скрипт интерфейса OpenOCD относительно его каталога scripts.
VBDrive программируется по SWD через ST-Link.</translation>
    </message>
    <message>
        <location filename="../ui/preferences_dialog.cpp" line="27"/>
        <source>OpenOCD target script. VBDrive uses an STM32G431VB.</source>
        <translation>Скрипт цели OpenOCD. В VBDrive используется STM32G431VB.</translation>
    </message>
    <message>
        <location filename="../ui/preferences_dialog.cpp" line="29"/>
        <source>Node ID this application announces on the CAN bus.
It must not collide with any actuator.</source>
        <translation>Node ID, который приложение объявляет на шине CAN.
Он не должен совпадать с Node ID приводов.</translation>
    </message>
</context>
<context>
    <name>RegisterYaml</name>
    <message>
        <location filename="../core/register_yaml.cpp" line="33"/>
        <source>File does not exist: %1</source>
        <translation>Файл не существует: %1</translation>
    </message>
    <message>
        <location filename="../core/register_yaml.cpp" line="43"/>
        <source>Cannot parse %1: %2</source>
        <translation>Не удалось разобрать %1: %2</translation>
    </message>
    <message>
        <location filename="../core/register_yaml.cpp" line="50"/>
        <source>%1 is not a map of register names to values.</source>
        <translation>%1 не содержит отображение «имя регистра: значение».</translation>
    </message>
    <message>
        <location filename="../core/register_yaml.cpp" line="61"/>
        <source>unknown register &apos;%1&apos;</source>
        <translation>неизвестный регистр «%1»</translation>
    </message>
    <message>
        <location filename="../core/register_yaml.cpp" line="67"/>
        <source>&apos;%1&apos; does not hold a single value</source>
        <translation>«%1» содержит не одно значение</translation>
    </message>
    <message>
        <location filename="../core/register_yaml.cpp" line="75"/>
        <source>&apos;%1&apos; has a value of the wrong type</source>
        <translation>у «%1» значение неверного типа</translation>
    </message>
    <message>
        <location filename="../core/register_yaml.cpp" line="85"/>
        <source>%1 contains no recognised registers.</source>
        <translation>В %1 нет ни одного известного регистра.</translation>
    </message>
    <message>
        <location filename="../core/register_yaml.cpp" line="98"/>
        <location filename="../core/register_yaml.cpp" line="124"/>
        <source>Cannot write %1: %2</source>
        <translation>Не удалось записать %1: %2</translation>
    </message>
</context>
<context>
    <name>RestoreLabel</name>
    <message>
        <location filename="../ui/restore_label.cpp" line="21"/>
        <source>Restore the value this field had when the actuator was selected</source>
        <translation>Вернуть значение, которое было при выборе привода</translation>
    </message>
</context>
<context>
    <name>RestoreModelDialog</name>
    <message>
        <location filename="../ui/restore_model_dialog.ui" line="14"/>
        <source>Restore Default Registers</source>
        <translation>Восстановление значений по умолчанию</translation>
    </message>
    <message>
        <location filename="../ui/restore_model_dialog.ui" line="35"/>
        <source>Load the factory register profile for this actuator model. The values are placed in the editors; nothing is written to the actuator until you press Write.</source>
        <translation>Загрузить заводской профиль регистров для этой модели привода. Значения попадут в поля; в привод ничего не записывается, пока вы не нажмёте «Записать».</translation>
    </message>
    <message>
        <location filename="../ui/restore_model_dialog.ui" line="62"/>
        <source>Actuator model:</source>
        <translation>Модель привода:</translation>
    </message>
    <message>
        <location filename="../ui/restore_model_dialog.ui" line="70"/>
        <source>M4310R10</source>
        <translation>M4310R10</translation>
    </message>
    <message>
        <location filename="../ui/restore_model_dialog.ui" line="75"/>
        <source>M4310R36</source>
        <translation>M4310R36</translation>
    </message>
</context>
<context>
    <name>SaveFileDialog</name>
    <message>
        <location filename="../ui/save_file_dialog.ui" line="14"/>
        <location filename="../ui/save_file_dialog.cpp" line="142"/>
        <source>Save Plot</source>
        <translation>Сохранение графика</translation>
    </message>
    <message>
        <location filename="../ui/save_file_dialog.ui" line="22"/>
        <source>Address</source>
        <translation>Путь</translation>
    </message>
    <message>
        <location filename="../ui/save_file_dialog.ui" line="32"/>
        <source>Browse</source>
        <translation>Обзор</translation>
    </message>
    <message>
        <location filename="../ui/save_file_dialog.ui" line="39"/>
        <source>Save as</source>
        <translation>Формат</translation>
    </message>
    <message>
        <location filename="../ui/save_file_dialog.ui" line="70"/>
        <source>Theme</source>
        <translation>Тема</translation>
    </message>
    <message>
        <location filename="../ui/save_file_dialog.ui" line="78"/>
        <source>Light</source>
        <translation type="unfinished">Светлая</translation>
    </message>
    <message>
        <location filename="../ui/save_file_dialog.ui" line="83"/>
        <source>Dark</source>
        <translation type="unfinished">Тёмная</translation>
    </message>
    <message>
        <location filename="../ui/save_file_dialog.ui" line="91"/>
        <source>DPI</source>
        <translation>DPI</translation>
    </message>
    <message>
        <location filename="../ui/save_file_dialog.cpp" line="71"/>
        <source>This build was compiled without the Qt SVG module.</source>
        <translation>Эта сборка скомпилирована без модуля Qt SVG.</translation>
    </message>
    <message>
        <location filename="../ui/save_file_dialog.cpp" line="143"/>
        <source>%1 files (*.%2)</source>
        <translation>Файлы %1 (*.%2)</translation>
    </message>
</context>
<context>
    <name>SerialService</name>
    <message>
        <location filename="../transport/serial_service.cpp" line="99"/>
        <source>Serial service is shutting down.</source>
        <translation>Serial-сервис завершает работу.</translation>
    </message>
    <message>
        <location filename="../transport/serial_service.cpp" line="128"/>
        <source>Reconnecting.</source>
        <translation>Переподключение.</translation>
    </message>
    <message>
        <location filename="../transport/serial_service.cpp" line="140"/>
        <location filename="../transport/serial_service.cpp" line="144"/>
        <location filename="../transport/serial_service.cpp" line="158"/>
        <location filename="../transport/serial_service.cpp" line="174"/>
        <location filename="../transport/serial_service.cpp" line="503"/>
        <source>Disconnected.</source>
        <translation>Отключено.</translation>
    </message>
    <message>
        <location filename="../transport/serial_service.cpp" line="206"/>
        <location filename="../transport/serial_service.cpp" line="232"/>
        <location filename="../transport/serial_service.cpp" line="702"/>
        <source>Serial port is not open.</source>
        <translation>Serial-порт не открыт.</translation>
    </message>
    <message>
        <location filename="../transport/serial_service.cpp" line="206"/>
        <location filename="../transport/serial_service.cpp" line="702"/>
        <source>Disconnecting.</source>
        <translation>Отключение.</translation>
    </message>
    <message>
        <location filename="../transport/serial_service.cpp" line="288"/>
        <source>Command &apos;%1&apos; failed: %2</source>
        <translation>Команда «%1» не выполнена: %2</translation>
    </message>
    <message>
        <location filename="../transport/serial_service.cpp" line="301"/>
        <source>The actuator did not answer after restarting: %1</source>
        <translation>Привод не ответил после перезапуска: %1</translation>
    </message>
    <message>
        <location filename="../transport/serial_service.cpp" line="325"/>
        <source>Actuator detected on %1.</source>
        <translation>Привод обнаружен на %1.</translation>
    </message>
    <message>
        <location filename="../transport/serial_service.cpp" line="326"/>
        <source>No actuator answered on %1: %2</source>
        <translation>На %1 ни один привод не ответил: %2</translation>
    </message>
    <message>
        <location filename="../transport/serial_service.cpp" line="334"/>
        <source>Could not enter CONFIG mode: %1</source>
        <translation>Не удалось войти в режим CONFIG: %1</translation>
    </message>
    <message>
        <location filename="../transport/serial_service.cpp" line="396"/>
        <source>These registers were rejected by the actuator: %1</source>
        <translation>Привод отклонил запись регистров: %1</translation>
    </message>
    <message>
        <location filename="../transport/serial_service.cpp" line="503"/>
        <source>Serial connection lost.</source>
        <translation>Serial-соединение потеряно.</translation>
    </message>
    <message>
        <location filename="../transport/serial_service.cpp" line="528"/>
        <source>The actuator did not come back after restarting.</source>
        <translation>Привод не вернулся после перезапуска.</translation>
    </message>
    <message>
        <location filename="../transport/serial_service.cpp" line="585"/>
        <source>The actuator did not answer in time.</source>
        <translation>Привод не ответил за отведённое время.</translation>
    </message>
    <message>
        <location filename="../transport/serial_service.cpp" line="670"/>
        <source>Could not interpret the value &apos;%1&apos;.</source>
        <translation>Не удалось разобрать значение «%1».</translation>
    </message>
</context>
<context>
    <name>SerialWorker</name>
    <message>
        <location filename="../transport/serial_worker.cpp" line="62"/>
        <source>Port %1 opened at %2 baud.</source>
        <translation>Порт %1 открыт на скорости %2 бод.</translation>
    </message>
    <message>
        <location filename="../transport/serial_worker.cpp" line="86"/>
        <source>Serial port is not open.</source>
        <translation>Serial-порт не открыт.</translation>
    </message>
</context>
<context>
    <name>plot_export</name>
    <message>
        <location filename="../ui/plot_export.cpp" line="62"/>
        <source>The plot is not initialised.</source>
        <translation type="unfinished">График не инициализирован.</translation>
    </message>
    <message>
        <location filename="../ui/plot_export.cpp" line="67"/>
        <source>This build cannot write SVG: the Qt SVG module was not available when it was compiled. Choose PNG or JPG instead.</source>
        <translation>Эта сборка не умеет сохранять SVG: при компиляции не был доступен модуль Qt SVG. Выберите PNG или JPG.</translation>
    </message>
    <message>
        <location filename="../ui/plot_export.cpp" line="98"/>
        <source>Could not write %1.</source>
        <translation type="unfinished">Не удалось записать %1.</translation>
    </message>
</context>
</TS>
