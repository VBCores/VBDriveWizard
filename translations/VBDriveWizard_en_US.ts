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
        <location filename="../ui/config_manager.cpp" line="283"/>
        <location filename="../ui/config_manager.cpp" line="334"/>
        <source>Cannot write %1: %2</source>
        <translation>Cannot write %1: %2</translation>
    </message>
    <message>
        <location filename="../ui/config_manager.cpp" line="345"/>
        <source>Settings loaded.</source>
        <translation>Settings loaded.</translation>
    </message>
    <message>
        <location filename="../ui/config_manager.cpp" line="347"/>
        <source>No settings file found; defaults are in use.</source>
        <translation>No settings file found; defaults are in use.</translation>
    </message>
    <message>
        <location filename="../ui/config_manager.cpp" line="350"/>
        <source>Settings file could not be read; defaults are in use.</source>
        <translation>Settings file could not be read; defaults are in use.</translation>
    </message>
</context>
<context>
    <name>CyphalBridge</name>
    <message>
        <location filename="../transport/cyphal_worker.cpp" line="151"/>
        <source>The Cyphal stack reported an internal error.</source>
        <translation>The Cyphal stack reported an internal error.</translation>
    </message>
    <message>
        <location filename="../transport/cyphal_worker.cpp" line="169"/>
        <source>Could not open CAN interface %1.</source>
        <translation>Could not open CAN interface %1.</translation>
    </message>
</context>
<context>
    <name>CyphalService</name>
    <message>
        <location filename="../transport/cyphal_service.cpp" line="75"/>
        <source>The CAN connection was closed.</source>
        <translation>The CAN connection was closed.</translation>
    </message>
    <message>
        <location filename="../transport/cyphal_service.cpp" line="143"/>
        <source>No VBDrive answered on %1 within %2 seconds.</source>
        <translation>No VBDrive answered on %1 within %2 seconds.</translation>
    </message>
    <message numerus="yes">
        <location filename="../transport/cyphal_service.cpp" line="149"/>
        <source>Found %n actuator(s) on %1.</source>
        <translation>
            <numerusform>Found %n actuator(s) on %1.</numerusform>
            <numerusform></numerusform>
        </translation>
    </message>
    <message>
        <location filename="../transport/cyphal_service.cpp" line="173"/>
        <source>The actuator stopped answering.</source>
        <translation>The actuator stopped answering.</translation>
    </message>
    <message>
        <location filename="../transport/cyphal_service.cpp" line="180"/>
        <source>The actuator did not answer register &apos;%1&apos; in time.</source>
        <translation>The actuator did not answer register &apos;%1&apos; in time.</translation>
    </message>
    <message>
        <location filename="../transport/cyphal_service.cpp" line="208"/>
        <source>Could not send the request.</source>
        <translation>Could not send the request.</translation>
    </message>
    <message>
        <location filename="../transport/cyphal_service.cpp" line="231"/>
        <source>The actuator did not accept the value.</source>
        <translation>The actuator did not accept the value.</translation>
    </message>
    <message>
        <location filename="../transport/cyphal_service.cpp" line="232"/>
        <source>Register &apos;%1&apos; is read-only.</source>
        <translation>Register &apos;%1&apos; is read-only.</translation>
    </message>
    <message>
        <location filename="../transport/cyphal_service.cpp" line="243"/>
        <source>Register &apos;%1&apos; is not available on this actuator.</source>
        <translation>Register &apos;%1&apos; is not available on this actuator.</translation>
    </message>
    <message>
        <location filename="../transport/cyphal_service.cpp" line="285"/>
        <source>These registers were rejected by the actuator: %1</source>
        <translation>These registers were rejected by the actuator: %1</translation>
    </message>
</context>
<context>
    <name>DeviceModel</name>
    <message>
        <location filename="../core/device_model.cpp" line="14"/>
        <source>Unknown actuator</source>
        <translation>Unknown actuator</translation>
    </message>
