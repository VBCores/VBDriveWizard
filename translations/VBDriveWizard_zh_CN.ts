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
        <location filename="../firmware/firmware_downloader.cpp" line="43"/>
        <source>A firmware download is already running.</source>
        <translation>固件下载已在进行中。</translation>
    </message>
    <message>
        <location filename="../firmware/firmware_downloader.cpp" line="53"/>
        <source>Looking up the latest release...</source>
        <translation>正在查找最新版本...</translation>
    </message>
    <message>
        <location filename="../firmware/firmware_downloader.cpp" line="74"/>
        <source>Could not reach the VBDrive releases: %1</source>
        <translation>无法访问 VBDrive 发布列表：%1</translation>
    </message>
    <message>
        <location filename="../firmware/firmware_downloader.cpp" line="93"/>
        <source>Release %1 does not contain %2.</source>
        <translation>版本 %1 不包含 %2。</translation>
    </message>
    <message>
        <location filename="../firmware/firmware_downloader.cpp" line="94"/>
        <source>(unknown)</source>
        <translation>（未知）</translation>
    </message>
    <message>
        <location filename="../firmware/firmware_downloader.cpp" line="103"/>
        <source>Downloading %1...</source>
        <translation>正在下载 %1...</translation>
    </message>
    <message>
        <location filename="../firmware/firmware_downloader.cpp" line="119"/>
        <source>Downloading %1: %2 of %3 (%4%)</source>
        <translation>正在下载 %1：%2 / %3（%4%）</translation>
    </message>
    <message>
        <location filename="../firmware/firmware_downloader.cpp" line="125"/>
        <source>Downloading %1: %2 received</source>
        <translation>正在下载 %1：已接收 %2</translation>
    </message>
    <message>
        <location filename="../firmware/firmware_downloader.cpp" line="141"/>
        <source>Firmware download failed: %1</source>
        <translation>固件下载失败：%1</translation>
    </message>
    <message>
        <location filename="../firmware/firmware_downloader.cpp" line="152"/>
        <location filename="../firmware/firmware_downloader.cpp" line="157"/>
        <source>Could not write %1: %2</source>
        <translation>无法写入 %1：%2</translation>
    </message>
    <message>
        <location filename="../firmware/firmware_downloader.cpp" line="161"/>
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
        <location filename="../build/Desktop-Debug/VBDriveWizard_autogen/include/ui_mainwindow.h" line="2231"/>
        <source>VBDrive Wizard</source>
        <translation>VBDrive Wizard</translation>
    </message>
    <message>
        <location filename="../mainwindow.ui" line="53"/>
        <location filename="../build/Desktop-Debug/VBDriveWizard_autogen/include/ui_mainwindow.h" line="2232"/>
        <source>CONNECTION</source>
        <translation>连接</translation>
    </message>
    <message>
        <location filename="../mainwindow.ui" line="77"/>
        <location filename="../build/Desktop-Debug/VBDriveWizard_autogen/include/ui_mainwindow.h" line="2233"/>
        <source>Serial</source>
        <translation>Serial</translation>
    </message>
    <message>
        <location filename="../mainwindow.ui" line="97"/>
        <location filename="../mainwindow.ui" line="150"/>
        <location filename="../mainwindow.cpp" line="911"/>
        <location filename="../mainwindow.cpp" line="1168"/>
        <location filename="../mainwindow.cpp" line="1169"/>
        <location filename="../build/Desktop-Debug/VBDriveWizard_autogen/include/ui_mainwindow.h" line="2234"/>
        <location filename="../build/Desktop-Debug/VBDriveWizard_autogen/include/ui_mainwindow.h" line="2240"/>
        <source>Connect</source>
        <translation>连接</translation>
    </message>
    <message>
        <location filename="../mainwindow.ui" line="110"/>
        <location filename="../mainwindow.ui" line="166"/>
        <location filename="../build/Desktop-Debug/VBDriveWizard_autogen/include/ui_mainwindow.h" line="2236"/>
        <location filename="../build/Desktop-Debug/VBDriveWizard_autogen/include/ui_mainwindow.h" line="2242"/>
        <source>Refresh</source>
        <translation>刷新</translation>
    </message>
    <message>
        <location filename="../mainwindow.ui" line="130"/>
        <location filename="../mainwindow.ui" line="568"/>
        <location filename="../build/Desktop-Debug/VBDriveWizard_autogen/include/ui_mainwindow.h" line="2239"/>
        <location filename="../build/Desktop-Debug/VBDriveWizard_autogen/include/ui_mainwindow.h" line="2284"/>
        <source>CAN</source>
        <translation>CAN</translation>
    </message>
    <message>
        <location filename="../mainwindow.ui" line="189"/>
        <location filename="../build/Desktop-Debug/VBDriveWizard_autogen/include/ui_mainwindow.h" line="2245"/>
        <source>DEVICES</source>
        <translation>设备</translation>
    </message>
    <message>
        <location filename="../mainwindow.ui" line="285"/>
        <location filename="../build/Desktop-Debug/VBDriveWizard_autogen/include/ui_mainwindow.h" line="2250"/>
        <source>CONFIGURATION</source>
        <translation>配置</translation>
    </message>
    <message>
        <location filename="../mainwindow.ui" line="310"/>
        <location filename="../build/Desktop-Debug/VBDriveWizard_autogen/include/ui_mainwindow.h" line="2269"/>
        <source>Basic</source>
        <translation>基本</translation>
    </message>
    <message>
        <location filename="../mainwindow.ui" line="331"/>
        <location filename="../build/Desktop-Debug/VBDriveWizard_autogen/include/ui_mainwindow.h" line="2251"/>
        <source>Limits</source>
        <translation>限制</translation>
    </message>
    <message>
        <location filename="../mainwindow.ui" line="484"/>
        <location filename="../mainwindow.ui" line="3381"/>
        <location filename="../build/Desktop-Debug/VBDriveWizard_autogen/include/ui_mainwindow.h" line="2264"/>
        <location filename="../build/Desktop-Debug/VBDriveWizard_autogen/include/ui_mainwindow.h" line="2414"/>
        <source>Angle</source>
        <translation>角度</translation>
    </message>
    <message>
        <location filename="../mainwindow.ui" line="418"/>
        <location filename="../build/Desktop-Debug/VBDriveWizard_autogen/include/ui_mainwindow.h" line="2257"/>
        <source>min:</source>
        <translation>最小:</translation>
    </message>
    <message>
        <location filename="../mainwindow.ui" line="463"/>
        <location filename="../build/Desktop-Debug/VBDriveWizard_autogen/include/ui_mainwindow.h" line="2261"/>
        <source>max</source>
        <translation>最大</translation>
    </message>
    <message>
        <location filename="../mainwindow.ui" line="470"/>
        <location filename="../mainwindow.ui" line="1475"/>
        <location filename="../mainwindow.ui" line="1794"/>
        <location filename="../mainwindow.ui" line="1879"/>
        <location filename="../mainwindow.ui" line="2890"/>
        <location filename="../mainwindow.ui" line="3183"/>
        <location filename="../build/Desktop-Debug/VBDriveWizard_autogen/include/ui_mainwindow.h" line="2262"/>
        <location filename="../build/Desktop-Debug/VBDriveWizard_autogen/include/ui_mainwindow.h" line="2322"/>
        <location filename="../build/Desktop-Debug/VBDriveWizard_autogen/include/ui_mainwindow.h" line="2351"/>
        <location filename="../build/Desktop-Debug/VBDriveWizard_autogen/include/ui_mainwindow.h" line="2356"/>
        <location filename="../build/Desktop-Debug/VBDriveWizard_autogen/include/ui_mainwindow.h" line="2386"/>
        <location filename="../build/Desktop-Debug/VBDriveWizard_autogen/include/ui_mainwindow.h" line="2396"/>
        <source>Velocity</source>
        <translation>速度</translation>
    </message>
    <message>
        <location filename="../mainwindow.ui" line="477"/>
        <location filename="../mainwindow.ui" line="1480"/>
        <location filename="../mainwindow.ui" line="1801"/>
        <location filename="../mainwindow.ui" line="2920"/>
        <location filename="../mainwindow.ui" line="3176"/>
        <location filename="../build/Desktop-Debug/VBDriveWizard_autogen/include/ui_mainwindow.h" line="2263"/>
        <location filename="../build/Desktop-Debug/VBDriveWizard_autogen/include/ui_mainwindow.h" line="2323"/>
        <location filename="../build/Desktop-Debug/VBDriveWizard_autogen/include/ui_mainwindow.h" line="2352"/>
        <location filename="../build/Desktop-Debug/VBDriveWizard_autogen/include/ui_mainwindow.h" line="2387"/>
        <location filename="../build/Desktop-Debug/VBDriveWizard_autogen/include/ui_mainwindow.h" line="2395"/>
        <source>Torque</source>
        <translation>转矩</translation>
    </message>
    <message>
        <location filename="../mainwindow.ui" line="513"/>
        <location filename="../build/Desktop-Debug/VBDriveWizard_autogen/include/ui_mainwindow.h" line="2268"/>
        <source>Voltage</source>
        <translation>电压</translation>
    </message>
    <message>
        <location filename="../mainwindow.ui" line="444"/>
        <location filename="../mainwindow.ui" line="510"/>
        <location filename="../build/Desktop-Debug/VBDriveWizard_autogen/include/ui_mainwindow.h" line="2259"/>
        <location filename="../build/Desktop-Debug/VBDriveWizard_autogen/include/ui_mainwindow.h" line="2266"/>
        <source>The firmware exposes no voltage limit register yet.</source>
        <translation>固件尚未提供电压限制寄存器。</translation>
    </message>
    <message>
        <location filename="../mainwindow.ui" line="411"/>
        <location filename="../mainwindow.ui" line="1490"/>
        <location filename="../build/Desktop-Debug/VBDriveWizard_autogen/include/ui_mainwindow.h" line="2256"/>
        <location filename="../build/Desktop-Debug/VBDriveWizard_autogen/include/ui_mainwindow.h" line="2325"/>
        <source>Current</source>
        <translation>电流</translation>
    </message>
    <message>
        <location filename="../mainwindow.ui" line="404"/>
        <location filename="../build/Desktop-Debug/VBDriveWizard_autogen/include/ui_mainwindow.h" line="2255"/>
        <source>Direction</source>
        <translation>方向</translation>
    </message>
    <message>
        <location filename="../mainwindow.ui" line="274"/>
        <location filename="../build/Desktop-Debug/VBDriveWizard_autogen/include/ui_mainwindow.h" line="2248"/>
        <source>CAN ID</source>
        <translation type="unfinished"></translation>
    </message>
    <message>
        <location filename="../mainwindow.ui" line="375"/>
        <location filename="../build/Desktop-Debug/VBDriveWizard_autogen/include/ui_mainwindow.h" line="2252"/>
        <source>CCW</source>
        <translation>逆时针</translation>
    </message>
    <message>
        <location filename="../mainwindow.ui" line="380"/>
        <location filename="../build/Desktop-Debug/VBDriveWizard_autogen/include/ui_mainwindow.h" line="2253"/>
        <source>CW</source>
        <translation>顺时针</translation>
    </message>
    <message>
        <location filename="../mainwindow.ui" line="592"/>
        <location filename="../build/Desktop-Debug/VBDriveWizard_autogen/include/ui_mainwindow.h" line="2270"/>
        <source>Data Baud Rate</source>
        <translation>数据段波特率</translation>
    </message>
    <message>
        <location filename="../mainwindow.ui" line="599"/>
        <location filename="../build/Desktop-Debug/VBDriveWizard_autogen/include/ui_mainwindow.h" line="2271"/>
        <source>Node ID</source>
        <translation>Node ID</translation>
    </message>
    <message>
        <location filename="../mainwindow.ui" line="626"/>
        <location filename="../build/Desktop-Debug/VBDriveWizard_autogen/include/ui_mainwindow.h" line="2272"/>
        <source>62.5 kHz</source>
        <translation>62.5 kHz</translation>
    </message>
    <message>
        <location filename="../mainwindow.ui" line="631"/>
        <location filename="../build/Desktop-Debug/VBDriveWizard_autogen/include/ui_mainwindow.h" line="2273"/>
        <source>125 kHz</source>
        <translation>125 kHz</translation>
    </message>
    <message>
        <location filename="../mainwindow.ui" line="636"/>
        <location filename="../build/Desktop-Debug/VBDriveWizard_autogen/include/ui_mainwindow.h" line="2274"/>
        <source>250 kHz</source>
        <translation>250 kHz</translation>
    </message>
    <message>
        <location filename="../mainwindow.ui" line="641"/>
        <location filename="../build/Desktop-Debug/VBDriveWizard_autogen/include/ui_mainwindow.h" line="2275"/>
        <source>500 kHz</source>
        <translation>500 kHz</translation>
    </message>
    <message>
        <location filename="../mainwindow.ui" line="646"/>
        <location filename="../mainwindow.ui" line="658"/>
        <location filename="../build/Desktop-Debug/VBDriveWizard_autogen/include/ui_mainwindow.h" line="2276"/>
        <location filename="../build/Desktop-Debug/VBDriveWizard_autogen/include/ui_mainwindow.h" line="2278"/>
        <source>1 MHz</source>
        <translation>1 MHz</translation>
    </message>
    <message>
        <location filename="../mainwindow.ui" line="663"/>
        <location filename="../build/Desktop-Debug/VBDriveWizard_autogen/include/ui_mainwindow.h" line="2279"/>
        <source>2 MHz</source>
        <translation>2 MHz</translation>
    </message>
    <message>
        <location filename="../mainwindow.ui" line="668"/>
        <location filename="../build/Desktop-Debug/VBDriveWizard_autogen/include/ui_mainwindow.h" line="2280"/>
        <source>4 MHz</source>
        <translation>4 MHz</translation>
    </message>
    <message>
        <location filename="../mainwindow.ui" line="673"/>
        <location filename="../build/Desktop-Debug/VBDriveWizard_autogen/include/ui_mainwindow.h" line="2281"/>
        <source>8 MHz</source>
        <translation>8 MHz</translation>
    </message>
    <message>
        <location filename="../mainwindow.ui" line="681"/>
        <location filename="../build/Desktop-Debug/VBDriveWizard_autogen/include/ui_mainwindow.h" line="2283"/>
        <source>Nominal Baud Rate</source>
        <translation>标称波特率</translation>
    </message>
    <message>
        <location filename="../mainwindow.ui" line="732"/>
        <location filename="../build/Desktop-Debug/VBDriveWizard_autogen/include/ui_mainwindow.h" line="2301"/>
        <source>Advanced</source>
        <translation>高级</translation>
    </message>
    <message>
        <location filename="../mainwindow.ui" line="786"/>
        <location filename="../build/Desktop-Debug/VBDriveWizard_autogen/include/ui_mainwindow.h" line="2285"/>
        <source>Gear Ratio</source>
        <translation>减速比</translation>
    </message>
    <message>
        <location filename="../mainwindow.ui" line="809"/>
        <location filename="../mainwindow.ui" line="1495"/>
        <location filename="../build/Desktop-Debug/VBDriveWizard_autogen/include/ui_mainwindow.h" line="2286"/>
        <location filename="../build/Desktop-Debug/VBDriveWizard_autogen/include/ui_mainwindow.h" line="2326"/>
        <source>Encoder</source>
        <translation>编码器</translation>
    </message>
    <message>
        <location filename="../mainwindow.ui" line="838"/>
        <location filename="../build/Desktop-Debug/VBDriveWizard_autogen/include/ui_mainwindow.h" line="2291"/>
        <source>Torque const</source>
        <translation>转矩常数</translation>
    </message>
    <message>
        <location filename="../mainwindow.ui" line="864"/>
        <location filename="../build/Desktop-Debug/VBDriveWizard_autogen/include/ui_mainwindow.h" line="2292"/>
        <source>Current Kp</source>
        <translation>电流 Kp</translation>
    </message>
    <message>
        <location filename="../mainwindow.ui" line="890"/>
        <location filename="../build/Desktop-Debug/VBDriveWizard_autogen/include/ui_mainwindow.h" line="2293"/>
        <source>Current Ki</source>
        <translation>电流 Ki</translation>
    </message>
    <message>
        <location filename="../mainwindow.ui" line="939"/>
        <location filename="../build/Desktop-Debug/VBDriveWizard_autogen/include/ui_mainwindow.h" line="2295"/>
        <source>Position Offset</source>
        <translation>位置偏移</translation>
    </message>
    <message>
        <location filename="../mainwindow.ui" line="965"/>
        <location filename="../build/Desktop-Debug/VBDriveWizard_autogen/include/ui_mainwindow.h" line="2296"/>
        <source>Main Filter Param A</source>
        <translation>主滤波器参数 A</translation>
    </message>
    <message>
        <location filename="../mainwindow.ui" line="991"/>
        <location filename="../build/Desktop-Debug/VBDriveWizard_autogen/include/ui_mainwindow.h" line="2297"/>
        <source>Filter Gain 1</source>
        <translation>滤波增益 1</translation>
    </message>
    <message>
        <location filename="../mainwindow.ui" line="1017"/>
        <location filename="../build/Desktop-Debug/VBDriveWizard_autogen/include/ui_mainwindow.h" line="2298"/>
        <source>Filter Gain 2</source>
        <translation>滤波增益 2</translation>
    </message>
    <message>
        <location filename="../mainwindow.ui" line="1043"/>
        <location filename="../build/Desktop-Debug/VBDriveWizard_autogen/include/ui_mainwindow.h" line="2299"/>
        <source>Filter Gain 3</source>
        <translation>滤波增益 3</translation>
    </message>
    <message>
        <location filename="../mainwindow.ui" line="1069"/>
        <location filename="../build/Desktop-Debug/VBDriveWizard_autogen/include/ui_mainwindow.h" line="2300"/>
        <source>Current LPF Gain</source>
        <translation>电流低通滤波增益</translation>
    </message>
    <message>
        <location filename="../mainwindow.ui" line="817"/>
        <location filename="../build/Desktop-Debug/VBDriveWizard_autogen/include/ui_mainwindow.h" line="2287"/>
        <source>rotor</source>
        <translation>转子</translation>
    </message>
    <message>
        <location filename="../mainwindow.ui" line="822"/>
        <location filename="../build/Desktop-Debug/VBDriveWizard_autogen/include/ui_mainwindow.h" line="2288"/>
        <source>shaft</source>
        <translation>输出轴</translation>
    </message>
    <message>
        <location filename="../mainwindow.ui" line="827"/>
        <location filename="../build/Desktop-Debug/VBDriveWizard_autogen/include/ui_mainwindow.h" line="2289"/>
        <source>external</source>
        <translation>外部</translation>
    </message>
    <message>
        <location filename="../mainwindow.ui" line="916"/>
        <location filename="../build/Desktop-Debug/VBDriveWizard_autogen/include/ui_mainwindow.h" line="2294"/>
        <source>Current Kd</source>
        <translation>电流 Kd</translation>
    </message>
    <message>
        <location filename="../mainwindow.ui" line="1103"/>
        <location filename="../build/Desktop-Debug/VBDriveWizard_autogen/include/ui_mainwindow.h" line="2315"/>
        <source>System</source>
        <translation>系统</translation>
    </message>
    <message>
        <location filename="../mainwindow.ui" line="1124"/>
        <location filename="../build/Desktop-Debug/VBDriveWizard_autogen/include/ui_mainwindow.h" line="2302"/>
        <source>Sensor</source>
        <translation>传感器</translation>
    </message>
    <message>
        <location filename="../mainwindow.ui" line="1148"/>
        <location filename="../build/Desktop-Debug/VBDriveWizard_autogen/include/ui_mainwindow.h" line="2303"/>
        <source>Calibrate</source>
        <translation>校准</translation>
    </message>
    <message>
        <location filename="../mainwindow.ui" line="1168"/>
        <location filename="../build/Desktop-Debug/VBDriveWizard_autogen/include/ui_mainwindow.h" line="2304"/>
        <source>Register Parameters</source>
        <translation>寄存器参数</translation>
    </message>
    <message>
        <location filename="../mainwindow.ui" line="1192"/>
        <location filename="../build/Desktop-Debug/VBDriveWizard_autogen/include/ui_mainwindow.h" line="2305"/>
        <source>Save to File...</source>
        <translation>保存到文件...</translation>
    </message>
    <message>
        <location filename="../mainwindow.ui" line="1199"/>
        <location filename="../build/Desktop-Debug/VBDriveWizard_autogen/include/ui_mainwindow.h" line="2306"/>
        <source>Load from File...</source>
        <translation>从文件加载...</translation>
    </message>
    <message>
        <location filename="../mainwindow.ui" line="1206"/>
        <location filename="../build/Desktop-Debug/VBDriveWizard_autogen/include/ui_mainwindow.h" line="2307"/>
        <source>Restore to Default</source>
        <translation>恢复默认值</translation>
    </message>
    <message>
        <location filename="../mainwindow.ui" line="1216"/>
        <location filename="../build/Desktop-Debug/VBDriveWizard_autogen/include/ui_mainwindow.h" line="2308"/>
        <source>Firmware</source>
        <translation>固件</translation>
    </message>
    <message>
        <location filename="../mainwindow.ui" line="1254"/>
        <location filename="../build/Desktop-Debug/VBDriveWizard_autogen/include/ui_mainwindow.h" line="2309"/>
        <source>Current Version:</source>
        <translation>当前版本：</translation>
    </message>
    <message>
        <location filename="../mainwindow.ui" line="1261"/>
        <location filename="../build/Desktop-Debug/VBDriveWizard_autogen/include/ui_mainwindow.h" line="2310"/>
        <source>0.0.1</source>
        <translation>0.0.1</translation>
    </message>
    <message>
        <location filename="../mainwindow.ui" line="1287"/>
        <location filename="../build/Desktop-Debug/VBDriveWizard_autogen/include/ui_mainwindow.h" line="2311"/>
        <source>Choose file</source>
        <translation>选择文件</translation>
    </message>
    <message>
        <location filename="../mainwindow.ui" line="1297"/>
        <location filename="../build/Desktop-Debug/VBDriveWizard_autogen/include/ui_mainwindow.h" line="2312"/>
        <source>Open</source>
        <translation>打开</translation>
    </message>
    <message>
        <location filename="../mainwindow.ui" line="1306"/>
        <location filename="../build/Desktop-Debug/VBDriveWizard_autogen/include/ui_mainwindow.h" line="2313"/>
        <source>Download from remote repo</source>
        <translation>从远程仓库下载</translation>
    </message>
    <message>
        <location filename="../mainwindow.ui" line="1330"/>
        <location filename="../build/Desktop-Debug/VBDriveWizard_autogen/include/ui_mainwindow.h" line="2314"/>
        <source>Flash</source>
        <translation>烧录</translation>
    </message>
    <message>
        <location filename="../mainwindow.ui" line="1383"/>
        <location filename="../build/Desktop-Debug/VBDriveWizard_autogen/include/ui_mainwindow.h" line="2316"/>
        <source>Read</source>
        <translation>读取</translation>
    </message>
    <message>
        <location filename="../mainwindow.ui" line="1390"/>
        <location filename="../build/Desktop-Debug/VBDriveWizard_autogen/include/ui_mainwindow.h" line="2317"/>
        <source>Write</source>
        <translation>写入</translation>
    </message>
    <message>
        <location filename="../mainwindow.ui" line="1397"/>
        <location filename="../build/Desktop-Debug/VBDriveWizard_autogen/include/ui_mainwindow.h" line="2318"/>
        <source>Set Origin</source>
        <translation>设为零点</translation>
    </message>
    <message>
        <source>&lt;html&gt;&lt;head/&gt;&lt;body&gt;&lt;p align=&quot;center&quot;&gt;Logo&lt;/p&gt;&lt;/body&gt;&lt;/html&gt;</source>
        <translation type="vanished">&lt;html&gt;&lt;head/&gt;&lt;body&gt;&lt;p align=&quot;center&quot;&gt;Logo&lt;/p&gt;&lt;/body&gt;&lt;/html&gt;</translation>
    </message>
    <message>
        <location filename="../mainwindow.ui" line="1421"/>
        <location filename="../build/Desktop-Debug/VBDriveWizard_autogen/include/ui_mainwindow.h" line="2319"/>
        <source>REALTIME DATA</source>
        <translation>实时数据</translation>
    </message>
    <message>
        <location filename="../mainwindow.ui" line="1462"/>
        <location filename="../build/Desktop-Debug/VBDriveWizard_autogen/include/ui_mainwindow.h" line="2320"/>
        <source>Signal:</source>
        <translation>信号：</translation>
    </message>
    <message>
        <location filename="../mainwindow.ui" line="1470"/>
        <location filename="../mainwindow.ui" line="1784"/>
        <location filename="../mainwindow.ui" line="2860"/>
        <location filename="../mainwindow.ui" line="3190"/>
        <location filename="../build/Desktop-Debug/VBDriveWizard_autogen/include/ui_mainwindow.h" line="2321"/>
        <location filename="../build/Desktop-Debug/VBDriveWizard_autogen/include/ui_mainwindow.h" line="2350"/>
        <location filename="../build/Desktop-Debug/VBDriveWizard_autogen/include/ui_mainwindow.h" line="2385"/>
        <location filename="../build/Desktop-Debug/VBDriveWizard_autogen/include/ui_mainwindow.h" line="2397"/>
        <source>Position</source>
        <translation>位置</translation>
    </message>
    <message>
        <location filename="../mainwindow.ui" line="1485"/>
        <location filename="../build/Desktop-Debug/VBDriveWizard_autogen/include/ui_mainwindow.h" line="2324"/>
        <source>Temperature</source>
        <translation>温度</translation>
    </message>
    <message>
        <location filename="../mainwindow.ui" line="1500"/>
        <location filename="../build/Desktop-Debug/VBDriveWizard_autogen/include/ui_mainwindow.h" line="2327"/>
        <source>Log</source>
        <translation>日志</translation>
    </message>
    <message>
        <location filename="../mainwindow.ui" line="1508"/>
        <location filename="../build/Desktop-Debug/VBDriveWizard_autogen/include/ui_mainwindow.h" line="2329"/>
        <source>Units:</source>
        <translation>单位：</translation>
    </message>
    <message>
        <location filename="../mainwindow.ui" line="1516"/>
        <location filename="../mainwindow.ui" line="3395"/>
        <location filename="../build/Desktop-Debug/VBDriveWizard_autogen/include/ui_mainwindow.h" line="2330"/>
        <location filename="../build/Desktop-Debug/VBDriveWizard_autogen/include/ui_mainwindow.h" line="2416"/>
        <source>rad</source>
        <translation>rad</translation>
    </message>
    <message>
        <location filename="../mainwindow.ui" line="1521"/>
        <location filename="../build/Desktop-Debug/VBDriveWizard_autogen/include/ui_mainwindow.h" line="2331"/>
        <source>deg</source>
        <translation>deg</translation>
    </message>
    <message>
        <location filename="../mainwindow.ui" line="1542"/>
        <location filename="../build/Desktop-Debug/VBDriveWizard_autogen/include/ui_mainwindow.h" line="2334"/>
        <source>Preferences</source>
        <translation>首选项</translation>
    </message>
    <message>
        <location filename="../mainwindow.ui" line="1562"/>
        <location filename="../build/Desktop-Debug/VBDriveWizard_autogen/include/ui_mainwindow.h" line="2337"/>
        <source>Language:</source>
        <translation>语言：</translation>
    </message>
    <message>
        <location filename="../mainwindow.ui" line="1576"/>
        <location filename="../build/Desktop-Debug/VBDriveWizard_autogen/include/ui_mainwindow.h" line="2338"/>
        <source>English</source>
        <translation>English</translation>
    </message>
    <message>
        <location filename="../mainwindow.ui" line="1585"/>
        <location filename="../build/Desktop-Debug/VBDriveWizard_autogen/include/ui_mainwindow.h" line="2339"/>
        <source>Русский</source>
        <translation>Русский</translation>
    </message>
    <message>
        <location filename="../mainwindow.ui" line="1594"/>
        <location filename="../build/Desktop-Debug/VBDriveWizard_autogen/include/ui_mainwindow.h" line="2340"/>
        <source>中文</source>
        <translation>中文</translation>
    </message>
    <message>
        <source>Pause</source>
        <translation type="vanished">暂停</translation>
    </message>
    <message>
        <location filename="../mainwindow.ui" line="1648"/>
        <location filename="../build/Desktop-Debug/VBDriveWizard_autogen/include/ui_mainwindow.h" line="2346"/>
        <source>Save as CSV...</source>
        <translation>保存为 CSV...</translation>
    </message>
    <message>
        <location filename="../mainwindow.ui" line="1655"/>
        <location filename="../build/Desktop-Debug/VBDriveWizard_autogen/include/ui_mainwindow.h" line="2347"/>
        <source>Save as PNG...</source>
        <translation>保存为 PNG...</translation>
    </message>
    <message>
        <location filename="../mainwindow.ui" line="1697"/>
        <location filename="../build/Desktop-Debug/VBDriveWizard_autogen/include/ui_mainwindow.h" line="2348"/>
        <source>CONTROL</source>
        <translation>控制</translation>
    </message>
    <message>
        <location filename="../mainwindow.ui" line="1725"/>
        <location filename="../build/Desktop-Debug/VBDriveWizard_autogen/include/ui_mainwindow.h" line="2378"/>
        <source>Servo</source>
        <translation>Servo</translation>
    </message>
    <message>
        <location filename="../mainwindow.ui" line="1763"/>
        <location filename="../build/Desktop-Debug/VBDriveWizard_autogen/include/ui_mainwindow.h" line="2349"/>
        <source>Control Type</source>
        <translation>控制类型</translation>
    </message>
    <message>
        <location filename="../mainwindow.ui" line="1824"/>
        <location filename="../build/Desktop-Debug/VBDriveWizard_autogen/include/ui_mainwindow.h" line="2353"/>
        <source>Transient Form</source>
        <translation>过渡过程</translation>
    </message>
    <message>
        <location filename="../mainwindow.ui" line="1845"/>
        <location filename="../build/Desktop-Debug/VBDriveWizard_autogen/include/ui_mainwindow.h" line="2354"/>
        <source>Linear</source>
        <translation>线性</translation>
    </message>
    <message>
        <location filename="../mainwindow.ui" line="1855"/>
        <location filename="../build/Desktop-Debug/VBDriveWizard_autogen/include/ui_mainwindow.h" line="2355"/>
        <source>Polynomial</source>
        <translation>多项式</translation>
    </message>
    <message>
        <location filename="../mainwindow.ui" line="1934"/>
        <location filename="../mainwindow.ui" line="2124"/>
        <location filename="../build/Desktop-Debug/VBDriveWizard_autogen/include/ui_mainwindow.h" line="2357"/>
        <location filename="../build/Desktop-Debug/VBDriveWizard_autogen/include/ui_mainwindow.h" line="2362"/>
        <source>Set</source>
        <translation>设置</translation>
    </message>
    <message>
        <location filename="../mainwindow.ui" line="1961"/>
        <location filename="../build/Desktop-Debug/VBDriveWizard_autogen/include/ui_mainwindow.h" line="2358"/>
        <source>Feedback Gains</source>
        <translation>反馈增益</translation>
    </message>
    <message>
        <location filename="../mainwindow.ui" line="2002"/>
        <location filename="../build/Desktop-Debug/VBDriveWizard_autogen/include/ui_mainwindow.h" line="2359"/>
        <source>Kp:</source>
        <translation>Kp:</translation>
    </message>
    <message>
        <location filename="../mainwindow.ui" line="2032"/>
        <location filename="../build/Desktop-Debug/VBDriveWizard_autogen/include/ui_mainwindow.h" line="2360"/>
        <source>Ki:</source>
        <translation>Ki:</translation>
    </message>
    <message>
        <location filename="../mainwindow.ui" line="2062"/>
        <location filename="../build/Desktop-Debug/VBDriveWizard_autogen/include/ui_mainwindow.h" line="2361"/>
        <source>Kd:</source>
        <translation>Kd:</translation>
    </message>
    <message>
        <location filename="../mainwindow.ui" line="2140"/>
        <location filename="../build/Desktop-Debug/VBDriveWizard_autogen/include/ui_mainwindow.h" line="2365"/>
        <source>User</source>
        <translation>手动</translation>
    </message>
    <message>
        <location filename="../mainwindow.ui" line="2178"/>
        <location filename="../mainwindow.cpp" line="2067"/>
        <location filename="../build/Desktop-Debug/VBDriveWizard_autogen/include/ui_mainwindow.h" line="2363"/>
        <source>Target pos:</source>
        <translation>目标位置：</translation>
    </message>
    <message>
        <location filename="../mainwindow.ui" line="2253"/>
        <location filename="../mainwindow.ui" line="2409"/>
        <location filename="../mainwindow.ui" line="2565"/>
        <location filename="../mainwindow.ui" line="2721"/>
        <location filename="../mainwindow.ui" line="3257"/>
        <location filename="../mainwindow.cpp" line="2486"/>
        <location filename="../build/Desktop-Debug/VBDriveWizard_autogen/include/ui_mainwindow.h" line="2364"/>
        <location filename="../build/Desktop-Debug/VBDriveWizard_autogen/include/ui_mainwindow.h" line="2368"/>
        <location filename="../build/Desktop-Debug/VBDriveWizard_autogen/include/ui_mainwindow.h" line="2372"/>
        <location filename="../build/Desktop-Debug/VBDriveWizard_autogen/include/ui_mainwindow.h" line="2376"/>
        <location filename="../build/Desktop-Debug/VBDriveWizard_autogen/include/ui_mainwindow.h" line="2399"/>
        <source>Start</source>
        <translation>启动</translation>
    </message>
    <message>
        <location filename="../mainwindow.ui" line="2263"/>
        <location filename="../mainwindow.ui" line="2787"/>
        <location filename="../build/Desktop-Debug/VBDriveWizard_autogen/include/ui_mainwindow.h" line="2369"/>
        <location filename="../build/Desktop-Debug/VBDriveWizard_autogen/include/ui_mainwindow.h" line="2381"/>
        <source>Sin</source>
        <translation>正弦</translation>
    </message>
    <message>
        <location filename="../mainwindow.ui" line="2304"/>
        <location filename="../mainwindow.ui" line="2460"/>
        <location filename="../mainwindow.ui" line="2616"/>
        <location filename="../mainwindow.ui" line="3056"/>
        <location filename="../build/Desktop-Debug/VBDriveWizard_autogen/include/ui_mainwindow.h" line="2366"/>
        <location filename="../build/Desktop-Debug/VBDriveWizard_autogen/include/ui_mainwindow.h" line="2370"/>
        <location filename="../build/Desktop-Debug/VBDriveWizard_autogen/include/ui_mainwindow.h" line="2374"/>
        <location filename="../build/Desktop-Debug/VBDriveWizard_autogen/include/ui_mainwindow.h" line="2391"/>
        <source>Amplitude</source>
        <translation>幅值</translation>
    </message>
    <message>
        <location filename="../mainwindow.ui" line="2334"/>
        <location filename="../mainwindow.ui" line="2490"/>
        <location filename="../mainwindow.ui" line="2646"/>
        <location filename="../mainwindow.ui" line="3086"/>
        <location filename="../build/Desktop-Debug/VBDriveWizard_autogen/include/ui_mainwindow.h" line="2367"/>
        <location filename="../build/Desktop-Debug/VBDriveWizard_autogen/include/ui_mainwindow.h" line="2371"/>
        <location filename="../build/Desktop-Debug/VBDriveWizard_autogen/include/ui_mainwindow.h" line="2375"/>
        <location filename="../build/Desktop-Debug/VBDriveWizard_autogen/include/ui_mainwindow.h" line="2392"/>
        <source>Frequency</source>
        <translation>频率</translation>
    </message>
    <message>
        <location filename="../mainwindow.ui" line="2419"/>
        <location filename="../mainwindow.ui" line="2794"/>
        <location filename="../build/Desktop-Debug/VBDriveWizard_autogen/include/ui_mainwindow.h" line="2373"/>
        <location filename="../build/Desktop-Debug/VBDriveWizard_autogen/include/ui_mainwindow.h" line="2382"/>
        <source>Meander</source>
        <translation>方波</translation>
    </message>
    <message>
        <location filename="../mainwindow.ui" line="2575"/>
        <location filename="../mainwindow.ui" line="2801"/>
        <location filename="../build/Desktop-Debug/VBDriveWizard_autogen/include/ui_mainwindow.h" line="2377"/>
        <location filename="../build/Desktop-Debug/VBDriveWizard_autogen/include/ui_mainwindow.h" line="2383"/>
        <source>Triangle</source>
        <translation>三角波</translation>
    </message>
    <message>
        <location filename="../mainwindow.ui" line="2735"/>
        <location filename="../build/Desktop-Debug/VBDriveWizard_autogen/include/ui_mainwindow.h" line="2400"/>
        <source>MIT</source>
        <translation>MIT</translation>
    </message>
    <message>
        <location filename="../mainwindow.ui" line="2756"/>
        <location filename="../build/Desktop-Debug/VBDriveWizard_autogen/include/ui_mainwindow.h" line="2379"/>
        <source>Trajectory</source>
        <translation>轨迹</translation>
    </message>
    <message>
        <location filename="../mainwindow.ui" line="2777"/>
        <location filename="../build/Desktop-Debug/VBDriveWizard_autogen/include/ui_mainwindow.h" line="2380"/>
        <source>Step</source>
        <translation>阶跃</translation>
    </message>
    <message>
        <location filename="../mainwindow.ui" line="2833"/>
        <location filename="../build/Desktop-Debug/VBDriveWizard_autogen/include/ui_mainwindow.h" line="2384"/>
        <source>Step Targets</source>
        <translation>阶跃参数</translation>
    </message>
    <message>
        <location filename="../mainwindow.ui" line="2950"/>
        <location filename="../mainwindow.ui" line="3116"/>
        <location filename="../build/Desktop-Debug/VBDriveWizard_autogen/include/ui_mainwindow.h" line="2388"/>
        <location filename="../build/Desktop-Debug/VBDriveWizard_autogen/include/ui_mainwindow.h" line="2393"/>
        <source>Kp</source>
        <translation>Kp</translation>
    </message>
    <message>
        <location filename="../mainwindow.ui" line="2980"/>
        <location filename="../mainwindow.ui" line="3146"/>
        <location filename="../build/Desktop-Debug/VBDriveWizard_autogen/include/ui_mainwindow.h" line="2389"/>
        <location filename="../build/Desktop-Debug/VBDriveWizard_autogen/include/ui_mainwindow.h" line="2394"/>
        <source>Kd</source>
        <translation>Kd</translation>
    </message>
    <message>
        <location filename="../mainwindow.ui" line="3032"/>
        <location filename="../build/Desktop-Debug/VBDriveWizard_autogen/include/ui_mainwindow.h" line="2390"/>
        <source>Trajectory Targets</source>
        <translation>轨迹参数</translation>
    </message>
    <message>
        <location filename="../mainwindow.ui" line="3200"/>
        <location filename="../build/Desktop-Debug/VBDriveWizard_autogen/include/ui_mainwindow.h" line="2398"/>
        <source>+derivative</source>
        <translation>+导数</translation>
    </message>
    <message>
        <location filename="../mainwindow.ui" line="3273"/>
        <location filename="../build/Desktop-Debug/VBDriveWizard_autogen/include/ui_mainwindow.h" line="2401"/>
        <source>STATUS</source>
        <translation>状态</translation>
    </message>
    <message>
        <location filename="../mainwindow.ui" line="269"/>
        <location filename="../mainwindow.ui" line="3297"/>
        <location filename="../build/Desktop-Debug/VBDriveWizard_autogen/include/ui_mainwindow.h" line="2249"/>
        <location filename="../build/Desktop-Debug/VBDriveWizard_autogen/include/ui_mainwindow.h" line="2402"/>
        <source>Model</source>
        <translation>型号</translation>
    </message>
    <message>
        <location filename="../mainwindow.ui" line="1628"/>
        <location filename="../build/Desktop-Debug/VBDriveWizard_autogen/include/ui_mainwindow.h" line="2343"/>
        <source>Play/Pause Plot Data</source>
        <translation type="unfinished"></translation>
    </message>
    <message>
        <location filename="../mainwindow.ui" line="3304"/>
        <location filename="../build/Desktop-Debug/VBDriveWizard_autogen/include/ui_mainwindow.h" line="2403"/>
        <source>M4310R10</source>
        <translation>M4310R10</translation>
    </message>
    <message>
        <location filename="../mainwindow.ui" line="3318"/>
        <location filename="../build/Desktop-Debug/VBDriveWizard_autogen/include/ui_mainwindow.h" line="2405"/>
        <source>Temperature MCU</source>
        <translation>MCU 温度</translation>
    </message>
    <message>
        <location filename="../mainwindow.ui" line="3325"/>
        <location filename="../mainwindow.ui" line="3346"/>
        <location filename="../mainwindow.ui" line="3367"/>
        <location filename="../mainwindow.ui" line="3388"/>
        <location filename="../mainwindow.ui" line="3409"/>
        <location filename="../mainwindow.ui" line="3430"/>
        <location filename="../mainwindow.ui" line="3451"/>
        <location filename="../build/Desktop-Debug/VBDriveWizard_autogen/include/ui_mainwindow.h" line="2406"/>
        <location filename="../build/Desktop-Debug/VBDriveWizard_autogen/include/ui_mainwindow.h" line="2409"/>
        <location filename="../build/Desktop-Debug/VBDriveWizard_autogen/include/ui_mainwindow.h" line="2412"/>
        <location filename="../build/Desktop-Debug/VBDriveWizard_autogen/include/ui_mainwindow.h" line="2415"/>
        <location filename="../build/Desktop-Debug/VBDriveWizard_autogen/include/ui_mainwindow.h" line="2418"/>
        <location filename="../build/Desktop-Debug/VBDriveWizard_autogen/include/ui_mainwindow.h" line="2421"/>
        <location filename="../build/Desktop-Debug/VBDriveWizard_autogen/include/ui_mainwindow.h" line="2424"/>
        <source>TextLabel</source>
        <translation>TextLabel</translation>
    </message>
    <message>
        <location filename="../mainwindow.ui" line="3332"/>
        <location filename="../mainwindow.ui" line="3353"/>
        <location filename="../build/Desktop-Debug/VBDriveWizard_autogen/include/ui_mainwindow.h" line="2407"/>
        <location filename="../build/Desktop-Debug/VBDriveWizard_autogen/include/ui_mainwindow.h" line="2410"/>
        <source>C</source>
        <translation>C</translation>
    </message>
    <message>
        <location filename="../mainwindow.ui" line="3339"/>
        <location filename="../build/Desktop-Debug/VBDriveWizard_autogen/include/ui_mainwindow.h" line="2408"/>
        <source>Temperature Stator</source>
        <translation>定子温度</translation>
    </message>
    <message>
        <location filename="../mainwindow.ui" line="3360"/>
        <location filename="../build/Desktop-Debug/VBDriveWizard_autogen/include/ui_mainwindow.h" line="2411"/>
        <source>Bus Voltage</source>
        <translation>母线电压</translation>
    </message>
    <message>
        <location filename="../mainwindow.ui" line="3374"/>
        <location filename="../build/Desktop-Debug/VBDriveWizard_autogen/include/ui_mainwindow.h" line="2413"/>
        <source>V</source>
        <translation>V</translation>
    </message>
    <message>
        <location filename="../mainwindow.ui" line="3402"/>
        <location filename="../build/Desktop-Debug/VBDriveWizard_autogen/include/ui_mainwindow.h" line="2417"/>
        <source>Motor Encoder</source>
        <translation>转子编码器</translation>
    </message>
    <message>
        <location filename="../mainwindow.ui" line="3416"/>
        <location filename="../mainwindow.ui" line="3437"/>
        <location filename="../mainwindow.ui" line="3458"/>
        <location filename="../build/Desktop-Debug/VBDriveWizard_autogen/include/ui_mainwindow.h" line="2419"/>
        <location filename="../build/Desktop-Debug/VBDriveWizard_autogen/include/ui_mainwindow.h" line="2422"/>
        <location filename="../build/Desktop-Debug/VBDriveWizard_autogen/include/ui_mainwindow.h" line="2425"/>
        <source>-</source>
        <translation>-</translation>
    </message>
    <message>
        <location filename="../mainwindow.ui" line="3423"/>
        <location filename="../build/Desktop-Debug/VBDriveWizard_autogen/include/ui_mainwindow.h" line="2420"/>
        <source>Shaft Encoder</source>
        <translation>输出轴编码器</translation>
    </message>
    <message>
        <location filename="../mainwindow.ui" line="3444"/>
        <location filename="../build/Desktop-Debug/VBDriveWizard_autogen/include/ui_mainwindow.h" line="2423"/>
        <source>Fault</source>
        <translation>故障</translation>
    </message>
    <message>
        <location filename="../mainwindow.ui" line="3504"/>
        <location filename="../build/Desktop-Debug/VBDriveWizard_autogen/include/ui_mainwindow.h" line="2427"/>
        <source>STOP</source>
        <translation>停止</translation>
    </message>
    <message>
        <location filename="../mainwindow.cpp" line="275"/>
        <source>Reconnect failed</source>
        <translation>重新连接失败</translation>
    </message>
    <message>
        <location filename="../mainwindow.cpp" line="276"/>
        <source>The drive did not answer after flashing; connect again by hand.

