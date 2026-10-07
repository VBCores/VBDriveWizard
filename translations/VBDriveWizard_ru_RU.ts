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
        <location filename="../ui/config_manager.cpp" line="283"/>
        <location filename="../ui/config_manager.cpp" line="334"/>
        <source>Cannot write %1: %2</source>
        <translation>Не удалось записать %1: %2</translation>
    </message>
    <message>
        <location filename="../ui/config_manager.cpp" line="345"/>
        <source>Settings loaded.</source>
        <translation>Настройки загружены.</translation>
    </message>
    <message>
        <location filename="../ui/config_manager.cpp" line="347"/>
        <source>No settings file found; defaults are in use.</source>
        <translation>Файл настроек не найден; используются значения по умолчанию.</translation>
    </message>
    <message>
        <location filename="../ui/config_manager.cpp" line="350"/>
        <source>Settings file could not be read; defaults are in use.</source>
        <translation>Не удалось прочитать файл настроек; используются значения по умолчанию.</translation>
    </message>
</context>
<context>
    <name>CyphalBridge</name>
    <message>
        <location filename="../transport/cyphal_worker.cpp" line="151"/>
        <source>The Cyphal stack reported an internal error.</source>
        <translation>Внутренняя ошибка стека Cyphal.</translation>
    </message>
    <message>
        <location filename="../transport/cyphal_worker.cpp" line="169"/>
        <source>Could not open CAN interface %1.</source>
        <translation>Не удалось открыть CAN-интерфейс %1.</translation>
    </message>
</context>
<context>
    <name>CyphalService</name>
    <message>
        <location filename="../transport/cyphal_service.cpp" line="75"/>
        <source>The CAN connection was closed.</source>
        <translation>CAN-соединение закрыто.</translation>
    </message>
    <message>
        <location filename="../transport/cyphal_service.cpp" line="143"/>
        <source>No VBDrive answered on %1 within %2 seconds.</source>
        <translation>За %2 с на интерфейсе %1 не ответил ни один привод VBDrive.</translation>
    </message>
    <message numerus="yes">
        <location filename="../transport/cyphal_service.cpp" line="149"/>
        <source>Found %n actuator(s) on %1.</source>
        <translation>
            <numerusform>Найден %n привод на %1.</numerusform>
            <numerusform>Найдено %n привода на %1.</numerusform>
            <numerusform>Найдено %n приводов на %1.</numerusform>
        </translation>
    </message>
    <message>
        <location filename="../transport/cyphal_service.cpp" line="173"/>
        <source>The actuator stopped answering.</source>
        <translation>Привод перестал отвечать.</translation>
    </message>
    <message>
        <location filename="../transport/cyphal_service.cpp" line="180"/>
        <source>The actuator did not answer register &apos;%1&apos; in time.</source>
        <translation>Привод не ответил на регистр «%1» за отведённое время.</translation>
    </message>
    <message>
        <location filename="../transport/cyphal_service.cpp" line="208"/>
        <source>Could not send the request.</source>
        <translation>Не удалось отправить запрос.</translation>
    </message>
    <message>
        <location filename="../transport/cyphal_service.cpp" line="231"/>
        <source>The actuator did not accept the value.</source>
        <translation>Привод не принял значение.</translation>
    </message>
    <message>
        <location filename="../transport/cyphal_service.cpp" line="232"/>
        <source>Register &apos;%1&apos; is read-only.</source>
        <translation>Регистр «%1» доступен только для чтения.</translation>
    </message>
    <message>
        <location filename="../transport/cyphal_service.cpp" line="243"/>
        <source>Register &apos;%1&apos; is not available on this actuator.</source>
        <translation>Регистр «%1» недоступен на этом приводе.</translation>
    </message>
    <message>
        <location filename="../transport/cyphal_service.cpp" line="285"/>
        <source>These registers were rejected by the actuator: %1</source>
        <translation>Привод отклонил запись регистров: %1</translation>
    </message>
</context>
<context>
    <name>DeviceModel</name>
    <message>
        <location filename="../core/device_model.cpp" line="14"/>
        <source>Unknown actuator</source>
        <translation>Неизвестный привод</translation>
    </message>
