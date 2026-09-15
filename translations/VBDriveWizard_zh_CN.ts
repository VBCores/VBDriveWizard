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
        <location filename="../ui/config_manager.cpp" line="191"/>
        <location filename="../ui/config_manager.cpp" line="226"/>
        <source>Cannot write %1: %2</source>
        <translation>无法写入 %1：%2</translation>
    </message>
    <message>
        <location filename="../ui/config_manager.cpp" line="237"/>
        <source>Settings loaded.</source>
        <translation>设置已加载。</translation>
    </message>
    <message>
        <location filename="../ui/config_manager.cpp" line="239"/>
        <source>No settings file found; defaults are in use.</source>
        <translation>未找到设置文件，正在使用默认值。</translation>
    </message>
    <message>
        <location filename="../ui/config_manager.cpp" line="242"/>
        <source>Settings file could not be read; defaults are in use.</source>
        <translation>无法读取设置文件，正在使用默认值。</translation>
    </message>
</context>
<context>
    <name>CyphalBridge</name>
    <message>
        <location filename="../transport/cyphal_worker.cpp" line="140"/>
        <source>The Cyphal stack reported an internal error.</source>
        <translation>Cyphal 协议栈报告了内部错误。</translation>
    </message>
    <message>
        <location filename="../transport/cyphal_worker.cpp" line="158"/>
        <source>Could not open CAN interface %1.</source>
        <translation>无法打开 CAN 接口 %1。</translation>
    </message>
</context>
<context>
    <name>CyphalService</name>
    <message>
        <location filename="../transport/cyphal_service.cpp" line="74"/>
        <source>The CAN connection was closed.</source>
        <translation>CAN 连接已关闭。</translation>
    </message>
    <message>
        <location filename="../transport/cyphal_service.cpp" line="105"/>
        <source>No VBDrive answered on %1 within %2 seconds.</source>
        <translation>%2 秒内没有 VBDrive 在 %1 上响应。</translation>
    </message>
    <message numerus="yes">
        <location filename="../transport/cyphal_service.cpp" line="111"/>
        <source>Found %n drive(s) on %1.</source>
        <translation>
            <numerusform>在 %1 上找到 %n 个驱动器。</numerusform>
        </translation>
    </message>
    <message>
        <location filename="../transport/cyphal_service.cpp" line="135"/>
        <source>The drive stopped answering.</source>
        <translation>驱动器停止响应。</translation>
    </message>
    <message>
        <location filename="../transport/cyphal_service.cpp" line="142"/>
        <source>The drive did not answer register &apos;%1&apos; in time.</source>
        <translation>驱动器未及时响应寄存器“%1”。</translation>
    </message>
    <message>
        <location filename="../transport/cyphal_service.cpp" line="170"/>
        <source>Could not send the request.</source>
        <translation>无法发送请求。</translation>
    </message>
    <message>
        <location filename="../transport/cyphal_service.cpp" line="193"/>
        <source>The drive did not accept the value.</source>
        <translation>驱动器未接受该值。</translation>
    </message>
    <message>
        <location filename="../transport/cyphal_service.cpp" line="194"/>
        <source>Register &apos;%1&apos; is read-only.</source>
        <translation>寄存器“%1”为只读。</translation>
    </message>
    <message>
        <location filename="../transport/cyphal_service.cpp" line="203"/>
        <source>Register &apos;%1&apos; is not available on this drive.</source>
        <translation>该驱动器上没有寄存器“%1”。</translation>
    </message>
    <message>
        <location filename="../transport/cyphal_service.cpp" line="231"/>
        <source>These registers were rejected by the drive: %1</source>
        <translation>驱动器拒绝了这些寄存器：%1</translation>
    </message>
</context>
<context>
    <name>DeviceModel</name>
    <message>
        <location filename="../core/device_model.cpp" line="21"/>
        <source>Unknown drive</source>
        <translation>未知驱动器</translation>
    </message>
