<?xml version='1.0' encoding='utf-8'?>
<TS version="2.1" language="zh_CN">
<context>
    <name>CanInterfaceList</name>
    <message>
        <source>No CAN interface selected.</source>
        <translation>未选择 CAN 接口。</translation>
    </message>
    <message>
        <source>Interface %1 is down. Bring it up, for example:
  sudo ip link set %1 up type can bitrate 500000 dbitrate 2000000 fd on</source>
        <translation>接口 %1 未启用。请启用它，例如：
  sudo ip link set %1 up type can bitrate 500000 dbitrate 2000000 fd on</translation>
    </message>
    <message>
        <source>Interface %1 is not running in CAN FD mode (MTU %2, expected %3).
VBDrive uses Cyphal over CAN FD, so an FD-capable adapter is required.</source>
        <translation>接口 %1 未运行在 CAN FD 模式（MTU %2，应为 %3）。
VBDrive 使用基于 CAN FD 的 Cyphal，因此需要支持 FD 的适配器。</translation>
    </message>
</context>
<context>
    <name>ConfigManager</name>
    <message>
        <source>Cannot write %1: %2</source>
        <translation>无法写入 %1：%2</translation>
    </message>
    <message>
        <source>Settings loaded.</source>
        <translation>设置已加载。</translation>
    </message>
    <message>
        <source>No settings file found; defaults are in use.</source>
        <translation>未找到设置文件，正在使用默认值。</translation>
    </message>
    <message>
        <source>Settings file could not be read; defaults are in use.</source>
        <translation>无法读取设置文件，正在使用默认值。</translation>
    </message>
</context>
<context>
    <name>CyphalBridge</name>
    <message>
        <source>The Cyphal stack reported an internal error.</source>
        <translation>Cyphal 协议栈报告了内部错误。</translation>
    </message>
    <message>
        <source>Could not open CAN interface %1.</source>
        <translation>无法打开 CAN 接口 %1。</translation>
    </message>
</context>
<context>
    <name>CyphalService</name>
    <message>
        <source>The CAN connection was closed.</source>
        <translation>CAN 连接已关闭。</translation>
    </message>
    <message>
        <source>No VBDrive answered on %1 within %2 seconds.</source>
        <translation>%2 秒内没有 VBDrive 在 %1 上响应。</translation>
    </message>
    <message numerus="yes">
        <source>Found %n drive(s) on %1.</source>
        <translation><numerusform>在 %1 上找到 %n 个驱动器。</numerusform></translation>
    </message>
    <message>
        <source>The drive stopped answering.</source>
        <translation>驱动器停止响应。</translation>
    </message>
    <message>
        <source>The drive did not answer register '%1' in time.</source>
        <translation>驱动器未及时响应寄存器“%1”。</translation>
    </message>
    <message>
        <source>Could not send the request.</source>
        <translation>无法发送请求。</translation>
    </message>
    <message>
        <source>The drive did not accept the value.</source>
        <translation>驱动器未接受该值。</translation>
    </message>
    <message>
        <source>Register '%1' is read-only.</source>
        <translation>寄存器“%1”为只读。</translation>
    </message>
    <message>
        <source>Register '%1' is not available on this drive.</source>
        <translation>该驱动器上没有寄存器“%1”。</translation>
    </message>
    <message>
        <source>These registers were rejected by the drive: %1</source>
        <translation>驱动器拒绝了这些寄存器：%1</translation>
    </message>
</context>
<context>
    <name>DeviceModel</name>
    <message>
        <source>Unknown drive</source>
        <translation>未知驱动器</translation>
    </message>