</context>
<context>
    <name>FirmwareDownloader</name>
    <message>
        <location filename="../firmware/firmware_downloader.cpp" line="178"/>
        <source>A firmware download is already running.</source>
        <translation>Загрузка прошивки уже выполняется.</translation>
    </message>
    <message>
        <source>Looking up the latest release...</source>
        <translation type="vanished">Поиск последнего релиза...</translation>
    </message>
    <message>
        <location filename="../firmware/firmware_downloader.cpp" line="41"/>
        <source>no answer within %1 s</source>
        <translation>нет ответа в течение %1 с</translation>
    </message>
    <message>
        <location filename="../firmware/firmware_downloader.cpp" line="113"/>
        <location filename="../firmware/firmware_downloader.cpp" line="145"/>
        <source>Could not reach the VBDrive releases: %1</source>
        <translation>Не удалось получить список релизов VBDrive: %1</translation>
    </message>
    <message>
        <location filename="../firmware/firmware_downloader.cpp" line="120"/>
        <source>The VBDrive releases did not name a latest version.</source>
        <translation>В релизах VBDrive не указана последняя версия.</translation>
    </message>
    <message>
        <location filename="../firmware/firmware_downloader.cpp" line="151"/>
        <source>The VBDrive releases answered with something other than a list.</source>
        <translation>Сервер релизов VBDrive вернул не список.</translation>
    </message>
    <message>
        <location filename="../firmware/firmware_downloader.cpp" line="182"/>
        <source>Release %1 does not contain %2.</source>
        <translation>Релиз %1 не содержит %2.</translation>
    </message>
    <message>
        <location filename="../firmware/firmware_downloader.cpp" line="183"/>
        <source>(unknown)</source>
        <translation>(неизвестно)</translation>
    </message>
    <message>
        <location filename="../firmware/firmware_downloader.cpp" line="192"/>
        <source>Downloading %1...</source>
        <translation>Загрузка %1...</translation>
    </message>
    <message>
        <location filename="../firmware/firmware_downloader.cpp" line="203"/>
        <source>Downloading %1: %2 of %3 (%4%)</source>
        <translation>Загрузка %1: %2 из %3 (%4%)</translation>
    </message>
    <message>
        <location filename="../firmware/firmware_downloader.cpp" line="209"/>
        <source>Downloading %1: %2 received</source>
        <translation>Загрузка %1: получено %2</translation>
    </message>
    <message>
        <location filename="../firmware/firmware_downloader.cpp" line="225"/>
        <source>Firmware download failed: %1</source>
        <translation>Не удалось загрузить прошивку: %1</translation>
    </message>
    <message>
        <location filename="../firmware/firmware_downloader.cpp" line="236"/>
        <location filename="../firmware/firmware_downloader.cpp" line="241"/>
        <source>Could not write %1: %2</source>
        <translation>Не удалось записать %1: %2</translation>
    </message>
    <message>
        <location filename="../firmware/firmware_downloader.cpp" line="245"/>
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
        <location filename="../build/Desktop-Debug/VBDriveWizard_autogen/include/ui_mainwindow.h" line="2869"/>
        <location filename="../build/Desktop-Debug/VBDriveWizard_autogen/include/ui_mainwindow.h" line="2871"/>
        <source>VBDrive Wizard</source>
        <translation>VBDrive Wizard</translation>
    </message>
    <message>
        <location filename="../mainwindow.ui" line="95"/>
        <location filename="../build/Desktop-Debug/VBDriveWizard_autogen/include/ui_mainwindow.h" line="2872"/>
        <source>CONNECTION</source>
        <translation>ПОДКЛЮЧЕНИЕ</translation>
    </message>
    <message>
        <location filename="../mainwindow.ui" line="133"/>
        <location filename="../build/Desktop-Debug/VBDriveWizard_autogen/include/ui_mainwindow.h" line="2873"/>
        <source>Serial</source>
        <translation>Serial</translation>
    </message>
    <message>
        <location filename="../mainwindow.ui" line="209"/>
        <location filename="../mainwindow.ui" line="277"/>
        <location filename="../mainwindow.cpp" line="1067"/>
        <location filename="../mainwindow.cpp" line="1332"/>
        <location filename="../mainwindow.cpp" line="1333"/>
        <location filename="../build/Desktop-Debug/VBDriveWizard_autogen/include/ui_mainwindow.h" line="2875"/>
        <location filename="../build/Desktop-Debug/VBDriveWizard_autogen/include/ui_mainwindow.h" line="2880"/>
        <source>Connect</source>
        <translation>Подключить</translation>
    </message>
    <message>
        <location filename="../mainwindow.ui" line="222"/>
        <location filename="../mainwindow.ui" line="293"/>
        <location filename="../build/Desktop-Debug/VBDriveWizard_autogen/include/ui_mainwindow.h" line="2877"/>
        <location filename="../build/Desktop-Debug/VBDriveWizard_autogen/include/ui_mainwindow.h" line="2882"/>
        <source>Refresh</source>
        <translation>Обновить</translation>
    </message>
    <message>
        <location filename="../mainwindow.ui" line="146"/>
        <location filename="../mainwindow.ui" line="705"/>
        <location filename="../build/Desktop-Debug/VBDriveWizard_autogen/include/ui_mainwindow.h" line="2874"/>
        <location filename="../build/Desktop-Debug/VBDriveWizard_autogen/include/ui_mainwindow.h" line="2924"/>
        <source>CAN</source>
        <translation>CAN</translation>
    </message>
    <message>
        <location filename="../mainwindow.ui" line="323"/>
        <location filename="../build/Desktop-Debug/VBDriveWizard_autogen/include/ui_mainwindow.h" line="2885"/>
        <source>DEVICES</source>
        <translation>УСТРОЙСТВА</translation>
    </message>
    <message>
        <location filename="../mainwindow.ui" line="422"/>
        <location filename="../build/Desktop-Debug/VBDriveWizard_autogen/include/ui_mainwindow.h" line="2890"/>
        <source>CONFIGURATION</source>
        <translation>КОНФИГУРАЦИЯ</translation>
    </message>
    <message>
        <location filename="../mainwindow.ui" line="447"/>
        <location filename="../build/Desktop-Debug/VBDriveWizard_autogen/include/ui_mainwindow.h" line="2909"/>
        <source>Basic</source>
        <translation>Основные</translation>
    </message>
    <message>
        <location filename="../mainwindow.ui" line="468"/>
        <location filename="../build/Desktop-Debug/VBDriveWizard_autogen/include/ui_mainwindow.h" line="2891"/>
        <source>Limits</source>
        <translation>Ограничения</translation>
    </message>
    <message>
        <location filename="../mainwindow.ui" line="621"/>
        <location filename="../mainwindow.ui" line="4469"/>
        <location filename="../build/Desktop-Debug/VBDriveWizard_autogen/include/ui_mainwindow.h" line="2904"/>
        <location filename="../build/Desktop-Debug/VBDriveWizard_autogen/include/ui_mainwindow.h" line="3066"/>
        <source>Angle</source>
        <translation>Угол</translation>
    </message>
    <message>
        <location filename="../mainwindow.ui" line="555"/>
        <location filename="../build/Desktop-Debug/VBDriveWizard_autogen/include/ui_mainwindow.h" line="2897"/>
        <source>min:</source>
        <translation>мин</translation>
    </message>
    <message>
        <location filename="../mainwindow.ui" line="600"/>
        <location filename="../build/Desktop-Debug/VBDriveWizard_autogen/include/ui_mainwindow.h" line="2901"/>
        <source>max</source>
        <translation>макс</translation>
    </message>
    <message>
        <location filename="../mainwindow.ui" line="607"/>
        <location filename="../mainwindow.ui" line="4007"/>
        <location filename="../mainwindow.ui" line="4203"/>
        <location filename="../build/Desktop-Debug/VBDriveWizard_autogen/include/ui_mainwindow.h" line="2902"/>
        <location filename="../build/Desktop-Debug/VBDriveWizard_autogen/include/ui_mainwindow.h" line="3048"/>
        <location filename="../build/Desktop-Debug/VBDriveWizard_autogen/include/ui_mainwindow.h" line="3054"/>
        <source>Velocity</source>
        <translation>Скорость</translation>
    </message>
    <message>
        <location filename="../mainwindow.ui" line="614"/>
        <location filename="../mainwindow.ui" line="2031"/>
        <location filename="../mainwindow.ui" line="4037"/>
        <location filename="../mainwindow.ui" line="4213"/>
        <location filename="../build/Desktop-Debug/VBDriveWizard_autogen/include/ui_mainwindow.h" line="2903"/>
        <location filename="../build/Desktop-Debug/VBDriveWizard_autogen/include/ui_mainwindow.h" line="2997"/>
        <location filename="../build/Desktop-Debug/VBDriveWizard_autogen/include/ui_mainwindow.h" line="3049"/>
        <location filename="../build/Desktop-Debug/VBDriveWizard_autogen/include/ui_mainwindow.h" line="3055"/>
        <source>Torque</source>
        <translation>Момент</translation>
    </message>
    <message>
        <location filename="../mainwindow.ui" line="650"/>
        <location filename="../build/Desktop-Debug/VBDriveWizard_autogen/include/ui_mainwindow.h" line="2908"/>
        <source>Voltage</source>
        <translation>Напряжение</translation>
    </message>
    <message>
        <location filename="../mainwindow.ui" line="581"/>
        <location filename="../mainwindow.ui" line="647"/>
        <location filename="../build/Desktop-Debug/VBDriveWizard_autogen/include/ui_mainwindow.h" line="2899"/>
        <location filename="../build/Desktop-Debug/VBDriveWizard_autogen/include/ui_mainwindow.h" line="2906"/>
        <source>The firmware exposes no voltage limit register yet.</source>
        <translation>В прошивке пока нет регистра ограничения напряжения.</translation>
    </message>
    <message>
        <location filename="../mainwindow.ui" line="548"/>
        <location filename="../build/Desktop-Debug/VBDriveWizard_autogen/include/ui_mainwindow.h" line="2896"/>
        <source>Current</source>
        <translation>Ток</translation>
    </message>
    <message>
        <location filename="../mainwindow.ui" line="541"/>
        <location filename="../build/Desktop-Debug/VBDriveWizard_autogen/include/ui_mainwindow.h" line="2895"/>
        <source>Direction</source>
        <translation>Направление</translation>
    </message>
    <message>
        <location filename="../mainwindow.ui" line="406"/>
        <location filename="../mainwindow.ui" line="978"/>
        <location filename="../build/Desktop-Debug/VBDriveWizard_autogen/include/ui_mainwindow.h" line="2889"/>
        <location filename="../build/Desktop-Debug/VBDriveWizard_autogen/include/ui_mainwindow.h" line="2932"/>
        <source>Name</source>
        <translation>Имя</translation>
    </message>
    <message>
        <location filename="../mainwindow.ui" line="411"/>
        <location filename="../build/Desktop-Debug/VBDriveWizard_autogen/include/ui_mainwindow.h" line="2888"/>
        <source>CAN ID</source>
        <translation>CAN ID</translation>
    </message>
    <message>
        <location filename="../mainwindow.ui" line="512"/>
        <location filename="../build/Desktop-Debug/VBDriveWizard_autogen/include/ui_mainwindow.h" line="2892"/>
        <source>CCW</source>
        <translation>Против часовой</translation>
    </message>
    <message>
        <location filename="../mainwindow.ui" line="517"/>
        <location filename="../build/Desktop-Debug/VBDriveWizard_autogen/include/ui_mainwindow.h" line="2893"/>
        <source>CW</source>
        <translation>По часовой</translation>
    </message>
    <message>
        <location filename="../mainwindow.ui" line="729"/>
        <location filename="../build/Desktop-Debug/VBDriveWizard_autogen/include/ui_mainwindow.h" line="2910"/>
        <source>Data Baud Rate</source>
        <translation>Data Baud Rate</translation>
    </message>
    <message>
        <location filename="../mainwindow.ui" line="736"/>
        <location filename="../build/Desktop-Debug/VBDriveWizard_autogen/include/ui_mainwindow.h" line="2911"/>
        <source>Node ID</source>
        <translation>Node ID</translation>
    </message>
    <message>
        <location filename="../mainwindow.ui" line="763"/>
        <location filename="../build/Desktop-Debug/VBDriveWizard_autogen/include/ui_mainwindow.h" line="2912"/>
        <source>62.5 kHz</source>
        <translation>62.5 kHz</translation>
    </message>
    <message>
        <location filename="../mainwindow.ui" line="768"/>
        <location filename="../build/Desktop-Debug/VBDriveWizard_autogen/include/ui_mainwindow.h" line="2913"/>
        <source>125 kHz</source>
        <translation>125 kHz</translation>
    </message>
    <message>
        <location filename="../mainwindow.ui" line="773"/>
        <location filename="../build/Desktop-Debug/VBDriveWizard_autogen/include/ui_mainwindow.h" line="2914"/>
        <source>250 kHz</source>
        <translation>250 kHz</translation>
    </message>
    <message>
        <location filename="../mainwindow.ui" line="778"/>
        <location filename="../build/Desktop-Debug/VBDriveWizard_autogen/include/ui_mainwindow.h" line="2915"/>
        <source>500 kHz</source>
        <translation>500 kHz</translation>
    </message>
    <message>
        <location filename="../mainwindow.ui" line="783"/>
        <location filename="../mainwindow.ui" line="795"/>
        <location filename="../build/Desktop-Debug/VBDriveWizard_autogen/include/ui_mainwindow.h" line="2916"/>
        <location filename="../build/Desktop-Debug/VBDriveWizard_autogen/include/ui_mainwindow.h" line="2918"/>
        <source>1 MHz</source>
        <translation>1 MHz</translation>
    </message>
    <message>
        <location filename="../mainwindow.ui" line="800"/>
        <location filename="../build/Desktop-Debug/VBDriveWizard_autogen/include/ui_mainwindow.h" line="2919"/>
        <source>2 MHz</source>
        <translation>2 MHz</translation>
    </message>
    <message>
        <location filename="../mainwindow.ui" line="805"/>
        <location filename="../build/Desktop-Debug/VBDriveWizard_autogen/include/ui_mainwindow.h" line="2920"/>
        <source>4 MHz</source>
        <translation>4 MHz</translation>
    </message>
    <message>
        <location filename="../mainwindow.ui" line="810"/>
        <location filename="../build/Desktop-Debug/VBDriveWizard_autogen/include/ui_mainwindow.h" line="2921"/>
        <source>8 MHz</source>
        <translation>8 MHz</translation>
    </message>
    <message>
        <location filename="../mainwindow.ui" line="818"/>
        <location filename="../build/Desktop-Debug/VBDriveWizard_autogen/include/ui_mainwindow.h" line="2923"/>
        <source>Nom Baud Rate</source>
        <translation>Nom Baud Rate</translation>
    </message>
    <message>
        <location filename="../mainwindow.ui" line="869"/>
        <location filename="../build/Desktop-Debug/VBDriveWizard_autogen/include/ui_mainwindow.h" line="2943"/>
        <source>Advanced</source>
        <translation>Расширенные</translation>
    </message>
    <message>
        <location filename="../mainwindow.ui" line="926"/>
        <location filename="../build/Desktop-Debug/VBDriveWizard_autogen/include/ui_mainwindow.h" line="2925"/>
        <source>Gear Ratio</source>
        <translation>Передаточное число</translation>
    </message>
    <message>
        <location filename="../mainwindow.ui" line="1001"/>
        <location filename="../build/Desktop-Debug/VBDriveWizard_autogen/include/ui_mainwindow.h" line="2933"/>
        <source>Encoder</source>
        <translation>Энкодер</translation>
    </message>
    <message>
        <location filename="../mainwindow.ui" line="1190"/>
        <location filename="../build/Desktop-Debug/VBDriveWizard_autogen/include/ui_mainwindow.h" line="2941"/>
        <source>Torque const</source>
        <translation>Постоянная момента</translation>
    </message>
    <message>
        <location filename="../mainwindow.ui" line="1173"/>
        <location filename="../build/Desktop-Debug/VBDriveWizard_autogen/include/ui_mainwindow.h" line="2939"/>
        <source>Current Kp</source>
        <translation>Kp тока</translation>
    </message>
    <message>
        <location filename="../mainwindow.ui" line="1166"/>
        <location filename="../build/Desktop-Debug/VBDriveWizard_autogen/include/ui_mainwindow.h" line="2938"/>
        <source>Current Ki</source>
        <translation>Ki тока</translation>
    </message>
    <message>
        <location filename="../mainwindow.ui" line="1072"/>
        <location filename="../build/Desktop-Debug/VBDriveWizard_autogen/include/ui_mainwindow.h" line="2934"/>
        <source>Position Offset</source>
        <translation>Смещение положения</translation>
    </message>
    <message>
        <location filename="../mainwindow.ui" line="1085"/>
        <location filename="../build/Desktop-Debug/VBDriveWizard_autogen/include/ui_mainwindow.h" line="2935"/>
        <source>Main Filt Prm A</source>
        <translation>Осн. фильтр коэф. A</translation>
    </message>
    <message>
        <location filename="../mainwindow.ui" line="1180"/>
        <location filename="../build/Desktop-Debug/VBDriveWizard_autogen/include/ui_mainwindow.h" line="2940"/>
        <source>Filter Gain 1</source>
        <translation>Коэф. фильтра 1</translation>
    </message>
    <message>
        <location filename="../mainwindow.ui" line="1143"/>
        <location filename="../build/Desktop-Debug/VBDriveWizard_autogen/include/ui_mainwindow.h" line="2937"/>
        <source>Filter Gain 2</source>
        <translation>Коэф. фильтра 2</translation>
    </message>
    <message>
        <location filename="../mainwindow.ui" line="949"/>
        <location filename="../build/Desktop-Debug/VBDriveWizard_autogen/include/ui_mainwindow.h" line="2927"/>
        <source>Filter Gain 3</source>
        <translation>Коэф. фильтра 3</translation>
    </message>
    <message>
        <location filename="../mainwindow.ui" line="1111"/>
        <location filename="../build/Desktop-Debug/VBDriveWizard_autogen/include/ui_mainwindow.h" line="2936"/>
        <source>Current LPF Gain</source>
        <translation>Коэф. ФНЧ тока</translation>
    </message>
    <message>
        <location filename="../mainwindow.ui" line="960"/>
        <location filename="../build/Desktop-Debug/VBDriveWizard_autogen/include/ui_mainwindow.h" line="2928"/>
        <source>rotor</source>
        <translation>ротор</translation>
    </message>
    <message>
        <location filename="../mainwindow.ui" line="965"/>
        <location filename="../build/Desktop-Debug/VBDriveWizard_autogen/include/ui_mainwindow.h" line="2929"/>
        <source>shaft</source>
        <translation>вал</translation>
    </message>
    <message>
        <location filename="../mainwindow.ui" line="970"/>
        <location filename="../build/Desktop-Debug/VBDriveWizard_autogen/include/ui_mainwindow.h" line="2930"/>
        <source>external</source>
        <translation>внешний</translation>
    </message>
    <message>
        <location filename="../mainwindow.ui" line="942"/>
        <location filename="../build/Desktop-Debug/VBDriveWizard_autogen/include/ui_mainwindow.h" line="2926"/>
        <source>Current Kd</source>
        <translation>Kd тока</translation>
    </message>
    <message>
        <location filename="../mainwindow.ui" line="1279"/>
        <location filename="../build/Desktop-Debug/VBDriveWizard_autogen/include/ui_mainwindow.h" line="2960"/>
        <source>System</source>
        <translation>Система</translation>
    </message>
    <message>
        <location filename="../mainwindow.ui" line="1300"/>
        <location filename="../build/Desktop-Debug/VBDriveWizard_autogen/include/ui_mainwindow.h" line="2944"/>
        <source>Sensor</source>
        <translation>Датчик</translation>
    </message>
    <message>
        <location filename="../mainwindow.ui" line="1327"/>
        <location filename="../build/Desktop-Debug/VBDriveWizard_autogen/include/ui_mainwindow.h" line="2945"/>
        <source>Calibrate</source>
        <translation>Калибровать</translation>
    </message>
    <message>
        <location filename="../mainwindow.ui" line="1353"/>
        <location filename="../build/Desktop-Debug/VBDriveWizard_autogen/include/ui_mainwindow.h" line="2946"/>
        <source>Register Parameters</source>
        <translation>Параметры регистров</translation>
    </message>
    <message>
        <location filename="../mainwindow.ui" line="1377"/>
        <location filename="../build/Desktop-Debug/VBDriveWizard_autogen/include/ui_mainwindow.h" line="2947"/>
        <source>Save to File...</source>
        <translation>Сохранить...</translation>
    </message>
    <message>
        <location filename="../mainwindow.ui" line="1384"/>
        <location filename="../build/Desktop-Debug/VBDriveWizard_autogen/include/ui_mainwindow.h" line="2948"/>
        <source>Load from File...</source>
        <translation>Загрузить...</translation>
    </message>
    <message>
        <location filename="../mainwindow.ui" line="1391"/>
        <location filename="../build/Desktop-Debug/VBDriveWizard_autogen/include/ui_mainwindow.h" line="2949"/>
        <source>Restore to Default</source>
        <translation>Значения по умолчанию</translation>
    </message>
    <message>
        <location filename="../mainwindow.ui" line="1401"/>
        <location filename="../build/Desktop-Debug/VBDriveWizard_autogen/include/ui_mainwindow.h" line="2950"/>
        <source>Firmware</source>
        <translation>Прошивка</translation>
    </message>
    <message>
        <location filename="../mainwindow.ui" line="1445"/>
        <location filename="../build/Desktop-Debug/VBDriveWizard_autogen/include/ui_mainwindow.h" line="2951"/>
        <source>Current Revision:</source>
        <translation>Текущая версия:</translation>
    </message>
    <message>
        <location filename="../mainwindow.ui" line="1452"/>
        <location filename="../build/Desktop-Debug/VBDriveWizard_autogen/include/ui_mainwindow.h" line="2952"/>
        <source>0.0.1</source>
        <translation>0.0.1</translation>
    </message>
    <message>
        <source>Choose file</source>
        <translation type="vanished">Выбрать файл</translation>
    </message>
    <message>
        <location filename="../mainwindow.ui" line="1526"/>
        <location filename="../build/Desktop-Debug/VBDriveWizard_autogen/include/ui_mainwindow.h" line="2955"/>
        <source>Open</source>
        <translation>Открыть</translation>
    </message>
    <message>
        <source>Download from remote repo</source>
        <translation type="vanished">Скачать из репозитория</translation>
    </message>
    <message>
        <location filename="../mainwindow.ui" line="1581"/>
        <location filename="../build/Desktop-Debug/VBDriveWizard_autogen/include/ui_mainwindow.h" line="2959"/>
        <source>Flash</source>
        <translation>Прошить</translation>
    </message>
    <message>
        <location filename="../mainwindow.ui" line="1634"/>
        <location filename="../build/Desktop-Debug/VBDriveWizard_autogen/include/ui_mainwindow.h" line="2961"/>
        <source>Read</source>
        <translation>Прочитать</translation>
    </message>
    <message>
        <location filename="../mainwindow.ui" line="1641"/>
        <location filename="../build/Desktop-Debug/VBDriveWizard_autogen/include/ui_mainwindow.h" line="2962"/>
        <source>Write</source>
        <translation>Записать</translation>
    </message>
    <message>
        <location filename="../mainwindow.ui" line="1648"/>
        <location filename="../build/Desktop-Debug/VBDriveWizard_autogen/include/ui_mainwindow.h" line="2963"/>
        <source>Set Origin</source>
        <translation>Задать ноль</translation>
    </message>
    <message>
        <source>&lt;html&gt;&lt;head/&gt;&lt;body&gt;&lt;p align=&quot;center&quot;&gt;Logo&lt;/p&gt;&lt;/body&gt;&lt;/html&gt;</source>
        <translation type="vanished">&lt;html&gt;&lt;head/&gt;&lt;body&gt;&lt;p align=&quot;center&quot;&gt;Logo&lt;/p&gt;&lt;/body&gt;&lt;/html&gt;</translation>
    </message>
    <message>
        <location filename="../mainwindow.ui" line="1662"/>
        <location filename="../build/Desktop-Debug/VBDriveWizard_autogen/include/ui_mainwindow.h" line="2964"/>
        <source>REALTIME DATA</source>
        <translation>ДАННЫЕ В РЕАЛЬНОМ ВРЕМЕНИ</translation>
    </message>
    <message>
        <source>Signal:</source>
        <translation type="vanished">Сигнал:</translation>
    </message>
    <message>
        <location filename="../mainwindow.ui" line="3977"/>
        <location filename="../mainwindow.ui" line="4190"/>
        <location filename="../build/Desktop-Debug/VBDriveWizard_autogen/include/ui_mainwindow.h" line="3047"/>
        <location filename="../build/Desktop-Debug/VBDriveWizard_autogen/include/ui_mainwindow.h" line="3053"/>
        <source>Position</source>
        <translation>Угол</translation>
    </message>
    <message>
        <source>Temperature</source>
        <translation type="vanished">Температура</translation>
    </message>
    <message>
        <location filename="../mainwindow.ui" line="1766"/>
        <location filename="../build/Desktop-Debug/VBDriveWizard_autogen/include/ui_mainwindow.h" line="2978"/>
        <source>Log</source>
        <translation>Журнал</translation>
    </message>
    <message>
        <location filename="../mainwindow.ui" line="1789"/>
        <location filename="../build/Desktop-Debug/VBDriveWizard_autogen/include/ui_mainwindow.h" line="2981"/>
        <source>Units:</source>
        <translation>Единицы:</translation>
    </message>
    <message>
        <location filename="../mainwindow.ui" line="1797"/>
        <location filename="../mainwindow.ui" line="4462"/>
        <location filename="../build/Desktop-Debug/VBDriveWizard_autogen/include/ui_mainwindow.h" line="2982"/>
        <location filename="../build/Desktop-Debug/VBDriveWizard_autogen/include/ui_mainwindow.h" line="3065"/>
        <source>rad</source>
        <translation>rad</translation>
    </message>
    <message>
        <location filename="../mainwindow.ui" line="1802"/>
        <location filename="../build/Desktop-Debug/VBDriveWizard_autogen/include/ui_mainwindow.h" line="2983"/>
        <source>deg</source>
        <translation>deg</translation>
    </message>
    <message>
        <location filename="../mainwindow.ui" line="1893"/>
        <location filename="../build/Desktop-Debug/VBDriveWizard_autogen/include/ui_mainwindow.h" line="2990"/>
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
        <location filename="../mainwindow.ui" line="1817"/>
        <location filename="../build/Desktop-Debug/VBDriveWizard_autogen/include/ui_mainwindow.h" line="2985"/>
        <source>X:</source>
        <translation>X:</translation>
    </message>
    <message>
        <location filename="../mainwindow.ui" line="1831"/>
        <location filename="../build/Desktop-Debug/VBDriveWizard_autogen/include/ui_mainwindow.h" line="2986"/>
        <source>Y:</source>
        <translation>Y:</translation>
    </message>
    <message>
        <source>Dist X:</source>
        <translation type="vanished">ΔX:</translation>
    </message>
    <message>
        <source>Dist Y:</source>
        <translation type="vanished">ΔY:</translation>
    </message>
    <message>
        <location filename="../mainwindow.ui" line="1938"/>
        <location filename="../build/Desktop-Debug/VBDriveWizard_autogen/include/ui_mainwindow.h" line="2993"/>
        <source>CONTROL</source>
        <translation>УПРАВЛЕНИЕ</translation>
    </message>
    <message>
        <location filename="../mainwindow.ui" line="1966"/>
        <location filename="../build/Desktop-Debug/VBDriveWizard_autogen/include/ui_mainwindow.h" line="3040"/>
        <source>Servo</source>
        <translation>Servo</translation>
    </message>
    <message>
        <location filename="../mainwindow.ui" line="1987"/>
        <location filename="../build/Desktop-Debug/VBDriveWizard_autogen/include/ui_mainwindow.h" line="2994"/>
        <source>Control Type</source>
        <translation>Режим</translation>
    </message>
    <message>
        <location filename="../mainwindow.ui" line="2067"/>
        <location filename="../build/Desktop-Debug/VBDriveWizard_autogen/include/ui_mainwindow.h" line="2999"/>
        <source>Transient Form</source>
        <translation>Переходный процесс</translation>
    </message>
    <message>
        <source>Linear</source>
        <translation type="vanished">Линейный</translation>
    </message>
    <message>
        <source>Polynomial</source>
        <translation type="vanished">Полиномиальный</translation>
    </message>
    <message>
        <location filename="../mainwindow.ui" line="2477"/>
        <location filename="../mainwindow.ui" line="2637"/>
        <location filename="../mainwindow.ui" line="2781"/>
        <location filename="../mainwindow.ui" line="3001"/>
        <location filename="../mainwindow.ui" line="3154"/>
        <location filename="../build/Desktop-Debug/VBDriveWizard_autogen/include/ui_mainwindow.h" line="3009"/>
        <location filename="../build/Desktop-Debug/VBDriveWizard_autogen/include/ui_mainwindow.h" line="3013"/>
        <location filename="../build/Desktop-Debug/VBDriveWizard_autogen/include/ui_mainwindow.h" line="3015"/>
        <location filename="../build/Desktop-Debug/VBDriveWizard_autogen/include/ui_mainwindow.h" line="3020"/>
        <location filename="../build/Desktop-Debug/VBDriveWizard_autogen/include/ui_mainwindow.h" line="3023"/>
        <source>Set</source>
        <translation>Задать</translation>
    </message>
    <message>
        <location filename="../mainwindow.ui" line="2803"/>
        <location filename="../build/Desktop-Debug/VBDriveWizard_autogen/include/ui_mainwindow.h" line="3016"/>
        <source>Feedback Gains</source>
        <translation>Коэффициенты регулятора</translation>
    </message>
    <message>
        <location filename="../mainwindow.ui" line="2866"/>
        <location filename="../mainwindow.ui" line="3049"/>
        <location filename="../build/Desktop-Debug/VBDriveWizard_autogen/include/ui_mainwindow.h" line="3017"/>
        <location filename="../build/Desktop-Debug/VBDriveWizard_autogen/include/ui_mainwindow.h" line="3021"/>
        <source>Kp:</source>
        <translation>Kp:</translation>
    </message>
    <message>
        <location filename="../mainwindow.ui" line="2896"/>
        <location filename="../mainwindow.ui" line="3079"/>
        <location filename="../build/Desktop-Debug/VBDriveWizard_autogen/include/ui_mainwindow.h" line="3018"/>
        <location filename="../build/Desktop-Debug/VBDriveWizard_autogen/include/ui_mainwindow.h" line="3022"/>
        <source>Ki:</source>
        <translation>Ki:</translation>
    </message>
    <message>
        <location filename="../mainwindow.ui" line="2926"/>
        <location filename="../build/Desktop-Debug/VBDriveWizard_autogen/include/ui_mainwindow.h" line="3019"/>
        <source>Kd:</source>
        <translation>Kd:</translation>
    </message>
    <message>
        <location filename="../mainwindow.ui" line="3232"/>
        <location filename="../build/Desktop-Debug/VBDriveWizard_autogen/include/ui_mainwindow.h" line="3027"/>
        <source>User</source>
        <translation>Вручную</translation>
    </message>
    <message>
        <source>Target pos:</source>
        <translation type="vanished">Команда:</translation>
    </message>
    <message>
        <location filename="../mainwindow.ui" line="3345"/>
        <location filename="../mainwindow.ui" line="3501"/>
        <location filename="../mainwindow.ui" line="3657"/>
        <location filename="../mainwindow.ui" line="3813"/>
        <location filename="../mainwindow.ui" line="4415"/>
        <location filename="../mainwindow.cpp" line="2968"/>
        <location filename="../build/Desktop-Debug/VBDriveWizard_autogen/include/ui_mainwindow.h" line="3026"/>
        <location filename="../build/Desktop-Debug/VBDriveWizard_autogen/include/ui_mainwindow.h" line="3030"/>
        <location filename="../build/Desktop-Debug/VBDriveWizard_autogen/include/ui_mainwindow.h" line="3034"/>
        <location filename="../build/Desktop-Debug/VBDriveWizard_autogen/include/ui_mainwindow.h" line="3038"/>
        <location filename="../build/Desktop-Debug/VBDriveWizard_autogen/include/ui_mainwindow.h" line="3061"/>
        <source>Start</source>
        <translation>Пуск</translation>
    </message>
    <message>
        <location filename="../mainwindow.ui" line="3355"/>
        <location filename="../mainwindow.ui" line="3882"/>
        <location filename="../build/Desktop-Debug/VBDriveWizard_autogen/include/ui_mainwindow.h" line="3031"/>
        <location filename="../build/Desktop-Debug/VBDriveWizard_autogen/include/ui_mainwindow.h" line="3043"/>
        <source>Sin</source>
        <translation>Синус</translation>
    </message>
    <message>
        <location filename="../mainwindow.ui" line="3396"/>
        <location filename="../mainwindow.ui" line="3552"/>
        <location filename="../mainwindow.ui" line="3708"/>
        <location filename="../mainwindow.ui" line="4245"/>
        <location filename="../build/Desktop-Debug/VBDriveWizard_autogen/include/ui_mainwindow.h" line="3028"/>
        <location filename="../build/Desktop-Debug/VBDriveWizard_autogen/include/ui_mainwindow.h" line="3032"/>
        <location filename="../build/Desktop-Debug/VBDriveWizard_autogen/include/ui_mainwindow.h" line="3036"/>
        <location filename="../build/Desktop-Debug/VBDriveWizard_autogen/include/ui_mainwindow.h" line="3057"/>
        <source>Amplitude</source>
        <translation>Амплитуда</translation>
    </message>
    <message>
        <location filename="../mainwindow.ui" line="3426"/>
        <location filename="../mainwindow.ui" line="3582"/>
        <location filename="../mainwindow.ui" line="3738"/>
        <location filename="../mainwindow.ui" line="4275"/>
        <location filename="../build/Desktop-Debug/VBDriveWizard_autogen/include/ui_mainwindow.h" line="3029"/>
        <location filename="../build/Desktop-Debug/VBDriveWizard_autogen/include/ui_mainwindow.h" line="3033"/>
        <location filename="../build/Desktop-Debug/VBDriveWizard_autogen/include/ui_mainwindow.h" line="3037"/>
        <location filename="../build/Desktop-Debug/VBDriveWizard_autogen/include/ui_mainwindow.h" line="3058"/>
        <source>Frequency</source>
        <translation>Частота</translation>
    </message>
    <message>
        <location filename="../mainwindow.ui" line="3511"/>
        <location filename="../mainwindow.ui" line="3892"/>
        <location filename="../build/Desktop-Debug/VBDriveWizard_autogen/include/ui_mainwindow.h" line="3035"/>
        <location filename="../build/Desktop-Debug/VBDriveWizard_autogen/include/ui_mainwindow.h" line="3044"/>
        <source>Meander</source>
        <translation>Меандр</translation>
    </message>
    <message>
        <location filename="../mainwindow.ui" line="3667"/>
        <location filename="../mainwindow.ui" line="3902"/>
        <location filename="../build/Desktop-Debug/VBDriveWizard_autogen/include/ui_mainwindow.h" line="3039"/>
        <location filename="../build/Desktop-Debug/VBDriveWizard_autogen/include/ui_mainwindow.h" line="3045"/>
        <source>Triangle</source>
        <translation>Треуг.</translation>
    </message>
    <message>
        <location filename="../mainwindow.ui" line="3827"/>
        <location filename="../build/Desktop-Debug/VBDriveWizard_autogen/include/ui_mainwindow.h" line="3062"/>
        <source>MIT</source>
        <translation>MIT</translation>
    </message>
    <message>
        <location filename="../mainwindow.ui" line="3848"/>
        <location filename="../build/Desktop-Debug/VBDriveWizard_autogen/include/ui_mainwindow.h" line="3041"/>
        <source>Trajectory</source>
        <translation>Траектория</translation>
    </message>
    <message>
        <location filename="../mainwindow.ui" line="3869"/>
        <location filename="../build/Desktop-Debug/VBDriveWizard_autogen/include/ui_mainwindow.h" line="3042"/>
        <source>Step</source>
        <translation>Ступень</translation>
    </message>
    <message>
        <location filename="../mainwindow.ui" line="3950"/>
        <location filename="../build/Desktop-Debug/VBDriveWizard_autogen/include/ui_mainwindow.h" line="3046"/>
        <source>Step Targets</source>
        <translation>Параметры ступени</translation>
    </message>
    <message>
        <location filename="../mainwindow.ui" line="4067"/>
        <location filename="../mainwindow.ui" line="4305"/>
        <location filename="../build/Desktop-Debug/VBDriveWizard_autogen/include/ui_mainwindow.h" line="3050"/>
        <location filename="../build/Desktop-Debug/VBDriveWizard_autogen/include/ui_mainwindow.h" line="3059"/>
        <source>Kp</source>
        <translation>Kp</translation>
    </message>
    <message>
        <location filename="../mainwindow.ui" line="4097"/>
        <location filename="../mainwindow.ui" line="4335"/>
        <location filename="../build/Desktop-Debug/VBDriveWizard_autogen/include/ui_mainwindow.h" line="3051"/>
        <location filename="../build/Desktop-Debug/VBDriveWizard_autogen/include/ui_mainwindow.h" line="3060"/>
        <source>Kd</source>
        <translation>Kd</translation>
    </message>
    <message>
        <location filename="../mainwindow.ui" line="4149"/>
        <location filename="../build/Desktop-Debug/VBDriveWizard_autogen/include/ui_mainwindow.h" line="3052"/>
        <source>Trajectory Targets</source>
        <translation>Параметры траектории</translation>
    </message>
    <message>
        <location filename="../mainwindow.ui" line="4238"/>
        <location filename="../build/Desktop-Debug/VBDriveWizard_autogen/include/ui_mainwindow.h" line="3056"/>
        <source>+derivative</source>
        <translation>+производная</translation>
    </message>
    <message>
        <location filename="../mainwindow.ui" line="4431"/>
        <location filename="../build/Desktop-Debug/VBDriveWizard_autogen/include/ui_mainwindow.h" line="3063"/>
        <source>STATUS</source>
        <translation>СОСТОЯНИЕ</translation>
    </message>
    <message>
        <source>Model</source>
        <translation type="vanished">Модель</translation>
    </message>
    <message>
        <location filename="../mainwindow.ui" line="1703"/>
        <location filename="../build/Desktop-Debug/VBDriveWizard_autogen/include/ui_mainwindow.h" line="2966"/>
        <source>Play/Pause Plot Data</source>
        <translation>Запустить/приостановить график</translation>
    </message>
    <message>
        <location filename="../mainwindow.ui" line="1743"/>
        <location filename="../build/Desktop-Debug/VBDriveWizard_autogen/include/ui_mainwindow.h" line="2974"/>
        <source>Crosshair</source>
        <translation>Курсор</translation>
    </message>
    <message>
        <location filename="../mainwindow.ui" line="1723"/>
        <location filename="../build/Desktop-Debug/VBDriveWizard_autogen/include/ui_mainwindow.h" line="2970"/>
        <source>Save as...</source>
        <translation>Сохранить как...</translation>
    </message>
    <message>
        <location filename="../mainwindow.ui" line="1267"/>
        <location filename="../build/Desktop-Debug/VBDriveWizard_autogen/include/ui_mainwindow.h" line="2942"/>
        <source>Current Limit</source>
        <translation>Ограничение тока</translation>
    </message>
    <message>
        <location filename="../mainwindow.ui" line="1495"/>
        <location filename="../build/Desktop-Debug/VBDriveWizard_autogen/include/ui_mainwindow.h" line="2953"/>
        <source>Local file</source>
        <translation>Файл</translation>
    </message>
    <message>
        <location filename="../mainwindow.ui" line="1508"/>
        <location filename="../build/Desktop-Debug/VBDriveWizard_autogen/include/ui_mainwindow.h" line="2954"/>
        <source>Remote repo</source>
        <translation>Репозиторий</translation>
    </message>
    <message>
        <location filename="../mainwindow.ui" line="1539"/>
        <location filename="../build/Desktop-Debug/VBDriveWizard_autogen/include/ui_mainwindow.h" line="2957"/>
        <source>Firmware release to flash</source>
        <translation>Релиз прошивки для загрузки</translation>
    </message>
    <message>
        <location filename="../mainwindow.ui" line="1852"/>
        <location filename="../build/Desktop-Debug/VBDriveWizard_autogen/include/ui_mainwindow.h" line="2987"/>
        <source>ΔX:</source>
        <translation>ΔX:</translation>
    </message>
    <message>
        <location filename="../mainwindow.ui" line="1866"/>
        <location filename="../build/Desktop-Debug/VBDriveWizard_autogen/include/ui_mainwindow.h" line="2988"/>
        <source>ΔY:</source>
        <translation>ΔY:</translation>
    </message>
    <message>
        <location filename="../mainwindow.ui" line="2008"/>
        <location filename="../build/Desktop-Debug/VBDriveWizard_autogen/include/ui_mainwindow.h" line="2995"/>
        <source>Pos</source>
        <translation>Угол</translation>
    </message>
    <message>
        <location filename="../mainwindow.ui" line="2021"/>
        <location filename="../build/Desktop-Debug/VBDriveWizard_autogen/include/ui_mainwindow.h" line="2996"/>
        <source>Vel</source>
        <translation>Скор.</translation>
    </message>
    <message>
        <location filename="../mainwindow.ui" line="2041"/>
        <location filename="../build/Desktop-Debug/VBDriveWizard_autogen/include/ui_mainwindow.h" line="2998"/>
        <source>Voltage</source>
        <comment>servo segment</comment>
        <translation>Напр.</translation>
    </message>
    <message>
        <location filename="../mainwindow.ui" line="2116"/>
        <location filename="../mainwindow.ui" line="2181"/>
        <location filename="../mainwindow.ui" line="2236"/>
        <location filename="../build/Desktop-Debug/VBDriveWizard_autogen/include/ui_mainwindow.h" line="3000"/>
        <location filename="../build/Desktop-Debug/VBDriveWizard_autogen/include/ui_mainwindow.h" line="3003"/>
        <location filename="../build/Desktop-Debug/VBDriveWizard_autogen/include/ui_mainwindow.h" line="3005"/>
        <source>Direct</source>
        <translation>Прямой</translation>
    </message>
    <message>
        <location filename="../mainwindow.ui" line="2129"/>
        <location filename="../build/Desktop-Debug/VBDriveWizard_autogen/include/ui_mainwindow.h" line="3001"/>
        <source>Filter</source>
        <translation>Фильтр</translation>
    </message>
    <message>
        <location filename="../mainwindow.ui" line="2139"/>
        <location filename="../build/Desktop-Debug/VBDriveWizard_autogen/include/ui_mainwindow.h" line="3002"/>
        <source>Polynomial</source>
        <comment>servo segment</comment>
        <translation>Полином</translation>
    </message>
    <message>
        <location filename="../mainwindow.ui" line="2194"/>
        <location filename="../build/Desktop-Debug/VBDriveWizard_autogen/include/ui_mainwindow.h" line="3004"/>
        <source>Ramp</source>
        <translation>Рампа</translation>
    </message>
    <message>
        <location filename="../mainwindow.ui" line="2275"/>
        <location filename="../build/Desktop-Debug/VBDriveWizard_autogen/include/ui_mainwindow.h" line="3006"/>
        <source>Trajectory Params</source>
        <translation>Параметры траектории</translation>
    </message>
    <message>
        <location filename="../mainwindow.ui" line="2331"/>
        <location filename="../build/Desktop-Debug/VBDriveWizard_autogen/include/ui_mainwindow.h" line="3007"/>
        <source>No Params</source>
        <translation>Нет параметров</translation>
    </message>
    <message>
        <location filename="../mainwindow.ui" line="2425"/>
        <location filename="../build/Desktop-Debug/VBDriveWizard_autogen/include/ui_mainwindow.h" line="3008"/>
        <source>Bandwidth</source>
        <translation>Полоса</translation>
    </message>
    <message>
        <location filename="../mainwindow.ui" line="2584"/>
        <location filename="../build/Desktop-Debug/VBDriveWizard_autogen/include/ui_mainwindow.h" line="3012"/>
        <source>Vel Limit</source>
        <translation>Макс. скорость</translation>
    </message>
    <message>
        <location filename="../mainwindow.ui" line="2564"/>
        <location filename="../build/Desktop-Debug/VBDriveWizard_autogen/include/ui_mainwindow.h" line="3011"/>
        <source>Accel Limit</source>
        <translation>Макс. ускорение</translation>
    </message>
    <message>
        <location filename="../mainwindow.ui" line="2541"/>
        <location filename="../build/Desktop-Debug/VBDriveWizard_autogen/include/ui_mainwindow.h" line="3010"/>
        <source>Decel Limit</source>
        <translation>Макс. торможение</translation>
    </message>
    <message>
        <location filename="../mainwindow.ui" line="2713"/>
        <location filename="../build/Desktop-Debug/VBDriveWizard_autogen/include/ui_mainwindow.h" line="3014"/>
        <source>Rate</source>
        <translation>Темп</translation>
    </message>
    <message>
        <location filename="../mainwindow.ui" line="3195"/>
        <location filename="../build/Desktop-Debug/VBDriveWizard_autogen/include/ui_mainwindow.h" line="3024"/>
        <source>No Gains</source>
        <translation>Нет коэффициентов</translation>
    </message>
    <message>
        <location filename="../mainwindow.ui" line="3270"/>
        <location filename="../build/Desktop-Debug/VBDriveWizard_autogen/include/ui_mainwindow.h" line="3025"/>
        <source>Target</source>
        <translation>Уставка</translation>
    </message>
    <message>
        <source>M4310R10</source>
        <translation type="vanished">M4310R10</translation>
    </message>
    <message>
        <location filename="../mainwindow.ui" line="4525"/>
        <location filename="../build/Desktop-Debug/VBDriveWizard_autogen/include/ui_mainwindow.h" line="3074"/>
        <source>Temperature MCU</source>
        <translation>Температура МК</translation>
    </message>
    <message>
        <location filename="../mainwindow.ui" line="4483"/>
        <location filename="../mainwindow.ui" line="4518"/>
        <location filename="../mainwindow.ui" line="4532"/>
        <location filename="../mainwindow.ui" line="4539"/>
        <location filename="../mainwindow.ui" line="4574"/>
        <location filename="../mainwindow.ui" line="4581"/>
        <location filename="../mainwindow.ui" line="4595"/>
        <location filename="../build/Desktop-Debug/VBDriveWizard_autogen/include/ui_mainwindow.h" line="3068"/>
        <location filename="../build/Desktop-Debug/VBDriveWizard_autogen/include/ui_mainwindow.h" line="3073"/>
        <location filename="../build/Desktop-Debug/VBDriveWizard_autogen/include/ui_mainwindow.h" line="3075"/>
        <location filename="../build/Desktop-Debug/VBDriveWizard_autogen/include/ui_mainwindow.h" line="3076"/>
        <location filename="../build/Desktop-Debug/VBDriveWizard_autogen/include/ui_mainwindow.h" line="3081"/>
        <location filename="../build/Desktop-Debug/VBDriveWizard_autogen/include/ui_mainwindow.h" line="3082"/>
        <location filename="../build/Desktop-Debug/VBDriveWizard_autogen/include/ui_mainwindow.h" line="3084"/>
        <source>TextLabel</source>
        <translation>TextLabel</translation>
    </message>
    <message>
        <location filename="../mainwindow.ui" line="4504"/>
        <location filename="../mainwindow.ui" line="4553"/>
        <location filename="../build/Desktop-Debug/VBDriveWizard_autogen/include/ui_mainwindow.h" line="3071"/>
        <location filename="../build/Desktop-Debug/VBDriveWizard_autogen/include/ui_mainwindow.h" line="3078"/>
        <source>C</source>
        <translation>C</translation>
    </message>
    <message>
        <location filename="../mainwindow.ui" line="4588"/>
        <location filename="../build/Desktop-Debug/VBDriveWizard_autogen/include/ui_mainwindow.h" line="3083"/>
        <source>Temperature Stator</source>
        <translation>Температура статора</translation>
    </message>
    <message>
        <location filename="../mainwindow.ui" line="4567"/>
        <location filename="../build/Desktop-Debug/VBDriveWizard_autogen/include/ui_mainwindow.h" line="3080"/>
        <source>Bus Voltage</source>
        <translation>Напряжение шины</translation>
    </message>
    <message>
        <location filename="../mainwindow.ui" line="4560"/>
        <location filename="../build/Desktop-Debug/VBDriveWizard_autogen/include/ui_mainwindow.h" line="3079"/>
        <source>V</source>
        <translation>V</translation>
    </message>
    <message>
        <location filename="../mainwindow.ui" line="4511"/>
        <location filename="../build/Desktop-Debug/VBDriveWizard_autogen/include/ui_mainwindow.h" line="3072"/>
        <source>Motor Encoder</source>
        <translation>Энкодер ротора</translation>
    </message>
    <message>
        <location filename="../mainwindow.ui" line="4476"/>
        <location filename="../mainwindow.ui" line="4546"/>
        <location filename="../build/Desktop-Debug/VBDriveWizard_autogen/include/ui_mainwindow.h" line="3067"/>
        <location filename="../build/Desktop-Debug/VBDriveWizard_autogen/include/ui_mainwindow.h" line="3077"/>
        <source>-</source>
        <translation>-</translation>
    </message>
    <message>
        <location filename="../mainwindow.ui" line="4455"/>
        <location filename="../build/Desktop-Debug/VBDriveWizard_autogen/include/ui_mainwindow.h" line="3064"/>
        <source>Shaft Encoder</source>
        <translation>Энкодер вала</translation>
    </message>
    <message>
        <location filename="../mainwindow.ui" line="4497"/>
        <location filename="../build/Desktop-Debug/VBDriveWizard_autogen/include/ui_mainwindow.h" line="3070"/>
        <source>Fault</source>
        <translation>Ошибка</translation>
    </message>
    <message>
        <location filename="../mainwindow.ui" line="4641"/>
        <location filename="../build/Desktop-Debug/VBDriveWizard_autogen/include/ui_mainwindow.h" line="3086"/>
        <source>STOP</source>
        <translation>СТОП</translation>
    </message>
    <message>
        <location filename="../mainwindow.cpp" line="298"/>
        <source>Reconnect failed</source>
        <translation>Не удалось переподключиться</translation>
    </message>
    <message>
        <location filename="../mainwindow.cpp" line="299"/>
        <source>The actuator did not answer after flashing; connect again by hand.

