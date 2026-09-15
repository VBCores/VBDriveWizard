<?xml version="1.0" encoding="utf-8"?>
<!DOCTYPE TS>
<TS version="2.1" language="en_US">
<context>
    <name>CanInterfaceList</name>
    <message>
        <location filename="../transport/can_interface_list.cpp" line="29"/>
        <source>No CAN interface selected.</source>
        <translation>No CAN interface selected.</translation>
    </message>
    <message>
        <location filename="../transport/can_interface_list.cpp" line="31"/>
        <source>Interface %1 is down. Bring it up, for example:
  sudo ip link set %1 up type can bitrate 500000 dbitrate 2000000 fd on</source>
        <translation>Interface %1 is down. Bring it up, for example:
  sudo ip link set %1 up type can bitrate 500000 dbitrate 2000000 fd on</translation>
    </message>
    <message>
        <location filename="../transport/can_interface_list.cpp" line="38"/>
        <source>Interface %1 is not running in CAN FD mode (MTU %2, expected %3).
VBDrive uses Cyphal over CAN FD, so an FD-capable adapter is required.</source>
        <translation>Interface %1 is not running in CAN FD mode (MTU %2, expected %3).
VBDrive uses Cyphal over CAN FD, so an FD-capable adapter is required.</translation>
    </message>
</context>
<context>
    <name>ConfigManager</name>
    <message>
        <location filename="../ui/config_manager.cpp" line="191"/>
        <location filename="../ui/config_manager.cpp" line="226"/>
        <source>Cannot write %1: %2</source>
        <translation>Cannot write %1: %2</translation>
    </message>
    <message>
        <location filename="../ui/config_manager.cpp" line="237"/>
        <source>Settings loaded.</source>
        <translation>Settings loaded.</translation>
    </message>
    <message>
        <location filename="../ui/config_manager.cpp" line="239"/>
        <source>No settings file found; defaults are in use.</source>
        <translation>No settings file found; defaults are in use.</translation>
    </message>
    <message>
        <location filename="../ui/config_manager.cpp" line="242"/>
        <source>Settings file could not be read; defaults are in use.</source>
        <translation>Settings file could not be read; defaults are in use.</translation>
    </message>
</context>
<context>
    <name>CyphalBridge</name>
    <message>
        <location filename="../transport/cyphal_worker.cpp" line="140"/>
        <source>The Cyphal stack reported an internal error.</source>
        <translation>The Cyphal stack reported an internal error.</translation>
    </message>
    <message>
        <location filename="../transport/cyphal_worker.cpp" line="158"/>
        <source>Could not open CAN interface %1.</source>
        <translation>Could not open CAN interface %1.</translation>
    </message>
</context>
<context>
    <name>CyphalService</name>
    <message>
        <location filename="../transport/cyphal_service.cpp" line="74"/>
        <source>The CAN connection was closed.</source>
        <translation>The CAN connection was closed.</translation>
    </message>
    <message>
        <location filename="../transport/cyphal_service.cpp" line="105"/>
        <source>No VBDrive answered on %1 within %2 seconds.</source>
        <translation>No VBDrive answered on %1 within %2 seconds.</translation>
    </message>
    <message numerus="yes">
        <location filename="../transport/cyphal_service.cpp" line="111"/>
        <source>Found %n drive(s) on %1.</source>
        <translation>
            <numerusform>Found %n drive(s) on %1.</numerusform>
            <numerusform></numerusform>
        </translation>
    </message>
    <message>
        <location filename="../transport/cyphal_service.cpp" line="135"/>
        <source>The drive stopped answering.</source>
        <translation>The drive stopped answering.</translation>
    </message>
    <message>
        <location filename="../transport/cyphal_service.cpp" line="142"/>
        <source>The drive did not answer register &apos;%1&apos; in time.</source>
        <translation>The drive did not answer register &apos;%1&apos; in time.</translation>
    </message>
    <message>
        <location filename="../transport/cyphal_service.cpp" line="170"/>
        <source>Could not send the request.</source>
        <translation>Could not send the request.</translation>
    </message>
    <message>
        <location filename="../transport/cyphal_service.cpp" line="193"/>
        <source>The drive did not accept the value.</source>
        <translation>The drive did not accept the value.</translation>
    </message>
    <message>
        <location filename="../transport/cyphal_service.cpp" line="194"/>
        <source>Register &apos;%1&apos; is read-only.</source>
        <translation>Register &apos;%1&apos; is read-only.</translation>
    </message>
    <message>
        <location filename="../transport/cyphal_service.cpp" line="203"/>
        <source>Register &apos;%1&apos; is not available on this drive.</source>
        <translation>Register &apos;%1&apos; is not available on this drive.</translation>
    </message>
    <message>
        <location filename="../transport/cyphal_service.cpp" line="231"/>
        <source>These registers were rejected by the drive: %1</source>
        <translation>These registers were rejected by the drive: %1</translation>
    </message>
</context>
<context>
    <name>DeviceModel</name>
    <message>
        <location filename="../core/device_model.cpp" line="21"/>
        <source>Unknown drive</source>
        <translation>Unknown drive</translation>
    </message>
</context>
<context>
    <name>FirmwareDownloader</name>
    <message>
        <location filename="../firmware/firmware_downloader.cpp" line="43"/>
        <source>A firmware download is already running.</source>
        <translation>A firmware download is already running.</translation>
    </message>
    <message>
        <location filename="../firmware/firmware_downloader.cpp" line="53"/>
        <source>Looking up the latest release...</source>
        <translation>Looking up the latest release...</translation>
    </message>
    <message>
        <location filename="../firmware/firmware_downloader.cpp" line="74"/>
        <source>Could not reach the VBDrive releases: %1</source>
        <translation>Could not reach the VBDrive releases: %1</translation>
    </message>
    <message>
        <location filename="../firmware/firmware_downloader.cpp" line="93"/>
        <source>Release %1 does not contain %2.</source>
        <translation>Release %1 does not contain %2.</translation>
    </message>
    <message>
        <location filename="../firmware/firmware_downloader.cpp" line="94"/>
        <source>(unknown)</source>
        <translation>(unknown)</translation>
    </message>
    <message>
        <location filename="../firmware/firmware_downloader.cpp" line="103"/>
        <source>Downloading %1...</source>
        <translation>Downloading %1...</translation>
    </message>
    <message>
        <location filename="../firmware/firmware_downloader.cpp" line="119"/>
        <source>Downloading %1: %2 of %3 (%4%)</source>
        <translation>Downloading %1: %2 of %3 (%4%)</translation>
    </message>
    <message>
        <location filename="../firmware/firmware_downloader.cpp" line="125"/>
        <source>Downloading %1: %2 received</source>
        <translation>Downloading %1: %2 received</translation>
    </message>
    <message>
        <location filename="../firmware/firmware_downloader.cpp" line="141"/>
        <source>Firmware download failed: %1</source>
        <translation>Firmware download failed: %1</translation>
    </message>
    <message>
        <location filename="../firmware/firmware_downloader.cpp" line="152"/>
        <location filename="../firmware/firmware_downloader.cpp" line="157"/>
        <source>Could not write %1: %2</source>
        <translation>Could not write %1: %2</translation>
    </message>
    <message>
        <location filename="../firmware/firmware_downloader.cpp" line="161"/>
        <source>Download complete.</source>
        <translation>Download complete.</translation>
    </message>
</context>
<context>
    <name>FirmwareFlasher</name>
    <message>
        <location filename="../firmware/firmware_flasher.cpp" line="53"/>
        <source>A flashing operation is already running.</source>
        <translation>A flashing operation is already running.</translation>
    </message>
    <message>
        <location filename="../firmware/firmware_flasher.cpp" line="57"/>
        <source>Firmware file not found: %1</source>
        <translation>Firmware file not found: %1</translation>
    </message>
    <message>
        <location filename="../firmware/firmware_flasher.cpp" line="62"/>
        <source>openocd was not found. Install it, for example:
  sudo apt install openocd</source>
        <translation>openocd was not found. Install it, for example:
  sudo apt install openocd</translation>
    </message>
    <message>
        <location filename="../firmware/firmware_flasher.cpp" line="81"/>
        <source>openocd could not be started.</source>
        <translation>openocd could not be started.</translation>
    </message>
    <message>
        <location filename="../firmware/firmware_flasher.cpp" line="89"/>
        <source>Done.</source>
        <translation>Done.</translation>
    </message>
    <message>
        <location filename="../firmware/firmware_flasher.cpp" line="90"/>
        <source>Firmware written and verified.</source>
        <translation>Firmware written and verified.</translation>
    </message>
    <message>
        <location filename="../firmware/firmware_flasher.cpp" line="94"/>
        <source>openocd exited with code %1.

%2</source>
        <translation>openocd exited with code %1.

%2</translation>
    </message>
    <message>
        <location filename="../firmware/firmware_flasher.cpp" line="110"/>
        <source>Starting openocd...</source>
        <translation>Starting openocd...</translation>
    </message>