</context>
<context>
    <name>FirmwareDownloader</name>
    <message>
        <location filename="../firmware/firmware_downloader.cpp" line="178"/>
        <source>A firmware download is already running.</source>
        <translation>A firmware download is already running.</translation>
    </message>
    <message>
        <source>Looking up the latest release...</source>
        <translation type="vanished">Looking up the latest release...</translation>
    </message>
    <message>
        <location filename="../firmware/firmware_downloader.cpp" line="41"/>
        <source>no answer within %1 s</source>
        <translation type="unfinished"></translation>
    </message>
    <message>
        <location filename="../firmware/firmware_downloader.cpp" line="113"/>
        <location filename="../firmware/firmware_downloader.cpp" line="145"/>
        <source>Could not reach the VBDrive releases: %1</source>
        <translation>Could not reach the VBDrive releases: %1</translation>
    </message>
    <message>
        <location filename="../firmware/firmware_downloader.cpp" line="120"/>
        <source>The VBDrive releases did not name a latest version.</source>
        <translation type="unfinished"></translation>
    </message>
    <message>
        <location filename="../firmware/firmware_downloader.cpp" line="151"/>
        <source>The VBDrive releases answered with something other than a list.</source>
        <translation type="unfinished"></translation>
    </message>
    <message>
        <location filename="../firmware/firmware_downloader.cpp" line="182"/>
        <source>Release %1 does not contain %2.</source>
        <translation>Release %1 does not contain %2.</translation>
    </message>
    <message>
        <location filename="../firmware/firmware_downloader.cpp" line="183"/>
        <source>(unknown)</source>
        <translation>(unknown)</translation>
    </message>
    <message>
        <location filename="../firmware/firmware_downloader.cpp" line="192"/>
        <source>Downloading %1...</source>
        <translation>Downloading %1...</translation>
    </message>
    <message>
        <location filename="../firmware/firmware_downloader.cpp" line="203"/>
        <source>Downloading %1: %2 of %3 (%4%)</source>
        <translation>Downloading %1: %2 of %3 (%4%)</translation>
    </message>
    <message>
        <location filename="../firmware/firmware_downloader.cpp" line="209"/>
        <source>Downloading %1: %2 received</source>
        <translation>Downloading %1: %2 received</translation>
    </message>
    <message>
        <location filename="../firmware/firmware_downloader.cpp" line="225"/>
        <source>Firmware download failed: %1</source>
        <translation>Firmware download failed: %1</translation>
    </message>
    <message>
        <location filename="../firmware/firmware_downloader.cpp" line="236"/>
        <location filename="../firmware/firmware_downloader.cpp" line="241"/>
        <source>Could not write %1: %2</source>
        <translation>Could not write %1: %2</translation>
    </message>
    <message>
        <location filename="../firmware/firmware_downloader.cpp" line="245"/>
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
        <translation>CONNECTION</translation>
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
        <translation>Connect</translation>
    </message>
    <message>
        <location filename="../mainwindow.ui" line="222"/>
        <location filename="../mainwindow.ui" line="293"/>
        <location filename="../build/Desktop-Debug/VBDriveWizard_autogen/include/ui_mainwindow.h" line="2877"/>
        <location filename="../build/Desktop-Debug/VBDriveWizard_autogen/include/ui_mainwindow.h" line="2882"/>
        <source>Refresh</source>
        <translation>Refresh</translation>
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
        <translation>DEVICES</translation>
    </message>
    <message>
        <location filename="../mainwindow.ui" line="422"/>
        <location filename="../build/Desktop-Debug/VBDriveWizard_autogen/include/ui_mainwindow.h" line="2890"/>
        <source>CONFIGURATION</source>
        <translation>CONFIGURATION</translation>
    </message>
    <message>
        <location filename="../mainwindow.ui" line="447"/>
        <location filename="../build/Desktop-Debug/VBDriveWizard_autogen/include/ui_mainwindow.h" line="2909"/>
        <source>Basic</source>
        <translation>Basic</translation>
    </message>
    <message>
        <location filename="../mainwindow.ui" line="468"/>
        <location filename="../build/Desktop-Debug/VBDriveWizard_autogen/include/ui_mainwindow.h" line="2891"/>
        <source>Limits</source>
        <translation>Limits</translation>
    </message>
    <message>
        <location filename="../mainwindow.ui" line="621"/>
        <location filename="../mainwindow.ui" line="4469"/>
        <location filename="../build/Desktop-Debug/VBDriveWizard_autogen/include/ui_mainwindow.h" line="2904"/>
        <location filename="../build/Desktop-Debug/VBDriveWizard_autogen/include/ui_mainwindow.h" line="3066"/>
        <source>Angle</source>
        <translation>Angle</translation>
    </message>
    <message>
        <location filename="../mainwindow.ui" line="555"/>
        <location filename="../build/Desktop-Debug/VBDriveWizard_autogen/include/ui_mainwindow.h" line="2897"/>
        <source>min:</source>
        <translation>min:</translation>
    </message>
    <message>
        <location filename="../mainwindow.ui" line="600"/>
        <location filename="../build/Desktop-Debug/VBDriveWizard_autogen/include/ui_mainwindow.h" line="2901"/>
        <source>max</source>
        <translation>max</translation>
    </message>
    <message>
        <location filename="../mainwindow.ui" line="607"/>
        <location filename="../mainwindow.ui" line="4007"/>
        <location filename="../mainwindow.ui" line="4203"/>
        <location filename="../build/Desktop-Debug/VBDriveWizard_autogen/include/ui_mainwindow.h" line="2902"/>
        <location filename="../build/Desktop-Debug/VBDriveWizard_autogen/include/ui_mainwindow.h" line="3048"/>
        <location filename="../build/Desktop-Debug/VBDriveWizard_autogen/include/ui_mainwindow.h" line="3054"/>
        <source>Velocity</source>
        <translation>Velocity</translation>
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
        <translation>Torque</translation>
    </message>
    <message>
        <location filename="../mainwindow.ui" line="650"/>
        <location filename="../build/Desktop-Debug/VBDriveWizard_autogen/include/ui_mainwindow.h" line="2908"/>
        <source>Voltage</source>
        <translation>Voltage</translation>
    </message>
    <message>
        <location filename="../mainwindow.ui" line="581"/>
        <location filename="../mainwindow.ui" line="647"/>
        <location filename="../build/Desktop-Debug/VBDriveWizard_autogen/include/ui_mainwindow.h" line="2899"/>
        <location filename="../build/Desktop-Debug/VBDriveWizard_autogen/include/ui_mainwindow.h" line="2906"/>
        <source>The firmware exposes no voltage limit register yet.</source>
        <translation>The firmware exposes no voltage limit register yet.</translation>
    </message>
    <message>
        <location filename="../mainwindow.ui" line="548"/>
        <location filename="../build/Desktop-Debug/VBDriveWizard_autogen/include/ui_mainwindow.h" line="2896"/>
        <source>Current</source>
        <translation>Current</translation>
    </message>
    <message>
        <location filename="../mainwindow.ui" line="541"/>
        <location filename="../build/Desktop-Debug/VBDriveWizard_autogen/include/ui_mainwindow.h" line="2895"/>
        <source>Direction</source>
        <translation>Direction</translation>
    </message>
    <message>
        <location filename="../mainwindow.ui" line="406"/>
        <location filename="../mainwindow.ui" line="978"/>
        <location filename="../build/Desktop-Debug/VBDriveWizard_autogen/include/ui_mainwindow.h" line="2889"/>
        <location filename="../build/Desktop-Debug/VBDriveWizard_autogen/include/ui_mainwindow.h" line="2932"/>
        <source>Name</source>
        <translation type="unfinished"></translation>
    </message>
    <message>
        <location filename="../mainwindow.ui" line="411"/>
        <location filename="../build/Desktop-Debug/VBDriveWizard_autogen/include/ui_mainwindow.h" line="2888"/>
        <source>CAN ID</source>
        <translation type="unfinished"></translation>
    </message>
    <message>
        <location filename="../mainwindow.ui" line="512"/>
        <location filename="../build/Desktop-Debug/VBDriveWizard_autogen/include/ui_mainwindow.h" line="2892"/>
        <source>CCW</source>
        <translation>CCW</translation>
    </message>
    <message>
        <location filename="../mainwindow.ui" line="517"/>
        <location filename="../build/Desktop-Debug/VBDriveWizard_autogen/include/ui_mainwindow.h" line="2893"/>
        <source>CW</source>
        <translation>CW</translation>
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
        <translation>Advanced</translation>
    </message>
    <message>
        <location filename="../mainwindow.ui" line="926"/>
        <location filename="../build/Desktop-Debug/VBDriveWizard_autogen/include/ui_mainwindow.h" line="2925"/>
        <source>Gear Ratio</source>
        <translation>Gear Ratio</translation>
    </message>
    <message>
        <location filename="../mainwindow.ui" line="1001"/>
        <location filename="../build/Desktop-Debug/VBDriveWizard_autogen/include/ui_mainwindow.h" line="2933"/>
        <source>Encoder</source>
        <translation>Encoder</translation>
    </message>
    <message>
        <location filename="../mainwindow.ui" line="1190"/>
        <location filename="../build/Desktop-Debug/VBDriveWizard_autogen/include/ui_mainwindow.h" line="2941"/>
        <source>Torque const</source>
        <translation>Torque const</translation>
    </message>
    <message>
        <location filename="../mainwindow.ui" line="1173"/>
        <location filename="../build/Desktop-Debug/VBDriveWizard_autogen/include/ui_mainwindow.h" line="2939"/>
        <source>Current Kp</source>
        <translation>Current Kp</translation>
    </message>
    <message>
        <location filename="../mainwindow.ui" line="1166"/>
        <location filename="../build/Desktop-Debug/VBDriveWizard_autogen/include/ui_mainwindow.h" line="2938"/>
        <source>Current Ki</source>
        <translation>Current Ki</translation>
    </message>
    <message>
        <location filename="../mainwindow.ui" line="1072"/>
        <location filename="../build/Desktop-Debug/VBDriveWizard_autogen/include/ui_mainwindow.h" line="2934"/>
        <source>Position Offset</source>
        <translation>Position Offset</translation>
    </message>
    <message>
        <location filename="../mainwindow.ui" line="1085"/>
        <location filename="../build/Desktop-Debug/VBDriveWizard_autogen/include/ui_mainwindow.h" line="2935"/>
        <source>Main Filt Prm A</source>
        <translation>Main Filt Prm A</translation>
    </message>
    <message>
        <location filename="../mainwindow.ui" line="1180"/>
        <location filename="../build/Desktop-Debug/VBDriveWizard_autogen/include/ui_mainwindow.h" line="2940"/>
        <source>Filter Gain 1</source>
        <translation>Filter Gain 1</translation>
    </message>
    <message>
        <location filename="../mainwindow.ui" line="1143"/>
        <location filename="../build/Desktop-Debug/VBDriveWizard_autogen/include/ui_mainwindow.h" line="2937"/>
        <source>Filter Gain 2</source>
        <translation>Filter Gain 2</translation>
    </message>
    <message>
        <location filename="../mainwindow.ui" line="949"/>
        <location filename="../build/Desktop-Debug/VBDriveWizard_autogen/include/ui_mainwindow.h" line="2927"/>
        <source>Filter Gain 3</source>
        <translation>Filter Gain 3</translation>
    </message>
    <message>
        <location filename="../mainwindow.ui" line="1111"/>
        <location filename="../build/Desktop-Debug/VBDriveWizard_autogen/include/ui_mainwindow.h" line="2936"/>
        <source>Current LPF Gain</source>
        <translation>Current LPF Gain</translation>
    </message>
    <message>
        <location filename="../mainwindow.ui" line="960"/>
        <location filename="../build/Desktop-Debug/VBDriveWizard_autogen/include/ui_mainwindow.h" line="2928"/>
        <source>rotor</source>
        <translation>rotor</translation>
    </message>
    <message>
        <location filename="../mainwindow.ui" line="965"/>
        <location filename="../build/Desktop-Debug/VBDriveWizard_autogen/include/ui_mainwindow.h" line="2929"/>
        <source>shaft</source>
        <translation>shaft</translation>
    </message>
    <message>
        <location filename="../mainwindow.ui" line="970"/>
        <location filename="../build/Desktop-Debug/VBDriveWizard_autogen/include/ui_mainwindow.h" line="2930"/>
        <source>external</source>
        <translation>external</translation>
    </message>
    <message>
        <location filename="../mainwindow.ui" line="942"/>
        <location filename="../build/Desktop-Debug/VBDriveWizard_autogen/include/ui_mainwindow.h" line="2926"/>
        <source>Current Kd</source>
        <translation>Current Kd</translation>
    </message>
    <message>
        <location filename="../mainwindow.ui" line="1279"/>
        <location filename="../build/Desktop-Debug/VBDriveWizard_autogen/include/ui_mainwindow.h" line="2960"/>
        <source>System</source>
        <translation>System</translation>
    </message>
    <message>
        <location filename="../mainwindow.ui" line="1300"/>
        <location filename="../build/Desktop-Debug/VBDriveWizard_autogen/include/ui_mainwindow.h" line="2944"/>
        <source>Sensor</source>
        <translation>Sensor</translation>
    </message>
    <message>
        <location filename="../mainwindow.ui" line="1327"/>
        <location filename="../build/Desktop-Debug/VBDriveWizard_autogen/include/ui_mainwindow.h" line="2945"/>
        <source>Calibrate</source>
        <translation>Calibrate</translation>
    </message>
    <message>
        <location filename="../mainwindow.ui" line="1353"/>
        <location filename="../build/Desktop-Debug/VBDriveWizard_autogen/include/ui_mainwindow.h" line="2946"/>
        <source>Register Parameters</source>
        <translation>Register Parameters</translation>
    </message>
    <message>
        <location filename="../mainwindow.ui" line="1377"/>
        <location filename="../build/Desktop-Debug/VBDriveWizard_autogen/include/ui_mainwindow.h" line="2947"/>
        <source>Save to File...</source>
        <translation>Save to File...</translation>
    </message>
    <message>
        <location filename="../mainwindow.ui" line="1384"/>
        <location filename="../build/Desktop-Debug/VBDriveWizard_autogen/include/ui_mainwindow.h" line="2948"/>
        <source>Load from File...</source>
        <translation>Load from File...</translation>
    </message>
    <message>
        <location filename="../mainwindow.ui" line="1391"/>
        <location filename="../build/Desktop-Debug/VBDriveWizard_autogen/include/ui_mainwindow.h" line="2949"/>
        <source>Restore to Default</source>
        <translation>Restore to Default</translation>
    </message>
    <message>
        <location filename="../mainwindow.ui" line="1401"/>
        <location filename="../build/Desktop-Debug/VBDriveWizard_autogen/include/ui_mainwindow.h" line="2950"/>
        <source>Firmware</source>
        <translation>Firmware</translation>
    </message>
    <message>
        <location filename="../mainwindow.ui" line="1445"/>
        <location filename="../build/Desktop-Debug/VBDriveWizard_autogen/include/ui_mainwindow.h" line="2951"/>
        <source>Current Revision:</source>
        <translation>Current Revision:</translation>
    </message>
    <message>
        <location filename="../mainwindow.ui" line="1452"/>
        <location filename="../build/Desktop-Debug/VBDriveWizard_autogen/include/ui_mainwindow.h" line="2952"/>
        <source>0.0.1</source>
        <translation>0.0.1</translation>
    </message>
    <message>
        <source>Choose file</source>
        <translation type="vanished">Choose file</translation>
    </message>
    <message>
        <location filename="../mainwindow.ui" line="1526"/>
        <location filename="../build/Desktop-Debug/VBDriveWizard_autogen/include/ui_mainwindow.h" line="2955"/>
        <source>Open</source>
        <translation>Open</translation>
    </message>
    <message>
        <source>Download from remote repo</source>
        <translation type="vanished">Download from remote repo</translation>
    </message>
    <message>
        <location filename="../mainwindow.ui" line="1581"/>
        <location filename="../build/Desktop-Debug/VBDriveWizard_autogen/include/ui_mainwindow.h" line="2959"/>
        <source>Flash</source>
        <translation>Flash</translation>
    </message>
    <message>
        <location filename="../mainwindow.ui" line="1634"/>
        <location filename="../build/Desktop-Debug/VBDriveWizard_autogen/include/ui_mainwindow.h" line="2961"/>
        <source>Read</source>
        <translation>Read</translation>
    </message>
    <message>
        <location filename="../mainwindow.ui" line="1641"/>
        <location filename="../build/Desktop-Debug/VBDriveWizard_autogen/include/ui_mainwindow.h" line="2962"/>
        <source>Write</source>
        <translation>Write</translation>
    </message>
    <message>
        <location filename="../mainwindow.ui" line="1648"/>
        <location filename="../build/Desktop-Debug/VBDriveWizard_autogen/include/ui_mainwindow.h" line="2963"/>
        <source>Set Origin</source>
        <translation>Set Origin</translation>
    </message>
    <message>
        <source>&lt;html&gt;&lt;head/&gt;&lt;body&gt;&lt;p align=&quot;center&quot;&gt;Logo&lt;/p&gt;&lt;/body&gt;&lt;/html&gt;</source>
        <translation type="vanished">&lt;html&gt;&lt;head/&gt;&lt;body&gt;&lt;p align=&quot;center&quot;&gt;Logo&lt;/p&gt;&lt;/body&gt;&lt;/html&gt;</translation>
    </message>
    <message>
        <location filename="../mainwindow.ui" line="1662"/>
        <location filename="../build/Desktop-Debug/VBDriveWizard_autogen/include/ui_mainwindow.h" line="2964"/>
        <source>REALTIME DATA</source>
        <translation>REALTIME DATA</translation>
    </message>
    <message>
        <source>Signal:</source>
        <translation type="vanished">Signal:</translation>
    </message>
    <message>
        <location filename="../mainwindow.ui" line="3977"/>
        <location filename="../mainwindow.ui" line="4190"/>
        <location filename="../build/Desktop-Debug/VBDriveWizard_autogen/include/ui_mainwindow.h" line="3047"/>
        <location filename="../build/Desktop-Debug/VBDriveWizard_autogen/include/ui_mainwindow.h" line="3053"/>
        <source>Position</source>
        <translation>Position</translation>
    </message>
    <message>
        <source>Temperature</source>
        <translation type="vanished">Temperature</translation>
    </message>
    <message>
        <location filename="../mainwindow.ui" line="1766"/>
        <location filename="../build/Desktop-Debug/VBDriveWizard_autogen/include/ui_mainwindow.h" line="2978"/>
        <source>Log</source>
        <translation>Log</translation>
    </message>
    <message>
        <location filename="../mainwindow.ui" line="1789"/>
        <location filename="../build/Desktop-Debug/VBDriveWizard_autogen/include/ui_mainwindow.h" line="2981"/>
        <source>Units:</source>
        <translation>Units:</translation>
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
        <translation>Preferences</translation>
    </message>
    <message>
        <source>Pause</source>
        <translation type="vanished">Pause</translation>
    </message>
    <message>
        <source>Save as CSV...</source>
        <translation type="vanished">Save as CSV...</translation>
    </message>
    <message>
        <source>Save as PNG...</source>
        <translation type="vanished">Save as PNG...</translation>
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
        <translation type="vanished">Dist X:</translation>
    </message>
    <message>
        <source>Dist Y:</source>
        <translation type="vanished">Dist Y:</translation>
    </message>
    <message>
        <location filename="../mainwindow.ui" line="1938"/>
        <location filename="../build/Desktop-Debug/VBDriveWizard_autogen/include/ui_mainwindow.h" line="2993"/>
        <source>CONTROL</source>
        <translation>CONTROL</translation>
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
        <translation>Control Type</translation>
    </message>
    <message>
        <location filename="../mainwindow.ui" line="2067"/>
        <location filename="../build/Desktop-Debug/VBDriveWizard_autogen/include/ui_mainwindow.h" line="2999"/>
        <source>Transient Form</source>
        <translation>Transient Form</translation>
    </message>
    <message>
        <source>Linear</source>
        <translation type="vanished">Linear</translation>
    </message>
    <message>
        <source>Polynomial</source>
        <translation type="vanished">Polynomial</translation>
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
        <translation>Set</translation>
    </message>
    <message>
        <location filename="../mainwindow.ui" line="2803"/>
        <location filename="../build/Desktop-Debug/VBDriveWizard_autogen/include/ui_mainwindow.h" line="3016"/>
        <source>Feedback Gains</source>
        <translation>Feedback Gains</translation>
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
        <translation>User</translation>
    </message>
    <message>
        <source>Target pos:</source>
        <translation type="vanished">Target pos:</translation>
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
        <translation>Start</translation>
    </message>
    <message>
        <location filename="../mainwindow.ui" line="3355"/>
        <location filename="../mainwindow.ui" line="3882"/>
        <location filename="../build/Desktop-Debug/VBDriveWizard_autogen/include/ui_mainwindow.h" line="3031"/>
        <location filename="../build/Desktop-Debug/VBDriveWizard_autogen/include/ui_mainwindow.h" line="3043"/>
        <source>Sin</source>
        <translation>Sin</translation>
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
        <translation>Amplitude</translation>
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
        <translation>Frequency</translation>
    </message>
    <message>
        <location filename="../mainwindow.ui" line="3511"/>
        <location filename="../mainwindow.ui" line="3892"/>
        <location filename="../build/Desktop-Debug/VBDriveWizard_autogen/include/ui_mainwindow.h" line="3035"/>
        <location filename="../build/Desktop-Debug/VBDriveWizard_autogen/include/ui_mainwindow.h" line="3044"/>
        <source>Meander</source>
        <translation>Meander</translation>
    </message>
    <message>
        <location filename="../mainwindow.ui" line="3667"/>
        <location filename="../mainwindow.ui" line="3902"/>
        <location filename="../build/Desktop-Debug/VBDriveWizard_autogen/include/ui_mainwindow.h" line="3039"/>
        <location filename="../build/Desktop-Debug/VBDriveWizard_autogen/include/ui_mainwindow.h" line="3045"/>
        <source>Triangle</source>
        <translation>Triangle</translation>
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
        <translation>Trajectory</translation>
    </message>
    <message>
        <location filename="../mainwindow.ui" line="3869"/>
        <location filename="../build/Desktop-Debug/VBDriveWizard_autogen/include/ui_mainwindow.h" line="3042"/>
        <source>Step</source>
        <translation>Step</translation>
    </message>
    <message>
        <location filename="../mainwindow.ui" line="3950"/>
        <location filename="../build/Desktop-Debug/VBDriveWizard_autogen/include/ui_mainwindow.h" line="3046"/>
        <source>Step Targets</source>
        <translation>Step Targets</translation>
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
        <translation>Trajectory Targets</translation>
    </message>
    <message>
        <location filename="../mainwindow.ui" line="4238"/>
        <location filename="../build/Desktop-Debug/VBDriveWizard_autogen/include/ui_mainwindow.h" line="3056"/>
        <source>+derivative</source>
        <translation>+derivative</translation>
    </message>
    <message>
        <location filename="../mainwindow.ui" line="4431"/>
        <location filename="../build/Desktop-Debug/VBDriveWizard_autogen/include/ui_mainwindow.h" line="3063"/>
        <source>STATUS</source>
        <translation>STATUS</translation>
    </message>
    <message>
        <source>Model</source>
        <translation type="vanished">Model</translation>
    </message>
    <message>
        <location filename="../mainwindow.ui" line="1703"/>
        <location filename="../build/Desktop-Debug/VBDriveWizard_autogen/include/ui_mainwindow.h" line="2966"/>
        <source>Play/Pause Plot Data</source>
        <translation type="unfinished"></translation>
    </message>
    <message>
        <location filename="../mainwindow.ui" line="1743"/>
        <location filename="../build/Desktop-Debug/VBDriveWizard_autogen/include/ui_mainwindow.h" line="2974"/>
        <source>Crosshair</source>
        <translation>Crosshair</translation>
    </message>
    <message>
        <location filename="../mainwindow.ui" line="1723"/>
        <location filename="../build/Desktop-Debug/VBDriveWizard_autogen/include/ui_mainwindow.h" line="2970"/>
        <source>Save as...</source>
        <translation>Save as...</translation>
    </message>
    <message>
        <location filename="../mainwindow.ui" line="1267"/>
        <location filename="../build/Desktop-Debug/VBDriveWizard_autogen/include/ui_mainwindow.h" line="2942"/>
        <source>Current Limit</source>
        <translation type="unfinished"></translation>
    </message>
    <message>
        <location filename="../mainwindow.ui" line="1495"/>
        <location filename="../build/Desktop-Debug/VBDriveWizard_autogen/include/ui_mainwindow.h" line="2953"/>
        <source>Local file</source>
        <translation>Local file</translation>
    </message>
    <message>
        <location filename="../mainwindow.ui" line="1508"/>
        <location filename="../build/Desktop-Debug/VBDriveWizard_autogen/include/ui_mainwindow.h" line="2954"/>
        <source>Remote repo</source>
        <translation>Remote repo</translation>
    </message>
    <message>
        <location filename="../mainwindow.ui" line="1539"/>
        <location filename="../build/Desktop-Debug/VBDriveWizard_autogen/include/ui_mainwindow.h" line="2957"/>
        <source>Firmware release to flash</source>
        <translation type="unfinished"></translation>
    </message>
    <message>
        <location filename="../mainwindow.ui" line="1852"/>
        <location filename="../build/Desktop-Debug/VBDriveWizard_autogen/include/ui_mainwindow.h" line="2987"/>
        <source>ΔX:</source>
        <translation type="unfinished"></translation>
    </message>
    <message>
        <location filename="../mainwindow.ui" line="1866"/>
        <location filename="../build/Desktop-Debug/VBDriveWizard_autogen/include/ui_mainwindow.h" line="2988"/>
        <source>ΔY:</source>
        <translation type="unfinished"></translation>
    </message>
    <message>
        <location filename="../mainwindow.ui" line="2008"/>
        <location filename="../build/Desktop-Debug/VBDriveWizard_autogen/include/ui_mainwindow.h" line="2995"/>
        <source>Pos</source>
        <translation type="unfinished"></translation>
    </message>
    <message>
        <location filename="../mainwindow.ui" line="2021"/>
        <location filename="../build/Desktop-Debug/VBDriveWizard_autogen/include/ui_mainwindow.h" line="2996"/>
        <source>Vel</source>
        <translation type="unfinished"></translation>
    </message>
    <message>
        <location filename="../mainwindow.ui" line="2041"/>
        <location filename="../build/Desktop-Debug/VBDriveWizard_autogen/include/ui_mainwindow.h" line="2998"/>
        <source>Voltage</source>
        <comment>servo segment</comment>
        <translation type="unfinished">Voltage</translation>
    </message>
    <message>
        <location filename="../mainwindow.ui" line="2116"/>
        <location filename="../mainwindow.ui" line="2181"/>
        <location filename="../mainwindow.ui" line="2236"/>
        <location filename="../build/Desktop-Debug/VBDriveWizard_autogen/include/ui_mainwindow.h" line="3000"/>
        <location filename="../build/Desktop-Debug/VBDriveWizard_autogen/include/ui_mainwindow.h" line="3003"/>
        <location filename="../build/Desktop-Debug/VBDriveWizard_autogen/include/ui_mainwindow.h" line="3005"/>
        <source>Direct</source>
        <translation type="unfinished"></translation>
    </message>
    <message>
        <location filename="../mainwindow.ui" line="2129"/>
        <location filename="../build/Desktop-Debug/VBDriveWizard_autogen/include/ui_mainwindow.h" line="3001"/>
        <source>Filter</source>
        <translation type="unfinished"></translation>
    </message>
    <message>
        <location filename="../mainwindow.ui" line="2139"/>
        <location filename="../build/Desktop-Debug/VBDriveWizard_autogen/include/ui_mainwindow.h" line="3002"/>
        <source>Polynomial</source>
        <comment>servo segment</comment>
        <translation type="unfinished">Polynomial</translation>
    </message>
    <message>
        <location filename="../mainwindow.ui" line="2194"/>
        <location filename="../build/Desktop-Debug/VBDriveWizard_autogen/include/ui_mainwindow.h" line="3004"/>
        <source>Ramp</source>
        <translation type="unfinished"></translation>
    </message>
    <message>
        <location filename="../mainwindow.ui" line="2275"/>
        <location filename="../build/Desktop-Debug/VBDriveWizard_autogen/include/ui_mainwindow.h" line="3006"/>
        <source>Trajectory Params</source>
        <translation type="unfinished"></translation>
    </message>
    <message>
        <location filename="../mainwindow.ui" line="2331"/>
        <location filename="../build/Desktop-Debug/VBDriveWizard_autogen/include/ui_mainwindow.h" line="3007"/>
        <source>No Params</source>
        <translation type="unfinished"></translation>
    </message>
    <message>
        <location filename="../mainwindow.ui" line="2425"/>
        <location filename="../build/Desktop-Debug/VBDriveWizard_autogen/include/ui_mainwindow.h" line="3008"/>
        <source>Bandwidth</source>
        <translation type="unfinished"></translation>
    </message>
    <message>
        <location filename="../mainwindow.ui" line="2584"/>
        <location filename="../build/Desktop-Debug/VBDriveWizard_autogen/include/ui_mainwindow.h" line="3012"/>
        <source>Vel Limit</source>
        <translation type="unfinished"></translation>
    </message>
    <message>
        <location filename="../mainwindow.ui" line="2564"/>
        <location filename="../build/Desktop-Debug/VBDriveWizard_autogen/include/ui_mainwindow.h" line="3011"/>
        <source>Accel Limit</source>
        <translation type="unfinished"></translation>
    </message>
    <message>
        <location filename="../mainwindow.ui" line="2541"/>
        <location filename="../build/Desktop-Debug/VBDriveWizard_autogen/include/ui_mainwindow.h" line="3010"/>
        <source>Decel Limit</source>
        <translation type="unfinished"></translation>
    </message>
    <message>
        <location filename="../mainwindow.ui" line="2713"/>
        <location filename="../build/Desktop-Debug/VBDriveWizard_autogen/include/ui_mainwindow.h" line="3014"/>
        <source>Rate</source>
        <translation type="unfinished"></translation>
    </message>
    <message>
        <location filename="../mainwindow.ui" line="3195"/>
        <location filename="../build/Desktop-Debug/VBDriveWizard_autogen/include/ui_mainwindow.h" line="3024"/>
        <source>No Gains</source>
        <translation type="unfinished"></translation>
    </message>
    <message>
        <location filename="../mainwindow.ui" line="3270"/>
        <location filename="../build/Desktop-Debug/VBDriveWizard_autogen/include/ui_mainwindow.h" line="3025"/>
        <source>Target</source>
        <translation type="unfinished">Target</translation>
    </message>
    <message>
        <source>M4310R10</source>
        <translation type="vanished">M4310R10</translation>
    </message>
    <message>
        <location filename="../mainwindow.ui" line="4525"/>
        <location filename="../build/Desktop-Debug/VBDriveWizard_autogen/include/ui_mainwindow.h" line="3074"/>
        <source>Temperature MCU</source>
        <translation>Temperature MCU</translation>
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
        <translation>Temperature Stator</translation>
    </message>
    <message>
        <location filename="../mainwindow.ui" line="4567"/>
        <location filename="../build/Desktop-Debug/VBDriveWizard_autogen/include/ui_mainwindow.h" line="3080"/>
        <source>Bus Voltage</source>
        <translation>Bus Voltage</translation>
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
        <translation>Motor Encoder</translation>
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
        <translation>Shaft Encoder</translation>
    </message>
    <message>
        <location filename="../mainwindow.ui" line="4497"/>
        <location filename="../build/Desktop-Debug/VBDriveWizard_autogen/include/ui_mainwindow.h" line="3070"/>
        <source>Fault</source>
        <translation>Fault</translation>
    </message>
    <message>
        <location filename="../mainwindow.ui" line="4641"/>
        <location filename="../build/Desktop-Debug/VBDriveWizard_autogen/include/ui_mainwindow.h" line="3086"/>
        <source>STOP</source>
        <translation>STOP</translation>
    </message>
    <message>
        <location filename="../mainwindow.cpp" line="298"/>
        <source>Reconnect failed</source>
        <translation>Reconnect failed</translation>
    </message>
    <message>
        <location filename="../mainwindow.cpp" line="299"/>
        <source>The actuator did not answer after flashing; connect again by hand.