%1</source>
        <translation>Привод не ответил после прошивки; подключитесь заново вручную.

%1</translation>
    </message>
    <message>
        <location filename="../mainwindow.cpp" line="304"/>
        <location filename="../mainwindow.cpp" line="316"/>
        <location filename="../mainwindow.cpp" line="1182"/>
        <location filename="../mainwindow.cpp" line="1212"/>
        <source>Connection failed</source>
        <translation>Не удалось подключиться</translation>
    </message>
    <message>
        <location filename="../mainwindow.cpp" line="343"/>
        <source>Firmware download failed</source>
        <translation>Не удалось загрузить прошивку</translation>
    </message>
    <message>
        <location filename="../mainwindow.cpp" line="356"/>
        <source>Downloaded firmware %1.</source>
        <translation>Прошивка %1 загружена.</translation>
    </message>
    <message>
        <location filename="../mainwindow.cpp" line="376"/>
        <location filename="../mainwindow.cpp" line="3429"/>
        <source>Flashing failed</source>
        <translation>Не удалось прошить</translation>
    </message>
    <message>
        <location filename="../mainwindow.cpp" line="604"/>
        <location filename="../mainwindow.cpp" line="606"/>
        <location filename="../mainwindow.cpp" line="1067"/>
        <location filename="../mainwindow.cpp" line="1332"/>
        <location filename="../mainwindow.cpp" line="1333"/>
        <source>Disconnect</source>
        <translation>Отключить</translation>
    </message>
    <message>
        <source>Resume</source>
        <translation type="vanished">Продолжить</translation>
    </message>
    <message>
        <location filename="../mainwindow.cpp" line="1496"/>
        <source>No actuators found - press refresh</source>
        <translation>Устройства не найдены - нажмите обновить</translation>
    </message>
    <message>
        <location filename="../mainwindow.cpp" line="220"/>
        <location filename="../mainwindow.cpp" line="615"/>
        <location filename="../mainwindow.cpp" line="1273"/>
        <source>Not connected</source>
        <translation>Не подключено</translation>
    </message>
    <message>
        <location filename="../mainwindow.cpp" line="633"/>
        <source>Calibration in progress</source>
        <translation>Идёт калибровка</translation>
    </message>
    <message>
        <location filename="../mainwindow.cpp" line="634"/>
        <source>The actuator is still calibrating and cannot be stopped. Closing now leaves it to finish on its own.
