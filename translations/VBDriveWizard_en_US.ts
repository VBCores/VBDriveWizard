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
        <location filename="../firmware/firmware_downloader.cpp" line="42"/>
        <source>A firmware download is already running.</source>
        <translation>A firmware download is already running.</translation>
    </message>
    <message>
        <location filename="../firmware/firmware_downloader.cpp" line="52"/>
        <source>Looking up the latest release...</source>
        <translation>Looking up the latest release...</translation>
    </message>
    <message>
        <location filename="../firmware/firmware_downloader.cpp" line="73"/>
        <source>Could not reach the VBDrive releases: %1</source>
        <translation>Could not reach the VBDrive releases: %1</translation>
    </message>
    <message>
        <location filename="../firmware/firmware_downloader.cpp" line="92"/>
        <source>Release %1 does not contain %2.</source>
        <translation>Release %1 does not contain %2.</translation>
    </message>
    <message>
        <location filename="../firmware/firmware_downloader.cpp" line="93"/>
        <source>(unknown)</source>
        <translation>(unknown)</translation>
    </message>
    <message>
        <location filename="../firmware/firmware_downloader.cpp" line="102"/>
        <location filename="../firmware/firmware_downloader.cpp" line="115"/>
        <source>Downloading %1...</source>
        <translation>Downloading %1...</translation>
    </message>
    <message>
        <location filename="../firmware/firmware_downloader.cpp" line="130"/>
        <source>Firmware download failed: %1</source>
        <translation>Firmware download failed: %1</translation>
    </message>
    <message>
        <location filename="../firmware/firmware_downloader.cpp" line="141"/>
        <location filename="../firmware/firmware_downloader.cpp" line="146"/>
        <source>Could not write %1: %2</source>
        <translation>Could not write %1: %2</translation>
    </message>
    <message>
        <location filename="../firmware/firmware_downloader.cpp" line="150"/>
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
        <location filename="../build/Desktop-Debug/VBDriveWizard_autogen/include/ui_mainwindow.h" line="2091"/>
        <source>VBDrive Wizard</source>
        <translation>VBDrive Wizard</translation>
    </message>
    <message>
        <location filename="../mainwindow.ui" line="23"/>
        <location filename="../build/Desktop-Debug/VBDriveWizard_autogen/include/ui_mainwindow.h" line="2092"/>
        <source>CONNECTION</source>
        <translation>CONNECTION</translation>
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
        <translation>Connect</translation>
    </message>
    <message>
        <location filename="../mainwindow.ui" line="49"/>
        <location filename="../mainwindow.ui" line="73"/>
        <location filename="../build/Desktop-Debug/VBDriveWizard_autogen/include/ui_mainwindow.h" line="2095"/>
        <location filename="../build/Desktop-Debug/VBDriveWizard_autogen/include/ui_mainwindow.h" line="2098"/>
        <source>Refresh</source>
        <translation>Refresh</translation>
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
        <translation>DEVICES</translation>
    </message>
    <message>
        <location filename="../mainwindow.ui" line="136"/>
        <location filename="../build/Desktop-Debug/VBDriveWizard_autogen/include/ui_mainwindow.h" line="2101"/>
        <source>CONFIGURATION</source>
        <translation>CONFIGURATION</translation>
    </message>
    <message>
        <location filename="../mainwindow.ui" line="146"/>
        <location filename="../build/Desktop-Debug/VBDriveWizard_autogen/include/ui_mainwindow.h" line="2120"/>
        <source>Basic</source>
        <translation>Basic</translation>
    </message>
    <message>
        <location filename="../mainwindow.ui" line="152"/>
        <location filename="../build/Desktop-Debug/VBDriveWizard_autogen/include/ui_mainwindow.h" line="2102"/>
        <source>Limits</source>
        <translation>Limits</translation>
    </message>
    <message>
        <location filename="../mainwindow.ui" line="160"/>
        <location filename="../mainwindow.ui" line="2445"/>
        <location filename="../build/Desktop-Debug/VBDriveWizard_autogen/include/ui_mainwindow.h" line="2103"/>
        <location filename="../build/Desktop-Debug/VBDriveWizard_autogen/include/ui_mainwindow.h" line="2259"/>
        <source>Angle</source>
        <translation>Angle</translation>
    </message>
    <message>
        <location filename="../mainwindow.ui" line="167"/>
        <location filename="../build/Desktop-Debug/VBDriveWizard_autogen/include/ui_mainwindow.h" line="2104"/>
        <source>min:</source>
        <translation>min:</translation>
    </message>
    <message>
        <location filename="../mainwindow.ui" line="190"/>
        <location filename="../build/Desktop-Debug/VBDriveWizard_autogen/include/ui_mainwindow.h" line="2105"/>
        <source>max</source>
        <translation>max</translation>
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
        <translation>Velocity</translation>
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
        <translation>Torque</translation>
    </message>
    <message>
        <location filename="../mainwindow.ui" line="286"/>
        <location filename="../build/Desktop-Debug/VBDriveWizard_autogen/include/ui_mainwindow.h" line="2111"/>
        <source>Voltage</source>
        <translation>Voltage</translation>
    </message>
    <message>
        <location filename="../mainwindow.ui" line="283"/>
        <location filename="../mainwindow.ui" line="296"/>
        <location filename="../build/Desktop-Debug/VBDriveWizard_autogen/include/ui_mainwindow.h" line="2109"/>
        <location filename="../build/Desktop-Debug/VBDriveWizard_autogen/include/ui_mainwindow.h" line="2113"/>
        <source>The firmware exposes no voltage limit register yet.</source>
        <translation>The firmware exposes no voltage limit register yet.</translation>
    </message>
    <message>
        <location filename="../mainwindow.ui" line="322"/>
        <location filename="../mainwindow.ui" line="1112"/>
        <location filename="../build/Desktop-Debug/VBDriveWizard_autogen/include/ui_mainwindow.h" line="2115"/>
        <location filename="../build/Desktop-Debug/VBDriveWizard_autogen/include/ui_mainwindow.h" line="2176"/>
        <source>Current</source>
        <translation>Current</translation>
    </message>
    <message>
        <location filename="../mainwindow.ui" line="352"/>
        <location filename="../build/Desktop-Debug/VBDriveWizard_autogen/include/ui_mainwindow.h" line="2116"/>
        <source>Direction</source>
        <translation>Direction</translation>
    </message>
    <message>
        <location filename="../mainwindow.ui" line="360"/>
        <location filename="../build/Desktop-Debug/VBDriveWizard_autogen/include/ui_mainwindow.h" line="2117"/>
        <source>CCW</source>
        <translation>CCW</translation>
    </message>
    <message>
        <location filename="../mainwindow.ui" line="365"/>
        <location filename="../build/Desktop-Debug/VBDriveWizard_autogen/include/ui_mainwindow.h" line="2118"/>
        <source>CW</source>
        <translation>CW</translation>
    </message>
    <message>
        <location filename="../mainwindow.ui" line="401"/>
        <location filename="../build/Desktop-Debug/VBDriveWizard_autogen/include/ui_mainwindow.h" line="2121"/>
        <source>Data Baud Rate</source>
        <translation>Data Baud Rate</translation>
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
        <translation>Nominal Baud Rate</translation>
    </message>
    <message>
        <location filename="../mainwindow.ui" line="520"/>
        <location filename="../build/Desktop-Debug/VBDriveWizard_autogen/include/ui_mainwindow.h" line="2152"/>
        <source>Advanced</source>
        <translation>Advanced</translation>
    </message>
    <message>
        <location filename="../mainwindow.ui" line="612"/>
        <location filename="../build/Desktop-Debug/VBDriveWizard_autogen/include/ui_mainwindow.h" line="2137"/>
        <source>Gear Ratio</source>
        <translation>Gear Ratio</translation>
    </message>
    <message>
        <location filename="../mainwindow.ui" line="743"/>
        <location filename="../mainwindow.ui" line="1117"/>
        <location filename="../build/Desktop-Debug/VBDriveWizard_autogen/include/ui_mainwindow.h" line="2145"/>
        <location filename="../build/Desktop-Debug/VBDriveWizard_autogen/include/ui_mainwindow.h" line="2177"/>
        <source>Encoder</source>
        <translation>Encoder</translation>
    </message>
    <message>
        <location filename="../mainwindow.ui" line="842"/>
        <location filename="../build/Desktop-Debug/VBDriveWizard_autogen/include/ui_mainwindow.h" line="2147"/>
        <source>Torque const</source>
        <translation>Torque const</translation>
    </message>
    <message>
        <location filename="../mainwindow.ui" line="863"/>
        <location filename="../build/Desktop-Debug/VBDriveWizard_autogen/include/ui_mainwindow.h" line="2150"/>
        <source>Current Kp</source>
        <translation>Current Kp</translation>
    </message>
    <message>
        <location filename="../mainwindow.ui" line="635"/>
        <location filename="../build/Desktop-Debug/VBDriveWizard_autogen/include/ui_mainwindow.h" line="2138"/>
        <source>Current Ki</source>
        <translation>Current Ki</translation>
    </message>
    <message>
        <location filename="../mainwindow.ui" line="856"/>
        <location filename="../build/Desktop-Debug/VBDriveWizard_autogen/include/ui_mainwindow.h" line="2149"/>
        <source>Position Offset</source>
        <translation>Position Offset</translation>
    </message>
    <message>
        <location filename="../mainwindow.ui" line="661"/>
        <location filename="../build/Desktop-Debug/VBDriveWizard_autogen/include/ui_mainwindow.h" line="2143"/>
        <source>Main Filter Param A</source>
        <translation>Main Filter Param A</translation>
    </message>
    <message>
        <location filename="../mainwindow.ui" line="832"/>
        <location filename="../build/Desktop-Debug/VBDriveWizard_autogen/include/ui_mainwindow.h" line="2146"/>
        <source>Filter Gain 1</source>
        <translation>Filter Gain 1</translation>
    </message>
    <message>
        <location filename="../mainwindow.ui" line="720"/>
        <location filename="../build/Desktop-Debug/VBDriveWizard_autogen/include/ui_mainwindow.h" line="2144"/>
        <source>Filter Gain 2</source>
        <translation>Filter Gain 2</translation>
    </message>
    <message>
        <location filename="../mainwindow.ui" line="849"/>
        <location filename="../build/Desktop-Debug/VBDriveWizard_autogen/include/ui_mainwindow.h" line="2148"/>
        <source>Filter Gain 3</source>
        <translation>Filter Gain 3</translation>
    </message>
    <message>
        <location filename="../mainwindow.ui" line="583"/>
        <location filename="../build/Desktop-Debug/VBDriveWizard_autogen/include/ui_mainwindow.h" line="2136"/>
        <source>Current LPF Gain</source>
        <translation>Current LPF Gain</translation>
    </message>
    <message>
        <location filename="../mainwindow.ui" line="643"/>
        <location filename="../build/Desktop-Debug/VBDriveWizard_autogen/include/ui_mainwindow.h" line="2139"/>
        <source>rotor</source>
        <translation>rotor</translation>
    </message>
    <message>
        <location filename="../mainwindow.ui" line="648"/>
        <location filename="../build/Desktop-Debug/VBDriveWizard_autogen/include/ui_mainwindow.h" line="2140"/>
        <source>shaft</source>
        <translation>shaft</translation>
    </message>
    <message>
        <location filename="../mainwindow.ui" line="653"/>
        <location filename="../build/Desktop-Debug/VBDriveWizard_autogen/include/ui_mainwindow.h" line="2141"/>
        <source>external</source>
        <translation>external</translation>
    </message>
    <message>
        <location filename="../mainwindow.ui" line="870"/>
        <location filename="../build/Desktop-Debug/VBDriveWizard_autogen/include/ui_mainwindow.h" line="2151"/>
        <source>Current Kd</source>
        <translation>Current Kd</translation>
    </message>
    <message>
        <location filename="../mainwindow.ui" line="878"/>
        <location filename="../build/Desktop-Debug/VBDriveWizard_autogen/include/ui_mainwindow.h" line="2166"/>
        <source>System</source>
        <translation>System</translation>
    </message>
    <message>
        <location filename="../mainwindow.ui" line="884"/>
        <location filename="../build/Desktop-Debug/VBDriveWizard_autogen/include/ui_mainwindow.h" line="2153"/>
        <source>Sensor</source>
        <translation>Sensor</translation>
    </message>
    <message>
        <location filename="../mainwindow.ui" line="890"/>
        <location filename="../build/Desktop-Debug/VBDriveWizard_autogen/include/ui_mainwindow.h" line="2154"/>
        <source>Calibrate</source>
        <translation>Calibrate</translation>
    </message>
    <message>
        <location filename="../mainwindow.ui" line="910"/>
        <location filename="../build/Desktop-Debug/VBDriveWizard_autogen/include/ui_mainwindow.h" line="2155"/>
        <source>Register Parameters</source>
        <translation>Register Parameters</translation>
    </message>
    <message>
        <location filename="../mainwindow.ui" line="916"/>
        <location filename="../build/Desktop-Debug/VBDriveWizard_autogen/include/ui_mainwindow.h" line="2156"/>
        <source>Save to File...</source>
        <translation>Save to File...</translation>
    </message>
    <message>
        <location filename="../mainwindow.ui" line="923"/>
        <location filename="../build/Desktop-Debug/VBDriveWizard_autogen/include/ui_mainwindow.h" line="2157"/>
        <source>Load from File...</source>
        <translation>Load from File...</translation>
    </message>
    <message>
        <location filename="../mainwindow.ui" line="930"/>
        <location filename="../build/Desktop-Debug/VBDriveWizard_autogen/include/ui_mainwindow.h" line="2158"/>
        <source>Restore to Default</source>
        <translation>Restore to Default</translation>
    </message>
    <message>
        <location filename="../mainwindow.ui" line="940"/>
        <location filename="../build/Desktop-Debug/VBDriveWizard_autogen/include/ui_mainwindow.h" line="2159"/>
        <source>Firmware</source>
        <translation>Firmware</translation>
    </message>
    <message>
        <location filename="../mainwindow.ui" line="948"/>
        <location filename="../build/Desktop-Debug/VBDriveWizard_autogen/include/ui_mainwindow.h" line="2160"/>
        <source>Current Version:</source>
        <translation>Current Version:</translation>
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
        <translation>Choose file</translation>
    </message>
    <message>
        <location filename="../mainwindow.ui" line="976"/>
        <location filename="../build/Desktop-Debug/VBDriveWizard_autogen/include/ui_mainwindow.h" line="2163"/>
        <source>Open</source>
        <translation>Open</translation>
    </message>
    <message>
        <location filename="../mainwindow.ui" line="985"/>
        <location filename="../build/Desktop-Debug/VBDriveWizard_autogen/include/ui_mainwindow.h" line="2164"/>
        <source>Download from remote repo</source>
        <translation>Download from remote repo</translation>
    </message>
    <message>
        <location filename="../mainwindow.ui" line="994"/>
        <location filename="../build/Desktop-Debug/VBDriveWizard_autogen/include/ui_mainwindow.h" line="2165"/>
        <source>Flash</source>
        <translation>Flash</translation>
    </message>
    <message>
        <location filename="../mainwindow.ui" line="1032"/>
        <location filename="../build/Desktop-Debug/VBDriveWizard_autogen/include/ui_mainwindow.h" line="2167"/>
        <source>Read</source>
        <translation>Read</translation>
    </message>
    <message>
        <location filename="../mainwindow.ui" line="1039"/>
        <location filename="../build/Desktop-Debug/VBDriveWizard_autogen/include/ui_mainwindow.h" line="2168"/>
        <source>Write</source>
        <translation>Write</translation>
    </message>
    <message>
        <location filename="../mainwindow.ui" line="1046"/>
        <location filename="../build/Desktop-Debug/VBDriveWizard_autogen/include/ui_mainwindow.h" line="2169"/>
        <source>Set Origin</source>
        <translation>Set Origin</translation>
    </message>
    <message>
        <source>&lt;html&gt;&lt;head/&gt;&lt;body&gt;&lt;p align=&quot;center&quot;&gt;Logo&lt;/p&gt;&lt;/body&gt;&lt;/html&gt;</source>
        <translation type="vanished">&lt;html&gt;&lt;head/&gt;&lt;body&gt;&lt;p align=&quot;center&quot;&gt;Logo&lt;/p&gt;&lt;/body&gt;&lt;/html&gt;</translation>
    </message>
    <message>
        <location filename="../mainwindow.ui" line="1070"/>
        <location filename="../build/Desktop-Debug/VBDriveWizard_autogen/include/ui_mainwindow.h" line="2170"/>
        <source>REALTIME DATA</source>
        <translation>REALTIME DATA</translation>
    </message>
    <message>
        <location filename="../mainwindow.ui" line="1084"/>
        <location filename="../build/Desktop-Debug/VBDriveWizard_autogen/include/ui_mainwindow.h" line="2171"/>
        <source>Signal:</source>
        <translation>Signal:</translation>
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
        <translation>Position</translation>
    </message>
    <message>
        <location filename="../mainwindow.ui" line="1107"/>
        <location filename="../build/Desktop-Debug/VBDriveWizard_autogen/include/ui_mainwindow.h" line="2175"/>
        <source>Temperature</source>
        <translation>Temperature</translation>
    </message>
    <message>
        <location filename="../mainwindow.ui" line="1122"/>
        <location filename="../build/Desktop-Debug/VBDriveWizard_autogen/include/ui_mainwindow.h" line="2178"/>
        <source>Log</source>
        <translation>Log</translation>
    </message>
    <message>
        <location filename="../mainwindow.ui" line="1130"/>
        <location filename="../build/Desktop-Debug/VBDriveWizard_autogen/include/ui_mainwindow.h" line="2180"/>
        <source>Units:</source>
        <translation>Units:</translation>
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
        <translation>Preferences</translation>
    </message>
    <message>
        <location filename="../mainwindow.ui" line="1171"/>
        <location filename="../build/Desktop-Debug/VBDriveWizard_autogen/include/ui_mainwindow.h" line="2185"/>
        <source>Language:</source>
        <translation>Language:</translation>
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
        <translation>Pause</translation>
    </message>
    <message>
        <location filename="../mainwindow.ui" line="1229"/>
        <location filename="../build/Desktop-Debug/VBDriveWizard_autogen/include/ui_mainwindow.h" line="2191"/>
        <source>Save as CSV...</source>
        <translation>Save as CSV...</translation>
    </message>
    <message>
        <location filename="../mainwindow.ui" line="1236"/>
        <location filename="../build/Desktop-Debug/VBDriveWizard_autogen/include/ui_mainwindow.h" line="2192"/>
        <source>Save as PNG...</source>
        <translation>Save as PNG...</translation>
    </message>
    <message>
        <location filename="../mainwindow.ui" line="1263"/>
        <location filename="../build/Desktop-Debug/VBDriveWizard_autogen/include/ui_mainwindow.h" line="2193"/>
        <source>CONTROL</source>
        <translation>CONTROL</translation>
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
        <translation>Control Type</translation>
    </message>
    <message>
        <location filename="../mainwindow.ui" line="1327"/>
        <location filename="../build/Desktop-Debug/VBDriveWizard_autogen/include/ui_mainwindow.h" line="2198"/>
        <source>Transient Form</source>
        <translation>Transient Form</translation>
    </message>
    <message>
        <location filename="../mainwindow.ui" line="1333"/>
        <location filename="../build/Desktop-Debug/VBDriveWizard_autogen/include/ui_mainwindow.h" line="2199"/>
        <source>Linear</source>
        <translation>Linear</translation>
    </message>
    <message>
        <location filename="../mainwindow.ui" line="1343"/>
        <location filename="../build/Desktop-Debug/VBDriveWizard_autogen/include/ui_mainwindow.h" line="2200"/>
        <source>Polynomial</source>
        <translation>Polynomial</translation>
    </message>
    <message>
        <location filename="../mainwindow.ui" line="1392"/>
        <location filename="../mainwindow.ui" line="1521"/>
        <location filename="../build/Desktop-Debug/VBDriveWizard_autogen/include/ui_mainwindow.h" line="2202"/>
        <location filename="../build/Desktop-Debug/VBDriveWizard_autogen/include/ui_mainwindow.h" line="2207"/>
        <source>Set</source>
        <translation>Set</translation>
    </message>
    <message>
        <location filename="../mainwindow.ui" line="1406"/>
        <location filename="../build/Desktop-Debug/VBDriveWizard_autogen/include/ui_mainwindow.h" line="2203"/>
        <source>Feedback Gains</source>
        <translation>Feedback Gains</translation>
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
        <translation>User</translation>
    </message>
    <message>
        <location filename="../mainwindow.ui" line="1545"/>
        <location filename="../mainwindow.cpp" line="1659"/>
        <location filename="../build/Desktop-Debug/VBDriveWizard_autogen/include/ui_mainwindow.h" line="2208"/>
        <source>Target pos:</source>
        <translation>Target pos:</translation>
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
        <translation>Start</translation>
    </message>
    <message>
        <location filename="../mainwindow.ui" line="1615"/>
        <location filename="../mainwindow.ui" line="1965"/>
        <location filename="../build/Desktop-Debug/VBDriveWizard_autogen/include/ui_mainwindow.h" line="2214"/>
        <location filename="../build/Desktop-Debug/VBDriveWizard_autogen/include/ui_mainwindow.h" line="2226"/>
        <source>Sin</source>
        <translation>Sin</translation>
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
        <translation>Amplitude</translation>
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
        <translation>Frequency</translation>
    </message>
    <message>
        <location filename="../mainwindow.ui" line="1723"/>
        <location filename="../mainwindow.ui" line="1972"/>
        <location filename="../build/Desktop-Debug/VBDriveWizard_autogen/include/ui_mainwindow.h" line="2218"/>
        <location filename="../build/Desktop-Debug/VBDriveWizard_autogen/include/ui_mainwindow.h" line="2227"/>
        <source>Meander</source>
        <translation>Meander</translation>
    </message>
    <message>
        <location filename="../mainwindow.ui" line="1831"/>
        <location filename="../mainwindow.ui" line="1979"/>
        <location filename="../build/Desktop-Debug/VBDriveWizard_autogen/include/ui_mainwindow.h" line="2222"/>
        <location filename="../build/Desktop-Debug/VBDriveWizard_autogen/include/ui_mainwindow.h" line="2228"/>
        <source>Triangle</source>
        <translation>Triangle</translation>
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
        <translation>Trajectory</translation>
    </message>
    <message>
        <location filename="../mainwindow.ui" line="1955"/>
        <location filename="../build/Desktop-Debug/VBDriveWizard_autogen/include/ui_mainwindow.h" line="2225"/>
        <source>Step</source>
        <translation>Step</translation>
    </message>
    <message>
        <location filename="../mainwindow.ui" line="1989"/>
        <location filename="../build/Desktop-Debug/VBDriveWizard_autogen/include/ui_mainwindow.h" line="2229"/>
        <source>Step Targets</source>
        <translation>Step Targets</translation>
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
        <translation>Trajectory Targets</translation>
    </message>
    <message>
        <location filename="../mainwindow.ui" line="2298"/>
        <location filename="../build/Desktop-Debug/VBDriveWizard_autogen/include/ui_mainwindow.h" line="2243"/>
        <source>+derivative</source>
        <translation>+derivative</translation>
    </message>
    <message>
        <location filename="../mainwindow.ui" line="2355"/>
        <location filename="../build/Desktop-Debug/VBDriveWizard_autogen/include/ui_mainwindow.h" line="2246"/>
        <source>STATUS</source>
        <translation>STATUS</translation>
    </message>
    <message>
        <location filename="../mainwindow.ui" line="2361"/>
        <location filename="../build/Desktop-Debug/VBDriveWizard_autogen/include/ui_mainwindow.h" line="2247"/>
        <source>Model</source>
        <translation>Model</translation>
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
        <translation>Temperature MCU</translation>
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
        <translation>Temperature Stator</translation>
    </message>
    <message>
        <location filename="../mainwindow.ui" line="2424"/>
        <location filename="../build/Desktop-Debug/VBDriveWizard_autogen/include/ui_mainwindow.h" line="2256"/>
        <source>Bus Voltage</source>
        <translation>Bus Voltage</translation>
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
        <translation>Motor Encoder</translation>
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
        <translation>Shaft Encoder</translation>
    </message>
    <message>
        <location filename="../mainwindow.ui" line="2508"/>
        <location filename="../build/Desktop-Debug/VBDriveWizard_autogen/include/ui_mainwindow.h" line="2268"/>
        <source>Fault</source>
        <translation>Fault</translation>
    </message>
    <message>
        <location filename="../mainwindow.ui" line="2550"/>
        <location filename="../build/Desktop-Debug/VBDriveWizard_autogen/include/ui_mainwindow.h" line="2272"/>
        <source>STOP</source>
        <translation>STOP</translation>
    </message>
    <message>
        <location filename="../mainwindow.cpp" line="164"/>
        <location filename="../mainwindow.cpp" line="177"/>
        <location filename="../mainwindow.cpp" line="797"/>
        <location filename="../mainwindow.cpp" line="824"/>
        <source>Connection failed</source>
        <translation>Connection failed</translation>
    </message>
    <message>
        <location filename="../mainwindow.cpp" line="199"/>
        <source>Firmware download failed</source>
        <translation>Firmware download failed</translation>
    </message>
    <message>
        <location filename="../mainwindow.cpp" line="203"/>
        <source>Downloaded firmware %1.</source>
        <translation>Downloaded firmware %1.</translation>
    </message>
    <message>
        <location filename="../mainwindow.cpp" line="227"/>
        <source>Flashing failed</source>
        <translation>Flashing failed</translation>
    </message>
    <message>
        <location filename="../mainwindow.cpp" line="341"/>
        <location filename="../mainwindow.cpp" line="343"/>
        <location filename="../mainwindow.cpp" line="903"/>
        <location filename="../mainwindow.cpp" line="904"/>
        <source>Disconnect</source>
        <translation>Disconnect</translation>
    </message>
    <message>
        <location filename="../mainwindow.cpp" line="345"/>
        <location filename="../mainwindow.cpp" line="2042"/>
        <source>Resume</source>
        <translation>Resume</translation>
    </message>
    <message>
        <location filename="../mainwindow.cpp" line="349"/>
        <location filename="../mainwindow.cpp" line="872"/>
        <source>Not connected</source>
        <translation>Not connected</translation>
    </message>
    <message>
        <location filename="../mainwindow.cpp" line="366"/>
        <location filename="../mainwindow.cpp" line="1009"/>
        <source>Unsaved changes</source>
        <translation>Unsaved changes</translation>
    </message>
    <message>
        <location filename="../mainwindow.cpp" line="367"/>
        <source>Some register changes have not been written to the drive.