%1</source>
        <translation>The actuator did not answer after flashing; connect again by hand.

%1</translation>
    </message>
    <message>
        <location filename="../mainwindow.cpp" line="304"/>
        <location filename="../mainwindow.cpp" line="316"/>
        <location filename="../mainwindow.cpp" line="1182"/>
        <location filename="../mainwindow.cpp" line="1212"/>
        <source>Connection failed</source>
        <translation>Connection failed</translation>
    </message>
    <message>
        <location filename="../mainwindow.cpp" line="343"/>
        <source>Firmware download failed</source>
        <translation>Firmware download failed</translation>
    </message>
    <message>
        <location filename="../mainwindow.cpp" line="356"/>
        <source>Downloaded firmware %1.</source>
        <translation>Downloaded firmware %1.</translation>
    </message>
    <message>
        <location filename="../mainwindow.cpp" line="376"/>
        <location filename="../mainwindow.cpp" line="3429"/>
        <source>Flashing failed</source>
        <translation>Flashing failed</translation>
    </message>
    <message>
        <location filename="../mainwindow.cpp" line="604"/>
        <location filename="../mainwindow.cpp" line="606"/>
        <location filename="../mainwindow.cpp" line="1067"/>
        <location filename="../mainwindow.cpp" line="1332"/>
        <location filename="../mainwindow.cpp" line="1333"/>
        <source>Disconnect</source>
        <translation>Disconnect</translation>
    </message>
    <message>
        <source>Resume</source>
        <translation type="vanished">Resume</translation>
    </message>
    <message>
        <location filename="../mainwindow.cpp" line="1496"/>
        <source>No actuators found - press refresh</source>
        <translation>No actuators found - press refresh</translation>
    </message>
    <message>
        <location filename="../mainwindow.cpp" line="220"/>
        <location filename="../mainwindow.cpp" line="615"/>
        <location filename="../mainwindow.cpp" line="1273"/>
        <source>Not connected</source>
        <translation>Not connected</translation>
    </message>
    <message>
        <location filename="../mainwindow.cpp" line="633"/>
        <source>Calibration in progress</source>
        <translation type="unfinished"></translation>
    </message>
    <message>
        <location filename="../mainwindow.cpp" line="634"/>
        <source>The actuator is still calibrating and cannot be stopped. Closing now leaves it to finish on its own.