Close anyway?</source>
        <translation>Привод ещё калибруется, и остановить калибровку нельзя. Если закрыть программу, привод завершит её сам.
Всё равно закрыть?</translation>
    </message>
    <message>
        <location filename="../mainwindow.cpp" line="645"/>
        <source>Flashing in progress</source>
        <translation>Идёт прошивка</translation>
    </message>
    <message>
        <location filename="../mainwindow.cpp" line="646"/>
        <source>The actuator is being flashed over CAN. Closing now leaves it in the bootloader without firmware.
Close anyway?</source>
        <translation>Привод прошивается по CAN. Если закрыть приложение сейчас, он останется в загрузчике без прошивки.
Всё равно закрыть?</translation>
    </message>
    <message>
        <location filename="../mainwindow.cpp" line="658"/>
        <location filename="../mainwindow.cpp" line="1557"/>
        <source>Unsaved changes</source>
        <translation>Несохранённые изменения</translation>
    </message>
    <message>
        <location filename="../mainwindow.cpp" line="659"/>
        <source>Some register changes have not been written to the actuator.
Close anyway?</source>
        <translation>Часть изменений регистров не записана в привод.
Всё равно закрыть?</translation>
    </message>
    <message>
        <location filename="../mainwindow.cpp" line="686"/>
        <location filename="../mainwindow.cpp" line="1175"/>
        <source>Disconnecting...</source>
        <translation>Отключение...</translation>
    </message>
    <message>
        <location filename="../mainwindow.cpp" line="1115"/>
        <source>%1 (unavailable)</source>
        <translation>%1 (недоступен)</translation>
    </message>
    <message>
        <location filename="../mainwindow.cpp" line="1182"/>
        <source>No serial port selected.</source>
        <translation>Serial-порт не выбран.</translation>
    </message>
    <message>
        <location filename="../mainwindow.cpp" line="1192"/>
        <source>Opening %1...</source>
        <translation>Открытие %1...</translation>
    </message>
    <message>
        <location filename="../mainwindow.cpp" line="1218"/>
        <source>Listening for actuators on %1...</source>
        <translation>Поиск приводов на %1...</translation>
    </message>
    <message>
        <location filename="../mainwindow.cpp" line="1248"/>
        <source>Serial connected</source>
        <translation>Serial подключён</translation>
    </message>
    <message>
        <location filename="../mainwindow.cpp" line="1249"/>
        <source>CAN connected</source>
        <translation>CAN подключён</translation>
    </message>
    <message>
        <location filename="../mainwindow.cpp" line="1274"/>
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
        <location filename="../mainwindow.cpp" line="1482"/>
        <source>  (no heartbeat)</source>
        <translation>  (нет heartbeat)</translation>
    </message>
    <message>
        <location filename="../mainwindow.cpp" line="1558"/>
        <source>Actuator %1 has register changes that were not written.