</context>
<context>
    <name>FirmwareDownloader</name>
    <message>
        <source>A firmware download is already running.</source>
        <translation>固件下载已在进行中。</translation>
    </message>
    <message>
        <source>Looking up the latest release...</source>
        <translation>正在查找最新版本...</translation>
    </message>
    <message>
        <source>Could not reach the VBDrive releases: %1</source>
        <translation>无法访问 VBDrive 发布列表：%1</translation>
    </message>
    <message>
        <source>Release %1 does not contain %2.</source>
        <translation>版本 %1 不包含 %2。</translation>
    </message>
    <message>
        <source>(unknown)</source>
        <translation>（未知）</translation>
    </message>
    <message>
        <source>Downloading %1...</source>
        <translation>正在下载 %1...</translation>
    </message>
    <message>
        <source>Firmware download failed: %1</source>
        <translation>固件下载失败：%1</translation>
    </message>
    <message>
        <source>Could not write %1: %2</source>
        <translation>无法写入 %1：%2</translation>
    </message>
    <message>
        <source>Download complete.</source>
        <translation>下载完成。</translation>
    </message>
</context>
<context>
    <name>FirmwareFlasher</name>
    <message>
        <source>A flashing operation is already running.</source>
        <translation>烧录操作已在进行中。</translation>
    </message>
    <message>
        <source>Firmware file not found: %1</source>
        <translation>未找到固件文件：%1</translation>
    </message>
    <message>
        <source>openocd was not found. Install it, for example:
  sudo apt install openocd</source>
        <translation>未找到 openocd。请安装，例如：
  sudo apt install openocd</translation>
    </message>
    <message>
        <source>openocd could not be started.</source>
        <translation>无法启动 openocd。</translation>
    </message>
    <message>
        <source>Done.</source>
        <translation>完成。</translation>
    </message>
    <message>
        <source>Firmware written and verified.</source>
        <translation>固件已写入并校验。</translation>
    </message>
    <message>
        <source>openocd exited with code %1.

%2</source>
        <translation>openocd 以代码 %1 退出。

