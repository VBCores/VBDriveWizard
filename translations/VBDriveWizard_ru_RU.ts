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
        <location filename="../transport/cyphal_worker.cpp" line="140"/>
        <source>The Cyphal stack reported an internal error.</source>
        <translation>Внутренняя ошибка стека Cyphal.</translation>
    </message>
    <message>
        <location filename="../transport/cyphal_worker.cpp" line="158"/>
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
        <source>Found %n drive(s) on %1.</source>
        <translation>
            <numerusform>Найден %n привод на %1.</numerusform>
            <numerusform>Найдено %n привода на %1.</numerusform>
            <numerusform>Найдено %n приводов на %1.</numerusform>
        </translation>
    </message>
    <message>
        <location filename="../transport/cyphal_service.cpp" line="135"/>
        <source>The drive stopped answering.</source>
        <translation>Привод перестал отвечать.</translation>
    </message>
    <message>
        <location filename="../transport/cyphal_service.cpp" line="142"/>
        <source>The drive did not answer register &apos;%1&apos; in time.</source>
        <translation>Привод не ответил на регистр «%1» за отведённое время.</translation>
    </message>
    <message>
        <location filename="../transport/cyphal_service.cpp" line="170"/>
        <source>Could not send the request.</source>
        <translation>Не удалось отправить запрос.</translation>
    </message>
    <message>
        <location filename="../transport/cyphal_service.cpp" line="193"/>
        <source>The drive did not accept the value.</source>
        <translation>Привод не принял значение.</translation>
    </message>
    <message>
        <location filename="../transport/cyphal_service.cpp" line="194"/>
        <source>Register &apos;%1&apos; is read-only.</source>
        <translation>Регистр «%1» доступен только для чтения.</translation>
    </message>
    <message>
        <location filename="../transport/cyphal_service.cpp" line="203"/>
        <source>Register &apos;%1&apos; is not available on this drive.</source>
        <translation>Регистр «%1» недоступен на этом приводе.</translation>
    </message>
    <message>
        <location filename="../transport/cyphal_service.cpp" line="231"/>
        <source>These registers were rejected by the drive: %1</source>
        <translation>Привод отклонил запись регистров: %1</translation>
    </message>
</context>
<context>
    <name>DeviceModel</name>
    <message>
        <location filename="../core/device_model.cpp" line="21"/>
        <source>Unknown drive</source>
        <translation>Неизвестный привод</translation>
    </message>