%1</source>
        <translation>烧录后驱动器没有响应；请手动重新连接。

%1</translation>
    </message>
    <message>
        <location filename="../mainwindow.cpp" line="281"/>
        <location filename="../mainwindow.cpp" line="293"/>
        <location filename="../mainwindow.cpp" line="1028"/>
        <location filename="../mainwindow.cpp" line="1060"/>
        <source>Connection failed</source>
        <translation>连接失败</translation>
    </message>
    <message>
        <location filename="../mainwindow.cpp" line="316"/>
        <source>Firmware download failed</source>
        <translation>固件下载失败</translation>
    </message>
    <message>
        <location filename="../mainwindow.cpp" line="320"/>
        <source>Downloaded firmware %1.</source>
        <translation>已下载固件 %1。</translation>
    </message>
    <message>
        <location filename="../mainwindow.cpp" line="340"/>
        <source>Flashing failed</source>
        <translation>烧录失败</translation>
    </message>
    <message>
        <location filename="../mainwindow.cpp" line="491"/>
        <location filename="../mainwindow.cpp" line="493"/>
        <location filename="../mainwindow.cpp" line="911"/>
        <location filename="../mainwindow.cpp" line="1168"/>
        <location filename="../mainwindow.cpp" line="1169"/>
        <source>Disconnect</source>
        <translation>断开</translation>
    </message>
    <message>
        <source>Resume</source>
        <translation type="vanished">继续</translation>
    </message>
    <message>
        <location filename="../mainwindow.cpp" line="1308"/>
        <source>No drives found - press refresh</source>
        <translation>未找到设备 - 请点击刷新</translation>
    </message>
    <message>
        <location filename="../mainwindow.cpp" line="198"/>
        <location filename="../mainwindow.cpp" line="499"/>
        <location filename="../mainwindow.cpp" line="1111"/>
        <source>Not connected</source>
        <translation>未连接</translation>
    </message>
    <message>
        <location filename="../mainwindow.cpp" line="517"/>
        <location filename="../mainwindow.cpp" line="1369"/>
        <source>Unsaved changes</source>
        <translation>未保存的更改</translation>
    </message>
    <message>
        <location filename="../mainwindow.cpp" line="518"/>
        <source>Some register changes have not been written to the drive.