Write them before switching?</source>
        <translation>У привода %1 есть незаписанные изменения регистров.
Записать их перед переключением?</translation>
    </message>
    <message>
        <location filename="../mainwindow.cpp" line="1644"/>
        <source>Reading registers...</source>
        <translation>Чтение регистров...</translation>
    </message>
    <message>
        <location filename="../mainwindow.cpp" line="1655"/>
        <location filename="../mainwindow.cpp" line="1661"/>
        <source>No changes to write.</source>
        <translation>Нет изменений для записи.</translation>
    </message>
    <message>
        <location filename="../mainwindow.cpp" line="1682"/>
        <source>Critical register</source>
        <translation>Критичный регистр</translation>
    </message>
    <message>
        <location filename="../mainwindow.cpp" line="1683"/>
        <source>The value of register %1 will be changed from %2 A to %3 A. Are you sure you want to overwrite it?</source>
        <translation>Значение регистра %1 будет изменено с %2 А на %3 А. Вы уверены, что хотите перезаписать его?</translation>
    </message>
    <message>
        <location filename="../mainwindow.cpp" line="1691"/>
        <source>Write all except this register</source>
        <translation>Записать все, кроме этого регистра</translation>
    </message>
    <message numerus="yes">
        <location filename="../mainwindow.cpp" line="1733"/>
        <source>Writing %n register(s), the actuator restarts to apply them...</source>
        <translation>
            <numerusform>Запись %n регистра, привод перезапустится для применения...</numerusform>
            <numerusform>Запись %n регистров, привод перезапустится для применения...</numerusform>
            <numerusform>Запись %n регистров, привод перезапустится для применения...</numerusform>
        </translation>
    </message>
    <message numerus="yes">
        <location filename="../mainwindow.cpp" line="1738"/>
        <source>Writing %n register(s)...</source>
        <translation>
            <numerusform>Запись %n регистра...</numerusform>
            <numerusform>Запись %n регистров...</numerusform>
            <numerusform>Запись %n регистров...</numerusform>
        </translation>
    </message>
    <message>
        <location filename="../mainwindow.cpp" line="1777"/>
        <source>Origin set; angle offset is now %1.</source>
        <translation>Ноль задан; смещение угла теперь %1.</translation>
    </message>
    <message>
        <location filename="../mainwindow.cpp" line="1793"/>
        <source>The angle did not settle at zero after the restart; press Set Origin again.</source>
        <translation>После перезапуска угол не установился в ноль; нажмите «Задать ноль» ещё раз.</translation>
    </message>
    <message>
        <location filename="../mainwindow.cpp" line="1808"/>
        <source>Calibrate sensor</source>
        <translation>Калибровка датчика</translation>
    </message>
    <message>
        <location filename="../mainwindow.cpp" line="1809"/>
        <source>Calibration moves the motor and cannot be cancelled. The actuator stops answering until it finishes.