</context>
<context>
    <name>FirmwareDownloader</name>
    <message>
        <location filename="../firmware/firmware_downloader.cpp" line="42"/>
        <source>A firmware download is already running.</source>
        <translation>Загрузка прошивки уже выполняется.</translation>
    </message>
    <message>
        <location filename="../firmware/firmware_downloader.cpp" line="52"/>
        <source>Looking up the latest release...</source>
        <translation>Поиск последнего релиза...</translation>
    </message>
    <message>
        <location filename="../firmware/firmware_downloader.cpp" line="73"/>
        <source>Could not reach the VBDrive releases: %1</source>
        <translation>Не удалось получить список релизов VBDrive: %1</translation>
    </message>
    <message>
        <location filename="../firmware/firmware_downloader.cpp" line="92"/>
        <source>Release %1 does not contain %2.</source>
        <translation>Релиз %1 не содержит %2.</translation>
    </message>
    <message>
        <location filename="../firmware/firmware_downloader.cpp" line="93"/>
        <source>(unknown)</source>
        <translation>(неизвестно)</translation>
    </message>
    <message>
        <location filename="../firmware/firmware_downloader.cpp" line="102"/>
        <location filename="../firmware/firmware_downloader.cpp" line="115"/>
        <source>Downloading %1...</source>
        <translation>Загрузка %1...</translation>
    </message>
    <message>
        <location filename="../firmware/firmware_downloader.cpp" line="130"/>
        <source>Firmware download failed: %1</source>
        <translation>Не удалось загрузить прошивку: %1</translation>
    </message>
    <message>
        <location filename="../firmware/firmware_downloader.cpp" line="141"/>
        <location filename="../firmware/firmware_downloader.cpp" line="146"/>
        <source>Could not write %1: %2</source>
        <translation>Не удалось записать %1: %2</translation>
    </message>
    <message>
        <location filename="../firmware/firmware_downloader.cpp" line="150"/>
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
        <location filename="../build/Desktop-Debug/VBDriveWizard_autogen/include/ui_mainwindow.h" line="2091"/>
        <source>VBDrive Wizard</source>
        <translation>VBDrive Wizard</translation>
    </message>
    <message>
        <location filename="../mainwindow.ui" line="23"/>
        <location filename="../build/Desktop-Debug/VBDriveWizard_autogen/include/ui_mainwindow.h" line="2092"/>
        <source>CONNECTION</source>
        <translation>ПОДКЛЮЧЕНИЕ</translation>
    </message>
    <message>
        <location filename="../mainwindow.ui" line="29"/>
        <location filename="../build/Desktop-Debug/VBDriveWizard_autogen/include/ui_mainwindow.h" line="2093"/>
        <source>Serial</source>
        <translation>Serial</translation>
    </message>
    <message>
        <location filename="../mainwindow.ui" line="42"/>
        <location filename="../mainwindow.ui" line="66"/>
        <location filename="../mainwindow.cpp" line="903"/>
        <location filename="../mainwindow.cpp" line="904"/>
        <location filename="../build/Desktop-Debug/VBDriveWizard_autogen/include/ui_mainwindow.h" line="2094"/>
        <location filename="../build/Desktop-Debug/VBDriveWizard_autogen/include/ui_mainwindow.h" line="2097"/>
        <source>Connect</source>
        <translation>Подключить</translation>
    </message>
    <message>
        <location filename="../mainwindow.ui" line="49"/>
        <location filename="../mainwindow.ui" line="73"/>
        <location filename="../build/Desktop-Debug/VBDriveWizard_autogen/include/ui_mainwindow.h" line="2095"/>
        <location filename="../build/Desktop-Debug/VBDriveWizard_autogen/include/ui_mainwindow.h" line="2098"/>
        <source>Refresh</source>
        <translation>Обновить</translation>
    </message>
    <message>
        <location filename="../mainwindow.ui" line="56"/>
        <location filename="../mainwindow.ui" line="395"/>
        <location filename="../build/Desktop-Debug/VBDriveWizard_autogen/include/ui_mainwindow.h" line="2096"/>
        <location filename="../build/Desktop-Debug/VBDriveWizard_autogen/include/ui_mainwindow.h" line="2135"/>
        <source>CAN</source>
        <translation>CAN</translation>
    </message>
    <message>
        <location filename="../mainwindow.ui" line="83"/>
        <location filename="../build/Desktop-Debug/VBDriveWizard_autogen/include/ui_mainwindow.h" line="2099"/>
        <source>DEVICES</source>
        <translation>УСТРОЙСТВА</translation>
    </message>
    <message>
        <location filename="../mainwindow.ui" line="136"/>
        <location filename="../build/Desktop-Debug/VBDriveWizard_autogen/include/ui_mainwindow.h" line="2101"/>
        <source>CONFIGURATION</source>
        <translation>КОНФИГУРАЦИЯ</translation>
    </message>
    <message>
        <location filename="../mainwindow.ui" line="146"/>
        <location filename="../build/Desktop-Debug/VBDriveWizard_autogen/include/ui_mainwindow.h" line="2120"/>
        <source>Basic</source>
        <translation>Основные</translation>
    </message>
    <message>
        <location filename="../mainwindow.ui" line="152"/>
        <location filename="../build/Desktop-Debug/VBDriveWizard_autogen/include/ui_mainwindow.h" line="2102"/>
        <source>Limits</source>
        <translation>Ограничения</translation>
    </message>
    <message>
        <location filename="../mainwindow.ui" line="160"/>
        <location filename="../mainwindow.ui" line="2445"/>
        <location filename="../build/Desktop-Debug/VBDriveWizard_autogen/include/ui_mainwindow.h" line="2103"/>
        <location filename="../build/Desktop-Debug/VBDriveWizard_autogen/include/ui_mainwindow.h" line="2259"/>
        <source>Angle</source>
        <translation>Угол</translation>
    </message>
    <message>
        <location filename="../mainwindow.ui" line="167"/>
        <location filename="../build/Desktop-Debug/VBDriveWizard_autogen/include/ui_mainwindow.h" line="2104"/>
        <source>min:</source>
        <translation>мин:</translation>
    </message>
    <message>
        <location filename="../mainwindow.ui" line="190"/>
        <location filename="../build/Desktop-Debug/VBDriveWizard_autogen/include/ui_mainwindow.h" line="2105"/>
        <source>max</source>
        <translation>макс</translation>
    </message>
    <message>
        <location filename="../mainwindow.ui" line="220"/>
        <location filename="../mainwindow.ui" line="1097"/>
        <location filename="../mainwindow.ui" line="1297"/>
        <location filename="../mainwindow.ui" line="1352"/>
        <location filename="../mainwindow.ui" line="2025"/>
        <location filename="../mainwindow.ui" line="2281"/>
        <location filename="../build/Desktop-Debug/VBDriveWizard_autogen/include/ui_mainwindow.h" line="2106"/>
        <location filename="../build/Desktop-Debug/VBDriveWizard_autogen/include/ui_mainwindow.h" line="2173"/>
        <location filename="../build/Desktop-Debug/VBDriveWizard_autogen/include/ui_mainwindow.h" line="2196"/>
        <location filename="../build/Desktop-Debug/VBDriveWizard_autogen/include/ui_mainwindow.h" line="2201"/>
        <location filename="../build/Desktop-Debug/VBDriveWizard_autogen/include/ui_mainwindow.h" line="2231"/>
        <location filename="../build/Desktop-Debug/VBDriveWizard_autogen/include/ui_mainwindow.h" line="2241"/>
        <source>Velocity</source>
        <translation>Скорость</translation>
    </message>
    <message>
        <location filename="../mainwindow.ui" line="250"/>
        <location filename="../mainwindow.ui" line="1102"/>
        <location filename="../mainwindow.ui" line="1304"/>
        <location filename="../mainwindow.ui" line="2055"/>
        <location filename="../mainwindow.ui" line="2274"/>
        <location filename="../build/Desktop-Debug/VBDriveWizard_autogen/include/ui_mainwindow.h" line="2107"/>
        <location filename="../build/Desktop-Debug/VBDriveWizard_autogen/include/ui_mainwindow.h" line="2174"/>
        <location filename="../build/Desktop-Debug/VBDriveWizard_autogen/include/ui_mainwindow.h" line="2197"/>
        <location filename="../build/Desktop-Debug/VBDriveWizard_autogen/include/ui_mainwindow.h" line="2232"/>
        <location filename="../build/Desktop-Debug/VBDriveWizard_autogen/include/ui_mainwindow.h" line="2240"/>
        <source>Torque</source>
        <translation>Момент</translation>
    </message>
    <message>
        <location filename="../mainwindow.ui" line="286"/>
        <location filename="../build/Desktop-Debug/VBDriveWizard_autogen/include/ui_mainwindow.h" line="2111"/>
        <source>Voltage</source>
        <translation>Напряжение</translation>
    </message>
    <message>
        <location filename="../mainwindow.ui" line="283"/>
        <location filename="../mainwindow.ui" line="296"/>
        <location filename="../build/Desktop-Debug/VBDriveWizard_autogen/include/ui_mainwindow.h" line="2109"/>
        <location filename="../build/Desktop-Debug/VBDriveWizard_autogen/include/ui_mainwindow.h" line="2113"/>
        <source>The firmware exposes no voltage limit register yet.</source>
        <translation>В прошивке пока нет регистра ограничения напряжения.</translation>
    </message>
    <message>
        <location filename="../mainwindow.ui" line="322"/>
        <location filename="../mainwindow.ui" line="1112"/>
        <location filename="../build/Desktop-Debug/VBDriveWizard_autogen/include/ui_mainwindow.h" line="2115"/>
        <location filename="../build/Desktop-Debug/VBDriveWizard_autogen/include/ui_mainwindow.h" line="2176"/>
        <source>Current</source>
        <translation>Ток</translation>
    </message>
    <message>
        <location filename="../mainwindow.ui" line="352"/>
        <location filename="../build/Desktop-Debug/VBDriveWizard_autogen/include/ui_mainwindow.h" line="2116"/>
        <source>Direction</source>
        <translation>Направление</translation>
    </message>
    <message>
        <location filename="../mainwindow.ui" line="360"/>
        <location filename="../build/Desktop-Debug/VBDriveWizard_autogen/include/ui_mainwindow.h" line="2117"/>
        <source>CCW</source>
        <translation>Против часовой</translation>
    </message>
    <message>
        <location filename="../mainwindow.ui" line="365"/>
        <location filename="../build/Desktop-Debug/VBDriveWizard_autogen/include/ui_mainwindow.h" line="2118"/>
        <source>CW</source>
        <translation>По часовой</translation>
    </message>
    <message>
        <location filename="../mainwindow.ui" line="401"/>
        <location filename="../build/Desktop-Debug/VBDriveWizard_autogen/include/ui_mainwindow.h" line="2121"/>
        <source>Data Baud Rate</source>
        <translation>Скорость data-сегмента</translation>
    </message>
    <message>
        <location filename="../mainwindow.ui" line="408"/>
        <location filename="../build/Desktop-Debug/VBDriveWizard_autogen/include/ui_mainwindow.h" line="2122"/>
        <source>Node ID</source>
        <translation>Node ID</translation>
    </message>
    <message>
        <location filename="../mainwindow.ui" line="435"/>
        <location filename="../build/Desktop-Debug/VBDriveWizard_autogen/include/ui_mainwindow.h" line="2123"/>
        <source>62.5 kHz</source>
        <translation>62.5 kHz</translation>
    </message>
    <message>
        <location filename="../mainwindow.ui" line="440"/>
        <location filename="../build/Desktop-Debug/VBDriveWizard_autogen/include/ui_mainwindow.h" line="2124"/>
        <source>125 kHz</source>
        <translation>125 kHz</translation>
    </message>
    <message>
        <location filename="../mainwindow.ui" line="445"/>
        <location filename="../build/Desktop-Debug/VBDriveWizard_autogen/include/ui_mainwindow.h" line="2125"/>
        <source>250 kHz</source>
        <translation>250 kHz</translation>
    </message>
    <message>
        <location filename="../mainwindow.ui" line="450"/>
        <location filename="../build/Desktop-Debug/VBDriveWizard_autogen/include/ui_mainwindow.h" line="2126"/>
        <source>500 kHz</source>
        <translation>500 kHz</translation>
    </message>
    <message>
        <location filename="../mainwindow.ui" line="455"/>
        <location filename="../mainwindow.ui" line="467"/>
        <location filename="../build/Desktop-Debug/VBDriveWizard_autogen/include/ui_mainwindow.h" line="2127"/>
        <location filename="../build/Desktop-Debug/VBDriveWizard_autogen/include/ui_mainwindow.h" line="2129"/>
        <source>1 MHz</source>
        <translation>1 MHz</translation>
    </message>
    <message>
        <location filename="../mainwindow.ui" line="472"/>
        <location filename="../build/Desktop-Debug/VBDriveWizard_autogen/include/ui_mainwindow.h" line="2130"/>
        <source>2 MHz</source>
        <translation>2 MHz</translation>
    </message>
    <message>
        <location filename="../mainwindow.ui" line="477"/>
        <location filename="../build/Desktop-Debug/VBDriveWizard_autogen/include/ui_mainwindow.h" line="2131"/>
        <source>4 MHz</source>
        <translation>4 MHz</translation>
    </message>
    <message>
        <location filename="../mainwindow.ui" line="482"/>
        <location filename="../build/Desktop-Debug/VBDriveWizard_autogen/include/ui_mainwindow.h" line="2132"/>
        <source>8 MHz</source>
        <translation>8 MHz</translation>
    </message>
    <message>
        <location filename="../mainwindow.ui" line="490"/>
        <location filename="../build/Desktop-Debug/VBDriveWizard_autogen/include/ui_mainwindow.h" line="2134"/>
        <source>Nominal Baud Rate</source>
        <translation>Номинальная скорость</translation>
    </message>
    <message>
        <location filename="../mainwindow.ui" line="520"/>
        <location filename="../build/Desktop-Debug/VBDriveWizard_autogen/include/ui_mainwindow.h" line="2152"/>
        <source>Advanced</source>
        <translation>Расширенные</translation>
    </message>
    <message>
        <location filename="../mainwindow.ui" line="612"/>
        <location filename="../build/Desktop-Debug/VBDriveWizard_autogen/include/ui_mainwindow.h" line="2137"/>
        <source>Gear Ratio</source>
        <translation>Передаточное число</translation>
    </message>
    <message>
        <location filename="../mainwindow.ui" line="743"/>
        <location filename="../mainwindow.ui" line="1117"/>
        <location filename="../build/Desktop-Debug/VBDriveWizard_autogen/include/ui_mainwindow.h" line="2145"/>
        <location filename="../build/Desktop-Debug/VBDriveWizard_autogen/include/ui_mainwindow.h" line="2177"/>
        <source>Encoder</source>
        <translation>Энкодер</translation>
    </message>
    <message>
        <location filename="../mainwindow.ui" line="842"/>
        <location filename="../build/Desktop-Debug/VBDriveWizard_autogen/include/ui_mainwindow.h" line="2147"/>
        <source>Torque const</source>
        <translation>Константа момента</translation>
    </message>
    <message>
        <location filename="../mainwindow.ui" line="863"/>
        <location filename="../build/Desktop-Debug/VBDriveWizard_autogen/include/ui_mainwindow.h" line="2150"/>
        <source>Current Kp</source>
        <translation>Kp тока</translation>
    </message>
    <message>
        <location filename="../mainwindow.ui" line="635"/>
        <location filename="../build/Desktop-Debug/VBDriveWizard_autogen/include/ui_mainwindow.h" line="2138"/>
        <source>Current Ki</source>
        <translation>Ki тока</translation>
    </message>
    <message>
        <location filename="../mainwindow.ui" line="856"/>
        <location filename="../build/Desktop-Debug/VBDriveWizard_autogen/include/ui_mainwindow.h" line="2149"/>
        <source>Position Offset</source>
        <translation>Смещение положения</translation>
    </message>
    <message>
        <location filename="../mainwindow.ui" line="661"/>
        <location filename="../build/Desktop-Debug/VBDriveWizard_autogen/include/ui_mainwindow.h" line="2143"/>
        <source>Main Filter Param A</source>
        <translation>Параметр A основного фильтра</translation>
    </message>
    <message>
        <location filename="../mainwindow.ui" line="832"/>
        <location filename="../build/Desktop-Debug/VBDriveWizard_autogen/include/ui_mainwindow.h" line="2146"/>
        <source>Filter Gain 1</source>
        <translation>Коэффициент фильтра 1</translation>
    </message>
    <message>
        <location filename="../mainwindow.ui" line="720"/>
        <location filename="../build/Desktop-Debug/VBDriveWizard_autogen/include/ui_mainwindow.h" line="2144"/>
        <source>Filter Gain 2</source>
        <translation>Коэффициент фильтра 2</translation>
    </message>
    <message>
        <location filename="../mainwindow.ui" line="849"/>
        <location filename="../build/Desktop-Debug/VBDriveWizard_autogen/include/ui_mainwindow.h" line="2148"/>
        <source>Filter Gain 3</source>
        <translation>Коэффициент фильтра 3</translation>
    </message>
    <message>
        <location filename="../mainwindow.ui" line="583"/>
        <location filename="../build/Desktop-Debug/VBDriveWizard_autogen/include/ui_mainwindow.h" line="2136"/>
        <source>Current LPF Gain</source>
        <translation>Коэффициент ФНЧ тока</translation>
    </message>
    <message>
        <location filename="../mainwindow.ui" line="643"/>
        <location filename="../build/Desktop-Debug/VBDriveWizard_autogen/include/ui_mainwindow.h" line="2139"/>
        <source>rotor</source>
        <translation>ротор</translation>
    </message>
    <message>
        <location filename="../mainwindow.ui" line="648"/>
        <location filename="../build/Desktop-Debug/VBDriveWizard_autogen/include/ui_mainwindow.h" line="2140"/>
        <source>shaft</source>
        <translation>вал</translation>
    </message>
    <message>
        <location filename="../mainwindow.ui" line="653"/>
        <location filename="../build/Desktop-Debug/VBDriveWizard_autogen/include/ui_mainwindow.h" line="2141"/>
        <source>external</source>
        <translation>внешний</translation>
    </message>
    <message>
        <location filename="../mainwindow.ui" line="870"/>
        <location filename="../build/Desktop-Debug/VBDriveWizard_autogen/include/ui_mainwindow.h" line="2151"/>
        <source>Current Kd</source>
        <translation>Kd тока</translation>
    </message>
    <message>
        <location filename="../mainwindow.ui" line="878"/>
        <location filename="../build/Desktop-Debug/VBDriveWizard_autogen/include/ui_mainwindow.h" line="2166"/>
        <source>System</source>
        <translation>Система</translation>
    </message>
    <message>
        <location filename="../mainwindow.ui" line="884"/>
        <location filename="../build/Desktop-Debug/VBDriveWizard_autogen/include/ui_mainwindow.h" line="2153"/>
        <source>Sensor</source>
        <translation>Датчик</translation>
    </message>
    <message>
        <location filename="../mainwindow.ui" line="890"/>
        <location filename="../build/Desktop-Debug/VBDriveWizard_autogen/include/ui_mainwindow.h" line="2154"/>
        <source>Calibrate</source>
        <translation>Калибровать</translation>
    </message>
    <message>
        <location filename="../mainwindow.ui" line="910"/>
        <location filename="../build/Desktop-Debug/VBDriveWizard_autogen/include/ui_mainwindow.h" line="2155"/>
        <source>Register Parameters</source>
        <translation>Параметры регистров</translation>
    </message>
    <message>
        <location filename="../mainwindow.ui" line="916"/>
        <location filename="../build/Desktop-Debug/VBDriveWizard_autogen/include/ui_mainwindow.h" line="2156"/>
        <source>Save to File...</source>
        <translation>Сохранить в файл...</translation>
    </message>
    <message>
        <location filename="../mainwindow.ui" line="923"/>
        <location filename="../build/Desktop-Debug/VBDriveWizard_autogen/include/ui_mainwindow.h" line="2157"/>
        <source>Load from File...</source>
        <translation>Загрузить из файла...</translation>
    </message>
    <message>
        <location filename="../mainwindow.ui" line="930"/>
        <location filename="../build/Desktop-Debug/VBDriveWizard_autogen/include/ui_mainwindow.h" line="2158"/>
        <source>Restore to Default</source>
        <translation>Значения по умолчанию</translation>
    </message>
    <message>
        <location filename="../mainwindow.ui" line="940"/>
        <location filename="../build/Desktop-Debug/VBDriveWizard_autogen/include/ui_mainwindow.h" line="2159"/>
        <source>Firmware</source>
        <translation>Прошивка</translation>
    </message>
    <message>
        <location filename="../mainwindow.ui" line="948"/>
        <location filename="../build/Desktop-Debug/VBDriveWizard_autogen/include/ui_mainwindow.h" line="2160"/>
        <source>Current Version:</source>
        <translation>Текущая версия:</translation>
    </message>
    <message>
        <location filename="../mainwindow.ui" line="955"/>
        <location filename="../build/Desktop-Debug/VBDriveWizard_autogen/include/ui_mainwindow.h" line="2161"/>
        <source>0.0.1</source>
        <translation>0.0.1</translation>
    </message>
    <message>
        <location filename="../mainwindow.ui" line="966"/>
        <location filename="../build/Desktop-Debug/VBDriveWizard_autogen/include/ui_mainwindow.h" line="2162"/>
        <source>Choose file</source>
        <translation>Выбрать файл</translation>
    </message>
    <message>
        <location filename="../mainwindow.ui" line="976"/>
        <location filename="../build/Desktop-Debug/VBDriveWizard_autogen/include/ui_mainwindow.h" line="2163"/>
        <source>Open</source>
        <translation>Открыть</translation>
    </message>
    <message>
        <location filename="../mainwindow.ui" line="985"/>
        <location filename="../build/Desktop-Debug/VBDriveWizard_autogen/include/ui_mainwindow.h" line="2164"/>
        <source>Download from remote repo</source>
        <translation>Скачать из репозитория</translation>
    </message>
    <message>
        <location filename="../mainwindow.ui" line="994"/>
        <location filename="../build/Desktop-Debug/VBDriveWizard_autogen/include/ui_mainwindow.h" line="2165"/>
        <source>Flash</source>
        <translation>Прошить</translation>
    </message>
    <message>
        <location filename="../mainwindow.ui" line="1032"/>
        <location filename="../build/Desktop-Debug/VBDriveWizard_autogen/include/ui_mainwindow.h" line="2167"/>
        <source>Read</source>
        <translation>Прочитать</translation>
    </message>
    <message>
        <location filename="../mainwindow.ui" line="1039"/>
        <location filename="../build/Desktop-Debug/VBDriveWizard_autogen/include/ui_mainwindow.h" line="2168"/>
        <source>Write</source>
        <translation>Записать</translation>
    </message>
    <message>
        <location filename="../mainwindow.ui" line="1046"/>
        <location filename="../build/Desktop-Debug/VBDriveWizard_autogen/include/ui_mainwindow.h" line="2169"/>
        <source>Set Origin</source>
        <translation>Задать ноль</translation>
    </message>
    <message>
        <source>&lt;html&gt;&lt;head/&gt;&lt;body&gt;&lt;p align=&quot;center&quot;&gt;Logo&lt;/p&gt;&lt;/body&gt;&lt;/html&gt;</source>
        <translation type="vanished">&lt;html&gt;&lt;head/&gt;&lt;body&gt;&lt;p align=&quot;center&quot;&gt;Logo&lt;/p&gt;&lt;/body&gt;&lt;/html&gt;</translation>
    </message>
    <message>
        <location filename="../mainwindow.ui" line="1070"/>
        <location filename="../build/Desktop-Debug/VBDriveWizard_autogen/include/ui_mainwindow.h" line="2170"/>
        <source>REALTIME DATA</source>
        <translation>ДАННЫЕ В РЕАЛЬНОМ ВРЕМЕНИ</translation>
    </message>
    <message>
        <location filename="../mainwindow.ui" line="1084"/>
        <location filename="../build/Desktop-Debug/VBDriveWizard_autogen/include/ui_mainwindow.h" line="2171"/>
        <source>Signal:</source>
        <translation>Сигнал:</translation>
    </message>
    <message>
        <location filename="../mainwindow.ui" line="1092"/>
        <location filename="../mainwindow.ui" line="1287"/>
        <location filename="../mainwindow.ui" line="1995"/>
        <location filename="../mainwindow.ui" line="2288"/>
        <location filename="../build/Desktop-Debug/VBDriveWizard_autogen/include/ui_mainwindow.h" line="2172"/>
        <location filename="../build/Desktop-Debug/VBDriveWizard_autogen/include/ui_mainwindow.h" line="2195"/>
        <location filename="../build/Desktop-Debug/VBDriveWizard_autogen/include/ui_mainwindow.h" line="2230"/>
        <location filename="../build/Desktop-Debug/VBDriveWizard_autogen/include/ui_mainwindow.h" line="2242"/>
        <source>Position</source>
        <translation>Положение</translation>
    </message>
    <message>
        <location filename="../mainwindow.ui" line="1107"/>
        <location filename="../build/Desktop-Debug/VBDriveWizard_autogen/include/ui_mainwindow.h" line="2175"/>
        <source>Temperature</source>
        <translation>Температура</translation>
    </message>
    <message>
        <location filename="../mainwindow.ui" line="1122"/>
        <location filename="../build/Desktop-Debug/VBDriveWizard_autogen/include/ui_mainwindow.h" line="2178"/>
        <source>Log</source>
        <translation>Журнал</translation>
    </message>
    <message>
        <location filename="../mainwindow.ui" line="1130"/>
        <location filename="../build/Desktop-Debug/VBDriveWizard_autogen/include/ui_mainwindow.h" line="2180"/>
        <source>Units:</source>
        <translation>Единицы:</translation>
    </message>
    <message>
        <location filename="../mainwindow.ui" line="1138"/>
        <location filename="../mainwindow.ui" line="2459"/>
        <location filename="../build/Desktop-Debug/VBDriveWizard_autogen/include/ui_mainwindow.h" line="2181"/>
        <location filename="../build/Desktop-Debug/VBDriveWizard_autogen/include/ui_mainwindow.h" line="2261"/>
        <source>rad</source>
        <translation>rad</translation>
    </message>
    <message>
        <location filename="../mainwindow.ui" line="1143"/>
        <location filename="../build/Desktop-Debug/VBDriveWizard_autogen/include/ui_mainwindow.h" line="2182"/>
        <source>deg</source>
        <translation>deg</translation>
    </message>
    <message>
        <location filename="../mainwindow.ui" line="1164"/>
        <location filename="../build/Desktop-Debug/VBDriveWizard_autogen/include/ui_mainwindow.h" line="2184"/>
        <source>Preferences</source>
        <translation>Настройки</translation>
    </message>
    <message>
        <location filename="../mainwindow.ui" line="1171"/>
        <location filename="../build/Desktop-Debug/VBDriveWizard_autogen/include/ui_mainwindow.h" line="2185"/>
        <source>Language:</source>
        <translation>Язык:</translation>
    </message>
    <message>
        <location filename="../mainwindow.ui" line="1185"/>
        <location filename="../build/Desktop-Debug/VBDriveWizard_autogen/include/ui_mainwindow.h" line="2186"/>
        <source>English</source>
        <translation>English</translation>
    </message>
    <message>
        <location filename="../mainwindow.ui" line="1194"/>
        <location filename="../build/Desktop-Debug/VBDriveWizard_autogen/include/ui_mainwindow.h" line="2187"/>
        <source>Русский</source>
        <translation>Русский</translation>
    </message>
    <message>
        <location filename="../mainwindow.ui" line="1203"/>
        <location filename="../build/Desktop-Debug/VBDriveWizard_autogen/include/ui_mainwindow.h" line="2188"/>
        <source>中文</source>
        <translation>中文</translation>
    </message>
    <message>
        <location filename="../mainwindow.ui" line="1222"/>
        <location filename="../mainwindow.cpp" line="345"/>
        <location filename="../mainwindow.cpp" line="2042"/>
        <location filename="../build/Desktop-Debug/VBDriveWizard_autogen/include/ui_mainwindow.h" line="2190"/>
        <source>Pause</source>
        <translation>Пауза</translation>
    </message>
    <message>
        <location filename="../mainwindow.ui" line="1229"/>
        <location filename="../build/Desktop-Debug/VBDriveWizard_autogen/include/ui_mainwindow.h" line="2191"/>
        <source>Save as CSV...</source>
        <translation>Сохранить в CSV...</translation>
    </message>
    <message>
        <location filename="../mainwindow.ui" line="1236"/>
        <location filename="../build/Desktop-Debug/VBDriveWizard_autogen/include/ui_mainwindow.h" line="2192"/>
        <source>Save as PNG...</source>
        <translation>Сохранить в PNG...</translation>
    </message>
    <message>
        <location filename="../mainwindow.ui" line="1263"/>
        <location filename="../build/Desktop-Debug/VBDriveWizard_autogen/include/ui_mainwindow.h" line="2193"/>
        <source>CONTROL</source>
        <translation>УПРАВЛЕНИЕ</translation>
    </message>
    <message>
        <location filename="../mainwindow.ui" line="1273"/>
        <location filename="../build/Desktop-Debug/VBDriveWizard_autogen/include/ui_mainwindow.h" line="2223"/>
        <source>Servo</source>
        <translation>Servo</translation>
    </message>
    <message>
        <location filename="../mainwindow.ui" line="1281"/>
        <location filename="../build/Desktop-Debug/VBDriveWizard_autogen/include/ui_mainwindow.h" line="2194"/>
        <source>Control Type</source>
        <translation>Тип управления</translation>
    </message>
    <message>
        <location filename="../mainwindow.ui" line="1327"/>
        <location filename="../build/Desktop-Debug/VBDriveWizard_autogen/include/ui_mainwindow.h" line="2198"/>
        <source>Transient Form</source>
        <translation>Переходный процесс</translation>
    </message>
    <message>
        <location filename="../mainwindow.ui" line="1333"/>
        <location filename="../build/Desktop-Debug/VBDriveWizard_autogen/include/ui_mainwindow.h" line="2199"/>
        <source>Linear</source>
        <translation>Линейный</translation>
    </message>
    <message>
        <location filename="../mainwindow.ui" line="1343"/>
        <location filename="../build/Desktop-Debug/VBDriveWizard_autogen/include/ui_mainwindow.h" line="2200"/>
        <source>Polynomial</source>
        <translation>Полиномиальный</translation>
    </message>
    <message>
        <location filename="../mainwindow.ui" line="1392"/>
        <location filename="../mainwindow.ui" line="1521"/>
        <location filename="../build/Desktop-Debug/VBDriveWizard_autogen/include/ui_mainwindow.h" line="2202"/>
        <location filename="../build/Desktop-Debug/VBDriveWizard_autogen/include/ui_mainwindow.h" line="2207"/>
        <source>Set</source>
        <translation>Задать</translation>
    </message>
    <message>
        <location filename="../mainwindow.ui" line="1406"/>
        <location filename="../build/Desktop-Debug/VBDriveWizard_autogen/include/ui_mainwindow.h" line="2203"/>
        <source>Feedback Gains</source>
        <translation>Коэффициенты регулятора</translation>
    </message>
    <message>
        <location filename="../mainwindow.ui" line="1414"/>
        <location filename="../build/Desktop-Debug/VBDriveWizard_autogen/include/ui_mainwindow.h" line="2204"/>
        <source>Kp:</source>
        <translation>Kp:</translation>
    </message>
    <message>
        <location filename="../mainwindow.ui" line="1444"/>
        <location filename="../build/Desktop-Debug/VBDriveWizard_autogen/include/ui_mainwindow.h" line="2205"/>
        <source>Ki:</source>
        <translation>Ki:</translation>
    </message>
    <message>
        <location filename="../mainwindow.ui" line="1474"/>
        <location filename="../build/Desktop-Debug/VBDriveWizard_autogen/include/ui_mainwindow.h" line="2206"/>
        <source>Kd:</source>
        <translation>Kd:</translation>
    </message>
    <message>
        <location filename="../mainwindow.ui" line="1537"/>
        <location filename="../build/Desktop-Debug/VBDriveWizard_autogen/include/ui_mainwindow.h" line="2210"/>
        <source>User</source>
        <translation>Вручную</translation>
    </message>
    <message>
        <location filename="../mainwindow.ui" line="1545"/>
        <location filename="../mainwindow.cpp" line="1659"/>
        <location filename="../build/Desktop-Debug/VBDriveWizard_autogen/include/ui_mainwindow.h" line="2208"/>
        <source>Target pos:</source>
        <translation>Заданное положение:</translation>
    </message>
    <message>
        <location filename="../mainwindow.ui" line="1605"/>
        <location filename="../mainwindow.ui" line="1713"/>
        <location filename="../mainwindow.ui" line="1821"/>
        <location filename="../mainwindow.ui" line="1929"/>
        <location filename="../mainwindow.ui" line="2323"/>
        <location filename="../mainwindow.cpp" line="1959"/>
        <location filename="../build/Desktop-Debug/VBDriveWizard_autogen/include/ui_mainwindow.h" line="2209"/>
        <location filename="../build/Desktop-Debug/VBDriveWizard_autogen/include/ui_mainwindow.h" line="2213"/>
        <location filename="../build/Desktop-Debug/VBDriveWizard_autogen/include/ui_mainwindow.h" line="2217"/>
        <location filename="../build/Desktop-Debug/VBDriveWizard_autogen/include/ui_mainwindow.h" line="2221"/>
        <location filename="../build/Desktop-Debug/VBDriveWizard_autogen/include/ui_mainwindow.h" line="2244"/>
        <source>Start</source>
        <translation>Пуск</translation>
    </message>
    <message>
        <location filename="../mainwindow.ui" line="1615"/>
        <location filename="../mainwindow.ui" line="1965"/>
        <location filename="../build/Desktop-Debug/VBDriveWizard_autogen/include/ui_mainwindow.h" line="2214"/>
        <location filename="../build/Desktop-Debug/VBDriveWizard_autogen/include/ui_mainwindow.h" line="2226"/>
        <source>Sin</source>
        <translation>Синус</translation>
    </message>
    <message>
        <location filename="../mainwindow.ui" line="1623"/>
        <location filename="../mainwindow.ui" line="1731"/>
        <location filename="../mainwindow.ui" line="1839"/>
        <location filename="../mainwindow.ui" line="2154"/>
        <location filename="../build/Desktop-Debug/VBDriveWizard_autogen/include/ui_mainwindow.h" line="2211"/>
        <location filename="../build/Desktop-Debug/VBDriveWizard_autogen/include/ui_mainwindow.h" line="2215"/>
        <location filename="../build/Desktop-Debug/VBDriveWizard_autogen/include/ui_mainwindow.h" line="2219"/>
        <location filename="../build/Desktop-Debug/VBDriveWizard_autogen/include/ui_mainwindow.h" line="2236"/>
        <source>Amplitude</source>
        <translation>Амплитуда</translation>
    </message>
    <message>
        <location filename="../mainwindow.ui" line="1653"/>
        <location filename="../mainwindow.ui" line="1761"/>
        <location filename="../mainwindow.ui" line="1869"/>
        <location filename="../mainwindow.ui" line="2184"/>
        <location filename="../build/Desktop-Debug/VBDriveWizard_autogen/include/ui_mainwindow.h" line="2212"/>
        <location filename="../build/Desktop-Debug/VBDriveWizard_autogen/include/ui_mainwindow.h" line="2216"/>
        <location filename="../build/Desktop-Debug/VBDriveWizard_autogen/include/ui_mainwindow.h" line="2220"/>
        <location filename="../build/Desktop-Debug/VBDriveWizard_autogen/include/ui_mainwindow.h" line="2237"/>
        <source>Frequency</source>
        <translation>Частота</translation>
    </message>
    <message>
        <location filename="../mainwindow.ui" line="1723"/>
        <location filename="../mainwindow.ui" line="1972"/>
        <location filename="../build/Desktop-Debug/VBDriveWizard_autogen/include/ui_mainwindow.h" line="2218"/>
        <location filename="../build/Desktop-Debug/VBDriveWizard_autogen/include/ui_mainwindow.h" line="2227"/>
        <source>Meander</source>
        <translation>Меандр</translation>
    </message>
    <message>
        <location filename="../mainwindow.ui" line="1831"/>
        <location filename="../mainwindow.ui" line="1979"/>
        <location filename="../build/Desktop-Debug/VBDriveWizard_autogen/include/ui_mainwindow.h" line="2222"/>
        <location filename="../build/Desktop-Debug/VBDriveWizard_autogen/include/ui_mainwindow.h" line="2228"/>
        <source>Triangle</source>
        <translation>Треугольник</translation>
    </message>
    <message>
        <location filename="../mainwindow.ui" line="1943"/>
        <location filename="../build/Desktop-Debug/VBDriveWizard_autogen/include/ui_mainwindow.h" line="2245"/>
        <source>MIT</source>
        <translation>MIT</translation>
    </message>
    <message>
        <location filename="../mainwindow.ui" line="1949"/>
        <location filename="../build/Desktop-Debug/VBDriveWizard_autogen/include/ui_mainwindow.h" line="2224"/>
        <source>Trajectory</source>
        <translation>Траектория</translation>
    </message>
    <message>
        <location filename="../mainwindow.ui" line="1955"/>
        <location filename="../build/Desktop-Debug/VBDriveWizard_autogen/include/ui_mainwindow.h" line="2225"/>
        <source>Step</source>
        <translation>Ступенька</translation>
    </message>
    <message>
        <location filename="../mainwindow.ui" line="1989"/>
        <location filename="../build/Desktop-Debug/VBDriveWizard_autogen/include/ui_mainwindow.h" line="2229"/>
        <source>Step Targets</source>
        <translation>Параметры ступеньки</translation>
    </message>
    <message>
        <location filename="../mainwindow.ui" line="2085"/>
        <location filename="../mainwindow.ui" line="2214"/>
        <location filename="../build/Desktop-Debug/VBDriveWizard_autogen/include/ui_mainwindow.h" line="2233"/>
        <location filename="../build/Desktop-Debug/VBDriveWizard_autogen/include/ui_mainwindow.h" line="2238"/>
        <source>Kp</source>
        <translation>Kp</translation>
    </message>
    <message>
        <location filename="../mainwindow.ui" line="2115"/>
        <location filename="../mainwindow.ui" line="2244"/>
        <location filename="../build/Desktop-Debug/VBDriveWizard_autogen/include/ui_mainwindow.h" line="2234"/>
        <location filename="../build/Desktop-Debug/VBDriveWizard_autogen/include/ui_mainwindow.h" line="2239"/>
        <source>Kd</source>
        <translation>Kd</translation>
    </message>
    <message>
        <location filename="../mainwindow.ui" line="2148"/>
        <location filename="../build/Desktop-Debug/VBDriveWizard_autogen/include/ui_mainwindow.h" line="2235"/>
        <source>Trajectory Targets</source>
        <translation>Параметры траектории</translation>
    </message>
    <message>
        <location filename="../mainwindow.ui" line="2298"/>
        <location filename="../build/Desktop-Debug/VBDriveWizard_autogen/include/ui_mainwindow.h" line="2243"/>
        <source>+derivative</source>
        <translation>+производная</translation>
    </message>
    <message>
        <location filename="../mainwindow.ui" line="2355"/>
        <location filename="../build/Desktop-Debug/VBDriveWizard_autogen/include/ui_mainwindow.h" line="2246"/>
        <source>STATUS</source>
        <translation>СОСТОЯНИЕ</translation>
    </message>
    <message>
        <location filename="../mainwindow.ui" line="2361"/>
        <location filename="../build/Desktop-Debug/VBDriveWizard_autogen/include/ui_mainwindow.h" line="2247"/>
        <source>Model</source>
        <translation>Модель</translation>
    </message>
    <message>
        <location filename="../mainwindow.ui" line="2368"/>
        <location filename="../build/Desktop-Debug/VBDriveWizard_autogen/include/ui_mainwindow.h" line="2248"/>
        <source>M4310R10</source>
        <translation>M4310R10</translation>
    </message>
    <message>
        <location filename="../mainwindow.ui" line="2382"/>
        <location filename="../build/Desktop-Debug/VBDriveWizard_autogen/include/ui_mainwindow.h" line="2250"/>
        <source>Temperature MCU</source>
        <translation>Температура МК</translation>
    </message>
    <message>
        <location filename="../mainwindow.ui" line="2389"/>
        <location filename="../mainwindow.ui" line="2410"/>
        <location filename="../mainwindow.ui" line="2431"/>
        <location filename="../mainwindow.ui" line="2452"/>
        <location filename="../mainwindow.ui" line="2473"/>
        <location filename="../mainwindow.ui" line="2494"/>
        <location filename="../mainwindow.ui" line="2515"/>
        <location filename="../build/Desktop-Debug/VBDriveWizard_autogen/include/ui_mainwindow.h" line="2251"/>
        <location filename="../build/Desktop-Debug/VBDriveWizard_autogen/include/ui_mainwindow.h" line="2254"/>
        <location filename="../build/Desktop-Debug/VBDriveWizard_autogen/include/ui_mainwindow.h" line="2257"/>
        <location filename="../build/Desktop-Debug/VBDriveWizard_autogen/include/ui_mainwindow.h" line="2260"/>
        <location filename="../build/Desktop-Debug/VBDriveWizard_autogen/include/ui_mainwindow.h" line="2263"/>
        <location filename="../build/Desktop-Debug/VBDriveWizard_autogen/include/ui_mainwindow.h" line="2266"/>
        <location filename="../build/Desktop-Debug/VBDriveWizard_autogen/include/ui_mainwindow.h" line="2269"/>
        <source>TextLabel</source>
        <translation>TextLabel</translation>
    </message>
    <message>
        <location filename="../mainwindow.ui" line="2396"/>
        <location filename="../mainwindow.ui" line="2417"/>
        <location filename="../build/Desktop-Debug/VBDriveWizard_autogen/include/ui_mainwindow.h" line="2252"/>
        <location filename="../build/Desktop-Debug/VBDriveWizard_autogen/include/ui_mainwindow.h" line="2255"/>
        <source>C</source>
        <translation>C</translation>
    </message>
    <message>
        <location filename="../mainwindow.ui" line="2403"/>
        <location filename="../build/Desktop-Debug/VBDriveWizard_autogen/include/ui_mainwindow.h" line="2253"/>
        <source>Temperature Stator</source>
        <translation>Температура статора</translation>
    </message>
    <message>
        <location filename="../mainwindow.ui" line="2424"/>
        <location filename="../build/Desktop-Debug/VBDriveWizard_autogen/include/ui_mainwindow.h" line="2256"/>
        <source>Bus Voltage</source>
        <translation>Напряжение шины</translation>
    </message>
    <message>
        <location filename="../mainwindow.ui" line="2438"/>
        <location filename="../build/Desktop-Debug/VBDriveWizard_autogen/include/ui_mainwindow.h" line="2258"/>
        <source>V</source>
        <translation>V</translation>
    </message>
    <message>
        <location filename="../mainwindow.ui" line="2466"/>
        <location filename="../build/Desktop-Debug/VBDriveWizard_autogen/include/ui_mainwindow.h" line="2262"/>
        <source>Motor Encoder</source>
        <translation>Энкодер ротора</translation>
    </message>
    <message>
        <location filename="../mainwindow.ui" line="2480"/>
        <location filename="../mainwindow.ui" line="2501"/>
        <location filename="../mainwindow.ui" line="2522"/>
        <location filename="../build/Desktop-Debug/VBDriveWizard_autogen/include/ui_mainwindow.h" line="2264"/>
        <location filename="../build/Desktop-Debug/VBDriveWizard_autogen/include/ui_mainwindow.h" line="2267"/>
        <location filename="../build/Desktop-Debug/VBDriveWizard_autogen/include/ui_mainwindow.h" line="2270"/>
        <source>-</source>
        <translation>-</translation>
    </message>
    <message>
        <location filename="../mainwindow.ui" line="2487"/>
        <location filename="../build/Desktop-Debug/VBDriveWizard_autogen/include/ui_mainwindow.h" line="2265"/>
        <source>Shaft Encoder</source>
        <translation>Энкодер вала</translation>
    </message>
    <message>
        <location filename="../mainwindow.ui" line="2508"/>
        <location filename="../build/Desktop-Debug/VBDriveWizard_autogen/include/ui_mainwindow.h" line="2268"/>
        <source>Fault</source>
        <translation>Ошибка</translation>
    </message>
    <message>
        <location filename="../mainwindow.ui" line="2550"/>
        <location filename="../build/Desktop-Debug/VBDriveWizard_autogen/include/ui_mainwindow.h" line="2272"/>
        <source>STOP</source>
        <translation>СТОП</translation>
    </message>
    <message>
        <location filename="../mainwindow.cpp" line="164"/>
        <location filename="../mainwindow.cpp" line="177"/>
        <location filename="../mainwindow.cpp" line="797"/>
        <location filename="../mainwindow.cpp" line="824"/>
        <source>Connection failed</source>
        <translation>Не удалось подключиться</translation>
    </message>
    <message>
        <location filename="../mainwindow.cpp" line="199"/>
        <source>Firmware download failed</source>
        <translation>Не удалось загрузить прошивку</translation>
    </message>
    <message>
        <location filename="../mainwindow.cpp" line="203"/>
        <source>Downloaded firmware %1.</source>
        <translation>Прошивка %1 загружена.</translation>
    </message>
    <message>
        <location filename="../mainwindow.cpp" line="227"/>
        <source>Flashing failed</source>
        <translation>Не удалось прошить</translation>
    </message>
    <message>
        <location filename="../mainwindow.cpp" line="341"/>
        <location filename="../mainwindow.cpp" line="343"/>
        <location filename="../mainwindow.cpp" line="903"/>
        <location filename="../mainwindow.cpp" line="904"/>
        <source>Disconnect</source>
        <translation>Отключить</translation>
    </message>
    <message>
        <location filename="../mainwindow.cpp" line="345"/>
        <location filename="../mainwindow.cpp" line="2042"/>
        <source>Resume</source>
        <translation>Продолжить</translation>
    </message>
    <message>
        <location filename="../mainwindow.cpp" line="349"/>
        <location filename="../mainwindow.cpp" line="872"/>
        <source>Not connected</source>
        <translation>Не подключено</translation>
    </message>
    <message>
        <location filename="../mainwindow.cpp" line="366"/>
        <location filename="../mainwindow.cpp" line="1009"/>
        <source>Unsaved changes</source>
        <translation>Несохранённые изменения</translation>
    </message>
    <message>
        <location filename="../mainwindow.cpp" line="367"/>
        <source>Some register changes have not been written to the drive.