Close anyway?</source>
        <translation>部分寄存器更改尚未写入驱动器。
仍要关闭吗？</translation>
    </message>
    <message>
        <location filename="../mainwindow.cpp" line="547"/>
        <location filename="../mainwindow.cpp" line="1021"/>
        <source>Disconnecting...</source>
        <translation>正在断开...</translation>
    </message>
    <message>
        <location filename="../mainwindow.cpp" line="959"/>
        <source>%1 (unavailable)</source>
        <translation>%1（不可用）</translation>
    </message>
    <message>
        <location filename="../mainwindow.cpp" line="1028"/>
        <source>No serial port selected.</source>
        <translation>未选择串口。</translation>
    </message>
    <message>
        <location filename="../mainwindow.cpp" line="1038"/>
        <source>Opening %1...</source>
        <translation>正在打开 %1...</translation>
    </message>
    <message>
        <location filename="../mainwindow.cpp" line="1066"/>
        <source>Listening for drives on %1...</source>
        <translation>正在 %1 上搜索驱动器...</translation>
    </message>
    <message>
        <location filename="../mainwindow.cpp" line="1095"/>
        <source>Serial connected</source>
        <translation>串口已连接</translation>
    </message>
    <message>
        <location filename="../mainwindow.cpp" line="1096"/>
        <source>CAN connected</source>
        <translation>CAN 已连接</translation>
    </message>
    <message>
        <location filename="../mainwindow.cpp" line="1112"/>
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
        <location filename="../mainwindow.cpp" line="1294"/>
        <source>  (no heartbeat)</source>
        <translation>（无心跳）</translation>
    </message>
    <message>
        <location filename="../mainwindow.cpp" line="1370"/>
        <source>Drive %1 has register changes that were not written.