%2</translation>
    </message>
    <message>
        <source>Starting openocd...</source>
        <translation>正在启动 openocd...</translation>
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
        <translation>连接</translation>
    </message>
    <message>
        <source>Serial</source>
        <translation>Serial</translation>
    </message>
    <message>
        <source>Connect</source>
        <translation>连接</translation>
    </message>
    <message>
        <source>Refresh</source>
        <translation>刷新</translation>
    </message>
    <message>
        <source>CAN</source>
        <translation>CAN</translation>
    </message>
    <message>
        <source>DEVICES</source>
        <translation>设备</translation>
    </message>
    <message>
        <source>CONFIGURATION</source>
        <translation>配置</translation>
    </message>
    <message>
        <source>Basic</source>
        <translation>基本</translation>
    </message>
    <message>
        <source>Limits</source>
        <translation>限制</translation>
    </message>
    <message>
        <source>Angle</source>
        <translation>角度</translation>
    </message>
    <message>
        <source>min:</source>
        <translation>最小:</translation>
    </message>
    <message>
        <source>max</source>
        <translation>最大</translation>
    </message>
    <message>
        <source>Velocity</source>
        <translation>速度</translation>
    </message>
    <message>
        <source>Torque</source>
        <translation>转矩</translation>
    </message>
    <message>
        <source>Voltage</source>
        <translation>电压</translation>
    </message>
    <message>
        <source>The firmware exposes no voltage limit register yet.</source>
        <translation>固件尚未提供电压限制寄存器。</translation>
    </message>
    <message>
        <source>Current</source>
        <translation>电流</translation>
    </message>
    <message>
        <source>Direction</source>
        <translation>方向</translation>
    </message>
    <message>
        <source>CCW</source>
        <translation>逆时针</translation>
    </message>
    <message>
        <source>CW</source>
        <translation>顺时针</translation>
    </message>
    <message>
        <source>Data Baud Rate</source>
        <translation>数据段波特率</translation>
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
        <translation>标称波特率</translation>
    </message>
    <message>
        <source>Advanced</source>
        <translation>高级</translation>
    </message>
    <message>
        <source>Gear Ratio</source>
        <translation>减速比</translation>
    </message>
    <message>
        <source>Encoder</source>
        <translation>编码器</translation>
    </message>
    <message>
        <source>Torque const</source>
        <translation>转矩常数</translation>
    </message>
    <message>
        <source>Current Kp</source>
        <translation>电流 Kp</translation>
    </message>
    <message>
        <source>Current Ki</source>
        <translation>电流 Ki</translation>
    </message>
    <message>
        <source>Position Offset</source>
        <translation>位置偏移</translation>
    </message>
    <message>
        <source>Main Filter Param A</source>
        <translation>主滤波器参数 A</translation>
    </message>
    <message>
        <source>Filter Gain 1</source>
        <translation>滤波增益 1</translation>
    </message>
    <message>
        <source>Filter Gain 2</source>
        <translation>滤波增益 2</translation>
    </message>
    <message>
        <source>Filter Gain 3</source>
        <translation>滤波增益 3</translation>
    </message>
    <message>
        <source>Current LPF Gain</source>
        <translation>电流低通滤波增益</translation>
    </message>
    <message>
        <source>rotor</source>
        <translation>转子</translation>
    </message>
    <message>
        <source>shaft</source>
        <translation>输出轴</translation>
    </message>
    <message>
        <source>external</source>
        <translation>外部</translation>
    </message>
    <message>
        <source>Current Kd</source>
        <translation>电流 Kd</translation>
    </message>
    <message>
        <source>System</source>
        <translation>系统</translation>
    </message>
    <message>
        <source>Sensor</source>
        <translation>传感器</translation>
    </message>
    <message>
        <source>Calibrate</source>
        <translation>校准</translation>
    </message>
    <message>
        <source>Register Parameters</source>
        <translation>寄存器参数</translation>
    </message>
    <message>
        <source>Save to File...</source>
        <translation>保存到文件...</translation>
    </message>
    <message>
        <source>Load from File...</source>
        <translation>从文件加载...</translation>
    </message>
    <message>
        <source>Restore to Default</source>
        <translation>恢复默认值</translation>
    </message>
    <message>
        <source>Firmware</source>
        <translation>固件</translation>
    </message>
    <message>
        <source>Current Version:</source>
        <translation>当前版本：</translation>
    </message>
    <message>
        <source>0.0.1</source>
        <translation>0.0.1</translation>
    </message>
    <message>
        <source>Choose file</source>
        <translation>选择文件</translation>
    </message>
    <message>
        <source>Open</source>
        <translation>打开</translation>
    </message>
    <message>
        <source>Download from remote repo</source>
        <translation>从远程仓库下载</translation>
    </message>
    <message>
        <source>Flash</source>
        <translation>烧录</translation>
    </message>
    <message>
        <source>Read</source>
        <translation>读取</translation>
    </message>
    <message>
        <source>Write</source>
        <translation>写入</translation>
    </message>
    <message>
        <source>Set Origin</source>
        <translation>设为零点</translation>
    </message>
    <message>
        <source>&lt;html&gt;&lt;head/&gt;&lt;body&gt;&lt;p align="center"&gt;Logo&lt;/p&gt;&lt;/body&gt;&lt;/html&gt;</source>
        <translation>&lt;html&gt;&lt;head/&gt;&lt;body&gt;&lt;p align="center"&gt;Logo&lt;/p&gt;&lt;/body&gt;&lt;/html&gt;</translation>
    </message>
    <message>
        <source>REALTIME DATA</source>
        <translation>实时数据</translation>
    </message>
    <message>
        <source>Signal:</source>
        <translation>信号：</translation>
    </message>
    <message>
        <source>Position</source>
        <translation>位置</translation>
    </message>
    <message>
        <source>Temperature</source>
        <translation>温度</translation>
    </message>
    <message>
        <source>Log</source>
        <translation>日志</translation>
    </message>
    <message>
        <source>Units:</source>
        <translation>单位：</translation>
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
        <translation>首选项</translation>
    </message>
    <message>
        <source>Language:</source>
        <translation>语言：</translation>
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
        <translation>暂停</translation>
    </message>
    <message>
        <source>Save as CSV...</source>
        <translation>保存为 CSV...</translation>
    </message>
    <message>
        <source>Save as PNG...</source>
        <translation>保存为 PNG...</translation>
    </message>
    <message>
        <source>CONTROL</source>
        <translation>控制</translation>
    </message>
    <message>
        <source>Servo</source>
        <translation>Servo</translation>
    </message>
    <message>
        <source>Control Type</source>
        <translation>控制类型</translation>
    </message>
    <message>
        <source>Transient Form</source>
        <translation>过渡过程</translation>
    </message>
    <message>
        <source>Linear</source>
        <translation>线性</translation>
    </message>
    <message>
        <source>Polynomial</source>
        <translation>多项式</translation>
    </message>
    <message>
        <source>Set</source>
        <translation>设置</translation>
    </message>
    <message>
        <source>Feedback Gains</source>
        <translation>反馈增益</translation>
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
        <translation>手动</translation>
    </message>
    <message>
        <source>Target position:</source>
        <translation>目标位置：</translation>
    </message>
    <message>
        <source>Start</source>
        <translation>启动</translation>
    </message>
    <message>
        <source>Sin</source>
        <translation>正弦</translation>
    </message>
    <message>
        <source>Amplitude</source>
        <translation>幅值</translation>
    </message>
    <message>
        <source>Frequency</source>
        <translation>频率</translation>
    </message>
    <message>
        <source>Meander</source>
        <translation>方波</translation>
    </message>
    <message>
        <source>Triangle</source>
        <translation>三角波</translation>
    </message>
    <message>
        <source>MIT</source>
        <translation>MIT</translation>
    </message>
    <message>
        <source>Trajectory</source>
        <translation>轨迹</translation>
    </message>
    <message>
        <source>Step</source>
        <translation>阶跃</translation>
    </message>
    <message>
        <source>Step Targets</source>
        <translation>阶跃参数</translation>
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
        <translation>轨迹参数</translation>
    </message>
    <message>
        <source>+derivative</source>
        <translation>+导数</translation>
    </message>
    <message>
        <source>STATUS</source>
        <translation>状态</translation>
    </message>
    <message>
        <source>Model</source>
        <translation>型号</translation>
    </message>
    <message>
        <source>M4310R10</source>
        <translation>M4310R10</translation>
    </message>
    <message>
        <source>Temperature MCU</source>
        <translation>MCU 温度</translation>
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
        <translation>定子温度</translation>
    </message>
    <message>
        <source>Bus Voltage</source>
        <translation>母线电压</translation>
    </message>
    <message>
        <source>V</source>
        <translation>V</translation>
    </message>
    <message>
        <source>Motor Encoder</source>
        <translation>转子编码器</translation>
    </message>
    <message>
        <source>-</source>
        <translation>-</translation>
    </message>
    <message>
        <source>Shaft Encoder</source>
        <translation>输出轴编码器</translation>
    </message>
    <message>
        <source>Fault</source>
        <translation>故障</translation>
    </message>
    <message>
        <source>STOP</source>
        <translation>停止</translation>
    </message>
    <message>
        <source>Connection failed</source>
        <translation>连接失败</translation>
    </message>
    <message>
        <source>Firmware download failed</source>
        <translation>固件下载失败</translation>
    </message>
    <message>
        <source>Downloaded firmware %1.</source>
        <translation>已下载固件 %1。</translation>
    </message>
    <message>
        <source>Flashing failed</source>
        <translation>烧录失败</translation>
    </message>
    <message>
        <source>Disconnect</source>
        <translation>断开</translation>
    </message>
    <message>
        <source>Resume</source>
        <translation>继续</translation>
    </message>
    <message>
        <source>Not connected</source>
        <translation>未连接</translation>
    </message>
    <message>
        <source>Unsaved changes</source>
        <translation>未保存的更改</translation>
    </message>
    <message>
        <source>Some register changes have not been written to the drive.