Close anyway?</source>
        <translation type="unfinished"></translation>
    </message>
    <message>
        <location filename="../mainwindow.cpp" line="645"/>
        <source>Flashing in progress</source>
        <translation type="unfinished"></translation>
    </message>
    <message>
        <location filename="../mainwindow.cpp" line="646"/>
        <source>The actuator is being flashed over CAN. Closing now leaves it in the bootloader without firmware.
Close anyway?</source>
        <translation type="unfinished"></translation>
    </message>
    <message>
        <location filename="../mainwindow.cpp" line="658"/>
        <location filename="../mainwindow.cpp" line="1557"/>
        <source>Unsaved changes</source>
        <translation>Unsaved changes</translation>
    </message>
    <message>
        <location filename="../mainwindow.cpp" line="659"/>
        <source>Some register changes have not been written to the actuator.
Close anyway?</source>
        <translation>Some register changes have not been written to the actuator.
Close anyway?</translation>
    </message>
    <message>
        <location filename="../mainwindow.cpp" line="686"/>
        <location filename="../mainwindow.cpp" line="1175"/>
        <source>Disconnecting...</source>
        <translation type="unfinished"></translation>
    </message>
    <message>
        <location filename="../mainwindow.cpp" line="1115"/>
        <source>%1 (unavailable)</source>
        <translation>%1 (unavailable)</translation>
    </message>
    <message>
        <location filename="../mainwindow.cpp" line="1182"/>
        <source>No serial port selected.</source>
        <translation>No serial port selected.</translation>
    </message>
    <message>
        <location filename="../mainwindow.cpp" line="1192"/>
        <source>Opening %1...</source>
        <translation>Opening %1...</translation>
    </message>
    <message>
        <location filename="../mainwindow.cpp" line="1218"/>
        <source>Listening for actuators on %1...</source>
        <translation>Listening for actuators on %1...</translation>
    </message>
    <message>
        <location filename="../mainwindow.cpp" line="1248"/>
        <source>Serial connected</source>
        <translation>Serial connected</translation>
    </message>
    <message>
        <location filename="../mainwindow.cpp" line="1249"/>
        <source>CAN connected</source>
        <translation>CAN connected</translation>
    </message>
    <message>
        <location filename="../mainwindow.cpp" line="1274"/>
        <source>Disconnected.</source>
        <translation>Disconnected.</translation>
    </message>
    <message>
        <source>Sort by model</source>
        <translation type="vanished">Sort by model</translation>
    </message>
    <message>
        <source>Sort by Node ID</source>
        <translation type="vanished">Sort by Node ID</translation>
    </message>
    <message>
        <location filename="../mainwindow.cpp" line="1482"/>
        <source>  (no heartbeat)</source>
        <translation>  (no heartbeat)</translation>
    </message>
    <message>
        <location filename="../mainwindow.cpp" line="1558"/>
        <source>Actuator %1 has register changes that were not written.
Write them before switching?</source>
        <translation>Actuator %1 has register changes that were not written.