Close anyway?</source>
        <translation>Часть изменений регистров не записана в привод.
Всё равно закрыть?</translation>
    </message>
    <message>
        <location filename="../mainwindow.cpp" line="396"/>
        <location filename="../mainwindow.cpp" line="790"/>
        <source>Disconnecting...</source>
        <translation>Отключение...</translation>
    </message>
    <message>
        <location filename="../mainwindow.cpp" line="732"/>
        <source>%1 (unavailable)</source>
        <translation>%1 (недоступен)</translation>
    </message>
    <message>
        <location filename="../mainwindow.cpp" line="797"/>
        <source>No serial port selected.</source>
        <translation>Serial-порт не выбран.</translation>
    </message>
    <message>
        <location filename="../mainwindow.cpp" line="802"/>
        <source>Opening %1...</source>
        <translation>Открытие %1...</translation>
    </message>
    <message>
        <location filename="../mainwindow.cpp" line="830"/>
        <source>Listening for drives on %1...</source>
        <translation>Поиск приводов на %1...</translation>
    </message>
    <message>
        <location filename="../mainwindow.cpp" line="859"/>
        <source>Serial connected</source>
        <translation>Serial подключён</translation>
    </message>
    <message>
        <location filename="../mainwindow.cpp" line="860"/>
        <source>CAN connected</source>
        <translation>CAN подключён</translation>
    </message>
    <message>
        <location filename="../mainwindow.cpp" line="873"/>
        <source>Disconnected.</source>
        <translation>Отключено.</translation>
    </message>
    <message>
        <location filename="../mainwindow.cpp" line="944"/>
        <source>Sort by model</source>
        <translation>Сортировать по модели</translation>
    </message>
    <message>
        <location filename="../mainwindow.cpp" line="945"/>
        <source>Sort by Node ID</source>
        <translation>Сортировать по Node ID</translation>
    </message>
    <message>
        <location filename="../mainwindow.cpp" line="972"/>
        <source>  (no heartbeat)</source>
        <translation>  (нет heartbeat)</translation>
    </message>
    <message>
        <location filename="../mainwindow.cpp" line="1010"/>
        <source>Drive %1 has register changes that were not written.