</context>
<context>
    <name>FirmwareDownloader</name>
    <message>
        <location filename="../firmware/firmware_downloader.cpp" line="42"/>
        <source>A firmware download is already running.</source>
        <translation>固件下载已在进行中。</translation>
    </message>
    <message>
        <location filename="../firmware/firmware_downloader.cpp" line="52"/>
        <source>Looking up the latest release...</source>
        <translation>正在查找最新版本...</translation>
    </message>
    <message>
        <location filename="../firmware/firmware_downloader.cpp" line="73"/>
        <source>Could not reach the VBDrive releases: %1</source>
        <translation>无法访问 VBDrive 发布列表：%1</translation>
    </message>
    <message>
        <location filename="../firmware/firmware_downloader.cpp" line="92"/>
        <source>Release %1 does not contain %2.</source>
        <translation>版本 %1 不包含 %2。</translation>
    </message>
    <message>
        <location filename="../firmware/firmware_downloader.cpp" line="93"/>
        <source>(unknown)</source>
        <translation>（未知）</translation>
    </message>
    <message>
        <location filename="../firmware/firmware_downloader.cpp" line="102"/>
        <location filename="../firmware/firmware_downloader.cpp" line="115"/>
        <source>Downloading %1...</source>
        <translation>正在下载 %1...</translation>
    </message>
    <message>
        <location filename="../firmware/firmware_downloader.cpp" line="130"/>
        <source>Firmware download failed: %1</source>
        <translation>固件下载失败：%1</translation>
    </message>
    <message>
        <location filename="../firmware/firmware_downloader.cpp" line="141"/>
        <location filename="../firmware/firmware_downloader.cpp" line="146"/>
        <source>Could not write %1: %2</source>
        <translation>无法写入 %1：%2</translation>
    </message>
    <message>
        <location filename="../firmware/firmware_downloader.cpp" line="150"/>
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
        <location filename="../build/Desktop-Debug/VBDriveWizard_autogen/include/ui_mainwindow.h" line="2140"/>
        <source>VBDrive Wizard</source>
        <translation>VBDrive Wizard</translation>
    </message>
    <message>
        <location filename="../mainwindow.ui" line="23"/>
        <location filename="../build/Desktop-Debug/VBDriveWizard_autogen/include/ui_mainwindow.h" line="2141"/>
        <source>CONNECTION</source>
        <translation>连接</translation>
    </message>
    <message>
        <location filename="../mainwindow.ui" line="29"/>
        <location filename="../build/Desktop-Debug/VBDriveWizard_autogen/include/ui_mainwindow.h" line="2142"/>
        <source>Serial</source>
        <translation>Serial</translation>
    </message>
    <message>
        <location filename="../mainwindow.ui" line="42"/>
        <location filename="../mainwindow.ui" line="66"/>
        <location filename="../mainwindow.cpp" line="897"/>
        <location filename="../mainwindow.cpp" line="898"/>
        <location filename="../build/Desktop-Debug/VBDriveWizard_autogen/include/ui_mainwindow.h" line="2143"/>
        <location filename="../build/Desktop-Debug/VBDriveWizard_autogen/include/ui_mainwindow.h" line="2146"/>
        <source>Connect</source>
        <translation>连接</translation>
    </message>
    <message>
        <location filename="../mainwindow.ui" line="49"/>
        <location filename="../mainwindow.ui" line="73"/>
        <location filename="../build/Desktop-Debug/VBDriveWizard_autogen/include/ui_mainwindow.h" line="2144"/>
        <location filename="../build/Desktop-Debug/VBDriveWizard_autogen/include/ui_mainwindow.h" line="2147"/>
        <source>Refresh</source>
        <translation>刷新</translation>
    </message>
    <message>
        <location filename="../mainwindow.ui" line="56"/>
        <location filename="../mainwindow.ui" line="395"/>
        <location filename="../build/Desktop-Debug/VBDriveWizard_autogen/include/ui_mainwindow.h" line="2145"/>
        <location filename="../build/Desktop-Debug/VBDriveWizard_autogen/include/ui_mainwindow.h" line="2184"/>
        <source>CAN</source>
        <translation>CAN</translation>
    </message>
    <message>
        <location filename="../mainwindow.ui" line="83"/>
        <location filename="../build/Desktop-Debug/VBDriveWizard_autogen/include/ui_mainwindow.h" line="2148"/>
        <source>DEVICES</source>
        <translation>设备</translation>
    </message>
    <message>
        <location filename="../mainwindow.ui" line="136"/>
        <location filename="../build/Desktop-Debug/VBDriveWizard_autogen/include/ui_mainwindow.h" line="2150"/>
        <source>CONFIGURATION</source>
        <translation>配置</translation>
    </message>
    <message>
        <location filename="../mainwindow.ui" line="146"/>
        <location filename="../build/Desktop-Debug/VBDriveWizard_autogen/include/ui_mainwindow.h" line="2169"/>
        <source>Basic</source>
        <translation>基本</translation>
    </message>
    <message>
        <location filename="../mainwindow.ui" line="152"/>
        <location filename="../build/Desktop-Debug/VBDriveWizard_autogen/include/ui_mainwindow.h" line="2151"/>
        <source>Limits</source>
        <translation>限制</translation>
    </message>
    <message>
        <location filename="../mainwindow.ui" line="160"/>
        <location filename="../mainwindow.ui" line="2610"/>
        <location filename="../build/Desktop-Debug/VBDriveWizard_autogen/include/ui_mainwindow.h" line="2152"/>
        <location filename="../build/Desktop-Debug/VBDriveWizard_autogen/include/ui_mainwindow.h" line="2309"/>
        <source>Angle</source>
        <translation>角度</translation>
    </message>
    <message>
        <location filename="../mainwindow.ui" line="167"/>
        <location filename="../build/Desktop-Debug/VBDriveWizard_autogen/include/ui_mainwindow.h" line="2153"/>
        <source>min:</source>
        <translation>最小:</translation>
    </message>
    <message>
        <location filename="../mainwindow.ui" line="190"/>
        <location filename="../build/Desktop-Debug/VBDriveWizard_autogen/include/ui_mainwindow.h" line="2154"/>
        <source>max</source>
        <translation>最大</translation>
    </message>
    <message>
        <location filename="../mainwindow.ui" line="220"/>
        <location filename="../mainwindow.ui" line="1097"/>
        <location filename="../mainwindow.ui" line="1294"/>
        <location filename="../mainwindow.ui" line="1349"/>
        <location filename="../mainwindow.ui" line="2124"/>
        <location filename="../mainwindow.ui" line="2452"/>
        <location filename="../build/Desktop-Debug/VBDriveWizard_autogen/include/ui_mainwindow.h" line="2155"/>
        <location filename="../build/Desktop-Debug/VBDriveWizard_autogen/include/ui_mainwindow.h" line="2223"/>
        <location filename="../build/Desktop-Debug/VBDriveWizard_autogen/include/ui_mainwindow.h" line="2246"/>
        <location filename="../build/Desktop-Debug/VBDriveWizard_autogen/include/ui_mainwindow.h" line="2251"/>
        <location filename="../build/Desktop-Debug/VBDriveWizard_autogen/include/ui_mainwindow.h" line="2281"/>
        <location filename="../build/Desktop-Debug/VBDriveWizard_autogen/include/ui_mainwindow.h" line="2291"/>
        <source>Velocity</source>
        <translation>速度</translation>
    </message>
    <message>
        <location filename="../mainwindow.ui" line="250"/>
        <location filename="../mainwindow.ui" line="1102"/>
        <location filename="../mainwindow.ui" line="1301"/>
        <location filename="../mainwindow.ui" line="2163"/>
        <location filename="../mainwindow.ui" line="2445"/>
        <location filename="../build/Desktop-Debug/VBDriveWizard_autogen/include/ui_mainwindow.h" line="2156"/>
        <location filename="../build/Desktop-Debug/VBDriveWizard_autogen/include/ui_mainwindow.h" line="2224"/>
        <location filename="../build/Desktop-Debug/VBDriveWizard_autogen/include/ui_mainwindow.h" line="2247"/>
        <location filename="../build/Desktop-Debug/VBDriveWizard_autogen/include/ui_mainwindow.h" line="2282"/>
        <location filename="../build/Desktop-Debug/VBDriveWizard_autogen/include/ui_mainwindow.h" line="2290"/>
        <source>Torque</source>
        <translation>转矩</translation>
    </message>
    <message>
        <location filename="../mainwindow.ui" line="286"/>
        <location filename="../build/Desktop-Debug/VBDriveWizard_autogen/include/ui_mainwindow.h" line="2160"/>
        <source>Voltage</source>
        <translation>电压</translation>
    </message>
    <message>
        <location filename="../mainwindow.ui" line="283"/>
        <location filename="../mainwindow.ui" line="296"/>
        <location filename="../build/Desktop-Debug/VBDriveWizard_autogen/include/ui_mainwindow.h" line="2158"/>
        <location filename="../build/Desktop-Debug/VBDriveWizard_autogen/include/ui_mainwindow.h" line="2162"/>
        <source>The firmware exposes no voltage limit register yet.</source>
        <translation>固件尚未提供电压限制寄存器。</translation>
    </message>
    <message>
        <location filename="../mainwindow.ui" line="322"/>
        <location filename="../mainwindow.ui" line="1112"/>
        <location filename="../build/Desktop-Debug/VBDriveWizard_autogen/include/ui_mainwindow.h" line="2164"/>
        <location filename="../build/Desktop-Debug/VBDriveWizard_autogen/include/ui_mainwindow.h" line="2226"/>
        <source>Current</source>
        <translation>电流</translation>
    </message>
    <message>
        <location filename="../mainwindow.ui" line="352"/>
        <location filename="../build/Desktop-Debug/VBDriveWizard_autogen/include/ui_mainwindow.h" line="2165"/>
        <source>Direction</source>
        <translation>方向</translation>
    </message>
    <message>
        <location filename="../mainwindow.ui" line="360"/>
        <location filename="../build/Desktop-Debug/VBDriveWizard_autogen/include/ui_mainwindow.h" line="2166"/>
        <source>CCW</source>
        <translation>逆时针</translation>
    </message>
    <message>
        <location filename="../mainwindow.ui" line="365"/>
        <location filename="../build/Desktop-Debug/VBDriveWizard_autogen/include/ui_mainwindow.h" line="2167"/>
        <source>CW</source>
        <translation>顺时针</translation>
    </message>
    <message>
        <location filename="../mainwindow.ui" line="401"/>
        <location filename="../build/Desktop-Debug/VBDriveWizard_autogen/include/ui_mainwindow.h" line="2170"/>
        <source>Data Baud Rate</source>
        <translation>数据段波特率</translation>
    </message>
    <message>
        <location filename="../mainwindow.ui" line="408"/>
        <location filename="../build/Desktop-Debug/VBDriveWizard_autogen/include/ui_mainwindow.h" line="2171"/>
        <source>Node ID</source>
        <translation>Node ID</translation>
    </message>
    <message>
        <location filename="../mainwindow.ui" line="435"/>
        <location filename="../build/Desktop-Debug/VBDriveWizard_autogen/include/ui_mainwindow.h" line="2172"/>
        <source>62.5 kHz</source>
        <translation>62.5 kHz</translation>
    </message>
    <message>
        <location filename="../mainwindow.ui" line="440"/>
        <location filename="../build/Desktop-Debug/VBDriveWizard_autogen/include/ui_mainwindow.h" line="2173"/>
        <source>125 kHz</source>
        <translation>125 kHz</translation>
    </message>
    <message>
        <location filename="../mainwindow.ui" line="445"/>
        <location filename="../build/Desktop-Debug/VBDriveWizard_autogen/include/ui_mainwindow.h" line="2174"/>
        <source>250 kHz</source>
        <translation>250 kHz</translation>
    </message>
    <message>
        <location filename="../mainwindow.ui" line="450"/>
        <location filename="../build/Desktop-Debug/VBDriveWizard_autogen/include/ui_mainwindow.h" line="2175"/>
        <source>500 kHz</source>
        <translation>500 kHz</translation>
    </message>
    <message>
        <location filename="../mainwindow.ui" line="455"/>
        <location filename="../mainwindow.ui" line="467"/>
        <location filename="../build/Desktop-Debug/VBDriveWizard_autogen/include/ui_mainwindow.h" line="2176"/>
        <location filename="../build/Desktop-Debug/VBDriveWizard_autogen/include/ui_mainwindow.h" line="2178"/>
        <source>1 MHz</source>
        <translation>1 MHz</translation>
    </message>
    <message>
        <location filename="../mainwindow.ui" line="472"/>
        <location filename="../build/Desktop-Debug/VBDriveWizard_autogen/include/ui_mainwindow.h" line="2179"/>
        <source>2 MHz</source>
        <translation>2 MHz</translation>
    </message>
    <message>
        <location filename="../mainwindow.ui" line="477"/>
        <location filename="../build/Desktop-Debug/VBDriveWizard_autogen/include/ui_mainwindow.h" line="2180"/>
        <source>4 MHz</source>
        <translation>4 MHz</translation>
    </message>
    <message>
        <location filename="../mainwindow.ui" line="482"/>
        <location filename="../build/Desktop-Debug/VBDriveWizard_autogen/include/ui_mainwindow.h" line="2181"/>
        <source>8 MHz</source>
        <translation>8 MHz</translation>
    </message>
    <message>
        <location filename="../mainwindow.ui" line="490"/>
        <location filename="../build/Desktop-Debug/VBDriveWizard_autogen/include/ui_mainwindow.h" line="2183"/>
        <source>Nominal Baud Rate</source>
        <translation>标称波特率</translation>
    </message>
    <message>
        <location filename="../mainwindow.ui" line="520"/>
        <location filename="../build/Desktop-Debug/VBDriveWizard_autogen/include/ui_mainwindow.h" line="2201"/>
        <source>Advanced</source>
        <translation>高级</translation>
    </message>
    <message>
        <location filename="../mainwindow.ui" line="612"/>
        <location filename="../build/Desktop-Debug/VBDriveWizard_autogen/include/ui_mainwindow.h" line="2186"/>
        <source>Gear Ratio</source>
        <translation>减速比</translation>
    </message>
    <message>
        <location filename="../mainwindow.ui" line="743"/>
        <location filename="../mainwindow.ui" line="1117"/>
        <location filename="../build/Desktop-Debug/VBDriveWizard_autogen/include/ui_mainwindow.h" line="2194"/>
        <location filename="../build/Desktop-Debug/VBDriveWizard_autogen/include/ui_mainwindow.h" line="2227"/>
        <source>Encoder</source>
        <translation>编码器</translation>
    </message>
    <message>
        <location filename="../mainwindow.ui" line="842"/>
        <location filename="../build/Desktop-Debug/VBDriveWizard_autogen/include/ui_mainwindow.h" line="2196"/>
        <source>Torque const</source>
        <translation>转矩常数</translation>
    </message>
    <message>
        <location filename="../mainwindow.ui" line="863"/>
        <location filename="../build/Desktop-Debug/VBDriveWizard_autogen/include/ui_mainwindow.h" line="2199"/>
        <source>Current Kp</source>
        <translation>电流 Kp</translation>
    </message>
    <message>
        <location filename="../mainwindow.ui" line="635"/>
        <location filename="../build/Desktop-Debug/VBDriveWizard_autogen/include/ui_mainwindow.h" line="2187"/>
        <source>Current Ki</source>
        <translation>电流 Ki</translation>
    </message>
    <message>
        <location filename="../mainwindow.ui" line="856"/>
        <location filename="../build/Desktop-Debug/VBDriveWizard_autogen/include/ui_mainwindow.h" line="2198"/>
        <source>Position Offset</source>
        <translation>位置偏移</translation>
    </message>
    <message>
        <location filename="../mainwindow.ui" line="661"/>
        <location filename="../build/Desktop-Debug/VBDriveWizard_autogen/include/ui_mainwindow.h" line="2192"/>
        <source>Main Filter Param A</source>
        <translation>主滤波器参数 A</translation>
    </message>
    <message>
        <location filename="../mainwindow.ui" line="832"/>
        <location filename="../build/Desktop-Debug/VBDriveWizard_autogen/include/ui_mainwindow.h" line="2195"/>
        <source>Filter Gain 1</source>
        <translation>滤波增益 1</translation>
    </message>
    <message>
        <location filename="../mainwindow.ui" line="720"/>
        <location filename="../build/Desktop-Debug/VBDriveWizard_autogen/include/ui_mainwindow.h" line="2193"/>
        <source>Filter Gain 2</source>
        <translation>滤波增益 2</translation>
    </message>
    <message>
        <location filename="../mainwindow.ui" line="849"/>
        <location filename="../build/Desktop-Debug/VBDriveWizard_autogen/include/ui_mainwindow.h" line="2197"/>
        <source>Filter Gain 3</source>
        <translation>滤波增益 3</translation>
    </message>
    <message>
        <location filename="../mainwindow.ui" line="583"/>
        <location filename="../build/Desktop-Debug/VBDriveWizard_autogen/include/ui_mainwindow.h" line="2185"/>
        <source>Current LPF Gain</source>
        <translation>电流低通滤波增益</translation>
    </message>
    <message>
        <location filename="../mainwindow.ui" line="643"/>
        <location filename="../build/Desktop-Debug/VBDriveWizard_autogen/include/ui_mainwindow.h" line="2188"/>
        <source>rotor</source>
        <translation>转子</translation>
    </message>
    <message>
        <location filename="../mainwindow.ui" line="648"/>
        <location filename="../build/Desktop-Debug/VBDriveWizard_autogen/include/ui_mainwindow.h" line="2189"/>
        <source>shaft</source>
        <translation>输出轴</translation>
    </message>
    <message>
        <location filename="../mainwindow.ui" line="653"/>
        <location filename="../build/Desktop-Debug/VBDriveWizard_autogen/include/ui_mainwindow.h" line="2190"/>
        <source>external</source>
        <translation>外部</translation>
    </message>
    <message>
        <location filename="../mainwindow.ui" line="870"/>
        <location filename="../build/Desktop-Debug/VBDriveWizard_autogen/include/ui_mainwindow.h" line="2200"/>
        <source>Current Kd</source>
        <translation>电流 Kd</translation>
    </message>
    <message>
        <location filename="../mainwindow.ui" line="878"/>
        <location filename="../build/Desktop-Debug/VBDriveWizard_autogen/include/ui_mainwindow.h" line="2215"/>
        <source>System</source>
        <translation>系统</translation>
    </message>
    <message>
        <location filename="../mainwindow.ui" line="884"/>
        <location filename="../build/Desktop-Debug/VBDriveWizard_autogen/include/ui_mainwindow.h" line="2202"/>
        <source>Sensor</source>
        <translation>传感器</translation>
    </message>
    <message>
        <location filename="../mainwindow.ui" line="890"/>
        <location filename="../build/Desktop-Debug/VBDriveWizard_autogen/include/ui_mainwindow.h" line="2203"/>
        <source>Calibrate</source>
        <translation>校准</translation>
    </message>
    <message>
        <location filename="../mainwindow.ui" line="910"/>
        <location filename="../build/Desktop-Debug/VBDriveWizard_autogen/include/ui_mainwindow.h" line="2204"/>
        <source>Register Parameters</source>
        <translation>寄存器参数</translation>
    </message>
    <message>
        <location filename="../mainwindow.ui" line="916"/>
        <location filename="../build/Desktop-Debug/VBDriveWizard_autogen/include/ui_mainwindow.h" line="2205"/>
        <source>Save to File...</source>
        <translation>保存到文件...</translation>
    </message>
    <message>
        <location filename="../mainwindow.ui" line="923"/>
        <location filename="../build/Desktop-Debug/VBDriveWizard_autogen/include/ui_mainwindow.h" line="2206"/>
        <source>Load from File...</source>
        <translation>从文件加载...</translation>
    </message>
    <message>
        <location filename="../mainwindow.ui" line="930"/>
        <location filename="../build/Desktop-Debug/VBDriveWizard_autogen/include/ui_mainwindow.h" line="2207"/>
        <source>Restore to Default</source>
        <translation>恢复默认值</translation>
    </message>
    <message>
        <location filename="../mainwindow.ui" line="940"/>
        <location filename="../build/Desktop-Debug/VBDriveWizard_autogen/include/ui_mainwindow.h" line="2208"/>
        <source>Firmware</source>
        <translation>固件</translation>
    </message>
    <message>
        <location filename="../mainwindow.ui" line="948"/>
        <location filename="../build/Desktop-Debug/VBDriveWizard_autogen/include/ui_mainwindow.h" line="2209"/>
        <source>Current Version:</source>
        <translation>当前版本：</translation>
    </message>
    <message>
        <location filename="../mainwindow.ui" line="955"/>
        <location filename="../build/Desktop-Debug/VBDriveWizard_autogen/include/ui_mainwindow.h" line="2210"/>
        <source>0.0.1</source>
        <translation>0.0.1</translation>
    </message>
    <message>
        <location filename="../mainwindow.ui" line="966"/>
        <location filename="../build/Desktop-Debug/VBDriveWizard_autogen/include/ui_mainwindow.h" line="2211"/>
        <source>Choose file</source>
        <translation>选择文件</translation>
    </message>
    <message>
        <location filename="../mainwindow.ui" line="976"/>
        <location filename="../build/Desktop-Debug/VBDriveWizard_autogen/include/ui_mainwindow.h" line="2212"/>
        <source>Open</source>
        <translation>打开</translation>
    </message>
    <message>
        <location filename="../mainwindow.ui" line="985"/>
        <location filename="../build/Desktop-Debug/VBDriveWizard_autogen/include/ui_mainwindow.h" line="2213"/>
        <source>Download from remote repo</source>
        <translation>从远程仓库下载</translation>
    </message>
    <message>
        <location filename="../mainwindow.ui" line="994"/>
        <location filename="../build/Desktop-Debug/VBDriveWizard_autogen/include/ui_mainwindow.h" line="2214"/>
        <source>Flash</source>
        <translation>烧录</translation>
    </message>
    <message>
        <location filename="../mainwindow.ui" line="1032"/>
        <location filename="../build/Desktop-Debug/VBDriveWizard_autogen/include/ui_mainwindow.h" line="2216"/>
        <source>Read</source>
        <translation>读取</translation>
    </message>
    <message>
        <location filename="../mainwindow.ui" line="1039"/>
        <location filename="../build/Desktop-Debug/VBDriveWizard_autogen/include/ui_mainwindow.h" line="2217"/>
        <source>Write</source>
        <translation>写入</translation>
    </message>
    <message>
        <location filename="../mainwindow.ui" line="1046"/>
        <location filename="../build/Desktop-Debug/VBDriveWizard_autogen/include/ui_mainwindow.h" line="2218"/>
        <source>Set Origin</source>
        <translation>设为零点</translation>
    </message>
    <message>
        <location filename="../mainwindow.ui" line="1055"/>
        <location filename="../build/Desktop-Debug/VBDriveWizard_autogen/include/ui_mainwindow.h" line="2219"/>
        <source>&lt;html&gt;&lt;head/&gt;&lt;body&gt;&lt;p align=&quot;center&quot;&gt;Logo&lt;/p&gt;&lt;/body&gt;&lt;/html&gt;</source>
        <translation>&lt;html&gt;&lt;head/&gt;&lt;body&gt;&lt;p align=&quot;center&quot;&gt;Logo&lt;/p&gt;&lt;/body&gt;&lt;/html&gt;</translation>
    </message>
    <message>
        <location filename="../mainwindow.ui" line="1070"/>
        <location filename="../build/Desktop-Debug/VBDriveWizard_autogen/include/ui_mainwindow.h" line="2220"/>
        <source>REALTIME DATA</source>
        <translation>实时数据</translation>
    </message>
    <message>
        <location filename="../mainwindow.ui" line="1084"/>
        <location filename="../build/Desktop-Debug/VBDriveWizard_autogen/include/ui_mainwindow.h" line="2221"/>
        <source>Signal:</source>
        <translation>信号：</translation>
    </message>
    <message>
        <location filename="../mainwindow.ui" line="1092"/>
        <location filename="../mainwindow.ui" line="1284"/>
        <location filename="../mainwindow.ui" line="2085"/>
        <location filename="../mainwindow.ui" line="2459"/>
        <location filename="../build/Desktop-Debug/VBDriveWizard_autogen/include/ui_mainwindow.h" line="2222"/>
        <location filename="../build/Desktop-Debug/VBDriveWizard_autogen/include/ui_mainwindow.h" line="2245"/>
        <location filename="../build/Desktop-Debug/VBDriveWizard_autogen/include/ui_mainwindow.h" line="2280"/>
        <location filename="../build/Desktop-Debug/VBDriveWizard_autogen/include/ui_mainwindow.h" line="2292"/>
        <source>Position</source>
        <translation>位置</translation>
    </message>
    <message>
        <location filename="../mainwindow.ui" line="1107"/>
        <location filename="../build/Desktop-Debug/VBDriveWizard_autogen/include/ui_mainwindow.h" line="2225"/>
        <source>Temperature</source>
        <translation>温度</translation>
    </message>
    <message>
        <location filename="../mainwindow.ui" line="1122"/>
        <location filename="../build/Desktop-Debug/VBDriveWizard_autogen/include/ui_mainwindow.h" line="2228"/>
        <source>Log</source>
        <translation>日志</translation>
    </message>
    <message>
        <location filename="../mainwindow.ui" line="1130"/>
        <location filename="../build/Desktop-Debug/VBDriveWizard_autogen/include/ui_mainwindow.h" line="2230"/>
        <source>Units:</source>
        <translation>单位：</translation>
    </message>
    <message>
        <location filename="../mainwindow.ui" line="1138"/>
        <location filename="../mainwindow.ui" line="2624"/>
        <location filename="../build/Desktop-Debug/VBDriveWizard_autogen/include/ui_mainwindow.h" line="2231"/>
        <location filename="../build/Desktop-Debug/VBDriveWizard_autogen/include/ui_mainwindow.h" line="2311"/>
        <source>rad</source>
        <translation>rad</translation>
    </message>
    <message>
        <location filename="../mainwindow.ui" line="1143"/>
        <location filename="../build/Desktop-Debug/VBDriveWizard_autogen/include/ui_mainwindow.h" line="2232"/>
        <source>deg</source>
        <translation>deg</translation>
    </message>
    <message>
        <location filename="../mainwindow.ui" line="1164"/>
        <location filename="../build/Desktop-Debug/VBDriveWizard_autogen/include/ui_mainwindow.h" line="2234"/>
        <source>Preferences</source>
        <translation>首选项</translation>
    </message>
    <message>
        <location filename="../mainwindow.ui" line="1171"/>
        <location filename="../build/Desktop-Debug/VBDriveWizard_autogen/include/ui_mainwindow.h" line="2235"/>
        <source>Language:</source>
        <translation>语言：</translation>
    </message>
    <message>
        <location filename="../mainwindow.ui" line="1182"/>
        <location filename="../build/Desktop-Debug/VBDriveWizard_autogen/include/ui_mainwindow.h" line="2236"/>
        <source>English</source>
        <translation>English</translation>
    </message>
    <message>
        <location filename="../mainwindow.ui" line="1191"/>
        <location filename="../build/Desktop-Debug/VBDriveWizard_autogen/include/ui_mainwindow.h" line="2237"/>
        <source>Русский</source>
        <translation>Русский</translation>
    </message>
    <message>
        <location filename="../mainwindow.ui" line="1200"/>
        <location filename="../build/Desktop-Debug/VBDriveWizard_autogen/include/ui_mainwindow.h" line="2238"/>
        <source>中文</source>
        <translation>中文</translation>
    </message>
    <message>
        <location filename="../mainwindow.ui" line="1219"/>
        <location filename="../mainwindow.cpp" line="339"/>
        <location filename="../mainwindow.cpp" line="1978"/>
        <location filename="../build/Desktop-Debug/VBDriveWizard_autogen/include/ui_mainwindow.h" line="2240"/>
        <source>Pause</source>
        <translation>暂停</translation>
    </message>
    <message>
        <location filename="../mainwindow.ui" line="1226"/>
        <location filename="../build/Desktop-Debug/VBDriveWizard_autogen/include/ui_mainwindow.h" line="2241"/>
        <source>Save as CSV...</source>
        <translation>保存为 CSV...</translation>
    </message>
    <message>
        <location filename="../mainwindow.ui" line="1233"/>
        <location filename="../build/Desktop-Debug/VBDriveWizard_autogen/include/ui_mainwindow.h" line="2242"/>
        <source>Save as PNG...</source>
        <translation>保存为 PNG...</translation>
    </message>
    <message>
        <location filename="../mainwindow.ui" line="1260"/>
        <location filename="../build/Desktop-Debug/VBDriveWizard_autogen/include/ui_mainwindow.h" line="2243"/>
        <source>CONTROL</source>
        <translation>控制</translation>
    </message>
    <message>
        <location filename="../mainwindow.ui" line="1270"/>
        <location filename="../build/Desktop-Debug/VBDriveWizard_autogen/include/ui_mainwindow.h" line="2273"/>
        <source>Servo</source>
        <translation>Servo</translation>
    </message>
    <message>
        <location filename="../mainwindow.ui" line="1278"/>
        <location filename="../build/Desktop-Debug/VBDriveWizard_autogen/include/ui_mainwindow.h" line="2244"/>
        <source>Control Type</source>
        <translation>控制类型</translation>
    </message>
    <message>
        <location filename="../mainwindow.ui" line="1324"/>
        <location filename="../build/Desktop-Debug/VBDriveWizard_autogen/include/ui_mainwindow.h" line="2248"/>
        <source>Transient Form</source>
        <translation>过渡过程</translation>
    </message>
    <message>
        <location filename="../mainwindow.ui" line="1330"/>
        <location filename="../build/Desktop-Debug/VBDriveWizard_autogen/include/ui_mainwindow.h" line="2249"/>
        <source>Linear</source>
        <translation>线性</translation>
    </message>
    <message>
        <location filename="../mainwindow.ui" line="1340"/>
        <location filename="../build/Desktop-Debug/VBDriveWizard_autogen/include/ui_mainwindow.h" line="2250"/>
        <source>Polynomial</source>
        <translation>多项式</translation>
    </message>
    <message>
        <location filename="../mainwindow.ui" line="1389"/>
        <location filename="../mainwindow.ui" line="1545"/>
        <location filename="../build/Desktop-Debug/VBDriveWizard_autogen/include/ui_mainwindow.h" line="2252"/>
        <location filename="../build/Desktop-Debug/VBDriveWizard_autogen/include/ui_mainwindow.h" line="2257"/>
        <source>Set</source>
        <translation>设置</translation>
    </message>
    <message>
        <location filename="../mainwindow.ui" line="1403"/>
        <location filename="../build/Desktop-Debug/VBDriveWizard_autogen/include/ui_mainwindow.h" line="2253"/>
        <source>Feedback Gains</source>
        <translation>反馈增益</translation>
    </message>
    <message>
        <location filename="../mainwindow.ui" line="1411"/>
        <location filename="../build/Desktop-Debug/VBDriveWizard_autogen/include/ui_mainwindow.h" line="2254"/>
        <source>Kp:</source>
        <translation>Kp:</translation>
    </message>
    <message>
        <location filename="../mainwindow.ui" line="1450"/>
        <location filename="../build/Desktop-Debug/VBDriveWizard_autogen/include/ui_mainwindow.h" line="2255"/>
        <source>Ki:</source>
        <translation>Ki:</translation>
    </message>
    <message>
        <location filename="../mainwindow.ui" line="1489"/>
        <location filename="../build/Desktop-Debug/VBDriveWizard_autogen/include/ui_mainwindow.h" line="2256"/>
        <source>Kd:</source>
        <translation>Kd:</translation>
    </message>
    <message>
        <location filename="../mainwindow.ui" line="1561"/>
        <location filename="../build/Desktop-Debug/VBDriveWizard_autogen/include/ui_mainwindow.h" line="2260"/>
        <source>User</source>
        <translation>手动</translation>
    </message>
    <message>
        <location filename="../mainwindow.ui" line="1569"/>
        <location filename="../mainwindow.cpp" line="1621"/>
        <location filename="../build/Desktop-Debug/VBDriveWizard_autogen/include/ui_mainwindow.h" line="2258"/>
        <source>Target pos:</source>
        <translation>目标位置：</translation>
    </message>
    <message>
        <location filename="../mainwindow.ui" line="1641"/>
        <location filename="../mainwindow.ui" line="1767"/>
        <location filename="../mainwindow.ui" line="1893"/>
        <location filename="../mainwindow.ui" line="2019"/>
        <location filename="../mainwindow.ui" line="2491"/>
        <location filename="../mainwindow.cpp" line="1922"/>
        <location filename="../build/Desktop-Debug/VBDriveWizard_autogen/include/ui_mainwindow.h" line="2259"/>
        <location filename="../build/Desktop-Debug/VBDriveWizard_autogen/include/ui_mainwindow.h" line="2263"/>
        <location filename="../build/Desktop-Debug/VBDriveWizard_autogen/include/ui_mainwindow.h" line="2267"/>
        <location filename="../build/Desktop-Debug/VBDriveWizard_autogen/include/ui_mainwindow.h" line="2271"/>
        <location filename="../build/Desktop-Debug/VBDriveWizard_autogen/include/ui_mainwindow.h" line="2294"/>
        <source>Start</source>
        <translation>启动</translation>
    </message>
    <message>
        <location filename="../mainwindow.ui" line="1651"/>
        <location filename="../mainwindow.ui" line="2055"/>
        <location filename="../build/Desktop-Debug/VBDriveWizard_autogen/include/ui_mainwindow.h" line="2264"/>
        <location filename="../build/Desktop-Debug/VBDriveWizard_autogen/include/ui_mainwindow.h" line="2276"/>
        <source>Sin</source>
        <translation>正弦</translation>
    </message>
    <message>
        <location filename="../mainwindow.ui" line="1659"/>
        <location filename="../mainwindow.ui" line="1785"/>
        <location filename="../mainwindow.ui" line="1911"/>
        <location filename="../mainwindow.ui" line="2289"/>
        <location filename="../build/Desktop-Debug/VBDriveWizard_autogen/include/ui_mainwindow.h" line="2261"/>
        <location filename="../build/Desktop-Debug/VBDriveWizard_autogen/include/ui_mainwindow.h" line="2265"/>
        <location filename="../build/Desktop-Debug/VBDriveWizard_autogen/include/ui_mainwindow.h" line="2269"/>
        <location filename="../build/Desktop-Debug/VBDriveWizard_autogen/include/ui_mainwindow.h" line="2286"/>
        <source>Amplitude</source>
        <translation>幅值</translation>
    </message>
    <message>
        <location filename="../mainwindow.ui" line="1698"/>
        <location filename="../mainwindow.ui" line="1824"/>
        <location filename="../mainwindow.ui" line="1950"/>
        <location filename="../mainwindow.ui" line="2328"/>
        <location filename="../build/Desktop-Debug/VBDriveWizard_autogen/include/ui_mainwindow.h" line="2262"/>
        <location filename="../build/Desktop-Debug/VBDriveWizard_autogen/include/ui_mainwindow.h" line="2266"/>
        <location filename="../build/Desktop-Debug/VBDriveWizard_autogen/include/ui_mainwindow.h" line="2270"/>
        <location filename="../build/Desktop-Debug/VBDriveWizard_autogen/include/ui_mainwindow.h" line="2287"/>
        <source>Frequency</source>
        <translation>频率</translation>
    </message>
    <message>
        <location filename="../mainwindow.ui" line="1777"/>
        <location filename="../mainwindow.ui" line="2062"/>
        <location filename="../build/Desktop-Debug/VBDriveWizard_autogen/include/ui_mainwindow.h" line="2268"/>
        <location filename="../build/Desktop-Debug/VBDriveWizard_autogen/include/ui_mainwindow.h" line="2277"/>
        <source>Meander</source>
        <translation>方波</translation>
    </message>
    <message>
        <location filename="../mainwindow.ui" line="1903"/>
        <location filename="../mainwindow.ui" line="2069"/>
        <location filename="../build/Desktop-Debug/VBDriveWizard_autogen/include/ui_mainwindow.h" line="2272"/>
        <location filename="../build/Desktop-Debug/VBDriveWizard_autogen/include/ui_mainwindow.h" line="2278"/>
        <source>Triangle</source>
        <translation>三角波</translation>
    </message>
    <message>
        <location filename="../mainwindow.ui" line="2033"/>
        <location filename="../build/Desktop-Debug/VBDriveWizard_autogen/include/ui_mainwindow.h" line="2295"/>
        <source>MIT</source>
        <translation>MIT</translation>
    </message>
    <message>
        <location filename="../mainwindow.ui" line="2039"/>
        <location filename="../build/Desktop-Debug/VBDriveWizard_autogen/include/ui_mainwindow.h" line="2274"/>
        <source>Trajectory</source>
        <translation>轨迹</translation>
    </message>
    <message>
        <location filename="../mainwindow.ui" line="2045"/>
        <location filename="../build/Desktop-Debug/VBDriveWizard_autogen/include/ui_mainwindow.h" line="2275"/>
        <source>Step</source>
        <translation>阶跃</translation>
    </message>
    <message>
        <location filename="../mainwindow.ui" line="2079"/>
        <location filename="../build/Desktop-Debug/VBDriveWizard_autogen/include/ui_mainwindow.h" line="2279"/>
        <source>Step Targets</source>
        <translation>阶跃参数</translation>
    </message>
    <message>
        <location filename="../mainwindow.ui" line="2202"/>
        <location filename="../mainwindow.ui" line="2367"/>
        <location filename="../build/Desktop-Debug/VBDriveWizard_autogen/include/ui_mainwindow.h" line="2283"/>
        <location filename="../build/Desktop-Debug/VBDriveWizard_autogen/include/ui_mainwindow.h" line="2288"/>
        <source>Kp</source>
        <translation>Kp</translation>
    </message>
    <message>
        <location filename="../mainwindow.ui" line="2241"/>
        <location filename="../mainwindow.ui" line="2406"/>
        <location filename="../build/Desktop-Debug/VBDriveWizard_autogen/include/ui_mainwindow.h" line="2284"/>
        <location filename="../build/Desktop-Debug/VBDriveWizard_autogen/include/ui_mainwindow.h" line="2289"/>
        <source>Kd</source>
        <translation>Kd</translation>
    </message>
    <message>
        <location filename="../mainwindow.ui" line="2283"/>
        <location filename="../build/Desktop-Debug/VBDriveWizard_autogen/include/ui_mainwindow.h" line="2285"/>
        <source>Trajectory Targets</source>
        <translation>轨迹参数</translation>
    </message>
    <message>
        <location filename="../mainwindow.ui" line="2466"/>
        <location filename="../build/Desktop-Debug/VBDriveWizard_autogen/include/ui_mainwindow.h" line="2293"/>
        <source>+derivative</source>
        <translation>+导数</translation>
    </message>
    <message>
        <location filename="../mainwindow.ui" line="2520"/>
        <location filename="../build/Desktop-Debug/VBDriveWizard_autogen/include/ui_mainwindow.h" line="2296"/>
        <source>STATUS</source>
        <translation>状态</translation>
    </message>
    <message>
        <location filename="../mainwindow.ui" line="2526"/>
        <location filename="../build/Desktop-Debug/VBDriveWizard_autogen/include/ui_mainwindow.h" line="2297"/>
        <source>Model</source>
        <translation>型号</translation>
    </message>
    <message>
        <location filename="../mainwindow.ui" line="2533"/>
        <location filename="../build/Desktop-Debug/VBDriveWizard_autogen/include/ui_mainwindow.h" line="2298"/>
        <source>M4310R10</source>
        <translation>M4310R10</translation>
    </message>
    <message>
        <location filename="../mainwindow.ui" line="2547"/>
        <location filename="../build/Desktop-Debug/VBDriveWizard_autogen/include/ui_mainwindow.h" line="2300"/>
        <source>Temperature MCU</source>
        <translation>MCU 温度</translation>
    </message>
    <message>
        <location filename="../mainwindow.ui" line="2554"/>
        <location filename="../mainwindow.ui" line="2575"/>
        <location filename="../mainwindow.ui" line="2596"/>
        <location filename="../mainwindow.ui" line="2617"/>
        <location filename="../mainwindow.ui" line="2638"/>
        <location filename="../mainwindow.ui" line="2659"/>
        <location filename="../mainwindow.ui" line="2680"/>
        <location filename="../build/Desktop-Debug/VBDriveWizard_autogen/include/ui_mainwindow.h" line="2301"/>
        <location filename="../build/Desktop-Debug/VBDriveWizard_autogen/include/ui_mainwindow.h" line="2304"/>
        <location filename="../build/Desktop-Debug/VBDriveWizard_autogen/include/ui_mainwindow.h" line="2307"/>
        <location filename="../build/Desktop-Debug/VBDriveWizard_autogen/include/ui_mainwindow.h" line="2310"/>
        <location filename="../build/Desktop-Debug/VBDriveWizard_autogen/include/ui_mainwindow.h" line="2313"/>
        <location filename="../build/Desktop-Debug/VBDriveWizard_autogen/include/ui_mainwindow.h" line="2316"/>
        <location filename="../build/Desktop-Debug/VBDriveWizard_autogen/include/ui_mainwindow.h" line="2319"/>
        <source>TextLabel</source>
        <translation>TextLabel</translation>
    </message>
    <message>
        <location filename="../mainwindow.ui" line="2561"/>
        <location filename="../mainwindow.ui" line="2582"/>
        <location filename="../build/Desktop-Debug/VBDriveWizard_autogen/include/ui_mainwindow.h" line="2302"/>
        <location filename="../build/Desktop-Debug/VBDriveWizard_autogen/include/ui_mainwindow.h" line="2305"/>
        <source>C</source>
        <translation>C</translation>
    </message>
    <message>
        <location filename="../mainwindow.ui" line="2568"/>
        <location filename="../build/Desktop-Debug/VBDriveWizard_autogen/include/ui_mainwindow.h" line="2303"/>
        <source>Temperature Stator</source>
        <translation>定子温度</translation>
    </message>
    <message>
        <location filename="../mainwindow.ui" line="2589"/>
        <location filename="../build/Desktop-Debug/VBDriveWizard_autogen/include/ui_mainwindow.h" line="2306"/>
        <source>Bus Voltage</source>
        <translation>母线电压</translation>
    </message>
    <message>
        <location filename="../mainwindow.ui" line="2603"/>
        <location filename="../build/Desktop-Debug/VBDriveWizard_autogen/include/ui_mainwindow.h" line="2308"/>
        <source>V</source>
        <translation>V</translation>
    </message>
    <message>
        <location filename="../mainwindow.ui" line="2631"/>
        <location filename="../build/Desktop-Debug/VBDriveWizard_autogen/include/ui_mainwindow.h" line="2312"/>
        <source>Motor Encoder</source>
        <translation>转子编码器</translation>
    </message>
    <message>
        <location filename="../mainwindow.ui" line="2645"/>
        <location filename="../mainwindow.ui" line="2666"/>
        <location filename="../mainwindow.ui" line="2687"/>
        <location filename="../build/Desktop-Debug/VBDriveWizard_autogen/include/ui_mainwindow.h" line="2314"/>
        <location filename="../build/Desktop-Debug/VBDriveWizard_autogen/include/ui_mainwindow.h" line="2317"/>
        <location filename="../build/Desktop-Debug/VBDriveWizard_autogen/include/ui_mainwindow.h" line="2320"/>
        <source>-</source>
        <translation>-</translation>
    </message>
    <message>
        <location filename="../mainwindow.ui" line="2652"/>
        <location filename="../build/Desktop-Debug/VBDriveWizard_autogen/include/ui_mainwindow.h" line="2315"/>
        <source>Shaft Encoder</source>
        <translation>输出轴编码器</translation>
    </message>
    <message>
        <location filename="../mainwindow.ui" line="2673"/>
        <location filename="../build/Desktop-Debug/VBDriveWizard_autogen/include/ui_mainwindow.h" line="2318"/>
        <source>Fault</source>
        <translation>故障</translation>
    </message>
    <message>
        <location filename="../mainwindow.ui" line="2715"/>
        <location filename="../build/Desktop-Debug/VBDriveWizard_autogen/include/ui_mainwindow.h" line="2322"/>
        <source>STOP</source>
        <translation>停止</translation>
    </message>
    <message>
        <location filename="../mainwindow.cpp" line="161"/>
        <location filename="../mainwindow.cpp" line="174"/>
        <location filename="../mainwindow.cpp" line="791"/>
        <location filename="../mainwindow.cpp" line="818"/>
        <source>Connection failed</source>
        <translation>连接失败</translation>
    </message>
    <message>
        <location filename="../mainwindow.cpp" line="195"/>
        <source>Firmware download failed</source>
        <translation>固件下载失败</translation>
    </message>
    <message>
        <location filename="../mainwindow.cpp" line="199"/>
        <source>Downloaded firmware %1.</source>
        <translation>已下载固件 %1。</translation>
    </message>
    <message>
        <location filename="../mainwindow.cpp" line="223"/>
        <source>Flashing failed</source>
        <translation>烧录失败</translation>
    </message>
    <message>
        <location filename="../mainwindow.cpp" line="335"/>
        <location filename="../mainwindow.cpp" line="337"/>
        <location filename="../mainwindow.cpp" line="897"/>
        <location filename="../mainwindow.cpp" line="898"/>
        <source>Disconnect</source>
        <translation>断开</translation>
    </message>
    <message>
        <location filename="../mainwindow.cpp" line="339"/>
        <location filename="../mainwindow.cpp" line="1978"/>
        <source>Resume</source>
        <translation>继续</translation>
    </message>
    <message>
        <location filename="../mainwindow.cpp" line="343"/>
        <location filename="../mainwindow.cpp" line="866"/>
        <source>Not connected</source>
        <translation>未连接</translation>
    </message>
    <message>
        <location filename="../mainwindow.cpp" line="360"/>
        <location filename="../mainwindow.cpp" line="1003"/>
        <source>Unsaved changes</source>
        <translation>未保存的更改</translation>
    </message>
    <message>
        <location filename="../mainwindow.cpp" line="361"/>
        <source>Some register changes have not been written to the drive.