Start calibration?</source>
        <translation>Калибровка вращает двигатель и не может быть прервана. Привод не отвечает до её завершения.

Начать калибровку?</translation>
    </message>
    <message>
        <location filename="../mainwindow.cpp" line="1823"/>
        <source>Calibration started; the actuator will not answer until it is done.</source>
        <translation>Калибровка запущена; привод не будет отвечать до её окончания.</translation>
    </message>
    <message>
        <location filename="../mainwindow.cpp" line="1832"/>
        <source>Calibrating: stage %1 of %2 done...</source>
        <translation>Калибровка: этап %1 из %2 выполнен...</translation>
    </message>
    <message>
        <location filename="../mainwindow.cpp" line="1855"/>
        <source>Calibration finished.</source>
        <translation>Калибровка завершена.</translation>
    </message>
    <message>
        <location filename="../mainwindow.cpp" line="1861"/>
        <source>Calibration failed: %1</source>
        <translation>Калибровка не удалась: %1</translation>
    </message>
    <message>
        <location filename="../mainwindow.cpp" line="1872"/>
        <source>Calibration failed</source>
        <translation>Калибровка не удалась</translation>
    </message>
    <message>
        <location filename="../mainwindow.cpp" line="1873"/>
        <source>%1

The actuator may be hung. Restart it and connect again.</source>
        <translation>%1

Возможно, привод завис. Перезапустите его и подключитесь снова.</translation>
    </message>
    <message>
        <location filename="../mainwindow.cpp" line="1898"/>
        <source>Save register profile</source>
        <translation>Сохранить профиль регистров</translation>
    </message>
    <message>
        <location filename="../mainwindow.cpp" line="1901"/>
        <location filename="../mainwindow.cpp" line="1924"/>
        <source>YAML files (*.yaml *.yml)</source>
        <translation>Файлы YAML (*.yaml *.yml)</translation>
    </message>
    <message>
        <location filename="../mainwindow.cpp" line="1915"/>
        <source>Could not save the profile</source>
        <translation>Не удалось сохранить профиль</translation>
    </message>
    <message>
        <location filename="../mainwindow.cpp" line="1917"/>
        <source>Profile saved to %1.</source>
        <translation>Профиль сохранён в %1.</translation>
    </message>
    <message>
        <location filename="../mainwindow.cpp" line="1923"/>
        <source>Load register profile</source>
        <translation>Загрузить профиль регистров</translation>
    </message>
    <message>
        <location filename="../mainwindow.cpp" line="1932"/>
        <source>Could not load the profile</source>
        <translation>Не удалось загрузить профиль</translation>
    </message>
    <message numerus="yes">
        <location filename="../mainwindow.cpp" line="1937"/>
        <source>Loaded %n register(s) from the profile.</source>
        <translation>
            <numerusform>Из профиля загружен %n регистр.</numerusform>
            <numerusform>Из профиля загружено %n регистра.</numerusform>
            <numerusform>Из профиля загружено %n регистров.</numerusform>
        </translation>
    </message>
    <message>
        <location filename="../mainwindow.cpp" line="1939"/>
        <source>Loaded with warnings: %1</source>
        <translation>Загружено с предупреждениями: %1</translation>
    </message>
    <message>
        <location filename="../mainwindow.cpp" line="1955"/>
        <source>Could not load the default profile</source>
        <translation>Не удалось загрузить профиль по умолчанию</translation>
    </message>
    <message>
        <location filename="../mainwindow.cpp" line="1959"/>
        <source>Default values for %1 loaded into the editors.</source>
        <translation>Значения по умолчанию для %1 загружены в поля.</translation>
    </message>
    <message>
        <location filename="../mainwindow.cpp" line="1987"/>
        <source>Could not read &apos;%1&apos;: %2</source>
        <translation>Не удалось прочитать «%1»: %2</translation>
    </message>
    <message>
        <location filename="../mainwindow.cpp" line="2039"/>
        <source>Could not write &apos;%1&apos;: %2</source>
        <translation>Не удалось записать «%1»: %2</translation>
    </message>
    <message>
        <location filename="../mainwindow.cpp" line="2057"/>
        <source>Registers written.</source>
        <translation>Регистры записаны.</translation>
    </message>
    <message>
        <location filename="../mainwindow.cpp" line="2067"/>
        <source>Some registers were not written</source>
        <translation>Часть регистров не записана</translation>
    </message>
    <message>
        <location filename="../mainwindow.cpp" line="2073"/>
        <source>The actuator is not calibrated. Please calibrate the actuator to start working.</source>
        <translation>Привод не откалиброван. Пожалуйста, откалибруйте привод, чтобы начать работу.</translation>
    </message>
    <message>
        <location filename="../mainwindow.cpp" line="2080"/>
        <source>Actuator not calibrated</source>
        <translation>Привод не откалиброван</translation>
    </message>
    <message>
        <location filename="../mainwindow.cpp" line="2137"/>
        <source>Actuator lost</source>
        <translation>Связь с приводом потеряна</translation>
    </message>
    <message>
        <location filename="../mainwindow.cpp" line="2138"/>
        <source>Actuator %1 (node %2) stopped sending heartbeats.</source>
        <translation>Привод %1 (узел %2) перестал отправлять heartbeat.</translation>
    </message>
    <message>
        <location filename="../mainwindow.cpp" line="2141"/>
        <source>Wait for it to come back, keeping your unsaved register changes, or drop it and discard them?</source>
        <translation>Дождаться его возвращения, сохранив несохранённые изменения регистров, или убрать привод и отменить их?</translation>
    </message>
    <message>
        <location filename="../mainwindow.cpp" line="2143"/>
        <source>Reconnect</source>
        <translation>Подключить снова</translation>
    </message>
    <message>
        <location filename="../mainwindow.cpp" line="2144"/>
        <source>Remove actuator</source>
        <translation>Убрать привод</translation>
    </message>
    <message>
        <location filename="../mainwindow.cpp" line="2156"/>
        <source>Waiting for node %1 to return...</source>
        <translation>Ожидание возвращения узла %1...</translation>
    </message>
    <message>
        <location filename="../mainwindow.cpp" line="2188"/>
        <source>The actuator restarted with the new settings.</source>
        <translation>Привод перезапущен с новыми настройками.</translation>
    </message>
    <message>
        <location filename="../mainwindow.cpp" line="2208"/>
        <source>Node %1 is back.</source>
        <translation>Узел %1 снова на связи.</translation>
    </message>
    <message>
        <location filename="../mainwindow.cpp" line="2893"/>
        <source>Node %1</source>
        <translation>Узел %1</translation>
    </message>
    <message>
        <location filename="../mainwindow.cpp" line="2894"/>
        <source>Protective stop of %1: %2</source>
        <translation>Защитная остановка %1: %2</translation>
    </message>
    <message>
        <location filename="../mainwindow.cpp" line="2898"/>
        <location filename="../mainwindow.cpp" line="2914"/>
        <source>Protective stop</source>
        <translation>Защитная остановка</translation>
    </message>
    <message>
        <location filename="../mainwindow.cpp" line="2899"/>
        <source>%1 has been stopped and disabled.

%2

Let the actuator cool down or clear the fault; the next Start enables it again.</source>
        <translation>%1 остановлен и выключен.

%2

Дайте приводу остыть или сбросьте ошибку; следующий «Пуск» снова включит его.</translation>
    </message>
    <message>
        <location filename="../mainwindow.cpp" line="3187"/>
        <source>Looking up the firmware releases...</source>
        <translation>Поиск релизов прошивки...</translation>
    </message>
    <message>
        <location filename="../mainwindow.cpp" line="3216"/>
        <source>This release carries no firmware image to flash.</source>
        <translation>В этом релизе нет образа прошивки для загрузки.</translation>
    </message>
    <message numerus="yes">
        <location filename="../mainwindow.cpp" line="3232"/>
        <source>Found %n firmware release(s).</source>
        <translation>
            <numerusform>Найден %n релиз прошивки.</numerusform>
            <numerusform>Найдено %n релиза прошивки.</numerusform>
            <numerusform>Найдено %n релизов прошивки.</numerusform>
        </translation>
    </message>
    <message>
        <location filename="../mainwindow.cpp" line="3239"/>
        <source>Could not list the firmware releases.</source>
        <translation>Не удалось получить список релизов прошивки.</translation>
    </message>
    <message>
        <location filename="../mainwindow.cpp" line="3242"/>
        <source>Firmware releases unavailable</source>
        <translation>Релизы прошивки недоступны</translation>
    </message>
    <message>
        <location filename="../mainwindow.cpp" line="3243"/>
        <source>%1

Select Remote repo again to retry.</source>
        <translation>%1

Чтобы повторить попытку, снова выберите «Репозиторий».</translation>
    </message>
    <message>
        <location filename="../mainwindow.cpp" line="3250"/>
        <source>Loading...</source>
        <translation>Загрузка...</translation>
    </message>
    <message>
        <location filename="../mainwindow.cpp" line="3250"/>
        <source>No releases</source>
        <translation>Нет релизов</translation>
    </message>
    <message>
        <location filename="../mainwindow.cpp" line="3272"/>
        <source>Pick a release from the list. If it is empty, select Remote repo again to retry.</source>
        <translation>Выберите релиз из списка. Если он пуст, снова выберите «Репозиторий», чтобы повторить попытку.</translation>
    </message>
    <message>
        <location filename="../mainwindow.cpp" line="3287"/>
        <source>The actuator runs firmware %1, which is newer than %2.
Flash %2 anyway?</source>
        <translation>На приводе прошивка %1, она новее %2.
Всё равно загрузить %2?</translation>
    </message>
    <message>
        <location filename="../mainwindow.cpp" line="3289"/>
        <source>The actuator already runs firmware %1.
Flash %2 anyway?</source>
        <translation>На приводе уже прошивка %1.