Write them before switching?</source>
        <translation>У привода %1 есть незаписанные изменения регистров.
Записать их перед переключением?</translation>
    </message>
    <message>
        <location filename="../mainwindow.cpp" line="1082"/>
        <source>Reading registers...</source>
        <translation>Чтение регистров...</translation>
    </message>
    <message>
        <location filename="../mainwindow.cpp" line="1097"/>
        <source>No changes to write.</source>
        <translation>Нет изменений для записи.</translation>
    </message>
    <message numerus="yes">
        <location filename="../mainwindow.cpp" line="1108"/>
        <source>Writing %n register(s), the drive restarts to apply them...</source>
        <translation>
            <numerusform>Запись %n регистра, привод перезапустится для применения...</numerusform>
            <numerusform>Запись %n регистров, привод перезапустится для применения...</numerusform>
            <numerusform>Запись %n регистров, привод перезапустится для применения...</numerusform>
        </translation>
    </message>
    <message numerus="yes">
        <location filename="../mainwindow.cpp" line="1113"/>
        <source>Writing %n register(s)...</source>
        <translation>
            <numerusform>Запись %n регистра...</numerusform>
            <numerusform>Запись %n регистров...</numerusform>
            <numerusform>Запись %n регистров...</numerusform>
        </translation>
    </message>
    <message>
        <location filename="../mainwindow.cpp" line="1138"/>
        <source>Origin set; angle offset is now %1.</source>
        <translation>Ноль задан; смещение угла теперь %1.</translation>
    </message>
    <message>
        <location filename="../mainwindow.cpp" line="1148"/>
        <source>Calibrate sensor</source>
        <translation>Калибровка датчика</translation>
    </message>
    <message>
        <location filename="../mainwindow.cpp" line="1149"/>
        <source>Calibration moves the motor and cannot be cancelled. The drive stops answering until it finishes.