Write them before switching?</translation>
    </message>
    <message>
        <location filename="../mainwindow.cpp" line="1644"/>
        <source>Reading registers...</source>
        <translation>Reading registers...</translation>
    </message>
    <message>
        <location filename="../mainwindow.cpp" line="1655"/>
        <location filename="../mainwindow.cpp" line="1661"/>
        <source>No changes to write.</source>
        <translation>No changes to write.</translation>
    </message>
    <message>
        <location filename="../mainwindow.cpp" line="1682"/>
        <source>Critical register</source>
        <translation type="unfinished"></translation>
    </message>
    <message>
        <location filename="../mainwindow.cpp" line="1683"/>
        <source>The value of register %1 will be changed from %2 A to %3 A. Are you sure you want to overwrite it?</source>
        <translation type="unfinished"></translation>
    </message>
    <message>
        <location filename="../mainwindow.cpp" line="1691"/>
        <source>Write all except this register</source>
        <translation type="unfinished"></translation>
    </message>
    <message numerus="yes">
        <location filename="../mainwindow.cpp" line="1733"/>
        <source>Writing %n register(s), the actuator restarts to apply them...</source>
        <translation>
            <numerusform>Writing %n register(s), the actuator restarts to apply them...</numerusform>
            <numerusform></numerusform>
        </translation>
    </message>
    <message numerus="yes">
        <location filename="../mainwindow.cpp" line="1738"/>
        <source>Writing %n register(s)...</source>
        <translation>
            <numerusform>Writing %n register(s)...</numerusform>
            <numerusform></numerusform>
        </translation>
    </message>
    <message>
        <location filename="../mainwindow.cpp" line="1777"/>
        <source>Origin set; angle offset is now %1.</source>
        <translation>Origin set; angle offset is now %1.</translation>
    </message>
    <message>
        <location filename="../mainwindow.cpp" line="1793"/>
        <source>The angle did not settle at zero after the restart; press Set Origin again.</source>
        <translation type="unfinished"></translation>
    </message>
    <message>
        <location filename="../mainwindow.cpp" line="1808"/>
        <source>Calibrate sensor</source>
        <translation>Calibrate sensor</translation>
    </message>
    <message>
        <location filename="../mainwindow.cpp" line="1809"/>
        <source>Calibration moves the motor and cannot be cancelled. The actuator stops answering until it finishes.

Start calibration?</source>
        <translation>Calibration moves the motor and cannot be cancelled. The actuator stops answering until it finishes.

Start calibration?</translation>
    </message>
    <message>
        <location filename="../mainwindow.cpp" line="1823"/>
        <source>Calibration started; the actuator will not answer until it is done.</source>
        <translation>Calibration started; the actuator will not answer until it is done.</translation>
    </message>
    <message>
        <location filename="../mainwindow.cpp" line="1832"/>
        <source>Calibrating: stage %1 of %2 done...</source>
        <translation type="unfinished"></translation>
    </message>
    <message>
        <location filename="../mainwindow.cpp" line="1855"/>
        <source>Calibration finished.</source>
        <translation type="unfinished"></translation>
    </message>
    <message>
        <location filename="../mainwindow.cpp" line="1861"/>
        <source>Calibration failed: %1</source>
        <translation type="unfinished"></translation>
    </message>
    <message>
        <location filename="../mainwindow.cpp" line="1872"/>
        <source>Calibration failed</source>
        <translation type="unfinished"></translation>
    </message>
    <message>
        <location filename="../mainwindow.cpp" line="1873"/>
        <source>%1

The actuator may be hung. Restart it and connect again.</source>
        <translation type="unfinished"></translation>
    </message>
    <message>
        <location filename="../mainwindow.cpp" line="1898"/>
        <source>Save register profile</source>
        <translation>Save register profile</translation>
    </message>
    <message>
        <location filename="../mainwindow.cpp" line="1901"/>
        <location filename="../mainwindow.cpp" line="1924"/>
        <source>YAML files (*.yaml *.yml)</source>
        <translation>YAML files (*.yaml *.yml)</translation>
    </message>
    <message>
        <location filename="../mainwindow.cpp" line="1915"/>
        <source>Could not save the profile</source>
        <translation>Could not save the profile</translation>
    </message>
    <message>
        <location filename="../mainwindow.cpp" line="1917"/>
        <source>Profile saved to %1.</source>
        <translation>Profile saved to %1.</translation>
    </message>
    <message>
        <location filename="../mainwindow.cpp" line="1923"/>
        <source>Load register profile</source>
        <translation>Load register profile</translation>
    </message>
    <message>
        <location filename="../mainwindow.cpp" line="1932"/>
        <source>Could not load the profile</source>
        <translation>Could not load the profile</translation>
    </message>
    <message numerus="yes">
        <location filename="../mainwindow.cpp" line="1937"/>
        <source>Loaded %n register(s) from the profile.</source>
        <translation>
            <numerusform>Loaded %n register(s) from the profile.</numerusform>
            <numerusform></numerusform>
        </translation>
    </message>
    <message>
        <location filename="../mainwindow.cpp" line="1939"/>
        <source>Loaded with warnings: %1</source>
        <translation>Loaded with warnings: %1</translation>
    </message>
    <message>
        <location filename="../mainwindow.cpp" line="1955"/>
        <source>Could not load the default profile</source>
        <translation>Could not load the default profile</translation>
    </message>
    <message>
        <location filename="../mainwindow.cpp" line="1959"/>
        <source>Default values for %1 loaded into the editors.</source>
        <translation>Default values for %1 loaded into the editors.</translation>
    </message>
    <message>
        <location filename="../mainwindow.cpp" line="1987"/>
        <source>Could not read &apos;%1&apos;: %2</source>
        <translation>Could not read &apos;%1&apos;: %2</translation>
    </message>
    <message>
        <location filename="../mainwindow.cpp" line="2039"/>
        <source>Could not write &apos;%1&apos;: %2</source>
        <translation>Could not write &apos;%1&apos;: %2</translation>
    </message>
    <message>
        <location filename="../mainwindow.cpp" line="2057"/>
        <source>Registers written.</source>
        <translation>Registers written.</translation>
    </message>
    <message>
        <location filename="../mainwindow.cpp" line="2067"/>
        <source>Some registers were not written</source>
        <translation>Some registers were not written</translation>
    </message>
    <message>
        <location filename="../mainwindow.cpp" line="2073"/>
        <source>The actuator is not calibrated. Please calibrate the actuator to start working.</source>
        <translation>The actuator is not calibrated. Please calibrate the actuator to start working.</translation>
    </message>
    <message>
        <location filename="../mainwindow.cpp" line="2080"/>
        <source>Actuator not calibrated</source>
        <translation>Actuator not calibrated</translation>
    </message>
    <message>
        <location filename="../mainwindow.cpp" line="2137"/>
        <source>Actuator lost</source>
        <translation>Actuator lost</translation>
    </message>
    <message>
        <location filename="../mainwindow.cpp" line="2138"/>
        <source>Actuator %1 (node %2) stopped sending heartbeats.</source>
        <translation>Actuator %1 (node %2) stopped sending heartbeats.</translation>
    </message>
    <message>
        <location filename="../mainwindow.cpp" line="2141"/>
        <source>Wait for it to come back, keeping your unsaved register changes, or drop it and discard them?</source>
        <translation>Wait for it to come back, keeping your unsaved register changes, or drop it and discard them?</translation>
    </message>
    <message>
        <location filename="../mainwindow.cpp" line="2143"/>
        <source>Reconnect</source>
        <translation>Reconnect</translation>
    </message>
    <message>
        <location filename="../mainwindow.cpp" line="2144"/>
        <source>Remove actuator</source>
        <translation>Remove actuator</translation>
    </message>
    <message>
        <location filename="../mainwindow.cpp" line="2156"/>
        <source>Waiting for node %1 to return...</source>
        <translation>Waiting for node %1 to return...</translation>
    </message>
    <message>
        <location filename="../mainwindow.cpp" line="2188"/>
        <source>The actuator restarted with the new settings.</source>
        <translation>The actuator restarted with the new settings.</translation>
    </message>
    <message>
        <location filename="../mainwindow.cpp" line="2208"/>
        <source>Node %1 is back.</source>
        <translation>Node %1 is back.</translation>
    </message>
    <message>
        <location filename="../mainwindow.cpp" line="2893"/>
        <source>Node %1</source>
        <translation type="unfinished"></translation>
    </message>
    <message>
        <location filename="../mainwindow.cpp" line="2894"/>
        <source>Protective stop of %1: %2</source>
        <translation type="unfinished"></translation>
    </message>
    <message>
        <location filename="../mainwindow.cpp" line="2898"/>
        <location filename="../mainwindow.cpp" line="2914"/>
        <source>Protective stop</source>
        <translation type="unfinished"></translation>
    </message>
    <message>
        <location filename="../mainwindow.cpp" line="2899"/>
        <source>%1 has been stopped and disabled.

%2

Let the actuator cool down or clear the fault; the next Start enables it again.</source>
        <translation type="unfinished"></translation>
    </message>
    <message>
        <location filename="../mainwindow.cpp" line="3187"/>
        <source>Looking up the firmware releases...</source>
        <translation type="unfinished"></translation>
    </message>
    <message>
        <location filename="../mainwindow.cpp" line="3216"/>
        <source>This release carries no firmware image to flash.</source>
        <translation type="unfinished"></translation>
    </message>
    <message numerus="yes">
        <location filename="../mainwindow.cpp" line="3232"/>
        <source>Found %n firmware release(s).</source>
        <translation>
            <numerusform>Found %n firmware release.</numerusform>
            <numerusform>Found %n firmware releases.</numerusform>
        </translation>
    </message>
    <message>
        <location filename="../mainwindow.cpp" line="3239"/>
        <source>Could not list the firmware releases.</source>
        <translation type="unfinished"></translation>
    </message>
    <message>
        <location filename="../mainwindow.cpp" line="3242"/>
        <source>Firmware releases unavailable</source>
        <translation type="unfinished"></translation>
    </message>
    <message>
        <location filename="../mainwindow.cpp" line="3243"/>
        <source>%1

Select Remote repo again to retry.</source>
        <translation type="unfinished"></translation>
    </message>
    <message>
        <location filename="../mainwindow.cpp" line="3250"/>
        <source>Loading...</source>
        <translation type="unfinished"></translation>
    </message>
    <message>
        <location filename="../mainwindow.cpp" line="3250"/>
        <source>No releases</source>
        <translation type="unfinished"></translation>
    </message>
    <message>
        <location filename="../mainwindow.cpp" line="3272"/>
        <source>Pick a release from the list. If it is empty, select Remote repo again to retry.</source>
        <translation type="unfinished"></translation>
    </message>
    <message>
        <location filename="../mainwindow.cpp" line="3287"/>
        <source>The actuator runs firmware %1, which is newer than %2.
