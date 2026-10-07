<?xml version="1.0" encoding="utf-8"?>
<!DOCTYPE TS>
<TS version="2.1" language="zh_CN">
<context>
    <name>CanInterfaceList</name>
    <message>
        <location filename="../transport/can_interface_list.cpp" line="29"/>
        <source>No CAN interface selected.</source>
        <translation>未选择 CAN 接口。</translation>
    </message>
    <message>
        <location filename="../transport/can_interface_list.cpp" line="31"/>
        <source>Interface %1 is down. Bring it up, for example:
  sudo ip link set %1 up type can bitrate 500000 dbitrate 2000000 fd on</source>
        <translation>接口 %1 未启用。请启用它，例如：
  sudo ip link set %1 up type can bitrate 500000 dbitrate 2000000 fd on</translation>
    </message>
    <message>
        <location filename="../transport/can_interface_list.cpp" line="38"/>
        <source>Interface %1 is not running in CAN FD mode (MTU %2, expected %3).
VBDrive uses Cyphal over CAN FD, so an FD-capable adapter is required.</source>
        <translation>接口 %1 未运行在 CAN FD 模式（MTU %2，应为 %3）。
VBDrive 使用基于 CAN FD 的 Cyphal，因此需要支持 FD 的适配器。</translation>
    </message>
</context>
<context>
    <name>ConfigManager</name>
    <message>
        <location filename="../ui/config_manager.cpp" line="208"/>
        <location filename="../ui/config_manager.cpp" line="251"/>
        <source>Cannot write %1: %2</source>
        <translation>无法写入 %1：%2</translation>
    </message>
    <message>
        <location filename="../ui/config_manager.cpp" line="262"/>
        <source>Settings loaded.</source>
        <translation>设置已加载。</translation>
    </message>
    <message>
        <location filename="../ui/config_manager.cpp" line="264"/>
        <source>No settings file found; defaults are in use.</source>
        <translation>未找到设置文件，正在使用默认值。</translation>
    </message>
    <message>
        <location filename="../ui/config_manager.cpp" line="267"/>
        <source>Settings file could not be read; defaults are in use.</source>
        <translation>无法读取设置文件，正在使用默认值。</translation>
    </message>
</context>
<context>
    <name>CyphalBridge</name>
    <message>
        <location filename="../transport/cyphal_worker.cpp" line="139"/>
        <source>The Cyphal stack reported an internal error.</source>
        <translation>Cyphal 协议栈报告了内部错误。</translation>
    </message>
    <message>
        <location filename="../transport/cyphal_worker.cpp" line="157"/>
        <source>Could not open CAN interface %1.</source>
        <translation>无法打开 CAN 接口 %1。</translation>
    </message>
</context>
<context>
    <name>CyphalService</name>
    <message>
        <location filename="../transport/cyphal_service.cpp" line="75"/>
        <source>The CAN connection was closed.</source>
        <translation>CAN 连接已关闭。</translation>
    </message>
    <message>
        <location filename="../transport/cyphal_service.cpp" line="143"/>
        <source>No VBDrive answered on %1 within %2 seconds.</source>
        <translation>%2 秒内没有 VBDrive 在 %1 上响应。</translation>
    </message>
    <message numerus="yes">
        <location filename="../transport/cyphal_service.cpp" line="149"/>
        <source>Found %n actuator(s) on %1.</source>
        <translation>
            <numerusform>在 %1 上找到 %n 个驱动器。</numerusform>
        </translation>
    </message>
    <message>
        <location filename="../transport/cyphal_service.cpp" line="173"/>
        <source>The actuator stopped answering.</source>
        <translation>驱动器停止响应。</translation>
    </message>
    <message>
        <location filename="../transport/cyphal_service.cpp" line="180"/>
        <source>The actuator did not answer register &apos;%1&apos; in time.</source>
        <translation>驱动器未及时响应寄存器“%1”。</translation>
    </message>
    <message>
        <location filename="../transport/cyphal_service.cpp" line="208"/>
        <source>Could not send the request.</source>
        <translation>无法发送请求。</translation>
    </message>
    <message>
        <location filename="../transport/cyphal_service.cpp" line="231"/>
        <source>The actuator did not accept the value.</source>
        <translation>驱动器未接受该值。</translation>
    </message>
    <message>
        <location filename="../transport/cyphal_service.cpp" line="232"/>
        <source>Register &apos;%1&apos; is read-only.</source>
        <translation>寄存器“%1”为只读。</translation>
    </message>
    <message>
        <location filename="../transport/cyphal_service.cpp" line="243"/>
        <source>Register &apos;%1&apos; is not available on this actuator.</source>
        <translation>该驱动器上没有寄存器“%1”。</translation>
    </message>
    <message>
        <location filename="../transport/cyphal_service.cpp" line="285"/>
        <source>These registers were rejected by the actuator: %1</source>
        <translation>驱动器拒绝了这些寄存器：%1</translation>
    </message>
</context>
<context>
    <name>DeviceModel</name>
    <message>
        <location filename="../core/device_model.cpp" line="14"/>
        <source>Unknown actuator</source>
        <translation>未知驱动器</translation>
    </message>
</context>
<context>
    <name>FirmwareDownloader</name>
    <message>
        <location filename="../firmware/firmware_downloader.cpp" line="178"/>
        <source>A firmware download is already running.</source>
        <translation>固件下载已在进行中。</translation>
    </message>
    <message>
        <source>Looking up the latest release...</source>
        <translation type="vanished">正在查找最新版本...</translation>
    </message>
    <message>
        <location filename="../firmware/firmware_downloader.cpp" line="41"/>
        <source>no answer within %1 s</source>
        <translation>%1 秒内无响应</translation>
    </message>
    <message>
        <location filename="../firmware/firmware_downloader.cpp" line="113"/>
        <location filename="../firmware/firmware_downloader.cpp" line="145"/>
        <source>Could not reach the VBDrive releases: %1</source>
        <translation>无法访问 VBDrive 发布列表：%1</translation>
    </message>
    <message>
        <location filename="../firmware/firmware_downloader.cpp" line="120"/>
        <source>The VBDrive releases did not name a latest version.</source>
        <translation>VBDrive 发布页面未给出最新版本。</translation>
    </message>
    <message>
        <location filename="../firmware/firmware_downloader.cpp" line="151"/>
        <source>The VBDrive releases answered with something other than a list.</source>
        <translation>VBDrive 发布页返回的不是列表。</translation>
    </message>
    <message>
        <location filename="../firmware/firmware_downloader.cpp" line="182"/>
        <source>Release %1 does not contain %2.</source>
        <translation>版本 %1 不包含 %2。</translation>
    </message>
    <message>
        <location filename="../firmware/firmware_downloader.cpp" line="183"/>
        <source>(unknown)</source>
        <translation>（未知）</translation>
    </message>
    <message>
        <location filename="../firmware/firmware_downloader.cpp" line="192"/>
        <source>Downloading %1...</source>
        <translation>正在下载 %1...</translation>
    </message>
    <message>
        <location filename="../firmware/firmware_downloader.cpp" line="203"/>
        <source>Downloading %1: %2 of %3 (%4%)</source>
        <translation>正在下载 %1：%2 / %3（%4%）</translation>
    </message>
    <message>
        <location filename="../firmware/firmware_downloader.cpp" line="209"/>
        <source>Downloading %1: %2 received</source>
        <translation>正在下载 %1：已接收 %2</translation>
    </message>
    <message>
        <location filename="../firmware/firmware_downloader.cpp" line="225"/>
        <source>Firmware download failed: %1</source>
        <translation>固件下载失败：%1</translation>
    </message>
    <message>
        <location filename="../firmware/firmware_downloader.cpp" line="236"/>
        <location filename="../firmware/firmware_downloader.cpp" line="241"/>
        <source>Could not write %1: %2</source>
        <translation>无法写入 %1：%2</translation>
    </message>
    <message>
        <location filename="../firmware/firmware_downloader.cpp" line="245"/>
        <source>Download complete.</source>
        <translation>下载完成。</translation>
    </message>
</context>
<context>
    <name>FirmwareFlasher</name>
    <message>
        <location filename="../firmware/firmware_flasher.cpp" line="53"/>
        <source>A flashing operation is already running.</source>
        <translation>烧录操作已在进行中。</translation>
    </message>
    <message>
        <location filename="../firmware/firmware_flasher.cpp" line="57"/>
        <source>Firmware file not found: %1</source>
        <translation>未找到固件文件：%1</translation>
    </message>
    <message>
        <location filename="../firmware/firmware_flasher.cpp" line="62"/>
        <source>openocd was not found. Install it, for example:
  sudo apt install openocd</source>
        <translation>未找到 openocd。请安装，例如：
  sudo apt install openocd</translation>
    </message>
    <message>
        <location filename="../firmware/firmware_flasher.cpp" line="81"/>
        <source>openocd could not be started.</source>
        <translation>无法启动 openocd。</translation>
    </message>
    <message>
        <location filename="../firmware/firmware_flasher.cpp" line="89"/>
        <source>Done.</source>
        <translation>完成。</translation>
    </message>
    <message>
        <location filename="../firmware/firmware_flasher.cpp" line="90"/>
        <source>Firmware written and verified.</source>
        <translation>固件已写入并校验。</translation>
    </message>
    <message>
        <location filename="../firmware/firmware_flasher.cpp" line="94"/>
        <source>openocd exited with code %1.

%2</source>
        <translation>openocd 以代码 %1 退出。

%2</translation>
    </message>
    <message>
        <location filename="../firmware/firmware_flasher.cpp" line="110"/>
        <source>Starting openocd...</source>
        <translation>正在启动 openocd...</translation>
    </message>