Start calibration?</source>
        <translation>Калибровка вращает двигатель и не может быть прервана. Привод не отвечает до её завершения.

Начать калибровку?</translation>
    </message>
    <message>
        <location filename="../mainwindow.cpp" line="1158"/>
        <source>Calibration started; the drive will not answer until it is done.</source>
        <translation>Калибровка запущена; привод не будет отвечать до её окончания.</translation>
    </message>
    <message>
        <location filename="../mainwindow.cpp" line="1180"/>
        <source>Save register profile</source>
        <translation>Сохранить профиль регистров</translation>
    </message>
    <message>
        <location filename="../mainwindow.cpp" line="1183"/>
        <location filename="../mainwindow.cpp" line="1206"/>
        <source>YAML files (*.yaml *.yml)</source>
        <translation>Файлы YAML (*.yaml *.yml)</translation>
    </message>
    <message>
        <location filename="../mainwindow.cpp" line="1197"/>
        <source>Could not save the profile</source>
        <translation>Не удалось сохранить профиль</translation>
    </message>
    <message>
        <location filename="../mainwindow.cpp" line="1199"/>
        <source>Profile saved to %1.</source>
        <translation>Профиль сохранён в %1.</translation>
    </message>
    <message>
        <location filename="../mainwindow.cpp" line="1205"/>
        <source>Load register profile</source>
        <translation>Загрузить профиль регистров</translation>
    </message>
    <message>
        <location filename="../mainwindow.cpp" line="1214"/>
        <source>Could not load the profile</source>
        <translation>Не удалось загрузить профиль</translation>
    </message>
    <message numerus="yes">
        <location filename="../mainwindow.cpp" line="1219"/>
        <source>Loaded %n register(s) from the profile.</source>
        <translation>
            <numerusform>Из профиля загружен %n регистр.</numerusform>
            <numerusform>Из профиля загружено %n регистра.</numerusform>
            <numerusform>Из профиля загружено %n регистров.</numerusform>
        </translation>
    </message>
    <message>
        <location filename="../mainwindow.cpp" line="1221"/>
        <source>Loaded with warnings: %1</source>
        <translation>Загружено с предупреждениями: %1</translation>
    </message>
    <message>
        <location filename="../mainwindow.cpp" line="1237"/>
        <source>Could not load the default profile</source>
        <translation>Не удалось загрузить профиль по умолчанию</translation>
    </message>
    <message>
        <location filename="../mainwindow.cpp" line="1241"/>
        <source>Default values for %1 loaded into the editors.</source>
        <translation>Значения по умолчанию для %1 загружены в поля.</translation>
    </message>
    <message>
        <location filename="../mainwindow.cpp" line="1269"/>
        <source>Could not read &apos;%1&apos;: %2</source>
        <translation>Не удалось прочитать «%1»: %2</translation>
    </message>
    <message>
        <location filename="../mainwindow.cpp" line="1316"/>
        <source>Could not write &apos;%1&apos;: %2</source>
        <translation>Не удалось записать «%1»: %2</translation>
    </message>
    <message>
        <location filename="../mainwindow.cpp" line="1326"/>
        <source>Registers written.</source>
        <translation>Регистры записаны.</translation>
    </message>
    <message>
        <location filename="../mainwindow.cpp" line="1334"/>
        <source>Some registers were not written</source>
        <translation>Часть регистров не записана</translation>
    </message>
    <message>
        <location filename="../mainwindow.cpp" line="1382"/>
        <source>Drive lost</source>
        <translation>Связь с приводом потеряна</translation>
    </message>
    <message>
        <location filename="../mainwindow.cpp" line="1383"/>
        <source>Drive %1 (node %2) stopped sending heartbeats.</source>
        <translation>Привод %1 (узел %2) перестал отправлять heartbeat.</translation>
    </message>
    <message>
        <location filename="../mainwindow.cpp" line="1386"/>
        <source>Wait for it to come back, keeping your unsaved register changes, or drop it and discard them?</source>
        <translation>Дождаться его возвращения, сохранив несохранённые изменения регистров, или убрать привод и отменить их?</translation>
    </message>
    <message>
        <location filename="../mainwindow.cpp" line="1388"/>
        <source>Reconnect</source>
        <translation>Подключить снова</translation>
    </message>
    <message>
        <location filename="../mainwindow.cpp" line="1389"/>
        <source>Remove drive</source>
        <translation>Убрать привод</translation>
    </message>
    <message>
        <location filename="../mainwindow.cpp" line="1401"/>
        <source>Waiting for node %1 to return...</source>
        <translation>Ожидание возвращения узла %1...</translation>
    </message>
    <message>
        <location filename="../mainwindow.cpp" line="1423"/>
        <source>The drive restarted with the new settings.</source>
        <translation>Привод перезапущен с новыми настройками.</translation>
    </message>
    <message>
        <location filename="../mainwindow.cpp" line="1436"/>
        <source>Node %1 is back.</source>
        <translation>Узел %1 снова на связи.</translation>
    </message>
    <message>
        <location filename="../mainwindow.cpp" line="1521"/>
        <source>Yes</source>
        <translation>Да</translation>
    </message>
    <message>
        <location filename="../mainwindow.cpp" line="1521"/>
        <source>No</source>
        <translation>Нет</translation>
    </message>
    <message>
        <location filename="../mainwindow.cpp" line="1655"/>
        <source>Target vel:</source>
        <translation>Заданная скорость:</translation>
    </message>
    <message>
        <location filename="../mainwindow.cpp" line="1657"/>
        <source>Target torq:</source>
        <translation>Заданный момент:</translation>
    </message>
    <message>
        <location filename="../mainwindow.cpp" line="1846"/>
        <source>Serial cannot sustain %1 Hz; running at %2 Hz instead.</source>
        <translation>Serial не выдерживает %1 Гц; используется %2 Гц.</translation>
    </message>
    <message>
        <location filename="../mainwindow.cpp" line="1907"/>
        <source>Feedback gains written.</source>
        <translation>Коэффициенты регулятора записаны.</translation>
    </message>
    <message>
        <location filename="../mainwindow.cpp" line="1926"/>
        <source>Transient form written.</source>
        <translation>Параметры переходного процесса записаны.</translation>
    </message>
    <message>
        <location filename="../mainwindow.cpp" line="1939"/>
        <source>Emergency stop: all drives disabled.</source>
        <translation>Аварийная остановка: все приводы выключены.</translation>
    </message>
    <message>
        <location filename="../mainwindow.cpp" line="1959"/>
        <source>Stop</source>
        <translation>Стоп</translation>
    </message>
    <message>
        <location filename="../mainwindow.cpp" line="2047"/>
        <source>Save plot data</source>
        <translation>Сохранить данные графика</translation>
    </message>
    <message>
        <location filename="../mainwindow.cpp" line="2048"/>
        <source>CSV files (*.csv)</source>
        <translation>Файлы CSV (*.csv)</translation>
    </message>
    <message>
        <location filename="../mainwindow.cpp" line="2053"/>
        <source>Could not save the CSV</source>
        <translation>Не удалось сохранить CSV</translation>
    </message>
    <message>
        <location filename="../mainwindow.cpp" line="2055"/>
        <source>Plot data saved.</source>
        <translation>Данные графика сохранены.</translation>
    </message>
    <message>
        <location filename="../mainwindow.cpp" line="2060"/>
        <source>Save plot image</source>
        <translation>Сохранить изображение графика</translation>
    </message>
    <message>
        <location filename="../mainwindow.cpp" line="2061"/>
        <source>PNG images (*.png)</source>
        <translation>Изображения PNG (*.png)</translation>
    </message>
    <message>
        <location filename="../mainwindow.cpp" line="2066"/>
        <source>Could not save the image</source>
        <translation>Не удалось сохранить изображение</translation>
    </message>
    <message>
        <location filename="../mainwindow.cpp" line="2068"/>
        <source>Plot image saved.</source>
        <translation>Изображение графика сохранено.</translation>
    </message>
    <message>
        <location filename="../mainwindow.cpp" line="2087"/>
        <source>Select firmware image</source>
        <translation>Выбрать файл прошивки</translation>
    </message>
    <message>
        <location filename="../mainwindow.cpp" line="2088"/>
        <source>Intel HEX files (*.hex)</source>
        <translation>Файлы Intel HEX (*.hex)</translation>
    </message>
    <message>
        <location filename="../mainwindow.cpp" line="2092"/>
        <source>Selected %1.</source>
        <translation>Выбрано: %1.</translation>
    </message>
    <message>
        <location filename="../mainwindow.cpp" line="2104"/>
        <source>No firmware selected</source>
        <translation>Прошивка не выбрана</translation>
    </message>
    <message>
        <location filename="../mainwindow.cpp" line="2105"/>
        <source>Choose a .hex file first, or switch to downloading the latest release.</source>
        <translation>Сначала выберите .hex-файл или переключитесь на загрузку последнего релиза.</translation>
    </message>
    <message>
        <location filename="../mainwindow.cpp" line="2121"/>
        <source>Flashing %1...</source>
        <translation>Прошивка %1...</translation>
    </message>