Flash %2 anyway?</source>
        <translation type="unfinished"></translation>
    </message>
    <message>
        <location filename="../mainwindow.cpp" line="3289"/>
        <source>The actuator already runs firmware %1.
Flash %2 anyway?</source>
        <translation type="unfinished"></translation>
    </message>
    <message>
        <location filename="../mainwindow.cpp" line="3332"/>
        <source>You have the latest firmware version.</source>
        <translation type="unfinished"></translation>
    </message>
    <message>
        <location filename="../mainwindow.cpp" line="1688"/>
        <source>Yes</source>
        <translation>Yes</translation>
    </message>
    <message>
        <location filename="../mainwindow.cpp" line="1689"/>
        <source>No</source>
        <translation>No</translation>
    </message>
    <message>
        <source>Target vel:</source>
        <translation type="vanished">Target vel:</translation>
    </message>
    <message>
        <source>Target torq:</source>
        <translation type="vanished">Target torq:</translation>
    </message>
    <message>
        <location filename="../mainwindow.cpp" line="2801"/>
        <source>Serial cannot sustain %1 Hz; running at %2 Hz instead.</source>
        <translation>Serial cannot sustain %1 Hz; running at %2 Hz instead.</translation>
    </message>
    <message>
        <source>Feedback gains written.</source>
        <translation type="vanished">Feedback gains written.</translation>
    </message>
    <message>
        <source>Transient form written.</source>
        <translation type="vanished">Transient form written.</translation>
    </message>
    <message>
        <location filename="../mainwindow.cpp" line="2868"/>
        <source>Emergency stop: all actuators disabled.</source>
        <translation>Emergency stop: all actuators disabled.</translation>
    </message>
    <message>
        <location filename="../mainwindow.cpp" line="3066"/>
        <source>Pause the plot</source>
        <translation>Pause the plot</translation>
    </message>
    <message>
        <location filename="../mainwindow.cpp" line="3066"/>
        <source>Resume the plot</source>
        <translation>Resume the plot</translation>
    </message>
    <message>
        <location filename="../mainwindow.cpp" line="3096"/>
        <source>No file was selected.</source>
        <translation>No file was selected.</translation>
    </message>
    <message>
        <location filename="../mainwindow.cpp" line="3100"/>
        <source>Save plot</source>
        <translation>Save plot</translation>
    </message>
    <message>
        <location filename="../mainwindow.cpp" line="3101"/>
        <source>%1 already exists. Overwrite it?</source>
        <translation>%1 already exists. Overwrite it?</translation>
    </message>
    <message>
        <location filename="../mainwindow.cpp" line="3127"/>
        <source>Saved to %1.</source>
        <translation>Saved to %1.</translation>
    </message>
    <message>
        <location filename="../mainwindow.cpp" line="3129"/>
        <source>Could not save the plot</source>
        <translation>Could not save the plot</translation>
    </message>
    <message>
        <location filename="../mainwindow.cpp" line="1290"/>
        <source>Emergency stop</source>
        <translation>Emergency stop</translation>
    </message>
    <message>
        <location filename="../mainwindow.cpp" line="385"/>
        <source>Firmware flashed</source>
        <translation>Firmware flashed</translation>
    </message>
    <message>
        <location filename="../mainwindow.cpp" line="386"/>
        <source>Restart the actuator and press OK.</source>
        <translation>Restart the actuator and press OK.</translation>
    </message>
    <message>
        <location filename="../mainwindow.cpp" line="400"/>
        <source>%1 Connect to the actuator from CONNECTION.</source>
        <translation>%1 Connect to the actuator from CONNECTION.</translation>
    </message>
    <message>
        <location filename="../mainwindow.cpp" line="1291"/>
        <source>The actuator has been stopped by the emergency stop. To resume, restart the actuator and connect to it again.</source>
        <translation>The actuator has been stopped by the emergency stop. To resume, restart the actuator and connect to it again.</translation>
    </message>
    <message>
        <location filename="../mainwindow.cpp" line="2523"/>
        <source>Servo settings written.</source>
        <translation type="unfinished"></translation>
    </message>
    <message>
        <location filename="../mainwindow.cpp" line="2968"/>
        <source>Stop</source>
        <translation>Stop</translation>
    </message>
    <message>
        <location filename="../mainwindow.cpp" line="3074"/>
        <source>s</source>
        <translation>s</translation>
    </message>
    <message>
        <source>Save plot data</source>
        <translation type="vanished">Save plot data</translation>
    </message>
    <message>
        <source>CSV files (*.csv)</source>
        <translation type="vanished">CSV files (*.csv)</translation>
    </message>
    <message>
        <source>Could not save the CSV</source>
        <translation type="vanished">Could not save the CSV</translation>
    </message>
    <message>
        <source>Plot data saved.</source>
        <translation type="vanished">Plot data saved.</translation>
    </message>
    <message>
        <source>Save plot image</source>
        <translation type="vanished">Save plot image</translation>
    </message>
    <message>
        <source>PNG images (*.png)</source>
        <translation type="vanished">PNG images (*.png)</translation>
    </message>
    <message>
        <source>Could not save the image</source>
        <translation type="vanished">Could not save the image</translation>
    </message>
    <message>
        <source>Plot image saved.</source>
        <translation type="vanished">Plot image saved.</translation>
    </message>
    <message>
        <location filename="../mainwindow.cpp" line="3163"/>
        <source>Select firmware image</source>
        <translation>Select firmware image</translation>
    </message>
    <message>
        <location filename="../mainwindow.cpp" line="3164"/>
        <source>Intel HEX files (*.hex)</source>
        <translation>Intel HEX files (*.hex)</translation>
    </message>
    <message>
        <location filename="../mainwindow.cpp" line="3168"/>
        <source>Selected %1.</source>
        <translation>Selected %1.</translation>
    </message>
    <message>
        <source>Looking up the latest release...</source>
        <translation type="obsolete">Looking up the latest release...</translation>
    </message>
    <message>
        <location filename="../mainwindow.cpp" line="3271"/>
        <location filename="../mainwindow.cpp" line="3306"/>
        <source>No firmware selected</source>
        <translation>No firmware selected</translation>
    </message>
    <message>
        <source>Choose a .hex file first, or switch to downloading the latest release.</source>
        <translation type="vanished">Choose a .hex file first, or switch to downloading the latest release.</translation>
    </message>
    <message>
        <location filename="../mainwindow.cpp" line="3290"/>
        <source>Flash firmware</source>
        <translation type="unfinished"></translation>
    </message>
    <message>
        <location filename="../mainwindow.cpp" line="3295"/>
        <source>Flashing cancelled.</source>
        <translation type="unfinished"></translation>
    </message>
    <message>
        <location filename="../mainwindow.cpp" line="3307"/>
        <source>Choose a .hex file first, or switch to a release from the remote repo.</source>
        <translation type="unfinished"></translation>
    </message>
    <message>
        <location filename="../mainwindow.cpp" line="3329"/>
        <source>The firmware is outdated: release %1 is available.</source>
        <translation type="unfinished"></translation>
    </message>
    <message>
        <location filename="../mainwindow.cpp" line="3381"/>
        <source>Flashing %1...</source>
        <translation>Flashing %1...</translation>
    </message>
    <message>
        <location filename="../mainwindow.cpp" line="3390"/>
        <source>No actuator selected</source>
        <translation type="unfinished"></translation>
    </message>
    <message>
        <location filename="../mainwindow.cpp" line="3391"/>
        <source>Select the actuator to flash in the device list.</source>
        <translation type="unfinished"></translation>
    </message>
    <message>
        <location filename="../mainwindow.cpp" line="3414"/>
        <source>Flashing %1 into %2 over CAN...</source>
        <translation type="unfinished"></translation>
    </message>
    <message>
        <location filename="../mainwindow.cpp" line="3448"/>
        <source>%1 Waiting for the actuator to start...</source>
        <translation type="unfinished"></translation>
    </message>
    <message>
        <location filename="../mainwindow.cpp" line="3458"/>
        <source>Actuator did not start</source>
        <translation type="unfinished"></translation>
    </message>
    <message>
        <location filename="../mainwindow.cpp" line="3459"/>
        <source>The firmware was written, but node %1 has sent no heartbeat since. Power-cycle the actuator; if it stays silent, flash it over SWD.</source>
        <translation type="unfinished"></translation>
    </message>
    <message>
        <location filename="../mainwindow.cpp" line="3484"/>
        <source>Node %1 is running the new firmware.</source>
        <translation type="unfinished"></translation>
    </message>
    <message>
        <location filename="../mainwindow.cpp" line="3499"/>
        <source>Reconnecting to the flashed actuator...</source>
        <translation>Reconnecting to the flashed actuator...</translation>
    </message>
    <message>
        <location filename="../mainwindow.cpp" line="3525"/>
        <source>Reconnecting to %1...</source>
        <translation>Reconnecting to %1...</translation>
    </message>
