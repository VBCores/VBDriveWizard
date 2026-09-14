cmake_minimum_required(VERSION 3.16)

project(VBDriveWizard VERSION 1.0 LANGUAGES C CXX)

set(CMAKE_AUTOUIC ON)
set(CMAKE_AUTOMOC ON)
set(CMAKE_AUTORCC ON)

set(CMAKE_CXX_STANDARD 17)
set(CMAKE_CXX_STANDARD_REQUIRED ON)

# Qt 6 only: the application needs Qt::SerialPort, which is not available for the
# Qt 5 packages on Ubuntu 24.04, and qt_add_translations() for runtime language
# switching. Falling back to Qt 5 would silently drop both.
find_package(Qt6 6.4 REQUIRED COMPONENTS Widgets SerialPort Network PrintSupport LinguistTools)

find_package(yaml-cpp REQUIRED)
find_package(Threads REQUIRED)

# ---------------------------------------------------------------------------
# Vendored dependencies
# ---------------------------------------------------------------------------
# libcxxcanard bundles libcanard + o1heap and exports the Nunavut templates that
# cyphal_types.cmake needs, so it must be added before cyphal_add_dsdl_types().
set(LIBCXXCANARD_POSITION_INDEPENDENT_CODE ON CACHE BOOL "" FORCE)
add_subdirectory(third_party/libcxxcanard)
include(${CMAKE_CURRENT_SOURCE_DIR}/third_party/cyphal_types/cyphal_types.cmake)

# ---------------------------------------------------------------------------
# Sources
# ---------------------------------------------------------------------------
set(PROJECT_SOURCES
    main.cpp
    app_types.h
    mainwindow.cpp
    mainwindow.h
    mainwindow.ui

    core/units.h
    core/register_value.h
    core/register_catalog.cpp
    core/register_catalog.h
    core/register_yaml.cpp
    core/register_yaml.h
    core/device_model.cpp
    core/device_model.h
    core/device_manager.cpp
    core/device_manager.h

    transport/device_link.h
    transport/serial_worker.cpp
    transport/serial_worker.h
    transport/serial_service.cpp
    transport/serial_service.h
    transport/can_interface_list.cpp
    transport/can_interface_list.h
    transport/cyphal_worker.cpp
    transport/cyphal_worker.h
    transport/cyphal_service.cpp
    transport/cyphal_service.h

    control/trajectory.cpp
    control/trajectory.h
    control/trajectory_worker.cpp
    control/trajectory_worker.h
    control/control_manager.cpp
    control/control_manager.h

    ui/restore_label.cpp
    ui/restore_label.h
    ui/theme_manager.cpp
    ui/theme_manager.h
    ui/config_manager.cpp
    ui/config_manager.h
    ui/language_manager.cpp
    ui/language_manager.h
    ui/translation_controller.cpp
    ui/translation_controller.h
    ui/plot_controller.cpp
    ui/plot_controller.h
    ui/preferences_dialog.cpp
    ui/preferences_dialog.h
    ui/preferences_dialog.ui
    ui/restore_model_dialog.cpp
    ui/restore_model_dialog.h
    ui/restore_model_dialog.ui

    firmware/firmware_downloader.cpp
    firmware/firmware_downloader.h
    firmware/firmware_flasher.cpp
    firmware/firmware_flasher.h

    third_party/qcustomplot/qcustomplot.cpp
    third_party/qcustomplot/qcustomplot.h

    icons.qrc
)

qt_add_executable(VBDriveWizard MANUAL_FINALIZATION ${PROJECT_SOURCES})

target_include_directories(VBDriveWizard PRIVATE
    ${CMAKE_CURRENT_SOURCE_DIR}
    ${CMAKE_CURRENT_SOURCE_DIR}/third_party/qcustomplot
    ${CMAKE_CURRENT_SOURCE_DIR}/third_party/libcxxcanard
    ${CMAKE_CURRENT_SOURCE_DIR}/third_party/libcxxcanard/libs
)

# Generates the Nunavut C headers and the libcxxcanard C++ traits for uavcan.* and
# voltbro.* into the build tree, and puts them on the include path of both targets.
cyphal_add_dsdl_types(VBDriveWizard
    TYPE_REPOS
        ${CMAKE_CURRENT_SOURCE_DIR}/third_party/cyphal_types/public_regulated_data_types
        ${CMAKE_CURRENT_SOURCE_DIR}/third_party/cyphal_types/voltbro_types
)

# Lets the application find the bundled registers/*.yaml and the default config
# when it is run straight out of the build directory (pattern taken from RWIP_GUI).
target_compile_definitions(VBDriveWizard PRIVATE
    VBDRIVEWIZARD_SOURCE_DIR="${CMAKE_CURRENT_SOURCE_DIR}"
)

target_link_libraries(VBDriveWizard PRIVATE
    Qt6::Widgets
    Qt6::SerialPort
    Qt6::Network
    Qt6::PrintSupport
    libcxxcanard
    yaml-cpp
    Threads::Threads
)

# ---------------------------------------------------------------------------
# Translations
# ---------------------------------------------------------------------------
# en_US is the source language and stays in the list so lupdate keeps it in sync;
# the .qm files are embedded under :/i18n and loaded by TranslationController.
set(TS_FILES
    translations/VBDriveWizard_en_US.ts
    translations/VBDriveWizard_ru_RU.ts
    translations/VBDriveWizard_zh_CN.ts
)

qt_add_translations(VBDriveWizard
    SOURCE_TARGETS VBDriveWizard
    TS_FILES ${TS_FILES}
    RESOURCE_PREFIX "/i18n"
)

set_target_properties(VBDriveWizard PROPERTIES WIN32_EXECUTABLE TRUE)

include(GNUInstallDirs)
install(TARGETS VBDriveWizard RUNTIME DESTINATION ${CMAKE_INSTALL_BINDIR})
install(DIRECTORY registers/ DESTINATION ${CMAKE_INSTALL_DATADIR}/VBDriveWizard/registers)

qt_finalize_executable(VBDriveWizard)