</context>
<context>
    <name>MainWindow</name>
    <message>
        <location filename="../mainwindow.ui" line="14"/>
        <location filename="../mainwindow.ui" line="59"/>
        <location filename="../build/Desktop-Debug/VBDriveWizard_autogen/include/ui_mainwindow.h" line="2897"/>
        <location filename="../build/Desktop-Debug/VBDriveWizard_autogen/include/ui_mainwindow.h" line="2899"/>
        <source>VBDrive Wizard</source>
        <translation>VBDrive Wizard</translation>
    </message>
    <message>
        <location filename="../mainwindow.ui" line="95"/>
        <location filename="../build/Desktop-Debug/VBDriveWizard_autogen/include/ui_mainwindow.h" line="2900"/>
        <source>CONNECTION</source>
        <translation>连接</translation>
    </message>
    <message>
        <location filename="../mainwindow.ui" line="133"/>
        <location filename="../build/Desktop-Debug/VBDriveWizard_autogen/include/ui_mainwindow.h" line="2901"/>
        <source>Serial</source>
        <translation>Serial</translation>
    </message>
    <message>
        <location filename="../mainwindow.ui" line="209"/>
        <location filename="../mainwindow.ui" line="277"/>
        <location filename="../mainwindow.cpp" line="1054"/>
        <location filename="../mainwindow.cpp" line="1322"/>
        <location filename="../mainwindow.cpp" line="1323"/>
        <location filename="../build/Desktop-Debug/VBDriveWizard_autogen/include/ui_mainwindow.h" line="2903"/>
        <location filename="../build/Desktop-Debug/VBDriveWizard_autogen/include/ui_mainwindow.h" line="2908"/>
        <source>Connect</source>
        <translation>连接</translation>
    </message>
    <message>
        <location filename="../mainwindow.ui" line="222"/>
        <location filename="../mainwindow.ui" line="293"/>
        <location filename="../build/Desktop-Debug/VBDriveWizard_autogen/include/ui_mainwindow.h" line="2905"/>
        <location filename="../build/Desktop-Debug/VBDriveWizard_autogen/include/ui_mainwindow.h" line="2910"/>
        <source>Refresh</source>
        <translation>刷新</translation>
    </message>
    <message>
        <location filename="../mainwindow.ui" line="146"/>
        <location filename="../mainwindow.ui" line="705"/>
        <location filename="../build/Desktop-Debug/VBDriveWizard_autogen/include/ui_mainwindow.h" line="2902"/>
        <location filename="../build/Desktop-Debug/VBDriveWizard_autogen/include/ui_mainwindow.h" line="2952"/>
        <source>CAN</source>
        <translation>CAN</translation>
    </message>
    <message>
        <location filename="../mainwindow.ui" line="323"/>
        <location filename="../build/Desktop-Debug/VBDriveWizard_autogen/include/ui_mainwindow.h" line="2913"/>
        <source>DEVICES</source>
        <translation>设备</translation>
    </message>
    <message>
        <location filename="../mainwindow.ui" line="422"/>
        <location filename="../build/Desktop-Debug/VBDriveWizard_autogen/include/ui_mainwindow.h" line="2918"/>
        <source>CONFIGURATION</source>
        <translation>配置</translation>
    </message>
    <message>
        <location filename="../mainwindow.ui" line="447"/>
        <location filename="../build/Desktop-Debug/VBDriveWizard_autogen/include/ui_mainwindow.h" line="2937"/>
        <source>Basic</source>
        <translation>基本</translation>
    </message>
    <message>
        <location filename="../mainwindow.ui" line="468"/>
        <location filename="../build/Desktop-Debug/VBDriveWizard_autogen/include/ui_mainwindow.h" line="2919"/>
        <source>Limits</source>
        <translation>限制</translation>
    </message>
    <message>
        <location filename="../mainwindow.ui" line="621"/>
        <location filename="../mainwindow.ui" line="4576"/>
        <location filename="../build/Desktop-Debug/VBDriveWizard_autogen/include/ui_mainwindow.h" line="2932"/>
        <location filename="../build/Desktop-Debug/VBDriveWizard_autogen/include/ui_mainwindow.h" line="3109"/>
        <source>Angle</source>
        <translation>角度</translation>
    </message>
    <message>
        <location filename="../mainwindow.ui" line="555"/>
        <location filename="../build/Desktop-Debug/VBDriveWizard_autogen/include/ui_mainwindow.h" line="2925"/>
        <source>min:</source>
        <translation>最小:</translation>
    </message>
    <message>
        <location filename="../mainwindow.ui" line="600"/>
        <location filename="../build/Desktop-Debug/VBDriveWizard_autogen/include/ui_mainwindow.h" line="2929"/>
        <source>max</source>
        <translation>最大</translation>
    </message>
    <message>
        <location filename="../mainwindow.ui" line="607"/>
        <location filename="../mainwindow.ui" line="1716"/>
        <location filename="../mainwindow.ui" line="4044"/>
        <location filename="../mainwindow.ui" line="4240"/>
        <location filename="../build/Desktop-Debug/VBDriveWizard_autogen/include/ui_mainwindow.h" line="2930"/>
        <location filename="../build/Desktop-Debug/VBDriveWizard_autogen/include/ui_mainwindow.h" line="2995"/>
        <location filename="../build/Desktop-Debug/VBDriveWizard_autogen/include/ui_mainwindow.h" line="3081"/>
        <location filename="../build/Desktop-Debug/VBDriveWizard_autogen/include/ui_mainwindow.h" line="3087"/>
        <source>Velocity</source>
        <translation>速度</translation>
    </message>
    <message>
        <location filename="../mainwindow.ui" line="614"/>
        <location filename="../mainwindow.ui" line="1721"/>
        <location filename="../mainwindow.ui" line="2086"/>
        <location filename="../mainwindow.ui" line="4074"/>
        <location filename="../mainwindow.ui" line="4250"/>
        <location filename="../build/Desktop-Debug/VBDriveWizard_autogen/include/ui_mainwindow.h" line="2931"/>
        <location filename="../build/Desktop-Debug/VBDriveWizard_autogen/include/ui_mainwindow.h" line="2996"/>
        <location filename="../build/Desktop-Debug/VBDriveWizard_autogen/include/ui_mainwindow.h" line="3030"/>
        <location filename="../build/Desktop-Debug/VBDriveWizard_autogen/include/ui_mainwindow.h" line="3082"/>
        <location filename="../build/Desktop-Debug/VBDriveWizard_autogen/include/ui_mainwindow.h" line="3088"/>
        <source>Torque</source>
        <translation>转矩</translation>
    </message>
    <message>
        <location filename="../mainwindow.ui" line="650"/>
        <location filename="../build/Desktop-Debug/VBDriveWizard_autogen/include/ui_mainwindow.h" line="2936"/>
        <source>Voltage</source>
        <translation>电压</translation>
    </message>
    <message>
        <location filename="../mainwindow.ui" line="581"/>
        <location filename="../mainwindow.ui" line="647"/>
        <location filename="../build/Desktop-Debug/VBDriveWizard_autogen/include/ui_mainwindow.h" line="2927"/>
        <location filename="../build/Desktop-Debug/VBDriveWizard_autogen/include/ui_mainwindow.h" line="2934"/>
        <source>The firmware exposes no voltage limit register yet.</source>
        <translation>固件尚未提供电压限制寄存器。</translation>
    </message>
    <message>
        <location filename="../mainwindow.ui" line="548"/>
        <location filename="../mainwindow.ui" line="1731"/>
        <location filename="../build/Desktop-Debug/VBDriveWizard_autogen/include/ui_mainwindow.h" line="2924"/>
        <location filename="../build/Desktop-Debug/VBDriveWizard_autogen/include/ui_mainwindow.h" line="2998"/>
        <source>Current</source>
        <translation>电流</translation>
    </message>
    <message>
        <location filename="../mainwindow.ui" line="541"/>
        <location filename="../build/Desktop-Debug/VBDriveWizard_autogen/include/ui_mainwindow.h" line="2923"/>
        <source>Direction</source>
        <translation>方向</translation>
    </message>
    <message>
        <location filename="../mainwindow.ui" line="406"/>
        <location filename="../mainwindow.ui" line="978"/>
        <location filename="../mainwindow.ui" line="4492"/>
        <location filename="../build/Desktop-Debug/VBDriveWizard_autogen/include/ui_mainwindow.h" line="2917"/>
        <location filename="../build/Desktop-Debug/VBDriveWizard_autogen/include/ui_mainwindow.h" line="2960"/>
        <location filename="../build/Desktop-Debug/VBDriveWizard_autogen/include/ui_mainwindow.h" line="3097"/>
        <source>Name</source>
        <translation>名称</translation>
    </message>
    <message>
        <location filename="../mainwindow.ui" line="411"/>
        <location filename="../build/Desktop-Debug/VBDriveWizard_autogen/include/ui_mainwindow.h" line="2916"/>
        <source>CAN ID</source>
        <translation>CAN ID</translation>
    </message>
    <message>
        <location filename="../mainwindow.ui" line="512"/>
        <location filename="../build/Desktop-Debug/VBDriveWizard_autogen/include/ui_mainwindow.h" line="2920"/>
        <source>CCW</source>
        <translation>逆时针</translation>
    </message>
    <message>
        <location filename="../mainwindow.ui" line="517"/>
        <location filename="../build/Desktop-Debug/VBDriveWizard_autogen/include/ui_mainwindow.h" line="2921"/>
        <source>CW</source>
        <translation>顺时针</translation>
    </message>
    <message>
        <location filename="../mainwindow.ui" line="729"/>
        <location filename="../build/Desktop-Debug/VBDriveWizard_autogen/include/ui_mainwindow.h" line="2938"/>
        <source>Data Baud Rate</source>
        <translation>数据段波特率</translation>
    </message>
    <message>
        <location filename="../mainwindow.ui" line="736"/>
        <location filename="../build/Desktop-Debug/VBDriveWizard_autogen/include/ui_mainwindow.h" line="2939"/>
        <source>Node ID</source>
        <translation>Node ID</translation>
    </message>
    <message>
        <location filename="../mainwindow.ui" line="763"/>
        <location filename="../build/Desktop-Debug/VBDriveWizard_autogen/include/ui_mainwindow.h" line="2940"/>
        <source>62.5 kHz</source>
        <translation>62.5 kHz</translation>
    </message>
    <message>
        <location filename="../mainwindow.ui" line="768"/>
        <location filename="../build/Desktop-Debug/VBDriveWizard_autogen/include/ui_mainwindow.h" line="2941"/>
        <source>125 kHz</source>
        <translation>125 kHz</translation>
    </message>
    <message>
        <location filename="../mainwindow.ui" line="773"/>
        <location filename="../build/Desktop-Debug/VBDriveWizard_autogen/include/ui_mainwindow.h" line="2942"/>
        <source>250 kHz</source>
        <translation>250 kHz</translation>
    </message>
    <message>
        <location filename="../mainwindow.ui" line="778"/>
        <location filename="../build/Desktop-Debug/VBDriveWizard_autogen/include/ui_mainwindow.h" line="2943"/>
        <source>500 kHz</source>
        <translation>500 kHz</translation>
    </message>
    <message>
        <location filename="../mainwindow.ui" line="783"/>
        <location filename="../mainwindow.ui" line="795"/>
        <location filename="../build/Desktop-Debug/VBDriveWizard_autogen/include/ui_mainwindow.h" line="2944"/>
        <location filename="../build/Desktop-Debug/VBDriveWizard_autogen/include/ui_mainwindow.h" line="2946"/>
        <source>1 MHz</source>
        <translation>1 MHz</translation>
    </message>
    <message>
        <location filename="../mainwindow.ui" line="800"/>
        <location filename="../build/Desktop-Debug/VBDriveWizard_autogen/include/ui_mainwindow.h" line="2947"/>
        <source>2 MHz</source>
        <translation>2 MHz</translation>
    </message>
    <message>
        <location filename="../mainwindow.ui" line="805"/>
        <location filename="../build/Desktop-Debug/VBDriveWizard_autogen/include/ui_mainwindow.h" line="2948"/>
        <source>4 MHz</source>
        <translation>4 MHz</translation>
    </message>
    <message>
        <location filename="../mainwindow.ui" line="810"/>
        <location filename="../build/Desktop-Debug/VBDriveWizard_autogen/include/ui_mainwindow.h" line="2949"/>
        <source>8 MHz</source>
        <translation>8 MHz</translation>
    </message>
    <message>
        <location filename="../mainwindow.ui" line="818"/>
        <location filename="../build/Desktop-Debug/VBDriveWizard_autogen/include/ui_mainwindow.h" line="2951"/>
        <source>Nominal Baud Rate</source>
        <translation>标称波特率</translation>
    </message>
    <message>
        <location filename="../mainwindow.ui" line="869"/>
        <location filename="../build/Desktop-Debug/VBDriveWizard_autogen/include/ui_mainwindow.h" line="2971"/>
        <source>Advanced</source>
        <translation>高级</translation>
    </message>
    <message>
        <location filename="../mainwindow.ui" line="926"/>
        <location filename="../build/Desktop-Debug/VBDriveWizard_autogen/include/ui_mainwindow.h" line="2953"/>
        <source>Gear Ratio</source>
        <translation>减速比</translation>
    </message>
    <message>
        <location filename="../mainwindow.ui" line="1001"/>
        <location filename="../mainwindow.ui" line="1736"/>
        <location filename="../build/Desktop-Debug/VBDriveWizard_autogen/include/ui_mainwindow.h" line="2961"/>
        <location filename="../build/Desktop-Debug/VBDriveWizard_autogen/include/ui_mainwindow.h" line="2999"/>
        <source>Encoder</source>
        <translation>编码器</translation>
    </message>
    <message>
        <location filename="../mainwindow.ui" line="1190"/>
        <location filename="../build/Desktop-Debug/VBDriveWizard_autogen/include/ui_mainwindow.h" line="2969"/>
        <source>Torque const</source>
        <translation>转矩常数</translation>
    </message>
    <message>
        <location filename="../mainwindow.ui" line="1173"/>
        <location filename="../build/Desktop-Debug/VBDriveWizard_autogen/include/ui_mainwindow.h" line="2967"/>
        <source>Current Kp</source>
        <translation>电流 Kp</translation>
    </message>
    <message>
        <location filename="../mainwindow.ui" line="1166"/>
        <location filename="../build/Desktop-Debug/VBDriveWizard_autogen/include/ui_mainwindow.h" line="2966"/>
        <source>Current Ki</source>
        <translation>电流 Ki</translation>
    </message>
    <message>
        <location filename="../mainwindow.ui" line="1072"/>
        <location filename="../build/Desktop-Debug/VBDriveWizard_autogen/include/ui_mainwindow.h" line="2962"/>
        <source>Position Offset</source>
        <translation>位置偏移</translation>
    </message>
    <message>
        <location filename="../mainwindow.ui" line="1085"/>
        <location filename="../build/Desktop-Debug/VBDriveWizard_autogen/include/ui_mainwindow.h" line="2963"/>
        <source>Main Filter Param A</source>
        <translation>主滤波器参数 A</translation>
    </message>
    <message>
        <location filename="../mainwindow.ui" line="1180"/>
        <location filename="../build/Desktop-Debug/VBDriveWizard_autogen/include/ui_mainwindow.h" line="2968"/>
        <source>Filter Gain 1</source>
        <translation>滤波增益 1</translation>
    </message>
    <message>
        <location filename="../mainwindow.ui" line="1143"/>
        <location filename="../build/Desktop-Debug/VBDriveWizard_autogen/include/ui_mainwindow.h" line="2965"/>
        <source>Filter Gain 2</source>
        <translation>滤波增益 2</translation>
    </message>
    <message>
        <location filename="../mainwindow.ui" line="949"/>
        <location filename="../build/Desktop-Debug/VBDriveWizard_autogen/include/ui_mainwindow.h" line="2955"/>
        <source>Filter Gain 3</source>
        <translation>滤波增益 3</translation>
    </message>
    <message>
        <location filename="../mainwindow.ui" line="1111"/>
        <location filename="../build/Desktop-Debug/VBDriveWizard_autogen/include/ui_mainwindow.h" line="2964"/>
        <source>Current LPF Gain</source>
        <translation>电流低通滤波增益</translation>
    </message>
    <message>
        <location filename="../mainwindow.ui" line="960"/>
        <location filename="../build/Desktop-Debug/VBDriveWizard_autogen/include/ui_mainwindow.h" line="2956"/>
        <source>rotor</source>
        <translation>转子</translation>
    </message>
    <message>
        <location filename="../mainwindow.ui" line="965"/>
        <location filename="../build/Desktop-Debug/VBDriveWizard_autogen/include/ui_mainwindow.h" line="2957"/>
        <source>shaft</source>
        <translation>输出轴</translation>
    </message>
    <message>
        <location filename="../mainwindow.ui" line="970"/>
        <location filename="../build/Desktop-Debug/VBDriveWizard_autogen/include/ui_mainwindow.h" line="2958"/>
        <source>external</source>
        <translation>外部</translation>
    </message>
    <message>
        <location filename="../mainwindow.ui" line="942"/>
        <location filename="../build/Desktop-Debug/VBDriveWizard_autogen/include/ui_mainwindow.h" line="2954"/>
        <source>Current Kd</source>
        <translation>电流 Kd</translation>
    </message>
    <message>
        <location filename="../mainwindow.ui" line="1279"/>
        <location filename="../build/Desktop-Debug/VBDriveWizard_autogen/include/ui_mainwindow.h" line="2988"/>
        <source>System</source>
        <translation>系统</translation>
    </message>
    <message>
        <location filename="../mainwindow.ui" line="1300"/>
        <location filename="../build/Desktop-Debug/VBDriveWizard_autogen/include/ui_mainwindow.h" line="2972"/>
        <source>Sensor</source>
        <translation>传感器</translation>
    </message>
    <message>
        <location filename="../mainwindow.ui" line="1327"/>
        <location filename="../build/Desktop-Debug/VBDriveWizard_autogen/include/ui_mainwindow.h" line="2973"/>
        <source>Calibrate</source>
        <translation>校准</translation>
    </message>
    <message>
        <location filename="../mainwindow.ui" line="1353"/>
        <location filename="../build/Desktop-Debug/VBDriveWizard_autogen/include/ui_mainwindow.h" line="2974"/>
        <source>Register Parameters</source>
        <translation>寄存器参数</translation>
    </message>
    <message>
        <location filename="../mainwindow.ui" line="1377"/>
        <location filename="../build/Desktop-Debug/VBDriveWizard_autogen/include/ui_mainwindow.h" line="2975"/>
        <source>Save to File...</source>
        <translation>保存到文件...</translation>
    </message>
    <message>
        <location filename="../mainwindow.ui" line="1384"/>
        <location filename="../build/Desktop-Debug/VBDriveWizard_autogen/include/ui_mainwindow.h" line="2976"/>
        <source>Load from File...</source>
        <translation>从文件加载...</translation>
    </message>
    <message>
        <location filename="../mainwindow.ui" line="1391"/>
        <location filename="../build/Desktop-Debug/VBDriveWizard_autogen/include/ui_mainwindow.h" line="2977"/>
        <source>Restore to Default</source>
        <translation>恢复默认值</translation>
    </message>
    <message>
        <location filename="../mainwindow.ui" line="1401"/>
        <location filename="../build/Desktop-Debug/VBDriveWizard_autogen/include/ui_mainwindow.h" line="2978"/>
        <source>Firmware</source>
        <translation>固件</translation>
    </message>
    <message>
        <location filename="../mainwindow.ui" line="1445"/>
        <location filename="../build/Desktop-Debug/VBDriveWizard_autogen/include/ui_mainwindow.h" line="2979"/>
        <source>Current Revision:</source>
        <translation>当前版本：</translation>
    </message>
    <message>
        <location filename="../mainwindow.ui" line="1452"/>
        <location filename="../build/Desktop-Debug/VBDriveWizard_autogen/include/ui_mainwindow.h" line="2980"/>
        <source>0.0.1</source>
        <translation>0.0.1</translation>
    </message>
    <message>
        <source>Choose file</source>
        <translation type="vanished">选择文件</translation>
    </message>
    <message>
        <location filename="../mainwindow.ui" line="1526"/>
        <location filename="../build/Desktop-Debug/VBDriveWizard_autogen/include/ui_mainwindow.h" line="2983"/>
        <source>Open</source>
        <translation>打开</translation>
    </message>
    <message>
        <source>Download from remote repo</source>
        <translation type="vanished">从远程仓库下载</translation>
    </message>
    <message>
        <location filename="../mainwindow.ui" line="1581"/>
        <location filename="../build/Desktop-Debug/VBDriveWizard_autogen/include/ui_mainwindow.h" line="2987"/>
        <source>Flash</source>
        <translation>烧录</translation>
    </message>
    <message>
        <location filename="../mainwindow.ui" line="1634"/>
        <location filename="../build/Desktop-Debug/VBDriveWizard_autogen/include/ui_mainwindow.h" line="2989"/>
        <source>Read</source>
        <translation>读取</translation>
    </message>
    <message>
        <location filename="../mainwindow.ui" line="1641"/>
        <location filename="../build/Desktop-Debug/VBDriveWizard_autogen/include/ui_mainwindow.h" line="2990"/>
        <source>Write</source>
        <translation>写入</translation>
    </message>
    <message>
        <location filename="../mainwindow.ui" line="1648"/>
        <location filename="../build/Desktop-Debug/VBDriveWizard_autogen/include/ui_mainwindow.h" line="2991"/>
        <source>Set Origin</source>
        <translation>设为零点</translation>
    </message>
    <message>
        <source>&lt;html&gt;&lt;head/&gt;&lt;body&gt;&lt;p align=&quot;center&quot;&gt;Logo&lt;/p&gt;&lt;/body&gt;&lt;/html&gt;</source>
        <translation type="vanished">&lt;html&gt;&lt;head/&gt;&lt;body&gt;&lt;p align=&quot;center&quot;&gt;Logo&lt;/p&gt;&lt;/body&gt;&lt;/html&gt;</translation>
    </message>
    <message>
        <location filename="../mainwindow.ui" line="1662"/>
        <location filename="../build/Desktop-Debug/VBDriveWizard_autogen/include/ui_mainwindow.h" line="2992"/>
        <source>REALTIME DATA</source>
        <translation>实时数据</translation>
    </message>
    <message>
        <location filename="../mainwindow.ui" line="1703"/>
        <location filename="../build/Desktop-Debug/VBDriveWizard_autogen/include/ui_mainwindow.h" line="2993"/>
        <source>Signal:</source>
        <translation>信号：</translation>
    </message>
    <message>
        <location filename="../mainwindow.ui" line="1711"/>
        <location filename="../mainwindow.ui" line="4014"/>
        <location filename="../mainwindow.ui" line="4227"/>
        <location filename="../build/Desktop-Debug/VBDriveWizard_autogen/include/ui_mainwindow.h" line="2994"/>
        <location filename="../build/Desktop-Debug/VBDriveWizard_autogen/include/ui_mainwindow.h" line="3080"/>
        <location filename="../build/Desktop-Debug/VBDriveWizard_autogen/include/ui_mainwindow.h" line="3086"/>
        <source>Position</source>
        <translation>位置</translation>
    </message>
    <message>
        <location filename="../mainwindow.ui" line="1726"/>
        <location filename="../build/Desktop-Debug/VBDriveWizard_autogen/include/ui_mainwindow.h" line="2997"/>
        <source>Temperature</source>
        <translation>温度</translation>
    </message>
    <message>
        <location filename="../mainwindow.ui" line="1741"/>
        <location filename="../build/Desktop-Debug/VBDriveWizard_autogen/include/ui_mainwindow.h" line="3000"/>
        <source>Log</source>
        <translation>日志</translation>
    </message>
    <message>
        <location filename="../mainwindow.ui" line="1749"/>
        <location filename="../build/Desktop-Debug/VBDriveWizard_autogen/include/ui_mainwindow.h" line="3002"/>
        <source>Units:</source>
        <translation>单位：</translation>
    </message>
    <message>
        <location filename="../mainwindow.ui" line="1757"/>
        <location filename="../mainwindow.ui" line="4590"/>
        <location filename="../build/Desktop-Debug/VBDriveWizard_autogen/include/ui_mainwindow.h" line="3003"/>
        <location filename="../build/Desktop-Debug/VBDriveWizard_autogen/include/ui_mainwindow.h" line="3111"/>
        <source>rad</source>
        <translation>rad</translation>
    </message>
    <message>
        <location filename="../mainwindow.ui" line="1762"/>
        <location filename="../build/Desktop-Debug/VBDriveWizard_autogen/include/ui_mainwindow.h" line="3004"/>
        <source>deg</source>
        <translation>deg</translation>
    </message>
    <message>
        <location filename="../mainwindow.ui" line="1783"/>
        <location filename="../build/Desktop-Debug/VBDriveWizard_autogen/include/ui_mainwindow.h" line="3007"/>
        <source>Preferences</source>
        <translation>首选项</translation>
    </message>
    <message>
        <source>Pause</source>
        <translation type="vanished">暂停</translation>
    </message>
    <message>
        <source>Save as CSV...</source>
        <translation type="vanished">保存为 CSV...</translation>
    </message>
    <message>
        <source>Save as PNG...</source>
        <translation type="vanished">保存为 PNG...</translation>
    </message>
    <message>
        <location filename="../mainwindow.ui" line="1908"/>
        <location filename="../build/Desktop-Debug/VBDriveWizard_autogen/include/ui_mainwindow.h" line="3022"/>
        <source>X:</source>
        <translation>X:</translation>
    </message>
    <message>
        <location filename="../mainwindow.ui" line="1922"/>
        <location filename="../build/Desktop-Debug/VBDriveWizard_autogen/include/ui_mainwindow.h" line="3023"/>
        <source>Y:</source>
        <translation>Y:</translation>
    </message>
    <message>
        <location filename="../mainwindow.ui" line="1943"/>
        <location filename="../build/Desktop-Debug/VBDriveWizard_autogen/include/ui_mainwindow.h" line="3024"/>
        <source>Dist X:</source>
        <translation>ΔX:</translation>
    </message>
    <message>
        <location filename="../mainwindow.ui" line="1957"/>
        <location filename="../build/Desktop-Debug/VBDriveWizard_autogen/include/ui_mainwindow.h" line="3025"/>
        <source>Dist Y:</source>
        <translation>ΔY:</translation>
    </message>
    <message>
        <location filename="../mainwindow.ui" line="1993"/>
        <location filename="../build/Desktop-Debug/VBDriveWizard_autogen/include/ui_mainwindow.h" line="3026"/>
        <source>CONTROL</source>
        <translation>控制</translation>
    </message>
    <message>
        <location filename="../mainwindow.ui" line="2021"/>
        <location filename="../build/Desktop-Debug/VBDriveWizard_autogen/include/ui_mainwindow.h" line="3073"/>
        <source>Servo</source>
        <translation>Servo</translation>
    </message>
    <message>
        <location filename="../mainwindow.ui" line="2042"/>
        <location filename="../build/Desktop-Debug/VBDriveWizard_autogen/include/ui_mainwindow.h" line="3027"/>
        <source>Control Type</source>
        <translation>控制类型</translation>
    </message>
    <message>
        <location filename="../mainwindow.ui" line="2122"/>
        <location filename="../build/Desktop-Debug/VBDriveWizard_autogen/include/ui_mainwindow.h" line="3032"/>
        <source>Transient Form</source>
        <translation>过渡过程</translation>
    </message>
    <message>
        <source>Linear</source>
        <translation type="vanished">线性</translation>
    </message>
    <message>
        <source>Polynomial</source>
        <translation type="vanished">多项式</translation>
    </message>
    <message>
        <location filename="../mainwindow.ui" line="2520"/>
        <location filename="../mainwindow.ui" line="2695"/>
        <location filename="../mainwindow.ui" line="2824"/>
        <location filename="../mainwindow.ui" line="3038"/>
        <location filename="../mainwindow.ui" line="3191"/>
        <location filename="../build/Desktop-Debug/VBDriveWizard_autogen/include/ui_mainwindow.h" line="3042"/>
        <location filename="../build/Desktop-Debug/VBDriveWizard_autogen/include/ui_mainwindow.h" line="3046"/>
        <location filename="../build/Desktop-Debug/VBDriveWizard_autogen/include/ui_mainwindow.h" line="3048"/>
        <location filename="../build/Desktop-Debug/VBDriveWizard_autogen/include/ui_mainwindow.h" line="3053"/>
        <location filename="../build/Desktop-Debug/VBDriveWizard_autogen/include/ui_mainwindow.h" line="3056"/>
        <source>Set</source>
        <translation>设置</translation>
    </message>
    <message>
        <location filename="../mainwindow.ui" line="2840"/>
        <location filename="../build/Desktop-Debug/VBDriveWizard_autogen/include/ui_mainwindow.h" line="3049"/>
        <source>Feedback Gains</source>
        <translation>反馈增益</translation>
    </message>
    <message>
        <location filename="../mainwindow.ui" line="2903"/>
        <location filename="../mainwindow.ui" line="3086"/>
        <location filename="../build/Desktop-Debug/VBDriveWizard_autogen/include/ui_mainwindow.h" line="3050"/>
        <location filename="../build/Desktop-Debug/VBDriveWizard_autogen/include/ui_mainwindow.h" line="3054"/>
        <source>Kp:</source>
        <translation>Kp:</translation>
    </message>
    <message>
        <location filename="../mainwindow.ui" line="2933"/>
        <location filename="../mainwindow.ui" line="3116"/>
        <location filename="../build/Desktop-Debug/VBDriveWizard_autogen/include/ui_mainwindow.h" line="3051"/>
        <location filename="../build/Desktop-Debug/VBDriveWizard_autogen/include/ui_mainwindow.h" line="3055"/>
        <source>Ki:</source>
        <translation>Ki:</translation>
    </message>
    <message>
        <location filename="../mainwindow.ui" line="2963"/>
        <location filename="../build/Desktop-Debug/VBDriveWizard_autogen/include/ui_mainwindow.h" line="3052"/>
        <source>Kd:</source>
        <translation>Kd:</translation>
    </message>
    <message>
        <location filename="../mainwindow.ui" line="3269"/>
        <location filename="../build/Desktop-Debug/VBDriveWizard_autogen/include/ui_mainwindow.h" line="3060"/>
        <source>User</source>
        <translation>手动</translation>
    </message>
    <message>
        <source>Target pos:</source>
        <translation type="vanished">目标位置：</translation>
    </message>
    <message>
        <location filename="../mainwindow.ui" line="3382"/>
        <location filename="../mainwindow.ui" line="3538"/>
        <location filename="../mainwindow.ui" line="3694"/>
        <location filename="../mainwindow.ui" line="3850"/>
        <location filename="../mainwindow.ui" line="4452"/>
        <location filename="../mainwindow.cpp" line="2853"/>
        <location filename="../build/Desktop-Debug/VBDriveWizard_autogen/include/ui_mainwindow.h" line="3059"/>
        <location filename="../build/Desktop-Debug/VBDriveWizard_autogen/include/ui_mainwindow.h" line="3063"/>
        <location filename="../build/Desktop-Debug/VBDriveWizard_autogen/include/ui_mainwindow.h" line="3067"/>
        <location filename="../build/Desktop-Debug/VBDriveWizard_autogen/include/ui_mainwindow.h" line="3071"/>
        <location filename="../build/Desktop-Debug/VBDriveWizard_autogen/include/ui_mainwindow.h" line="3094"/>
        <source>Start</source>
        <translation>启动</translation>
    </message>
    <message>
        <location filename="../mainwindow.ui" line="3392"/>
        <location filename="../mainwindow.ui" line="3919"/>
        <location filename="../build/Desktop-Debug/VBDriveWizard_autogen/include/ui_mainwindow.h" line="3064"/>
        <location filename="../build/Desktop-Debug/VBDriveWizard_autogen/include/ui_mainwindow.h" line="3076"/>
        <source>Sin</source>
        <translation>正弦</translation>
    </message>
    <message>
        <location filename="../mainwindow.ui" line="3433"/>
        <location filename="../mainwindow.ui" line="3589"/>
        <location filename="../mainwindow.ui" line="3745"/>
        <location filename="../mainwindow.ui" line="4282"/>
        <location filename="../build/Desktop-Debug/VBDriveWizard_autogen/include/ui_mainwindow.h" line="3061"/>
        <location filename="../build/Desktop-Debug/VBDriveWizard_autogen/include/ui_mainwindow.h" line="3065"/>
        <location filename="../build/Desktop-Debug/VBDriveWizard_autogen/include/ui_mainwindow.h" line="3069"/>
        <location filename="../build/Desktop-Debug/VBDriveWizard_autogen/include/ui_mainwindow.h" line="3090"/>
        <source>Amplitude</source>
        <translation>幅值</translation>
    </message>
    <message>
        <location filename="../mainwindow.ui" line="3463"/>
        <location filename="../mainwindow.ui" line="3619"/>
        <location filename="../mainwindow.ui" line="3775"/>
        <location filename="../mainwindow.ui" line="4312"/>
        <location filename="../build/Desktop-Debug/VBDriveWizard_autogen/include/ui_mainwindow.h" line="3062"/>
        <location filename="../build/Desktop-Debug/VBDriveWizard_autogen/include/ui_mainwindow.h" line="3066"/>
        <location filename="../build/Desktop-Debug/VBDriveWizard_autogen/include/ui_mainwindow.h" line="3070"/>
        <location filename="../build/Desktop-Debug/VBDriveWizard_autogen/include/ui_mainwindow.h" line="3091"/>
        <source>Frequency</source>
        <translation>频率</translation>
    </message>
    <message>
        <location filename="../mainwindow.ui" line="3548"/>
        <location filename="../mainwindow.ui" line="3929"/>
        <location filename="../build/Desktop-Debug/VBDriveWizard_autogen/include/ui_mainwindow.h" line="3068"/>
        <location filename="../build/Desktop-Debug/VBDriveWizard_autogen/include/ui_mainwindow.h" line="3077"/>
        <source>Meander</source>
        <translation>方波</translation>
    </message>
    <message>
        <location filename="../mainwindow.ui" line="3704"/>
        <location filename="../mainwindow.ui" line="3939"/>
        <location filename="../build/Desktop-Debug/VBDriveWizard_autogen/include/ui_mainwindow.h" line="3072"/>
        <location filename="../build/Desktop-Debug/VBDriveWizard_autogen/include/ui_mainwindow.h" line="3078"/>
        <source>Triangle</source>
        <translation>三角波</translation>
    </message>
    <message>
        <location filename="../mainwindow.ui" line="3864"/>
        <location filename="../build/Desktop-Debug/VBDriveWizard_autogen/include/ui_mainwindow.h" line="3095"/>
        <source>MIT</source>
        <translation>MIT</translation>
    </message>
    <message>
        <location filename="../mainwindow.ui" line="3885"/>
        <location filename="../build/Desktop-Debug/VBDriveWizard_autogen/include/ui_mainwindow.h" line="3074"/>
        <source>Trajectory</source>
        <translation>轨迹</translation>
    </message>
    <message>
        <location filename="../mainwindow.ui" line="3906"/>
        <location filename="../build/Desktop-Debug/VBDriveWizard_autogen/include/ui_mainwindow.h" line="3075"/>
        <source>Step</source>
        <translation>阶跃</translation>
    </message>
    <message>
        <location filename="../mainwindow.ui" line="3987"/>
        <location filename="../build/Desktop-Debug/VBDriveWizard_autogen/include/ui_mainwindow.h" line="3079"/>
        <source>Step Targets</source>
        <translation>阶跃参数</translation>
    </message>
    <message>
        <location filename="../mainwindow.ui" line="4104"/>
        <location filename="../mainwindow.ui" line="4342"/>
        <location filename="../build/Desktop-Debug/VBDriveWizard_autogen/include/ui_mainwindow.h" line="3083"/>
        <location filename="../build/Desktop-Debug/VBDriveWizard_autogen/include/ui_mainwindow.h" line="3092"/>
        <source>Kp</source>
        <translation>Kp</translation>
    </message>
    <message>
        <location filename="../mainwindow.ui" line="4134"/>
        <location filename="../mainwindow.ui" line="4372"/>
        <location filename="../build/Desktop-Debug/VBDriveWizard_autogen/include/ui_mainwindow.h" line="3084"/>
        <location filename="../build/Desktop-Debug/VBDriveWizard_autogen/include/ui_mainwindow.h" line="3093"/>
        <source>Kd</source>
        <translation>Kd</translation>
    </message>
    <message>
        <location filename="../mainwindow.ui" line="4186"/>
        <location filename="../build/Desktop-Debug/VBDriveWizard_autogen/include/ui_mainwindow.h" line="3085"/>
        <source>Trajectory Targets</source>
        <translation>轨迹参数</translation>
    </message>
    <message>
        <location filename="../mainwindow.ui" line="4275"/>
        <location filename="../build/Desktop-Debug/VBDriveWizard_autogen/include/ui_mainwindow.h" line="3089"/>
        <source>+derivative</source>
        <translation>+导数</translation>
    </message>
    <message>
        <location filename="../mainwindow.ui" line="4468"/>
        <location filename="../build/Desktop-Debug/VBDriveWizard_autogen/include/ui_mainwindow.h" line="3096"/>
        <source>STATUS</source>
        <translation>状态</translation>
    </message>
    <message>
        <source>Model</source>
        <translation type="vanished">型号</translation>
    </message>
    <message>
        <location filename="../mainwindow.ui" line="1825"/>
        <location filename="../build/Desktop-Debug/VBDriveWizard_autogen/include/ui_mainwindow.h" line="3011"/>
        <source>Play/Pause Plot Data</source>
        <translation type="unfinished"></translation>
    </message>
    <message>
        <location filename="../mainwindow.ui" line="1865"/>
        <location filename="../build/Desktop-Debug/VBDriveWizard_autogen/include/ui_mainwindow.h" line="3019"/>
        <source>Crosshair</source>
        <translation>十字光标</translation>
    </message>
    <message>
        <location filename="../mainwindow.ui" line="1845"/>
        <location filename="../build/Desktop-Debug/VBDriveWizard_autogen/include/ui_mainwindow.h" line="3015"/>
        <source>Save as...</source>
        <translation>另存为...</translation>
    </message>
    <message>
        <location filename="../mainwindow.ui" line="1267"/>
        <location filename="../build/Desktop-Debug/VBDriveWizard_autogen/include/ui_mainwindow.h" line="2970"/>
        <source>Current Limit</source>
        <translation>电流限制</translation>
    </message>
    <message>
        <location filename="../mainwindow.ui" line="1495"/>
        <location filename="../build/Desktop-Debug/VBDriveWizard_autogen/include/ui_mainwindow.h" line="2981"/>
        <source>Local file</source>
        <translation>本地文件</translation>
    </message>
    <message>
        <location filename="../mainwindow.ui" line="1508"/>
        <location filename="../build/Desktop-Debug/VBDriveWizard_autogen/include/ui_mainwindow.h" line="2982"/>
        <source>Remote repo</source>
        <translation>远程仓库</translation>
    </message>
    <message>
        <location filename="../mainwindow.ui" line="1539"/>
        <location filename="../build/Desktop-Debug/VBDriveWizard_autogen/include/ui_mainwindow.h" line="2985"/>
        <source>Firmware release to flash</source>
        <translation>要烧录的固件版本</translation>
    </message>
    <message>
        <location filename="../mainwindow.ui" line="2063"/>
        <location filename="../build/Desktop-Debug/VBDriveWizard_autogen/include/ui_mainwindow.h" line="3028"/>
        <source>Pos</source>
        <translation>位置</translation>
    </message>
    <message>
        <location filename="../mainwindow.ui" line="2076"/>
        <location filename="../build/Desktop-Debug/VBDriveWizard_autogen/include/ui_mainwindow.h" line="3029"/>
        <source>Vel</source>
        <translation>速度</translation>
    </message>
    <message>
        <location filename="../mainwindow.ui" line="2096"/>
        <location filename="../build/Desktop-Debug/VBDriveWizard_autogen/include/ui_mainwindow.h" line="3031"/>
        <source>Voltage</source>
        <comment>servo segment</comment>
        <translation>电压</translation>
    </message>
    <message>
        <location filename="../mainwindow.ui" line="2165"/>
        <location filename="../mainwindow.ui" line="2230"/>
        <location filename="../mainwindow.ui" line="2285"/>
        <location filename="../build/Desktop-Debug/VBDriveWizard_autogen/include/ui_mainwindow.h" line="3033"/>
        <location filename="../build/Desktop-Debug/VBDriveWizard_autogen/include/ui_mainwindow.h" line="3036"/>
        <location filename="../build/Desktop-Debug/VBDriveWizard_autogen/include/ui_mainwindow.h" line="3038"/>
        <source>Direct</source>
        <translation>直接</translation>
    </message>
    <message>
        <location filename="../mainwindow.ui" line="2178"/>
        <location filename="../build/Desktop-Debug/VBDriveWizard_autogen/include/ui_mainwindow.h" line="3034"/>
        <source>Filter</source>
        <translation>滤波</translation>
    </message>
    <message>
        <location filename="../mainwindow.ui" line="2188"/>
        <location filename="../build/Desktop-Debug/VBDriveWizard_autogen/include/ui_mainwindow.h" line="3035"/>
        <source>Polynomial</source>
        <comment>servo segment</comment>
        <translation>多项式</translation>
    </message>
    <message>
        <location filename="../mainwindow.ui" line="2243"/>
        <location filename="../build/Desktop-Debug/VBDriveWizard_autogen/include/ui_mainwindow.h" line="3037"/>
        <source>Ramp</source>
        <translation>斜坡</translation>
    </message>
    <message>
        <location filename="../mainwindow.ui" line="2318"/>
        <location filename="../build/Desktop-Debug/VBDriveWizard_autogen/include/ui_mainwindow.h" line="3039"/>
        <source>Trajectory Params</source>
        <translation>轨迹参数</translation>
    </message>
    <message>
        <location filename="../mainwindow.ui" line="2374"/>
        <location filename="../build/Desktop-Debug/VBDriveWizard_autogen/include/ui_mainwindow.h" line="3040"/>
        <source>No Params</source>
        <translation>无参数</translation>
    </message>
    <message>
        <location filename="../mainwindow.ui" line="2468"/>
        <location filename="../build/Desktop-Debug/VBDriveWizard_autogen/include/ui_mainwindow.h" line="3041"/>
        <source>Bandwidth</source>
        <translation>带宽</translation>
    </message>
    <message>
        <location filename="../mainwindow.ui" line="2581"/>
        <location filename="../build/Desktop-Debug/VBDriveWizard_autogen/include/ui_mainwindow.h" line="3043"/>
        <source>Vel Limit</source>
        <translation>速度限制</translation>
    </message>
    <message>
        <location filename="../mainwindow.ui" line="2604"/>
        <location filename="../build/Desktop-Debug/VBDriveWizard_autogen/include/ui_mainwindow.h" line="3044"/>
        <source>Accel Limit</source>
        <translation>加速度限制</translation>
    </message>
    <message>
        <location filename="../mainwindow.ui" line="2627"/>
        <location filename="../build/Desktop-Debug/VBDriveWizard_autogen/include/ui_mainwindow.h" line="3045"/>
        <source>Decel Limit</source>
        <translation>减速度限制</translation>
    </message>
    <message>
        <location filename="../mainwindow.ui" line="2756"/>
        <location filename="../build/Desktop-Debug/VBDriveWizard_autogen/include/ui_mainwindow.h" line="3047"/>
        <source>Rate</source>
        <translation>速率</translation>
    </message>
    <message>
        <location filename="../mainwindow.ui" line="3232"/>
        <location filename="../build/Desktop-Debug/VBDriveWizard_autogen/include/ui_mainwindow.h" line="3057"/>
        <source>No Gains</source>
        <translation>无增益</translation>
    </message>
    <message>
        <location filename="../mainwindow.ui" line="3307"/>
        <location filename="../build/Desktop-Debug/VBDriveWizard_autogen/include/ui_mainwindow.h" line="3058"/>
        <source>Target</source>
        <translation>目标</translation>
    </message>
    <message>
        <location filename="../mainwindow.ui" line="4499"/>
        <location filename="../build/Desktop-Debug/VBDriveWizard_autogen/include/ui_mainwindow.h" line="3098"/>
        <source>M4310R10</source>
        <translation>M4310R10</translation>
    </message>
    <message>
        <location filename="../mainwindow.ui" line="4513"/>
        <location filename="../build/Desktop-Debug/VBDriveWizard_autogen/include/ui_mainwindow.h" line="3100"/>
        <source>Temperature MCU</source>
        <translation>MCU 温度</translation>
    </message>
    <message>
        <location filename="../mainwindow.ui" line="4520"/>
        <location filename="../mainwindow.ui" line="4541"/>
        <location filename="../mainwindow.ui" line="4562"/>
        <location filename="../mainwindow.ui" line="4583"/>
        <location filename="../mainwindow.ui" line="4604"/>
        <location filename="../mainwindow.ui" line="4625"/>
        <location filename="../mainwindow.ui" line="4646"/>
        <location filename="../build/Desktop-Debug/VBDriveWizard_autogen/include/ui_mainwindow.h" line="3101"/>
        <location filename="../build/Desktop-Debug/VBDriveWizard_autogen/include/ui_mainwindow.h" line="3104"/>
        <location filename="../build/Desktop-Debug/VBDriveWizard_autogen/include/ui_mainwindow.h" line="3107"/>
        <location filename="../build/Desktop-Debug/VBDriveWizard_autogen/include/ui_mainwindow.h" line="3110"/>
        <location filename="../build/Desktop-Debug/VBDriveWizard_autogen/include/ui_mainwindow.h" line="3113"/>
        <location filename="../build/Desktop-Debug/VBDriveWizard_autogen/include/ui_mainwindow.h" line="3116"/>
        <location filename="../build/Desktop-Debug/VBDriveWizard_autogen/include/ui_mainwindow.h" line="3119"/>
        <source>TextLabel</source>
        <translation>TextLabel</translation>
    </message>
    <message>
        <location filename="../mainwindow.ui" line="4527"/>
        <location filename="../mainwindow.ui" line="4548"/>
        <location filename="../build/Desktop-Debug/VBDriveWizard_autogen/include/ui_mainwindow.h" line="3102"/>
        <location filename="../build/Desktop-Debug/VBDriveWizard_autogen/include/ui_mainwindow.h" line="3105"/>
        <source>C</source>
        <translation>C</translation>
    </message>
    <message>
        <location filename="../mainwindow.ui" line="4534"/>
        <location filename="../build/Desktop-Debug/VBDriveWizard_autogen/include/ui_mainwindow.h" line="3103"/>
        <source>Temperature Stator</source>
        <translation>定子温度</translation>
    </message>
    <message>
        <location filename="../mainwindow.ui" line="4555"/>
        <location filename="../build/Desktop-Debug/VBDriveWizard_autogen/include/ui_mainwindow.h" line="3106"/>
        <source>Bus Voltage</source>
        <translation>母线电压</translation>
    </message>
    <message>
        <location filename="../mainwindow.ui" line="4569"/>
        <location filename="../build/Desktop-Debug/VBDriveWizard_autogen/include/ui_mainwindow.h" line="3108"/>
        <source>V</source>
        <translation>V</translation>
    </message>
    <message>
        <location filename="../mainwindow.ui" line="4597"/>
        <location filename="../build/Desktop-Debug/VBDriveWizard_autogen/include/ui_mainwindow.h" line="3112"/>
        <source>Motor Encoder</source>
        <translation>转子编码器</translation>
    </message>
    <message>
        <location filename="../mainwindow.ui" line="4611"/>
        <location filename="../mainwindow.ui" line="4632"/>
        <location filename="../mainwindow.ui" line="4653"/>
        <location filename="../build/Desktop-Debug/VBDriveWizard_autogen/include/ui_mainwindow.h" line="3114"/>
        <location filename="../build/Desktop-Debug/VBDriveWizard_autogen/include/ui_mainwindow.h" line="3117"/>
        <location filename="../build/Desktop-Debug/VBDriveWizard_autogen/include/ui_mainwindow.h" line="3120"/>
        <source>-</source>
        <translation>-</translation>
    </message>
    <message>
        <location filename="../mainwindow.ui" line="4618"/>
        <location filename="../build/Desktop-Debug/VBDriveWizard_autogen/include/ui_mainwindow.h" line="3115"/>
        <source>Shaft Encoder</source>
        <translation>输出轴编码器</translation>
    </message>
    <message>
        <location filename="../mainwindow.ui" line="4639"/>
        <location filename="../build/Desktop-Debug/VBDriveWizard_autogen/include/ui_mainwindow.h" line="3118"/>
        <source>Fault</source>
        <translation>故障</translation>
    </message>
    <message>
        <location filename="../mainwindow.ui" line="4699"/>
        <location filename="../build/Desktop-Debug/VBDriveWizard_autogen/include/ui_mainwindow.h" line="3122"/>
        <source>STOP</source>
        <translation>停止</translation>
    </message>
    <message>
        <location filename="../mainwindow.cpp" line="288"/>
        <source>Reconnect failed</source>
        <translation>重新连接失败</translation>
    </message>
    <message>
        <location filename="../mainwindow.cpp" line="289"/>
        <source>The actuator did not answer after flashing; connect again by hand.