</context>
<context>
    <name>PlotController</name>
    <message>
        <location filename="../ui/plot_controller.cpp" line="667"/>
        <source>t, s</source>
        <translation>t, s</translation>
    </message>
    <message>
        <location filename="../ui/plot_controller.cpp" line="439"/>
        <source>Position</source>
        <translation>Position</translation>
    </message>
    <message>
        <location filename="../ui/plot_controller.cpp" line="441"/>
        <source>Velocity</source>
        <translation>Velocity</translation>
    </message>
    <message>
        <location filename="../ui/plot_controller.cpp" line="443"/>
        <source>Torque</source>
        <translation>Torque</translation>
    </message>
    <message>
        <location filename="../ui/plot_controller.cpp" line="445"/>
        <source>MCU</source>
        <translation>MCU</translation>
    </message>
    <message>
        <location filename="../ui/plot_controller.cpp" line="447"/>
        <source>Bus current</source>
        <translation>Bus current</translation>
    </message>
    <message>
        <location filename="../ui/plot_controller.cpp" line="449"/>
        <source>Rotor</source>
        <translation>Rotor</translation>
    </message>
    <message>
        <location filename="../ui/plot_controller.cpp" line="462"/>
        <source>Target</source>
        <translation>Target</translation>
    </message>
    <message>
        <location filename="../ui/plot_controller.cpp" line="464"/>
        <source>Stator</source>
        <translation>Stator</translation>
    </message>
    <message>
        <location filename="../ui/plot_controller.cpp" line="466"/>
        <source>Shaft</source>
        <translation>Shaft</translation>
    </message>
    <message>
        <location filename="../ui/plot_controller.cpp" line="477"/>
        <source>Position, %1</source>
        <translation>Position, %1</translation>
    </message>
    <message>
        <location filename="../ui/plot_controller.cpp" line="479"/>
        <source>Velocity, %1</source>
        <translation>Velocity, %1</translation>
    </message>
    <message>
        <location filename="../ui/plot_controller.cpp" line="482"/>
        <source>Torque, N*m</source>
        <translation>Torque, N*m</translation>
    </message>
    <message>
        <location filename="../ui/plot_controller.cpp" line="484"/>
        <source>Temperature, C</source>
        <translation>Temperature, C</translation>
    </message>
    <message>
        <location filename="../ui/plot_controller.cpp" line="486"/>
        <source>Bus current, A</source>
        <translation>Bus current, A</translation>
    </message>
    <message>
        <location filename="../ui/plot_controller.cpp" line="488"/>
        <source>Encoder, counts</source>
        <translation>Encoder, counts</translation>
    </message>
    <message>
        <location filename="../ui/plot_controller.cpp" line="691"/>
        <source>Fit to data</source>
        <translation type="unfinished"></translation>
    </message>
    <message>
        <location filename="../ui/plot_controller.cpp" line="698"/>
        <source>Restore panels</source>
        <translation type="unfinished"></translation>
    </message>
    <message>
        <location filename="../ui/plot_controller.cpp" line="698"/>
        <source>Maximize panel</source>
        <translation type="unfinished"></translation>
    </message>
    <message>
        <location filename="../ui/plot_controller.cpp" line="702"/>
        <source>Add panel</source>
        <translation type="unfinished"></translation>
    </message>
    <message>
        <location filename="../ui/plot_controller.cpp" line="705"/>
        <source>Hide panel</source>
        <translation type="unfinished"></translation>
    </message>
    <message>
        <location filename="../ui/plot_controller.cpp" line="1354"/>
        <location filename="../ui/plot_controller.cpp" line="1389"/>
        <source>The plot is not initialised.</source>
        <translation>The plot is not initialised.</translation>
    </message>
    <message>
        <location filename="../ui/plot_controller.cpp" line="1359"/>
        <source>The log view cannot be exported as an image.</source>
        <translation>The log view cannot be exported as an image.</translation>
    </message>
    <message>
        <source>The plot could not be rendered.</source>
        <translation type="vanished">The plot could not be rendered.</translation>
    </message>
    <message>
        <source>Could not write %1.</source>
        <translation type="vanished">Could not write %1.</translation>
    </message>
    <message>
        <location filename="../ui/plot_controller.cpp" line="1396"/>
        <location filename="../ui/plot_controller.cpp" line="1460"/>
        <source>Could not write %1: %2</source>
        <translation>Could not write %1: %2</translation>
    </message>
</context>
<context>
    <name>PlotCrosshairTool</name>
    <message>
        <location filename="../ui/plot_crosshair.cpp" line="79"/>
        <source>t, s</source>
        <translation>t, s</translation>
    </message>
</context>
<context>
    <name>PreferencesDialog</name>
    <message>
        <location filename="../ui/preferences_dialog.ui" line="59"/>
        <source>Language:</source>
        <translation>Language:</translation>
    </message>
    <message>
        <location filename="../ui/preferences_dialog.ui" line="14"/>
        <source>Preferences</source>
        <translation>Preferences</translation>
    </message>
    <message>
        <location filename="../ui/preferences_dialog.ui" line="35"/>
        <source>Appearance</source>
        <translation>Appearance</translation>
    </message>
    <message>
        <location filename="../ui/preferences_dialog.ui" line="97"/>
        <source>Theme:</source>
        <translation>Theme:</translation>
    </message>
    <message>
        <location filename="../ui/preferences_dialog.ui" line="105"/>
        <source>Dark</source>
        <translation>Dark</translation>
    </message>
    <message>
        <location filename="../ui/preferences_dialog.ui" line="110"/>
        <source>Light</source>
        <translation>Light</translation>
    </message>
    <message>
        <location filename="../ui/preferences_dialog.ui" line="118"/>
        <source>Interface font size, pt:</source>
        <translation>Interface font size, pt:</translation>
    </message>
    <message>
        <location filename="../ui/preferences_dialog.ui" line="138"/>
        <source>Plot</source>
        <translation>Plot</translation>
    </message>
    <message>
        <location filename="../ui/preferences_dialog.ui" line="162"/>
        <source>Plot font size, pt:</source>
        <translation>Plot font size, pt:</translation>
    </message>
    <message>
        <location filename="../ui/preferences_dialog.ui" line="179"/>
        <source>Line width, px:</source>
        <translation>Line width, px:</translation>
    </message>
    <message>
        <location filename="../ui/preferences_dialog.ui" line="196"/>
        <source>Time window, s:</source>
        <translation>Time window, s:</translation>
    </message>
    <message>
        <location filename="../ui/preferences_dialog.ui" line="219"/>
        <source>Redraw rate, Hz:</source>
        <translation>Redraw rate, Hz:</translation>
    </message>
    <message>
        <location filename="../ui/preferences_dialog.ui" line="239"/>
        <source>Connection</source>
        <translation>Connection</translation>
    </message>
    <message>
        <location filename="../ui/preferences_dialog.ui" line="263"/>
        <source>This application&apos;s Cyphal node ID:</source>
        <translation>This application&apos;s Cyphal node ID:</translation>
    </message>
    <message>
        <location filename="../ui/preferences_dialog.ui" line="280"/>
        <source>Serial baud rate:</source>
        <translation>Serial baud rate:</translation>
    </message>
    <message>
        <location filename="../ui/preferences_dialog.ui" line="303"/>
        <source>Protective stop</source>
        <translation type="unfinished"></translation>
    </message>
    <message>
        <location filename="../ui/preferences_dialog.ui" line="327"/>
        <source>Maximum stator temperature:</source>
        <translation type="unfinished"></translation>
    </message>
    <message>
        <location filename="../ui/preferences_dialog.ui" line="353"/>
        <source>Maximum MCU temperature:</source>
        <translation type="unfinished"></translation>
    </message>
    <message>
        <location filename="../ui/preferences_dialog.ui" line="382"/>
        <source>Firmware flashing (OpenOCD)</source>
        <translation>Firmware flashing (OpenOCD)</translation>
    </message>
    <message>
        <location filename="../ui/preferences_dialog.ui" line="406"/>
        <source>Interface config:</source>
        <translation>Interface config:</translation>
    </message>
    <message>
        <location filename="../ui/preferences_dialog.ui" line="417"/>
        <source>Target config:</source>
        <translation>Target config:</translation>
    </message>
    <message>
        <location filename="../ui/preferences_dialog.cpp" line="24"/>
        <source>OpenOCD interface script, relative to its scripts directory.
VBDrive is programmed over SWD with an ST-Link.</source>
        <translation>OpenOCD interface script, relative to its scripts directory.
VBDrive is programmed over SWD with an ST-Link.</translation>
    </message>
    <message>
        <location filename="../ui/preferences_dialog.cpp" line="27"/>
        <source>OpenOCD target script. VBDrive uses an STM32G431VB.</source>
        <translation>OpenOCD target script. VBDrive uses an STM32G431VB.</translation>
    </message>
    <message>
        <location filename="../ui/preferences_dialog.cpp" line="29"/>
        <source>Node ID this application announces on the CAN bus.
It must not collide with any actuator.</source>
        <translation>Node ID this application announces on the CAN bus.
It must not collide with any actuator.</translation>
    </message>
    <message>
        <location filename="../ui/preferences_dialog.cpp" line="32"/>
        <source>An actuator whose motor gets hotter than this is stopped and disabled.</source>
        <translation type="unfinished"></translation>
    </message>
    <message>
        <location filename="../ui/preferences_dialog.cpp" line="34"/>
        <source>An actuator whose microcontroller gets hotter than this is stopped and disabled.</source>
        <translation type="unfinished"></translation>
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
        <source>Restore the value this field had when the actuator was selected</source>
        <translation>Restore the value this field had when the actuator was selected</translation>
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
        <location filename="../ui/restore_model_dialog.ui" line="35"/>
        <source>Load the factory register profile for this actuator model. The values are placed in the editors; nothing is written to the actuator until you press Write.</source>
        <translation>Load the factory register profile for this actuator model. The values are placed in the editors; nothing is written to the actuator until you press Write.</translation>
    </message>
    <message>
        <location filename="../ui/restore_model_dialog.ui" line="62"/>
        <source>Actuator model:</source>
        <translation>Actuator model:</translation>
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
        <translation type="unfinished"></translation>
    </message>
    <message>
        <location filename="../control/safety_monitor.cpp" line="24"/>
        <source>Stator</source>
        <translation type="unfinished">Stator</translation>
    </message>
    <message>
        <location filename="../control/safety_monitor.cpp" line="27"/>
        <source>Microcontroller</source>
        <translation type="unfinished"></translation>
    </message>
    <message>
        <location filename="../control/safety_monitor.cpp" line="39"/>
        <source>%1 temperature %2 °C exceeded the limit of %3 °C set in Preferences.</source>
        <translation type="unfinished"></translation>
    </message>
    <message>
        <location filename="../control/safety_monitor.cpp" line="74"/>
        <source>The actuator reports a fault (is_fault = 1). Clear the fault before starting.</source>
        <translation type="unfinished"></translation>
    </message>
</context>
<context>
    <name>SaveFileDialog</name>
    <message>
        <location filename="../ui/save_file_dialog.ui" line="14"/>
        <location filename="../ui/save_file_dialog.cpp" line="142"/>
        <source>Save Plot</source>
        <translation>Save Plot</translation>
    </message>
    <message>
        <location filename="../ui/save_file_dialog.ui" line="22"/>
        <source>Address</source>
        <translation>Address</translation>
    </message>
    <message>
        <location filename="../ui/save_file_dialog.ui" line="32"/>
        <source>Browse</source>
        <translation>Browse</translation>
    </message>
    <message>
        <location filename="../ui/save_file_dialog.ui" line="39"/>
        <source>Save as</source>
        <translation>Save as</translation>
    </message>
    <message>
        <location filename="../ui/save_file_dialog.ui" line="70"/>
        <source>Theme</source>
        <translation>Theme</translation>
    </message>
    <message>
        <location filename="../ui/save_file_dialog.ui" line="78"/>
        <source>Light</source>
        <translation type="unfinished">Light</translation>
    </message>
    <message>
        <location filename="../ui/save_file_dialog.ui" line="83"/>
        <source>Dark</source>
        <translation type="unfinished">Dark</translation>
    </message>
    <message>
        <location filename="../ui/save_file_dialog.ui" line="91"/>
        <source>DPI</source>
        <translation>DPI</translation>
    </message>
    <message>
        <location filename="../ui/save_file_dialog.cpp" line="71"/>
        <source>This build was compiled without the Qt SVG module.</source>
        <translation>This build was compiled without the Qt SVG module.</translation>
    </message>
    <message>
        <location filename="../ui/save_file_dialog.cpp" line="143"/>
        <source>%1 files (*.%2)</source>
        <translation>%1 files (*.%2)</translation>
    </message>
