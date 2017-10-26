cmake_minimum_required(VERSION 3.9)
project(discord_selfbot)

# Find includes in corresponding build directories
set(CMAKE_INCLUDE_CURRENT_DIR ON)
# Instruct CMake to run moc automatically when needed.
set(CMAKE_AUTOMOC ON)

set(CMAKE_MODULE_PATH ${CMAKE_MODULE_PATH} "${CMAKE_SOURCE_DIR}/cmake/modules/")

set(CMAKE_CXX_STANDARD 14)
set(CMAKE_C_STANDARD 11)

set(CMAKE_CXX_FLAGS_DEBUG "-g -O0")
set(CMAKE_C_FLAGS_DEBUG "-g -O0")



find_package(Qt5 REQUIRED COMPONENTS Core DBus)

set(SOURCE_FILES
        src/native/currently-playing.cc
        src/native/util.cc src/native/util.hh)
        #bot.js
        #mention-strings.json
        #package-lock.json
        #package.json
        #secrets.json
        #util.js)



include_directories(${Qt5Core_INCLUDE_DIRS})
include_directories(${Qt5DBus_INCLUDE_DIRS})

MESSAGE(${Qt5Core_LIBRARIES})

add_executable(discord_selfbot ${SOURCE_FILES})
target_link_libraries(discord_selfbot ${Qt5Core_LIBRARIES} ${Qt5DBus_LIBRARIES})