%1</source>
        <translation>烧录后驱动器没有响应；请手动重新连接。

%1</translation>
    </message>
    <message>
        <location filename="../mainwindow.cpp" line="294"/>
        <location filename="../mainwindow.cpp" line="306"/>
        <location filename="../mainwindow.cpp" line="1171"/>
        <location filename="../mainwindow.cpp" line="1203"/>
        <source>Connection failed</source>
        <translation>连接失败</translation>
    </message>
    <message>
        <location filename="../mainwindow.cpp" line="333"/>
        <source>Firmware download failed</source>
        <translation>固件下载失败</translation>
    </message>
    <message>
        <location filename="../mainwindow.cpp" line="346"/>
        <source>Downloaded firmware %1.</source>
        <translation>已下载固件 %1。</translation>
    </message>
    <message>
        <location filename="../mainwindow.cpp" line="366"/>
        <location filename="../mainwindow.cpp" line="3296"/>
        <source>Flashing failed</source>
        <translation>烧录失败</translation>
    </message>
    <message>
        <location filename="../mainwindow.cpp" line="589"/>
        <location filename="../mainwindow.cpp" line="591"/>
        <location filename="../mainwindow.cpp" line="1054"/>
        <location filename="../mainwindow.cpp" line="1322"/>
        <location filename="../mainwindow.cpp" line="1323"/>
        <source>Disconnect</source>
        <translation>断开</translation>
    </message>
    <message>
        <source>Resume</source>
        <translation type="vanished">继续</translation>
    </message>
    <message>
        <location filename="../mainwindow.cpp" line="1482"/>
        <source>No actuators found - press refresh</source>
        <translation>未找到设备 - 请点击刷新</translation>
    </message>
    <message>
        <location filename="../mainwindow.cpp" line="213"/>
        <location filename="../mainwindow.cpp" line="600"/>
        <location filename="../mainwindow.cpp" line="1263"/>
        <source>Not connected</source>
        <translation>未连接</translation>
    </message>
    <message>
        <location filename="../mainwindow.cpp" line="618"/>
        <source>Calibration in progress</source>
        <translation>正在校准</translation>
    </message>
    <message>
        <location filename="../mainwindow.cpp" line="619"/>
        <source>The actuator is still calibrating and cannot be stopped. Closing now leaves it to finish on its own.
