//
// Created by ctech on 10/18/17.
//

#pragma once

#include <string>
#include <QtCore/QString>

namespace SelfBot {
    class Util {
        public:
            static std::string shell(const std::string &command);
            static QString joinQStringList(const QStringList &list);
    };
}