Write them before switching?</source>
        <translation>驱动器 %1 有未写入的寄存器更改。
切换前是否写入？</translation>
    </message>
    <message>
        <location filename="../mainwindow.cpp" line="1442"/>
        <source>Reading registers...</source>
        <translation>正在读取寄存器...</translation>
    </message>
    <message>
        <location filename="../mainwindow.cpp" line="1453"/>
        <source>No changes to write.</source>
        <translation>没有需要写入的更改。</translation>
    </message>
    <message numerus="yes">
        <location filename="../mainwindow.cpp" line="1489"/>
        <source>Writing %n register(s), the drive restarts to apply them...</source>
        <translation>
            <numerusform>正在写入 %n 个寄存器，驱动器将重启以应用...</numerusform>
        </translation>
    </message>
    <message numerus="yes">
        <location filename="../mainwindow.cpp" line="1494"/>
        <source>Writing %n register(s)...</source>
        <translation>
            <numerusform>正在写入 %n 个寄存器...</numerusform>
        </translation>
    </message>
    <message>
        <location filename="../mainwindow.cpp" line="1521"/>
        <source>Origin set; angle offset is now %1.</source>
        <translation>零点已设置，角度偏移现为 %1。</translation>
    </message>
    <message>
        <location filename="../mainwindow.cpp" line="1531"/>
        <source>Calibrate sensor</source>
        <translation>校准传感器</translation>
    </message>
    <message>
        <location filename="../mainwindow.cpp" line="1532"/>
        <source>Calibration moves the motor and cannot be cancelled. The drive stops answering until it finishes.

