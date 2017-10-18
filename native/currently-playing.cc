
#define STANDLONE


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
        void getCurrentlyPlaying() {
#endif
#ifndef STANDLONE
			std::string mediaPlayer = std::string(*v8::String::Utf8Value(args[0]->ToString()));
			v8::Isolate *isolate = args.GetIsolate();
			std::locale::global(std::locale(""));
#endif

            if (!QDBusConnection::sessionBus().isConnected()) {
                std::cout << "not connected to the session bus" << std::endl;
#ifndef STANDLONE
                isolate->ThrowException(v8::Exception::Error(v8::String::NewFromUtf8(isolate, "not connected to the session bus")));
#endif
                return;
            }

            QDBusReply<QStringList> qServices = QDBusConnection::sessionBus().interface()->registeredServiceNames();

            QStringList::const_iterator constIterator;

            std::vector<std::string> services;

            for (constIterator = qServices.value().constBegin(); constIterator != qServices.value().constEnd(); ++constIterator) {
                std::string service((*constIterator).toLocal8Bit().constData());
                if (service.c_str()[0] != ':') services.push_back(service);
            }

            for (const std::string &service : services) {
                std::cout << service << std::endl;
            }


        }
	} //namespace CurrentlyPlaying
} //namespace SelfBot

#ifdef STANDLONE
int main(int argc, char **argv) {

    QCoreApplication app(argc, argv);

    SelfBot::CurrentlyPlaying::getCurrentlyPlaying();
}
#endif
