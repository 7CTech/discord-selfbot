cmake_minimum_required(VERSION 3.9)
project(discord_selfbot)

set(CMAKE_MODULE_PATH ${CMAKE_MODULE_PATH} "${CMAKE_SOURCE_DIR}/cmake/modules/")

set(CMAKE_CXX_STANDARD 14)

set(CMAKE_CXX_FLAGS_DEBUG "-g -O0")
set(CMAKE_C_FLAGS_DEBUG "-g -O0")

find_package(Qt5 REQUIRED COMPONENTS Core DBus)

IF(NOT ${GioMM_FOUND} OR NOT ${GlibMM_FOUND})
    MESSAGE(FATAL_ERROR, "MISSING GioMM OR GLIBMM")
ENDIF()

set(SOURCE_FILES
        native/currently-playing.cc
        native/util.cc
        bot.js
        mention-strings.json
        package-lock.json
        package.json
        secrets.json
        util.js)




include_directories(${Qt5Core_INCLUDE_DIRS})
include_directories(${Qt5DBus_INCLUDE_DIRS})

add_executable(discord_selfbot ${SOURCE_FILES})
target_link_libraries(discord_selfbot ${SOURCE_FILES} ${Qt5Core_LIBRARIES} ${Qt5DBus_LIBRARIES})