Close anyway?</source>
        <translation>部分寄存器更改尚未写入驱动器。
仍要关闭吗？</translation>
    </message>
    <message>
        <source>%1 (unavailable)</source>
        <translation>%1（不可用）</translation>
    </message>
    <message>
        <source>No serial port selected.</source>
        <translation>未选择串口。</translation>
    </message>
    <message>
        <source>Opening %1...</source>
        <translation>正在打开 %1...</translation>
    </message>
    <message>
        <source>Listening for drives on %1...</source>
        <translation>正在 %1 上搜索驱动器...</translation>
    </message>
    <message>
        <source>Serial connected</source>
        <translation>串口已连接</translation>
    </message>
    <message>
        <source>CAN connected</source>
        <translation>CAN 已连接</translation>
    </message>
    <message>
        <source>Disconnected.</source>
        <translation>已断开。</translation>
    </message>
    <message>
        <source>Sort by model</source>
        <translation>按型号排序</translation>
    </message>
    <message>
        <source>Sort by Node ID</source>
        <translation>按 Node ID 排序</translation>
    </message>
    <message>
        <source>  (no heartbeat)</source>
        <translation>（无心跳）</translation>
    </message>
    <message>
        <source>Drive %1 has register changes that were not written.
Write them before switching?</source>
        <translation>驱动器 %1 有未写入的寄存器更改。