</context>
<context>
    <name>PlotController</name>
    <message>
        <location filename="../ui/plot_controller.cpp" line="125"/>
        <source>t, s</source>
        <translation>t, с</translation>
    </message>
    <message>
        <location filename="../ui/plot_controller.cpp" line="150"/>
        <source>Position</source>
        <translation>Положение</translation>
    </message>
    <message>
        <location filename="../ui/plot_controller.cpp" line="152"/>
        <source>Velocity</source>
        <translation>Скорость</translation>
    </message>
    <message>
        <location filename="../ui/plot_controller.cpp" line="154"/>
        <source>Torque</source>
        <translation>Момент</translation>
    </message>
    <message>
        <location filename="../ui/plot_controller.cpp" line="156"/>
        <source>MCU</source>
        <translation>МК</translation>
    </message>
    <message>
        <location filename="../ui/plot_controller.cpp" line="158"/>
        <source>Bus current</source>
        <translation>Ток шины</translation>
    </message>
    <message>
        <location filename="../ui/plot_controller.cpp" line="160"/>
        <source>Rotor</source>
        <translation>Ротор</translation>
    </message>
    <message>
        <location filename="../ui/plot_controller.cpp" line="173"/>
        <source>Target</source>
        <translation>Задание</translation>
    </message>
    <message>
        <location filename="../ui/plot_controller.cpp" line="175"/>
        <source>Stator</source>
        <translation>Статор</translation>
    </message>
    <message>
        <location filename="../ui/plot_controller.cpp" line="177"/>
        <source>Shaft</source>
        <translation>Вал</translation>
    </message>
    <message>
        <location filename="../ui/plot_controller.cpp" line="188"/>
        <source>Position, %1</source>
        <translation>Положение, %1</translation>
    </message>
    <message>
        <location filename="../ui/plot_controller.cpp" line="190"/>
        <source>Velocity, %1</source>
        <translation>Скорость, %1</translation>
    </message>
    <message>
        <location filename="../ui/plot_controller.cpp" line="193"/>
        <source>Torque, N*m</source>
        <translation>Момент, Н·м</translation>
    </message>
    <message>
        <location filename="../ui/plot_controller.cpp" line="195"/>
        <source>Temperature, C</source>
        <translation>Температура, °C</translation>
    </message>
    <message>
        <location filename="../ui/plot_controller.cpp" line="197"/>
        <source>Current, A</source>
        <translation>Ток, А</translation>
    </message>
    <message>
        <location filename="../ui/plot_controller.cpp" line="199"/>
        <source>Encoder, counts</source>
        <translation>Энкодер, отсчёты</translation>
    </message>
    <message>
        <location filename="../ui/plot_controller.cpp" line="482"/>
        <location filename="../ui/plot_controller.cpp" line="519"/>
        <source>The plot is not initialised.</source>
        <translation>График не инициализирован.</translation>
    </message>
    <message>
        <location filename="../ui/plot_controller.cpp" line="487"/>
        <source>The log view cannot be exported as an image.</source>
        <translation>Журнал нельзя сохранить как изображение.</translation>
    </message>
    <message>
        <location filename="../ui/plot_controller.cpp" line="501"/>
        <source>The plot could not be rendered.</source>
        <translation>Не удалось отрисовать график.</translation>
    </message>
    <message>
        <location filename="../ui/plot_controller.cpp" line="509"/>
        <source>Could not write %1.</source>
        <translation>Не удалось записать %1.</translation>
    </message>
    <message>
        <location filename="../ui/plot_controller.cpp" line="527"/>
        <location filename="../ui/plot_controller.cpp" line="535"/>
        <location filename="../ui/plot_controller.cpp" line="544"/>
        <location filename="../ui/plot_controller.cpp" line="580"/>
        <source>Could not write %1: %2</source>
        <translation>Не удалось записать %1: %2</translation>
    </message>