Start calibration?</source>
        <translation>校准会转动电机且无法取消。驱动器在校准完成前不会响应。

开始校准吗？</translation>
    </message>
    <message>
        <location filename="../mainwindow.cpp" line="1541"/>
        <source>Calibration started; the drive will not answer until it is done.</source>
        <translation>校准已开始，驱动器在完成前不会响应。</translation>
    </message>
    <message>
        <location filename="../mainwindow.cpp" line="1563"/>
        <source>Save register profile</source>
        <translation>保存寄存器配置</translation>
    </message>
    <message>
        <location filename="../mainwindow.cpp" line="1566"/>
        <location filename="../mainwindow.cpp" line="1589"/>
        <source>YAML files (*.yaml *.yml)</source>
        <translation>YAML 文件 (*.yaml *.yml)</translation>
    </message>
    <message>
        <location filename="../mainwindow.cpp" line="1580"/>
        <source>Could not save the profile</source>
        <translation>无法保存配置</translation>
    </message>
    <message>
        <location filename="../mainwindow.cpp" line="1582"/>
        <source>Profile saved to %1.</source>
        <translation>配置已保存到 %1。</translation>
    </message>
    <message>
        <location filename="../mainwindow.cpp" line="1588"/>
        <source>Load register profile</source>
        <translation>加载寄存器配置</translation>
    </message>
    <message>
        <location filename="../mainwindow.cpp" line="1597"/>
        <source>Could not load the profile</source>
        <translation>无法加载配置</translation>
    </message>
    <message numerus="yes">
        <location filename="../mainwindow.cpp" line="1602"/>
        <source>Loaded %n register(s) from the profile.</source>
        <translation>
            <numerusform>已从配置加载 %n 个寄存器。</numerusform>
        </translation>
    </message>
    <message>
        <location filename="../mainwindow.cpp" line="1604"/>
        <source>Loaded with warnings: %1</source>
        <translation>加载时出现警告：%1</translation>
    </message>
    <message>
        <location filename="../mainwindow.cpp" line="1620"/>
        <source>Could not load the default profile</source>
        <translation>无法加载默认配置</translation>
    </message>
    <message>
        <location filename="../mainwindow.cpp" line="1624"/>
        <source>Default values for %1 loaded into the editors.</source>
        <translation>%1 的默认值已载入编辑框。</translation>
    </message>
    <message>
        <location filename="../mainwindow.cpp" line="1652"/>
        <source>Could not read &apos;%1&apos;: %2</source>
        <translation>无法读取“%1”：%2</translation>
    </message>
    <message>
        <location filename="../mainwindow.cpp" line="1700"/>
        <source>Could not write &apos;%1&apos;: %2</source>
        <translation>无法写入“%1”：%2</translation>
    </message>
    <message>
        <location filename="../mainwindow.cpp" line="1716"/>
        <source>Registers written.</source>
        <translation>寄存器已写入。</translation>
    </message>
    <message>
        <location filename="../mainwindow.cpp" line="1726"/>
        <source>Some registers were not written</source>
        <translation>部分寄存器未写入</translation>
    </message>
    <message>
        <location filename="../mainwindow.cpp" line="1732"/>
        <source>The drive is not calibrated. Please calibrate the drive to start working.</source>
        <translation>驱动器未校准。请先校准驱动器，然后再开始工作。</translation>
    </message>
    <message>
        <location filename="../mainwindow.cpp" line="1736"/>
        <source>Drive not calibrated</source>
        <translation>驱动器未校准</translation>
    </message>
    <message>
        <location filename="../mainwindow.cpp" line="1784"/>
        <source>Drive lost</source>
        <translation>驱动器失联</translation>
    </message>
    <message>
        <location filename="../mainwindow.cpp" line="1785"/>
        <source>Drive %1 (node %2) stopped sending heartbeats.</source>
        <translation>驱动器 %1（节点 %2）停止发送心跳。</translation>
    </message>
    <message>
        <location filename="../mainwindow.cpp" line="1788"/>
        <source>Wait for it to come back, keeping your unsaved register changes, or drop it and discard them?</source>
        <translation>是等待它恢复并保留未保存的寄存器更改，还是移除它并放弃这些更改？</translation>
    </message>
    <message>
        <location filename="../mainwindow.cpp" line="1790"/>
        <source>Reconnect</source>
        <translation>重新连接</translation>
    </message>
    <message>
        <location filename="../mainwindow.cpp" line="1791"/>
        <source>Remove drive</source>
        <translation>移除驱动器</translation>
    </message>
    <message>
        <location filename="../mainwindow.cpp" line="1803"/>
        <source>Waiting for node %1 to return...</source>
        <translation>正在等待节点 %1 恢复...</translation>
    </message>
    <message>
        <location filename="../mainwindow.cpp" line="1825"/>
        <source>The drive restarted with the new settings.</source>
        <translation>驱动器已使用新设置重启。</translation>
    </message>
    <message>
        <location filename="../mainwindow.cpp" line="1838"/>
        <source>Node %1 is back.</source>
        <translation>节点 %1 已恢复。</translation>
    </message>
    <message>
        <location filename="../mainwindow.cpp" line="1926"/>
        <source>Yes</source>
        <translation>是</translation>
    </message>
    <message>
        <location filename="../mainwindow.cpp" line="1926"/>
        <source>No</source>
        <translation>否</translation>
    </message>
    <message>
        <location filename="../mainwindow.cpp" line="2065"/>
        <source>Target vel:</source>
        <translation>目标速度：</translation>
    </message>
    <message>
        <location filename="../mainwindow.cpp" line="2066"/>
        <source>Target torq:</source>
        <translation>目标转矩：</translation>
    </message>
    <message>
        <location filename="../mainwindow.cpp" line="2349"/>
        <source>Serial cannot sustain %1 Hz; running at %2 Hz instead.</source>
        <translation>串口无法维持 %1 Hz，改为 %2 Hz 运行。</translation>
    </message>
    <message>
        <location filename="../mainwindow.cpp" line="2417"/>
        <source>Feedback gains written.</source>
        <translation>反馈增益已写入。</translation>
    </message>
    <message>
        <location filename="../mainwindow.cpp" line="2436"/>
        <source>Transient form written.</source>
        <translation>过渡过程参数已写入。</translation>
    </message>
    <message>
        <location filename="../mainwindow.cpp" line="2451"/>
        <source>Emergency stop: all drives disabled.</source>
        <translation>急停：已关闭所有驱动器。</translation>
    </message>
    <message>
        <location filename="../mainwindow.cpp" line="2578"/>
        <source>Pause the plot</source>
        <translation>暂停绘图</translation>
    </message>
    <message>
        <location filename="../mainwindow.cpp" line="2578"/>
        <source>Resume the plot</source>
        <translation>继续绘图</translation>
    </message>
    <message>
        <location filename="../mainwindow.cpp" line="1128"/>
        <source>Emergency stop</source>
        <translation>急停</translation>
    </message>
    <message>
        <location filename="../mainwindow.cpp" line="349"/>
        <source>Firmware flashed</source>
        <translation>固件已烧录</translation>
    </message>
    <message>
        <location filename="../mainwindow.cpp" line="350"/>
        <source>Restart the drive and press OK.</source>
        <translation>请重启驱动器，然后按“确定”。</translation>
    </message>
    <message>
        <location filename="../mainwindow.cpp" line="364"/>
        <source>%1 Connect to the drive from CONNECTION.</source>
        <translation>%1 请在“连接”面板中连接驱动器。</translation>
    </message>
    <message>
        <location filename="../mainwindow.cpp" line="1129"/>
        <source>The drive has been stopped by the emergency stop. To resume, restart the drive and connect to it again.</source>
        <translation>驱动器已被急停。要恢复工作，请重启驱动器并重新连接。</translation>
    </message>
    <message>
        <location filename="../mainwindow.cpp" line="2486"/>
        <source>Stop</source>
        <translation>停止</translation>
    </message>
    <message>
        <location filename="../mainwindow.cpp" line="2583"/>
        <source>Save plot data</source>
        <translation>保存图表数据</translation>
    </message>
    <message>
        <location filename="../mainwindow.cpp" line="2584"/>
        <source>CSV files (*.csv)</source>
        <translation>CSV 文件 (*.csv)</translation>
    </message>
    <message>
        <location filename="../mainwindow.cpp" line="2589"/>
        <source>Could not save the CSV</source>
        <translation>无法保存 CSV</translation>
    </message>
    <message>
        <location filename="../mainwindow.cpp" line="2591"/>
        <source>Plot data saved.</source>
        <translation>图表数据已保存。</translation>
    </message>
    <message>
        <location filename="../mainwindow.cpp" line="2596"/>
        <source>Save plot image</source>
        <translation>保存图表图像</translation>
    </message>
    <message>
        <location filename="../mainwindow.cpp" line="2597"/>
        <source>PNG images (*.png)</source>
        <translation>PNG 图像 (*.png)</translation>
    </message>
    <message>
        <location filename="../mainwindow.cpp" line="2602"/>
        <source>Could not save the image</source>
        <translation>无法保存图像</translation>
    </message>
    <message>
        <location filename="../mainwindow.cpp" line="2604"/>
        <source>Plot image saved.</source>
        <translation>图表图像已保存。</translation>
    </message>
    <message>
        <location filename="../mainwindow.cpp" line="2623"/>
        <source>Select firmware image</source>
        <translation>选择固件文件</translation>
    </message>
    <message>
        <location filename="../mainwindow.cpp" line="2624"/>
        <source>Intel HEX files (*.hex)</source>
        <translation>Intel HEX 文件 (*.hex)</translation>
    </message>
    <message>
        <location filename="../mainwindow.cpp" line="2628"/>
        <source>Selected %1.</source>
        <translation>已选择 %1。</translation>
    </message>
    <message>
        <location filename="../mainwindow.cpp" line="2640"/>
        <source>No firmware selected</source>
        <translation>未选择固件</translation>
    </message>
    <message>
        <location filename="../mainwindow.cpp" line="2641"/>
        <source>Choose a .hex file first, or switch to downloading the latest release.</source>
        <translation>请先选择 .hex 文件，或切换为下载最新版本。</translation>
    </message>
    <message>
        <location filename="../mainwindow.cpp" line="2666"/>
        <source>Flashing %1...</source>
        <translation>正在烧录 %1...</translation>
    </message>
    <message>
        <location filename="../mainwindow.cpp" line="2682"/>
        <source>Reconnecting to the flashed drive...</source>
        <translation>正在重新连接已烧录的驱动器...</translation>
    </message>
    <message>
        <location filename="../mainwindow.cpp" line="2708"/>
        <source>Reconnecting to %1...</source>
        <translation>正在重新连接 %1...</translation>
    </message>