切换前是否写入？</translation>
    </message>
    <message>
        <source>Reading registers...</source>
        <translation>正在读取寄存器...</translation>
    </message>
    <message>
        <source>No changes to write.</source>
        <translation>没有需要写入的更改。</translation>
    </message>
    <message numerus="yes">
        <source>Writing %n register(s)...</source>
        <translation><numerusform>正在写入 %n 个寄存器...</numerusform></translation>
    </message>
    <message>
        <source>Origin set; angle offset is now %1.</source>
        <translation>零点已设置，角度偏移现为 %1。</translation>
    </message>
    <message>
        <source>Calibrate sensor</source>
        <translation>校准传感器</translation>
    </message>
    <message>
        <source>Calibration moves the motor and cannot be cancelled. The drive stops answering until it finishes.

Start calibration?</source>
        <translation>校准会转动电机且无法取消。驱动器在校准完成前不会响应。

开始校准吗？</translation>
    </message>
    <message>
        <source>Calibration started; the drive will not answer until it is done.</source>
        <translation>校准已开始，驱动器在完成前不会响应。</translation>
    </message>
    <message>
        <source>Save register profile</source>
        <translation>保存寄存器配置</translation>
    </message>
    <message>
        <source>YAML files (*.yaml *.yml)</source>
        <translation>YAML 文件 (*.yaml *.yml)</translation>
    </message>
    <message>
        <source>Could not save the profile</source>
        <translation>无法保存配置</translation>
    </message>
    <message>
        <source>Profile saved to %1.</source>
        <translation>配置已保存到 %1。</translation>
    </message>
    <message>
        <source>Load register profile</source>
        <translation>加载寄存器配置</translation>
    </message>
    <message>
        <source>Could not load the profile</source>
        <translation>无法加载配置</translation>
    </message>
    <message numerus="yes">
        <source>Loaded %n register(s) from the profile.</source>
        <translation><numerusform>已从配置加载 %n 个寄存器。</numerusform></translation>
    </message>
    <message>
        <source>Loaded with warnings: %1</source>
        <translation>加载时出现警告：%1</translation>
    </message>
    <message>
        <source>Could not load the default profile</source>
        <translation>无法加载默认配置</translation>
    </message>
    <message>
        <source>Default values for %1 loaded into the editors.</source>
        <translation>%1 的默认值已载入编辑框。</translation>
    </message>
    <message>
        <source>Could not read '%1': %2</source>
        <translation>无法读取“%1”：%2</translation>
    </message>
    <message>
        <source>Could not write '%1': %2</source>
        <translation>无法写入“%1”：%2</translation>
    </message>
    <message>
        <source>Registers written.</source>
        <translation>寄存器已写入。</translation>
    </message>
    <message>
        <source>Some registers were not written</source>
        <translation>部分寄存器未写入</translation>
    </message>
    <message>
        <source>Drive lost</source>
        <translation>驱动器失联</translation>
    </message>
    <message>
        <source>Drive %1 (node %2) stopped sending heartbeats.</source>
        <translation>驱动器 %1（节点 %2）停止发送心跳。</translation>
    </message>
    <message>
        <source>Wait for it to come back, keeping your unsaved register changes, or drop it and discard them?</source>
        <translation>是等待它恢复并保留未保存的寄存器更改，还是移除它并放弃这些更改？</translation>
    </message>
    <message>
        <source>Reconnect</source>
        <translation>重新连接</translation>
    </message>
    <message>
        <source>Remove drive</source>
        <translation>移除驱动器</translation>
    </message>
    <message>
        <source>Waiting for node %1 to return...</source>
        <translation>正在等待节点 %1 恢复...</translation>
    </message>
    <message>
        <source>Node %1 is back.</source>
        <translation>节点 %1 已恢复。</translation>
    </message>
    <message>
        <source>Yes</source>
        <translation>是</translation>
    </message>
    <message>
        <source>No</source>
        <translation>否</translation>
    </message>
    <message>
        <source>Serial cannot sustain %1 Hz; running at %2 Hz instead.</source>
        <translation>串口无法维持 %1 Hz，改为 %2 Hz 运行。</translation>
    </message>
    <message>
        <source>Feedback gains written.</source>
        <translation>反馈增益已写入。</translation>
    </message>
    <message>
        <source>Transient form written.</source>
        <translation>过渡过程参数已写入。</translation>
    </message>
    <message>
        <source>Emergency stop: all drives disabled.</source>
        <translation>急停：已关闭所有驱动器。</translation>
    </message>
    <message>
        <source>Stop</source>
        <translation>停止</translation>
    </message>
    <message>
        <source>Save plot data</source>
        <translation>保存图表数据</translation>
    </message>
    <message>
        <source>CSV files (*.csv)</source>
        <translation>CSV 文件 (*.csv)</translation>
    </message>
    <message>
        <source>Could not save the CSV</source>
        <translation>无法保存 CSV</translation>
    </message>
    <message>
        <source>Plot data saved.</source>
        <translation>图表数据已保存。</translation>
    </message>
    <message>
        <source>Save plot image</source>
        <translation>保存图表图像</translation>
    </message>
    <message>
        <source>PNG images (*.png)</source>
        <translation>PNG 图像 (*.png)</translation>
    </message>
    <message>
        <source>Could not save the image</source>
        <translation>无法保存图像</translation>
    </message>
    <message>
        <source>Plot image saved.</source>
        <translation>图表图像已保存。</translation>
    </message>
    <message>
        <source>Select firmware image</source>
        <translation>选择固件文件</translation>
    </message>
    <message>
        <source>Intel HEX files (*.hex)</source>
        <translation>Intel HEX 文件 (*.hex)</translation>
    </message>
    <message>
        <source>Selected %1.</source>
        <translation>已选择 %1。</translation>
    </message>
    <message>
        <source>No firmware selected</source>
        <translation>未选择固件</translation>
    </message>
    <message>
        <source>Choose a .hex file first, or switch to downloading the latest release.</source>
        <translation>请先选择 .hex 文件，或切换为下载最新版本。</translation>
    </message>
    <message>
        <source>Flashing %1...</source>
        <translation>正在烧录 %1...</translation>
    </message>