Close anyway?</source>
        <translation>部分寄存器更改尚未写入驱动器。
仍要关闭吗？</translation>
    </message>
    <message>
        <location filename="../mainwindow.cpp" line="390"/>
        <location filename="../mainwindow.cpp" line="784"/>
        <source>Disconnecting...</source>
        <translation>正在断开...</translation>
    </message>
    <message>
        <location filename="../mainwindow.cpp" line="726"/>
        <source>%1 (unavailable)</source>
        <translation>%1（不可用）</translation>
    </message>
    <message>
        <location filename="../mainwindow.cpp" line="791"/>
        <source>No serial port selected.</source>
        <translation>未选择串口。</translation>
    </message>
    <message>
        <location filename="../mainwindow.cpp" line="796"/>
        <source>Opening %1...</source>
        <translation>正在打开 %1...</translation>
    </message>
    <message>
        <location filename="../mainwindow.cpp" line="824"/>
        <source>Listening for drives on %1...</source>
        <translation>正在 %1 上搜索驱动器...</translation>
    </message>
    <message>
        <location filename="../mainwindow.cpp" line="853"/>
        <source>Serial connected</source>
        <translation>串口已连接</translation>
    </message>
    <message>
        <location filename="../mainwindow.cpp" line="854"/>
        <source>CAN connected</source>
        <translation>CAN 已连接</translation>
    </message>
    <message>
        <location filename="../mainwindow.cpp" line="867"/>
        <source>Disconnected.</source>
        <translation>已断开。</translation>
    </message>
    <message>
        <location filename="../mainwindow.cpp" line="938"/>
        <source>Sort by model</source>
        <translation>按型号排序</translation>
    </message>
    <message>
        <location filename="../mainwindow.cpp" line="939"/>
        <source>Sort by Node ID</source>
        <translation>按 Node ID 排序</translation>
    </message>
    <message>
        <location filename="../mainwindow.cpp" line="966"/>
        <source>  (no heartbeat)</source>
        <translation>（无心跳）</translation>
    </message>
    <message>
        <location filename="../mainwindow.cpp" line="1004"/>
        <source>Drive %1 has register changes that were not written.
