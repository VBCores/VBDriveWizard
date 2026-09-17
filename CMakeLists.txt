cmake_minimum_required(VERSION 3.16)

project(VBDriveWizard VERSION 0.0.1 LANGUAGES C CXX)

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

# The executable icon on Windows; the in-app window icon is set from icons.qrc.
if(WIN32)
    list(APPEND PROJECT_SOURCES icons/app_icon.rc)
endif()

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
# Turned off for packaged builds so the installed binary never prefers a stale
# source checkout over /usr/share.
option(VBDRIVEWIZARD_DEV_PATHS "Look up registers/config/firmwares in the source tree" ON)
if(VBDRIVEWIZARD_DEV_PATHS)
    target_compile_definitions(VBDriveWizard PRIVATE
        VBDRIVEWIZARD_SOURCE_DIR="${CMAKE_CURRENT_SOURCE_DIR}"
    )
endif()

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
# Debian policy expects 0755 directories; otherwise the build umask leaks into the package.
set(CMAKE_INSTALL_DEFAULT_DIRECTORY_PERMISSIONS
    OWNER_READ OWNER_WRITE OWNER_EXECUTE GROUP_READ GROUP_EXECUTE WORLD_READ WORLD_EXECUTE)
install(TARGETS VBDriveWizard RUNTIME DESTINATION ${CMAKE_INSTALL_BINDIR})
install(DIRECTORY registers/ DESTINATION ${CMAKE_INSTALL_DATADIR}/VBDriveWizard/registers)
# GNOME/KDE take the dock and launcher icon from the .desktop entry matched by the
# window's app id (see setDesktopFileName in main.cpp), not from setWindowIcon.
if(UNIX AND NOT APPLE)
    install(FILES VBDriveWizard.desktop DESTINATION ${CMAKE_INSTALL_DATADIR}/applications)
    # hicolor only looks in the size directories its index.theme lists, so the icon
    # has to go into one of them (512x512 is the largest); icon.png is 1254x1254.
    install(FILES icons/icon_512.png DESTINATION ${CMAKE_INSTALL_DATADIR}/icons/hicolor/512x512/apps
            RENAME VBDriveWizard.png)
endif()

qt_finalize_executable(VBDriveWizard)

# ---------------------------------------------------------------------------
# Packaging (Debian/Ubuntu)
# ---------------------------------------------------------------------------
if(UNIX AND NOT APPLE)
    set(CPACK_GENERATOR "DEB")
    set(CPACK_PACKAGE_NAME "vbdrivewizard")
    set(CPACK_PACKAGE_VERSION "${PROJECT_VERSION}")
    set(CPACK_PACKAGE_CONTACT "Voltbro <info@voltbro.com>")
    set(CPACK_PACKAGE_DESCRIPTION_SUMMARY "Configuration and tuning tool for Voltbro VBDrive")
    # CPack indents continuation lines itself, so no leading spaces here.
    set(CPACK_DEBIAN_PACKAGE_DESCRIPTION
"Desktop GUI for checking and configuring Voltbro VBDrive servo drives over
USB serial or Cyphal/CAN: register editing, telemetry plots, trajectory
control and firmware updates.
.
Serial access requires membership in the dialout group:
sudo usermod -aG dialout $USER (then log out and back in).")
    set(CPACK_DEBIAN_PACKAGE_HOMEPAGE "https://github.com/VBCores/VBDriveWizard")
    set(CPACK_DEBIAN_PACKAGE_SECTION "utils")
    set(CPACK_DEBIAN_PACKAGE_PRIORITY "optional")
    # Without this CPack stages under /usr/local, where desktop entries and
    # icons are not guaranteed to be picked up.
    set(CPACK_PACKAGING_INSTALL_PREFIX "/usr")
    set(CPACK_DEBIAN_FILE_NAME DEB-DEFAULT)
    set(CPACK_DEBIAN_PACKAGE_SHLIBDEPS ON)
    # The SVG icon/image plugins are loaded at runtime, so dpkg-shlibdeps
    # cannot see them; icons.qrc is mostly SVG.
    set(CPACK_DEBIAN_PACKAGE_DEPENDS "libqt6svg6")
    set(CPACK_DEBIAN_PACKAGE_RECOMMENDS "qt6-wayland, qt6-gtk-platformtheme")
    set(CPACK_DEBIAN_PACKAGE_CONTROL_EXTRA
        "${CMAKE_CURRENT_SOURCE_DIR}/packaging/debian/postinst"
        "${CMAKE_CURRENT_SOURCE_DIR}/packaging/debian/postrm")
    set(CPACK_DEBIAN_PACKAGE_CONTROL_STRICT_PERMISSION ON)
    set(CPACK_STRIP_FILES ON)
    include(CPack)
endif()