</context>
<context>
    <name>MainWindow</name>
    <message>
        <location filename="../mainwindow.ui" line="14"/>
        <location filename="../build/Desktop-Debug/VBDriveWizard_autogen/include/ui_mainwindow.h" line="2093"/>
        <source>VBDrive Wizard</source>
        <translation>VBDrive Wizard</translation>
    </message>
    <message>
        <location filename="../mainwindow.ui" line="23"/>
        <location filename="../build/Desktop-Debug/VBDriveWizard_autogen/include/ui_mainwindow.h" line="2094"/>
        <source>CONNECTION</source>
        <translation>CONNECTION</translation>
    </message>
    <message>
        <location filename="../mainwindow.ui" line="29"/>
        <location filename="../build/Desktop-Debug/VBDriveWizard_autogen/include/ui_mainwindow.h" line="2095"/>
        <source>Serial</source>
        <translation>Serial</translation>
    </message>
    <message>
        <location filename="../mainwindow.ui" line="42"/>
        <location filename="../mainwindow.ui" line="69"/>
        <location filename="../mainwindow.cpp" line="978"/>
        <location filename="../mainwindow.cpp" line="979"/>
        <location filename="../build/Desktop-Debug/VBDriveWizard_autogen/include/ui_mainwindow.h" line="2096"/>
        <location filename="../build/Desktop-Debug/VBDriveWizard_autogen/include/ui_mainwindow.h" line="2099"/>
        <source>Connect</source>
        <translation>Connect</translation>
    </message>
    <message>
        <location filename="../mainwindow.ui" line="49"/>
        <location filename="../mainwindow.ui" line="79"/>
        <location filename="../build/Desktop-Debug/VBDriveWizard_autogen/include/ui_mainwindow.h" line="2097"/>
        <location filename="../build/Desktop-Debug/VBDriveWizard_autogen/include/ui_mainwindow.h" line="2100"/>
        <source>Refresh</source>
        <translation>Refresh</translation>
    </message>
    <message>
        <location filename="../mainwindow.ui" line="56"/>
        <location filename="../mainwindow.ui" line="401"/>
        <location filename="../build/Desktop-Debug/VBDriveWizard_autogen/include/ui_mainwindow.h" line="2098"/>
        <location filename="../build/Desktop-Debug/VBDriveWizard_autogen/include/ui_mainwindow.h" line="2137"/>
        <source>CAN</source>
        <translation>CAN</translation>
    </message>
    <message>
        <location filename="../mainwindow.ui" line="89"/>
        <location filename="../build/Desktop-Debug/VBDriveWizard_autogen/include/ui_mainwindow.h" line="2101"/>
        <source>DEVICES</source>
        <translation>DEVICES</translation>
    </message>
    <message>
        <location filename="../mainwindow.ui" line="142"/>
        <location filename="../build/Desktop-Debug/VBDriveWizard_autogen/include/ui_mainwindow.h" line="2103"/>
        <source>CONFIGURATION</source>
        <translation>CONFIGURATION</translation>
    </message>
    <message>
        <location filename="../mainwindow.ui" line="152"/>
        <location filename="../build/Desktop-Debug/VBDriveWizard_autogen/include/ui_mainwindow.h" line="2122"/>
        <source>Basic</source>
        <translation>Basic</translation>
    </message>
    <message>
        <location filename="../mainwindow.ui" line="158"/>
        <location filename="../build/Desktop-Debug/VBDriveWizard_autogen/include/ui_mainwindow.h" line="2104"/>
        <source>Limits</source>
        <translation>Limits</translation>
    </message>
    <message>
        <location filename="../mainwindow.ui" line="166"/>
        <location filename="../mainwindow.ui" line="2451"/>
        <location filename="../build/Desktop-Debug/VBDriveWizard_autogen/include/ui_mainwindow.h" line="2105"/>
        <location filename="../build/Desktop-Debug/VBDriveWizard_autogen/include/ui_mainwindow.h" line="2261"/>
        <source>Angle</source>
        <translation>Angle</translation>
    </message>
    <message>
        <location filename="../mainwindow.ui" line="173"/>
        <location filename="../build/Desktop-Debug/VBDriveWizard_autogen/include/ui_mainwindow.h" line="2106"/>
        <source>min:</source>
        <translation>min:</translation>
    </message>
    <message>
        <location filename="../mainwindow.ui" line="196"/>
        <location filename="../build/Desktop-Debug/VBDriveWizard_autogen/include/ui_mainwindow.h" line="2107"/>
        <source>max</source>
        <translation>max</translation>
    </message>
    <message>
        <location filename="../mainwindow.ui" line="226"/>
        <location filename="../mainwindow.ui" line="1103"/>
        <location filename="../mainwindow.ui" line="1303"/>
        <location filename="../mainwindow.ui" line="1358"/>
        <location filename="../mainwindow.ui" line="2031"/>
        <location filename="../mainwindow.ui" line="2287"/>
        <location filename="../build/Desktop-Debug/VBDriveWizard_autogen/include/ui_mainwindow.h" line="2108"/>
        <location filename="../build/Desktop-Debug/VBDriveWizard_autogen/include/ui_mainwindow.h" line="2175"/>
        <location filename="../build/Desktop-Debug/VBDriveWizard_autogen/include/ui_mainwindow.h" line="2198"/>
        <location filename="../build/Desktop-Debug/VBDriveWizard_autogen/include/ui_mainwindow.h" line="2203"/>
        <location filename="../build/Desktop-Debug/VBDriveWizard_autogen/include/ui_mainwindow.h" line="2233"/>
        <location filename="../build/Desktop-Debug/VBDriveWizard_autogen/include/ui_mainwindow.h" line="2243"/>
        <source>Velocity</source>
        <translation>Velocity</translation>
    </message>
    <message>
        <location filename="../mainwindow.ui" line="256"/>
        <location filename="../mainwindow.ui" line="1108"/>
        <location filename="../mainwindow.ui" line="1310"/>
        <location filename="../mainwindow.ui" line="2061"/>
        <location filename="../mainwindow.ui" line="2280"/>
        <location filename="../build/Desktop-Debug/VBDriveWizard_autogen/include/ui_mainwindow.h" line="2109"/>
        <location filename="../build/Desktop-Debug/VBDriveWizard_autogen/include/ui_mainwindow.h" line="2176"/>
        <location filename="../build/Desktop-Debug/VBDriveWizard_autogen/include/ui_mainwindow.h" line="2199"/>
        <location filename="../build/Desktop-Debug/VBDriveWizard_autogen/include/ui_mainwindow.h" line="2234"/>
        <location filename="../build/Desktop-Debug/VBDriveWizard_autogen/include/ui_mainwindow.h" line="2242"/>
        <source>Torque</source>
        <translation>Torque</translation>
    </message>
    <message>
        <location filename="../mainwindow.ui" line="292"/>
        <location filename="../build/Desktop-Debug/VBDriveWizard_autogen/include/ui_mainwindow.h" line="2113"/>
        <source>Voltage</source>
        <translation>Voltage</translation>
    </message>
    <message>
        <location filename="../mainwindow.ui" line="289"/>
        <location filename="../mainwindow.ui" line="302"/>
        <location filename="../build/Desktop-Debug/VBDriveWizard_autogen/include/ui_mainwindow.h" line="2111"/>
        <location filename="../build/Desktop-Debug/VBDriveWizard_autogen/include/ui_mainwindow.h" line="2115"/>
        <source>The firmware exposes no voltage limit register yet.</source>
        <translation>The firmware exposes no voltage limit register yet.</translation>
    </message>
    <message>
        <location filename="../mainwindow.ui" line="328"/>
        <location filename="../mainwindow.ui" line="1118"/>
        <location filename="../build/Desktop-Debug/VBDriveWizard_autogen/include/ui_mainwindow.h" line="2117"/>
        <location filename="../build/Desktop-Debug/VBDriveWizard_autogen/include/ui_mainwindow.h" line="2178"/>
        <source>Current</source>
        <translation>Current</translation>
    </message>
    <message>
        <location filename="../mainwindow.ui" line="358"/>
        <location filename="../build/Desktop-Debug/VBDriveWizard_autogen/include/ui_mainwindow.h" line="2118"/>
        <source>Direction</source>
        <translation>Direction</translation>
    </message>
    <message>
        <location filename="../mainwindow.ui" line="366"/>
        <location filename="../build/Desktop-Debug/VBDriveWizard_autogen/include/ui_mainwindow.h" line="2119"/>
        <source>CCW</source>
        <translation>CCW</translation>
    </message>
    <message>
        <location filename="../mainwindow.ui" line="371"/>
        <location filename="../build/Desktop-Debug/VBDriveWizard_autogen/include/ui_mainwindow.h" line="2120"/>
        <source>CW</source>
        <translation>CW</translation>
    </message>
    <message>
        <location filename="../mainwindow.ui" line="407"/>
        <location filename="../build/Desktop-Debug/VBDriveWizard_autogen/include/ui_mainwindow.h" line="2123"/>
        <source>Data Baud Rate</source>
        <translation>Data Baud Rate</translation>
    </message>
    <message>
        <location filename="../mainwindow.ui" line="414"/>
        <location filename="../build/Desktop-Debug/VBDriveWizard_autogen/include/ui_mainwindow.h" line="2124"/>
        <source>Node ID</source>
        <translation>Node ID</translation>
    </message>
    <message>
        <location filename="../mainwindow.ui" line="441"/>
        <location filename="../build/Desktop-Debug/VBDriveWizard_autogen/include/ui_mainwindow.h" line="2125"/>
        <source>62.5 kHz</source>
        <translation>62.5 kHz</translation>
    </message>
    <message>
        <location filename="../mainwindow.ui" line="446"/>
        <location filename="../build/Desktop-Debug/VBDriveWizard_autogen/include/ui_mainwindow.h" line="2126"/>
        <source>125 kHz</source>
        <translation>125 kHz</translation>
    </message>
    <message>
        <location filename="../mainwindow.ui" line="451"/>
        <location filename="../build/Desktop-Debug/VBDriveWizard_autogen/include/ui_mainwindow.h" line="2127"/>
        <source>250 kHz</source>
        <translation>250 kHz</translation>
    </message>
    <message>
        <location filename="../mainwindow.ui" line="456"/>
        <location filename="../build/Desktop-Debug/VBDriveWizard_autogen/include/ui_mainwindow.h" line="2128"/>
        <source>500 kHz</source>
        <translation>500 kHz</translation>
    </message>
    <message>
        <location filename="../mainwindow.ui" line="461"/>
        <location filename="../mainwindow.ui" line="473"/>
        <location filename="../build/Desktop-Debug/VBDriveWizard_autogen/include/ui_mainwindow.h" line="2129"/>
        <location filename="../build/Desktop-Debug/VBDriveWizard_autogen/include/ui_mainwindow.h" line="2131"/>
        <source>1 MHz</source>
        <translation>1 MHz</translation>
    </message>
    <message>
        <location filename="../mainwindow.ui" line="478"/>
        <location filename="../build/Desktop-Debug/VBDriveWizard_autogen/include/ui_mainwindow.h" line="2132"/>
        <source>2 MHz</source>
        <translation>2 MHz</translation>
    </message>
    <message>
        <location filename="../mainwindow.ui" line="483"/>
        <location filename="../build/Desktop-Debug/VBDriveWizard_autogen/include/ui_mainwindow.h" line="2133"/>
        <source>4 MHz</source>
        <translation>4 MHz</translation>
    </message>
    <message>
        <location filename="../mainwindow.ui" line="488"/>
        <location filename="../build/Desktop-Debug/VBDriveWizard_autogen/include/ui_mainwindow.h" line="2134"/>
        <source>8 MHz</source>
        <translation>8 MHz</translation>
    </message>
    <message>
        <location filename="../mainwindow.ui" line="496"/>
        <location filename="../build/Desktop-Debug/VBDriveWizard_autogen/include/ui_mainwindow.h" line="2136"/>
        <source>Nominal Baud Rate</source>
        <translation>Nominal Baud Rate</translation>
    </message>
    <message>
        <location filename="../mainwindow.ui" line="526"/>
        <location filename="../build/Desktop-Debug/VBDriveWizard_autogen/include/ui_mainwindow.h" line="2154"/>
        <source>Advanced</source>
        <translation>Advanced</translation>
    </message>
    <message>
        <location filename="../mainwindow.ui" line="618"/>
        <location filename="../build/Desktop-Debug/VBDriveWizard_autogen/include/ui_mainwindow.h" line="2139"/>
        <source>Gear Ratio</source>
        <translation>Gear Ratio</translation>
    </message>
    <message>
        <location filename="../mainwindow.ui" line="749"/>
        <location filename="../mainwindow.ui" line="1123"/>
        <location filename="../build/Desktop-Debug/VBDriveWizard_autogen/include/ui_mainwindow.h" line="2147"/>
        <location filename="../build/Desktop-Debug/VBDriveWizard_autogen/include/ui_mainwindow.h" line="2179"/>
        <source>Encoder</source>
        <translation>Encoder</translation>
    </message>
    <message>
        <location filename="../mainwindow.ui" line="848"/>
        <location filename="../build/Desktop-Debug/VBDriveWizard_autogen/include/ui_mainwindow.h" line="2149"/>
        <source>Torque const</source>
        <translation>Torque const</translation>
    </message>
    <message>
        <location filename="../mainwindow.ui" line="869"/>
        <location filename="../build/Desktop-Debug/VBDriveWizard_autogen/include/ui_mainwindow.h" line="2152"/>
        <source>Current Kp</source>
        <translation>Current Kp</translation>
    </message>
    <message>
        <location filename="../mainwindow.ui" line="641"/>
        <location filename="../build/Desktop-Debug/VBDriveWizard_autogen/include/ui_mainwindow.h" line="2140"/>
        <source>Current Ki</source>
        <translation>Current Ki</translation>
    </message>
    <message>
        <location filename="../mainwindow.ui" line="862"/>
        <location filename="../build/Desktop-Debug/VBDriveWizard_autogen/include/ui_mainwindow.h" line="2151"/>
        <source>Position Offset</source>
        <translation>Position Offset</translation>
    </message>
    <message>
        <location filename="../mainwindow.ui" line="667"/>
        <location filename="../build/Desktop-Debug/VBDriveWizard_autogen/include/ui_mainwindow.h" line="2145"/>
        <source>Main Filter Param A</source>
        <translation>Main Filter Param A</translation>
    </message>
    <message>
        <location filename="../mainwindow.ui" line="838"/>
        <location filename="../build/Desktop-Debug/VBDriveWizard_autogen/include/ui_mainwindow.h" line="2148"/>
        <source>Filter Gain 1</source>
        <translation>Filter Gain 1</translation>
    </message>
    <message>
        <location filename="../mainwindow.ui" line="726"/>
        <location filename="../build/Desktop-Debug/VBDriveWizard_autogen/include/ui_mainwindow.h" line="2146"/>
        <source>Filter Gain 2</source>
        <translation>Filter Gain 2</translation>
    </message>
    <message>
        <location filename="../mainwindow.ui" line="855"/>
        <location filename="../build/Desktop-Debug/VBDriveWizard_autogen/include/ui_mainwindow.h" line="2150"/>
        <source>Filter Gain 3</source>
        <translation>Filter Gain 3</translation>
    </message>
    <message>
        <location filename="../mainwindow.ui" line="589"/>
        <location filename="../build/Desktop-Debug/VBDriveWizard_autogen/include/ui_mainwindow.h" line="2138"/>
        <source>Current LPF Gain</source>
        <translation>Current LPF Gain</translation>
    </message>
    <message>
        <location filename="../mainwindow.ui" line="649"/>
        <location filename="../build/Desktop-Debug/VBDriveWizard_autogen/include/ui_mainwindow.h" line="2141"/>
        <source>rotor</source>
        <translation>rotor</translation>
    </message>
    <message>
        <location filename="../mainwindow.ui" line="654"/>
        <location filename="../build/Desktop-Debug/VBDriveWizard_autogen/include/ui_mainwindow.h" line="2142"/>
        <source>shaft</source>
        <translation>shaft</translation>
    </message>
    <message>
        <location filename="../mainwindow.ui" line="659"/>
        <location filename="../build/Desktop-Debug/VBDriveWizard_autogen/include/ui_mainwindow.h" line="2143"/>
        <source>external</source>
        <translation>external</translation>
    </message>
    <message>
        <location filename="../mainwindow.ui" line="876"/>
        <location filename="../build/Desktop-Debug/VBDriveWizard_autogen/include/ui_mainwindow.h" line="2153"/>
        <source>Current Kd</source>
        <translation>Current Kd</translation>
    </message>
    <message>
        <location filename="../mainwindow.ui" line="884"/>
        <location filename="../build/Desktop-Debug/VBDriveWizard_autogen/include/ui_mainwindow.h" line="2168"/>
        <source>System</source>
        <translation>System</translation>
    </message>
    <message>
        <location filename="../mainwindow.ui" line="890"/>
        <location filename="../build/Desktop-Debug/VBDriveWizard_autogen/include/ui_mainwindow.h" line="2155"/>
        <source>Sensor</source>
        <translation>Sensor</translation>
    </message>
    <message>
        <location filename="../mainwindow.ui" line="896"/>
        <location filename="../build/Desktop-Debug/VBDriveWizard_autogen/include/ui_mainwindow.h" line="2156"/>
        <source>Calibrate</source>
        <translation>Calibrate</translation>
    </message>
    <message>
        <location filename="../mainwindow.ui" line="916"/>
        <location filename="../build/Desktop-Debug/VBDriveWizard_autogen/include/ui_mainwindow.h" line="2157"/>
        <source>Register Parameters</source>
        <translation>Register Parameters</translation>
    </message>
    <message>
        <location filename="../mainwindow.ui" line="922"/>
        <location filename="../build/Desktop-Debug/VBDriveWizard_autogen/include/ui_mainwindow.h" line="2158"/>
        <source>Save to File...</source>
        <translation>Save to File...</translation>
    </message>
    <message>
        <location filename="../mainwindow.ui" line="929"/>
        <location filename="../build/Desktop-Debug/VBDriveWizard_autogen/include/ui_mainwindow.h" line="2159"/>
        <source>Load from File...</source>
        <translation>Load from File...</translation>
    </message>
    <message>
        <location filename="../mainwindow.ui" line="936"/>
        <location filename="../build/Desktop-Debug/VBDriveWizard_autogen/include/ui_mainwindow.h" line="2160"/>
        <source>Restore to Default</source>
        <translation>Restore to Default</translation>
    </message>
    <message>
        <location filename="../mainwindow.ui" line="946"/>
        <location filename="../build/Desktop-Debug/VBDriveWizard_autogen/include/ui_mainwindow.h" line="2161"/>
        <source>Firmware</source>
        <translation>Firmware</translation>
    </message>
    <message>
        <location filename="../mainwindow.ui" line="954"/>
        <location filename="../build/Desktop-Debug/VBDriveWizard_autogen/include/ui_mainwindow.h" line="2162"/>
        <source>Current Version:</source>
        <translation>Current Version:</translation>
    </message>
    <message>
        <location filename="../mainwindow.ui" line="961"/>
        <location filename="../build/Desktop-Debug/VBDriveWizard_autogen/include/ui_mainwindow.h" line="2163"/>
        <source>0.0.1</source>
        <translation>0.0.1</translation>
    </message>
    <message>
        <location filename="../mainwindow.ui" line="972"/>
        <location filename="../build/Desktop-Debug/VBDriveWizard_autogen/include/ui_mainwindow.h" line="2164"/>
        <source>Choose file</source>
        <translation>Choose file</translation>
    </message>
    <message>
        <location filename="../mainwindow.ui" line="982"/>
        <location filename="../build/Desktop-Debug/VBDriveWizard_autogen/include/ui_mainwindow.h" line="2165"/>
        <source>Open</source>
        <translation>Open</translation>
    </message>
    <message>
        <location filename="../mainwindow.ui" line="991"/>
        <location filename="../build/Desktop-Debug/VBDriveWizard_autogen/include/ui_mainwindow.h" line="2166"/>
        <source>Download from remote repo</source>
        <translation>Download from remote repo</translation>
    </message>
    <message>
        <location filename="../mainwindow.ui" line="1000"/>
        <location filename="../build/Desktop-Debug/VBDriveWizard_autogen/include/ui_mainwindow.h" line="2167"/>
        <source>Flash</source>
        <translation>Flash</translation>
    </message>
    <message>
        <location filename="../mainwindow.ui" line="1038"/>
        <location filename="../build/Desktop-Debug/VBDriveWizard_autogen/include/ui_mainwindow.h" line="2169"/>
        <source>Read</source>
        <translation>Read</translation>
    </message>
    <message>
        <location filename="../mainwindow.ui" line="1045"/>
        <location filename="../build/Desktop-Debug/VBDriveWizard_autogen/include/ui_mainwindow.h" line="2170"/>
        <source>Write</source>
        <translation>Write</translation>
    </message>
    <message>
        <location filename="../mainwindow.ui" line="1052"/>
        <location filename="../build/Desktop-Debug/VBDriveWizard_autogen/include/ui_mainwindow.h" line="2171"/>
        <source>Set Origin</source>
        <translation>Set Origin</translation>
    </message>
    <message>
        <source>&lt;html&gt;&lt;head/&gt;&lt;body&gt;&lt;p align=&quot;center&quot;&gt;Logo&lt;/p&gt;&lt;/body&gt;&lt;/html&gt;</source>
        <translation type="vanished">&lt;html&gt;&lt;head/&gt;&lt;body&gt;&lt;p align=&quot;center&quot;&gt;Logo&lt;/p&gt;&lt;/body&gt;&lt;/html&gt;</translation>
    </message>
    <message>
        <location filename="../mainwindow.ui" line="1076"/>
        <location filename="../build/Desktop-Debug/VBDriveWizard_autogen/include/ui_mainwindow.h" line="2172"/>
        <source>REALTIME DATA</source>
        <translation>REALTIME DATA</translation>
    </message>
    <message>
        <location filename="../mainwindow.ui" line="1090"/>
        <location filename="../build/Desktop-Debug/VBDriveWizard_autogen/include/ui_mainwindow.h" line="2173"/>
        <source>Signal:</source>
        <translation>Signal:</translation>
    </message>
    <message>
        <location filename="../mainwindow.ui" line="1098"/>
        <location filename="../mainwindow.ui" line="1293"/>
        <location filename="../mainwindow.ui" line="2001"/>
        <location filename="../mainwindow.ui" line="2294"/>
        <location filename="../build/Desktop-Debug/VBDriveWizard_autogen/include/ui_mainwindow.h" line="2174"/>
        <location filename="../build/Desktop-Debug/VBDriveWizard_autogen/include/ui_mainwindow.h" line="2197"/>
        <location filename="../build/Desktop-Debug/VBDriveWizard_autogen/include/ui_mainwindow.h" line="2232"/>
        <location filename="../build/Desktop-Debug/VBDriveWizard_autogen/include/ui_mainwindow.h" line="2244"/>
        <source>Position</source>
        <translation>Position</translation>
    </message>
    <message>
        <location filename="../mainwindow.ui" line="1113"/>
        <location filename="../build/Desktop-Debug/VBDriveWizard_autogen/include/ui_mainwindow.h" line="2177"/>
        <source>Temperature</source>
        <translation>Temperature</translation>
    </message>
    <message>
        <location filename="../mainwindow.ui" line="1128"/>
        <location filename="../build/Desktop-Debug/VBDriveWizard_autogen/include/ui_mainwindow.h" line="2180"/>
        <source>Log</source>
        <translation>Log</translation>
    </message>
    <message>
        <location filename="../mainwindow.ui" line="1136"/>
        <location filename="../build/Desktop-Debug/VBDriveWizard_autogen/include/ui_mainwindow.h" line="2182"/>
        <source>Units:</source>
        <translation>Units:</translation>
    </message>
    <message>
        <location filename="../mainwindow.ui" line="1144"/>
        <location filename="../mainwindow.ui" line="2465"/>
        <location filename="../build/Desktop-Debug/VBDriveWizard_autogen/include/ui_mainwindow.h" line="2183"/>
        <location filename="../build/Desktop-Debug/VBDriveWizard_autogen/include/ui_mainwindow.h" line="2263"/>
        <source>rad</source>
        <translation>rad</translation>
    </message>
    <message>
        <location filename="../mainwindow.ui" line="1149"/>
        <location filename="../build/Desktop-Debug/VBDriveWizard_autogen/include/ui_mainwindow.h" line="2184"/>
        <source>deg</source>
        <translation>deg</translation>
    </message>
    <message>
        <location filename="../mainwindow.ui" line="1170"/>
        <location filename="../build/Desktop-Debug/VBDriveWizard_autogen/include/ui_mainwindow.h" line="2186"/>
        <source>Preferences</source>
        <translation>Preferences</translation>
    </message>
    <message>
        <location filename="../mainwindow.ui" line="1177"/>
        <location filename="../build/Desktop-Debug/VBDriveWizard_autogen/include/ui_mainwindow.h" line="2187"/>
        <source>Language:</source>
        <translation>Language:</translation>
    </message>
    <message>
        <location filename="../mainwindow.ui" line="1191"/>
        <location filename="../build/Desktop-Debug/VBDriveWizard_autogen/include/ui_mainwindow.h" line="2188"/>
        <source>English</source>
        <translation>English</translation>
    </message>
    <message>
        <location filename="../mainwindow.ui" line="1200"/>
        <location filename="../build/Desktop-Debug/VBDriveWizard_autogen/include/ui_mainwindow.h" line="2189"/>
        <source>Русский</source>
        <translation>Русский</translation>
    </message>
    <message>
        <location filename="../mainwindow.ui" line="1209"/>
        <location filename="../build/Desktop-Debug/VBDriveWizard_autogen/include/ui_mainwindow.h" line="2190"/>
        <source>中文</source>
        <translation>中文</translation>
    </message>
    <message>
        <location filename="../mainwindow.ui" line="1228"/>
        <location filename="../mainwindow.cpp" line="378"/>
        <location filename="../mainwindow.cpp" line="2125"/>
        <location filename="../build/Desktop-Debug/VBDriveWizard_autogen/include/ui_mainwindow.h" line="2192"/>
        <source>Pause</source>
        <translation>Pause</translation>
    </message>
    <message>
        <location filename="../mainwindow.ui" line="1235"/>
        <location filename="../build/Desktop-Debug/VBDriveWizard_autogen/include/ui_mainwindow.h" line="2193"/>
        <source>Save as CSV...</source>
        <translation>Save as CSV...</translation>
    </message>
    <message>
        <location filename="../mainwindow.ui" line="1242"/>
        <location filename="../build/Desktop-Debug/VBDriveWizard_autogen/include/ui_mainwindow.h" line="2194"/>
        <source>Save as PNG...</source>
        <translation>Save as PNG...</translation>
    </message>
    <message>
        <location filename="../mainwindow.ui" line="1269"/>
        <location filename="../build/Desktop-Debug/VBDriveWizard_autogen/include/ui_mainwindow.h" line="2195"/>
        <source>CONTROL</source>
        <translation>CONTROL</translation>
    </message>
    <message>
        <location filename="../mainwindow.ui" line="1279"/>
        <location filename="../build/Desktop-Debug/VBDriveWizard_autogen/include/ui_mainwindow.h" line="2225"/>
        <source>Servo</source>
        <translation>Servo</translation>
    </message>
    <message>
        <location filename="../mainwindow.ui" line="1287"/>
        <location filename="../build/Desktop-Debug/VBDriveWizard_autogen/include/ui_mainwindow.h" line="2196"/>
        <source>Control Type</source>
        <translation>Control Type</translation>
    </message>
    <message>
        <location filename="../mainwindow.ui" line="1333"/>
        <location filename="../build/Desktop-Debug/VBDriveWizard_autogen/include/ui_mainwindow.h" line="2200"/>
        <source>Transient Form</source>
        <translation>Transient Form</translation>
    </message>
    <message>
        <location filename="../mainwindow.ui" line="1339"/>
        <location filename="../build/Desktop-Debug/VBDriveWizard_autogen/include/ui_mainwindow.h" line="2201"/>
        <source>Linear</source>
        <translation>Linear</translation>
    </message>
    <message>
        <location filename="../mainwindow.ui" line="1349"/>
        <location filename="../build/Desktop-Debug/VBDriveWizard_autogen/include/ui_mainwindow.h" line="2202"/>
        <source>Polynomial</source>
        <translation>Polynomial</translation>
    </message>
    <message>
        <location filename="../mainwindow.ui" line="1398"/>
        <location filename="../mainwindow.ui" line="1527"/>
        <location filename="../build/Desktop-Debug/VBDriveWizard_autogen/include/ui_mainwindow.h" line="2204"/>
        <location filename="../build/Desktop-Debug/VBDriveWizard_autogen/include/ui_mainwindow.h" line="2209"/>
        <source>Set</source>
        <translation>Set</translation>
    </message>
    <message>
        <location filename="../mainwindow.ui" line="1412"/>
        <location filename="../build/Desktop-Debug/VBDriveWizard_autogen/include/ui_mainwindow.h" line="2205"/>
        <source>Feedback Gains</source>
        <translation>Feedback Gains</translation>
    </message>
    <message>
        <location filename="../mainwindow.ui" line="1420"/>
        <location filename="../build/Desktop-Debug/VBDriveWizard_autogen/include/ui_mainwindow.h" line="2206"/>
        <source>Kp:</source>
        <translation>Kp:</translation>
    </message>
    <message>
        <location filename="../mainwindow.ui" line="1450"/>
        <location filename="../build/Desktop-Debug/VBDriveWizard_autogen/include/ui_mainwindow.h" line="2207"/>
        <source>Ki:</source>
        <translation>Ki:</translation>
    </message>
    <message>
        <location filename="../mainwindow.ui" line="1480"/>
        <location filename="../build/Desktop-Debug/VBDriveWizard_autogen/include/ui_mainwindow.h" line="2208"/>
        <source>Kd:</source>
        <translation>Kd:</translation>
    </message>
    <message>
        <location filename="../mainwindow.ui" line="1543"/>
        <location filename="../build/Desktop-Debug/VBDriveWizard_autogen/include/ui_mainwindow.h" line="2212"/>
        <source>User</source>
        <translation>User</translation>
    </message>
    <message>
        <location filename="../mainwindow.ui" line="1551"/>
        <location filename="../mainwindow.cpp" line="1742"/>
        <location filename="../build/Desktop-Debug/VBDriveWizard_autogen/include/ui_mainwindow.h" line="2210"/>
        <source>Target pos:</source>
        <translation>Target pos:</translation>
    </message>
    <message>
        <location filename="../mainwindow.ui" line="1611"/>
        <location filename="../mainwindow.ui" line="1719"/>
        <location filename="../mainwindow.ui" line="1827"/>
        <location filename="../mainwindow.ui" line="1935"/>
        <location filename="../mainwindow.ui" line="2329"/>
        <location filename="../mainwindow.cpp" line="2042"/>
        <location filename="../build/Desktop-Debug/VBDriveWizard_autogen/include/ui_mainwindow.h" line="2211"/>
        <location filename="../build/Desktop-Debug/VBDriveWizard_autogen/include/ui_mainwindow.h" line="2215"/>
        <location filename="../build/Desktop-Debug/VBDriveWizard_autogen/include/ui_mainwindow.h" line="2219"/>
        <location filename="../build/Desktop-Debug/VBDriveWizard_autogen/include/ui_mainwindow.h" line="2223"/>
        <location filename="../build/Desktop-Debug/VBDriveWizard_autogen/include/ui_mainwindow.h" line="2246"/>
        <source>Start</source>
        <translation>Start</translation>
    </message>
    <message>
        <location filename="../mainwindow.ui" line="1621"/>
        <location filename="../mainwindow.ui" line="1971"/>
        <location filename="../build/Desktop-Debug/VBDriveWizard_autogen/include/ui_mainwindow.h" line="2216"/>
        <location filename="../build/Desktop-Debug/VBDriveWizard_autogen/include/ui_mainwindow.h" line="2228"/>
        <source>Sin</source>
        <translation>Sin</translation>
    </message>
    <message>
        <location filename="../mainwindow.ui" line="1629"/>
        <location filename="../mainwindow.ui" line="1737"/>
        <location filename="../mainwindow.ui" line="1845"/>
        <location filename="../mainwindow.ui" line="2160"/>
        <location filename="../build/Desktop-Debug/VBDriveWizard_autogen/include/ui_mainwindow.h" line="2213"/>
        <location filename="../build/Desktop-Debug/VBDriveWizard_autogen/include/ui_mainwindow.h" line="2217"/>
        <location filename="../build/Desktop-Debug/VBDriveWizard_autogen/include/ui_mainwindow.h" line="2221"/>
        <location filename="../build/Desktop-Debug/VBDriveWizard_autogen/include/ui_mainwindow.h" line="2238"/>
        <source>Amplitude</source>
        <translation>Amplitude</translation>
    </message>
    <message>
        <location filename="../mainwindow.ui" line="1659"/>
        <location filename="../mainwindow.ui" line="1767"/>
        <location filename="../mainwindow.ui" line="1875"/>
        <location filename="../mainwindow.ui" line="2190"/>
        <location filename="../build/Desktop-Debug/VBDriveWizard_autogen/include/ui_mainwindow.h" line="2214"/>
        <location filename="../build/Desktop-Debug/VBDriveWizard_autogen/include/ui_mainwindow.h" line="2218"/>
        <location filename="../build/Desktop-Debug/VBDriveWizard_autogen/include/ui_mainwindow.h" line="2222"/>
        <location filename="../build/Desktop-Debug/VBDriveWizard_autogen/include/ui_mainwindow.h" line="2239"/>
        <source>Frequency</source>
        <translation>Frequency</translation>
    </message>
    <message>
        <location filename="../mainwindow.ui" line="1729"/>
        <location filename="../mainwindow.ui" line="1978"/>
        <location filename="../build/Desktop-Debug/VBDriveWizard_autogen/include/ui_mainwindow.h" line="2220"/>
        <location filename="../build/Desktop-Debug/VBDriveWizard_autogen/include/ui_mainwindow.h" line="2229"/>
        <source>Meander</source>
        <translation>Meander</translation>
    </message>
    <message>
        <location filename="../mainwindow.ui" line="1837"/>
        <location filename="../mainwindow.ui" line="1985"/>
        <location filename="../build/Desktop-Debug/VBDriveWizard_autogen/include/ui_mainwindow.h" line="2224"/>
        <location filename="../build/Desktop-Debug/VBDriveWizard_autogen/include/ui_mainwindow.h" line="2230"/>
        <source>Triangle</source>
        <translation>Triangle</translation>
    </message>
    <message>
        <location filename="../mainwindow.ui" line="1949"/>
        <location filename="../build/Desktop-Debug/VBDriveWizard_autogen/include/ui_mainwindow.h" line="2247"/>
        <source>MIT</source>
        <translation>MIT</translation>
    </message>
    <message>
        <location filename="../mainwindow.ui" line="1955"/>
        <location filename="../build/Desktop-Debug/VBDriveWizard_autogen/include/ui_mainwindow.h" line="2226"/>
        <source>Trajectory</source>
        <translation>Trajectory</translation>
    </message>
    <message>
        <location filename="../mainwindow.ui" line="1961"/>
        <location filename="../build/Desktop-Debug/VBDriveWizard_autogen/include/ui_mainwindow.h" line="2227"/>
        <source>Step</source>
        <translation>Step</translation>
    </message>
    <message>
        <location filename="../mainwindow.ui" line="1995"/>
        <location filename="../build/Desktop-Debug/VBDriveWizard_autogen/include/ui_mainwindow.h" line="2231"/>
        <source>Step Targets</source>
        <translation>Step Targets</translation>
    </message>
    <message>
        <location filename="../mainwindow.ui" line="2091"/>
        <location filename="../mainwindow.ui" line="2220"/>
        <location filename="../build/Desktop-Debug/VBDriveWizard_autogen/include/ui_mainwindow.h" line="2235"/>
        <location filename="../build/Desktop-Debug/VBDriveWizard_autogen/include/ui_mainwindow.h" line="2240"/>
        <source>Kp</source>
        <translation>Kp</translation>
    </message>
    <message>
        <location filename="../mainwindow.ui" line="2121"/>
        <location filename="../mainwindow.ui" line="2250"/>
        <location filename="../build/Desktop-Debug/VBDriveWizard_autogen/include/ui_mainwindow.h" line="2236"/>
        <location filename="../build/Desktop-Debug/VBDriveWizard_autogen/include/ui_mainwindow.h" line="2241"/>
        <source>Kd</source>
        <translation>Kd</translation>
    </message>
    <message>
        <location filename="../mainwindow.ui" line="2154"/>
        <location filename="../build/Desktop-Debug/VBDriveWizard_autogen/include/ui_mainwindow.h" line="2237"/>
        <source>Trajectory Targets</source>
        <translation>Trajectory Targets</translation>
    </message>
    <message>
        <location filename="../mainwindow.ui" line="2304"/>
        <location filename="../build/Desktop-Debug/VBDriveWizard_autogen/include/ui_mainwindow.h" line="2245"/>
        <source>+derivative</source>
        <translation>+derivative</translation>
    </message>
    <message>
        <location filename="../mainwindow.ui" line="2361"/>
        <location filename="../build/Desktop-Debug/VBDriveWizard_autogen/include/ui_mainwindow.h" line="2248"/>
        <source>STATUS</source>
        <translation>STATUS</translation>
    </message>
    <message>
        <location filename="../mainwindow.ui" line="2367"/>
        <location filename="../build/Desktop-Debug/VBDriveWizard_autogen/include/ui_mainwindow.h" line="2249"/>
        <source>Model</source>
        <translation>Model</translation>
    </message>
    <message>
        <location filename="../mainwindow.ui" line="2374"/>
        <location filename="../build/Desktop-Debug/VBDriveWizard_autogen/include/ui_mainwindow.h" line="2250"/>
        <source>M4310R10</source>
        <translation>M4310R10</translation>
    </message>
    <message>
        <location filename="../mainwindow.ui" line="2388"/>
        <location filename="../build/Desktop-Debug/VBDriveWizard_autogen/include/ui_mainwindow.h" line="2252"/>
        <source>Temperature MCU</source>
        <translation>Temperature MCU</translation>
    </message>
    <message>
        <location filename="../mainwindow.ui" line="2395"/>
        <location filename="../mainwindow.ui" line="2416"/>
        <location filename="../mainwindow.ui" line="2437"/>
        <location filename="../mainwindow.ui" line="2458"/>
        <location filename="../mainwindow.ui" line="2479"/>
        <location filename="../mainwindow.ui" line="2500"/>
        <location filename="../mainwindow.ui" line="2521"/>
        <location filename="../build/Desktop-Debug/VBDriveWizard_autogen/include/ui_mainwindow.h" line="2253"/>
        <location filename="../build/Desktop-Debug/VBDriveWizard_autogen/include/ui_mainwindow.h" line="2256"/>
        <location filename="../build/Desktop-Debug/VBDriveWizard_autogen/include/ui_mainwindow.h" line="2259"/>
        <location filename="../build/Desktop-Debug/VBDriveWizard_autogen/include/ui_mainwindow.h" line="2262"/>
        <location filename="../build/Desktop-Debug/VBDriveWizard_autogen/include/ui_mainwindow.h" line="2265"/>
        <location filename="../build/Desktop-Debug/VBDriveWizard_autogen/include/ui_mainwindow.h" line="2268"/>
        <location filename="../build/Desktop-Debug/VBDriveWizard_autogen/include/ui_mainwindow.h" line="2271"/>
        <source>TextLabel</source>
        <translation>TextLabel</translation>
    </message>
    <message>
        <location filename="../mainwindow.ui" line="2402"/>
        <location filename="../mainwindow.ui" line="2423"/>
        <location filename="../build/Desktop-Debug/VBDriveWizard_autogen/include/ui_mainwindow.h" line="2254"/>
        <location filename="../build/Desktop-Debug/VBDriveWizard_autogen/include/ui_mainwindow.h" line="2257"/>
        <source>C</source>
        <translation>C</translation>
    </message>
    <message>
        <location filename="../mainwindow.ui" line="2409"/>
        <location filename="../build/Desktop-Debug/VBDriveWizard_autogen/include/ui_mainwindow.h" line="2255"/>
        <source>Temperature Stator</source>
        <translation>Temperature Stator</translation>
    </message>
    <message>
        <location filename="../mainwindow.ui" line="2430"/>
        <location filename="../build/Desktop-Debug/VBDriveWizard_autogen/include/ui_mainwindow.h" line="2258"/>
        <source>Bus Voltage</source>
        <translation>Bus Voltage</translation>
    </message>
    <message>
        <location filename="../mainwindow.ui" line="2444"/>
        <location filename="../build/Desktop-Debug/VBDriveWizard_autogen/include/ui_mainwindow.h" line="2260"/>
        <source>V</source>
        <translation>V</translation>
    </message>
    <message>
        <location filename="../mainwindow.ui" line="2472"/>
        <location filename="../build/Desktop-Debug/VBDriveWizard_autogen/include/ui_mainwindow.h" line="2264"/>
        <source>Motor Encoder</source>
        <translation>Motor Encoder</translation>
    </message>
    <message>
        <location filename="../mainwindow.ui" line="2486"/>
        <location filename="../mainwindow.ui" line="2507"/>
        <location filename="../mainwindow.ui" line="2528"/>
        <location filename="../build/Desktop-Debug/VBDriveWizard_autogen/include/ui_mainwindow.h" line="2266"/>
        <location filename="../build/Desktop-Debug/VBDriveWizard_autogen/include/ui_mainwindow.h" line="2269"/>
        <location filename="../build/Desktop-Debug/VBDriveWizard_autogen/include/ui_mainwindow.h" line="2272"/>
        <source>-</source>
        <translation>-</translation>
    </message>
    <message>
        <location filename="../mainwindow.ui" line="2493"/>
        <location filename="../build/Desktop-Debug/VBDriveWizard_autogen/include/ui_mainwindow.h" line="2267"/>
        <source>Shaft Encoder</source>
        <translation>Shaft Encoder</translation>
    </message>
    <message>
        <location filename="../mainwindow.ui" line="2514"/>
        <location filename="../build/Desktop-Debug/VBDriveWizard_autogen/include/ui_mainwindow.h" line="2270"/>
        <source>Fault</source>
        <translation>Fault</translation>
    </message>
    <message>
        <location filename="../mainwindow.ui" line="2556"/>
        <location filename="../build/Desktop-Debug/VBDriveWizard_autogen/include/ui_mainwindow.h" line="2274"/>
        <source>STOP</source>
        <translation>STOP</translation>
    </message>
    <message>
        <location filename="../mainwindow.cpp" line="182"/>
        <source>Reconnect failed</source>
        <translation>Reconnect failed</translation>
    </message>
    <message>
        <location filename="../mainwindow.cpp" line="183"/>
        <source>The drive did not answer after flashing; connect again by hand.