Всё равно загрузить %2?</translation>
    </message>
    <message>
        <location filename="../mainwindow.cpp" line="3332"/>
        <source>You have the latest firmware version.</source>
        <translation>У вас установлена последняя версия прошивки.</translation>
    </message>
    <message>
        <location filename="../mainwindow.cpp" line="1688"/>
        <source>Yes</source>
        <translation>Да</translation>
    </message>
    <message>
        <location filename="../mainwindow.cpp" line="1689"/>
        <source>No</source>
        <translation>Нет</translation>
    </message>
    <message>
        <source>Target vel:</source>
        <translation type="vanished">Команда:</translation>
    </message>
    <message>
        <source>Target torq:</source>
        <translation type="vanished">Команда:</translation>
    </message>
    <message>
        <location filename="../mainwindow.cpp" line="2801"/>
        <source>Serial cannot sustain %1 Hz; running at %2 Hz instead.</source>
        <translation>Serial не выдерживает %1 Гц; используется %2 Гц.</translation>
    </message>
    <message>
        <source>Feedback gains written.</source>
        <translation type="vanished">Коэффициенты регулятора записаны.</translation>
    </message>
    <message>
        <source>Transient form written.</source>
        <translation type="vanished">Параметры переходного процесса записаны.</translation>
    </message>
    <message>
        <location filename="../mainwindow.cpp" line="2868"/>
        <source>Emergency stop: all actuators disabled.</source>
        <translation>Аварийная остановка: все приводы выключены.</translation>
    </message>
    <message>
        <location filename="../mainwindow.cpp" line="3066"/>
        <source>Pause the plot</source>
        <translation>Приостановить график</translation>
    </message>
    <message>
        <location filename="../mainwindow.cpp" line="3066"/>
        <source>Resume the plot</source>
        <translation>Возобновить график</translation>
    </message>
    <message>
        <location filename="../mainwindow.cpp" line="3096"/>
        <source>No file was selected.</source>
        <translation>Файл не выбран.</translation>
    </message>
    <message>
        <location filename="../mainwindow.cpp" line="3100"/>
        <source>Save plot</source>
        <translation>Сохранение графика</translation>
    </message>
    <message>
        <location filename="../mainwindow.cpp" line="3101"/>
        <source>%1 already exists. Overwrite it?</source>
        <translation>%1 уже существует. Перезаписать?</translation>
    </message>
    <message>
        <location filename="../mainwindow.cpp" line="3127"/>
        <source>Saved to %1.</source>
        <translation>Сохранено в %1.</translation>
    </message>
    <message>
        <location filename="../mainwindow.cpp" line="3129"/>
        <source>Could not save the plot</source>
        <translation>Не удалось сохранить график</translation>
    </message>
    <message>
        <location filename="../mainwindow.cpp" line="1290"/>
        <source>Emergency stop</source>
        <translation>Экстренная остановка</translation>
    </message>
    <message>
        <location filename="../mainwindow.cpp" line="385"/>
        <source>Firmware flashed</source>
        <translation>Прошивка записана</translation>
    </message>
    <message>
        <location filename="../mainwindow.cpp" line="386"/>
        <source>Restart the actuator and press OK.</source>
        <translation>Перезапустите привод и нажмите OK.</translation>
    </message>
    <message>
        <location filename="../mainwindow.cpp" line="400"/>
        <source>%1 Connect to the actuator from CONNECTION.</source>
        <translation>%1 Подключитесь к приводу в панели ПОДКЛЮЧЕНИЕ.</translation>
    </message>
    <message>
        <location filename="../mainwindow.cpp" line="1291"/>
        <source>The actuator has been stopped by the emergency stop. To resume, restart the actuator and connect to it again.</source>
        <translation>Привод экстренно остановлен. Для возобновления работы перезагрузите привод и заново подключитесь к нему</translation>
    </message>
    <message>
        <location filename="../mainwindow.cpp" line="2523"/>
        <source>Servo settings written.</source>
        <translation>Параметры Servo записаны.</translation>
    </message>
    <message>
        <location filename="../mainwindow.cpp" line="2968"/>
        <source>Stop</source>
        <translation>Стоп</translation>
    </message>
    <message>
        <location filename="../mainwindow.cpp" line="3074"/>
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
        <location filename="../mainwindow.cpp" line="3163"/>
        <source>Select firmware image</source>
        <translation>Выбрать файл прошивки</translation>
    </message>
    <message>
        <location filename="../mainwindow.cpp" line="3164"/>
        <source>Intel HEX files (*.hex)</source>
        <translation>Файлы Intel HEX (*.hex)</translation>
    </message>
    <message>
        <location filename="../mainwindow.cpp" line="3168"/>
        <source>Selected %1.</source>
        <translation>Выбрано: %1.</translation>
    </message>
    <message>
        <source>Looking up the latest release...</source>
        <translation type="vanished">Поиск последнего релиза...</translation>
    </message>
    <message>
        <location filename="../mainwindow.cpp" line="3271"/>
        <location filename="../mainwindow.cpp" line="3306"/>
        <source>No firmware selected</source>
        <translation>Прошивка не выбрана</translation>
    </message>
    <message>
        <source>Choose a .hex file first, or switch to downloading the latest release.</source>
        <translation type="vanished">Сначала выберите .hex-файл или переключитесь на загрузку последнего релиза.</translation>
    </message>
    <message>
        <source>The actuator runs firmware %1, which is newer than the latest release %2.
Flash %2 anyway?</source>
        <translation type="vanished">На приводе прошивка %1 — новее последнего релиза %2.
Всё равно прошить %2?</translation>
    </message>
    <message>
        <source>The actuator already runs the latest firmware %1.
Flash %2 anyway?</source>
        <translation type="vanished">На приводе уже последняя версия прошивки %1.
Всё равно прошить %2?</translation>
    </message>
    <message>
        <location filename="../mainwindow.cpp" line="3290"/>
        <source>Flash firmware</source>
        <translation>Прошивка</translation>
    </message>
    <message>
        <location filename="../mainwindow.cpp" line="3295"/>
        <source>Flashing cancelled.</source>
        <translation>Прошивка отменена.</translation>
    </message>
    <message>
        <location filename="../mainwindow.cpp" line="3307"/>
        <source>Choose a .hex file first, or switch to a release from the remote repo.</source>
        <translation>Сначала выберите файл .hex или переключитесь на релиз из репозитория.</translation>
    </message>
    <message>
        <location filename="../mainwindow.cpp" line="3329"/>
        <source>The firmware is outdated: release %1 is available.</source>
        <translation>Прошивка устарела: доступна версия %1.</translation>
    </message>
    <message>
        <source>You have the latest firmware revision.</source>
        <translation type="vanished">У вас самая последняя версия прошивки</translation>
    </message>
    <message>
        <location filename="../mainwindow.cpp" line="3381"/>
        <source>Flashing %1...</source>
        <translation>Прошивка %1...</translation>
    </message>
    <message>
        <location filename="../mainwindow.cpp" line="3390"/>
        <source>No actuator selected</source>
        <translation>Привод не выбран</translation>
    </message>
    <message>
        <location filename="../mainwindow.cpp" line="3391"/>
        <source>Select the actuator to flash in the device list.</source>
        <translation>Выберите в списке устройств привод для прошивки.</translation>
    </message>
    <message>
        <location filename="../mainwindow.cpp" line="3414"/>
        <source>Flashing %1 into %2 over CAN...</source>
        <translation>Прошивка %1 в %2 по CAN...</translation>
    </message>
    <message>
        <location filename="../mainwindow.cpp" line="3448"/>
        <source>%1 Waiting for the actuator to start...</source>
        <translation>%1 Ожидание запуска привода...</translation>
    </message>
    <message>
        <location filename="../mainwindow.cpp" line="3458"/>
        <source>Actuator did not start</source>
        <translation>Привод не запустился</translation>
    </message>
    <message>
        <location filename="../mainwindow.cpp" line="3459"/>
        <source>The firmware was written, but node %1 has sent no heartbeat since. Power-cycle the actuator; if it stays silent, flash it over SWD.</source>
        <translation>Прошивка записана, но узел %1 с тех пор не отправил ни одного heartbeat. Перезапустите питание привода; если он так и не ответит, прошейте его по SWD.</translation>
    </message>
    <message>
        <location filename="../mainwindow.cpp" line="3484"/>
        <source>Node %1 is running the new firmware.</source>
        <translation>Узел %1 работает на новой прошивке.</translation>
    </message>
    <message>
        <location filename="../mainwindow.cpp" line="3499"/>
        <source>Reconnecting to the flashed actuator...</source>
        <translation>Переподключение к прошитому приводу...</translation>
    </message>
    <message>
        <location filename="../mainwindow.cpp" line="3525"/>
        <source>Reconnecting to %1...</source>
        <translation>Переподключение к %1...</translation>
    </message>
</context>
<context>
    <name>PlotController</name>
    <message>
        <location filename="../ui/plot_controller.cpp" line="667"/>
        <source>t, s</source>
        <translation>t, с</translation>
    </message>
    <message>
        <location filename="../ui/plot_controller.cpp" line="439"/>
        <source>Position</source>
        <translation>Угол</translation>
    </message>
    <message>
        <location filename="../ui/plot_controller.cpp" line="441"/>
        <source>Velocity</source>
        <translation>Скорость</translation>
    </message>
    <message>
        <location filename="../ui/plot_controller.cpp" line="443"/>
        <source>Torque</source>
        <translation>Момент</translation>
    </message>
    <message>
        <location filename="../ui/plot_controller.cpp" line="445"/>
        <source>MCU</source>
        <translation>МК</translation>
    </message>
    <message>
        <location filename="../ui/plot_controller.cpp" line="447"/>
        <source>Bus current</source>
        <translation>Ток шины</translation>
    </message>
    <message>
        <location filename="../ui/plot_controller.cpp" line="449"/>
        <source>Rotor</source>
        <translation>Ротор</translation>
    </message>
    <message>
        <location filename="../ui/plot_controller.cpp" line="462"/>
        <source>Target</source>
        <translation>Уставка</translation>
    </message>
    <message>
        <location filename="../ui/plot_controller.cpp" line="464"/>
        <source>Stator</source>
        <translation>Статор</translation>
    </message>
    <message>
        <location filename="../ui/plot_controller.cpp" line="466"/>
        <source>Shaft</source>
        <translation>Вал</translation>
    </message>
    <message>
        <location filename="../ui/plot_controller.cpp" line="477"/>
        <source>Position, %1</source>
        <translation>Угол, %1</translation>
    </message>
    <message>
        <location filename="../ui/plot_controller.cpp" line="479"/>
        <source>Velocity, %1</source>
        <translation>Скорость, %1</translation>
    </message>
    <message>
        <location filename="../ui/plot_controller.cpp" line="482"/>
        <source>Torque, N*m</source>
        <translation>Момент, Н·м</translation>
    </message>
    <message>
        <location filename="../ui/plot_controller.cpp" line="484"/>
        <source>Temperature, C</source>
        <translation>Температура, °C</translation>
    </message>
    <message>
        <location filename="../ui/plot_controller.cpp" line="486"/>
        <source>Bus current, A</source>
        <translation>Ток шины, А</translation>
    </message>
    <message>
        <location filename="../ui/plot_controller.cpp" line="488"/>
        <source>Encoder, counts</source>
        <translation>Энкодер, отсчёты</translation>
    </message>
    <message>
        <location filename="../ui/plot_controller.cpp" line="691"/>
        <source>Fit to data</source>
        <translation>Масштаб по данным</translation>
    </message>
    <message>
        <location filename="../ui/plot_controller.cpp" line="698"/>
        <source>Restore panels</source>
        <translation>Восстановить панели</translation>
    </message>
    <message>
        <location filename="../ui/plot_controller.cpp" line="698"/>
        <source>Maximize panel</source>
        <translation>Развернуть панель</translation>
    </message>
    <message>
        <location filename="../ui/plot_controller.cpp" line="702"/>
        <source>Add panel</source>
        <translation>Добавить панель</translation>
    </message>
    <message>
        <location filename="../ui/plot_controller.cpp" line="705"/>
        <source>Hide panel</source>
        <translation>Скрыть панель</translation>
    </message>
    <message>
        <location filename="../ui/plot_controller.cpp" line="1354"/>
        <location filename="../ui/plot_controller.cpp" line="1389"/>
        <source>The plot is not initialised.</source>
        <translation>График не инициализирован.</translation>
    </message>
    <message>
        <location filename="../ui/plot_controller.cpp" line="1359"/>
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
        <location filename="../ui/plot_controller.cpp" line="1396"/>
        <location filename="../ui/plot_controller.cpp" line="1460"/>
        <source>Could not write %1: %2</source>
        <translation>Не удалось записать %1: %2</translation>
    </message>