Write them before switching?</source>
        <translation>驱动器 %1 有未写入的寄存器更改。
切换前是否写入？</translation>
    </message>
    <message>
        <location filename="../mainwindow.cpp" line="1076"/>
        <source>Reading registers...</source>
        <translation>正在读取寄存器...</translation>
    </message>
    <message>
        <location filename="../mainwindow.cpp" line="1091"/>
        <source>No changes to write.</source>
        <translation>没有需要写入的更改。</translation>
    </message>
    <message numerus="yes">
        <location filename="../mainwindow.cpp" line="1097"/>
        <source>Writing %n register(s)...</source>
        <translation>
            <numerusform>正在写入 %n 个寄存器...</numerusform>
        </translation>
    </message>
    <message>
        <location filename="../mainwindow.cpp" line="1122"/>
        <source>Origin set; angle offset is now %1.</source>
        <translation>零点已设置，角度偏移现为 %1。</translation>
    </message>
    <message>
        <location filename="../mainwindow.cpp" line="1132"/>
        <source>Calibrate sensor</source>
        <translation>校准传感器</translation>
    </message>
    <message>
        <location filename="../mainwindow.cpp" line="1133"/>
        <source>Calibration moves the motor and cannot be cancelled. The drive stops answering until it finishes.

Start calibration?</source>
        <translation>校准会转动电机且无法取消。驱动器在校准完成前不会响应。