%1</source>
        <translation>The drive did not answer after flashing; connect again by hand.

%1</translation>
    </message>
    <message>
        <location filename="../mainwindow.cpp" line="188"/>
        <location filename="../mainwindow.cpp" line="200"/>
        <location filename="../mainwindow.cpp" line="854"/>
        <location filename="../mainwindow.cpp" line="886"/>
        <source>Connection failed</source>
        <translation>Connection failed</translation>
    </message>
    <message>
        <location filename="../mainwindow.cpp" line="223"/>
        <source>Firmware download failed</source>
        <translation>Firmware download failed</translation>
    </message>
    <message>
        <location filename="../mainwindow.cpp" line="227"/>
        <source>Downloaded firmware %1.</source>
        <translation>Downloaded firmware %1.</translation>
    </message>
    <message>
        <location filename="../mainwindow.cpp" line="247"/>
        <source>Flashing failed</source>
        <translation>Flashing failed</translation>
    </message>
    <message>
        <location filename="../mainwindow.cpp" line="374"/>
        <location filename="../mainwindow.cpp" line="376"/>
        <location filename="../mainwindow.cpp" line="978"/>
        <location filename="../mainwindow.cpp" line="979"/>
        <source>Disconnect</source>
        <translation>Disconnect</translation>
    </message>
    <message>
        <location filename="../mainwindow.cpp" line="378"/>
        <location filename="../mainwindow.cpp" line="2125"/>
        <source>Resume</source>
        <translation>Resume</translation>
    </message>
    <message>
        <location filename="../mainwindow.cpp" line="382"/>
        <location filename="../mainwindow.cpp" line="934"/>
        <source>Not connected</source>
        <translation>Not connected</translation>
    </message>
    <message>
        <location filename="../mainwindow.cpp" line="399"/>
        <location filename="../mainwindow.cpp" line="1084"/>
        <source>Unsaved changes</source>
        <translation>Unsaved changes</translation>
    </message>
    <message>
        <location filename="../mainwindow.cpp" line="400"/>
        <source>Some register changes have not been written to the drive.