</context>
<context>
    <name>PlotCrosshairTool</name>
    <message>
        <location filename="../ui/plot_crosshair.cpp" line="79"/>
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
        <source>Protective stop</source>
        <translation>Защитная остановка</translation>
    </message>
    <message>
        <location filename="../ui/preferences_dialog.ui" line="327"/>
        <source>Maximum stator temperature:</source>
        <translation>Максимальная температура статора:</translation>
    </message>
    <message>
        <location filename="../ui/preferences_dialog.ui" line="353"/>
        <source>Maximum MCU temperature:</source>
        <translation>Максимальная температура МК:</translation>
    </message>
    <message>
        <location filename="../ui/preferences_dialog.ui" line="382"/>
        <source>Firmware flashing (OpenOCD)</source>
        <translation>Прошивка (OpenOCD)</translation>
    </message>
    <message>
        <location filename="../ui/preferences_dialog.ui" line="406"/>
        <source>Interface config:</source>
        <translation>Конфигурация интерфейса:</translation>
    </message>
    <message>
        <location filename="../ui/preferences_dialog.ui" line="417"/>
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
    <message>
        <location filename="../ui/preferences_dialog.cpp" line="32"/>
        <source>An actuator whose motor gets hotter than this is stopped and disabled.</source>
        <translation>Привод, двигатель которого нагреется выше этого значения, будет остановлен и выключен.</translation>
    </message>
    <message>
        <location filename="../ui/preferences_dialog.cpp" line="34"/>
        <source>An actuator whose microcontroller gets hotter than this is stopped and disabled.</source>
        <translation>Привод, микроконтроллер которого нагреется выше этого значения, будет остановлен и выключен.</translation>
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
    <name>SafetyMonitor</name>
    <message>
        <location filename="../control/safety_monitor.cpp" line="17"/>
        <source>The actuator reports a fault (is_fault = 1).</source>
        <translation>Привод сообщает об ошибке (is_fault = 1).</translation>
    </message>
    <message>
        <location filename="../control/safety_monitor.cpp" line="24"/>
        <source>Stator</source>
        <translation>Статор</translation>
    </message>
    <message>
        <location filename="../control/safety_monitor.cpp" line="27"/>
        <source>Microcontroller</source>
        <translation>Микроконтроллер</translation>
    </message>
    <message>
        <location filename="../control/safety_monitor.cpp" line="39"/>
        <source>%1 temperature %2 °C exceeded the limit of %3 °C set in Preferences.</source>
        <translation>%1: температура %2 °C превысила предел %3 °C, заданный в настройках.</translation>
    </message>
    <message>
        <location filename="../control/safety_monitor.cpp" line="74"/>
        <source>The actuator reports a fault (is_fault = 1). Clear the fault before starting.</source>
        <translation>Привод сообщает об ошибке (is_fault = 1). Сбросьте ошибку перед запуском.</translation>
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
        <translation>Светлая</translation>
    </message>
    <message>
        <location filename="../ui/save_file_dialog.ui" line="83"/>
        <source>Dark</source>
        <translation>Тёмная</translation>
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
        <location filename="../transport/serial_service.cpp" line="121"/>
        <source>Serial service is shutting down.</source>
        <translation>Serial-сервис завершает работу.</translation>
    </message>
    <message>
        <location filename="../transport/serial_service.cpp" line="154"/>
        <source>Reconnecting.</source>
        <translation>Переподключение.</translation>
    </message>
    <message>
        <location filename="../transport/serial_service.cpp" line="166"/>
        <location filename="../transport/serial_service.cpp" line="170"/>
        <location filename="../transport/serial_service.cpp" line="184"/>
        <location filename="../transport/serial_service.cpp" line="200"/>
        <location filename="../transport/serial_service.cpp" line="581"/>
        <location filename="../transport/serial_service.cpp" line="593"/>
        <source>Disconnected.</source>
        <translation>Отключено.</translation>
    </message>
    <message>
        <location filename="../transport/serial_service.cpp" line="232"/>
        <location filename="../transport/serial_service.cpp" line="258"/>
        <location filename="../transport/serial_service.cpp" line="773"/>
        <location filename="../transport/serial_service.cpp" line="879"/>
        <source>Serial port is not open.</source>
        <translation>Serial-порт не открыт.</translation>
    </message>
    <message>
        <location filename="../transport/serial_service.cpp" line="232"/>
        <location filename="../transport/serial_service.cpp" line="773"/>
        <source>Disconnecting.</source>
        <translation>Отключение.</translation>
    </message>
    <message>
        <location filename="../transport/serial_service.cpp" line="325"/>
        <source>Command &apos;%1&apos; failed: %2</source>
        <translation>Команда «%1» не выполнена: %2</translation>
    </message>
    <message>
        <location filename="../transport/serial_service.cpp" line="338"/>
        <source>The actuator did not answer after restarting: %1</source>
        <translation>Привод не ответил после перезапуска: %1</translation>
    </message>
    <message>
        <location filename="../transport/serial_service.cpp" line="362"/>
        <source>Actuator detected on %1.</source>
        <translation>Привод обнаружен на %1.</translation>
    </message>
    <message>
        <location filename="../transport/serial_service.cpp" line="363"/>
        <source>No VBDrive found on %1: %2</source>
        <translation>На %1 не найден VBDrive: %2</translation>
    </message>
    <message>
        <location filename="../transport/serial_service.cpp" line="740"/>
        <source>the device reports itself as &apos;%1&apos;, not as a VBDrive.</source>
        <translation>устройство сообщает о себе «%1», а не VBDrive.</translation>
    </message>
    <message>
        <source>No actuator answered on %1: %2</source>
        <translation type="vanished">На %1 ни один привод не ответил: %2</translation>
    </message>
    <message>
        <location filename="../transport/serial_service.cpp" line="371"/>
        <source>Could not enter CONFIG mode: %1</source>
        <translation>Не удалось войти в режим CONFIG: %1</translation>
    </message>
    <message>
        <location filename="../transport/serial_service.cpp" line="440"/>
        <source>The actuator reported no calibration progress for %1 s.</source>
        <translation>Привод не сообщал о ходе калибровки %1 с.</translation>
    </message>
    <message>
        <location filename="../transport/serial_service.cpp" line="481"/>
        <source>These registers were rejected by the actuator: %1</source>
        <translation>Привод отклонил запись регистров: %1</translation>
    </message>
    <message>
        <location filename="../transport/serial_service.cpp" line="582"/>
        <source>The serial connection was lost.</source>
        <translation>Serial-соединение потеряно.</translation>
    </message>
    <message>
        <location filename="../transport/serial_service.cpp" line="593"/>
        <source>Serial connection lost.</source>
        <translation>Serial-соединение потеряно.</translation>
    </message>
    <message>
        <location filename="../transport/serial_service.cpp" line="618"/>
        <source>The actuator did not come back after restarting.</source>
        <translation>Привод не вернулся после перезапуска.</translation>
    </message>
    <message>
        <location filename="../transport/serial_service.cpp" line="675"/>
        <source>The actuator did not answer in time.</source>
        <translation>Привод не ответил за отведённое время.</translation>
    </message>
    <message>
        <location filename="../transport/serial_service.cpp" line="736"/>
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
    <name>VbbootFlasher</name>
    <message>
        <location filename="../firmware/vbboot_flasher.cpp" line="217"/>
        <source>A flashing operation is already running.</source>
        <translation>Прошивка уже выполняется.</translation>
    </message>
    <message>
        <location filename="../firmware/vbboot_flasher.cpp" line="243"/>
        <source>Could not open %1: %2</source>
        <translation>Не удалось открыть %1: %2</translation>
    </message>
    <message>
        <location filename="../firmware/vbboot_flasher.cpp" line="259"/>
        <source>%1, line %2: not an Intel HEX record.</source>
        <translation>%1, строка %2: это не запись Intel HEX.</translation>
    </message>
    <message>
        <location filename="../firmware/vbboot_flasher.cpp" line="268"/>
        <source>%1, line %2: checksum mismatch.</source>
        <translation>%1, строка %2: не совпадает контрольная сумма.</translation>
    </message>
    <message>
        <location filename="../firmware/vbboot_flasher.cpp" line="300"/>
        <source>%1 holds no VBDrive application at %2.</source>
        <translation>В %1 нет приложения VBDrive по адресу %2.</translation>
    </message>
    <message>
        <location filename="../firmware/vbboot_flasher.cpp" line="309"/>
        <source>The application in %1 does not fit into the flash.</source>
        <translation>Приложение из %1 не помещается во flash-память.</translation>
    </message>
    <message>
        <location filename="../firmware/vbboot_flasher.cpp" line="323"/>
        <source>The actuator stays in the bootloader, and its old firmware may already be erased. Keep it selected and press Flash again.</source>
        <translation>Привод остаётся в загрузчике, его старая прошивка, возможно, уже стёрта. Не меняйте выбор привода и нажмите «Прошить» ещё раз.</translation>
    </message>
    <message>
        <location filename="../firmware/vbboot_flasher.cpp" line="328"/>
        <source>Firmware written and verified.</source>
        <translation>Прошивка записана и проверена.</translation>
    </message>
    <message>
        <location filename="../firmware/vbboot_flasher.cpp" line="342"/>
        <source>Could not open %1 for flashing: %2</source>
        <translation>Не удалось открыть %1 для прошивки: %2</translation>
    </message>
    <message>
        <location filename="../firmware/vbboot_flasher.cpp" line="352"/>
        <source>Waiting for the bootloader...</source>
        <translation>Ожидание загрузчика...</translation>
    </message>
    <message>
        <location filename="../firmware/vbboot_flasher.cpp" line="372"/>
        <source>The bootloader did not answer on CAN id %1. Check the CAN connection, and that the actuator&apos;s firmware supports VBBoot.</source>
        <translation>Загрузчик не ответил на CAN ID %1. Проверьте подключение к CAN и что прошивка привода поддерживает VBBoot.</translation>
    </message>
    <message>
        <location filename="../firmware/vbboot_flasher.cpp" line="383"/>
        <source>Erasing the old firmware...</source>
        <translation>Стирание старой прошивки...</translation>
    </message>
    <message>
        <location filename="../firmware/vbboot_flasher.cpp" line="405"/>
        <location filename="../firmware/vbboot_flasher.cpp" line="485"/>
        <source>Flashing cancelled.</source>
        <translation>Прошивка отменена.</translation>
    </message>
    <message>
        <location filename="../firmware/vbboot_flasher.cpp" line="415"/>
        <source>The bootloader refused the data at offset %1.</source>
        <translation>Загрузчик отклонил данные по смещению %1.</translation>
    </message>
    <message>
        <location filename="../firmware/vbboot_flasher.cpp" line="425"/>
        <source>Writing the firmware: %1 of %2 bytes...</source>
        <translation>Запись прошивки: %1 из %2 байт...</translation>
    </message>
    <message>
        <location filename="../firmware/vbboot_flasher.cpp" line="439"/>
        <source>The bootloader rejected the written image: its size or CRC32 does not match. Some frames were probably lost on the bus.</source>
        <translation>Загрузчик отверг записанный образ: не совпадает размер или CRC32. Вероятно, часть кадров потерялась на шине.</translation>
    </message>
    <message>
        <location filename="../firmware/vbboot_flasher.cpp" line="448"/>
        <source>Done.</source>
        <translation>Готово.</translation>
    </message>
    <message>
        <location filename="../firmware/vbboot_flasher.cpp" line="469"/>
        <source>The bootloader refused %1.</source>
        <translation>Загрузчик отклонил %1.</translation>
    </message>
    <message>
        <location filename="../firmware/vbboot_flasher.cpp" line="471"/>
        <source>The bootloader did not answer %1 in time: the CAN connection was probably lost.</source>
        <translation>Загрузчик не ответил на %1 вовремя: вероятно, связь по CAN потеряна.</translation>
    </message>
    <message>
        <location filename="../firmware/vbboot_flasher.cpp" line="475"/>
        <source>The CAN interface went bus-off during %1. Check the wiring and the termination.</source>
        <translation>CAN-интерфейс перешёл в состояние bus-off во время %1. Проверьте проводку и терминаторы.</translation>
    </message>
    <message>
        <location filename="../firmware/vbboot_flasher.cpp" line="480"/>
        <source>The CAN bus is not taking frames (%1): nothing acknowledges them. Check the CAN connection.</source>
        <translation>Шина CAN не принимает кадры (%1): их никто не подтверждает. Проверьте подключение к CAN.</translation>
    </message>
    <message>
        <location filename="../firmware/vbboot_flasher.cpp" line="483"/>
        <source>CAN error during %1: %2</source>
        <translation>Ошибка CAN во время %1: %2</translation>
    </message>
</context>
<context>
    <name>plot_export</name>
    <message>
        <location filename="../ui/plot_export.cpp" line="62"/>
        <source>The plot is not initialised.</source>
        <translation>График не инициализирован.</translation>
    </message>
    <message>
        <location filename="../ui/plot_export.cpp" line="67"/>
        <source>This build cannot write SVG: the Qt SVG module was not available when it was compiled. Choose PNG or JPG instead.</source>
        <translation>Эта сборка не умеет сохранять SVG: при компиляции не был доступен модуль Qt SVG. Выберите PNG или JPG.</translation>
    </message>
    <message>
        <location filename="../ui/plot_export.cpp" line="98"/>
        <source>Could not write %1.</source>
        <translation>Не удалось записать %1.</translation>
    </message>
</context>
</TS>