开始校准吗？</translation>
    </message>
    <message>
        <location filename="../mainwindow.cpp" line="1142"/>
        <source>Calibration started; the drive will not answer until it is done.</source>
        <translation>校准已开始，驱动器在完成前不会响应。</translation>
    </message>
    <message>
        <location filename="../mainwindow.cpp" line="1164"/>
        <source>Save register profile</source>
        <translation>保存寄存器配置</translation>
    </message>
    <message>
        <location filename="../mainwindow.cpp" line="1167"/>
        <location filename="../mainwindow.cpp" line="1190"/>
        <source>YAML files (*.yaml *.yml)</source>
        <translation>YAML 文件 (*.yaml *.yml)</translation>
    </message>
    <message>
        <location filename="../mainwindow.cpp" line="1181"/>
        <source>Could not save the profile</source>
        <translation>无法保存配置</translation>
    </message>
    <message>
        <location filename="../mainwindow.cpp" line="1183"/>
        <source>Profile saved to %1.</source>
        <translation>配置已保存到 %1。</translation>
    </message>
    <message>
        <location filename="../mainwindow.cpp" line="1189"/>
        <source>Load register profile</source>
        <translation>加载寄存器配置</translation>
    </message>
    <message>
        <location filename="../mainwindow.cpp" line="1198"/>
        <source>Could not load the profile</source>
        <translation>无法加载配置</translation>
    </message>
    <message numerus="yes">
        <location filename="../mainwindow.cpp" line="1203"/>
        <source>Loaded %n register(s) from the profile.</source>
        <translation>
            <numerusform>已从配置加载 %n 个寄存器。</numerusform>
        </translation>
    </message>
    <message>
        <location filename="../mainwindow.cpp" line="1205"/>
        <source>Loaded with warnings: %1</source>
        <translation>加载时出现警告：%1</translation>
    </message>
    <message>
        <location filename="../mainwindow.cpp" line="1221"/>
        <source>Could not load the default profile</source>
        <translation>无法加载默认配置</translation>
    </message>
    <message>
        <location filename="../mainwindow.cpp" line="1225"/>
        <source>Default values for %1 loaded into the editors.</source>
        <translation>%1 的默认值已载入编辑框。</translation>
    </message>
    <message>
        <location filename="../mainwindow.cpp" line="1253"/>
        <source>Could not read &apos;%1&apos;: %2</source>
        <translation>无法读取“%1”：%2</translation>
    </message>
    <message>
        <location filename="../mainwindow.cpp" line="1300"/>
        <source>Could not write &apos;%1&apos;: %2</source>
        <translation>无法写入“%1”：%2</translation>
    </message>
    <message>
        <location filename="../mainwindow.cpp" line="1310"/>
        <source>Registers written.</source>
        <translation>寄存器已写入。</translation>
    </message>
    <message>
        <location filename="../mainwindow.cpp" line="1318"/>
        <source>Some registers were not written</source>
        <translation>部分寄存器未写入</translation>
    </message>
    <message>
        <location filename="../mainwindow.cpp" line="1366"/>
        <source>Drive lost</source>
        <translation>驱动器失联</translation>
    </message>
    <message>
        <location filename="../mainwindow.cpp" line="1367"/>
        <source>Drive %1 (node %2) stopped sending heartbeats.</source>
        <translation>驱动器 %1（节点 %2）停止发送心跳。</translation>
    </message>
    <message>
        <location filename="../mainwindow.cpp" line="1370"/>
        <source>Wait for it to come back, keeping your unsaved register changes, or drop it and discard them?</source>
        <translation>是等待它恢复并保留未保存的寄存器更改，还是移除它并放弃这些更改？</translation>
    </message>
    <message>
        <location filename="../mainwindow.cpp" line="1372"/>
        <source>Reconnect</source>
        <translation>重新连接</translation>
    </message>
    <message>
        <location filename="../mainwindow.cpp" line="1373"/>
        <source>Remove drive</source>
        <translation>移除驱动器</translation>
    </message>
    <message>
        <location filename="../mainwindow.cpp" line="1385"/>
        <source>Waiting for node %1 to return...</source>
        <translation>正在等待节点 %1 恢复...</translation>
    </message>
    <message>
        <location filename="../mainwindow.cpp" line="1399"/>
        <source>Node %1 is back.</source>
        <translation>节点 %1 已恢复。</translation>
    </message>
    <message>
        <location filename="../mainwindow.cpp" line="1484"/>
        <source>Yes</source>
        <translation>是</translation>
    </message>
    <message>
        <location filename="../mainwindow.cpp" line="1484"/>
        <source>No</source>
        <translation>否</translation>
    </message>
    <message>
        <location filename="../mainwindow.cpp" line="1617"/>
        <source>Target vel:</source>
        <translation>目标速度：</translation>
    </message>
    <message>
        <location filename="../mainwindow.cpp" line="1619"/>
        <source>Target torq:</source>
        <translation>目标转矩：</translation>
    </message>
    <message>
        <location filename="../mainwindow.cpp" line="1806"/>
        <source>Serial cannot sustain %1 Hz; running at %2 Hz instead.</source>
        <translation>串口无法维持 %1 Hz，改为 %2 Hz 运行。</translation>
    </message>
    <message>
        <location filename="../mainwindow.cpp" line="1867"/>
        <source>Feedback gains written.</source>
        <translation>反馈增益已写入。</translation>
    </message>
    <message>
        <location filename="../mainwindow.cpp" line="1886"/>
        <source>Transient form written.</source>
        <translation>过渡过程参数已写入。</translation>
    </message>
    <message>
        <location filename="../mainwindow.cpp" line="1899"/>
        <source>Emergency stop: all drives disabled.</source>
        <translation>急停：已关闭所有驱动器。</translation>
    </message>
    <message>
        <location filename="../mainwindow.cpp" line="1922"/>
        <source>Stop</source>
        <translation>停止</translation>
    </message>
    <message>
        <location filename="../mainwindow.cpp" line="1983"/>
        <source>Save plot data</source>
        <translation>保存图表数据</translation>
    </message>
    <message>
        <location filename="../mainwindow.cpp" line="1984"/>
        <source>CSV files (*.csv)</source>
        <translation>CSV 文件 (*.csv)</translation>
    </message>
    <message>
        <location filename="../mainwindow.cpp" line="1989"/>
        <source>Could not save the CSV</source>
        <translation>无法保存 CSV</translation>
    </message>
    <message>
        <location filename="../mainwindow.cpp" line="1991"/>
        <source>Plot data saved.</source>
        <translation>图表数据已保存。</translation>
    </message>
    <message>
        <location filename="../mainwindow.cpp" line="1996"/>
        <source>Save plot image</source>
        <translation>保存图表图像</translation>
    </message>
    <message>
        <location filename="../mainwindow.cpp" line="1997"/>
        <source>PNG images (*.png)</source>
        <translation>PNG 图像 (*.png)</translation>
    </message>
    <message>
        <location filename="../mainwindow.cpp" line="2002"/>
        <source>Could not save the image</source>
        <translation>无法保存图像</translation>
    </message>
    <message>
        <location filename="../mainwindow.cpp" line="2004"/>
        <source>Plot image saved.</source>
        <translation>图表图像已保存。</translation>
    </message>
    <message>
        <location filename="../mainwindow.cpp" line="2023"/>
        <source>Select firmware image</source>
        <translation>选择固件文件</translation>
    </message>
    <message>
        <location filename="../mainwindow.cpp" line="2024"/>
        <source>Intel HEX files (*.hex)</source>
        <translation>Intel HEX 文件 (*.hex)</translation>
    </message>
    <message>
        <location filename="../mainwindow.cpp" line="2028"/>
        <source>Selected %1.</source>
        <translation>已选择 %1。</translation>
    </message>
    <message>
        <location filename="../mainwindow.cpp" line="2040"/>
        <source>No firmware selected</source>
        <translation>未选择固件</translation>
    </message>
    <message>
        <location filename="../mainwindow.cpp" line="2041"/>
        <source>Choose a .hex file first, or switch to downloading the latest release.</source>
        <translation>请先选择 .hex 文件，或切换为下载最新版本。</translation>
    </message>
    <message>
        <location filename="../mainwindow.cpp" line="2057"/>
        <source>Flashing %1...</source>
        <translation>正在烧录 %1...</translation>
    </message>