</context>
<context>
    <name>PlotController</name>
    <message>
        <location filename="../ui/plot_controller.cpp" line="133"/>
        <source>t, s</source>
        <translation>t, 秒</translation>
    </message>
    <message>
        <location filename="../ui/plot_controller.cpp" line="158"/>
        <source>Position</source>
        <translation>位置</translation>
    </message>
    <message>
        <location filename="../ui/plot_controller.cpp" line="160"/>
        <source>Velocity</source>
        <translation>速度</translation>
    </message>
    <message>
        <location filename="../ui/plot_controller.cpp" line="162"/>
        <source>Torque</source>
        <translation>转矩</translation>
    </message>
    <message>
        <location filename="../ui/plot_controller.cpp" line="164"/>
        <source>MCU</source>
        <translation>MCU</translation>
    </message>
    <message>
        <location filename="../ui/plot_controller.cpp" line="166"/>
        <source>Bus current</source>
        <translation>母线电流</translation>
    </message>
    <message>
        <location filename="../ui/plot_controller.cpp" line="168"/>
        <source>Rotor</source>
        <translation>转子</translation>
    </message>
    <message>
        <location filename="../ui/plot_controller.cpp" line="181"/>
        <source>Target</source>
        <translation>目标</translation>
    </message>
    <message>
        <location filename="../ui/plot_controller.cpp" line="183"/>
        <source>Stator</source>
        <translation>定子</translation>
    </message>
    <message>
        <location filename="../ui/plot_controller.cpp" line="185"/>
        <source>Shaft</source>
        <translation>输出轴</translation>
    </message>
    <message>
        <location filename="../ui/plot_controller.cpp" line="196"/>
        <source>Position, %1</source>
        <translation>位置，%1</translation>
    </message>
    <message>
        <location filename="../ui/plot_controller.cpp" line="198"/>
        <source>Velocity, %1</source>
        <translation>速度，%1</translation>
    </message>
    <message>
        <location filename="../ui/plot_controller.cpp" line="201"/>
        <source>Torque, N*m</source>
        <translation>转矩，N·m</translation>
    </message>
    <message>
        <location filename="../ui/plot_controller.cpp" line="203"/>
        <source>Temperature, C</source>
        <translation>温度，°C</translation>
    </message>
    <message>
        <location filename="../ui/plot_controller.cpp" line="205"/>
        <source>Current, A</source>
        <translation>电流，A</translation>
    </message>
    <message>
        <location filename="../ui/plot_controller.cpp" line="207"/>
        <source>Encoder, counts</source>
        <translation>编码器，计数</translation>
    </message>
    <message>
        <location filename="../ui/plot_controller.cpp" line="552"/>
        <location filename="../ui/plot_controller.cpp" line="589"/>
        <source>The plot is not initialised.</source>
        <translation>图表尚未初始化。</translation>
    </message>
    <message>
        <location filename="../ui/plot_controller.cpp" line="557"/>
        <source>The log view cannot be exported as an image.</source>
        <translation>日志视图无法导出为图像。</translation>
    </message>
    <message>
        <location filename="../ui/plot_controller.cpp" line="571"/>
        <source>The plot could not be rendered.</source>
        <translation>无法渲染图表。</translation>
    </message>
    <message>
        <location filename="../ui/plot_controller.cpp" line="579"/>
        <source>Could not write %1.</source>
        <translation>无法写入 %1。</translation>
    </message>
    <message>
        <location filename="../ui/plot_controller.cpp" line="597"/>
        <location filename="../ui/plot_controller.cpp" line="605"/>
        <location filename="../ui/plot_controller.cpp" line="614"/>
        <location filename="../ui/plot_controller.cpp" line="650"/>
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
        <location filename="../ui/preferences_dialog.ui" line="35"/>
        <source>Appearance</source>
        <translation>外观</translation>
    </message>
    <message>
        <location filename="../ui/preferences_dialog.ui" line="59"/>
        <source>Theme:</source>
        <translation>主题：</translation>
    </message>
    <message>
        <location filename="../ui/preferences_dialog.ui" line="67"/>
        <source>Dark</source>
        <translation>深色</translation>
    </message>
    <message>
        <location filename="../ui/preferences_dialog.ui" line="72"/>
        <source>Light</source>
        <translation>浅色</translation>
    </message>
    <message>
        <location filename="../ui/preferences_dialog.ui" line="80"/>
        <source>Interface font size, pt:</source>
        <translation>界面字号，pt：</translation>
    </message>
    <message>
        <location filename="../ui/preferences_dialog.ui" line="100"/>
        <source>Plot</source>
        <translation>图表</translation>
    </message>
    <message>
        <location filename="../ui/preferences_dialog.ui" line="124"/>
        <source>Plot font size, pt:</source>
        <translation>图表字号，pt：</translation>
    </message>
    <message>
        <location filename="../ui/preferences_dialog.ui" line="141"/>
        <source>Line width, px:</source>
        <translation>线宽，px：</translation>
    </message>
    <message>
        <location filename="../ui/preferences_dialog.ui" line="158"/>
        <source>Time window, s:</source>
        <translation>时间窗口，秒：</translation>
    </message>
    <message>
        <location filename="../ui/preferences_dialog.ui" line="181"/>
        <source>Redraw rate, Hz:</source>
        <translation>刷新率，Hz：</translation>
    </message>
    <message>
        <location filename="../ui/preferences_dialog.ui" line="201"/>
        <source>Connection</source>
        <translation>连接</translation>
    </message>
    <message>
        <location filename="../ui/preferences_dialog.ui" line="225"/>
        <source>This application&apos;s Cyphal node ID:</source>
        <translation>本程序的 Cyphal Node ID：</translation>
    </message>
    <message>
        <location filename="../ui/preferences_dialog.ui" line="242"/>
        <source>Serial baud rate:</source>
        <translation>串口波特率：</translation>
    </message>
    <message>
        <location filename="../ui/preferences_dialog.ui" line="265"/>
        <source>Firmware flashing (OpenOCD)</source>
        <translation>固件烧录（OpenOCD）</translation>
    </message>
    <message>
        <location filename="../ui/preferences_dialog.ui" line="289"/>
        <source>Interface config:</source>
        <translation>接口配置：</translation>
    </message>
    <message>
        <location filename="../ui/preferences_dialog.ui" line="300"/>
        <source>Target config:</source>
        <translation>目标配置：</translation>
    </message>
    <message>
        <location filename="../ui/preferences_dialog.cpp" line="22"/>
        <source>OpenOCD interface script, relative to its scripts directory.