Close anyway?</source>
        <translation>Some register changes have not been written to the drive.
Close anyway?</translation>
    </message>
    <message>
        <location filename="../mainwindow.cpp" line="429"/>
        <location filename="../mainwindow.cpp" line="847"/>
        <source>Disconnecting...</source>
        <translation type="unfinished"></translation>
    </message>
    <message>
        <location filename="../mainwindow.cpp" line="789"/>
        <source>%1 (unavailable)</source>
        <translation>%1 (unavailable)</translation>
    </message>
    <message>
        <location filename="../mainwindow.cpp" line="854"/>
        <source>No serial port selected.</source>
        <translation>No serial port selected.</translation>
    </message>
    <message>
        <location filename="../mainwindow.cpp" line="864"/>
        <source>Opening %1...</source>
        <translation>Opening %1...</translation>
    </message>
    <message>
        <location filename="../mainwindow.cpp" line="892"/>
        <source>Listening for drives on %1...</source>
        <translation>Listening for drives on %1...</translation>
    </message>
    <message>
        <location filename="../mainwindow.cpp" line="921"/>
        <source>Serial connected</source>
        <translation>Serial connected</translation>
    </message>
    <message>
        <location filename="../mainwindow.cpp" line="922"/>
        <source>CAN connected</source>
        <translation>CAN connected</translation>
    </message>
    <message>
        <location filename="../mainwindow.cpp" line="935"/>
        <source>Disconnected.</source>
        <translation>Disconnected.</translation>
    </message>
    <message>
        <location filename="../mainwindow.cpp" line="1019"/>
        <source>Sort by model</source>
        <translation>Sort by model</translation>
    </message>
    <message>
        <location filename="../mainwindow.cpp" line="1020"/>
        <source>Sort by Node ID</source>
        <translation>Sort by Node ID</translation>
    </message>
    <message>
        <location filename="../mainwindow.cpp" line="1047"/>
        <source>  (no heartbeat)</source>
        <translation>  (no heartbeat)</translation>
    </message>
    <message>
        <location filename="../mainwindow.cpp" line="1085"/>
        <source>Drive %1 has register changes that were not written.