</context>
<context>
    <name>PlotController</name>
    <message>
        <source>t, s</source>
        <translation>t, 秒</translation>
    </message>
    <message>
        <source>Position</source>
        <translation>位置</translation>
    </message>
    <message>
        <source>Velocity</source>
        <translation>速度</translation>
    </message>
    <message>
        <source>Torque</source>
        <translation>转矩</translation>
    </message>
    <message>
        <source>MCU</source>
        <translation>MCU</translation>
    </message>
    <message>
        <source>Bus current</source>
        <translation>母线电流</translation>
    </message>
    <message>
        <source>Rotor</source>
        <translation>转子</translation>
    </message>
    <message>
        <source>Target</source>
        <translation>目标</translation>
    </message>
    <message>
        <source>Stator</source>
        <translation>定子</translation>
    </message>
    <message>
        <source>Shaft</source>
        <translation>输出轴</translation>
    </message>
    <message>
        <source>Position, %1</source>
        <translation>位置，%1</translation>
    </message>
    <message>
        <source>Velocity, %1</source>
        <translation>速度，%1</translation>
    </message>
    <message>
        <source>Torque, N*m</source>
        <translation>转矩，N·m</translation>
    </message>
    <message>
        <source>Temperature, C</source>
        <translation>温度，°C</translation>
    </message>
    <message>
        <source>Current, A</source>
        <translation>电流，A</translation>
    </message>
    <message>
        <source>Encoder, counts</source>
        <translation>编码器，计数</translation>
    </message>
    <message>
        <source>The plot is not initialised.</source>
        <translation>图表尚未初始化。</translation>
    </message>
    <message>
        <source>The log view cannot be exported as an image.</source>
        <translation>日志视图无法导出为图像。</translation>
    </message>
    <message>
        <source>The plot could not be rendered.</source>
        <translation>无法渲染图表。</translation>
    </message>
    <message>
        <source>Could not write %1.</source>
        <translation>无法写入 %1。</translation>
    </message>
    <message>
        <source>Could not write %1: %2</source>
        <translation>无法写入 %1：%2</translation>
    </message>