Close anyway?</source>
        <translation>驱动器仍在校准，且无法中止。现在关闭，驱动器将自行完成校准。
仍要关闭吗？</translation>
    </message>
    <message>
        <location filename="../mainwindow.cpp" line="630"/>
        <source>Flashing in progress</source>
        <translation>正在烧录</translation>
    </message>
    <message>
        <location filename="../mainwindow.cpp" line="631"/>
        <source>The actuator is being flashed over CAN. Closing now leaves it in the bootloader without firmware.
Close anyway?</source>
        <translation>驱动器正在通过 CAN 烧录。现在关闭会使其停留在引导程序中且没有固件。
仍要关闭吗？</translation>
    </message>
    <message>
        <location filename="../mainwindow.cpp" line="643"/>
        <location filename="../mainwindow.cpp" line="1543"/>
        <source>Unsaved changes</source>
        <translation>未保存的更改</translation>
    </message>
    <message>
        <location filename="../mainwindow.cpp" line="644"/>
        <source>Some register changes have not been written to the actuator.
Close anyway?</source>
        <translation>部分寄存器更改尚未写入驱动器。
仍要关闭吗？</translation>
    </message>
    <message>
        <location filename="../mainwindow.cpp" line="673"/>
        <location filename="../mainwindow.cpp" line="1164"/>
        <source>Disconnecting...</source>
        <translation>正在断开...</translation>
    </message>
    <message>
        <location filename="../mainwindow.cpp" line="1102"/>
        <source>%1 (unavailable)</source>
        <translation>%1（不可用）</translation>
    </message>
    <message>
        <location filename="../mainwindow.cpp" line="1171"/>
        <source>No serial port selected.</source>
        <translation>未选择串口。</translation>
    </message>
    <message>
        <location filename="../mainwindow.cpp" line="1181"/>
        <source>Opening %1...</source>
        <translation>正在打开 %1...</translation>
    </message>
    <message>
        <location filename="../mainwindow.cpp" line="1209"/>
        <source>Listening for actuators on %1...</source>
        <translation>正在 %1 上搜索驱动器...</translation>
    </message>
    <message>
        <location filename="../mainwindow.cpp" line="1240"/>
        <source>Serial connected</source>
        <translation>串口已连接</translation>
    </message>
    <message>
        <location filename="../mainwindow.cpp" line="1241"/>
        <source>CAN connected</source>
        <translation>CAN 已连接</translation>
    </message>
    <message>
        <location filename="../mainwindow.cpp" line="1264"/>
        <source>Disconnected.</source>
        <translation>已断开。</translation>
    </message>
    <message>
        <source>Sort by model</source>
        <translation type="vanished">按型号排序</translation>
    </message>
    <message>
        <source>Sort by Node ID</source>
        <translation type="vanished">按 Node ID 排序</translation>
    </message>
    <message>
        <location filename="../mainwindow.cpp" line="1468"/>
        <source>  (no heartbeat)</source>
        <translation>（无心跳）</translation>
    </message>
    <message>
        <location filename="../mainwindow.cpp" line="1544"/>
        <source>Actuator %1 has register changes that were not written.