Close anyway?</source>
        <translation>Some register changes have not been written to the drive.
Close anyway?</translation>
    </message>
    <message>
        <location filename="../mainwindow.cpp" line="396"/>
        <location filename="../mainwindow.cpp" line="790"/>
        <source>Disconnecting...</source>
        <translation type="unfinished"></translation>
    </message>
    <message>
        <location filename="../mainwindow.cpp" line="732"/>
        <source>%1 (unavailable)</source>
        <translation>%1 (unavailable)</translation>
    </message>
    <message>
        <location filename="../mainwindow.cpp" line="797"/>
        <source>No serial port selected.</source>
        <translation>No serial port selected.</translation>
    </message>
    <message>
        <location filename="../mainwindow.cpp" line="802"/>
        <source>Opening %1...</source>
        <translation>Opening %1...</translation>
    </message>
    <message>
        <location filename="../mainwindow.cpp" line="830"/>
        <source>Listening for drives on %1...</source>
        <translation>Listening for drives on %1...</translation>
    </message>
    <message>
        <location filename="../mainwindow.cpp" line="859"/>
        <source>Serial connected</source>
        <translation>Serial connected</translation>
    </message>
    <message>
        <location filename="../mainwindow.cpp" line="860"/>
        <source>CAN connected</source>
        <translation>CAN connected</translation>
    </message>
    <message>
        <location filename="../mainwindow.cpp" line="873"/>
        <source>Disconnected.</source>
        <translation>Disconnected.</translation>
    </message>
    <message>
        <location filename="../mainwindow.cpp" line="944"/>
        <source>Sort by model</source>
        <translation>Sort by model</translation>
    </message>
    <message>
        <location filename="../mainwindow.cpp" line="945"/>
        <source>Sort by Node ID</source>
        <translation>Sort by Node ID</translation>
    </message>
    <message>
        <location filename="../mainwindow.cpp" line="972"/>
        <source>  (no heartbeat)</source>
        <translation>  (no heartbeat)</translation>
    </message>
    <message>
        <location filename="../mainwindow.cpp" line="1010"/>
        <source>Drive %1 has register changes that were not written.