</context>
<context>
    <name>PlotController</name>
    <message>
        <location filename="../ui/plot_controller.cpp" line="125"/>
        <source>t, s</source>
        <translation>t, 秒</translation>
    </message>
    <message>
        <location filename="../ui/plot_controller.cpp" line="150"/>
        <source>Position</source>
        <translation>位置</translation>
    </message>
    <message>
        <location filename="../ui/plot_controller.cpp" line="152"/>
        <source>Velocity</source>
        <translation>速度</translation>
    </message>
    <message>
        <location filename="../ui/plot_controller.cpp" line="154"/>
        <source>Torque</source>
        <translation>转矩</translation>
    </message>
    <message>
        <location filename="../ui/plot_controller.cpp" line="156"/>
        <source>MCU</source>
        <translation>MCU</translation>
    </message>
    <message>
        <location filename="../ui/plot_controller.cpp" line="158"/>
        <source>Bus current</source>
        <translation>母线电流</translation>
    </message>
    <message>
        <location filename="../ui/plot_controller.cpp" line="160"/>
        <source>Rotor</source>
        <translation>转子</translation>
    </message>
    <message>
        <location filename="../ui/plot_controller.cpp" line="173"/>
        <source>Target</source>
        <translation>目标</translation>
    </message>
    <message>
        <location filename="../ui/plot_controller.cpp" line="175"/>
        <source>Stator</source>
        <translation>定子</translation>
    </message>
    <message>
        <location filename="../ui/plot_controller.cpp" line="177"/>
        <source>Shaft</source>
        <translation>输出轴</translation>
    </message>
    <message>
        <location filename="../ui/plot_controller.cpp" line="188"/>
        <source>Position, %1</source>
        <translation>位置，%1</translation>
    </message>
    <message>
        <location filename="../ui/plot_controller.cpp" line="190"/>
        <source>Velocity, %1</source>
        <translation>速度，%1</translation>
    </message>
    <message>
        <location filename="../ui/plot_controller.cpp" line="193"/>
        <source>Torque, N*m</source>
        <translation>转矩，N·m</translation>
    </message>
    <message>
        <location filename="../ui/plot_controller.cpp" line="195"/>
        <source>Temperature, C</source>
        <translation>温度，°C</translation>
    </message>
    <message>
        <location filename="../ui/plot_controller.cpp" line="197"/>
        <source>Current, A</source>
        <translation>电流，A</translation>
    </message>
    <message>
        <location filename="../ui/plot_controller.cpp" line="199"/>
        <source>Encoder, counts</source>
        <translation>编码器，计数</translation>
    </message>
    <message>
        <location filename="../ui/plot_controller.cpp" line="457"/>
        <location filename="../ui/plot_controller.cpp" line="494"/>
        <source>The plot is not initialised.</source>
        <translation>图表尚未初始化。</translation>
    </message>
    <message>
        <location filename="../ui/plot_controller.cpp" line="462"/>
        <source>The log view cannot be exported as an image.</source>
        <translation>日志视图无法导出为图像。</translation>
    </message>
    <message>
        <location filename="../ui/plot_controller.cpp" line="476"/>
        <source>The plot could not be rendered.</source>
        <translation>无法渲染图表。</translation>
    </message>
    <message>
        <location filename="../ui/plot_controller.cpp" line="484"/>
        <source>Could not write %1.</source>
        <translation>无法写入 %1。</translation>
    </message>
    <message>
        <location filename="../ui/plot_controller.cpp" line="502"/>
        <location filename="../ui/plot_controller.cpp" line="510"/>
        <location filename="../ui/plot_controller.cpp" line="519"/>
        <location filename="../ui/plot_controller.cpp" line="555"/>
        <source>Could not write %1: %2</source>
        <translation>无法写入 %1：%2</translation>
    </message>