</context>
<context>
    <name>SerialService</name>
    <message>
        <location filename="../transport/serial_service.cpp" line="121"/>
        <source>Serial service is shutting down.</source>
        <translation>Serial service is shutting down.</translation>
    </message>
    <message>
        <location filename="../transport/serial_service.cpp" line="154"/>
        <source>Reconnecting.</source>
        <translation>Reconnecting.</translation>
    </message>
    <message>
        <location filename="../transport/serial_service.cpp" line="166"/>
        <location filename="../transport/serial_service.cpp" line="170"/>
        <location filename="../transport/serial_service.cpp" line="184"/>
        <location filename="../transport/serial_service.cpp" line="200"/>
        <location filename="../transport/serial_service.cpp" line="581"/>
        <location filename="../transport/serial_service.cpp" line="593"/>
        <source>Disconnected.</source>
        <translation>Disconnected.</translation>
    </message>
    <message>
        <location filename="../transport/serial_service.cpp" line="232"/>
        <location filename="../transport/serial_service.cpp" line="258"/>
        <location filename="../transport/serial_service.cpp" line="773"/>
        <location filename="../transport/serial_service.cpp" line="879"/>
        <source>Serial port is not open.</source>
        <translation>Serial port is not open.</translation>
    </message>
    <message>
        <location filename="../transport/serial_service.cpp" line="232"/>
        <location filename="../transport/serial_service.cpp" line="773"/>
        <source>Disconnecting.</source>
        <translation type="unfinished"></translation>
    </message>
    <message>
        <location filename="../transport/serial_service.cpp" line="325"/>
        <source>Command &apos;%1&apos; failed: %2</source>
        <translation>Command &apos;%1&apos; failed: %2</translation>
    </message>
    <message>
        <location filename="../transport/serial_service.cpp" line="338"/>
        <source>The actuator did not answer after restarting: %1</source>
        <translation>The actuator did not answer after restarting: %1</translation>
    </message>
    <message>
        <location filename="../transport/serial_service.cpp" line="362"/>
        <source>Actuator detected on %1.</source>
        <translation>Actuator detected on %1.</translation>
    </message>
    <message>
        <location filename="../transport/serial_service.cpp" line="363"/>
        <source>No VBDrive found on %1: %2</source>
        <translation type="unfinished"></translation>
    </message>
    <message>
        <location filename="../transport/serial_service.cpp" line="740"/>
        <source>the device reports itself as &apos;%1&apos;, not as a VBDrive.</source>
        <translation type="unfinished"></translation>
    </message>
    <message>
        <source>No actuator answered on %1: %2</source>
        <translation type="vanished">No actuator answered on %1: %2</translation>
    </message>
    <message>
        <location filename="../transport/serial_service.cpp" line="371"/>
        <source>Could not enter CONFIG mode: %1</source>
        <translation type="unfinished"></translation>
    </message>
    <message>
        <location filename="../transport/serial_service.cpp" line="440"/>
        <source>The actuator reported no calibration progress for %1 s.</source>
        <translation type="unfinished"></translation>
    </message>
    <message>
        <location filename="../transport/serial_service.cpp" line="481"/>
        <source>These registers were rejected by the actuator: %1</source>
        <translation>These registers were rejected by the actuator: %1</translation>
    </message>
    <message>
        <location filename="../transport/serial_service.cpp" line="582"/>
        <source>The serial connection was lost.</source>
        <translation type="unfinished"></translation>
    </message>
    <message>
        <location filename="../transport/serial_service.cpp" line="593"/>
        <source>Serial connection lost.</source>
        <translation>Serial connection lost.</translation>
    </message>
    <message>
        <location filename="../transport/serial_service.cpp" line="618"/>
        <source>The actuator did not come back after restarting.</source>
        <translation>The actuator did not come back after restarting.</translation>
    </message>
    <message>
        <location filename="../transport/serial_service.cpp" line="675"/>
        <source>The actuator did not answer in time.</source>
        <translation>The actuator did not answer in time.</translation>
    </message>
    <message>
        <location filename="../transport/serial_service.cpp" line="736"/>
        <source>Could not interpret the value &apos;%1&apos;.</source>
        <translation>Could not interpret the value &apos;%1&apos;.</translation>
    </message>
</context>
<context>
    <name>SerialWorker</name>
    <message>
        <location filename="../transport/serial_worker.cpp" line="62"/>
        <source>Port %1 opened at %2 baud.</source>
        <translation>Port %1 opened at %2 baud.</translation>
    </message>
    <message>
        <location filename="../transport/serial_worker.cpp" line="86"/>
        <source>Serial port is not open.</source>
        <translation>Serial port is not open.</translation>
    </message>
</context>
<context>
    <name>VbbootFlasher</name>
    <message>
        <location filename="../firmware/vbboot_flasher.cpp" line="217"/>
        <source>A flashing operation is already running.</source>
        <translation type="unfinished">A flashing operation is already running.</translation>
    </message>
    <message>
        <location filename="../firmware/vbboot_flasher.cpp" line="243"/>
        <source>Could not open %1: %2</source>
        <translation type="unfinished"></translation>
    </message>
    <message>
        <location filename="../firmware/vbboot_flasher.cpp" line="259"/>
        <source>%1, line %2: not an Intel HEX record.</source>
        <translation type="unfinished"></translation>
    </message>
    <message>
        <location filename="../firmware/vbboot_flasher.cpp" line="268"/>
        <source>%1, line %2: checksum mismatch.</source>
        <translation type="unfinished"></translation>
    </message>
    <message>
        <location filename="../firmware/vbboot_flasher.cpp" line="300"/>
        <source>%1 holds no VBDrive application at %2.</source>
        <translation type="unfinished"></translation>
    </message>
    <message>
        <location filename="../firmware/vbboot_flasher.cpp" line="309"/>
        <source>The application in %1 does not fit into the flash.</source>
        <translation type="unfinished"></translation>
    </message>
    <message>
        <location filename="../firmware/vbboot_flasher.cpp" line="323"/>
        <source>The actuator stays in the bootloader, and its old firmware may already be erased. Keep it selected and press Flash again.</source>
        <translation type="unfinished"></translation>
    </message>
    <message>
        <location filename="../firmware/vbboot_flasher.cpp" line="328"/>
        <source>Firmware written and verified.</source>
        <translation type="unfinished">Firmware written and verified.</translation>
    </message>
    <message>
        <location filename="../firmware/vbboot_flasher.cpp" line="342"/>
        <source>Could not open %1 for flashing: %2</source>
        <translation type="unfinished"></translation>
    </message>
    <message>
        <location filename="../firmware/vbboot_flasher.cpp" line="352"/>
        <source>Waiting for the bootloader...</source>
        <translation type="unfinished"></translation>
    </message>
    <message>
        <location filename="../firmware/vbboot_flasher.cpp" line="372"/>
        <source>The bootloader did not answer on CAN id %1. Check the CAN connection, and that the actuator&apos;s firmware supports VBBoot.</source>
        <translation type="unfinished"></translation>
    </message>
    <message>
        <location filename="../firmware/vbboot_flasher.cpp" line="383"/>
        <source>Erasing the old firmware...</source>
        <translation type="unfinished"></translation>
    </message>
    <message>
        <location filename="../firmware/vbboot_flasher.cpp" line="405"/>
        <location filename="../firmware/vbboot_flasher.cpp" line="485"/>
        <source>Flashing cancelled.</source>
        <translation type="unfinished"></translation>
    </message>
    <message>
        <location filename="../firmware/vbboot_flasher.cpp" line="415"/>
        <source>The bootloader refused the data at offset %1.</source>
        <translation type="unfinished"></translation>
    </message>
    <message>
        <location filename="../firmware/vbboot_flasher.cpp" line="425"/>
        <source>Writing the firmware: %1 of %2 bytes...</source>
        <translation type="unfinished"></translation>
    </message>
    <message>
        <location filename="../firmware/vbboot_flasher.cpp" line="439"/>
        <source>The bootloader rejected the written image: its size or CRC32 does not match. Some frames were probably lost on the bus.</source>
        <translation type="unfinished"></translation>
    </message>
    <message>
        <location filename="../firmware/vbboot_flasher.cpp" line="448"/>
        <source>Done.</source>
        <translation type="unfinished">Done.</translation>
    </message>
    <message>
        <location filename="../firmware/vbboot_flasher.cpp" line="469"/>
        <source>The bootloader refused %1.</source>
        <translation type="unfinished"></translation>
    </message>
    <message>
        <location filename="../firmware/vbboot_flasher.cpp" line="471"/>
        <source>The bootloader did not answer %1 in time: the CAN connection was probably lost.</source>
        <translation type="unfinished"></translation>
    </message>
    <message>
        <location filename="../firmware/vbboot_flasher.cpp" line="475"/>
        <source>The CAN interface went bus-off during %1. Check the wiring and the termination.</source>
        <translation type="unfinished"></translation>
    </message>
    <message>
        <location filename="../firmware/vbboot_flasher.cpp" line="480"/>
        <source>The CAN bus is not taking frames (%1): nothing acknowledges them. Check the CAN connection.</source>
        <translation type="unfinished"></translation>
    </message>
    <message>
        <location filename="../firmware/vbboot_flasher.cpp" line="483"/>
        <source>CAN error during %1: %2</source>
        <translation type="unfinished"></translation>
    </message>
</context>
<context>
    <name>plot_export</name>
    <message>
        <location filename="../ui/plot_export.cpp" line="62"/>
        <source>The plot is not initialised.</source>
        <translation type="unfinished">The plot is not initialised.</translation>
    </message>
    <message>
        <location filename="../ui/plot_export.cpp" line="67"/>
        <source>This build cannot write SVG: the Qt SVG module was not available when it was compiled. Choose PNG or JPG instead.</source>
        <translation>This build cannot write SVG: the Qt SVG module was not available when it was compiled. Choose PNG or JPG instead.</translation>
    </message>
    <message>
        <location filename="../ui/plot_export.cpp" line="98"/>
        <source>Could not write %1.</source>
        <translation type="unfinished">Could not write %1.</translation>
    </message>
</context>
</TS>