Write them before switching?</source>
        <translation>驱动器 %1 有未写入的寄存器更改。
切换前是否写入？</translation>
    </message>
    <message>
        <location filename="../mainwindow.cpp" line="1630"/>
        <source>Reading registers...</source>
        <translation>正在读取寄存器...</translation>
    </message>
    <message>
        <location filename="../mainwindow.cpp" line="1641"/>
        <location filename="../mainwindow.cpp" line="1647"/>
        <source>No changes to write.</source>
        <translation>没有需要写入的更改。</translation>
    </message>
    <message>
        <location filename="../mainwindow.cpp" line="1668"/>
        <source>Critical register</source>
        <translation>关键寄存器</translation>
    </message>
    <message>
        <location filename="../mainwindow.cpp" line="1669"/>
        <source>The value of register %1 will be changed from %2 A to %3 A. Are you sure you want to overwrite it?</source>
        <translation>寄存器 %1 的值将从 %2 A 改为 %3 A。确定要覆盖它吗？</translation>
    </message>
    <message>
        <location filename="../mainwindow.cpp" line="1677"/>
        <source>Write all except this register</source>
        <translation>写入除此寄存器外的全部</translation>
    </message>
    <message numerus="yes">
        <location filename="../mainwindow.cpp" line="1719"/>
        <source>Writing %n register(s), the actuator restarts to apply them...</source>
        <translation>
            <numerusform>正在写入 %n 个寄存器，驱动器将重启以应用...</numerusform>
        </translation>
    </message>
    <message numerus="yes">
        <location filename="../mainwindow.cpp" line="1724"/>
        <source>Writing %n register(s)...</source>
        <translation>
            <numerusform>正在写入 %n 个寄存器...</numerusform>
        </translation>
    </message>
    <message>
        <location filename="../mainwindow.cpp" line="1751"/>
        <source>Origin set; angle offset is now %1.</source>
        <translation>零点已设置，角度偏移现为 %1。</translation>
    </message>
    <message>
        <location filename="../mainwindow.cpp" line="1761"/>
        <source>Calibrate sensor</source>
        <translation>校准传感器</translation>
    </message>
    <message>
        <location filename="../mainwindow.cpp" line="1762"/>
        <source>Calibration moves the motor and cannot be cancelled. The actuator stops answering until it finishes.

Start calibration?</source>
        <translation>校准会转动电机且无法取消。驱动器在校准完成前不会响应。