VBDrive is programmed over SWD with an ST-Link.</source>
        <translation>OpenOCD 接口脚本，相对于其 scripts 目录。
VBDrive 通过 ST-Link 以 SWD 方式烧录。</translation>
    </message>
    <message>
        <location filename="../ui/preferences_dialog.cpp" line="25"/>
        <source>OpenOCD target script. VBDrive uses an STM32G431VB.</source>
        <translation>OpenOCD 目标脚本。VBDrive 使用 STM32G431VB。</translation>
    </message>
    <message>
        <location filename="../ui/preferences_dialog.cpp" line="27"/>
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
        <location filename="../ui/restore_model_dialog.ui" line="35"/>
        <source>Load the factory register profile for this drive model. The values are placed in the editors; nothing is written to the drive until you press Write.</source>
        <translation>加载该型号驱动器的出厂寄存器配置。数值会填入编辑框；在按下“写入”之前不会写入驱动器。</translation>
    </message>
    <message>
        <location filename="../ui/restore_model_dialog.ui" line="62"/>
        <source>Drive model:</source>
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
    <name>SerialService</name>
    <message>
        <location filename="../transport/serial_service.cpp" line="99"/>
        <source>Serial service is shutting down.</source>
        <translation>串口服务正在关闭。</translation>
    </message>
    <message>
        <location filename="../transport/serial_service.cpp" line="128"/>
        <source>Reconnecting.</source>
        <translation>正在重新连接。</translation>
    </message>
    <message>
        <location filename="../transport/serial_service.cpp" line="140"/>
        <location filename="../transport/serial_service.cpp" line="144"/>
        <location filename="../transport/serial_service.cpp" line="158"/>
        <location filename="../transport/serial_service.cpp" line="174"/>
        <location filename="../transport/serial_service.cpp" line="498"/>
        <source>Disconnected.</source>
        <translation>已断开。</translation>
    </message>
    <message>
        <location filename="../transport/serial_service.cpp" line="206"/>
        <location filename="../transport/serial_service.cpp" line="232"/>
        <location filename="../transport/serial_service.cpp" line="697"/>
        <source>Serial port is not open.</source>
        <translation>串口未打开。</translation>
    </message>
    <message>
        <location filename="../transport/serial_service.cpp" line="206"/>
        <location filename="../transport/serial_service.cpp" line="697"/>
        <source>Disconnecting.</source>
        <translation>正在断开。</translation>
    </message>
    <message>
        <location filename="../transport/serial_service.cpp" line="287"/>
        <source>Command &apos;%1&apos; failed: %2</source>
        <translation>命令“%1”失败：%2</translation>
    </message>
    <message>
        <location filename="../transport/serial_service.cpp" line="299"/>
        <source>The drive did not answer after restarting: %1</source>
        <translation>驱动器重启后没有响应：%1</translation>
    </message>
    <message>
        <location filename="../transport/serial_service.cpp" line="323"/>
        <source>Drive detected on %1.</source>
        <translation>在 %1 上检测到驱动器。</translation>
    </message>
    <message>
        <location filename="../transport/serial_service.cpp" line="324"/>
        <source>No drive answered on %1: %2</source>
        <translation>%1 上没有驱动器响应：%2</translation>
    </message>
    <message>
        <location filename="../transport/serial_service.cpp" line="332"/>
        <source>Could not enter CONFIG mode: %1</source>
        <translation>无法进入 CONFIG 模式：%1</translation>
    </message>
    <message>
        <location filename="../transport/serial_service.cpp" line="392"/>
        <source>These registers were rejected by the drive: %1</source>
        <translation>驱动器拒绝了这些寄存器：%1</translation>
    </message>
    <message>
        <location filename="../transport/serial_service.cpp" line="498"/>
        <source>Serial connection lost.</source>
        <translation>串口连接已丢失。</translation>
    </message>
    <message>
        <location filename="../transport/serial_service.cpp" line="523"/>
        <source>The drive did not come back after restarting.</source>
        <translation>驱动器重启后未恢复连接。</translation>
    </message>
    <message>
        <location filename="../transport/serial_service.cpp" line="580"/>
        <source>The drive did not answer in time.</source>
        <translation>驱动器未及时响应。</translation>
    </message>
    <message>
        <location filename="../transport/serial_service.cpp" line="665"/>
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
</TS>