</context>
<context>
    <name>PreferencesDialog</name>
    <message>
        <location filename="../ui/preferences_dialog.ui" line="14"/>
        <source>Preferences</source>
        <translation>首选项</translation>
    </message>
    <message>
        <location filename="../ui/preferences_dialog.ui" line="20"/>
        <source>Appearance</source>
        <translation>外观</translation>
    </message>
    <message>
        <location filename="../ui/preferences_dialog.ui" line="26"/>
        <source>Theme:</source>
        <translation>主题：</translation>
    </message>
    <message>
        <location filename="../ui/preferences_dialog.ui" line="34"/>
        <source>Dark</source>
        <translation>深色</translation>
    </message>
    <message>
        <location filename="../ui/preferences_dialog.ui" line="39"/>
        <source>Light</source>
        <translation>浅色</translation>
    </message>
    <message>
        <location filename="../ui/preferences_dialog.ui" line="47"/>
        <source>Interface font size, pt:</source>
        <translation>界面字号，pt：</translation>
    </message>
    <message>
        <location filename="../ui/preferences_dialog.ui" line="67"/>
        <source>Plot</source>
        <translation>图表</translation>
    </message>
    <message>
        <location filename="../ui/preferences_dialog.ui" line="73"/>
        <source>Plot font size, pt:</source>
        <translation>图表字号，pt：</translation>
    </message>
    <message>
        <location filename="../ui/preferences_dialog.ui" line="90"/>
        <source>Line width, px:</source>
        <translation>线宽，px：</translation>
    </message>
    <message>
        <location filename="../ui/preferences_dialog.ui" line="107"/>
        <source>Time window, s:</source>
        <translation>时间窗口，秒：</translation>
    </message>
    <message>
        <location filename="../ui/preferences_dialog.ui" line="130"/>
        <source>Redraw rate, Hz:</source>
        <translation>刷新率，Hz：</translation>
    </message>
    <message>
        <location filename="../ui/preferences_dialog.ui" line="150"/>
        <source>Connection</source>
        <translation>连接</translation>
    </message>
    <message>
        <location filename="../ui/preferences_dialog.ui" line="156"/>
        <source>This application&apos;s Cyphal node ID:</source>
        <translation>本程序的 Cyphal Node ID：</translation>
    </message>
    <message>
        <location filename="../ui/preferences_dialog.ui" line="173"/>
        <source>Serial baud rate:</source>
        <translation>串口波特率：</translation>
    </message>
    <message>
        <location filename="../ui/preferences_dialog.ui" line="196"/>
        <source>Firmware flashing (OpenOCD)</source>
        <translation>固件烧录（OpenOCD）</translation>
    </message>
    <message>
        <location filename="../ui/preferences_dialog.ui" line="202"/>
        <source>Interface config:</source>
        <translation>接口配置：</translation>
    </message>
    <message>
        <location filename="../ui/preferences_dialog.ui" line="213"/>
        <source>Target config:</source>
        <translation>目标配置：</translation>
    </message>
    <message>
        <location filename="../ui/preferences_dialog.cpp" line="20"/>
        <source>OpenOCD interface script, relative to its scripts directory.