开始校准吗？</translation>
    </message>
    <message>
        <location filename="../mainwindow.cpp" line="1776"/>
        <source>Calibration started; the actuator will not answer until it is done.</source>
        <translation>校准已开始，驱动器在完成前不会响应。</translation>
    </message>
    <message>
        <location filename="../mainwindow.cpp" line="1785"/>
        <source>Calibrating: stage %1 of %2 done...</source>
        <translation>校准中：已完成第 %1 / %2 阶段...</translation>
    </message>
    <message>
        <location filename="../mainwindow.cpp" line="1809"/>
        <source>Calibration finished.</source>
        <translation>校准完成。</translation>
    </message>
    <message>
        <location filename="../mainwindow.cpp" line="1815"/>
        <source>Calibration failed: %1</source>
        <translation>校准失败：%1</translation>
    </message>
    <message>
        <location filename="../mainwindow.cpp" line="1826"/>
        <source>Calibration failed</source>
        <translation>校准失败</translation>
    </message>
    <message>
        <location filename="../mainwindow.cpp" line="1827"/>
        <source>%1

The actuator may be hung. Restart it and connect again.</source>
        <translation>%1

驱动器可能已死机。请重启驱动器并重新连接。</translation>
    </message>
    <message>
        <location filename="../mainwindow.cpp" line="1852"/>
        <source>Save register profile</source>
        <translation>保存寄存器配置</translation>
    </message>
    <message>
        <location filename="../mainwindow.cpp" line="1855"/>
        <location filename="../mainwindow.cpp" line="1878"/>
        <source>YAML files (*.yaml *.yml)</source>
        <translation>YAML 文件 (*.yaml *.yml)</translation>
    </message>
    <message>
        <location filename="../mainwindow.cpp" line="1869"/>
        <source>Could not save the profile</source>
        <translation>无法保存配置</translation>
    </message>
    <message>
        <location filename="../mainwindow.cpp" line="1871"/>
        <source>Profile saved to %1.</source>
        <translation>配置已保存到 %1。</translation>
    </message>
    <message>
        <location filename="../mainwindow.cpp" line="1877"/>
        <source>Load register profile</source>
        <translation>加载寄存器配置</translation>
    </message>
    <message>
        <location filename="../mainwindow.cpp" line="1886"/>
        <source>Could not load the profile</source>
        <translation>无法加载配置</translation>
    </message>
    <message numerus="yes">
        <location filename="../mainwindow.cpp" line="1891"/>
        <source>Loaded %n register(s) from the profile.</source>
        <translation>
            <numerusform>已从配置加载 %n 个寄存器。</numerusform>
        </translation>
    </message>
    <message>
        <location filename="../mainwindow.cpp" line="1893"/>
        <source>Loaded with warnings: %1</source>
        <translation>加载时出现警告：%1</translation>
    </message>
    <message>
        <location filename="../mainwindow.cpp" line="1909"/>
        <source>Could not load the default profile</source>
        <translation>无法加载默认配置</translation>
    </message>
    <message>
        <location filename="../mainwindow.cpp" line="1913"/>
        <source>Default values for %1 loaded into the editors.</source>
        <translation>%1 的默认值已载入编辑框。</translation>
    </message>
    <message>
        <location filename="../mainwindow.cpp" line="1940"/>
        <source>Could not read &apos;%1&apos;: %2</source>
        <translation>无法读取“%1”：%2</translation>
    </message>
    <message>
        <location filename="../mainwindow.cpp" line="1991"/>
        <source>Could not write &apos;%1&apos;: %2</source>
        <translation>无法写入“%1”：%2</translation>
    </message>
    <message>
        <location filename="../mainwindow.cpp" line="2007"/>
        <source>Registers written.</source>
        <translation>寄存器已写入。</translation>
    </message>
    <message>
        <location filename="../mainwindow.cpp" line="2017"/>
        <source>Some registers were not written</source>
        <translation>部分寄存器未写入</translation>
    </message>
    <message>
        <location filename="../mainwindow.cpp" line="2023"/>
        <source>The actuator is not calibrated. Please calibrate the actuator to start working.</source>
        <translation>驱动器未校准。请先校准驱动器，然后再开始工作。</translation>
    </message>
    <message>
        <location filename="../mainwindow.cpp" line="2030"/>
        <source>Actuator not calibrated</source>
        <translation>驱动器未校准</translation>
    </message>
    <message>
        <location filename="../mainwindow.cpp" line="2086"/>
        <source>Actuator lost</source>
        <translation>驱动器失联</translation>
    </message>
    <message>
        <location filename="../mainwindow.cpp" line="2087"/>
        <source>Actuator %1 (node %2) stopped sending heartbeats.</source>
        <translation>驱动器 %1（节点 %2）停止发送心跳。</translation>
    </message>
    <message>
        <location filename="../mainwindow.cpp" line="2090"/>
        <source>Wait for it to come back, keeping your unsaved register changes, or drop it and discard them?</source>
        <translation>是等待它恢复并保留未保存的寄存器更改，还是移除它并放弃这些更改？</translation>
    </message>
    <message>
        <location filename="../mainwindow.cpp" line="2092"/>
        <source>Reconnect</source>
        <translation>重新连接</translation>
    </message>
    <message>
        <location filename="../mainwindow.cpp" line="2093"/>
        <source>Remove actuator</source>
        <translation>移除驱动器</translation>
    </message>
    <message>
        <location filename="../mainwindow.cpp" line="2105"/>
        <source>Waiting for node %1 to return...</source>
        <translation>正在等待节点 %1 恢复...</translation>
    </message>
    <message>
        <location filename="../mainwindow.cpp" line="2127"/>
        <source>The actuator restarted with the new settings.</source>
        <translation>驱动器已使用新设置重启。</translation>
    </message>
    <message>
        <location filename="../mainwindow.cpp" line="2147"/>
        <source>Node %1 is back.</source>
        <translation>节点 %1 已恢复。</translation>
    </message>
    <message>
        <location filename="../mainwindow.cpp" line="3070"/>
        <source>Looking up the firmware releases...</source>
        <translation>正在查找固件版本...</translation>
    </message>
    <message>
        <location filename="../mainwindow.cpp" line="3096"/>
        <source>This release carries no firmware image to flash.</source>
        <translation>此版本不包含可烧录的固件镜像。</translation>
    </message>
    <message numerus="yes">
        <location filename="../mainwindow.cpp" line="3111"/>
        <source>Found %n firmware release(s).</source>
        <translation>
            <numerusform>找到 %n 个固件版本。</numerusform>
        </translation>
    </message>
    <message>
        <location filename="../mainwindow.cpp" line="3118"/>
        <source>Could not list the firmware releases.</source>
        <translation>无法获取固件版本列表。</translation>
    </message>
    <message>
        <location filename="../mainwindow.cpp" line="3121"/>
        <source>Firmware releases unavailable</source>
        <translation>固件版本不可用</translation>
    </message>
    <message>
        <location filename="../mainwindow.cpp" line="3122"/>
        <source>%1

Select Remote repo again to retry.</source>
        <translation>%1

请再次选择“远程仓库”以重试。</translation>
    </message>
    <message>
        <location filename="../mainwindow.cpp" line="3129"/>
        <source>Loading...</source>
        <translation>加载中...</translation>
    </message>
    <message>
        <location filename="../mainwindow.cpp" line="3129"/>
        <source>No releases</source>
        <translation>无版本</translation>
    </message>
    <message>
        <location filename="../mainwindow.cpp" line="3151"/>
        <source>Pick a release from the list. If it is empty, select Remote repo again to retry.</source>
        <translation>请从列表中选择一个版本。如果列表为空，请再次选择“远程仓库”以重试。</translation>
    </message>
    <message>
        <location filename="../mainwindow.cpp" line="3166"/>
        <source>The actuator runs firmware %1, which is newer than %2.
Flash %2 anyway?</source>
        <translation>执行器运行的固件 %1 比 %2 更新。
仍要烧录 %2 吗？</translation>
    </message>
    <message>
        <location filename="../mainwindow.cpp" line="3168"/>
        <source>The actuator already runs firmware %1.
Flash %2 anyway?</source>
        <translation>执行器已在运行固件 %1。
仍要烧录 %2 吗？</translation>
    </message>
    <message>
        <location filename="../mainwindow.cpp" line="3211"/>
        <source>You have the latest firmware version.</source>
        <translation type="unfinished"></translation>
    </message>
    <message>
        <location filename="../mainwindow.cpp" line="1674"/>
        <location filename="../mainwindow.cpp" line="2236"/>
        <source>Yes</source>
        <translation>是</translation>
    </message>
    <message>
        <location filename="../mainwindow.cpp" line="1675"/>
        <location filename="../mainwindow.cpp" line="2236"/>
        <source>No</source>
        <translation>否</translation>
    </message>
    <message>
        <source>Target vel:</source>
        <translation type="vanished">目标速度：</translation>
    </message>
    <message>
        <source>Target torq:</source>
        <translation type="vanished">目标转矩：</translation>
    </message>
    <message>
        <location filename="../mainwindow.cpp" line="2744"/>
        <source>Serial cannot sustain %1 Hz; running at %2 Hz instead.</source>
        <translation>串口无法维持 %1 Hz，改为 %2 Hz 运行。</translation>
    </message>
    <message>
        <source>Feedback gains written.</source>
        <translation type="vanished">反馈增益已写入。</translation>
    </message>
    <message>
        <source>Transient form written.</source>
        <translation type="vanished">过渡过程参数已写入。</translation>
    </message>
    <message>
        <location filename="../mainwindow.cpp" line="2800"/>
        <source>Emergency stop: all actuators disabled.</source>
        <translation>急停：已关闭所有驱动器。</translation>
    </message>
    <message>
        <location filename="../mainwindow.cpp" line="2954"/>
        <source>Pause the plot</source>
        <translation>暂停绘图</translation>
    </message>
    <message>
        <location filename="../mainwindow.cpp" line="2954"/>
        <source>Resume the plot</source>
        <translation>继续绘图</translation>
    </message>
    <message>
        <location filename="../mainwindow.cpp" line="2984"/>
        <source>No file was selected.</source>
        <translation>未选择文件。</translation>
    </message>
    <message>
        <location filename="../mainwindow.cpp" line="2988"/>
        <source>Save plot</source>
        <translation>保存图表</translation>
    </message>
    <message>
        <location filename="../mainwindow.cpp" line="2989"/>
        <source>%1 already exists. Overwrite it?</source>
        <translation>%1 已存在。是否覆盖？</translation>
    </message>
    <message>
        <location filename="../mainwindow.cpp" line="3015"/>
        <source>Saved to %1.</source>
        <translation>已保存到 %1。</translation>
    </message>
    <message>
        <location filename="../mainwindow.cpp" line="3017"/>
        <source>Could not save the plot</source>
        <translation>无法保存图表</translation>
    </message>
    <message>
        <location filename="../mainwindow.cpp" line="1280"/>
        <source>Emergency stop</source>
        <translation>急停</translation>
    </message>
    <message>
        <location filename="../mainwindow.cpp" line="375"/>
        <source>Firmware flashed</source>
        <translation>固件已烧录</translation>
    </message>
    <message>
        <location filename="../mainwindow.cpp" line="376"/>
        <source>Restart the actuator and press OK.</source>
        <translation>请重启驱动器，然后按“确定”。</translation>
    </message>
    <message>
        <location filename="../mainwindow.cpp" line="390"/>
        <source>%1 Connect to the actuator from CONNECTION.</source>
        <translation>%1 请在“连接”面板中连接驱动器。</translation>
    </message>
    <message>
        <location filename="../mainwindow.cpp" line="1281"/>
        <source>The actuator has been stopped by the emergency stop. To resume, restart the actuator and connect to it again.</source>
        <translation>驱动器已被急停。要恢复工作，请重启驱动器并重新连接。</translation>
    </message>
    <message>
        <location filename="../mainwindow.cpp" line="2468"/>
        <source>Servo settings written.</source>
        <translation>Servo 参数已写入。</translation>
    </message>
    <message>
        <location filename="../mainwindow.cpp" line="2853"/>
        <source>Stop</source>
        <translation>停止</translation>
    </message>
    <message>
        <location filename="../mainwindow.cpp" line="2962"/>
        <source>s</source>
        <translation>秒</translation>
    </message>
    <message>
        <source>Save plot data</source>
        <translation type="vanished">保存图表数据</translation>
    </message>
    <message>
        <source>CSV files (*.csv)</source>
        <translation type="vanished">CSV 文件 (*.csv)</translation>
    </message>
    <message>
        <source>Could not save the CSV</source>
        <translation type="vanished">无法保存 CSV</translation>
    </message>
    <message>
        <source>Plot data saved.</source>
        <translation type="vanished">图表数据已保存。</translation>
    </message>
    <message>
        <source>Save plot image</source>
        <translation type="vanished">保存图表图像</translation>
    </message>
    <message>
        <source>PNG images (*.png)</source>
        <translation type="vanished">PNG 图像 (*.png)</translation>
    </message>
    <message>
        <source>Could not save the image</source>
        <translation type="vanished">无法保存图像</translation>
    </message>
    <message>
        <source>Plot image saved.</source>
        <translation type="vanished">图表图像已保存。</translation>
    </message>
    <message>
        <location filename="../mainwindow.cpp" line="3050"/>
        <source>Select firmware image</source>
        <translation>选择固件文件</translation>
    </message>
    <message>
        <location filename="../mainwindow.cpp" line="3051"/>
        <source>Intel HEX files (*.hex)</source>
        <translation>Intel HEX 文件 (*.hex)</translation>
    </message>
    <message>
        <location filename="../mainwindow.cpp" line="3055"/>
        <source>Selected %1.</source>
        <translation>已选择 %1。</translation>
    </message>
    <message>
        <source>Looking up the latest release...</source>
        <translation type="vanished">正在查找最新版本...</translation>
    </message>
    <message>
        <location filename="../mainwindow.cpp" line="3150"/>
        <location filename="../mainwindow.cpp" line="3185"/>
        <source>No firmware selected</source>
        <translation>未选择固件</translation>
    </message>
    <message>
        <source>Choose a .hex file first, or switch to downloading the latest release.</source>
        <translation type="vanished">请先选择 .hex 文件，或切换为下载最新版本。</translation>
    </message>
    <message>
        <source>The actuator runs firmware %1, which is newer than the latest release %2.