Write them before switching?</source>
        <translation>Drive %1 has register changes that were not written.
Write them before switching?</translation>
    </message>
    <message>
        <location filename="../mainwindow.cpp" line="1157"/>
        <source>Reading registers...</source>
        <translation>Reading registers...</translation>
    </message>
    <message>
        <location filename="../mainwindow.cpp" line="1172"/>
        <source>No changes to write.</source>
        <translation>No changes to write.</translation>
    </message>
    <message numerus="yes">
        <location filename="../mainwindow.cpp" line="1188"/>
        <source>Writing %n register(s), the drive restarts to apply them...</source>
        <translation>
            <numerusform>Writing %n register(s), the drive restarts to apply them...</numerusform>
            <numerusform></numerusform>
        </translation>
    </message>
    <message numerus="yes">
        <location filename="../mainwindow.cpp" line="1193"/>
        <source>Writing %n register(s)...</source>
        <translation>
            <numerusform>Writing %n register(s)...</numerusform>
            <numerusform></numerusform>
        </translation>
    </message>
    <message>
        <location filename="../mainwindow.cpp" line="1220"/>
        <source>Origin set; angle offset is now %1.</source>
        <translation>Origin set; angle offset is now %1.</translation>
    </message>
    <message>
        <location filename="../mainwindow.cpp" line="1230"/>
        <source>Calibrate sensor</source>
        <translation>Calibrate sensor</translation>
    </message>
    <message>
        <location filename="../mainwindow.cpp" line="1231"/>
        <source>Calibration moves the motor and cannot be cancelled. The drive stops answering until it finishes.

