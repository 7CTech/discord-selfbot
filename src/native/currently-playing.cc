
#undef STANDLONE


#ifndef STANDLONE
#include <node/node.h>
#endif
#include "util.hh"
#include <QtDBus>
#include <locale>
#include <iostream>

namespace SelfBot {
	namespace CurrentlyPlaying {
#ifndef STANDLONE
		void getCurrentlyPlaying(const v8::FunctionCallbackInfo<v8::Value> &args) {
#else
        std::string getCurrentlyPlaying(const std::string &mediaPlayer) {
#endif
#ifndef STANDLONE
			std::string mediaPlayer = std::string(*v8::String::Utf8Value(args[0]->ToString()));
			v8::Isolate *isolate = args.GetIsolate();
			std::locale::global(std::locale(""));
#endif

            if (!QDBusConnection::sessionBus().isConnected()) {
                std::cout << "not connected to the session bus" << std::endl;
#ifndef STANDLONE
                args.GetReturnValue().Set(v8::String::NewFromUtf8(isolate, ""));
                return;//isolate->ThrowException(v8::Exception::Error(v8::String::NewFromUtf8(isolate, "not connected to the session bus")));
#else
                return "";
#endif
            }

            QDBusReply<QStringList> qServices = QDBusConnection::sessionBus().interface()->registeredServiceNames();

            QStringList::const_iterator constIterator;
            std::vector<std::string> services;

            for (constIterator = qServices.value().constBegin(); constIterator != qServices.value().constEnd(); ++constIterator) {
                std::string service((*constIterator).toLocal8Bit().constData());
                if (service.find("org.mpris.MediaPlayer2") == 0) services.push_back(service);
            }

            std::string service;

            if (services.empty()) {
                std::cout << "No valid services, please start a media player" << std::endl;
#ifndef STANDLONE
                args.GetReturnValue().Set(v8::String::NewFromUtf8(isolate, ""));
                return;//isolate->ThrowException(v8::Exception::Error(v8::String::NewFromUtf8(isolate, "no running media players")));
#endif
            } else if (services.size() == 1) service = services[0];
            else {
                for (const std::string &playerService : services) {
                    if (playerService.substr(playerService.find_last_of('.')) == mediaPlayer) {
                        service = playerService;
                    }
                }
            }

            if (service.empty()) {
                std::cout << "Issue finding service" << std::endl;
#ifndef STANDLONE
                args.GetReturnValue().Set(v8::String::NewFromUtf8(isolate, ""));
                return;//isolate->ThrowException(v8::Exception::Error(v8::String::NewFromUtf8(isolate, "issue findind service")));
#endif
            }

            QDBusInterface serviceInterface (QString::fromStdString(service), "/org/mpris/MediaPlayer2", "org.freedesktop.DBus.Properties");
            QDBusReply<QVariant> metadata = serviceInterface.call("Get", QString("org.mpris.MediaPlayer2.Player"), "Metadata");

            QVariantMap metadataMap = qdbus_cast<QVariantMap>(metadata.value().value<QDBusArgument>());

            std::string title(metadataMap["xesam:title"].toString().toLocal8Bit());
            std::string artist((SelfBot::Util::joinQStringList(metadataMap["xesam:artist"].value<QStringList>(), ", ")).toStdString());

            std::string res(artist + " - " + title);

#ifdef STANDLONE
            return res;
#else
            args.GetReturnValue().Set(v8::String::NewFromUtf8(isolate, res.c_str()));
#endif
        }
	} //namespace CurrentlyPlaying
} //namespace SelfBot

#ifdef STANDLONE
int main(int argc, char **argv) {
    QCoreApplication app(argc, argv);
    std::cout << SelfBot::CurrentlyPlaying::getCurrentlyPlaying("") << std::endl;
}
#endif

#ifndef STANDLONE
void init(v8::Local<v8::Object> exports) {
    NODE_SET_METHOD(exports, "getCurrentlyPlaying", SelfBot::CurrentlyPlaying::getCurrentlyPlaying);
}

NODE_MODULE(NODE_GYP_MODULE_NAME, init);
#endif