</context>
<context>
    <name>PreferencesDialog</name>
    <message>
        <location filename="../ui/preferences_dialog.ui" line="14"/>
        <source>Preferences</source>
        <translation>Настройки</translation>
    </message>
    <message>
        <location filename="../ui/preferences_dialog.ui" line="20"/>
        <source>Appearance</source>
        <translation>Оформление</translation>
    </message>
    <message>
        <location filename="../ui/preferences_dialog.ui" line="26"/>
        <source>Theme:</source>
        <translation>Тема:</translation>
    </message>
    <message>
        <location filename="../ui/preferences_dialog.ui" line="34"/>
        <source>Dark</source>
        <translation>Тёмная</translation>
    </message>
    <message>
        <location filename="../ui/preferences_dialog.ui" line="39"/>
        <source>Light</source>
        <translation>Светлая</translation>
    </message>
    <message>
        <location filename="../ui/preferences_dialog.ui" line="47"/>
        <source>Interface font size, pt:</source>
        <translation>Размер шрифта интерфейса, пт:</translation>
    </message>
    <message>
        <location filename="../ui/preferences_dialog.ui" line="67"/>
        <source>Plot</source>
        <translation>График</translation>
    </message>
    <message>
        <location filename="../ui/preferences_dialog.ui" line="73"/>
        <source>Plot font size, pt:</source>
        <translation>Размер шрифта графика, пт:</translation>
    </message>
    <message>
        <location filename="../ui/preferences_dialog.ui" line="90"/>
        <source>Line width, px:</source>
        <translation>Толщина линии, пикс:</translation>
    </message>
    <message>
        <location filename="../ui/preferences_dialog.ui" line="107"/>
        <source>Time window, s:</source>
        <translation>Временное окно, с:</translation>
    </message>
    <message>
        <location filename="../ui/preferences_dialog.ui" line="130"/>
        <source>Redraw rate, Hz:</source>
        <translation>Частота перерисовки, Гц:</translation>
    </message>
    <message>
        <location filename="../ui/preferences_dialog.ui" line="150"/>
        <source>Connection</source>
        <translation>Подключение</translation>
    </message>
    <message>
        <location filename="../ui/preferences_dialog.ui" line="156"/>
        <source>This application&apos;s Cyphal node ID:</source>
        <translation>Cyphal Node ID этого приложения:</translation>
    </message>
    <message>
        <location filename="../ui/preferences_dialog.ui" line="173"/>
        <source>Serial baud rate:</source>
        <translation>Скорость Serial-порта:</translation>
    </message>
    <message>
        <location filename="../ui/preferences_dialog.ui" line="196"/>
        <source>Firmware flashing (OpenOCD)</source>
        <translation>Прошивка (OpenOCD)</translation>
    </message>
    <message>
        <location filename="../ui/preferences_dialog.ui" line="202"/>
        <source>Interface config:</source>
        <translation>Конфигурация интерфейса:</translation>
    </message>
    <message>
        <location filename="../ui/preferences_dialog.ui" line="213"/>
        <source>Target config:</source>
        <translation>Конфигурация цели:</translation>
    </message>
    <message>
        <location filename="../ui/preferences_dialog.cpp" line="20"/>
        <source>OpenOCD interface script, relative to its scripts directory.