Start calibration?</source>
        <translation>Calibration moves the motor and cannot be cancelled. The drive stops answering until it finishes.

Start calibration?</translation>
    </message>
    <message>
        <location filename="../mainwindow.cpp" line="1240"/>
        <source>Calibration started; the drive will not answer until it is done.</source>
        <translation>Calibration started; the drive will not answer until it is done.</translation>
    </message>
    <message>
        <location filename="../mainwindow.cpp" line="1262"/>
        <source>Save register profile</source>
        <translation>Save register profile</translation>
    </message>
    <message>
        <location filename="../mainwindow.cpp" line="1265"/>
        <location filename="../mainwindow.cpp" line="1288"/>
        <source>YAML files (*.yaml *.yml)</source>
        <translation>YAML files (*.yaml *.yml)</translation>
    </message>
    <message>
        <location filename="../mainwindow.cpp" line="1279"/>
        <source>Could not save the profile</source>
        <translation>Could not save the profile</translation>
    </message>
    <message>
        <location filename="../mainwindow.cpp" line="1281"/>
        <source>Profile saved to %1.</source>
        <translation>Profile saved to %1.</translation>
    </message>
    <message>
        <location filename="../mainwindow.cpp" line="1287"/>
        <source>Load register profile</source>
        <translation>Load register profile</translation>
    </message>
    <message>
        <location filename="../mainwindow.cpp" line="1296"/>
        <source>Could not load the profile</source>
        <translation>Could not load the profile</translation>
    </message>
    <message numerus="yes">
        <location filename="../mainwindow.cpp" line="1301"/>
        <source>Loaded %n register(s) from the profile.</source>
        <translation>
            <numerusform>Loaded %n register(s) from the profile.</numerusform>
            <numerusform></numerusform>
        </translation>
    </message>
    <message>
        <location filename="../mainwindow.cpp" line="1303"/>
        <source>Loaded with warnings: %1</source>
        <translation>Loaded with warnings: %1</translation>
    </message>
    <message>
        <location filename="../mainwindow.cpp" line="1319"/>
        <source>Could not load the default profile</source>
        <translation>Could not load the default profile</translation>
    </message>
    <message>
        <location filename="../mainwindow.cpp" line="1323"/>
        <source>Default values for %1 loaded into the editors.</source>
        <translation>Default values for %1 loaded into the editors.</translation>
    </message>
    <message>
        <location filename="../mainwindow.cpp" line="1351"/>
        <source>Could not read &apos;%1&apos;: %2</source>
        <translation>Could not read &apos;%1&apos;: %2</translation>
    </message>
    <message>
        <location filename="../mainwindow.cpp" line="1398"/>
        <source>Could not write &apos;%1&apos;: %2</source>
        <translation>Could not write &apos;%1&apos;: %2</translation>
    </message>
    <message>
        <location filename="../mainwindow.cpp" line="1409"/>
        <source>Registers written.</source>
        <translation>Registers written.</translation>
    </message>
    <message>
        <location filename="../mainwindow.cpp" line="1417"/>
        <source>Some registers were not written</source>
        <translation>Some registers were not written</translation>
    </message>
    <message>
        <location filename="../mainwindow.cpp" line="1465"/>
        <source>Drive lost</source>
        <translation>Drive lost</translation>
    </message>
    <message>
        <location filename="../mainwindow.cpp" line="1466"/>
        <source>Drive %1 (node %2) stopped sending heartbeats.</source>
        <translation>Drive %1 (node %2) stopped sending heartbeats.</translation>
    </message>
    <message>
        <location filename="../mainwindow.cpp" line="1469"/>
        <source>Wait for it to come back, keeping your unsaved register changes, or drop it and discard them?</source>
        <translation>Wait for it to come back, keeping your unsaved register changes, or drop it and discard them?</translation>
    </message>
    <message>
        <location filename="../mainwindow.cpp" line="1471"/>
        <source>Reconnect</source>
        <translation>Reconnect</translation>
    </message>
    <message>
        <location filename="../mainwindow.cpp" line="1472"/>
        <source>Remove drive</source>
        <translation>Remove drive</translation>
    </message>
    <message>
        <location filename="../mainwindow.cpp" line="1484"/>
        <source>Waiting for node %1 to return...</source>
        <translation>Waiting for node %1 to return...</translation>
    </message>
    <message>
        <location filename="../mainwindow.cpp" line="1506"/>
        <source>The drive restarted with the new settings.</source>
        <translation>The drive restarted with the new settings.</translation>
    </message>
    <message>
        <location filename="../mainwindow.cpp" line="1519"/>
        <source>Node %1 is back.</source>
        <translation>Node %1 is back.</translation>
    </message>
    <message>
        <location filename="../mainwindow.cpp" line="1604"/>
        <source>Yes</source>
        <translation>Yes</translation>
    </message>
    <message>
        <location filename="../mainwindow.cpp" line="1604"/>
        <source>No</source>
        <translation>No</translation>
    </message>
    <message>
        <location filename="../mainwindow.cpp" line="1738"/>
        <source>Target vel:</source>
        <translation>Target vel:</translation>
    </message>
    <message>
        <location filename="../mainwindow.cpp" line="1740"/>
        <source>Target torq:</source>
        <translation>Target torq:</translation>
    </message>
    <message>
        <location filename="../mainwindow.cpp" line="1929"/>
        <source>Serial cannot sustain %1 Hz; running at %2 Hz instead.</source>
        <translation>Serial cannot sustain %1 Hz; running at %2 Hz instead.</translation>
    </message>
    <message>
        <location filename="../mainwindow.cpp" line="1990"/>
        <source>Feedback gains written.</source>
        <translation>Feedback gains written.</translation>
    </message>
    <message>
        <location filename="../mainwindow.cpp" line="2009"/>
        <source>Transient form written.</source>
        <translation>Transient form written.</translation>
    </message>
    <message>
        <location filename="../mainwindow.cpp" line="2022"/>
        <source>Emergency stop: all drives disabled.</source>
        <translation>Emergency stop: all drives disabled.</translation>
    </message>
    <message>
        <location filename="../mainwindow.cpp" line="0"/>
        <source>Pause the plot</source>
        <translation>Pause the plot</translation>
    </message>
    <message>
        <location filename="../mainwindow.cpp" line="0"/>
        <source>Resume the plot</source>
        <translation>Resume the plot</translation>
    </message>
    <message>
        <location filename="../mainwindow.cpp" line="0"/>
        <source>Emergency stop</source>
        <translation>Emergency stop</translation>
    </message>
    <message>
        <location filename="../mainwindow.cpp" line="0"/>
        <source>The drive has been stopped by the emergency stop. To resume, restart the drive and connect to it again.</source>
        <translation>The drive has been stopped by the emergency stop. To resume, restart the drive and connect to it again.</translation>
    </message>
    <message>
        <location filename="../mainwindow.cpp" line="2042"/>
        <source>Stop</source>
        <translation>Stop</translation>
    </message>
    <message>
        <location filename="../mainwindow.cpp" line="2130"/>
        <source>Save plot data</source>
        <translation>Save plot data</translation>
    </message>
    <message>
        <location filename="../mainwindow.cpp" line="2131"/>
        <source>CSV files (*.csv)</source>
        <translation>CSV files (*.csv)</translation>
    </message>
    <message>
        <location filename="../mainwindow.cpp" line="2136"/>
        <source>Could not save the CSV</source>
        <translation>Could not save the CSV</translation>
    </message>
    <message>
        <location filename="../mainwindow.cpp" line="2138"/>
        <source>Plot data saved.</source>
        <translation>Plot data saved.</translation>
    </message>
    <message>
        <location filename="../mainwindow.cpp" line="2143"/>
        <source>Save plot image</source>
        <translation>Save plot image</translation>
    </message>
    <message>
        <location filename="../mainwindow.cpp" line="2144"/>
        <source>PNG images (*.png)</source>
        <translation>PNG images (*.png)</translation>
    </message>
    <message>
        <location filename="../mainwindow.cpp" line="2149"/>
        <source>Could not save the image</source>
        <translation>Could not save the image</translation>
    </message>
    <message>
        <location filename="../mainwindow.cpp" line="2151"/>
        <source>Plot image saved.</source>
        <translation>Plot image saved.</translation>
    </message>
    <message>
        <location filename="../mainwindow.cpp" line="2170"/>
        <source>Select firmware image</source>
        <translation>Select firmware image</translation>
    </message>
    <message>
        <location filename="../mainwindow.cpp" line="2171"/>
        <source>Intel HEX files (*.hex)</source>
        <translation>Intel HEX files (*.hex)</translation>
    </message>
    <message>
        <location filename="../mainwindow.cpp" line="2175"/>
        <source>Selected %1.</source>
        <translation>Selected %1.</translation>
    </message>
    <message>
        <location filename="../mainwindow.cpp" line="2187"/>
        <source>No firmware selected</source>
        <translation>No firmware selected</translation>
    </message>
    <message>
        <location filename="../mainwindow.cpp" line="2188"/>
        <source>Choose a .hex file first, or switch to downloading the latest release.</source>
        <translation>Choose a .hex file first, or switch to downloading the latest release.</translation>
    </message>
    <message>
        <location filename="../mainwindow.cpp" line="2209"/>
        <source>Flashing %1...</source>
        <translation>Flashing %1...</translation>
    </message>
    <message>
        <location filename="../mainwindow.cpp" line="2225"/>
        <source>Reconnecting to the flashed drive...</source>
        <translation>Reconnecting to the flashed drive...</translation>
    </message>
    <message>
        <location filename="../mainwindow.cpp" line="2251"/>
        <source>Reconnecting to %1...</source>
        <translation>Reconnecting to %1...</translation>
    </message>