Flash %2 anyway?</source>
        <translation type="vanished">驱动器运行的固件 %1 比最新发布版本 %2 更新。
仍要烧录 %2 吗？</translation>
    </message>
    <message>
        <source>The actuator already runs the latest firmware %1.
Flash %2 anyway?</source>
        <translation type="vanished">驱动器已运行最新固件 %1。
仍要烧录 %2 吗？</translation>
    </message>
    <message>
        <location filename="../mainwindow.cpp" line="3169"/>
        <source>Flash firmware</source>
        <translation>烧录固件</translation>
    </message>
    <message>
        <location filename="../mainwindow.cpp" line="3174"/>
        <source>Flashing cancelled.</source>
        <translation>已取消烧录。</translation>
    </message>
    <message>
        <location filename="../mainwindow.cpp" line="3186"/>
        <source>Choose a .hex file first, or switch to a release from the remote repo.</source>
        <translation>请先选择 .hex 文件，或切换为远程仓库中的版本。</translation>
    </message>
    <message>
        <location filename="../mainwindow.cpp" line="3208"/>
        <source>The firmware is outdated: release %1 is available.</source>
        <translation>固件已过时：可用版本 %1。</translation>
    </message>
    <message>
        <source>You have the latest firmware revision.</source>
        <translation type="vanished">您的固件已是最新版本。</translation>
    </message>
    <message>
        <location filename="../mainwindow.cpp" line="3248"/>
        <source>Flashing %1...</source>
        <translation>正在烧录 %1...</translation>
    </message>
    <message>
        <location filename="../mainwindow.cpp" line="3257"/>
        <source>No actuator selected</source>
        <translation>未选择驱动器</translation>
    </message>
    <message>
        <location filename="../mainwindow.cpp" line="3258"/>
        <source>Select the actuator to flash in the device list.</source>
        <translation>请在设备列表中选择要烧录的驱动器。</translation>
    </message>
    <message>
        <location filename="../mainwindow.cpp" line="3281"/>
        <source>Flashing %1 into %2 over CAN...</source>
        <translation>正在通过 CAN 将 %1 烧录到 %2...</translation>
    </message>
    <message>
        <location filename="../mainwindow.cpp" line="3315"/>
        <source>%1 Waiting for the actuator to start...</source>
        <translation>%1 正在等待驱动器启动...</translation>
    </message>
    <message>
        <location filename="../mainwindow.cpp" line="3325"/>
        <source>Actuator did not start</source>
        <translation>驱动器未启动</translation>
    </message>
    <message>
        <location filename="../mainwindow.cpp" line="3326"/>
        <source>The firmware was written, but node %1 has sent no heartbeat since. Power-cycle the actuator; if it stays silent, flash it over SWD.</source>
        <translation>固件已写入，但节点 %1 此后未发送任何心跳。请给驱动器重新上电；如果仍无响应，请通过 SWD 烧录。</translation>
    </message>
    <message>
        <location filename="../mainwindow.cpp" line="3351"/>
        <source>Node %1 is running the new firmware.</source>
        <translation>节点 %1 正在运行新固件。</translation>
    </message>
    <message>
        <location filename="../mainwindow.cpp" line="3366"/>
        <source>Reconnecting to the flashed actuator...</source>
        <translation>正在重新连接已烧录的驱动器...</translation>
    </message>
    <message>
        <location filename="../mainwindow.cpp" line="3392"/>
        <source>Reconnecting to %1...</source>
        <translation>正在重新连接 %1...</translation>
    </message>
</context>
<context>
    <name>PlotController</name>
    <message>
        <location filename="../ui/plot_controller.cpp" line="153"/>
        <source>t, s</source>
        <translation>t, 秒</translation>
    </message>
    <message>
        <location filename="../ui/plot_controller.cpp" line="178"/>
        <source>Position</source>
        <translation>位置</translation>
    </message>
    <message>
        <location filename="../ui/plot_controller.cpp" line="180"/>
        <source>Velocity</source>
        <translation>速度</translation>
    </message>
    <message>
        <location filename="../ui/plot_controller.cpp" line="182"/>
        <source>Torque</source>
        <translation>转矩</translation>
    </message>
    <message>
        <location filename="../ui/plot_controller.cpp" line="184"/>
        <source>MCU</source>
        <translation>MCU</translation>
    </message>
    <message>
        <location filename="../ui/plot_controller.cpp" line="186"/>
        <source>Bus current</source>
        <translation>母线电流</translation>
    </message>
    <message>
        <location filename="../ui/plot_controller.cpp" line="188"/>
        <source>Rotor</source>
        <translation>转子</translation>
    </message>
    <message>
        <location filename="../ui/plot_controller.cpp" line="201"/>
        <source>Target</source>
        <translation>目标</translation>
    </message>
    <message>
        <location filename="../ui/plot_controller.cpp" line="203"/>
        <source>Stator</source>
        <translation>定子</translation>
    </message>
    <message>
        <location filename="../ui/plot_controller.cpp" line="205"/>
        <source>Shaft</source>
        <translation>输出轴</translation>
    </message>
    <message>
        <location filename="../ui/plot_controller.cpp" line="216"/>
        <source>Position, %1</source>
        <translation>位置，%1</translation>
    </message>
    <message>
        <location filename="../ui/plot_controller.cpp" line="218"/>
        <source>Velocity, %1</source>
        <translation>速度，%1</translation>
    </message>
    <message>
        <location filename="../ui/plot_controller.cpp" line="221"/>
        <source>Torque, N*m</source>
        <translation>转矩，N·m</translation>
    </message>
    <message>
        <location filename="../ui/plot_controller.cpp" line="223"/>
        <source>Temperature, C</source>
        <translation>温度，°C</translation>
    </message>
    <message>
        <location filename="../ui/plot_controller.cpp" line="225"/>
        <source>Current, A</source>
        <translation>电流，A</translation>
    </message>
    <message>
        <location filename="../ui/plot_controller.cpp" line="227"/>
        <source>Encoder, counts</source>
        <translation>编码器，计数</translation>
    </message>
    <message>
        <location filename="../ui/plot_controller.cpp" line="629"/>
        <location filename="../ui/plot_controller.cpp" line="654"/>
        <source>The plot is not initialised.</source>
        <translation>图表尚未初始化。</translation>
    </message>
    <message>
        <location filename="../ui/plot_controller.cpp" line="634"/>
        <source>The log view cannot be exported as an image.</source>
        <translation>日志视图无法导出为图像。</translation>
    </message>
    <message>
        <source>The plot could not be rendered.</source>
        <translation type="vanished">无法渲染图表。</translation>
    </message>
    <message>
        <source>Could not write %1.</source>
        <translation type="vanished">无法写入 %1。</translation>
    </message>
    <message>
        <location filename="../ui/plot_controller.cpp" line="662"/>
        <location filename="../ui/plot_controller.cpp" line="670"/>
        <location filename="../ui/plot_controller.cpp" line="679"/>
        <location filename="../ui/plot_controller.cpp" line="715"/>
        <source>Could not write %1: %2</source>
        <translation>无法写入 %1：%2</translation>
    </message>
</context>
<context>
    <name>PlotCrosshairTool</name>
    <message>
        <location filename="../ui/plot_crosshair.cpp" line="59"/>
        <source>t, s</source>
        <translation>t, 秒</translation>
    </message>
</context>
<context>
    <name>PreferencesDialog</name>
    <message>
        <location filename="../ui/preferences_dialog.ui" line="59"/>
        <source>Language:</source>
        <translation>语言：</translation>
    </message>
    <message>
        <location filename="../ui/preferences_dialog.ui" line="14"/>
        <source>Preferences</source>
        <translation>首选项</translation>
    </message>
    <message>
        <location filename="../ui/preferences_dialog.ui" line="35"/>
        <source>Appearance</source>
        <translation>外观</translation>
    </message>
    <message>
        <location filename="../ui/preferences_dialog.ui" line="97"/>
        <source>Theme:</source>
        <translation>主题：</translation>
    </message>
    <message>
        <location filename="../ui/preferences_dialog.ui" line="105"/>
        <source>Dark</source>
        <translation>深色</translation>
    </message>
    <message>
        <location filename="../ui/preferences_dialog.ui" line="110"/>
        <source>Light</source>
        <translation>浅色</translation>
    </message>
    <message>
        <location filename="../ui/preferences_dialog.ui" line="118"/>
        <source>Interface font size, pt:</source>
        <translation>界面字号，pt：</translation>
    </message>
    <message>
        <location filename="../ui/preferences_dialog.ui" line="138"/>
        <source>Plot</source>
        <translation>图表</translation>
    </message>
    <message>
        <location filename="../ui/preferences_dialog.ui" line="162"/>
        <source>Plot font size, pt:</source>
        <translation>图表字号，pt：</translation>
    </message>
    <message>
        <location filename="../ui/preferences_dialog.ui" line="179"/>
        <source>Line width, px:</source>
        <translation>线宽，px：</translation>
    </message>
    <message>
        <location filename="../ui/preferences_dialog.ui" line="196"/>
        <source>Time window, s:</source>
        <translation>时间窗口，秒：</translation>
    </message>
    <message>
        <location filename="../ui/preferences_dialog.ui" line="219"/>
        <source>Redraw rate, Hz:</source>
        <translation>刷新率，Hz：</translation>
    </message>
    <message>
        <location filename="../ui/preferences_dialog.ui" line="239"/>
        <source>Connection</source>
        <translation>连接</translation>
    </message>
    <message>
        <location filename="../ui/preferences_dialog.ui" line="263"/>
        <source>This application&apos;s Cyphal node ID:</source>
        <translation>本程序的 Cyphal Node ID：</translation>
    </message>
    <message>
        <location filename="../ui/preferences_dialog.ui" line="280"/>
        <source>Serial baud rate:</source>
        <translation>串口波特率：</translation>
    </message>
    <message>
        <location filename="../ui/preferences_dialog.ui" line="303"/>
        <source>Firmware flashing (OpenOCD)</source>
        <translation>固件烧录（OpenOCD）</translation>
    </message>
    <message>
        <location filename="../ui/preferences_dialog.ui" line="327"/>
        <source>Interface config:</source>
        <translation>接口配置：</translation>
    </message>
    <message>
        <location filename="../ui/preferences_dialog.ui" line="338"/>
        <source>Target config:</source>
        <translation>目标配置：</translation>
    </message>
    <message>
        <location filename="../ui/preferences_dialog.cpp" line="24"/>
        <source>OpenOCD interface script, relative to its scripts directory.
VBDrive is programmed over SWD with an ST-Link.</source>
        <translation>OpenOCD 接口脚本，相对于其 scripts 目录。
VBDrive 通过 ST-Link 以 SWD 方式烧录。</translation>
    </message>
    <message>
        <location filename="../ui/preferences_dialog.cpp" line="27"/>
        <source>OpenOCD target script. VBDrive uses an STM32G431VB.</source>
        <translation>OpenOCD 目标脚本。VBDrive 使用 STM32G431VB。</translation>
    </message>
    <message>
        <location filename="../ui/preferences_dialog.cpp" line="29"/>
        <source>Node ID this application announces on the CAN bus.
It must not collide with any actuator.</source>
        <translation>本程序在 CAN 总线上声明的 Node ID。
不得与任何驱动器冲突。</translation>
    </message>
</context>
<context>
    <name>RegisterYaml</name>
    <message>
        <location filename="../core/register_yaml.cpp" line="33"/>
        <source>File does not exist: %1</source>
        <translation>文件不存在：%1</translation>
    </message>
    <message>
        <location filename="../core/register_yaml.cpp" line="43"/>
        <source>Cannot parse %1: %2</source>
        <translation>无法解析 %1：%2</translation>
    </message>
    <message>
        <location filename="../core/register_yaml.cpp" line="50"/>
        <source>%1 is not a map of register names to values.</source>
        <translation>%1 不是“寄存器名: 值”的映射。</translation>
    </message>
    <message>
        <location filename="../core/register_yaml.cpp" line="61"/>
        <source>unknown register &apos;%1&apos;</source>
        <translation>未知寄存器“%1”</translation>
    </message>
    <message>
        <location filename="../core/register_yaml.cpp" line="67"/>
        <source>&apos;%1&apos; does not hold a single value</source>
        <translation>“%1”不是单个值</translation>
    </message>
    <message>
        <location filename="../core/register_yaml.cpp" line="75"/>
        <source>&apos;%1&apos; has a value of the wrong type</source>
        <translation>“%1”的值类型不正确</translation>
    </message>
    <message>
        <location filename="../core/register_yaml.cpp" line="85"/>
        <source>%1 contains no recognised registers.</source>
        <translation>%1 中没有可识别的寄存器。</translation>
    </message>
    <message>
        <location filename="../core/register_yaml.cpp" line="98"/>
        <location filename="../core/register_yaml.cpp" line="124"/>
        <source>Cannot write %1: %2</source>
        <translation>无法写入 %1：%2</translation>
    </message>