VBDrive is programmed over SWD with an ST-Link.</source>
        <translation>OpenOCD 接口脚本，相对于其 scripts 目录。
VBDrive 通过 ST-Link 以 SWD 方式烧录。</translation>
    </message>
    <message>
        <location filename="../ui/preferences_dialog.cpp" line="23"/>
        <source>OpenOCD target script. VBDrive uses an STM32G431VB.</source>
        <translation>OpenOCD 目标脚本。VBDrive 使用 STM32G431VB。</translation>
    </message>
    <message>
        <location filename="../ui/preferences_dialog.cpp" line="25"/>
        <source>Node ID this application announces on the CAN bus.
It must not collide with any drive.</source>
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
        <source>Restore the value this field had when the drive was selected</source>
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
        <location filename="../ui/restore_model_dialog.ui" line="20"/>
        <source>Load the factory register profile for this drive model. The values are placed in the editors; nothing is written to the drive until you press Write.</source>
        <translation>加载该型号驱动器的出厂寄存器配置。数值会填入编辑框；在按下“写入”之前不会写入驱动器。</translation>
    </message>
    <message>
        <location filename="../ui/restore_model_dialog.ui" line="32"/>
        <source>Drive model:</source>
        <translation>驱动器型号：</translation>
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
        <location filename="../transport/serial_service.cpp" line="78"/>
        <source>Serial service is shutting down.</source>
        <translation>串口服务正在关闭。</translation>
    </message>
    <message>
        <location filename="../transport/serial_service.cpp" line="98"/>
        <source>Reconnecting.</source>
        <translation>正在重新连接。</translation>
    </message>
    <message>
        <location filename="../transport/serial_service.cpp" line="108"/>
        <location filename="../transport/serial_service.cpp" line="121"/>
        <location filename="../transport/serial_service.cpp" line="137"/>
        <location filename="../transport/serial_service.cpp" line="380"/>
        <source>Disconnected.</source>
        <translation>已断开。</translation>
    </message>
    <message>
        <location filename="../transport/serial_service.cpp" line="167"/>
        <location filename="../transport/serial_service.cpp" line="191"/>
        <location filename="../transport/serial_service.cpp" line="508"/>
        <source>Serial port is not open.</source>
        <translation>串口未打开。</translation>
    </message>
    <message>
        <location filename="../transport/serial_service.cpp" line="167"/>
        <location filename="../transport/serial_service.cpp" line="508"/>
        <source>Disconnecting.</source>
        <translation>正在断开。</translation>
    </message>
    <message>
        <location filename="../transport/serial_service.cpp" line="242"/>
        <source>Command &apos;%1&apos; failed: %2</source>
        <translation>命令“%1”失败：%2</translation>
    </message>
    <message>
        <location filename="../transport/serial_service.cpp" line="258"/>
        <source>Drive detected on %1.</source>
        <translation>在 %1 上检测到驱动器。</translation>
    </message>
    <message>
        <location filename="../transport/serial_service.cpp" line="259"/>
        <source>No drive answered on %1: %2</source>
        <translation>%1 上没有驱动器响应：%2</translation>
    </message>
    <message>
        <location filename="../transport/serial_service.cpp" line="267"/>
        <source>Could not enter CONFIG mode: %1</source>
        <translation>无法进入 CONFIG 模式：%1</translation>
    </message>
    <message>
        <location filename="../transport/serial_service.cpp" line="303"/>
        <source>These registers were rejected by the drive: %1</source>
        <translation>驱动器拒绝了这些寄存器：%1</translation>
    </message>
    <message>
        <location filename="../transport/serial_service.cpp" line="380"/>
        <source>Serial connection lost.</source>
        <translation>串口连接已丢失。</translation>
    </message>
    <message>
        <location filename="../transport/serial_service.cpp" line="412"/>
        <source>The drive did not answer in time.</source>
        <translation>驱动器未及时响应。</translation>
    </message>
    <message>
        <location filename="../transport/serial_service.cpp" line="476"/>
        <source>Could not interpret the value &apos;%1&apos;.</source>
        <translation>无法解析值“%1”。</translation>
    </message>
</context>
<context>
    <name>SerialWorker</name>
    <message>
        <location filename="../transport/serial_worker.cpp" line="63"/>
        <source>Port %1 opened at %2 baud.</source>
        <translation>端口 %1 已以 %2 波特打开。</translation>
    </message>
    <message>
        <location filename="../transport/serial_worker.cpp" line="87"/>
        <source>Serial port is not open.</source>
        <translation>串口未打开。</translation>
    </message>
</context>
</TS>