VBDrive is programmed over SWD with an ST-Link.</source>
        <translation>Скрипт интерфейса OpenOCD относительно его каталога scripts.
VBDrive программируется по SWD через ST-Link.</translation>
    </message>
    <message>
        <location filename="../ui/preferences_dialog.cpp" line="23"/>
        <source>OpenOCD target script. VBDrive uses an STM32G431VB.</source>
        <translation>Скрипт цели OpenOCD. В VBDrive используется STM32G431VB.</translation>
    </message>
    <message>
        <location filename="../ui/preferences_dialog.cpp" line="25"/>
        <source>Node ID this application announces on the CAN bus.
It must not collide with any drive.</source>
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
        <source>Restore the value this field had when the drive was selected</source>
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
        <location filename="../ui/restore_model_dialog.ui" line="20"/>
        <source>Load the factory register profile for this drive model. The values are placed in the editors; nothing is written to the drive until you press Write.</source>
        <translation>Загрузить заводской профиль регистров для этой модели привода. Значения попадут в поля; в привод ничего не записывается, пока вы не нажмёте «Записать».</translation>
    </message>
    <message>
        <location filename="../ui/restore_model_dialog.ui" line="32"/>
        <source>Drive model:</source>
        <translation>Модель привода:</translation>
    </message>
    <message>
        <location filename="../ui/restore_model_dialog.ui" line="40"/>
        <source>M4310R10</source>
        <translation>M4310R10</translation>
    </message>
    <message>
        <location filename="../ui/restore_model_dialog.ui" line="45"/>
        <source>M4310R36</source>
        <translation>M4310R36</translation>
    </message>
</context>
<context>
    <name>SerialService</name>
    <message>
        <location filename="../transport/serial_service.cpp" line="94"/>
        <source>Serial service is shutting down.</source>
        <translation>Serial-сервис завершает работу.</translation>
    </message>
    <message>
        <location filename="../transport/serial_service.cpp" line="123"/>
        <source>Reconnecting.</source>
        <translation>Переподключение.</translation>
    </message>
    <message>
        <location filename="../transport/serial_service.cpp" line="135"/>
        <location filename="../transport/serial_service.cpp" line="139"/>
        <location filename="../transport/serial_service.cpp" line="153"/>
        <location filename="../transport/serial_service.cpp" line="169"/>
        <location filename="../transport/serial_service.cpp" line="480"/>
        <source>Disconnected.</source>
        <translation>Отключено.</translation>
    </message>
    <message>
        <location filename="../transport/serial_service.cpp" line="201"/>
        <location filename="../transport/serial_service.cpp" line="227"/>
        <location filename="../transport/serial_service.cpp" line="658"/>
        <source>Serial port is not open.</source>
        <translation>Serial-порт не открыт.</translation>
    </message>
    <message>
        <location filename="../transport/serial_service.cpp" line="201"/>
        <location filename="../transport/serial_service.cpp" line="658"/>
        <source>Disconnecting.</source>
        <translation>Отключение.</translation>
    </message>
    <message>
        <location filename="../transport/serial_service.cpp" line="282"/>
        <source>Command &apos;%1&apos; failed: %2</source>
        <translation>Команда «%1» не выполнена: %2</translation>
    </message>
    <message>
        <location filename="../transport/serial_service.cpp" line="294"/>
        <source>The drive did not answer after restarting: %1</source>
        <translation>Привод не ответил после перезапуска: %1</translation>
    </message>
    <message>
        <location filename="../transport/serial_service.cpp" line="318"/>
        <source>Drive detected on %1.</source>
        <translation>Привод обнаружен на %1.</translation>
    </message>
    <message>
        <location filename="../transport/serial_service.cpp" line="319"/>
        <source>No drive answered on %1: %2</source>
        <translation>На %1 ни один привод не ответил: %2</translation>
    </message>
    <message>
        <location filename="../transport/serial_service.cpp" line="327"/>
        <source>Could not enter CONFIG mode: %1</source>
        <translation>Не удалось войти в режим CONFIG: %1</translation>
    </message>
    <message>
        <location filename="../transport/serial_service.cpp" line="376"/>
        <source>These registers were rejected by the drive: %1</source>
        <translation>Привод отклонил запись регистров: %1</translation>
    </message>
    <message>
        <location filename="../transport/serial_service.cpp" line="480"/>
        <source>Serial connection lost.</source>
        <translation>Serial-соединение потеряно.</translation>
    </message>
    <message>
        <location filename="../transport/serial_service.cpp" line="505"/>
        <source>The drive did not come back after restarting.</source>
        <translation>Привод не вернулся после перезапуска.</translation>
    </message>
    <message>
        <location filename="../transport/serial_service.cpp" line="562"/>
        <source>The drive did not answer in time.</source>
        <translation>Привод не ответил за отведённое время.</translation>
    </message>
    <message>
        <location filename="../transport/serial_service.cpp" line="626"/>
        <source>Could not interpret the value &apos;%1&apos;.</source>
        <translation>Не удалось разобрать значение «%1».</translation>
    </message>
</context>
<context>
    <name>SerialWorker</name>
    <message>
        <location filename="../transport/serial_worker.cpp" line="63"/>
        <source>Port %1 opened at %2 baud.</source>
        <translation>Порт %1 открыт на скорости %2 бод.</translation>
    </message>
    <message>
        <location filename="../transport/serial_worker.cpp" line="87"/>
        <source>Serial port is not open.</source>
        <translation>Serial-порт не открыт.</translation>
    </message>
</context>
</TS>