</context>
<context>
    <name>PreferencesDialog</name>
    <message>
        <source>Preferences</source>
        <translation>首选项</translation>
    </message>
    <message>
        <source>Appearance</source>
        <translation>外观</translation>
    </message>
    <message>
        <source>Theme:</source>
        <translation>主题：</translation>
    </message>
    <message>
        <source>Dark</source>
        <translation>深色</translation>
    </message>
    <message>
        <source>Light</source>
        <translation>浅色</translation>
    </message>
    <message>
        <source>Interface font size, pt:</source>
        <translation>界面字号，pt：</translation>
    </message>
    <message>
        <source>Plot</source>
        <translation>图表</translation>
    </message>
    <message>
        <source>Plot font size, pt:</source>
        <translation>图表字号，pt：</translation>
    </message>
    <message>
        <source>Line width, px:</source>
        <translation>线宽，px：</translation>
    </message>
    <message>
        <source>Time window, s:</source>
        <translation>时间窗口，秒：</translation>
    </message>
    <message>
        <source>Redraw rate, Hz:</source>
        <translation>刷新率，Hz：</translation>
    </message>
    <message>
        <source>Connection</source>
        <translation>连接</translation>
    </message>
    <message>
        <source>This application's Cyphal node ID:</source>
        <translation>本程序的 Cyphal Node ID：</translation>
    </message>
    <message>
        <source>Serial baud rate:</source>
        <translation>串口波特率：</translation>
    </message>
    <message>
        <source>Firmware flashing (OpenOCD)</source>
        <translation>固件烧录（OpenOCD）</translation>
    </message>
    <message>
        <source>Interface config:</source>
        <translation>接口配置：</translation>
    </message>
    <message>
        <source>Target config:</source>
        <translation>目标配置：</translation>
    </message>
    <message>
        <source>OpenOCD interface script, relative to its scripts directory.
VBDrive is programmed over SWD with an ST-Link.</source>
        <translation>OpenOCD 接口脚本，相对于其 scripts 目录。