Write them before switching?</source>
        <translation>Drive %1 has register changes that were not written.
Write them before switching?</translation>
    </message>
    <message>
        <location filename="../mainwindow.cpp" line="1082"/>
        <source>Reading registers...</source>
        <translation>Reading registers...</translation>
    </message>
    <message>
        <location filename="../mainwindow.cpp" line="1097"/>
        <source>No changes to write.</source>
        <translation>No changes to write.</translation>
    </message>
    <message numerus="yes">
        <location filename="../mainwindow.cpp" line="1108"/>
        <source>Writing %n register(s), the drive restarts to apply them...</source>
        <translation>
            <numerusform>Writing %n register(s), the drive restarts to apply them...</numerusform>
            <numerusform></numerusform>
        </translation>
    </message>
    <message numerus="yes">
        <location filename="../mainwindow.cpp" line="1113"/>
        <source>Writing %n register(s)...</source>
        <translation>
            <numerusform>Writing %n register(s)...</numerusform>
            <numerusform></numerusform>
        </translation>
    </message>
    <message>
        <location filename="../mainwindow.cpp" line="1138"/>
        <source>Origin set; angle offset is now %1.</source>
        <translation>Origin set; angle offset is now %1.</translation>
    </message>
    <message>
        <location filename="../mainwindow.cpp" line="1148"/>
        <source>Calibrate sensor</source>
        <translation>Calibrate sensor</translation>
    </message>
    <message>
        <location filename="../mainwindow.cpp" line="1149"/>
        <source>Calibration moves the motor and cannot be cancelled. The drive stops answering until it finishes.