</context>
<context>
    <name>RestoreLabel</name>
    <message>
        <location filename="../ui/restore_label.cpp" line="21"/>
        <source>Restore the value this field had when the actuator was selected</source>
        <translation>恢复选择该驱动器时此字段的值</translation>
    </message>
</context>
<context>
    <name>RestoreModelDialog</name>
    <message>
        <location filename="../ui/restore_model_dialog.ui" line="14"/>
        <source>Restore Default Registers</source>
        <translation>恢复默认寄存器</translation>
    </message>
    <message>
        <location filename="../ui/restore_model_dialog.ui" line="35"/>
        <source>Load the factory register profile for this actuator model. The values are placed in the editors; nothing is written to the actuator until you press Write.</source>
        <translation>加载该型号驱动器的出厂寄存器配置。数值会填入编辑框；在按下“写入”之前不会写入驱动器。</translation>
    </message>
    <message>
        <location filename="../ui/restore_model_dialog.ui" line="62"/>
        <source>Actuator model:</source>
        <translation>驱动器型号：</translation>
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
        <translation>保存图表</translation>
    </message>
    <message>
        <location filename="../ui/save_file_dialog.ui" line="22"/>
        <source>Address</source>
        <translation>路径</translation>
    </message>
    <message>
        <location filename="../ui/save_file_dialog.ui" line="32"/>
        <source>Browse</source>
        <translation>浏览</translation>
    </message>
    <message>
        <location filename="../ui/save_file_dialog.ui" line="39"/>
        <source>Save as</source>
        <translation>格式</translation>
    </message>
    <message>
        <location filename="../ui/save_file_dialog.ui" line="70"/>
        <source>Theme</source>
        <translation>主题</translation>
    </message>
    <message>
        <location filename="../ui/save_file_dialog.ui" line="78"/>
        <source>Light</source>
        <translation type="unfinished">浅色</translation>
    </message>
    <message>
        <location filename="../ui/save_file_dialog.ui" line="83"/>
        <source>Dark</source>
        <translation type="unfinished">深色</translation>
    </message>
    <message>
        <location filename="../ui/save_file_dialog.ui" line="91"/>
        <source>DPI</source>
        <translation>DPI</translation>
    </message>
    <message>
        <location filename="../ui/save_file_dialog.cpp" line="71"/>
        <source>This build was compiled without the Qt SVG module.</source>
        <translation>此版本编译时未包含 Qt SVG 模块。</translation>
    </message>
    <message>
        <location filename="../ui/save_file_dialog.cpp" line="143"/>
        <source>%1 files (*.%2)</source>
        <translation>%1 文件 (*.%2)</translation>
    </message>
</context>
<context>
    <name>SerialService</name>
    <message>
        <location filename="../transport/serial_service.cpp" line="121"/>
        <source>Serial service is shutting down.</source>
        <translation>串口服务正在关闭。</translation>
    </message>
    <message>
        <location filename="../transport/serial_service.cpp" line="154"/>
        <source>Reconnecting.</source>
        <translation>正在重新连接。</translation>
    </message>
    <message>
        <location filename="../transport/serial_service.cpp" line="166"/>
        <location filename="../transport/serial_service.cpp" line="170"/>
        <location filename="../transport/serial_service.cpp" line="184"/>
        <location filename="../transport/serial_service.cpp" line="200"/>
        <location filename="../transport/serial_service.cpp" line="581"/>
        <location filename="../transport/serial_service.cpp" line="593"/>
        <source>Disconnected.</source>
        <translation>已断开。</translation>
    </message>
    <message>
        <location filename="../transport/serial_service.cpp" line="232"/>
        <location filename="../transport/serial_service.cpp" line="258"/>
        <location filename="../transport/serial_service.cpp" line="773"/>
        <location filename="../transport/serial_service.cpp" line="879"/>
        <source>Serial port is not open.</source>
        <translation>串口未打开。</translation>
    </message>
    <message>
        <location filename="../transport/serial_service.cpp" line="232"/>
        <location filename="../transport/serial_service.cpp" line="773"/>
        <source>Disconnecting.</source>
        <translation>正在断开。</translation>
    </message>
    <message>
        <location filename="../transport/serial_service.cpp" line="325"/>
        <source>Command &apos;%1&apos; failed: %2</source>
        <translation>命令“%1”失败：%2</translation>
    </message>
    <message>
        <location filename="../transport/serial_service.cpp" line="338"/>
        <source>The actuator did not answer after restarting: %1</source>
        <translation>驱动器重启后没有响应：%1</translation>
    </message>
    <message>
        <location filename="../transport/serial_service.cpp" line="362"/>
        <source>Actuator detected on %1.</source>
        <translation>在 %1 上检测到驱动器。</translation>
    </message>
    <message>
        <location filename="../transport/serial_service.cpp" line="363"/>
        <source>No VBDrive found on %1: %2</source>
        <translation>在 %1 上未找到 VBDrive：%2</translation>
    </message>
    <message>
        <location filename="../transport/serial_service.cpp" line="740"/>
        <source>the device reports itself as &apos;%1&apos;, not as a VBDrive.</source>
        <translation>设备报告自身为“%1”，而不是 VBDrive。</translation>
    </message>
    <message>
        <source>No actuator answered on %1: %2</source>
        <translation type="vanished">%1 上没有驱动器响应：%2</translation>
    </message>
    <message>
        <location filename="../transport/serial_service.cpp" line="371"/>
        <source>Could not enter CONFIG mode: %1</source>
        <translation>无法进入 CONFIG 模式：%1</translation>
    </message>
    <message>
        <location filename="../transport/serial_service.cpp" line="440"/>
        <source>The actuator reported no calibration progress for %1 s.</source>
        <translation>驱动器在 %1 秒内未报告校准进度。</translation>
    </message>
    <message>
        <location filename="../transport/serial_service.cpp" line="481"/>
        <source>These registers were rejected by the actuator: %1</source>
        <translation>驱动器拒绝了这些寄存器：%1</translation>
    </message>
    <message>
        <location filename="../transport/serial_service.cpp" line="582"/>
        <source>The serial connection was lost.</source>
        <translation>串口连接已断开。</translation>
    </message>
    <message>
        <location filename="../transport/serial_service.cpp" line="593"/>
        <source>Serial connection lost.</source>
        <translation>串口连接已丢失。</translation>
    </message>
    <message>
        <location filename="../transport/serial_service.cpp" line="618"/>
        <source>The actuator did not come back after restarting.</source>
        <translation>驱动器重启后未恢复连接。</translation>
    </message>
    <message>
        <location filename="../transport/serial_service.cpp" line="675"/>
        <source>The actuator did not answer in time.</source>
        <translation>驱动器未及时响应。</translation>
    </message>
    <message>
        <location filename="../transport/serial_service.cpp" line="736"/>
        <source>Could not interpret the value &apos;%1&apos;.</source>
        <translation>无法解析值“%1”。</translation>
    </message>
</context>
<context>
    <name>SerialWorker</name>
    <message>
        <location filename="../transport/serial_worker.cpp" line="62"/>
        <source>Port %1 opened at %2 baud.</source>
        <translation>端口 %1 已以 %2 波特打开。</translation>
    </message>
    <message>
        <location filename="../transport/serial_worker.cpp" line="86"/>
        <source>Serial port is not open.</source>
        <translation>串口未打开。</translation>
    </message>
</context>
<context>
    <name>VbbootFlasher</name>
    <message>
        <location filename="../firmware/vbboot_flasher.cpp" line="217"/>
        <source>A flashing operation is already running.</source>
        <translation>烧录操作已在进行中。</translation>
    </message>
    <message>
        <location filename="../firmware/vbboot_flasher.cpp" line="243"/>
        <source>Could not open %1: %2</source>
        <translation>无法打开 %1：%2</translation>
    </message>
    <message>
        <location filename="../firmware/vbboot_flasher.cpp" line="259"/>
        <source>%1, line %2: not an Intel HEX record.</source>
        <translation>%1，第 %2 行：不是 Intel HEX 记录。</translation>
    </message>
    <message>
        <location filename="../firmware/vbboot_flasher.cpp" line="268"/>
        <source>%1, line %2: checksum mismatch.</source>
        <translation>%1，第 %2 行：校验和不匹配。</translation>
    </message>
    <message>
        <location filename="../firmware/vbboot_flasher.cpp" line="300"/>
        <source>%1 holds no VBDrive application at %2.</source>
        <translation>%1 中在 %2 处没有 VBDrive 应用程序。</translation>
    </message>
    <message>
        <location filename="../firmware/vbboot_flasher.cpp" line="309"/>
        <source>The application in %1 does not fit into the flash.</source>
        <translation>%1 中的应用程序超出闪存容量。</translation>
    </message>
    <message>
        <location filename="../firmware/vbboot_flasher.cpp" line="323"/>
        <source>The actuator stays in the bootloader, and its old firmware may already be erased. Keep it selected and press Flash again.</source>
        <translation>驱动器停留在引导程序中，其旧固件可能已被擦除。请保持选中该驱动器并再次点击“烧录”。</translation>
    </message>
    <message>
        <location filename="../firmware/vbboot_flasher.cpp" line="328"/>
        <source>Firmware written and verified.</source>
        <translation>固件已写入并校验。</translation>
    </message>
    <message>
        <location filename="../firmware/vbboot_flasher.cpp" line="342"/>
        <source>Could not open %1 for flashing: %2</source>
        <translation>无法打开 %1 进行烧录：%2</translation>
    </message>
    <message>
        <location filename="../firmware/vbboot_flasher.cpp" line="352"/>
        <source>Waiting for the bootloader...</source>
        <translation>正在等待引导程序...</translation>
    </message>
    <message>
        <location filename="../firmware/vbboot_flasher.cpp" line="372"/>
        <source>The bootloader did not answer on CAN id %1. Check the CAN connection, and that the actuator&apos;s firmware supports VBBoot.</source>
        <translation>引导程序未在 CAN ID %1 上应答。请检查 CAN 连接，并确认驱动器固件支持 VBBoot。</translation>
    </message>
    <message>
        <location filename="../firmware/vbboot_flasher.cpp" line="383"/>
        <source>Erasing the old firmware...</source>
        <translation>正在擦除旧固件...</translation>
    </message>
    <message>
        <location filename="../firmware/vbboot_flasher.cpp" line="405"/>
        <location filename="../firmware/vbboot_flasher.cpp" line="485"/>
        <source>Flashing cancelled.</source>
        <translation>已取消烧录。</translation>
    </message>
    <message>
        <location filename="../firmware/vbboot_flasher.cpp" line="415"/>
        <source>The bootloader refused the data at offset %1.</source>
        <translation>引导程序拒绝了偏移 %1 处的数据。</translation>
    </message>
    <message>
        <location filename="../firmware/vbboot_flasher.cpp" line="425"/>
        <source>Writing the firmware: %1 of %2 bytes...</source>
        <translation>正在写入固件：%1 / %2 字节...</translation>
    </message>
    <message>
        <location filename="../firmware/vbboot_flasher.cpp" line="439"/>
        <source>The bootloader rejected the written image: its size or CRC32 does not match. Some frames were probably lost on the bus.</source>
        <translation>引导程序拒绝了写入的映像：大小或 CRC32 不匹配。可能有部分帧在总线上丢失。</translation>
    </message>
    <message>
        <location filename="../firmware/vbboot_flasher.cpp" line="448"/>
        <source>Done.</source>
        <translation>完成。</translation>
    </message>
    <message>
        <location filename="../firmware/vbboot_flasher.cpp" line="469"/>
        <source>The bootloader refused %1.</source>
        <translation>引导程序拒绝了 %1。</translation>
    </message>
    <message>
        <location filename="../firmware/vbboot_flasher.cpp" line="471"/>
        <source>The bootloader did not answer %1 in time: the CAN connection was probably lost.</source>
        <translation>引导程序未及时应答 %1：CAN 连接可能已断开。</translation>
    </message>
    <message>
        <location filename="../firmware/vbboot_flasher.cpp" line="475"/>
        <source>The CAN interface went bus-off during %1. Check the wiring and the termination.</source>
        <translation>CAN 接口在 %1 期间进入 bus-off 状态。请检查接线和终端电阻。</translation>
    </message>
    <message>
        <location filename="../firmware/vbboot_flasher.cpp" line="480"/>
        <source>The CAN bus is not taking frames (%1): nothing acknowledges them. Check the CAN connection.</source>
        <translation>CAN 总线不接收帧（%1）：没有节点应答。请检查 CAN 连接。</translation>
    </message>
    <message>
        <location filename="../firmware/vbboot_flasher.cpp" line="483"/>
        <source>CAN error during %1: %2</source>
        <translation>%1 期间发生 CAN 错误：%2</translation>
    </message>
</context>
<context>
    <name>plot_export</name>
    <message>
        <location filename="../ui/plot_export.cpp" line="62"/>
        <source>The plot is not initialised.</source>
        <translation type="unfinished">图表尚未初始化。</translation>
    </message>
    <message>
        <location filename="../ui/plot_export.cpp" line="67"/>
        <source>This build cannot write SVG: the Qt SVG module was not available when it was compiled. Choose PNG or JPG instead.</source>
        <translation>此版本无法保存 SVG：编译时 Qt SVG 模块不可用。请改用 PNG 或 JPG。</translation>
    </message>
    <message>
        <location filename="../ui/plot_export.cpp" line="98"/>
        <source>Could not write %1.</source>
        <translation type="unfinished">无法写入 %1。</translation>
    </message>
</context>
</TS>