VBDrive 通过 ST-Link 以 SWD 方式烧录。</translation>
    </message>
    <message>
        <source>OpenOCD target script. VBDrive uses an STM32G431VB.</source>
        <translation>OpenOCD 目标脚本。VBDrive 使用 STM32G431VB。</translation>
    </message>
    <message>
        <source>Node ID this application announces on the CAN bus.
It must not collide with any drive.</source>
        <translation>本程序在 CAN 总线上声明的 Node ID。
不得与任何驱动器冲突。</translation>
    </message>
</context>
<context>
    <name>RegisterYaml</name>
    <message>
        <source>File does not exist: %1</source>
        <translation>文件不存在：%1</translation>
    </message>
    <message>
        <source>Cannot parse %1: %2</source>
        <translation>无法解析 %1：%2</translation>
    </message>
    <message>
        <source>%1 is not a map of register names to values.</source>
        <translation>%1 不是“寄存器名: 值”的映射。</translation>
    </message>
    <message>
        <source>unknown register '%1'</source>
        <translation>未知寄存器“%1”</translation>
    </message>
    <message>
        <source>'%1' does not hold a single value</source>
        <translation>“%1”不是单个值</translation>
    </message>
    <message>
        <source>'%1' has a value of the wrong type</source>
        <translation>“%1”的值类型不正确</translation>
    </message>
    <message>
        <source>%1 contains no recognised registers.</source>
        <translation>%1 中没有可识别的寄存器。</translation>
    </message>
    <message>
        <source>Cannot write %1: %2</source>
        <translation>无法写入 %1：%2</translation>
    </message>
</context>
<context>
    <name>RestoreLabel</name>
    <message>
        <source>Restore the value this field had when the drive was selected</source>
        <translation>恢复选择该驱动器时此字段的值</translation>
    </message>
</context>
<context>
    <name>RestoreModelDialog</name>
    <message>
        <source>Restore Default Registers</source>
        <translation>恢复默认寄存器</translation>
    </message>
    <message>
        <source>Load the factory register profile for this drive model. The values are placed in the editors; nothing is written to the drive until you press Write.</source>
        <translation>加载该型号驱动器的出厂寄存器配置。数值会填入编辑框；在按下“写入”之前不会写入驱动器。</translation>
    </message>
    <message>
        <source>Drive model:</source>
        <translation>驱动器型号：</translation>
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
        <translation>串口服务正在关闭。</translation>
    </message>
    <message>
        <source>Reconnecting.</source>
        <translation>正在重新连接。</translation>
    </message>
    <message>
        <source>Disconnected.</source>
        <translation>已断开。</translation>
    </message>
    <message>
        <source>Serial port is not open.</source>
        <translation>串口未打开。</translation>
    </message>
    <message>
        <source>Command '%1' failed: %2</source>
        <translation>命令“%1”失败：%2</translation>
    </message>
    <message>
        <source>Drive detected on %1.</source>
        <translation>在 %1 上检测到驱动器。</translation>
    </message>
    <message>
        <source>No drive answered on %1: %2</source>
        <translation>%1 上没有驱动器响应：%2</translation>
    </message>
    <message>
        <source>These registers were rejected by the drive: %1</source>
        <translation>驱动器拒绝了这些寄存器：%1</translation>
    </message>
    <message>
        <source>Serial connection lost.</source>
        <translation>串口连接已丢失。</translation>
    </message>
    <message>
        <source>The drive did not answer in time.</source>
        <translation>驱动器未及时响应。</translation>
    </message>
    <message>
        <source>Could not interpret the value '%1'.</source>
        <translation>无法解析值“%1”。</translation>
    </message>
</context>
<context>
    <name>SerialWorker</name>
    <message>
        <source>Port %1 opened at %2 baud.</source>
        <translation>端口 %1 已以 %2 波特打开。</translation>
    </message>
    <message>
        <source>Serial port is not open.</source>
        <translation>串口未打开。</translation>
    </message>
</context>
</TS>