Start calibration?</source>
        <translation>Calibration moves the motor and cannot be cancelled. The drive stops answering until it finishes.

Start calibration?</translation>
    </message>
    <message>
        <location filename="../mainwindow.cpp" line="1158"/>
        <source>Calibration started; the drive will not answer until it is done.</source>
        <translation>Calibration started; the drive will not answer until it is done.</translation>
    </message>
    <message>
        <location filename="../mainwindow.cpp" line="1180"/>
        <source>Save register profile</source>
        <translation>Save register profile</translation>
    </message>
    <message>
        <location filename="../mainwindow.cpp" line="1183"/>
        <location filename="../mainwindow.cpp" line="1206"/>
        <source>YAML files (*.yaml *.yml)</source>
        <translation>YAML files (*.yaml *.yml)</translation>
    </message>
    <message>
        <location filename="../mainwindow.cpp" line="1197"/>
        <source>Could not save the profile</source>
        <translation>Could not save the profile</translation>
    </message>
    <message>
        <location filename="../mainwindow.cpp" line="1199"/>
        <source>Profile saved to %1.</source>
        <translation>Profile saved to %1.</translation>
    </message>
    <message>
        <location filename="../mainwindow.cpp" line="1205"/>
        <source>Load register profile</source>
        <translation>Load register profile</translation>
    </message>
    <message>
        <location filename="../mainwindow.cpp" line="1214"/>
        <source>Could not load the profile</source>
        <translation>Could not load the profile</translation>
    </message>
    <message numerus="yes">
        <location filename="../mainwindow.cpp" line="1219"/>
        <source>Loaded %n register(s) from the profile.</source>
        <translation>
            <numerusform>Loaded %n register(s) from the profile.</numerusform>
            <numerusform></numerusform>
        </translation>
    </message>
    <message>
        <location filename="../mainwindow.cpp" line="1221"/>
        <source>Loaded with warnings: %1</source>
        <translation>Loaded with warnings: %1</translation>
    </message>
    <message>
        <location filename="../mainwindow.cpp" line="1237"/>
        <source>Could not load the default profile</source>
        <translation>Could not load the default profile</translation>
    </message>
    <message>
        <location filename="../mainwindow.cpp" line="1241"/>
        <source>Default values for %1 loaded into the editors.</source>
        <translation>Default values for %1 loaded into the editors.</translation>
    </message>
    <message>
        <location filename="../mainwindow.cpp" line="1269"/>
        <source>Could not read &apos;%1&apos;: %2</source>
        <translation>Could not read &apos;%1&apos;: %2</translation>
    </message>
    <message>
        <location filename="../mainwindow.cpp" line="1316"/>
        <source>Could not write &apos;%1&apos;: %2</source>
        <translation>Could not write &apos;%1&apos;: %2</translation>
    </message>
    <message>
        <location filename="../mainwindow.cpp" line="1326"/>
        <source>Registers written.</source>
        <translation>Registers written.</translation>
    </message>
    <message>
        <location filename="../mainwindow.cpp" line="1334"/>
        <source>Some registers were not written</source>
        <translation>Some registers were not written</translation>
    </message>
    <message>
        <location filename="../mainwindow.cpp" line="1382"/>
        <source>Drive lost</source>
        <translation>Drive lost</translation>
    </message>
    <message>
        <location filename="../mainwindow.cpp" line="1383"/>
        <source>Drive %1 (node %2) stopped sending heartbeats.</source>
        <translation>Drive %1 (node %2) stopped sending heartbeats.</translation>
    </message>
    <message>
        <location filename="../mainwindow.cpp" line="1386"/>
        <source>Wait for it to come back, keeping your unsaved register changes, or drop it and discard them?</source>
        <translation>Wait for it to come back, keeping your unsaved register changes, or drop it and discard them?</translation>
    </message>
    <message>
        <location filename="../mainwindow.cpp" line="1388"/>
        <source>Reconnect</source>
        <translation>Reconnect</translation>
    </message>
    <message>
        <location filename="../mainwindow.cpp" line="1389"/>
        <source>Remove drive</source>
        <translation>Remove drive</translation>
    </message>
    <message>
        <location filename="../mainwindow.cpp" line="1401"/>
        <source>Waiting for node %1 to return...</source>
        <translation>Waiting for node %1 to return...</translation>
    </message>
    <message>
        <location filename="../mainwindow.cpp" line="1423"/>
        <source>The drive restarted with the new settings.</source>
        <translation>The drive restarted with the new settings.</translation>
    </message>
    <message>
        <location filename="../mainwindow.cpp" line="1436"/>
        <source>Node %1 is back.</source>
        <translation>Node %1 is back.</translation>
    </message>
    <message>
        <location filename="../mainwindow.cpp" line="1521"/>
        <source>Yes</source>
        <translation>Yes</translation>
    </message>
    <message>
        <location filename="../mainwindow.cpp" line="1521"/>
        <source>No</source>
        <translation>No</translation>
    </message>
    <message>
        <location filename="../mainwindow.cpp" line="1655"/>
        <source>Target vel:</source>
        <translation>Target vel:</translation>
    </message>
    <message>
        <location filename="../mainwindow.cpp" line="1657"/>
        <source>Target torq:</source>
        <translation>Target torq:</translation>
    </message>
    <message>
        <location filename="../mainwindow.cpp" line="1846"/>
        <source>Serial cannot sustain %1 Hz; running at %2 Hz instead.</source>
        <translation>Serial cannot sustain %1 Hz; running at %2 Hz instead.</translation>
    </message>
    <message>
        <location filename="../mainwindow.cpp" line="1907"/>
        <source>Feedback gains written.</source>
        <translation>Feedback gains written.</translation>
    </message>
    <message>
        <location filename="../mainwindow.cpp" line="1926"/>
        <source>Transient form written.</source>
        <translation>Transient form written.</translation>
    </message>
    <message>
        <location filename="../mainwindow.cpp" line="1939"/>
        <source>Emergency stop: all drives disabled.</source>
        <translation>Emergency stop: all drives disabled.</translation>
    </message>
    <message>
        <location filename="../mainwindow.cpp" line="1959"/>
        <source>Stop</source>
        <translation>Stop</translation>
    </message>
    <message>
        <location filename="../mainwindow.cpp" line="2047"/>
        <source>Save plot data</source>
        <translation>Save plot data</translation>
    </message>
    <message>
        <location filename="../mainwindow.cpp" line="2048"/>
        <source>CSV files (*.csv)</source>
        <translation>CSV files (*.csv)</translation>
    </message>
    <message>
        <location filename="../mainwindow.cpp" line="2053"/>
        <source>Could not save the CSV</source>
        <translation>Could not save the CSV</translation>
    </message>
    <message>
        <location filename="../mainwindow.cpp" line="2055"/>
        <source>Plot data saved.</source>
        <translation>Plot data saved.</translation>
    </message>
    <message>
        <location filename="../mainwindow.cpp" line="2060"/>
        <source>Save plot image</source>
        <translation>Save plot image</translation>
    </message>
    <message>
        <location filename="../mainwindow.cpp" line="2061"/>
        <source>PNG images (*.png)</source>
        <translation>PNG images (*.png)</translation>
    </message>
    <message>
        <location filename="../mainwindow.cpp" line="2066"/>
        <source>Could not save the image</source>
        <translation>Could not save the image</translation>
    </message>
    <message>
        <location filename="../mainwindow.cpp" line="2068"/>
        <source>Plot image saved.</source>
        <translation>Plot image saved.</translation>
    </message>
    <message>
        <location filename="../mainwindow.cpp" line="2087"/>
        <source>Select firmware image</source>
        <translation>Select firmware image</translation>
    </message>
    <message>
        <location filename="../mainwindow.cpp" line="2088"/>
        <source>Intel HEX files (*.hex)</source>
        <translation>Intel HEX files (*.hex)</translation>
    </message>
    <message>
        <location filename="../mainwindow.cpp" line="2092"/>
        <source>Selected %1.</source>
        <translation>Selected %1.</translation>
    </message>
    <message>
        <location filename="../mainwindow.cpp" line="2104"/>
        <source>No firmware selected</source>
        <translation>No firmware selected</translation>
    </message>
    <message>
        <location filename="../mainwindow.cpp" line="2105"/>
        <source>Choose a .hex file first, or switch to downloading the latest release.</source>
        <translation>Choose a .hex file first, or switch to downloading the latest release.</translation>
    </message>
    <message>
        <location filename="../mainwindow.cpp" line="2121"/>
        <source>Flashing %1...</source>
        <translation>Flashing %1...</translation>
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
        <location filename="../transport/serial_service.cpp" line="94"/>
        <source>Serial service is shutting down.</source>
        <translation>Serial service is shutting down.</translation>
    </message>
    <message>
        <location filename="../transport/serial_service.cpp" line="123"/>
        <source>Reconnecting.</source>
        <translation>Reconnecting.</translation>
    </message>
    <message>
        <location filename="../transport/serial_service.cpp" line="135"/>
        <location filename="../transport/serial_service.cpp" line="139"/>
        <location filename="../transport/serial_service.cpp" line="153"/>
        <location filename="../transport/serial_service.cpp" line="169"/>
        <location filename="../transport/serial_service.cpp" line="480"/>
        <source>Disconnected.</source>
        <translation>Disconnected.</translation>
    </message>
    <message>
        <location filename="../transport/serial_service.cpp" line="201"/>
        <location filename="../transport/serial_service.cpp" line="227"/>
        <location filename="../transport/serial_service.cpp" line="658"/>
        <source>Serial port is not open.</source>
        <translation>Serial port is not open.</translation>
    </message>
    <message>
        <location filename="../transport/serial_service.cpp" line="201"/>
        <location filename="../transport/serial_service.cpp" line="658"/>
        <source>Disconnecting.</source>
        <translation type="unfinished"></translation>
    </message>
    <message>
        <location filename="../transport/serial_service.cpp" line="282"/>
        <source>Command &apos;%1&apos; failed: %2</source>
        <translation>Command &apos;%1&apos; failed: %2</translation>
    </message>
    <message>
        <location filename="../transport/serial_service.cpp" line="294"/>
        <source>The drive did not answer after restarting: %1</source>
        <translation>The drive did not answer after restarting: %1</translation>
    </message>
    <message>
        <location filename="../transport/serial_service.cpp" line="318"/>
        <source>Drive detected on %1.</source>
        <translation>Drive detected on %1.</translation>
    </message>
    <message>
        <location filename="../transport/serial_service.cpp" line="319"/>
        <source>No drive answered on %1: %2</source>
        <translation>No drive answered on %1: %2</translation>
    </message>
    <message>
        <location filename="../transport/serial_service.cpp" line="327"/>
        <source>Could not enter CONFIG mode: %1</source>
        <translation type="unfinished"></translation>
    </message>
    <message>
        <location filename="../transport/serial_service.cpp" line="376"/>
        <source>These registers were rejected by the drive: %1</source>
        <translation>These registers were rejected by the drive: %1</translation>
    </message>
    <message>
        <location filename="../transport/serial_service.cpp" line="480"/>
        <source>Serial connection lost.</source>
        <translation>Serial connection lost.</translation>
    </message>
    <message>
        <location filename="../transport/serial_service.cpp" line="505"/>
        <source>The drive did not come back after restarting.</source>
        <translation>The drive did not come back after restarting.</translation>
    </message>
    <message>
        <location filename="../transport/serial_service.cpp" line="562"/>
        <source>The drive did not answer in time.</source>
        <translation>The drive did not answer in time.</translation>
    </message>
    <message>
        <location filename="../transport/serial_service.cpp" line="626"/>
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