</context>
<context>
    <name>PlotController</name>
    <message>
        <location filename="../ui/plot_controller.cpp" line="125"/>
        <source>t, s</source>
        <translation>t, s</translation>
    </message>
    <message>
        <location filename="../ui/plot_controller.cpp" line="150"/>
        <source>Position</source>
        <translation>Position</translation>
    </message>
    <message>
        <location filename="../ui/plot_controller.cpp" line="152"/>
        <source>Velocity</source>
        <translation>Velocity</translation>
    </message>
    <message>
        <location filename="../ui/plot_controller.cpp" line="154"/>
        <source>Torque</source>
        <translation>Torque</translation>
    </message>
    <message>
        <location filename="../ui/plot_controller.cpp" line="156"/>
        <source>MCU</source>
        <translation>MCU</translation>
    </message>
    <message>
        <location filename="../ui/plot_controller.cpp" line="158"/>
        <source>Bus current</source>
        <translation>Bus current</translation>
    </message>
    <message>
        <location filename="../ui/plot_controller.cpp" line="160"/>
        <source>Rotor</source>
        <translation>Rotor</translation>
    </message>
    <message>
        <location filename="../ui/plot_controller.cpp" line="173"/>
        <source>Target</source>
        <translation>Target</translation>
    </message>
    <message>
        <location filename="../ui/plot_controller.cpp" line="175"/>
        <source>Stator</source>
        <translation>Stator</translation>
    </message>
    <message>
        <location filename="../ui/plot_controller.cpp" line="177"/>
        <source>Shaft</source>
        <translation>Shaft</translation>
    </message>
    <message>
        <location filename="../ui/plot_controller.cpp" line="188"/>
        <source>Position, %1</source>
        <translation>Position, %1</translation>
    </message>
    <message>
        <location filename="../ui/plot_controller.cpp" line="190"/>
        <source>Velocity, %1</source>
        <translation>Velocity, %1</translation>
    </message>
    <message>
        <location filename="../ui/plot_controller.cpp" line="193"/>
        <source>Torque, N*m</source>
        <translation>Torque, N*m</translation>
    </message>
    <message>
        <location filename="../ui/plot_controller.cpp" line="195"/>
        <source>Temperature, C</source>
        <translation>Temperature, C</translation>
    </message>
    <message>
        <location filename="../ui/plot_controller.cpp" line="197"/>
        <source>Current, A</source>
        <translation>Current, A</translation>
    </message>
    <message>
        <location filename="../ui/plot_controller.cpp" line="199"/>
        <source>Encoder, counts</source>
        <translation>Encoder, counts</translation>
    </message>
    <message>
        <location filename="../ui/plot_controller.cpp" line="482"/>
        <location filename="../ui/plot_controller.cpp" line="519"/>
        <source>The plot is not initialised.</source>
        <translation>The plot is not initialised.</translation>
    </message>
    <message>
        <location filename="../ui/plot_controller.cpp" line="487"/>
        <source>The log view cannot be exported as an image.</source>
        <translation>The log view cannot be exported as an image.</translation>
    </message>
    <message>
        <location filename="../ui/plot_controller.cpp" line="501"/>
        <source>The plot could not be rendered.</source>
        <translation>The plot could not be rendered.</translation>
    </message>
    <message>
        <location filename="../ui/plot_controller.cpp" line="509"/>
        <source>Could not write %1.</source>
        <translation>Could not write %1.</translation>
    </message>
    <message>
        <location filename="../ui/plot_controller.cpp" line="527"/>
        <location filename="../ui/plot_controller.cpp" line="535"/>
        <location filename="../ui/plot_controller.cpp" line="544"/>
        <location filename="../ui/plot_controller.cpp" line="580"/>
        <source>Could not write %1: %2</source>
        <translation>Could not write %1: %2</translation>
    </message>
</context>
<context>
    <name>PreferencesDialog</name>
    <message>
        <location filename="../ui/preferences_dialog.ui" line="14"/>
        <source>Preferences</source>
        <translation>Preferences</translation>
    </message>
    <message>
        <location filename="../ui/preferences_dialog.ui" line="20"/>
        <source>Appearance</source>
        <translation>Appearance</translation>
    </message>
    <message>
        <location filename="../ui/preferences_dialog.ui" line="26"/>
        <source>Theme:</source>
        <translation>Theme:</translation>
    </message>
    <message>
        <location filename="../ui/preferences_dialog.ui" line="34"/>
        <source>Dark</source>
        <translation>Dark</translation>
    </message>
    <message>
        <location filename="../ui/preferences_dialog.ui" line="39"/>
        <source>Light</source>
        <translation>Light</translation>
    </message>
    <message>
        <location filename="../ui/preferences_dialog.ui" line="47"/>
        <source>Interface font size, pt:</source>
        <translation>Interface font size, pt:</translation>
    </message>
    <message>
        <location filename="../ui/preferences_dialog.ui" line="67"/>
        <source>Plot</source>
        <translation>Plot</translation>
    </message>
    <message>
        <location filename="../ui/preferences_dialog.ui" line="73"/>
        <source>Plot font size, pt:</source>
        <translation>Plot font size, pt:</translation>
    </message>
    <message>
        <location filename="../ui/preferences_dialog.ui" line="90"/>
        <source>Line width, px:</source>
        <translation>Line width, px:</translation>
    </message>
    <message>
        <location filename="../ui/preferences_dialog.ui" line="107"/>
        <source>Time window, s:</source>
        <translation>Time window, s:</translation>
    </message>
    <message>
        <location filename="../ui/preferences_dialog.ui" line="130"/>
        <source>Redraw rate, Hz:</source>
        <translation>Redraw rate, Hz:</translation>
    </message>
    <message>
        <location filename="../ui/preferences_dialog.ui" line="150"/>
        <source>Connection</source>
        <translation>Connection</translation>
    </message>
    <message>
        <location filename="../ui/preferences_dialog.ui" line="156"/>
        <source>This application&apos;s Cyphal node ID:</source>
        <translation>This application&apos;s Cyphal node ID:</translation>
    </message>
    <message>
        <location filename="../ui/preferences_dialog.ui" line="173"/>
        <source>Serial baud rate:</source>
        <translation>Serial baud rate:</translation>
    </message>
    <message>
        <location filename="../ui/preferences_dialog.ui" line="196"/>
        <source>Firmware flashing (OpenOCD)</source>
        <translation>Firmware flashing (OpenOCD)</translation>
    </message>
    <message>
        <location filename="../ui/preferences_dialog.ui" line="202"/>
        <source>Interface config:</source>
        <translation>Interface config:</translation>
    </message>
    <message>
        <location filename="../ui/preferences_dialog.ui" line="213"/>
        <source>Target config:</source>
        <translation>Target config:</translation>
    </message>
    <message>
        <location filename="../ui/preferences_dialog.cpp" line="20"/>
        <source>OpenOCD interface script, relative to its scripts directory.
VBDrive is programmed over SWD with an ST-Link.</source>
        <translation>OpenOCD interface script, relative to its scripts directory.
VBDrive is programmed over SWD with an ST-Link.</translation>
    </message>
    <message>
        <location filename="../ui/preferences_dialog.cpp" line="23"/>
        <source>OpenOCD target script. VBDrive uses an STM32G431VB.</source>
        <translation>OpenOCD target script. VBDrive uses an STM32G431VB.</translation>
    </message>
    <message>
        <location filename="../ui/preferences_dialog.cpp" line="25"/>
        <source>Node ID this application announces on the CAN bus.
It must not collide with any drive.</source>
        <translation>Node ID this application announces on the CAN bus.
It must not collide with any drive.</translation>
    </message>
</context>
<context>
    <name>RegisterYaml</name>
    <message>
        <location filename="../core/register_yaml.cpp" line="33"/>
        <source>File does not exist: %1</source>
        <translation>File does not exist: %1</translation>
    </message>
    <message>
        <location filename="../core/register_yaml.cpp" line="43"/>
        <source>Cannot parse %1: %2</source>
        <translation>Cannot parse %1: %2</translation>
    </message>
    <message>
        <location filename="../core/register_yaml.cpp" line="50"/>
        <source>%1 is not a map of register names to values.</source>
        <translation>%1 is not a map of register names to values.</translation>
    </message>
    <message>
        <location filename="../core/register_yaml.cpp" line="61"/>
        <source>unknown register &apos;%1&apos;</source>
        <translation>unknown register &apos;%1&apos;</translation>
    </message>
    <message>
        <location filename="../core/register_yaml.cpp" line="67"/>
        <source>&apos;%1&apos; does not hold a single value</source>
        <translation>&apos;%1&apos; does not hold a single value</translation>
    </message>
    <message>
        <location filename="../core/register_yaml.cpp" line="75"/>
        <source>&apos;%1&apos; has a value of the wrong type</source>
        <translation>&apos;%1&apos; has a value of the wrong type</translation>
    </message>
    <message>
        <location filename="../core/register_yaml.cpp" line="85"/>
        <source>%1 contains no recognised registers.</source>
        <translation>%1 contains no recognised registers.</translation>
    </message>
    <message>
        <location filename="../core/register_yaml.cpp" line="98"/>
        <location filename="../core/register_yaml.cpp" line="124"/>
        <source>Cannot write %1: %2</source>
        <translation>Cannot write %1: %2</translation>
    </message>
</context>
<context>
    <name>RestoreLabel</name>
    <message>
        <location filename="../ui/restore_label.cpp" line="21"/>
        <source>Restore the value this field had when the drive was selected</source>
        <translation>Restore the value this field had when the drive was selected</translation>
    </message>
</context>
<context>
    <name>RestoreModelDialog</name>
    <message>
        <location filename="../ui/restore_model_dialog.ui" line="14"/>
        <source>Restore Default Registers</source>
        <translation>Restore Default Registers</translation>
    </message>
    <message>
        <location filename="../ui/restore_model_dialog.ui" line="20"/>
        <source>Load the factory register profile for this drive model. The values are placed in the editors; nothing is written to the drive until you press Write.</source>
        <translation>Load the factory register profile for this drive model. The values are placed in the editors; nothing is written to the drive until you press Write.</translation>
    </message>
    <message>
        <location filename="../ui/restore_model_dialog.ui" line="32"/>
        <source>Drive model:</source>
        <translation>Drive model:</translation>
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
        <location filename="../transport/serial_service.cpp" line="97"/>
        <source>Serial service is shutting down.</source>
        <translation>Serial service is shutting down.</translation>
    </message>
    <message>
        <location filename="../transport/serial_service.cpp" line="126"/>
        <source>Reconnecting.</source>
        <translation>Reconnecting.</translation>
    </message>
    <message>
        <location filename="../transport/serial_service.cpp" line="138"/>
        <location filename="../transport/serial_service.cpp" line="142"/>
        <location filename="../transport/serial_service.cpp" line="156"/>
        <location filename="../transport/serial_service.cpp" line="172"/>
        <location filename="../transport/serial_service.cpp" line="483"/>
        <source>Disconnected.</source>
        <translation>Disconnected.</translation>
    </message>
    <message>
        <location filename="../transport/serial_service.cpp" line="204"/>
        <location filename="../transport/serial_service.cpp" line="230"/>
        <location filename="../transport/serial_service.cpp" line="682"/>
        <source>Serial port is not open.</source>
        <translation>Serial port is not open.</translation>
    </message>
    <message>
        <location filename="../transport/serial_service.cpp" line="204"/>
        <location filename="../transport/serial_service.cpp" line="682"/>
        <source>Disconnecting.</source>
        <translation type="unfinished"></translation>
    </message>
    <message>
        <location filename="../transport/serial_service.cpp" line="285"/>
        <source>Command &apos;%1&apos; failed: %2</source>
        <translation>Command &apos;%1&apos; failed: %2</translation>
    </message>
    <message>
        <location filename="../transport/serial_service.cpp" line="297"/>
        <source>The drive did not answer after restarting: %1</source>
        <translation>The drive did not answer after restarting: %1</translation>
    </message>
    <message>
        <location filename="../transport/serial_service.cpp" line="321"/>
        <source>Drive detected on %1.</source>
        <translation>Drive detected on %1.</translation>
    </message>
    <message>
        <location filename="../transport/serial_service.cpp" line="322"/>
        <source>No drive answered on %1: %2</source>
        <translation>No drive answered on %1: %2</translation>
    </message>
    <message>
        <location filename="../transport/serial_service.cpp" line="330"/>
        <source>Could not enter CONFIG mode: %1</source>
        <translation type="unfinished"></translation>
    </message>
    <message>
        <location filename="../transport/serial_service.cpp" line="379"/>
        <source>These registers were rejected by the drive: %1</source>
        <translation>These registers were rejected by the drive: %1</translation>
    </message>
    <message>
        <location filename="../transport/serial_service.cpp" line="483"/>
        <source>Serial connection lost.</source>
        <translation>Serial connection lost.</translation>
    </message>
    <message>
        <location filename="../transport/serial_service.cpp" line="508"/>
        <source>The drive did not come back after restarting.</source>
        <translation>The drive did not come back after restarting.</translation>
    </message>
    <message>
        <location filename="../transport/serial_service.cpp" line="565"/>
        <source>The drive did not answer in time.</source>
        <translation>The drive did not answer in time.</translation>
    </message>
    <message>
        <location filename="../transport/serial_service.cpp" line="650"/>
        <source>Could not interpret the value &apos;%1&apos;.</source>
        <translation>Could not interpret the value &apos;%1&apos;.</translation>
    </message>
</context>
<context>
    <name>SerialWorker</name>
    <message>
        <location filename="../transport/serial_worker.cpp" line="63"/>
        <source>Port %1 opened at %2 baud.</source>
        <translation>Port %1 opened at %2 baud.</translation>
    </message>
    <message>
        <location filename="../transport/serial_worker.cpp" line="87"/>
        <source>Serial port is not open.</source>
        <translation>Serial port is not open.</translation>
    </message>
</context>
</TS>
